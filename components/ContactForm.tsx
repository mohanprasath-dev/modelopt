"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactResponse {
  ok?: boolean
  delivered?: boolean
  message?: string
  contact_email?: string
  error?: string
}

function buildMailtoUrl(name: string, email: string, message: string, targetEmail: string): string {
  const subject = `ModelOpt contact from ${name.trim() || "Website user"}`
  const bodyLines = [
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    "",
    message.trim(),
  ]

  const params = new URLSearchParams({
    subject,
    body: bodyLines.join("\n"),
  })

  return `mailto:${targetEmail}?${params.toString()}`
}

const INITIAL_FORM = {
  name: "",
  email: "",
  message: "",
}

export function ContactForm() {
  const [form, setForm] = React.useState(INITIAL_FORM)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle")
  const [feedback, setFeedback] = React.useState("")

  const updateField =
    (field: keyof typeof INITIAL_FORM) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
      if (status !== "idle") {
        setStatus("idle")
        setFeedback("")
      }
    }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")
    setFeedback("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const payload = (await response.json().catch(() => null)) as ContactResponse | null

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error ?? payload?.message ?? "Unable to send your message right now.")
      }

      if (payload.delivered) {
        setStatus("success")
        setFeedback(payload.message ?? "Message sent successfully.")
        setForm(INITIAL_FORM)
        return
      }

      const targetEmail = payload.contact_email ?? "hello@modelopt.dev"
      const mailto = buildMailtoUrl(form.name, form.email, form.message, targetEmail)
      window.location.href = mailto
      setStatus("success")
      setFeedback(
        payload.message ?? "No mail backend configured yet. We opened your email client as a fallback."
      )
      setForm(INITIAL_FORM)
    } catch (error) {
      setStatus("error")
      setFeedback(
        error instanceof Error
          ? error.message
          : "A network error occurred. Please retry in a moment."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm text-slate-600">Name</label>
        <Input
          id="contact-name"
          placeholder="Your name"
          className="h-11 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
          value={form.name}
          onChange={updateField("name")}
          required
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm text-slate-600">Email</label>
        <Input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          className="h-11 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
          value={form.email}
          onChange={updateField("email")}
          required
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm text-slate-600">Message</label>
        <Textarea
          id="contact-message"
          placeholder="How can we help?"
          className="min-h-28 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
          value={form.message}
          onChange={updateField("message")}
          required
        />
      </div>
      <Button
        type="submit"
        className="bg-blue-500 text-white hover:bg-blue-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      {feedback ? (
        <p className={status === "error" ? "text-sm text-red-600" : "text-sm text-emerald-600"}>
          {feedback}
        </p>
      ) : null}
    </form>
  )
}
