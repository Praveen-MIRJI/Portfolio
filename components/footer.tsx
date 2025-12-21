"use client"

import { usePortfolio } from "@/lib/portfolio-context"
import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const { data } = usePortfolio()
  const { about } = data

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {about.name}
            </h3>
            <p className="text-sm text-muted-foreground text-pretty">{about.title}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </a>
              <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
                Skills
              </a>
              <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">
                Experience
              </a>
              <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                Admin Panel
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex gap-3">
              {about.github && (
                <a
                  href={`https://github.com/${about.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {about.linkedin && (
                <a
                  href={`https://linkedin.com/in/${about.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {about.twitter && (
                <a
                  href={`https://twitter.com/${about.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              <a href={`mailto:${about.email}`} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-destructive fill-destructive" /> using Next.js
          </p>
          <p>
            © {new Date().getFullYear()} {about.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
