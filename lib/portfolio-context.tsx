"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { PortfolioData, AboutData as About, Project, Skill, SkillCategory, Service, Experience } from "./types"
import { initialPortfolioData } from "./portfolio-data"

const API_URL = process.env.NEXT_PUBLIC_API_URL || ""

interface PortfolioContextType {
  data: PortfolioData
  updateData: (data: PortfolioData) => void
  refreshData: () => Promise<void>
  isLoading: boolean
  // Individual save functions for admin
  saveAbout: (about: About) => Promise<void>
  saveProject: (project: Project, isNew?: boolean) => Promise<Project>
  deleteProject: (id: string) => Promise<void>
  saveSkillCategory: (category: SkillCategory, isNew?: boolean) => Promise<SkillCategory>
  deleteSkillCategory: (id: string) => Promise<void>
  saveService: (service: Service, isNew?: boolean) => Promise<Service>
  deleteService: (id: string) => Promise<void>
  saveExperience: (experience: Experience, isNew?: boolean) => Promise<Experience>
  deleteExperience: (id: string) => Promise<void>
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/portfolio`)
      if (response.ok) {
        const portfolioData = await response.json()
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
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const updateData = (newData: PortfolioData) => {
    setData(newData)
    localStorage.setItem("portfolio-data", JSON.stringify(newData))
  }

  const refreshData = async () => {
    setIsLoading(true)
    await fetchData()
  }

  // Save About
  const saveAbout = async (about: About) => {
    const response = await fetch(`${API_URL}/api/about`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(about),
    })
    if (!response.ok) throw new Error("Failed to save about")
    const savedAbout = await response.json()
    setData(prev => ({ ...prev, about: savedAbout }))
  }

  // Save Project
  const saveProject = async (project: Project, isNew = false): Promise<Project> => {
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? `${API_URL}/api/projects` : `${API_URL}/api/projects/${project.id}`
    
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })
    if (!response.ok) throw new Error("Failed to save project")
    const savedProject = await response.json()
    
    setData(prev => ({
      ...prev,
      projects: isNew 
        ? [...prev.projects, savedProject]
        : prev.projects.map(p => p.id === savedProject.id ? savedProject : p)
    }))
    return savedProject
  }

  // Delete Project
  const deleteProject = async (id: string) => {
    const response = await fetch(`${API_URL}/api/projects/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error("Failed to delete project")
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }))
  }

  // Save Skill Category
  const saveSkillCategory = async (category: SkillCategory, isNew = false): Promise<SkillCategory> => {
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? `${API_URL}/api/skill-categories` : `${API_URL}/api/skill-categories/${category.id}`
    
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    })
    if (!response.ok) throw new Error("Failed to save skill category")
    const savedCategory = await response.json()
    
    setData(prev => ({
      ...prev,
      skillCategories: isNew
        ? [...prev.skillCategories, savedCategory]
        : prev.skillCategories.map(c => c.id === savedCategory.id ? savedCategory : c)
    }))
    return savedCategory
  }

  // Delete Skill Category
  const deleteSkillCategory = async (id: string) => {
    const response = await fetch(`${API_URL}/api/skill-categories/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error("Failed to delete skill category")
    setData(prev => ({ ...prev, skillCategories: prev.skillCategories.filter(c => c.id !== id) }))
  }

  // Save Service
  const saveService = async (service: Service, isNew = false): Promise<Service> => {
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? `${API_URL}/api/services` : `${API_URL}/api/services/${service.id}`
    
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    })
    if (!response.ok) throw new Error("Failed to save service")
    const savedService = await response.json()
    
    setData(prev => ({
      ...prev,
      services: isNew
        ? [...prev.services, savedService]
        : prev.services.map(s => s.id === savedService.id ? savedService : s)
    }))
    return savedService
  }

  // Delete Service
  const deleteService = async (id: string) => {
    const response = await fetch(`${API_URL}/api/services/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error("Failed to delete service")
    setData(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }))
  }

  // Save Experience
  const saveExperience = async (experience: Experience, isNew = false): Promise<Experience> => {
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? `${API_URL}/api/experience` : `${API_URL}/api/experience/${experience.id}`
    
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(experience),
    })
    if (!response.ok) throw new Error("Failed to save experience")
    const savedExperience = await response.json()
    
    setData(prev => ({
      ...prev,
      experience: isNew
        ? [...prev.experience, savedExperience]
        : prev.experience.map(e => e.id === savedExperience.id ? savedExperience : e)
    }))
    return savedExperience
  }

  // Delete Experience
  const deleteExperience = async (id: string) => {
    const response = await fetch(`${API_URL}/api/experience/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error("Failed to delete experience")
    setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }))
  }

  return (
    <PortfolioContext.Provider value={{ 
      data, 
      updateData, 
      refreshData, 
      isLoading,
      saveAbout,
      saveProject,
      deleteProject,
      saveSkillCategory,
      deleteSkillCategory,
      saveService,
      deleteService,
      saveExperience,
      deleteExperience,
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}
