"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Loader2, RotateCcw } from "lucide-react"
import { toast } from "sonner"

import gpusData from "@/lib/data/gpus.json"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GpuSelector } from "@/components/GpuSelector"
import { RamSelector } from "@/components/RamSelector"
import { UseCaseChips } from "@/components/UseCaseChips"
import { SpeedQualitySlider } from "@/components/SpeedQualitySlider"
import { DeploymentToggle } from "@/components/DeploymentToggle"

type GpuMemoryType = "dedicated" | "shared" | "unified"

interface GpuCatalogEntry {
  id: string
  display_name: string
  vram_gb: number
  memory_type?: GpuMemoryType
}

const gpuOptions = gpusData.gpus as GpuCatalogEntry[]

const SHARED_MEMORY_MAX_VRAM_GB = 16

function getSharedMemoryVramCeiling(ramGb: number, gpuVramGb: number): number {
  return Math.max(gpuVramGb, Math.min(SHARED_MEMORY_MAX_VRAM_GB, Math.max(2, Math.floor(ramGb * 0.5))))
}

function getVramCeilingForGpu(gpu: GpuCatalogEntry, ramGb: number): number {
  if (gpu.memory_type === "shared") {
    return getSharedMemoryVramCeiling(ramGb, gpu.vram_gb)
  }

  if (gpu.memory_type === "unified") {
    return Math.max(1, ramGb)
  }

  return gpu.vram_gb
}

type Deployment = "local" | "cloud"

const baseSchema = z.object({
  gpu: z.string().min(1, "GPU is required."),
  ram_gb: z.number().int().min(8, "RAM is required."),
  vram_gb: z.number().int().min(1, "VRAM must be at least 1GB."),
  use_cases: z.array(z.string()).min(1, "Select at least one use case."),
  speed_preference: z.number().int().min(1).max(5),
  deployment: z.enum(["local", "cloud"]),
})

const formSchema = baseSchema.superRefine((data, ctx) => {
  const selectedGpu = gpuOptions.find((gpu) => gpu.id === data.gpu)

  if (!selectedGpu) {
    ctx.addIssue({
      path: ["gpu"],
      code: z.ZodIssueCode.custom,
      message: "Please select a valid GPU.",
    })
    return
  }

  const vramCeiling = getVramCeilingForGpu(selectedGpu, data.ram_gb)

  if (data.vram_gb > vramCeiling) {
    ctx.addIssue({
      path: ["vram_gb"],
      code: z.ZodIssueCode.custom,
      message: `VRAM override must be less than or equal to ${vramCeiling}GB for this system profile.`,
    })
  }
})

type OptimizationFormData = z.infer<typeof formSchema>
export type { OptimizationFormData }

export interface OptimizationProgress {
  completed: number
  total: number
  percentage: number
}

interface OptimizationFormProps {
  initialValues?: Partial<OptimizationFormData>
  onProgressChange?: (progress: OptimizationProgress) => void
  onDraftChange?: (draft: Partial<OptimizationFormData>) => void
}

const defaultValues: OptimizationFormData = {
  gpu: "",
  ram_gb: 16,
  vram_gb: 1,
  use_cases: [],
  speed_preference: 3,
  deployment: "local",
}

