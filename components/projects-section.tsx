"use client"

import { useState } from "react"
import { usePortfolio } from "@/lib/portfolio-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function ProjectsSection() {
  const { data } = usePortfolio()
  const featuredProjects = data.projects.filter((p) => p.featured)
  const otherProjects = data.projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            PORTFOLIO
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Innovative applications showcasing expertise in modern web technologies and creative problem-solving.
          </p>
        </div>

        {/* Featured Projects - 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-2xl font-bold">More Projects</h3>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <OtherProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

interface ProjectProps {
  project: {
    id: string
    title: string
    description: string
    longDescription: string
    image: string
    tags: string[]
    liveUrl?: string
    githubUrl?: string
    year: string
  }
}

function FeaturedProjectCard({ project }: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="col-span-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative h-full min-h-[500px] rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg flex flex-col"
        )}
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-10">
          <div className={cn("absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out", isHovered ? "w-full" : "w-0")} />
          <div className={cn("absolute top-0 right-0 w-[2px] bg-gradient-to-b from-accent to-primary transition-all duration-500 ease-out delay-100", isHovered ? "h-full" : "h-0")} />
          <div className={cn("absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-primary to-accent transition-all duration-500 ease-out delay-200", isHovered ? "w-full" : "w-0")} />
          <div className={cn("absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-accent to-primary transition-all duration-500 ease-out delay-300", isHovered ? "h-full" : "h-0")} />
        </div>

        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className={cn("object-cover transition-transform duration-500", isHovered && "scale-105")}
            unoptimized={project.image?.startsWith('http')}
            onError={(e) => {
              console.error('Featured project image failed to load:', project.image);
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 md:p-8 mt-auto z-10">
          {/* Year Badge */}
          <div className="absolute top-6 left-6">
            <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground border-0">
              {project.year}
            </Badge>
          </div>

          {/* Links */}
          <div className="absolute top-6 right-6 flex gap-2">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
            )}
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h3 className="font-bold tracking-tight text-3xl md:text-3xl text-foreground">
              {project.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed text-base md:text-lg line-clamp-3">
              {project.longDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Hover Arrow */}
        <div className={cn(
          "absolute bottom-6 right-6 md:bottom-8 md:right-8 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}>
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  )
}

function OtherProjectCard({ project }: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-10">
          <div className={cn("absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out", isHovered ? "w-full" : "w-0")} />
          <div className={cn("absolute top-0 right-0 w-[2px] bg-gradient-to-b from-accent to-primary transition-all duration-500 ease-out delay-100", isHovered ? "h-full" : "h-0")} />
          <div className={cn("absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-primary to-accent transition-all duration-500 ease-out delay-200", isHovered ? "w-full" : "w-0")} />
          <div className={cn("absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-accent to-primary transition-all duration-500 ease-out delay-300", isHovered ? "h-full" : "h-0")} />
        </div>

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className={cn("object-cover transition-transform duration-500", isHovered && "scale-105")}
            unoptimized={project.image?.startsWith('http')}
            onError={(e) => {
              console.error('Other project image failed to load:', project.image);
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

          <Badge className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-foreground border-0">
            {project.year}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h4 className={cn("font-bold text-lg transition-colors duration-300", isHovered && "text-primary")}>
            {project.title}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            {project.liveUrl && (
              <Button size="sm" variant="default" className="h-8 text-xs gap-1" asChild>
                <Link href={project.liveUrl} target="_blank">
                  <ExternalLink className="w-3 h-3" />
                  Demo
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button size="sm" variant="outline" className="h-8 text-xs gap-1" asChild>
                <Link href={project.githubUrl} target="_blank">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Code
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
