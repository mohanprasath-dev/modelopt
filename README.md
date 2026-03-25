# ModelOpt

AI Model Optimization Engine that recommends local AI models based on hardware constraints and use cases.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (button, card, select, slider, badge, tabs)

## Project Structure

```text
app/
components/
	ui/
lib/
	data/
		models.json
		gpus.json
	utils/
		index.ts
		modelFilter.ts
public/
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
copy .env.example .env.local
```

3. Start development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Scripts

- `npm run dev` - Run local development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run lint checks

## Data Notes

- `lib/data/models.json` includes 20+ curated models with practical hardware requirements, quantization options, and conservative throughput estimates.
- `lib/data/gpus.json` includes normalized NVIDIA, AMD, and Apple Silicon hardware profiles.
- For JSON compatibility, citations are stored as `sources` and `_meta.citation_comment` fields instead of inline comments.

## Benchmark and Source References

Primary references used in the dataset:

- Ollama model library pages (sizes, context defaults, runtime tags)
- Official model cards on Hugging Face
- Vendor/model-launch technical posts (Meta, Mistral, Qwen, Google, Microsoft, Upstage)
- Vendor hardware specification pages (NVIDIA, AMD, Apple)

See per-model `sources` arrays inside `lib/data/models.json` and root `sources` in `lib/data/gpus.json`.
