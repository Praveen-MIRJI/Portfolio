"use client"

import { useEffect, useState } from "react"

export function CursorFollower() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [smoothPosition, setSmoothPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Check if hovering over clickable element
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        window.getComputedStyle(target).cursor === "pointer"

      setIsPointer(isClickable)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  // Smooth follow animation
  useEffect(() => {
    let animationId: number

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }))
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [position])

  // Don't render on touch devices - handled by CSS (hidden md:block) and event listeners not firing
  // UseEffect for touch detection would cause hydration mismatch if we return null conditionally based on window

  /* Removed: if (typeof window !== "undefined" && "ontouchstart" in window) return null */

  return (
    <>
      {/* Main follower circle */}
      <div
        className={`hidden md:block fixed pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
        style={{
          left: smoothPosition.x,
          top: smoothPosition.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Outer gradient ring */}
        <div
          className={`absolute rounded-full transition-all duration-300 ease-out ${isPointer ? "scale-150 opacity-100" : "scale-100 opacity-70"
            }`}
          style={{
            width: 36,
            height: 36,
            left: -18,
            top: -18,
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(236, 72, 153, 0.4) 100%)",
            filter: "blur(8px)",
          }}
        />

        {/* Inner dot */}
        <div
          className={`absolute rounded-full transition-all duration-200 ease-out ${isPointer ? "scale-0" : "scale-100"
            }`}
          style={{
            width: 8,
            height: 8,
            left: -4,
            top: -4,
            background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
            boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)",
          }}
        />

        {/* Ring border (shows on hover) */}
        <div
          className={`absolute rounded-full border-2 border-primary/60 transition-all duration-300 ease-out ${isPointer ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          style={{
            width: 44,
            height: 44,
            left: -22,
            top: -22,
          }}
        />
      </div>

      {/* Secondary trailing element */}
      <div
        className={`hidden md:block fixed pointer-events-none z-[9998] transition-opacity duration-500 ${isVisible ? "opacity-60" : "opacity-0"
          }`}
        style={{
          left: smoothPosition.x,
          top: smoothPosition.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`rounded-full transition-all duration-500 ease-out ${isPointer ? "scale-[2] opacity-30" : "scale-100 opacity-50"
            }`}
          style={{
            width: 60,
            height: 60,
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          }}
        />
      </div>
    </>
  )
}
