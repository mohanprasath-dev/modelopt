export type SpeedPreference = "speed" | "balanced" | "quality"

export interface ModelSpec {
  name: string
  display_name: string
  size: string
  vram_min_gb: number
  vram_recommended_gb: number
  ram_min_gb: number
  use_cases: string[]
  tokens_per_sec_estimate: {
    rtx_4090: number
    rtx_4070: number
    rtx_3060: number
    apple_m2: number
  }
  [key: string]: unknown
}

export interface HardwareProfile {
  id: string
  display_name: string
  vram_gb: number
  tier: string
  compute_score: number
  [key: string]: unknown
}

interface RankedModel extends ModelSpec {
  rank_score: number
}

const SPEED_WEIGHT: Record<SpeedPreference, number> = {
  speed: 0.55,
  balanced: 0.35,
  quality: 0.2,
}

const MATCH_WEIGHT: Record<SpeedPreference, number> = {
  speed: 0.45,
  balanced: 0.65,
  quality: 0.8,
}

function averageTps(model: ModelSpec): number {
  const { rtx_4090, rtx_4070, rtx_3060, apple_m2 } = model.tokens_per_sec_estimate
  return (rtx_4090 + rtx_4070 + rtx_3060 + apple_m2) / 4
}

export function filterModelsByHardware(
  models: ModelSpec[],
  gpu: HardwareProfile | null,
  ram: number,
  vram?: number
): ModelSpec[] {
  const availableVram = vram ?? gpu?.vram_gb ?? 0

  return models
    .filter((model) => model.ram_min_gb <= ram)
    .filter((model) => model.vram_min_gb <= availableVram)
    .sort((a, b) => {
      // Prefer models that better fit available VRAM while preserving headroom.
      const aHeadroom = availableVram - a.vram_min_gb
      const bHeadroom = availableVram - b.vram_min_gb
      return aHeadroom - bHeadroom
    })
}

export function rankModelsByUseCase(
  models: ModelSpec[],
  useCases: string[],
  speedPreference: SpeedPreference = "balanced"
): ModelSpec[] {
  const normalizedUseCases = new Set(useCases.map((u) => u.trim().toLowerCase()).filter(Boolean))

  const scoredModels: RankedModel[] = models.map((model) => {
    const modelUseCases = model.use_cases.map((c) => c.toLowerCase())
    const matchedCount = modelUseCases.filter((c) => normalizedUseCases.has(c)).length
    const matchScore = normalizedUseCases.size === 0 ? 0.5 : matchedCount / normalizedUseCases.size

    // Use normalized throughput as a secondary signal in ranking.
    const speedScore = Math.min(1, averageTps(model) / 120)

    const score =
      matchScore * MATCH_WEIGHT[speedPreference] + speedScore * SPEED_WEIGHT[speedPreference]

    return {
      ...model,
      rank_score: Number(score.toFixed(4)),
    }
  })

  return scoredModels
    .sort((a, b) => {
      if (b.rank_score !== a.rank_score) {
        return b.rank_score - a.rank_score
      }

      return averageTps(b) - averageTps(a)
    })
    .map(({ rank_score: _rankScore, ...model }) => model)
}
