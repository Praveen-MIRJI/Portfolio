import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { deleteImageFromStorage, getBucketName } from "@/lib/image-utils"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const categoryData = await request.json()

    // Get the current record to check for existing icon/image
    const { data: currentData, error: fetchError } = await supabase
      .from("skill_categories")
      .select("icon")
      .eq("id", id)
      .single()
    
    if (fetchError) throw fetchError
    
    // If there's a new icon and an old icon exists, delete the old one if it's a URL
    if (categoryData.icon && currentData.icon && categoryData.icon !== currentData.icon) {
      // Only delete if it looks like a URL (uploaded image), not an icon name
      if (currentData.icon.startsWith('http')) {
        const bucket = getBucketName('general')
        await deleteImageFromStorage(currentData.icon, bucket)
      }
    }

    const { data, error } = await supabase
      .from("skill_categories")
      .update({ ...categoryData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update skill category" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Get the current record to delete associated icon/image
    const { data: currentData, error: fetchError } = await supabase
      .from("skill_categories")
      .select("icon")
      .eq("id", id)
      .single()
    
    if (fetchError) throw fetchError
    
    // Delete the image from storage if it exists and is a URL (not an icon name)
    if (currentData.icon && currentData.icon.startsWith('http')) {
      const bucket = getBucketName('general')
      await deleteImageFromStorage(currentData.icon, bucket)
    }

    const { error } = await supabase.from("skill_categories").delete().eq("id", id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete skill category" }, { status: 500 })
  }
}
