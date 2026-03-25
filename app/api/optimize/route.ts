import { NextResponse } from "next/server"
import { z } from "zod"
import gpusData from "@/lib/data/gpus.json"
import modelsData from "@/lib/data/models.json"

type Deployment = "local" | "cloud"

interface GpuSpec {
  id: string
  display_name: string
  vram_gb: number
}

interface ModelSpec {
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
  context_window: number
  ollama_install: string
  strengths: string
  weaknesses: string
}

const gpuList = gpusData.gpus as GpuSpec[]
const modelList = modelsData.models as ModelSpec[]

const RAM_ALLOWED_VALUES = [8, 16, 32, 64, 128] as const

const payloadSchema = z.object({
  gpu: z.string().min(1, "GPU is required."),
  ram_gb: z
    .number()
    .int()
    .refine((value) => RAM_ALLOWED_VALUES.includes(value as (typeof RAM_ALLOWED_VALUES)[number]), {
      message: "RAM must be one of 8, 16, 32, 64, 128.",
    }),
  vram_gb: z.number().int().positive().optional(),
  use_cases: z.array(z.string().min(1)).min(1).max(5),
  speed_preference: z.number().int().min(1).max(5),
  deployment: z.enum(["local", "cloud"]),
})

type OptimizePayload = z.infer<typeof payloadSchema>

const MAX_REQUESTS_PER_MINUTE = 10
const WINDOW_MS = 60_000
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown"
  }

  return request.headers.get("x-real-ip") ?? "unknown"
}

function checkRateLimit(ip: string): { ok: boolean; retryAfterSec: number; remaining: number } {
  const now = Date.now()
  const existing = rateLimitStore.get(ip)

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true, retryAfterSec: 60, remaining: MAX_REQUESTS_PER_MINUTE - 1 }
  }

  if (existing.count >= MAX_REQUESTS_PER_MINUTE) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
      remaining: 0,
    }
  }

  existing.count += 1
  rateLimitStore.set(ip, existing)
  return {
    ok: true,
    retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    remaining: MAX_REQUESTS_PER_MINUTE - existing.count,
  }
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  if (!origin) {
    return true
  }

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host")
  const proto = request.headers.get("x-forwarded-proto") ?? "https"
  if (!host) {
    return false
  }

  const expectedOrigin = `${proto}://${host}`
  return origin === expectedOrigin
}

function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("origin")
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host")
  const proto = request.headers.get("x-forwarded-proto") ?? "https"
  const expectedOrigin = host ? `${proto}://${host}` : ""
  const allowOrigin = origin && origin === expectedOrigin ? origin : expectedOrigin || "null"

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  }
}

function parseSizeB(size: string): number {
  const match = size.match(/([\d.]+)\s*[bB]/)
  return match ? Number(match[1]) : 999
}

function averageTps(model: ModelSpec): number {
  const t = model.tokens_per_sec_estimate
  return (t.rtx_4090 + t.rtx_4070 + t.rtx_3060 + t.apple_m2) / 4
}

function useCaseOverlap(modelUseCases: string[], requestedUseCases: string[]): number {
  const requested = new Set(requestedUseCases.map((item) => item.toLowerCase()))
  return modelUseCases.reduce((count, useCase) => {
    return requested.has(useCase.toLowerCase()) ? count + 1 : count
  }, 0)
}

function speedBias(sizeB: number, speedPreference: number): number {
  if (speedPreference <= 2) {
    return -sizeB * 1.8
  }

  if (speedPreference >= 4) {
    return sizeB * 1.8
  }

  return -Math.abs(sizeB - 13)
}

function rankModels(models: ModelSpec[], payload: Required<OptimizePayload>): ModelSpec[] {
  return [...models].sort((a, b) => {
    const overlapA = useCaseOverlap(a.use_cases, payload.use_cases)
    const overlapB = useCaseOverlap(b.use_cases, payload.use_cases)

    const useCaseScoreA = overlapA * 100
    const useCaseScoreB = overlapB * 100

    const speedScoreA = speedBias(parseSizeB(a.size), payload.speed_preference)
    const speedScoreB = speedBias(parseSizeB(b.size), payload.speed_preference)

    const tpsScoreA = payload.speed_preference <= 2 ? averageTps(a) : averageTps(a) * 0.3
    const tpsScoreB = payload.speed_preference <= 2 ? averageTps(b) : averageTps(b) * 0.3

    const totalA = useCaseScoreA + speedScoreA + tpsScoreA
    const totalB = useCaseScoreB + speedScoreB + tpsScoreB

    return totalB - totalA
  })
}

function extractJsonBlock(rawText: string): string {
  const trimmed = rawText.trim()
  const fenced = trimmed.match(/```json\s*([\s\S]*?)```/i)
  if (fenced?.[1]) {
    return fenced[1].trim()
  }

  const first = trimmed.indexOf("{")
  const last = trimmed.lastIndexOf("}")
  if (first >= 0 && last > first) {
    return trimmed.slice(first, last + 1)
  }

  return trimmed
}

