"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InstallCommandsTabsProps {
  ollamaCommand: string
  llamaCppCommand: string
  huggingFaceModelId: string
  cardLabel: string
}

function CommandBlock({
  label,
  value,
  copyLabel,
}: {
  label: string
  value: string
  copyLabel: string
}) {
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-7 shrink-0 border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-800"
          onClick={copy}
          aria-label={copyLabel}
        >
          {copied ? <Check className="mr-1 size-3" /> : <Copy className="mr-1 size-3" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <pre className="overflow-x-auto rounded-lg bg-slate-900/70 p-2 text-xs text-slate-200 whitespace-pre-wrap break-words">
        <code>{value}</code>
      </pre>
    </div>
  )
}

export function InstallCommandsTabs({
  ollamaCommand,
  llamaCppCommand,
  huggingFaceModelId,
  cardLabel,
}: InstallCommandsTabsProps) {
  return (
    <Tabs defaultValue="ollama" className="w-full">
      <TabsList className="mb-3 bg-slate-800/80 p-1" variant="default">
        <TabsTrigger value="ollama">Ollama</TabsTrigger>
        <TabsTrigger value="llama_cpp">llama.cpp</TabsTrigger>
        <TabsTrigger value="huggingface">HuggingFace</TabsTrigger>
      </TabsList>

      <TabsContent value="ollama">
        <CommandBlock
          label="Ollama"
          value={ollamaCommand}
          copyLabel={`Copy Ollama command for ${cardLabel}`}
        />
      </TabsContent>
      <TabsContent value="llama_cpp">
        <CommandBlock
          label="llama.cpp"
          value={llamaCppCommand}
          copyLabel={`Copy llama.cpp command for ${cardLabel}`}
        />
      </TabsContent>
      <TabsContent value="huggingface">
        <CommandBlock
          label="HuggingFace"
          value={huggingFaceModelId}
          copyLabel={`Copy HuggingFace model id for ${cardLabel}`}
        />
      </TabsContent>
    </Tabs>
  )
}
