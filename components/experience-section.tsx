"use client"

import { useState } from "react"
import { usePortfolio } from "@/lib/portfolio-context"
import { Badge } from "@/components/ui/badge"
import { Briefcase, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function ExperienceSection() {
  const { data } = usePortfolio()

  return (
    <section className="py-24 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="space-y-4 mb-16">
          <Badge variant="outline" className="px-4 py-1">
            EXPERIENCE
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Work{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              History
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
            A journey through innovative companies and impactful projects that shaped my expertise.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

          <div className="space-y-12">
            {data.experience.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ExperienceCardProps {
  exp: {
    id: string
    company: string
    role: string
    period: string
    description: string
    achievements: string[]
    current: boolean
  }
}

function ExperienceCard({ exp }: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative pl-8 md:pl-20">
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-8 -translate-x-1/2 top-0">
        <div
          className={cn(
            "w-4 h-4 rounded-full border-4 border-background transition-colors duration-300",
            exp.current ? "bg-primary" : "bg-muted-foreground",
            isHovered && "bg-primary"
          )}
        />
      </div>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative bg-card border border-border rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg overflow-hidden">
          {/* Animated border */}
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className={cn("absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out", isHovered ? "w-full" : "w-0")} />
            <div className={cn("absolute top-0 right-0 w-[2px] bg-gradient-to-b from-accent to-primary transition-all duration-500 ease-out delay-100", isHovered ? "h-full" : "h-0")} />
            <div className={cn("absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-primary to-accent transition-all duration-500 ease-out delay-200", isHovered ? "w-full" : "w-0")} />
            <div className={cn("absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-accent to-primary transition-all duration-500 ease-out delay-300", isHovered ? "h-full" : "h-0")} />
          </div>

          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div className="space-y-1">
                <h3 className={cn("text-2xl font-bold flex items-center gap-2 text-balance transition-colors duration-300", isHovered && "text-primary")}>
                  {exp.role}
                  {exp.current && (
                    <Badge variant="default" className="ml-2">
                      Current
                    </Badge>
                  )}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  <span className="font-medium">{exp.company}</span>
                </div>
              </div>
              <Badge variant="outline" className="shrink-0">
                {exp.period}
              </Badge>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-4 text-pretty">{exp.description}</p>

            <div className="space-y-2">
              {exp.achievements.map((achievement, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed text-pretty">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
