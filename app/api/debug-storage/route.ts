import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
    try {
        // List all buckets
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

        // List files in project-images
        const { data: projectFiles, error: projectFilesError } = await supabase.storage
            .from("project-images")
            .list()

        // List files in profile-image (for comparison)
        const { data: profileFiles, error: profileFilesError } = await supabase.storage
            .from("profile-image")
            .list()

        return NextResponse.json({
            buckets,
            bucketsError,
            projectImages: {
                files: projectFiles,
                error: projectFilesError
            },
            profileImages: {
                files: profileFiles,
                error: profileFilesError
            }
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
