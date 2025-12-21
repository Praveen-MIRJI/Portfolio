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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Plus, Edit, Trash2, X, Code2, Database, Wrench, Palette, Globe, Server,
  GitBranch, Figma, Layers, Cpu, Cloud, Terminal, Smartphone, Boxes,
  FileCode, Braces, Hash, Workflow, Container, Sparkles
} from "lucide-react"
import type { SkillCategory } from "@/lib/types"
import type { LucideIcon } from "lucide-react"

const iconOptions = [
  { name: "layers", icon: Layers, label: "Layers" },
  { name: "code", icon: Code2, label: "Code" },
  { name: "database", icon: Database, label: "Database" },
  { name: "wrench", icon: Wrench, label: "Wrench" },
  { name: "palette", icon: Palette, label: "Palette" },
  { name: "globe", icon: Globe, label: "Globe" },
  { name: "server", icon: Server, label: "Server" },
  { name: "git", icon: GitBranch, label: "Git" },
  { name: "figma", icon: Figma, label: "Figma" },
  { name: "cpu", icon: Cpu, label: "CPU" },
  { name: "cloud", icon: Cloud, label: "Cloud" },
  { name: "terminal", icon: Terminal, label: "Terminal" },
  { name: "smartphone", icon: Smartphone, label: "Mobile" },
  { name: "boxes", icon: Boxes, label: "Boxes" },
  { name: "filecode", icon: FileCode, label: "File Code" },
  { name: "braces", icon: Braces, label: "Braces" },
  { name: "hash", icon: Hash, label: "Hash" },
  { name: "workflow", icon: Workflow, label: "Workflow" },
  { name: "container", icon: Container, label: "Container" },
  { name: "sparkles", icon: Sparkles, label: "Sparkles" },
]

const iconMap: Record<string, LucideIcon> = Object.fromEntries(
  iconOptions.map(opt => [opt.name, opt.icon])
)

export default function SkillsPage() {
  const { data, updateData } = usePortfolio()
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null)
  const [newSkill, setNewSkill] = useState("")

  const emptyCategory: Omit<SkillCategory, "id"> = {
    key: "frontend",
    title: "",
    description: "",
    icon: "layers",
    skills: [],
  }

  const [formData, setFormData] = useState<Omit<SkillCategory, "id">>(emptyCategory)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const categories = data.skillCategories || []

    if (editingCategory) {
      const updated = categories.map((c) => 
        c.id === editingCategory.id ? { ...formData, id: c.id } : c
      )
      updateData({ ...data, skillCategories: updated })
      toast({ title: "Category updated successfully" })
    } else {
      const newCategory = { ...formData, id: Date.now().toString() }
      updateData({ ...data, skillCategories: [...categories, newCategory] })
      toast({ title: "Category added successfully" })
    }

    setDialogOpen(false)
    setEditingCategory(null)
    setFormData(emptyCategory)
  }

  const handleEdit = (category: SkillCategory) => {
    setEditingCategory(category)
    setFormData(category)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const categories = data.skillCategories || []
    updateData({ ...data, skillCategories: categories.filter((c) => c.id !== id) })
    toast({ title: "Category deleted successfully" })
  }

  const handleAddNew = () => {
    setEditingCategory(null)
    setFormData(emptyCategory)
    setDialogOpen(true)
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData({ 
      ...formData, 
      skills: formData.skills.filter(s => s !== skillToRemove) 
    })
  }

  const getIcon = (iconName?: string): LucideIcon => {
    return iconMap[iconName || "sparkles"] || Sparkles
  }

  const categories = data.skillCategories || []

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Skills</h1>
          <p className="text-muted-foreground mt-2">Manage your skill categories and technologies</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
              <DialogDescription>Configure your skill category</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Category Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Frontend Development"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this skill category..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Icon</Label>
                <div className="grid grid-cols-5 gap-2 p-3 border rounded-lg max-h-32 overflow-y-auto">
                  {iconOptions.map((opt) => {
                    const Icon = opt.icon
                    const isSelected = formData.icon === opt.name
                    return (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: opt.name })}
                        className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        title={opt.label}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Skills / Technologies</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill()
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkill} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 pr-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                {formData.skills.length === 0 && (
                  <p className="text-xs text-muted-foreground">No skills added yet</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                {editingCategory ? "Update Category" : "Add Category"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Boxes className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No skill categories yet. Add your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const Icon = getIcon(category.icon)
            
            return (
              <Card key={category.id} className="group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg">{category.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {category.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
