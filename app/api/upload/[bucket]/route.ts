import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

const allowedBuckets = [
  "profile-image",
  "project-images", 
  "experience-images",
  "service-images",
  "general-images"
]

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ bucket: string }> }
) {
  try {
    const { bucket } = await params
    const { file, fileName, contentType } = await request.json()

    if (!file || !fileName) {
      return NextResponse.json(
        { error: "File and fileName are required" },
        { status: 400 }
      )
    }

    // Validate bucket name
    if (!allowedBuckets.includes(bucket)) {
      return NextResponse.json(
        { error: "Invalid bucket name" },
        { status: 400 }
      )
    }

    // Extract base64 data
    const base64Data = file.replace(/^data:image\/\w+;base64,/, "")
    const buffer = Buffer.from(base64Data, "base64")

    // Generate unique filename
    const ext = fileName.split(".").pop() || "jpg"
    const uniqueName = `${bucket.replace("-images", "").replace("-image", "")}-${Date.now()}.${ext}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(uniqueName, buffer, {
        contentType: contentType || "image/jpeg",
        upsert: true,
      })

    if (error) throw error

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(uniqueName)

    return NextResponse.json({
      url: urlData.publicUrl,
      path: data.path,
    })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ bucket: string }> }
) {
  try {
    const { bucket } = await params
    const { searchParams } = new URL(request.url)
    const fileName = searchParams.get("fileName")

    if (!fileName) {
      return NextResponse.json(
        { error: "fileName is required" },
        { status: 400 }
      )
    }

    const { error } = await supabase.storage.from(bucket).remove([fileName])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete image" },
      { status: 500 }
    )
  }
}
