import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// For client-side usage with persistent sessions
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'startup-sight-auth-storage'
  }
});

// Create a user
export const createUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
};

// Sign in a user
export const signInUser = async (email: string, password: string, remember: boolean = true) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

// Sign out a user
export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Get the current user
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
}; 