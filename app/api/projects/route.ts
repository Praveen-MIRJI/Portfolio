import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

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
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("year", { ascending: false })

    if (error) throw error
    return NextResponse.json((data || []).map(toFrontend))
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const projectData = await request.json()
    const dbData = toDatabase(projectData)

    const { data, error } = await supabase
      .from("projects")
      .insert(dbData)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(toFrontend(data), { status: 201 })
  } catch (error) {
    console.error("Project create error:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
