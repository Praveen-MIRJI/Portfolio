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

export function SkillsSection() {
  const { data } = usePortfolio()
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const getIcon = (iconName?: string): LucideIcon => {
    return iconMap[iconName?.toLowerCase() || "sparkles"] || Sparkles
  }

  const technologies = [
    {
      name: "React",
      color: "#61DAFB",
      icon: (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z" />
        </svg>
      )
    },
    {
      name: "Next.js",
      color: "currentColor",
      icon: (
        <svg className="w-10 h-10 text-foreground transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C19.146 4.318 16.956 1.669 13.94.394 13.114.134 12.208.026 11.572.001z" />
        </svg>
      )
    },
    {
      name: "Node.js",
      color: "#339933",
      icon: (
        <svg className="w-10 h-10 text-[#339933] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.275-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
        </svg>
      )
    },
    {
      name: "Python",
      color: "#3776AB",
      icon: (
        <svg className="w-10 h-10 text-[#3776AB] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
        </svg>
      )
    },
    {
      name: "AWS",
      color: "#FF9900",
      icon: (
        <svg className="w-10 h-10 text-[#FF9900] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335c-.072.048-.144.072-.2.072-.08 0-.16-.04-.239-.112a2.417 2.417 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.591-.894-.591-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.27 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.031-.375-1.277-.255-.246-.686-.367-1.297-.367-.279 0-.567.032-.863.104-.296.064-.583.16-.862.272-.128.056-.224.088-.279.104-.056.016-.096.024-.128.024-.112 0-.168-.08-.168-.248v-.391c0-.128.016-.224.056-.28.04-.064.112-.120.207-.176.279-.144.614-.264 1.005-.36A4.86 4.86 0 0 1 4.367 5c.95 0 1.644.216 2.091.647.439.432.662 1.085.662 1.956v2.432h-.357zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.048-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.189.32-.263.215-.391.518-.391.917 0 .375.095.655.279.838.191.184.447.27.774.27l.08.034zm6.415.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55c-.048-.16-.072-.263-.072-.32 0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.160.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312.064-.056.168-.08.32-.08h.638c.151 0 .255.025.32.08.063.048.119.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312.063-.056.167-.08.31-.08h.742c.128 0 .2.065.2.2 0 .04-.009.08-.017.128-.008.048-.024.112-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311-.064.056-.16.08-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.048-.119-.16-.15-.32L9.388 6.97 8.18 11.65c-.04.16-.087.264-.151.32-.064.056-.168.08-.32.08H6.93zm10.256.215c-.415 0-.83-.048-1.229-.144-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223-.032-.072-.056-.151-.056-.24v-.407c0-.167.064-.247.183-.247.048 0 .096.008.151.024.056.016.127.048.2.08.271.12.566.215.878.279.32.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758c0-.223-.072-.415-.207-.583-.144-.168-.415-.32-.814-.455l-1.165-.36c-.59-.183-1.014-.454-1.297-.814-.279-.36-.423-.758-.423-1.205 0-.35.08-.67.231-.942.151-.279.359-.51.615-.694.255-.191.551-.32.886-.415.336-.096.694-.144 1.062-.144.183 0 .375.016.559.040.191.024.367.064.535.104.16.048.31.096.44.151.135.056.24.112.32.168.111.08.191.16.231.25.048.087.08.183.08.294v.375c0 .168-.065.256-.184.256-.064 0-.168-.024-.294-.08-.295-.136-.614-.2-.958-.2-.454 0-.806.072-1.06.216-.247.144-.375.375-.375.67 0 .224.08.416.24.584.159.168.454.336.877.48l1.141.36c.582.183.99.44 1.237.774.247.335.367.718.367 1.157 0 .36-.08.695-.24.99-.159.296-.375.559-.65.773-.271.215-.6.375-.974.488-.375.112-.774.167-1.197.167zm1.87-5.27h-.006z" />
        </svg>
      )
    },
    {
      name: "Docker",
      color: "#2496ED",
      icon: (
        <svg className="w-10 h-10 text-[#2496ED] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
        </svg>
      )
    },
    {
      name: "Git",
      color: "#F05032",
      icon: (
        <svg className="w-10 h-10 text-[#F05032] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
        </svg>
      )
    },
    {
      name: "VS Code",
      color: "#007ACC",
      icon: (
        <svg className="w-10 h-10 text-[#007ACC] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
        </svg>
      )
    }
  ]

  // Quadruple items for smoother infinite loop on large screens
  const carouselItems = [...technologies, ...technologies, ...technologies, ...technologies]

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="container max-w-7xl mx-auto px-4 mb-24">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
      </div>

      {/* Technologies Section - Infinite Carousel Container */}
      <div className="w-full relative py-16 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 mb-12 text-center">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Technologies I Work With
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leveraging a robust ecosystem of modern tools to build scalable, high-performance applications.
          </p>
        </div>

        {/* Gradient Masks for Fade Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="w-full overflow-hidden flex">
          <div className="flex animate-scroll hover:[animation-play-state:paused] py-4">
            {carouselItems.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex flex-col items-center justify-center mx-8 md:mx-12 group"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-card border border-border shadow-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 text-muted-foreground group-hover:text-primary transition-colors duration-300 transform group-hover:scale-110">
                    <div className="w-12 h-12 md:w-16 md:h-16">
                      {tech.icon}
                    </div>
                  </div>
                </div>
                <span className="mt-6 text-lg font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: fit-content;
        }
      `}</style>
    </section>
  )
}
