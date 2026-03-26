"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  once?: boolean
  splitBy?: "word" | "char"
}

export function SplitText({
  text,
  className,
  delay = 0,
  duration = 0.5,
  stagger = 0.04,
  once = true,
  splitBy = "word",
}: SplitTextProps) {
  const items = splitBy === "char" ? text.split("") : text.split(" ")

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={cn("inline-flex flex-wrap gap-[0.25em]", splitBy === "char" && "gap-0", className)}
      aria-label={text}
    >
      {items.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          variants={itemVariants}
          className="inline-block"
          aria-hidden="true"
        >
          {item}
          {splitBy === "char" && item === " " ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  )
}
