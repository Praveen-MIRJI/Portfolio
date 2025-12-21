export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  year: string
}

export interface Skill {
  id: string
  name: string
  category: "frontend" | "backend" | "tools" | "design"
  level: number
  icon?: string
}

export interface SkillCategory {
  id: string
  key: "frontend" | "backend" | "tools" | "design"
  title: string
  description: string
  icon: string
  skills: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  tags: string[]
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string
  achievements: string[]
  current: boolean
}

export interface AboutData {
  name: string
  title: string
  bio: string
  location: string
  email: string
  profileImage?: string
  github?: string
  linkedin?: string
  twitter?: string
  resume?: string
}

export interface PortfolioData {
  about: AboutData
  projects: Project[]
  skills: Skill[]
  skillCategories: SkillCategory[]
  services: Service[]
  experience: Experience[]
}