export function OptimizationForm({ initialValues, onProgressChange, onDraftChange }: OptimizationFormProps) {
  const router = useRouter()
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const lastPublishedRef = React.useRef<string>("")
  const vramErrorId = React.useId()
  const submitErrorId = React.useId()

  const mergedDefaults = React.useMemo(
    () => ({
      ...defaultValues,
      ...initialValues,
      use_cases: initialValues?.use_cases ?? defaultValues.use_cases,
    }),
    [initialValues]
  )

  const {
    control,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OptimizationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: mergedDefaults,
    mode: "onChange",
  })

  const selectedGpuId = watch("gpu")
  const watchedRam = watch("ram_gb")
  const selectedGpu = React.useMemo(
    () => gpuOptions.find((gpu) => gpu.id === selectedGpuId),
    [selectedGpuId]
  )

  React.useEffect(() => {
    reset(mergedDefaults)
  }, [mergedDefaults, reset])

  const watchedValues = watch()

  React.useEffect(() => {
    const total = 6
    const completed = [
      Boolean(watchedValues.gpu),
      (watchedValues.ram_gb ?? 0) >= 8,
      (watchedValues.vram_gb ?? 0) >= 1,
      (watchedValues.use_cases?.length ?? 0) > 0,
      (watchedValues.speed_preference ?? 0) >= 1,
      Boolean(watchedValues.deployment),
    ].filter(Boolean).length

    const nextProgress = {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    }

    const publishPayload = {
      draft: watchedValues,
      progress: nextProgress,
    }
    const nextSignature = JSON.stringify(publishPayload)

    if (lastPublishedRef.current === nextSignature) {
      return
    }

    lastPublishedRef.current = nextSignature
    onProgressChange?.(nextProgress)
    onDraftChange?.(watchedValues)
  }, [watchedValues, onProgressChange, onDraftChange])

  React.useEffect(() => {
    if (!selectedGpuId || !selectedGpu) {
      return
    }

    setValue("vram_gb", selectedGpu.vram_gb, { shouldValidate: true })
  }, [selectedGpuId, selectedGpu, setValue])

  React.useEffect(() => {
    if (!selectedGpu || selectedGpu.memory_type === "dedicated") {
      return
    }

    const nextRam = watchedRam ?? 8
    const recommendedVram = getVramCeilingForGpu(selectedGpu, nextRam)

    setValue("vram_gb", recommendedVram, { shouldValidate: true })
  }, [selectedGpu, watchedRam, setValue])

  const submit = async (data: OptimizationFormData) => {
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | {
              error?: string
              details?: {
                formErrors?: string[]
                fieldErrors?: Record<string, string[] | undefined>
              }
            }
          | null

        const firstFieldError = payload?.details?.fieldErrors
          ? Object.values(payload.details.fieldErrors)
              .flat()
              .find((message): message is string => Boolean(message))
          : null

        const detailedMessage = payload?.details?.formErrors?.[0] ?? firstFieldError

        throw new Error(detailedMessage ?? payload?.error ?? "Unable to optimize your setup right now.")
      }

      const payload = (await response.json()) as Record<string, unknown>
      sessionStorage.setItem(
        "modelopt_last_result",
        JSON.stringify({
          ...payload,
          meta: {
            generated_at: new Date().toISOString(),
          },
        })
      )

      toast.success("Optimization complete. Redirecting to results...")
      router.push("/results")
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "A network error occurred. Please check your connection and retry."

      setSubmitError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onInvalid = () => {
    toast.error("Please fix the highlighted fields before submitting.")
  }

  return (
    <div className="relative">
      {isSubmitting ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm" aria-live="polite" aria-busy="true">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-[0_10px_28px_rgba(15,23,42,0.1)]">
            <Loader2 className="size-4 animate-spin" />
            Optimizing your setup...
          </div>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit(submit, onInvalid)}
        className="space-y-6"
        noValidate
        aria-label="Model optimization form"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Controller
            control={control}
            name="gpu"
            render={({ field }) => (
              <GpuSelector
                gpus={gpuOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.gpu?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="ram_gb"
            render={({ field }) => (
              <RamSelector
                value={field.value}
                onChange={(next) => field.onChange(Number(next))}
                error={errors.ram_gb?.message}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="vram-override" className="text-sm font-medium text-slate-700">
            VRAM Override (Optional)
          </label>
          <Controller
            control={control}
            name="vram_gb"
            render={({ field }) => (
              <Input
                id="vram-override"
                type="number"
                min={1}
                max={
                  selectedGpu
                    ? getVramCeilingForGpu(selectedGpu, watchedRam ?? 8)
                    : undefined
                }
                value={field.value}
                onChange={(event) => field.onChange(Number(event.target.value))}
                onBlur={field.onBlur}
                name={field.name}
                className="h-11 rounded-xl border-slate-300 bg-white text-slate-900"
                aria-invalid={errors.vram_gb ? "true" : "false"}
                aria-describedby={errors.vram_gb?.message ? vramErrorId : undefined}
              />
            )}
          />
          <p className="text-xs text-slate-500">
            {selectedGpu?.memory_type === "shared"
              ? "Integrated GPU detected. Shared-memory systems can borrow from RAM, and this ceiling auto-adjusts up to 16GB based on system RAM."
              : selectedGpu?.memory_type === "unified"
                ? "Unified-memory device detected. Effective model memory tracks available system RAM."
                : "Leave auto-filled unless you know better."}
          </p>
          {errors.vram_gb?.message ? <p id={vramErrorId} className="text-sm text-red-400">{errors.vram_gb.message}</p> : null}
        </div>

        <Controller
          control={control}
          name="use_cases"
          render={({ field }) => (
            <UseCaseChips
              value={field.value}
              onChange={field.onChange}
              error={errors.use_cases?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="speed_preference"
          render={({ field }) => (
            <SpeedQualitySlider
              value={field.value}
              onChange={field.onChange}
              error={errors.speed_preference?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="deployment"
          render={({ field }) => (
            <DeploymentToggle
              value={field.value as Deployment}
              onChange={field.onChange}
            />
          )}
        />

        {submitError ? (
          <div className="rounded-xl border border-red-300 bg-red-50 p-4">
            <p id={submitErrorId} className="text-sm text-red-700">{submitError}</p>
            <Button
              type="button"
              variant="outline"
              className="mt-3 border-red-300 bg-white text-red-700 hover:bg-red-100"
              onClick={() => handleSubmit(submit, onInvalid)()}
            >
              <RotateCcw className="mr-2 size-4" />
              Retry
            </Button>
          </div>
        ) : null}

        <div className="sticky bottom-3 z-10 -mx-1 rounded-xl border border-slate-200 bg-white/90 p-2 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold text-white shadow-[0_12px_26px_rgba(37,99,235,0.3)] hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isValid || isSubmitting}
            aria-describedby={submitError ? submitErrorId : undefined}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Finding Models...
              </>
            ) : (
              "Find My Models"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
