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
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Briefcase, CheckCircle2, Loader2 } from "lucide-react"
import type { Experience } from "@/lib/types"
import { Switch } from "@/components/ui/switch"

export default function ExperiencePage() {
  const { data, saveExperience, deleteExperience } = usePortfolio()
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [saving, setSaving] = useState(false)

  const emptyExperience: Omit<Experience, "id"> = {
    company: "",
    role: "",
    period: "",
    description: "",
    achievements: [],
    current: false,
  }

  const [formData, setFormData] = useState(emptyExperience)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingExperience) {
        await saveExperience({ ...formData, id: editingExperience.id }, false)
        toast({ title: "Experience updated successfully" })
      } else {
        // Don't include id field when creating new experience
        const { id, ...newExperienceData } = { ...formData, id: "" }
        await saveExperience(newExperienceData as Experience, true)
        toast({ title: "Experience added successfully" })
      }

      setDialogOpen(false)
      setEditingExperience(null)
      setFormData(emptyExperience)
    } catch (error: any) {
      toast({ 
        title: "Failed to save experience", 
        description: error.message || "Unknown error occurred",
        variant: "destructive" 
      })
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience)
    setFormData(experience)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteExperience(id)
      toast({ title: "Experience deleted successfully" })
    } catch (error) {
      toast({ title: "Failed to delete experience", variant: "destructive" })
    }
  }

  const handleAddNew = () => {
    setEditingExperience(null)
    setFormData(emptyExperience)
    setDialogOpen(true)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground mt-2">Manage your work experience</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingExperience ? "Edit Experience" : "Add New Experience"}</DialogTitle>
              <DialogDescription>Fill in the experience details below</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Input
                  id="period"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="2020 - Present"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievements">Achievements (one per line)</Label>
                <Textarea
                  id="achievements"
                  value={formData.achievements.join("\n")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      achievements: e.target.value.split("\n").filter((a) => a.trim()),
                    })
                  }
                  rows={4}
                  placeholder="Achievement 1&#10;Achievement 2&#10;Achievement 3"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="current"
                  checked={formData.current}
                  onCheckedChange={(checked) => setFormData({ ...formData, current: checked })}
                />
                <Label htmlFor="current">Current Position</Label>
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingExperience ? "Update Experience" : "Add Experience"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {data.experience.map((exp) => (
          <Card key={exp.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-balance">{exp.role}</h3>
                    {exp.current && <Badge>Current</Badge>}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-medium">{exp.company}</span>
                  </div>
                </div>
                <Badge variant="outline">{exp.period}</Badge>
              </div>

              <p className="text-muted-foreground mb-4 text-pretty">{exp.description}</p>

              <div className="space-y-2 mb-4">
                {exp.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-pretty">{achievement}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2 border-t border-border">
                <Button size="sm" variant="outline" className="gap-2 bg-transparent" onClick={() => handleEdit(exp)}>
                  <Edit className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground gap-2"
                  onClick={() => handleDelete(exp.id)}
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
