"use client"

import { motion } from "framer-motion"

interface AnimateInProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "left" | "right" | "none"
  className?: string
}

export function AnimateIn({
  children,
  delay = 0,
  direction = "up",
  className,
}: AnimateInProps) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 24 : 0,
      x: direction === "left" ? -24 : direction === "right" ? 24 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }

  return (
    <motion.div
      initial={{
        opacity:0,
        y:direction==="up"?24:0,
        x:direction==="left"?-24:direction==="right"?24:0,
      }}
      animate={{
        opacity:1,
        y:0,
        x:0,
      }}
      transition={{
        duration:0.5,

        delay,
        ease:"easeOut",
      }}
      className={className}
      >
      {children}
    </motion.div>
  )
}