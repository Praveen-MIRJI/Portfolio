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
import { Plus, Edit, Trash2, Upload, Loader2, ImageIcon, Trophy } from "lucide-react"
import Image from "next/image"
import type { Achievement } from "@/lib/types"

export default function AchievementsPage() {
    const { data, saveAchievement, deleteAchievement } = usePortfolio()
    const { toast } = useToast()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null)
    const [uploading, setUploading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const emptyAchievement: Omit<Achievement, "id"> = {
        title: "",
        description: "",
        image: "",
        date: new Date().getFullYear().toString(),
        credentialUrl: "",
    }

    const [formData, setFormData] = useState(emptyAchievement)

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

                const res = await fetch(`/api/upload/achievement-images`, {
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
            if (editingAchievement) {
                await saveAchievement({ ...formData, id: editingAchievement.id }, false)
                toast({ title: "Achievement updated successfully" })
            } else {
                await saveAchievement({ ...formData, id: "" } as Achievement, true)
                toast({ title: "Achievement added successfully" })
            }

            setDialogOpen(false)
            setEditingAchievement(null)
            setFormData(emptyAchievement)
            setImagePreview(null)
        } catch (error) {
            toast({ title: "Failed to save achievement", variant: "destructive" })
        } finally {
            setSaving(false)
        }
    }

    const handleEdit = (achievement: Achievement) => {
        setEditingAchievement(achievement)
        setFormData(achievement)
        setImagePreview(achievement.image || null)
        setDialogOpen(true)
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteAchievement(id)
            toast({ title: "Achievement deleted successfully" })
        } catch (error) {
            toast({ title: "Failed to delete achievement", variant: "destructive" })
        }
    }

    const handleAddNew = () => {
        setEditingAchievement(null)
        setFormData(emptyAchievement)
        setImagePreview(null)
        setDialogOpen(true)
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Achievements</h1>
                    <p className="text-muted-foreground mt-2">Manage your awards and certifications</p>
                </div>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleAddNew} className="gap-2">
                            <Plus className="w-4 h-4" />
                            Add Achievement
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingAchievement ? "Edit Achievement" : "Add New Achievement"}</DialogTitle>
                            <DialogDescription>Fill in the achievement details below</DialogDescription>
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
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={2}
                                    required
                                />
                            </div>

                            {/* Image Upload Section */}
                            <div className="space-y-2">
                                <Label>Achievement Image / Certificate</Label>
                                <div className="border-2 border-dashed border-border rounded-lg p-4">
                                    {imagePreview || formData.image ? (
                                        <div className="relative">
                                            <img
                                                src={imagePreview || formData.image}
                                                alt="Preview"
                                                className="w-full h-40 object-cover rounded-lg"
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
                                            className="flex flex-col items-center justify-center py-6 cursor-pointer hover:bg-muted/50 rounded-lg transition-colors"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            {uploading ? (
                                                <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                                            ) : (
                                                <>
                                                    <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                                                    <p className="text-sm text-muted-foreground">Click to upload image</p>
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

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date / Year</Label>
                                    <Input
                                        id="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="credentialUrl">Credential URL (optional)</Label>
                                    <Input
                                        id="credentialUrl"
                                        value={formData.credentialUrl || ""}
                                        onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={uploading || saving}>
                                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {editingAchievement ? "Update Achievement" : "Add Achievement"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.achievements?.map((achievement) => (
                    <Card key={achievement.id} className="overflow-hidden group">
                        <div className="relative h-40 bg-muted">
                            <Image
                                src={achievement.image || "/placeholder.svg"}
                                alt={achievement.title}
                                fill
                                className="object-cover"
                                unoptimized={achievement.image?.startsWith('http')}
                                onError={(e) => {
                                    e.currentTarget.src = '/placeholder.svg'
                                }}
                            />
                            <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground border-0">
                                {achievement.date}
                            </Badge>
                        </div>
                        <CardContent className="p-5 space-y-3">
                            <div>
                                <h3 className="font-bold text-lg mb-1 leading-tight">{achievement.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{achievement.description}</p>
                            </div>

                            <div className="flex items-center gap-2 pt-2 mt-auto">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 gap-2 bg-transparent"
                                    onClick={() => handleEdit(achievement)}
                                >
                                    <Edit className="w-3 h-3" />
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                    onClick={() => handleDelete(achievement.id)}
                                >
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {(!data.achievements || data.achievements.length === 0) && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        <Trophy className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No achievements found. Add one to verify your expertise!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
