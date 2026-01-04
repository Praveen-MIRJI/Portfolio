import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { deleteImageFromStorage, getBucketName } from "@/lib/image-utils"

// Convert from DB to frontend
function toFrontend(data: any) {
    return {
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image,
        date: data.date,
        credentialUrl: data.credential_url,
    }
}

// Convert from frontend to DB
function toDatabase(data: any) {
    return {
        title: data.title,
        description: data.description,
        image: data.image,
        date: data.date,
        credential_url: data.credentialUrl,
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const json = await request.json()
        
        // Get the current record to check for existing image
        const { data: currentData, error: fetchError } = await supabase
            .from("achievements")
            .select("image")
            .eq("id", id)
            .single()
        
        if (fetchError) throw fetchError
        
        // If there's a new image and an old image exists, delete the old one
        if (json.image && currentData.image && json.image !== currentData.image) {
            const bucket = getBucketName('achievements')
            await deleteImageFromStorage(currentData.image, bucket)
        }
        
        const dbData = toDatabase(json)

        const { data, error } = await supabase
            .from("achievements")
            .update(dbData)
            .eq("id", id)
            .select()
            .single()

        if (error) throw error
        return NextResponse.json(toFrontend(data))
    } catch (error) {
        console.error("Achievement update error:", error)
        return NextResponse.json({ error: "Failed to update achievement" }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        
        // Get the current record to delete associated image
        const { data: currentData, error: fetchError } = await supabase
            .from("achievements")
            .select("image")
            .eq("id", id)
            .single()
        
        if (fetchError) throw fetchError
        
        // Delete the image from storage if it exists
        if (currentData.image) {
            const bucket = getBucketName('achievements')
            await deleteImageFromStorage(currentData.image, bucket)
        }
        
        const { error } = await supabase.from("achievements").delete().eq("id", id)

        if (error) throw error
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Achievement delete error:", error)
        return NextResponse.json({ error: "Failed to delete achievement" }, { status: 500 })
    }
}