async function callGemini(payload: Required<OptimizePayload>, candidates: ModelSpec[]) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable.")
  }

  const endpoint =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`

  const systemPrompt = [
    "You are ModelOpt, an expert local AI model recommendation engine.",
    "Return ONLY valid JSON.",
    "Given the user profile and candidate models, rank the best 5 models.",
    "Prioritize hardware compatibility and the user's speed_preference.",
    "For each recommendation include: name, display_name, reason, tradeoffs, ollama_install, confidence (0-1).",
    "Also include a short summary field and a warnings array.",
  ].join(" ")

  const userPrompt = JSON.stringify(
    {
      user_profile: payload,
      candidate_models: candidates,
      response_schema: {
        summary: "string",
        warnings: ["string"],
        recommendations: [
          {
            name: "string",
            display_name: "string",
            reason: "string",
            tradeoffs: "string",
            ollama_install: "string",
            confidence: 0.85,
          },
        ],
      },
    },
    null,
    2
  )

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
      },
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }],
        },
      ],
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gemini request failed: ${response.status} ${errorText}`)
  }

  const payloadJson = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }

  const text = payloadJson.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) {
    throw new Error("Gemini returned an empty response.")
  }

  const jsonText = extractJsonBlock(text)
  return JSON.parse(jsonText) as {
    summary: string
    warnings: string[]
    recommendations: Array<{
      name: string
      display_name: string
      reason: string
      tradeoffs: string
      ollama_install: string
      confidence: number
    }>
  }
}

function fallbackRecommendations(candidates: ModelSpec[], reason: string) {
  const top = candidates.slice(0, 5)

  return {
    summary:
      "Recommendations generated using deterministic ranking because the AI provider was unavailable.",
    warnings: [reason],
    recommendations: top.map((model, index) => ({
      name: model.name,
      display_name: model.display_name,
      reason:
        index === 0
          ? "Best overall fit based on hardware compatibility and use-case ranking."
          : "Good alternative based on compatibility and performance trade-offs.",
      tradeoffs: model.weaknesses,
      ollama_install: model.ollama_install,
      confidence: index === 0 ? 0.78 : 0.68,
    })),
  }
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request),
  })
}

export async function POST(request: Request) {
  const headers = corsHeaders(request)

  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { error: "CORS origin denied." },
      { status: 403, headers }
    )
  }

  const ip = getClientIp(request)
  const limit = checkRateLimit(ip)
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please retry shortly." },
      {
        status: 429,
        headers: {
          ...headers,
          "Retry-After": String(limit.retryAfterSec),
          "X-RateLimit-Limit": String(MAX_REQUESTS_PER_MINUTE),
          "X-RateLimit-Remaining": "0",
        },
      }
    )
  }

  try {
    const body = (await request.json()) as unknown
    const parsed = payloadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request body.",
          details: parsed.error.flatten(),
        },
        {
          status: 400,
          headers: {
            ...headers,
            "X-RateLimit-Limit": String(MAX_REQUESTS_PER_MINUTE),
            "X-RateLimit-Remaining": String(limit.remaining),
          },
        }
      )
    }

    const gpu = gpuList.find((item) => item.id === parsed.data.gpu)
    if (!gpu) {
      return NextResponse.json(
        { error: "Selected GPU does not exist in supported GPU catalog." },
        {
          status: 400,
          headers: {
            ...headers,
            "X-RateLimit-Limit": String(MAX_REQUESTS_PER_MINUTE),
            "X-RateLimit-Remaining": String(limit.remaining),
          },
        }
      )
    }

    const normalizedPayload: Required<OptimizePayload> = {
      ...parsed.data,
      vram_gb: parsed.data.vram_gb ?? gpu.vram_gb,
      deployment: parsed.data.deployment as Deployment,
    }

    const filtered = modelList.filter((model) => {
      if (model.ram_min_gb > normalizedPayload.ram_gb) {
        return false
      }

      if (normalizedPayload.deployment === "cloud") {
        return true
      }

      return model.vram_min_gb <= normalizedPayload.vram_gb
    })

    if (filtered.length === 0) {
      return NextResponse.json(
        {
          summary: "No compatible models found for this hardware profile.",
          recommendations: [],
          considered_models: [],
        },
        {
          status: 200,
          headers: {
            ...headers,
            "X-RateLimit-Limit": String(MAX_REQUESTS_PER_MINUTE),
            "X-RateLimit-Remaining": String(limit.remaining),
          },
        }
      )
    }

    const ranked = rankModels(filtered, normalizedPayload)
    const topCandidates = ranked.slice(0, 10)

    let geminiResult: {
      summary: string
      warnings: string[]
      recommendations: Array<{
        name: string
        display_name: string
        reason: string
        tradeoffs: string
        ollama_install: string
        confidence: number
      }>
    }

    try {
      geminiResult = await callGemini(normalizedPayload, topCandidates)
    } catch (providerError) {
      const detail =
        providerError instanceof Error ? providerError.message : "Gemini provider unavailable."
      geminiResult = fallbackRecommendations(topCandidates, detail)
    }

    return NextResponse.json({
      ok: true,
      input: normalizedPayload,
      summary: geminiResult.summary,
      warnings: geminiResult.warnings,
      recommendations: geminiResult.recommendations,
      considered_models: topCandidates.map((model) => model.name),
      total_compatible_models: filtered.length,
      engine: {
        model: "gemini-2.0-flash-exp",
        temperature: 0.3,
      },
    }, {
      status: 200,
      headers: {
        ...headers,
        "X-RateLimit-Limit": String(MAX_REQUESTS_PER_MINUTE),
        "X-RateLimit-Remaining": String(limit.remaining),
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error."

    return NextResponse.json(
      {
        error: "Unable to process optimization request. Please try again.",
        details: message,
      },
      {
        status: 500,
        headers: {
          ...headers,
          "X-RateLimit-Limit": String(MAX_REQUESTS_PER_MINUTE),
          "X-RateLimit-Remaining": String(limit.remaining),
        },
      }
    )
  }
}
