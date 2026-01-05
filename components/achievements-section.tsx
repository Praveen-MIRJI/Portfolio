"use client"

import { usePortfolio } from "@/lib/portfolio-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Trophy, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { Achievement } from "@/lib/types"
import { AchievementDetailModal } from "./achievement-detail-modal"

export function AchievementsSection() {
    const { data } = usePortfolio()
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleMore = (achievement: Achievement) => {
        setSelectedAchievement(achievement)
        setIsModalOpen(true)
    }

    const achievements = data.achievements || []

    if (achievements.length === 0) return null

    return (
        <section id="achievements" className="py-24 px-4 relative overflow-hidden bg-muted/20">
            <div className="container max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 px-4 py-1">
                        <Trophy className="w-3 h-3 mr-1" />
                        RECOGNITION
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Achievements &{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Certifications
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Milestones, awards, and professional certifications that demonstrate my commitment to excellence.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {achievements.map((achievement) => (
                        <AchievementCard
                            key={achievement.id}
                            achievement={achievement}
                            onMore={() => handleMore(achievement)}
                        />
                    ))}
                </div>

                <AchievementDetailModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    achievement={selectedAchievement}
                />
            </div>
        </section>
    )
}

function AchievementCard({ achievement, onMore }: { achievement: Achievement, onMore: () => void }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="h-full"
        >
            <div className="relative h-full min-h-[400px] flex flex-col justify-end rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg group">
                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-30">
                    <div className={cn("absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out", isHovered ? "w-full" : "w-0")} />
                    <div className={cn("absolute top-0 right-0 w-[2px] bg-gradient-to-b from-accent to-primary transition-all duration-500 ease-out delay-100", isHovered ? "h-full" : "h-0")} />
                    <div className={cn("absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-primary to-accent transition-all duration-500 ease-out delay-200", isHovered ? "w-full" : "w-0")} />
                    <div className={cn("absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-accent to-primary transition-all duration-500 ease-out delay-300", isHovered ? "h-full" : "h-0")} />
                </div>

                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={achievement.image || "/placeholder.svg"}
                        alt={achievement.title}
                        fill
                        className={cn("object-cover transition-transform duration-700", isHovered && "scale-110")}
                        unoptimized={achievement.image?.startsWith('http')}
                        onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg'
                        }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent opacity-90" />
                </div>

                <Badge className="absolute top-4 right-4 z-20 bg-background/50 backdrop-blur-md text-foreground border-border/50 shadow-sm">
                    {achievement.date}
                </Badge>

                {/* Content */}
                <div className="relative z-20 p-6 flex flex-col">
                    <div className="mb-4 space-y-3">
                        <h3 className="font-bold text-2xl group-hover:text-primary transition-colors duration-300">
                            {achievement.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                            {achievement.description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                        {achievement.credentialUrl && (
                            <Button size="sm" variant="ghost" className="w-full gap-2 hover:bg-primary/20 hover:text-primary transition-colors justify-start pl-0" asChild>
                                <Link href={achievement.credentialUrl} target="_blank">
                                    <Award className="w-4 h-4" />
                                    View Credential
                                    <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </Button>
                        )}

                        <Button
                            size="sm"
                            variant="ghost"
                            className="w-full gap-2 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors text-xs font-semibold justify-start pl-0"
                            onClick={onMore}
                        >
                            <Trophy className="w-4 h-4" />
                            More Details
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
