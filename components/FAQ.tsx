"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is ModelOpt?",
    answer:
      "ModelOpt is a free AI model recommendation engine. You enter your GPU, RAM, and use cases, and it recommends the best open-source LLMs with install commands for Ollama, llama.cpp, and HuggingFace—powered by Gemini AI reasoning.",
  },
  {
    question: "How accurate are the recommendations?",
    answer:
      "Very accurate for hardware compatibility. We use curated VRAM/RAM thresholds per model. Qualitative ranking uses Gemini's reasoning against your stated use cases and speed preferences.",
  },
  {
    question: "Do I need a powerful GPU?",
    answer:
      "No. ModelOpt works for any hardware tier—from 8GB RAM CPUs to RTX 4090s. We recommend models that actually fit your machine, not just the best-sounding ones.",
  },
  {
    question: "Can I use this for commercial projects?",
    answer:
      "ModelOpt itself is free. The recommended models have their own licenses (Llama 3, Mistral, etc.). Always check the specific model's license for commercial use.",
  },
  {
    question: "How is this different from Ollama's model library?",
    answer:
      "Ollama lists models but doesn't tell you which one is best for your hardware and use case. ModelOpt filters, ranks, and explains—and gives you commands for multiple deployment options, not just Ollama.",
  },
  {
    question: "What models are supported?",
    answer:
      "We track 20+ popular models including Llama 3, Mistral, Qwen, Phi-3, Gemma, CodeLlama, and more. The database is continuously updated as new models are released.",
  },
  {
    question: "Is my data stored or tracked?",
    answer:
      "No server-side storage of personal data. Your optimization form data is processed in real-time and results are stored in your browser's sessionStorage only—cleared when you close the tab.",
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="border-b border-slate-800/80 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-5 text-left text-sm font-medium text-slate-200 transition-colors hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        aria-expanded={isOpen}
      >
        {question}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-4 shrink-0 text-slate-500"
        >
          <ChevronDown className="size-4" aria-hidden="true" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-slate-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28" aria-labelledby="faq-title">
      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-400">
            FAQ
          </span>
          <h2
            id="faq-title"
            className="mt-4 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl"
          >
            Common questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-2xl border border-slate-800/80 bg-slate-900/50 px-6 py-2 backdrop-blur-sm"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
