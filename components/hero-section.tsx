"use client"

import { usePortfolio } from "@/lib/portfolio-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  const { data } = usePortfolio()
  const { about } = data

  const nameParts = about.name.split(" ")
  const firstName = nameParts.slice(0, -1).join(" ") || nameParts[0]
  const lastName = nameParts[nameParts.length - 1]

  return (
    <section className="relative min-h-screen flex items-center -mt-2">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          
          {/* Left Content - Main Info */}
          <div className="lg:col-span-3 space-y-6">
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Available for opportunities</span>
            </div>

            {/* Name */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                <span className="text-foreground">{firstName}</span>
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {lastName}
                </span>
              </h1>
            </div>

            {/* Title */}
            <p className="text-lg md:text-xl text-muted-foreground font-medium">
              {about.title}
            </p>

            {/* Bio */}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
              {about.bio}
            </p>

            {/* Location & Social */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{about.location}</span>
              </div>
              <div className="flex items-center gap-2">
                {about.github && (
                  <Link href={`https://github.com/${about.github}`} target="_blank" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </Link>
                )}
                {about.linkedin && (
                  <Link href={`https://linkedin.com/in/${about.linkedin}`} target="_blank" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </Link>
                )}
                {about.twitter && (
                  <Link href={`https://twitter.com/${about.twitter}`} target="_blank" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </Link>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="gap-2 group rounded-full bg-gradient-to-r from-primary to-violet-600 hover:opacity-90 shadow-lg shadow-primary/25" asChild>
                <a href="#projects">
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 rounded-full" asChild>
                <a href={`mailto:${about.email}`}>
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </a>
              </Button>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="relative">
              {/* Gradient border frame */}
              <div className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-br from-primary via-accent to-primary opacity-75" />
              
              {/* Inner background */}
              <div className="absolute -inset-0.5 rounded-[1.6rem] bg-background" />
              
              {/* Image */}
              <div className="relative w-64 h-80 md:w-80 md:h-[26rem] lg:w-96 lg:h-[32rem] rounded-[1.5rem] overflow-hidden shadow-xl">
                <Image
                  src={about.profileImage || "/placeholder-user.jpg"}
                  alt={about.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-lg animate-float">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              
              <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: "0.5s" }}>
                <span className="text-white text-xs font-bold">5+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-5 h-8 border border-border rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
