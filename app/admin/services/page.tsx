"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2, X, Save, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const API_URL = ""

interface Service {
  id: string
  title: string
  description: string
  icon: string
  tags: string[]
}

const iconOptions = [
  "brain", "message-square-text", "bot", "globe", "smartphone", 
  "bar-chart-3", "code", "database", "server", "cloud", "sparkles"
]

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "sparkles",
    tags: "",
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/api/services`)
      if (res.ok) {
        const data = await res.json()
        setServices(data)
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch services", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }


  const resetForm = () => {
    setFormData({ title: "", description: "", icon: "sparkles", tags: "" })
    setEditingId(null)
    setIsAdding(false)
  }

  const handleEdit = (service: Service) => {
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      tags: service.tags.join(", "),
    })
    setEditingId(service.id)
    setIsAdding(false)
  }

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast({ title: "Error", description: "Title and description are required", variant: "destructive" })
      return
    }

    setSaving(true)
    const serviceData = {
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
    }

    try {
      if (editingId) {
        const res = await fetch(`${API_URL}/api/services/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceData),
        })
        if (res.ok) {
          toast({ title: "Success", description: "Service updated" })
          fetchServices()
          resetForm()
        }
      } else {
        const res = await fetch(`${API_URL}/api/services`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceData),
        })
        if (res.ok) {
          toast({ title: "Success", description: "Service created" })
          fetchServices()
          resetForm()
        }
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save service", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return
    try {
      const res = await fetch(`${API_URL}/api/services/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast({ title: "Success", description: "Service deleted" })
        fetchServices()
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete service", variant: "destructive" })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Service
          </Button>
        )}
      </div>

      {(isAdding || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Service" : "Add New Service"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Service title"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Service description"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Icon</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {iconOptions.map((icon) => (
                  <Button
                    key={icon}
                    type="button"
                    variant={formData.icon === icon ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, icon })}
                  >
                    {icon}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Tags (comma separated)</label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="React, Node.js, TypeScript"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{service.icon}</Badge>
                    <h3 className="font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {service.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
