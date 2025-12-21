import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Convert snake_case DB fields to camelCase for frontend
function toFrontend(data: any) {
  if (!data) return null
  return {
    name: data.name,
    title: data.title,
    bio: data.bio,
    location: data.location,
    email: data.email,
    profileImage: data.profile_image,
    github: data.github,
    linkedin: data.linkedin,
    twitter: data.twitter,
    resume: data.resume,
  }
}

// Convert camelCase frontend fields to snake_case for DB
function toDatabase(data: any) {
  return {
    id: "1",
    name: data.name,
    title: data.title,
    bio: data.bio,
    location: data.location,
    email: data.email,
    profile_image: data.profileImage,
    github: data.github,
    linkedin: data.linkedin,
    twitter: data.twitter,
    resume: data.resume,
    updated_at: new Date().toISOString(),
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase.from("about").select("*").single()

    if (error && error.code !== "PGRST116") throw error
    return NextResponse.json(toFrontend(data))
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const aboutData = await request.json()
    const dbData = toDatabase(aboutData)

    const { data, error } = await supabase
      .from("about")
      .upsert(dbData)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(toFrontend(data))
  } catch (error) {
    console.error("About update error:", error)
    return NextResponse.json({ error: "Failed to update about data" }, { status: 500 })
  }
}
