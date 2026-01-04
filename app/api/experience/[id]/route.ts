import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { deleteImageFromStorage, getBucketName } from "@/lib/image-utils"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const expData = await request.json()

    // Get the current record to check for existing image
    const { data: currentData, error: fetchError } = await supabase
      .from("experience")
      .select("image")
      .eq("id", id)
      .single()
    
    if (fetchError) throw fetchError
    
    // If there's a new image and an old image exists, delete the old one
    if (expData.image && currentData.image && expData.image !== currentData.image) {
      const bucket = getBucketName('experience')
      await deleteImageFromStorage(currentData.image, bucket)
    }

    const { data, error } = await supabase
      .from("experience")
      .update({ ...expData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Get the current record to delete associated image
    const { data: currentData, error: fetchError } = await supabase
      .from("experience")
      .select("image")
      .eq("id", id)
      .single()
    
    if (fetchError) throw fetchError
    
    // Delete the image from storage if it exists
    if (currentData.image) {
      const bucket = getBucketName('experience')
      await deleteImageFromStorage(currentData.image, bucket)
    }

    const { error } = await supabase.from("experience").delete().eq("id", id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 })
  }
}
