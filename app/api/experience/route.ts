import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("current", { ascending: false })

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const expData = await request.json()

    // Remove id field if it exists and is empty, and ensure achievements is an array
    const { id, ...processedData } = {
      ...expData,
      achievements: Array.isArray(expData.achievements) ? expData.achievements : []
    }

    const { data, error } = await supabase
      .from("experience")
      .insert(processedData)
      .select()
      .single()

    if (error) {
      throw error
    }
    
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Failed to create experience", 
      details: error.message 
    }, { status: 500 })
  }
}
