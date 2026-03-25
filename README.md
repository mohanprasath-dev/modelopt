# ModelOpt 🚀

> AI Model Optimization Engine - Find the perfect AI model for your hardware

ModelOpt helps developers choose practical AI models based on real hardware constraints (GPU, VRAM, RAM), intended use case, and speed-vs-quality preference. It combines deterministic filtering with Gemini-powered recommendation reasoning and installation-ready commands.

## Features

- Hardware-aware model recommendations
- AI-powered analysis using Gemini
- Instant Ollama install commands
- Support for 20+ popular models
- Beautiful dark-themed UI
- End-to-end optimization flow: Landing -> Form -> Results

## Tech Stack

- Frontend: Next.js 14, TypeScript, Tailwind CSS, ShadCN UI, Framer Motion
- Backend: Vercel Serverless Functions (App Router route handlers)
- AI: Google Gemini API
- Data: Static JSON model + GPU databases
- Validation: Zod + React Hook Form

## Installation

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Gemini API key

### Setup

```bash
# Clone repo
git clone https://github.com/mohanprasath-dev/modelopt.git
cd modelopt

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your GEMINI_API_KEY

# Run development server
pnpm dev
```

Open <http://localhost:3000> in your browser.

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

If you prefer npm:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
app/
  api/optimize/route.ts        # Optimization API (validation, ranking, Gemini)
  app/page.tsx                 # Optimization dashboard form
  results/page.tsx             # Results dashboard
  page.tsx                     # Marketing landing page

components/
  results/                     # Results page UI blocks
  ui/                          # ShadCN primitives

lib/
  data/
    models.json               # Curated AI model catalog
    gpus.json                 # Normalized GPU catalog
  utils/
    modelFilter.ts            # Hardware filtering helpers

DEPLOYMENT.md                  # Deployment runbook
```

## How It Works

1. User submits hardware + preferences in /app.
2. API validates payload (Zod), applies rate limiting, and filters/ranks models.
3. Top candidates are sent to Gemini for reasoning and final recommendation narrative.
4. Results page renders primary, secondary, and lightweight recommendations with install tabs.

## API Overview

Endpoint:

```text
POST /api/optimize
```

Request payload:

```json
{
  "gpu": "rtx_4090",
  "ram_gb": 16,
  "vram_gb": 24,
  "use_cases": ["coding", "chat"],
  "speed_preference": 3,
  "deployment": "local"
}
```

Response includes:

- normalized input
- model recommendations
- summary and warnings
- considered models metadata

## Environment Variables

See .env.example for the complete template.

Required:

- GEMINI_API_KEY: Google AI Studio API key for recommendations

Optional:

- NEXT_PUBLIC_APP_URL: App base URL for share links and metadata

## Data Sources and Notes

- lib/data/models.json includes researched model metadata (hardware requirements, context, quantization, install commands, strengths/weaknesses).
- lib/data/gpus.json includes normalized NVIDIA, AMD, and Apple silicon entries.
- Citations are embedded as sources arrays and metadata fields for JSON compatibility.

## Testing and Validation

Before deploy, run:

```bash
pnpm lint
pnpm build
```

## Deployment

See DEPLOYMENT.md for complete Vercel deployment, environment setup, and production checklist.

## Troubleshooting

- Missing Gemini key: ensure GEMINI_API_KEY is present in .env.local and in Vercel env settings.
- No results shown: retry optimization flow and verify session storage is enabled.
- Rate limited API: wait one minute and retry (default 10 requests/minute/IP).

## License

This project is provided under the repository license in LICENSE.
