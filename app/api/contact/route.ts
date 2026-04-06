import { NextResponse } from "next/server"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(4000),
})

const CONTACT_RATE_LIMIT = 8
const WINDOW_MS = 60_000
const RATE_LIMIT_ENTRY_TTL_MS = WINDOW_MS * 3
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()
let lastRateLimitCleanup = 0

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown"
  }

  return request.headers.get("x-real-ip") ?? "unknown"
}

function checkRateLimit(ip: string): { ok: boolean; retryAfter: number; remaining: number } {
  const now = Date.now()

  if (now - lastRateLimitCleanup >= WINDOW_MS) {
    for (const [storedIp, record] of rateLimitStore.entries()) {
      if (record.resetAt + RATE_LIMIT_ENTRY_TTL_MS < now) {
        rateLimitStore.delete(storedIp)
      }
    }
    lastRateLimitCleanup = now
  }

  const existing = rateLimitStore.get(ip)

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true, retryAfter: 60, remaining: CONTACT_RATE_LIMIT - 1 }
  }

  if (existing.count >= CONTACT_RATE_LIMIT) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
      remaining: 0,
    }
  }

  existing.count += 1
  rateLimitStore.set(ip, existing)
  return {
    ok: true,
    retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    remaining: CONTACT_RATE_LIMIT - existing.count,
  }
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  if (!origin) {
    return true
  }

  return origin === new URL(request.url).origin
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "CORS origin denied." }, { status: 403 })
  }

  const limit = checkRateLimit(getClientIp(request))
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please retry shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfter),
          "X-RateLimit-Limit": String(CONTACT_RATE_LIMIT),
          "X-RateLimit-Remaining": "0",
        },
      }
    )
  }

  try {
    const parsed = contactSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid contact payload.",
          details: parsed.error.flatten(),
        },
        {
          status: 400,
          headers: {
            "X-RateLimit-Limit": String(CONTACT_RATE_LIMIT),
            "X-RateLimit-Remaining": String(limit.remaining),
          },
        }
      )
    }

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL
    const contactEmail = process.env.CONTACT_EMAIL ?? "hello@modelopt.dev"

    if (!webhookUrl) {
      return NextResponse.json(
        {
          ok: true,
          delivered: false,
          contact_email: contactEmail,
          message: "Direct delivery is not configured yet. Opening your email app as fallback.",
        },
        {
          status: 202,
          headers: {
            "X-RateLimit-Limit": String(CONTACT_RATE_LIMIT),
            "X-RateLimit-Remaining": String(limit.remaining),
          },
        }
      )
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 7000)

    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsed.data,
          source: "modelopt-contact-form",
          received_at: new Date().toISOString(),
        }),
        signal: controller.signal,
      })

      if (!webhookResponse.ok) {
        throw new Error(`Webhook delivery failed with status ${webhookResponse.status}`)
      }

      return NextResponse.json(
        {
          ok: true,
          delivered: true,
          message: "Your message has been sent. We will get back to you soon.",
        },
        {
          status: 200,
          headers: {
            "X-RateLimit-Limit": String(CONTACT_RATE_LIMIT),
            "X-RateLimit-Remaining": String(limit.remaining),
          },
        }
      )
    } catch {
      return NextResponse.json(
        {
          ok: true,
          delivered: false,
          contact_email: contactEmail,
          message: "Live contact delivery is unavailable. Opening your email app as fallback.",
        },
        {
          status: 202,
          headers: {
            "X-RateLimit-Limit": String(CONTACT_RATE_LIMIT),
            "X-RateLimit-Remaining": String(limit.remaining),
          },
        }
      )
    } finally {
      clearTimeout(timeout)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error."
    const shouldExposeDetails = process.env.NODE_ENV === "development"

    return NextResponse.json(
      {
        error: "Unable to process contact request right now.",
        ...(shouldExposeDetails ? { details: message } : {}),
      },
      {
        status: 500,
        headers: {
          "X-RateLimit-Limit": String(CONTACT_RATE_LIMIT),
          "X-RateLimit-Remaining": String(limit.remaining),
        },
      }
    )
  }
}
