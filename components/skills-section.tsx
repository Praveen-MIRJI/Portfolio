"use client"

import { usePortfolio } from "@/lib/portfolio-context"
import { Badge } from "@/components/ui/badge"
import { AnimatedCard } from "@/components/ui/animated-card"
import {
  Code2, Database, Wrench, Palette, Globe, Server, GitBranch, 
  Figma, Layers, Cpu, Cloud, Terminal, Smartphone, Boxes,
  FileCode, Braces, Hash, Workflow, Container, Sparkles
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  database: Database,
  wrench: Wrench,
  palette: Palette,
  globe: Globe,
  server: Server,
  git: GitBranch,
  figma: Figma,
  layers: Layers,
  cpu: Cpu,
  cloud: Cloud,
  terminal: Terminal,
  smartphone: Smartphone,
  boxes: Boxes,
  filecode: FileCode,
  braces: Braces,
  hash: Hash,
  workflow: Workflow,
  container: Container,
  sparkles: Sparkles,
}

export function SkillsSection() {
  const { data } = usePortfolio()
  
  const getIcon = (iconName?: string): LucideIcon => {
    return iconMap[iconName?.toLowerCase() || "sparkles"] || Sparkles
  }

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            SKILLS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Technical{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {data.skillCategories?.map((category) => {
            const Icon = getIcon(category.icon)
            
            return (
              <AnimatedCard key={category.id} innerClassName="p-8">
                <div className="relative space-y-6">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary/10">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {category.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="px-3 py-1.5 text-sm font-medium"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
