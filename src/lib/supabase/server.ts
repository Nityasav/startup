import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// This is specifically for server-side API routes
export function createServerClient(request?: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Server: Supabase credentials are missing');
    throw new Error('Supabase credentials are missing');
  }

  // Create the base Supabase client with appropriate options
  const options = {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {} as Record<string, string>,
    }
  };

  // Add cookies if available
  if (request) {
    const cookie = request.headers.get('cookie');
    if (cookie) {
      options.global.headers.cookie = cookie;
    }
  } else {
    try {
      const cookieStore = cookies();
      options.global.headers.cookie = cookieStore.toString();
    } catch (error) {
      console.error('Error accessing cookies:', error);
      // Continue without cookies
    }
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, options);
} 