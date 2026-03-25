export default function BlogQuantizationPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <article className="prose prose-invert mx-auto max-w-3xl">
        <h1>Quantization Explained: Q4 vs Q8 vs FP16</h1>
        <p>Lower-bit quantization improves memory fit and speed but may reduce quality on complex reasoning tasks.</p>
        <p>For most local setups, Q4 or Q5 are practical defaults, while Q8/FP16 are better when memory headroom allows.</p>
      </article>
    </main>
  )
}
