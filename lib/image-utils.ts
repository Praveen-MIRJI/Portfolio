import { supabase } from "./supabase"

/**
 * Extracts the file path from a Supabase storage URL
 * @param url - The full Supabase storage URL
 * @returns The file path or null if not a valid Supabase URL
 */
export function extractFilePathFromUrl(url: string): string | null {
  if (!url) return null
  
  try {
    // Supabase storage URLs typically look like:
    // https://[project-id].supabase.co/storage/v1/object/public/[bucket]/[file-path]
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/')
    
    // Find the bucket and file path
    const publicIndex = pathParts.indexOf('public')
    if (publicIndex !== -1 && publicIndex < pathParts.length - 2) {
      // Everything after 'public/bucket/' is the file path
      return pathParts.slice(publicIndex + 2).join('/')
    }
    
    return null
  } catch {
    return null
  }
}

/**
 * Deletes an image from Supabase storage using its URL
 * @param imageUrl - The full image URL
 * @param bucket - The storage bucket name
 * @returns Promise<boolean> - Success status
 */
export async function deleteImageFromStorage(imageUrl: string, bucket: string): Promise<boolean> {
  if (!imageUrl) return true // Nothing to delete
  
  const filePath = extractFilePathFromUrl(imageUrl)
  if (!filePath) {
    console.warn('Could not extract file path from URL:', imageUrl)
    return false
  }
  
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath])
    
    if (error) {
      console.error('Error deleting image from storage:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error deleting image from storage:', error)
    return false
  }
}

/**
 * Determines the appropriate bucket name based on the context
 * @param context - The context (e.g., 'projects', 'achievements', 'services', 'experience', etc.)
 * @returns The bucket name
 */
export function getBucketName(context: string): string {
  const bucketMap: Record<string, string> = {
    'projects': 'project-images',
    'achievements': 'achievement-images',
    'services': 'service-images',
    'experience': 'experience-images',
    'about': 'profile-image',
    'profile': 'profile-image',
    'skills': 'general-images',
    'skill-categories': 'general-images',
    'general': 'general-images',
  }
  
  return bucketMap[context] || 'general-images'
}