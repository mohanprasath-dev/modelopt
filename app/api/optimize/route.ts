import { NextResponse } from "next/server"
import { z } from "zod"

const payloadSchema = z.object({
  gpu: z.string().min(1),
  ram_gb: z.number().int().min(1),
  vram_gb: z.number().int().min(1),
  use_cases: z.array(z.string()).min(1),
  speed_preference: z.number().int().min(1).max(5),
  deployment: z.enum(["local", "cloud"]),
})

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown
    const parsed = payloadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid optimization payload.",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      ok: true,
      message: "Optimization request accepted.",
      request: parsed.data,
    })
  } catch {
    return NextResponse.json(
      { error: "Unable to process optimization request. Please try again." },
      { status: 500 }
    )
  }
}
