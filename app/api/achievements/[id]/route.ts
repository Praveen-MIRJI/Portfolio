import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

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
        const { error } = await supabase.from("achievements").delete().eq("id", id)

        if (error) throw error
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Achievement delete error:", error)
        return NextResponse.json({ error: "Failed to delete achievement" }, { status: 500 })
    }
}
