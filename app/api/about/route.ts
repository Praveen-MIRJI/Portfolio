import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase.from("about").select("*").single()

    if (error && error.code !== "PGRST116") throw error
    return NextResponse.json(data || null)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const aboutData = await request.json()

    const { data, error } = await supabase
      .from("about")
      .upsert({ ...aboutData, id: "1", updated_at: new Date().toISOString() })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update about data" }, { status: 500 })
  }
}
