import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { deleteImageFromStorage, getBucketName } from "@/lib/image-utils"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const serviceData = await request.json()

    // Get the current record to check for existing image
    const { data: currentData, error: fetchError } = await supabase
      .from("services")
      .select("image")
      .eq("id", id)
      .single()
    
    if (fetchError) throw fetchError
    
    // If there's a new image and an old image exists, delete the old one
    // This handles both icon field and potential future image field
    if (serviceData.image && currentData.image && serviceData.image !== currentData.image) {
      // Only delete if it looks like a URL (uploaded image), not an icon name
      if (currentData.image.startsWith('http')) {
        const bucket = getBucketName('services')
        await deleteImageFromStorage(currentData.image, bucket)
      }
    }

    const { data, error } = await supabase
      .from("services")
      .update({ ...serviceData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Get the current record to delete associated image
    const { data: currentData, error: fetchError } = await supabase
      .from("services")
      .select("image")
      .eq("id", id)
      .single()
    
    if (fetchError) throw fetchError
    
    // Delete the image from storage if it exists and is a URL (not an icon name)
    if (currentData.image && currentData.image.startsWith('http')) {
      const bucket = getBucketName('services')
      await deleteImageFromStorage(currentData.image, bucket)
    }

    const { error } = await supabase.from("services").delete().eq("id", id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
  }
}
