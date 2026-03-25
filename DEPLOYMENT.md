# ModelOpt Deployment Guide

This document covers local production checks, Vercel deployment, environment configuration, and post-deploy verification.

## Deployment Targets

- Recommended: Vercel (optimized for Next.js App Router)
- Alternative: Any Node.js host that supports Next.js 14 server output

## Pre-Deployment Checklist

- Node.js 18+ installed
- Dependencies installed
- GEMINI_API_KEY available
- Lint and build passing locally

Run checks:

```bash
pnpm install
pnpm lint
pnpm build
```

## Environment Variables

Set the following in your hosting environment:

- GEMINI_API_KEY (required)
- NEXT_PUBLIC_APP_URL (optional but recommended)

For local:

```bash
cp .env.example .env.local
```

For Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

## Vercel Deployment (Recommended)

### Option A: Git-based deployment (UI)

1. Push repository to GitHub.
2. Open Vercel and import the repository.
3. Framework preset should auto-detect as Next.js.
4. Add environment variables:
   - GEMINI_API_KEY
   - NEXT_PUBLIC_APP_URL (for example, <https://your-app.vercel.app>)
5. Click Deploy.

### Option B: Vercel CLI

```bash
pnpm add -g vercel
vercel login
vercel
```

For production deployment:

```bash
vercel --prod
```

## Build and Runtime Settings

Suggested defaults:

- Install command: pnpm install
- Build command: pnpm build
- Output: Next.js default
- Node version: 18 or 20

## API and Rate Limiting Notes

- Endpoint: POST /api/optimize
- Same-origin CORS behavior enabled in route handler
- Default in-memory rate limit: 10 requests per minute per IP

Important:

- In-memory rate limiting resets on serverless cold starts and does not share state across instances.
- For strict production-grade limiting across regions/instances, migrate limiter storage to Redis (for example, Upstash Redis).

## Post-Deploy Verification

After deployment:

1. Open homepage and verify landing page loads.
2. Go to /app and submit optimization form.
3. Confirm API response from /api/optimize (status 200 on valid payload).
4. Confirm /results renders recommendations and install tabs.
5. Verify clipboard copy actions and share action.

## Rollback Strategy

- Vercel: use previous deployment from Vercel dashboard and promote it.
- Keep environment variables versioned in your secret manager.
- Deploy small increments and validate /api/optimize after each release.

## Monitoring Recommendations

- Enable Vercel Analytics and logs.
- Track API latency and 4xx/5xx rates.
- Watch Gemini provider errors and quota limits.
- Add alerting for elevated 500 responses.

## Security Notes

- Do not expose GEMINI_API_KEY in client-side code.
- Keep API key in server-side env only.
- Validate all API payloads (already enforced via Zod).
- Consider adding bot protection for public deployments.

## Common Deployment Issues

### 1) Missing GEMINI_API_KEY

Symptoms:

- /api/optimize returns 500 with provider error details.

Fix:

- Add GEMINI_API_KEY in Vercel project settings and redeploy.

### 2) No results page data

Symptoms:

- /results redirects or shows empty state.

Fix:

- Complete optimization flow through /app.
- Ensure browser sessionStorage is enabled.

### 3) Unexpected 429 responses

Symptoms:

- Frequent rate-limit errors during testing.

Fix:

- Wait for limit reset (1 minute).
- Use staggered test requests.
- Move to shared Redis limiter for multi-instance production behavior.

## Production Readiness Checklist

- Lint and build passing
- Environment variables configured
- API returns valid recommendations
- Error states tested
- Monitoring and logs enabled
- Rollback path confirmed
