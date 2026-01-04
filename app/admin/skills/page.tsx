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
  Plus, Edit, Trash2, X, Brain, Globe, Workflow, BarChart3,
  Code2, Database, Server, Cloud, Terminal, Cpu, Container, 
  GitBranch, Smartphone, Palette, Sparkles, Loader2
} from "lucide-react"
import type { SkillCategory } from "@/lib/types"
import type { LucideIcon } from "lucide-react"

const iconOptions = [
  { name: "brain", icon: Brain, label: "Brain (AI/ML)" },
  { name: "globe", icon: Globe, label: "Globe (Web)" },
  { name: "workflow", icon: Workflow, label: "Workflow (Automation)" },
  { name: "bar-chart", icon: BarChart3, label: "Chart (Data Science)" },
  { name: "code", icon: Code2, label: "Code" },
  { name: "database", icon: Database, label: "Database" },
  { name: "server", icon: Server, label: "Server" },
  { name: "cloud", icon: Cloud, label: "Cloud" },
  { name: "terminal", icon: Terminal, label: "Terminal" },
  { name: "cpu", icon: Cpu, label: "CPU" },
  { name: "container", icon: Container, label: "Container" },
  { name: "git", icon: GitBranch, label: "Git" },
  { name: "smartphone", icon: Smartphone, label: "Mobile" },
  { name: "palette", icon: Palette, label: "Design" },
  { name: "sparkles", icon: Sparkles, label: "Sparkles" },
]

const iconMap: Record<string, LucideIcon> = Object.fromEntries(
  iconOptions.map(opt => [opt.name, opt.icon])
)

export default function SkillsPage() {
  const { data, saveSkillCategory, deleteSkillCategory } = usePortfolio()
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null)
  const [newSkill, setNewSkill] = useState("")
  const [saving, setSaving] = useState(false)

  const emptyCategory: Omit<SkillCategory, "id"> = {
    key: "ai-ml",
    title: "",
    description: "",
    icon: "brain",
    skills: [],
  }

  const [formData, setFormData] = useState<Omit<SkillCategory, "id">>(emptyCategory)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingCategory) {
        await saveSkillCategory({ ...formData, id: editingCategory.id }, false)
        toast({ title: "Category updated successfully" })
      } else {
        await saveSkillCategory({ ...formData, id: "" } as SkillCategory, true)
        toast({ title: "Category added successfully" })
      }

      setDialogOpen(false)
      setEditingCategory(null)
      setFormData(emptyCategory)
    } catch (error: any) {
      toast({ 
        title: "Failed to save category", 
        description: error.message,
        variant: "destructive" 
      })
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (category: SkillCategory) => {
    setEditingCategory(category)
    setFormData(category)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteSkillCategory(id)
      toast({ title: "Category deleted successfully" })
    } catch (error: any) {
      toast({ 
        title: "Failed to delete category", 
        description: error.message,
        variant: "destructive" 
      })
    }
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
          <h1 className="text-4xl font-bold tracking-tight">Strategic Skills</h1>
          <p className="text-muted-foreground mt-2">Manage your core competency areas and technologies</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Skill Category" : "Add New Skill Category"}</DialogTitle>
              <DialogDescription>Configure your strategic skill area</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Category Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., AI & Machine Learning"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this skill category and its strategic importance..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Icon</Label>
                <div className="grid grid-cols-5 gap-3 p-4 border rounded-lg max-h-40 overflow-y-auto">
                  {iconOptions.map((opt) => {
                    const Icon = opt.icon
                    const isSelected = formData.icon === opt.name
                    return (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: opt.name })}
                        className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        title={opt.label}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs text-center">{opt.label.split(' ')[0]}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Technologies & Skills</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a technology or skill..."
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
                <div className="flex flex-wrap gap-2 mt-3 min-h-[60px] p-3 border rounded-lg bg-muted/30">
                  {formData.skills.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">No technologies added yet</p>
                  ) : (
                    formData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="gap-1 pr-1 py-1">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingCategory ? "Update Category" : "Add Category"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Brain className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
            <h3 className="text-xl font-semibold mb-2">No skill categories yet</h3>
            <p className="text-muted-foreground mb-6">Create your first strategic skill category to showcase your expertise</p>
            <Button onClick={handleAddNew} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Your First Category
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category) => {
            const Icon = getIcon(category.icon)
            
            return (
              <Card key={category.id} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-2xl mb-2">{category.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Technologies ({category.skills.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8 pt-6 border-t opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Category
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
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
