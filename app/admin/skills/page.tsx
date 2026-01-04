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
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Plus, Edit, Trash2, Code2, Database, Wrench, Palette, Globe, Server,
  GitBranch, Figma, Layers, Cpu, Cloud, Terminal, Smartphone, Boxes,
  FileCode, Braces, Hash, Workflow, Container, Sparkles, Loader2,
  Brain, Bot, MessageSquare
} from "lucide-react"
import type { Skill } from "@/lib/types"
import type { LucideIcon } from "lucide-react"

const iconOptions = [
  { name: "code", icon: Code2, label: "Code" },
  { name: "terminal", icon: Terminal, label: "Terminal" },
  { name: "brain", icon: Brain, label: "Brain" },
  { name: "cpu", icon: Cpu, label: "CPU" },
  { name: "bot", icon: Bot, label: "Bot" },
  { name: "message-square", icon: MessageSquare, label: "Message" },
  { name: "git", icon: GitBranch, label: "Git" },
  { name: "workflow", icon: Workflow, label: "Workflow" },
  { name: "database", icon: Database, label: "Database" },
  { name: "server", icon: Server, label: "Server" },
  { name: "globe", icon: Globe, label: "Globe" },
  { name: "cloud", icon: Cloud, label: "Cloud" },
  { name: "container", icon: Container, label: "Container" },
  { name: "sparkles", icon: Sparkles, label: "Sparkles" },
]

const iconMap: Record<string, LucideIcon> = Object.fromEntries(
  iconOptions.map(opt => [opt.name, opt.icon])
)

export default function SkillsPage() {
  const { data } = usePortfolio()
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [saving, setSaving] = useState(false)

  const emptySkill: Omit<Skill, "id"> = {
    name: "",
    category: "backend",
    level: 80,
    icon: "code",
  }

  const [formData, setFormData] = useState<Omit<Skill, "id">>(emptySkill)

  const saveSkill = async (skill: Skill, isNew: boolean) => {
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? "/api/skills" : `/api/skills/${skill.id}`
    
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skill),
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.details || errorData.error || "Failed to save skill")
    }
    
    return await response.json()
  }

  const deleteSkill = async (id: string) => {
    const response = await fetch(`/api/skills/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error("Failed to delete skill")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingSkill) {
        await saveSkill({ ...formData, id: editingSkill.id }, false)
        toast({ title: "Skill updated successfully" })
      } else {
        await saveSkill({ ...formData, id: "" } as Skill, true)
        toast({ title: "Skill added successfully" })
      }

      setDialogOpen(false)
      setEditingSkill(null)
      setFormData(emptySkill)
      // Refresh the page to show updated data
      window.location.reload()
    } catch (error: any) {
      toast({ 
        title: "Failed to save skill", 
        description: error.message,
        variant: "destructive" 
      })
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData(skill)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteSkill(id)
      toast({ title: "Skill deleted successfully" })
      // Refresh the page to show updated data
      window.location.reload()
    } catch (error: any) {
      toast({ 
        title: "Failed to delete skill", 
        description: error.message,
        variant: "destructive" 
      })
    }
  }

  const handleAddNew = () => {
    setEditingSkill(null)
    setFormData(emptySkill)
    setDialogOpen(true)
  }

  const getIcon = (iconName?: string): LucideIcon => {
    return iconMap[iconName || "sparkles"] || Sparkles
  }

  const skills = data.skills || []

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Skills</h1>
          <p className="text-muted-foreground mt-2">Manage your individual skills and proficiency levels</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
              <DialogDescription>Configure your skill details</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Python, Machine Learning"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value: "frontend" | "backend" | "tools" | "design") => 
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="backend">Backend/AI-ML</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Proficiency Level: {formData.level}%</Label>
                <Slider
                  value={[formData.level]}
                  onValueChange={(value) => setFormData({ ...formData, level: value[0] })}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Icon</Label>
                <div className="grid grid-cols-7 gap-2 p-3 border rounded-lg max-h-32 overflow-y-auto">
                  {iconOptions.map((opt) => {
                    const Icon = opt.icon
                    const isSelected = formData.icon === opt.name
                    return (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: opt.name })}
                        className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        title={opt.label}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    )
                  })}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingSkill ? "Update Skill" : "Add Skill"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {skills.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No skills yet. Add your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => {
            const Icon = getIcon(skill.icon)
            
            return (
              <Card key={skill.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">{skill.name}</h3>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {skill.category === 'backend' ? 'AI/ML' : skill.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Proficiency</span>
                      <span className="text-sm font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEdit(skill)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleDelete(skill.id)}
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
