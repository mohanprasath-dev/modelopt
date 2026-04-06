"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface GpuOption {
  id: string
  display_name: string
  vram_gb: number
}

interface GpuSelectorProps {
  gpus: GpuOption[]
  value: string
  onChange: (gpuId: string) => void
  error?: string
}

const groupOrder = ["NVIDIA", "AMD", "Apple", "Intel", "Other"] as const

function getManufacturer(displayName: string): (typeof groupOrder)[number] {
  if (displayName.startsWith("NVIDIA")) return "NVIDIA"
  if (displayName.startsWith("AMD")) return "AMD"
  if (displayName.startsWith("Apple")) return "Apple"
  if (displayName.startsWith("Intel")) return "Intel"
  return "Other"
}

export function GpuSelector({ gpus, value, onChange, error }: GpuSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const listboxId = React.useId()
  const errorId = React.useId()

  const selectedGpu = gpus.find((gpu) => gpu.id === value)

  const grouped = React.useMemo(() => {
    const groups: Record<(typeof groupOrder)[number], GpuOption[]> = {
      NVIDIA: [],
      AMD: [],
      Apple: [],
      Intel: [],
      Other: [],
    }

    gpus.forEach((gpu) => {
      const key = getManufacturer(gpu.display_name)
      groups[key].push(gpu)
    })

    return groups
  }, [gpus])

  return (
    <div className="space-y-2">
      <label htmlFor="gpu-selector" className="text-sm font-medium text-slate-700">
        GPU
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <button
              type="button"
              id="gpu-selector"
              role="combobox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-label="Select GPU"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              className={cn(
                "inline-flex h-11 w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 transition-colors hover:bg-slate-50",
                error && "border-red-500/70"
              )}
            >
              {selectedGpu
                ? `${selectedGpu.display_name} (${selectedGpu.vram_gb}GB)`
                : "Select a GPU"}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 text-slate-500" />
            </button>
          }
        />
        <PopoverContent id={listboxId} className="w-[--anchor-width] border border-slate-300 bg-white p-0 text-slate-900 shadow-[0_14px_30px_rgba(15,23,42,0.12)]">
          <Command>
            <CommandInput placeholder="Search GPU..." aria-label="Search GPU" />
            <CommandList>
              <CommandEmpty>No GPU found.</CommandEmpty>
              {groupOrder.map((group) => {
                if (grouped[group].length === 0) {
                  return null
                }

                return (
                  <CommandGroup key={group} heading={group}>
                    {grouped[group].map((gpu) => (
                      <CommandItem
                        key={gpu.id}
                        value={`${gpu.display_name} ${gpu.id} ${gpu.vram_gb}`}
                        onSelect={() => {
                          onChange(gpu.id)
                          setOpen(false)
                        }}
                      >
                        <div className="flex w-full items-center justify-between gap-3">
                          <span>{gpu.display_name}</span>
                          <span className="text-xs text-slate-500">{gpu.vram_gb}GB</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error ? <p id={errorId} className="text-sm text-red-400">{error}</p> : null}
    </div>
  )
}
