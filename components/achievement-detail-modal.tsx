"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, Trophy, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface AchievementDetailModalProps {
    isOpen: boolean
    onClose: () => void
    achievement: {
        title: string
        description: string
        image: string
        date: string
        credentialUrl?: string
    } | null
}

export function AchievementDetailModal({ isOpen, onClose, achievement }: AchievementDetailModalProps) {
    if (!achievement) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {achievement.date}
                        </Badge>
                    </div>
                    <DialogTitle className="text-3xl font-bold flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-primary" />
                        {achievement.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Main Image */}
                    <div className="relative aspect-auto min-h-[300px] rounded-xl overflow-hidden border border-border bg-muted/50">
                        <Image
                            src={achievement.image || "/placeholder.svg"}
                            alt={achievement.title}
                            fill
                            className="object-contain"
                            unoptimized={achievement.image?.startsWith('http')}
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold flex items-center gap-2">
                            Details
                        </h4>
                        <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {achievement.description}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                        {achievement.credentialUrl && (
                            <Button asChild className="gap-2">
                                <Link href={achievement.credentialUrl} target="_blank">
                                    <Award className="w-4 h-4" />
                                    Verify Credential
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                            </Button>
                        )}
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
