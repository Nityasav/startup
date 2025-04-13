import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

export const createClient = () => {
  if (supabaseInstance) return supabaseInstance;
  
  supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
    },
  });
  
  return supabaseInstance;
} 