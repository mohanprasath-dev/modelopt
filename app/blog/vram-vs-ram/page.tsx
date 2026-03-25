export default function BlogVramVsRamPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <article className="prose prose-invert mx-auto max-w-3xl">
        <h1>VRAM vs RAM: What Actually Matters</h1>
        <p>VRAM constrains model loading and runtime on local GPUs, while RAM impacts broader system stability and offload paths.</p>
        <p>Local deployments typically fail first on VRAM limits, which is why ModelOpt prioritizes VRAM compatibility checks.</p>
      </article>
    </main>
  )
}
