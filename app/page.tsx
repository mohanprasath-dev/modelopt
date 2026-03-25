import { Features } from "@/components/Features"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { HowItWorks } from "@/components/HowItWorks"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}
