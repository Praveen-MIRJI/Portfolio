"use client"

import { useState } from "react"
import { usePortfolio } from "@/lib/portfolio-context"
import { Badge } from "@/components/ui/badge"
import {
  Brain, Globe, Workflow, BarChart3, Sparkles, 
  Code2, Database, Server, Cloud, Terminal,
  Cpu, Container, GitBranch, Smartphone, Palette
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  globe: Globe,
  workflow: Workflow,
  "bar-chart": BarChart3,
  sparkles: Sparkles,
  code: Code2,
  database: Database,
  server: Server,
  cloud: Cloud,
  terminal: Terminal,
  cpu: Cpu,
  container: Container,
  git: GitBranch,
  smartphone: Smartphone,
  palette: Palette,
}

// Technology icons data
const technologies = [
  { name: "React", icon: "⚛️", category: "Frontend" },
  { name: "Next.js", icon: "▲", category: "Frontend" },
  { name: "Node.js", icon: "🟢", category: "Backend" },
  { name: "Python", icon: "🐍", category: "Backend" },
  { name: "JavaScript", icon: "🟨", category: "Frontend" },
  { name: "TypeScript", icon: "🔷", category: "Frontend" },
  { name: "MongoDB", icon: "🍃", category: "Database" },
  { name: "PostgreSQL", icon: "🐘", category: "Database" },
  { name: "Docker", icon: "🐳", category: "DevOps" },
  { name: "AWS", icon: "☁️", category: "Cloud" },
  { name: "Git", icon: "📝", category: "Tools" },
  { name: "VS Code", icon: "💙", category: "Tools" },
  { name: "TensorFlow", icon: "🧠", category: "AI/ML" },
  { name: "PyTorch", icon: "🔥", category: "AI/ML" },
  { name: "Pandas", icon: "🐼", category: "Data" },
  { name: "NumPy", icon: "🔢", category: "Data" },
  { name: "Scikit-learn", icon: "🤖", category: "AI/ML" },
  { name: "OpenAI", icon: "🤖", category: "AI/ML" },
  { name: "LangChain", icon: "🔗", category: "AI/ML" },
  { name: "n8n", icon: "🔄", category: "Automation" },
  { name: "Zapier", icon: "⚡", category: "Automation" },
  { name: "MLflow", icon: "📊", category: "MLOps" },
  { name: "Jupyter", icon: "📓", category: "Data" },
  { name: "FastAPI", icon: "⚡", category: "Backend" },
]

export function SkillsSection() {
  const { data } = usePortfolio()
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  const getIcon = (iconName?: string): LucideIcon => {
    return iconMap[iconName?.toLowerCase() || "sparkles"] || Sparkles
  }

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            EXPERTISE
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Core{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Competencies
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Strategic expertise across AI/ML, web development, automation, and data science to build intelligent, scalable solutions.
          </p>
        </div>

        {/* Strategic Skills - 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {data.skillCategories?.map((category) => {
            const Icon = getIcon(category.icon)
            const isHovered = hoveredCategory === category.id

            return (
              <div
                key={category.id}
                className={cn(
                  "group relative rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl cursor-pointer",
                  isHovered && "scale-[1.02]"
                )}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className={cn(
                    "absolute top-0 left-0 h-[3px] bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out",
                    isHovered ? "w-full" : "w-0"
                  )} />
                  <div className={cn(
                    "absolute top-0 right-0 w-[3px] bg-gradient-to-b from-accent to-primary transition-all duration-700 ease-out delay-150",
                    isHovered ? "h-full" : "h-0"
                  )} />
                  <div className={cn(
                    "absolute bottom-0 right-0 h-[3px] bg-gradient-to-l from-primary to-accent transition-all duration-700 ease-out delay-300",
                    isHovered ? "w-full" : "w-0"
                  )} />
                  <div className={cn(
                    "absolute bottom-0 left-0 w-[3px] bg-gradient-to-t from-accent to-primary transition-all duration-700 ease-out delay-450",
                    isHovered ? "h-full" : "h-0"
                  )} />
                </div>

                <div className="relative space-y-6">
                  {/* Icon */}
                  <div className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500",
                    isHovered ? "bg-primary text-primary-foreground scale-110" : "bg-primary/10 text-primary"
                  )}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h3 className={cn(
                    "text-2xl font-bold transition-colors duration-300",
                    isHovered && "text-primary"
                  )}>
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {category.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {category.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className={cn(
                          "px-3 py-1.5 text-sm font-medium transition-all duration-300",
                          isHovered && "bg-primary/20 text-primary border-primary/30"
                        )}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 opacity-0 transition-opacity duration-500",
                  isHovered && "opacity-100"
                )} />
              </div>
            )
          })}
        </div>

        {/* Technologies Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Technologies I Work With
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive toolkit of modern technologies and frameworks I use to build innovative solutions.
            </p>
          </div>

          {/* Technology Grid */}
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className={cn(
                  "group relative aspect-square rounded-xl border border-border bg-card/50 backdrop-blur-sm flex flex-col items-center justify-center p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg cursor-pointer",
                  hoveredTech === tech.name && "scale-110 bg-primary/10 border-primary"
                )}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Tech Icon */}
                <div className="text-2xl md:text-3xl mb-2 transition-transform duration-300 group-hover:scale-125">
                  {tech.icon}
                </div>
                
                {/* Tech Name */}
                <span className={cn(
                  "text-xs font-medium text-center transition-colors duration-300",
                  hoveredTech === tech.name ? "text-primary" : "text-muted-foreground"
                )}>
                  {tech.name}
                </span>

                {/* Category Badge */}
                <Badge 
                  variant="outline" 
                  className={cn(
                    "absolute -top-2 -right-2 text-xs px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    hoveredTech === tech.name && "bg-primary text-primary-foreground"
                  )}
                >
                  {tech.category}
                </Badge>

                {/* Hover Glow */}
                <div className={cn(
                  "absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 transition-opacity duration-300",
                  hoveredTech === tech.name && "opacity-100"
                )} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
