import { createClient } from '@supabase/supabase-js';
import { environment } from './environment';

// Try to get Supabase credentials
const supabaseUrl = environment.SUPABASE_URL;
const supabaseKey = environment.SUPABASE_ANON_KEY;

// Provide better error handling to prevent blank screens
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials are missing. Please check your environment variables.');
  
  // Instead of breaking the app, we can initialize with empty strings
  // This will allow the app to render even if Supabase is not configured
  // The auth functionality will be disabled, but the UI will still render
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseUrl, 
  supabaseKey, 
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

// Function to test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('user_settings').select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
      return false;
    }
    
    console.log('Successfully connected to Supabase');
    return true;
  } catch (error) {
    console.error('Error testing Supabase connection:', error);
    return false;
  }
}; 