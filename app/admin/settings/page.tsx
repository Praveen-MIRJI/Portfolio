"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { usePortfolio } from "@/lib/portfolio-context"
import { useToast } from "@/hooks/use-toast"
import { Download, Upload, Trash2 } from "lucide-react"
import { initialPortfolioData } from "@/lib/portfolio-data"

export default function SettingsPage() {
  const { data, updateData } = usePortfolio()
  const { toast } = useToast()

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "portfolio-data.json"
    link.click()
    toast({ title: "Data exported successfully" })
  }

  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "application/json"
    input.onchange = (e: any) => {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event: any) => {
        try {
          const imported = JSON.parse(event.target.result)
          updateData(imported)
          toast({ title: "Data imported successfully" })
        } catch (error) {
          toast({ title: "Failed to import data", variant: "destructive" })
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      updateData(initialPortfolioData)
      toast({ title: "Data reset to defaults" })
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your portfolio data and preferences</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Import, export, or reset your portfolio data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Button onClick={handleExport} className="gap-2 justify-start bg-transparent" variant="outline">
                <Download className="w-4 h-4" />
                Export Data (JSON)
              </Button>
              <Button onClick={handleImport} className="gap-2 justify-start bg-transparent" variant="outline">
                <Upload className="w-4 h-4" />
                Import Data (JSON)
              </Button>
              <Button onClick={handleReset} className="gap-2 justify-start bg-transparent" variant="outline">
                <Trash2 className="w-4 h-4" />
                Reset to Default Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Statistics</CardTitle>
            <CardDescription>Overview of your portfolio content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary">{data.projects.length}</div>
                <div className="text-sm text-muted-foreground mt-1">Projects</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-accent">{data.skills.length}</div>
                <div className="text-sm text-muted-foreground mt-1">Skills</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-chart-3">{data.experience.length}</div>
                <div className="text-sm text-muted-foreground mt-1">Experiences</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-chart-4">{data.projects.filter((p) => p.featured).length}</div>
                <div className="text-sm text-muted-foreground mt-1">Featured</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
