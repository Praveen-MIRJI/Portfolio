"use client"

import { useState, useEffect, ReactNode } from "react"
import { LoadingScreen } from "./loading-screen"
import { usePortfolio } from "@/lib/portfolio-context"

interface AppWrapperProps {
  children: ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { isLoading: dataLoading } = usePortfolio()

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Don't render content until both loading screen is done AND data is loaded
  const showContent = !isLoading && !dataLoading

  return (
    <>
      {isLoading && (
        <LoadingScreen 
          onLoadingComplete={handleLoadingComplete} 
        />
      )}
      <div className={showContent ? "opacity-100 transition-opacity duration-500" : "opacity-0 pointer-events-none"}>
        {children}
      </div>
    </>
  )
}
