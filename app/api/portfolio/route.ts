import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Convert about data from DB (snake_case) to frontend (camelCase)
function convertAbout(data: any) {
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

// Convert projects from DB to frontend
function convertProjects(data: any[]) {
  return data.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    longDescription: p.long_description,
    image: p.image,
    tags: p.tags || [],
    liveUrl: p.live_url,
    githubUrl: p.github_url,
    featured: p.featured,
    year: p.year,
  }))
}

// Convert experience from DB to frontend
function convertExperience(data: any[]) {
  return data.map(e => ({
    id: e.id,
    company: e.company,
    role: e.role,
    period: e.period,
    description: e.description,
    achievements: e.achievements || [],
    current: e.current,
  }))
}

export async function GET() {
  try {
    const [aboutRes, projectsRes, skillsRes, skillCategoriesRes, servicesRes, experienceRes] = await Promise.all([
      supabase.from("about").select("*").single(),
      supabase.from("projects").select("*").order("year", { ascending: false }),
      supabase.from("skills").select("*").order("level", { ascending: false }),
      supabase.from("skill_categories").select("*").order("created_at", { ascending: true }),
      supabase.from("services").select("*").order("created_at", { ascending: true }),
      supabase.from("experience").select("*").order("current", { ascending: false }),
    ])

    return NextResponse.json({
      about: convertAbout(aboutRes.data),
      projects: convertProjects(projectsRes.data || []),
      skills: skillsRes.data || [],
      skillCategories: skillCategoriesRes.data || [],
      services: servicesRes.data || [],
      experience: convertExperience(experienceRes.data || []),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 })
  }
}
