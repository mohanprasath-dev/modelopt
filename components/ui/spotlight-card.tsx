"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string
  children: React.ReactNode
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(59, 130, 246, 0.09)",
  ...props
}: SpotlightCardProps) {
  const divRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = divRef.current?.getBoundingClientRect()
    if (!rect) return
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200 bg-white/92 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300",
        isHovered && "border-blue-300 shadow-[0_20px_40px_rgba(59,130,246,0.14)]",
        className
      )}
      style={{
        background: isHovered
          ? `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%), rgb(255 255 255 / 0.96)`
          : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
