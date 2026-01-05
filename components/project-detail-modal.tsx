"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectDetailModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    longDescription?: string
    image: string
    tags: string[]
    liveUrl?: string
    githubUrl?: string
    year: string
  } | null
}

export function ProjectDetailModal({ isOpen, onClose, project }: ProjectDetailModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {project.year}
            </Badge>
          </div>
          <DialogTitle className="text-3xl font-bold">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              unoptimized={project.image?.startsWith('http')}
            />
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              About the Project
            </h4>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.longDescription || project.description}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2 uppercase tracking-wider text-muted-foreground">
              <Tag className="w-3 h-3" />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
            {project.liveUrl && (
              <Button asChild className="gap-2">
                <Link href={project.liveUrl} target="_blank">
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild className="gap-2">
                <Link href={project.githubUrl} target="_blank">
                  <Github className="w-4 h-4" />
                  View Code
                </Link>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
