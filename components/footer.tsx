"use client"

import { usePortfolio } from "@/lib/portfolio-context"
import { Github, Linkedin, Mail, Twitter, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const { data } = usePortfolio()
  const { about } = data

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-xl relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block">
                {about.name?.split(" ")[0]}
                <span className="text-foreground">.</span>
              </h3>
              <p className="text-muted-foreground text-pretty max-w-sm leading-relaxed">
                Empowering businesses with intelligent, scalable digital solutions. Let's build something exceptional together.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {about.github && (
                <SocialLink href={`https://github.com/${about.github}`} icon={<Github className="w-5 h-5" />} label="GitHub" />
              )}
              {about.linkedin && (
                <SocialLink href={`https://linkedin.com/in/${about.linkedin}`} icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
              )}
              {about.twitter && (
                <SocialLink href={`https://twitter.com/${about.twitter}`} icon={<Twitter className="w-5 h-5" />} label="Twitter" />
              )}
              <SocialLink href={`mailto:${about.email}`} icon={<Mail className="w-5 h-5" />} label="Email" />
            </div>
          </div>

          {/* Links Column 1 (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground/80">Navigation</h4>
            <ul className="space-y-3">
              <FooterLink href="#hero" label="Home" />
              <FooterLink href="#projects" label="Work" />
              <FooterLink href="#skills" label="Expertise" />
              <FooterLink href="#services" label="Services" />
            </ul>
          </div>

          {/* Links Column 2 (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground/80">Company</h4>
            <ul className="space-y-3">
              <FooterLink href="#about" label="About" />
              <FooterLink href="#contact" label="Contact" />
              <FooterLink href="/admin" label="Admin Portal" />
            </ul>
          </div>

          {/* Newsletter Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground/80">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to my newsletter for the latest updates on tech, design, and development.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/50 border-border focus:border-primary/50 transition-colors"
              />
              <Button className="shrink-0 gap-2">
                Subscribe <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>

        <Separator className="bg-border/50 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {about.name}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> in Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:border-primary transition-all duration-300"
      aria-label={label}
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
      >
        {label}
      </Link>
    </li>
  )
}
