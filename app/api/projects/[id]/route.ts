import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { deleteImageFromStorage, getBucketName } from "@/lib/image-utils"

// Convert from DB to frontend
function toFrontend(data: any) {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    longDescription: data.long_description,
    image: data.image,
    tags: data.tags || [],
    liveUrl: data.live_url,
    githubUrl: data.github_url,
    featured: data.featured,
    year: data.year,
  }
}

// Convert from frontend to DB
function toDatabase(data: any) {
  return {
    title: data.title,
    description: data.description,
    long_description: data.longDescription,
    image: data.image,
    tags: data.tags || [],
    live_url: data.liveUrl,
    github_url: data.githubUrl,
    featured: data.featured,
    year: data.year,
    updated_at: new Date().toISOString(),
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const projectData = await request.json()
    
    // Get the current record to check for existing image
    const { data: currentData, error: fetchError } = await supabase
      .from("projects")
      .select("image")
      .eq("id", id)
      .single()
    
    if (fetchError) throw fetchError
    
    // If there's a new image and an old image exists, delete the old one
    if (projectData.image && currentData.image && projectData.image !== currentData.image) {
      const bucket = getBucketName('projects')
      await deleteImageFromStorage(currentData.image, bucket)
    }
    
    const dbData = toDatabase(projectData)

    const { data, error } = await supabase
      .from("projects")
      .update(dbData)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(toFrontend(data))
  } catch (error) {
    console.error("Project update error:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Get the current record to delete associated image
    const { data: currentData, error: fetchError } = await supabase
      .from("projects")
      .select("image")
      .eq("id", id)
      .single()
    
    if (fetchError) throw fetchError
    
    // Delete the image from storage if it exists
    if (currentData.image) {
      const bucket = getBucketName('projects')
      await deleteImageFromStorage(currentData.image, bucket)
    }

    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
