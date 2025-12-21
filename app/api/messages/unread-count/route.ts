import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { count, error } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("read", false)

    if (error) throw error
    return NextResponse.json({ count: count || 0 })
  } catch (error) {
    return NextResponse.json({ count: 0 })
  }
}
