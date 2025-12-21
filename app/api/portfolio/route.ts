import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

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
      about: aboutRes.data || null,
      projects: projectsRes.data || [],
      skills: skillsRes.data || [],
      skillCategories: skillCategoriesRes.data || [],
      services: servicesRes.data || [],
      experience: experienceRes.data || [],
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 })
  }
}
