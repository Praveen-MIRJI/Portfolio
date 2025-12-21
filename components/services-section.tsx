"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Brain, 
  MessageSquareText, 
  Bot, 
  Globe, 
  Smartphone, 
  BarChart3,
  ArrowRight,
  Sparkles,
  Code,
  Database,
  Server,
  Cloud,
  LucideIcon
} from "lucide-react"

const API_URL = ""

interface Service {
  id: string
  title: string
  description: string
  icon: string
  tags: string[]
}

const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  "message-square-text": MessageSquareText,
  bot: Bot,
  globe: Globe,
  smartphone: Smartphone,
  "bar-chart-3": BarChart3,
  code: Code,
  database: Database,
  server: Server,
  cloud: Cloud,
  sparkles: Sparkles,
}

const defaultServices: Service[] = [
  {
    id: "1",
    title: "AI / Machine Learning Solutions",
    description: "Custom ML & deep learning models, predictive systems, optimization, and real-world AI deployments.",
    icon: "brain",
    tags: ["TensorFlow", "PyTorch", "Scikit-learn", "MLOps"],
  },
  {
    id: "2",
    title: "NLP & Generative AI",
    description: "LLM-based chatbots, RAG systems, voice/text AI, prompt engineering, and fine-tuned models.",
    icon: "message-square-text",
    tags: ["OpenAI", "LangChain", "RAG", "Fine-tuning"],
  },
  {
    id: "3",
    title: "Agentic AI & Automation",
    description: "Autonomous AI agents, workflow automation using n8n & MCP, business process optimization.",
    icon: "bot",
    tags: ["n8n", "MCP", "AutoGPT", "Workflows"],
  },
  {
    id: "4",
    title: "Full-Stack Web Development",
    description: "Scalable web apps, AI-powered dashboards, APIs, and production-ready systems.",
    icon: "globe",
    tags: ["React", "Next.js", "Node.js", "MongoDB"],
  },
  {
    id: "5",
    title: "Mobile App Development",
    description: "Cross-platform mobile apps with AI integration using Flutter or React Native.",
    icon: "smartphone",
    tags: ["Flutter", "React Native", "iOS", "Android"],
  },
  {
    id: "6",
    title: "Data Analysis & Insights",
    description: "Data preprocessing, visualization, ML insights, and decision-driven analytics.",
    icon: "bar-chart-3",
    tags: ["Python", "Pandas", "Power BI", "SQL"],
  },
]

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [services, setServices] = useState<Service[]>(defaultServices)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_URL}/api/services`)
        if (res.ok) {
          const data = await res.json()
          if (data.length > 0) {
            setServices(data)
          }
        }
      } catch (error) {
        console.error("Failed to fetch services, using defaults")
      }
    }
    fetchServices()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <Sparkles className="w-3 h-3 mr-1.5" />
            SERVICES
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Services I{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Offer
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            End-to-end AI, automation, and full-stack solutions tailored for real-world problems.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className={`transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 md:p-12 text-center overflow-hidden">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Have an idea?{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Let's build it together.
                </span>
              </h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Transform your vision into reality with cutting-edge AI solutions and expert development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  Get Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  Start a Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  service: Service
  index: number
  isVisible: boolean
}

function ServiceCard({ service, index, isVisible }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Sparkles
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
        {/* Animated border line */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div 
            className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out ${
              isHovered ? "w-full" : "w-0"
            }`}
          />
          <div 
            className={`absolute top-0 right-0 w-[2px] bg-gradient-to-b from-accent to-primary transition-all duration-500 ease-out delay-100 ${
              isHovered ? "h-full" : "h-0"
            }`}
          />
          <div 
            className={`absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-primary to-accent transition-all duration-500 ease-out delay-200 ${
              isHovered ? "w-full" : "w-0"
            }`}
          />
          <div 
            className={`absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-accent to-primary transition-all duration-500 ease-out delay-300 ${
              isHovered ? "h-full" : "h-0"
            }`}
          />
        </div>

        <div className="relative space-y-4">
          {/* Icon */}
          <div 
            className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 ${
              isHovered ? "bg-primary/20 scale-110" : ""
            }`}
          >
            <Icon className={`w-6 h-6 text-primary transition-transform duration-300 ${isHovered ? "scale-110" : ""}`} />
          </div>

          {/* Title */}
          <h3 className={`text-lg font-semibold transition-colors duration-300 ${isHovered ? "text-primary" : ""}`}>
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {service.description}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {service.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
