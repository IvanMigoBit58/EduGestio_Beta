import { createBrowserClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      )
    }

    supabaseClient = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  }

  return supabaseClient
}

export type SupabaseClient = ReturnType<typeof getSupabaseClient>
