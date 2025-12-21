"use client"

import type React from "react"
import { usePortfolio } from "@/lib/portfolio-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Star, Upload, Loader2, ImageIcon } from "lucide-react"
import Image from "next/image"
import type { Project } from "@/lib/types"
import { Switch } from "@/components/ui/switch"

const API_URL = ""

export default function ProjectsPage() {
  const { data, saveProject, deleteProject } = usePortfolio()
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const emptyProject: Omit<Project, "id"> = {
    title: "",
    description: "",
    longDescription: "",
    image: "",
    tags: [],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    year: new Date().getFullYear().toString(),
  }

  const [formData, setFormData] = useState(emptyProject)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({ title: "Error", description: "Please select an image file", variant: "destructive" })
      return
    }

    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = async () => {
        const base64 = reader.result as string
        setImagePreview(base64)

        const res = await fetch(`${API_URL}/api/upload/project-images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: base64,
            fileName: file.name,
            contentType: file.type,
          }),
        })

        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || "Upload failed")
        }

        const { url } = await res.json()
        setFormData({ ...formData, image: url })
        toast({ title: "Success", description: "Image uploaded" })
      }
      reader.readAsDataURL(file)
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
      setImagePreview(null)
    } finally {
      setUploading(false)
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingProject) {
        await saveProject({ ...formData, id: editingProject.id }, false)
        toast({ title: "Project updated successfully" })
      } else {
        await saveProject({ ...formData, id: "" } as Project, true)
        toast({ title: "Project added successfully" })
      }

      setDialogOpen(false)
      setEditingProject(null)
      setFormData(emptyProject)
      setImagePreview(null)
    } catch (error) {
      toast({ title: "Failed to save project", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData(project)
    setImagePreview(project.image || null)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id)
      toast({ title: "Project deleted successfully" })
    } catch (error) {
      toast({ title: "Failed to delete project", variant: "destructive" })
    }
  }

  const handleAddNew = () => {
    setEditingProject(null)
    setFormData(emptyProject)
    setImagePreview(null)
    setDialogOpen(true)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage your portfolio projects</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
              <DialogDescription>Fill in the project details below</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">Long Description</Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              {/* Image Upload Section */}
              <div className="space-y-2">
                <Label>Project Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  {imagePreview || formData.image ? (
                    <div className="relative">
                      <img
                        src={imagePreview || formData.image}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Change Image"}
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center py-8 cursor-pointer hover:bg-muted/50 rounded-lg transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploading ? (
                        <Loader2 className="w-10 h-10 text-muted-foreground animate-spin" />
                      ) : (
                        <>
                          <ImageIcon className="w-10 h-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload project image</p>
                        </>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tags: e.target.value.split(",").map((t) => t.trim()),
                      })
                    }
                    placeholder="React, TypeScript, etc."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live URL (optional)</Label>
                  <Input
                    id="liveUrl"
                    value={formData.liveUrl || ""}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl || ""}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>

              <Button type="submit" className="w-full" disabled={uploading || saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingProject ? "Update Project" : "Add Project"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.projects.map((project) => (
          <Card key={project.id} className="overflow-hidden group">
            <div className="relative h-48 bg-muted">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              {project.featured && (
                <Badge className="absolute top-3 right-3 bg-primary">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-bold text-xl mb-2 text-balance">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-2 bg-transparent"
                  onClick={() => handleEdit(project)}
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
