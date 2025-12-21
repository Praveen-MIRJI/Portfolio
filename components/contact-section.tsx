"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Send, Loader2, Mail, MapPin } from "lucide-react"
import { usePortfolio } from "@/lib/portfolio-context"
import { cn } from "@/lib/utils"

const API_URL = ""

export function ContactSection() {
  const { data } = usePortfolio()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      toast({
        title: "Message Sent! ✉️",
        description: "Thank you for reaching out. You will get a reply soon through email.",
      })

      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            CONTACT
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Let's talk</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <ContactInfoCard 
                icon={Mail}
                label="Email"
                value={data.about.email}
                href={`mailto:${data.about.email}`}
              />
              <ContactInfoCard 
                icon={MapPin}
                label="Location"
                value={data.about.location}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg overflow-hidden">
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className={cn("absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out", isHovered ? "w-full" : "w-0")} />
                <div className={cn("absolute top-0 right-0 w-[2px] bg-gradient-to-b from-accent to-primary transition-all duration-500 ease-out delay-100", isHovered ? "h-full" : "h-0")} />
                <div className={cn("absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-primary to-accent transition-all duration-500 ease-out delay-200", isHovered ? "w-full" : "w-0")} />
                <div className={cn("absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-accent to-primary transition-all duration-500 ease-out delay-300", isHovered ? "h-full" : "h-0")} />
              </div>

              <div className="relative p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ContactInfoCardProps {
  icon: React.ElementType
  label: string
  value: string
  href?: string
}

function ContactInfoCard({ icon: Icon, label, value, href }: ContactInfoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <div
      className="relative flex items-center gap-4 p-4 rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className={cn("absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out", isHovered ? "w-full" : "w-0")} />
        <div className={cn("absolute top-0 right-0 w-[2px] bg-gradient-to-b from-accent to-primary transition-all duration-500 ease-out delay-100", isHovered ? "h-full" : "h-0")} />
        <div className={cn("absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-primary to-accent transition-all duration-500 ease-out delay-200", isHovered ? "w-full" : "w-0")} />
        <div className={cn("absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-accent to-primary transition-all duration-500 ease-out delay-300", isHovered ? "h-full" : "h-0")} />
      </div>

      <div className={cn("relative w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-300", isHovered && "bg-primary/20")}>
        <Icon className={cn("w-5 h-5 text-primary transition-transform duration-300", isHovered && "scale-110")} />
      </div>
      <div className="relative">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className={cn("font-medium transition-colors duration-300", isHovered && "text-primary")}>{value}</p>
      </div>
    </div>
  )

  if (href) {
    return <a href={href} className="block">{content}</a>
  }

  return <div className="block">{content}</div>
}
