"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { PortfolioData } from "./types"
import { initialPortfolioData } from "./portfolio-data"

const API_URL = process.env.NEXT_PUBLIC_API_URL || ""

interface PortfolioContextType {
  data: PortfolioData
  updateData: (data: PortfolioData) => void
  refreshData: () => Promise<void>
  isLoading: boolean
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/portfolio`)
      if (response.ok) {
        const portfolioData = await response.json()
        // Merge with initial data to ensure all fields exist
        const mergedData: PortfolioData = {
          about: portfolioData.about || initialPortfolioData.about,
          projects: portfolioData.projects || initialPortfolioData.projects,
          skills: portfolioData.skills || initialPortfolioData.skills,
          skillCategories: portfolioData.skillCategories || initialPortfolioData.skillCategories,
          services: portfolioData.services || initialPortfolioData.services,
          experience: portfolioData.experience || initialPortfolioData.experience,
        }
        setData(mergedData)
        localStorage.setItem("portfolio-data", JSON.stringify(mergedData))
      }
    } catch (error) {
      console.error("Failed to fetch portfolio data:", error)
      // Try to load from localStorage as fallback
      const saved = localStorage.getItem("portfolio-data")
      if (saved) {
        try {
          setData(JSON.parse(saved))
        } catch (e) {
          console.error("Failed to parse saved data:", e)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const updateData = (newData: PortfolioData) => {
    setData(newData)
    localStorage.setItem("portfolio-data", JSON.stringify(newData))
  }

  const refreshData = async () => {
    setIsLoading(true)
    await fetchData()
  }

  return <PortfolioContext.Provider value={{ data, updateData, refreshData, isLoading }}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}
