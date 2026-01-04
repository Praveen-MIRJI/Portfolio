"use client"

import { useState } from "react"
import { usePortfolio } from "@/lib/portfolio-context"
import { Badge } from "@/components/ui/badge"
import {
  Code2, Database, Wrench, Palette, Globe, Server, GitBranch,
  Figma, Layers, Cpu, Cloud, Terminal, Smartphone, Boxes,
  FileCode, Braces, Hash, Workflow, Container, Sparkles,
  Brain, Bot, MessageSquare
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

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
  brain: Brain,
  bot: Bot,
  "message-square": MessageSquare,
}

export function SkillsSection() {
  const { data } = usePortfolio()
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const getIcon = (iconName?: string): LucideIcon => {
    return iconMap[iconName?.toLowerCase() || "sparkles"] || Sparkles
  }

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            SKILLS
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Technical{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Specialized in AI/ML technologies and modern development tools for building intelligent applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.skills?.map((skill) => {
            const Icon = getIcon(skill.icon)
            const isHovered = hoveredSkill === skill.id

            return (
              <div
                key={skill.id}
                className={cn(
                  "group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg cursor-pointer",
                  isHovered && "scale-105"
                )}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <div className={cn(
                    "absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out",
                    isHovered ? "w-full" : "w-0"
                  )} />
                  <div className={cn(
                    "absolute top-0 right-0 w-[2px] bg-gradient-to-b from-accent to-primary transition-all duration-500 ease-out delay-100",
                    isHovered ? "h-full" : "h-0"
                  )} />
                  <div className={cn(
                    "absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-primary to-accent transition-all duration-500 ease-out delay-200",
                    isHovered ? "w-full" : "w-0"
                  )} />
                  <div className={cn(
                    "absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-accent to-primary transition-all duration-500 ease-out delay-300",
                    isHovered ? "h-full" : "h-0"
                  )} />
                </div>

                <div className="relative space-y-4">
                  {/* Icon */}
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300",
                    isHovered ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Skill Name */}
                  <h3 className={cn(
                    "text-lg font-bold transition-colors duration-300",
                    isHovered && "text-primary"
                  )}>
                    {skill.name}
                  </h3>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Proficiency</span>
                      <span className="text-sm font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className={cn(
                          "h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out",
                          isHovered && "animate-pulse"
                        )}
                        style={{ 
                          width: isHovered ? `${skill.level}%` : '0%',
                          transitionDelay: isHovered ? '200ms' : '0ms'
                        }}
                      />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-xs transition-all duration-300",
                      isHovered && "bg-primary/20 text-primary"
                    )}
                  >
                    {skill.category === 'backend' ? 'AI/ML' : 'Tools'}
                  </Badge>
                </div>

                {/* Hover Glow Effect */}
                <div className={cn(
                  "absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300",
                  isHovered && "opacity-100"
                )} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
