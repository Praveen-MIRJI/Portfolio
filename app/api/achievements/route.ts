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

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("achievements")
            .select("*")
            .order("date", { ascending: false })

        if (error) throw error
        return NextResponse.json((data || []).map(toFrontend))
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const json = await request.json()
        const dbData = toDatabase(json)

        const { data, error } = await supabase
            .from("achievements")
            .insert(dbData)
            .select()
            .single()

        if (error) throw error
        return NextResponse.json(toFrontend(data), { status: 201 })
    } catch (error) {
        console.error("Achievement create error:", error)
        return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 })
    }
}
