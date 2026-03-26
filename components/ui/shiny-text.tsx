"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ShinyTextProps {
  text: string
  className?: string
  speed?: number
  disabled?: boolean
}

export function ShinyText({ text, className, speed = 3, disabled = false }: ShinyTextProps) {
  const animationDuration = `${speed}s`

  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        !disabled && "animate-shiny-text",
        className
      )}
      style={
        disabled
          ? { color: "inherit" }
          : {
              backgroundImage:
                "linear-gradient(120deg, rgba(148,163,184,0.8) 40%, rgba(255,255,255,1) 50%, rgba(148,163,184,0.8) 60%)",
              backgroundSize: "200% 100%",
              animationDuration,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }
      }
    >
      {text}
    </span>
  )
}
