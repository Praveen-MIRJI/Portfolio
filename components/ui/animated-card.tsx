"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string
}

export function AnimatedCard({ children, className, innerClassName }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "relative h-full rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg",
        innerClassName
      )}>
        {/* Animated border line */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div 
            className={cn(
              "absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out",
              isHovered ? "w-full" : "w-0"
            )}
          />
          <div 
            className={cn(
              "absolute top-0 right-0 w-[2px] bg-gradient-to-b from-accent to-primary transition-all duration-500 ease-out delay-100",
              isHovered ? "h-full" : "h-0"
            )}
          />
          <div 
            className={cn(
              "absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-primary to-accent transition-all duration-500 ease-out delay-200",
              isHovered ? "w-full" : "w-0"
            )}
          />
          <div 
            className={cn(
              "absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-accent to-primary transition-all duration-500 ease-out delay-300",
              isHovered ? "h-full" : "h-0"
            )}
          />
        </div>

        {children}
      </div>
    </div>
  )
}
