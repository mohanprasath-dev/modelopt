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

const gpuOptions = gpusData.gpus

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

  if (data.vram_gb > selectedGpu.vram_gb) {
    ctx.addIssue({
      path: ["vram_gb"],
      code: z.ZodIssueCode.custom,
      message: `VRAM override must be less than or equal to ${selectedGpu.vram_gb}GB.`,
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
    if (!selectedGpuId) return

    const selectedGpu = gpuOptions.find((gpu) => gpu.id === selectedGpuId)
    if (!selectedGpu) return

    setValue("vram_gb", selectedGpu.vram_gb, { shouldValidate: true })
  }, [selectedGpuId, setValue])

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
          | { error?: string }
          | null

        throw new Error(payload?.error ?? "Unable to optimize your setup right now.")
      }

      const payload = (await response.json()) as unknown
      sessionStorage.setItem("modelopt_last_result", JSON.stringify(payload))

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
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-slate-950/70 backdrop-blur-sm" aria-live="polite" aria-busy="true">
          <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200">
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
          <label htmlFor="vram-override" className="text-sm font-medium text-slate-200">
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
                value={field.value}
                onChange={(event) => field.onChange(Number(event.target.value))}
                onBlur={field.onBlur}
                name={field.name}
                className="h-11 rounded-xl border-slate-700 bg-slate-900 text-slate-100"
                aria-invalid={errors.vram_gb ? "true" : "false"}
                aria-describedby={errors.vram_gb?.message ? vramErrorId : undefined}
              />
            )}
          />
          <p className="text-xs text-slate-500">Leave auto-filled unless you know better.</p>
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
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4">
            <p id={submitErrorId} className="text-sm text-red-200">{submitError}</p>
            <Button
              type="button"
              variant="outline"
              className="mt-3 border-red-400/40 text-red-200 hover:bg-red-500/10"
              onClick={() => handleSubmit(submit, onInvalid)()}
            >
              <RotateCcw className="mr-2 size-4" />
              Retry
            </Button>
          </div>
        ) : null}

        <div className="sticky bottom-3 z-10 -mx-1 rounded-xl border border-slate-700/70 bg-slate-950/80 p-2 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full rounded-xl bg-blue-500 text-base font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
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
