import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Add validation to check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl ? 'Set' : 'Missing',
    key: supabaseAnonKey ? 'Set' : 'Missing'
  });
  
  // Provide helpful error message
  if (!supabaseUrl) {
    console.error('Please set NEXT_PUBLIC_SUPABASE_URL in your .env.local file');
  }
  if (!supabaseAnonKey) {
    console.error('Please set NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file');
  }
}

// Create client with fallback for development
const client = createClient(
  supabaseUrl || 'http://localhost:54321', // Fallback for local development
  supabaseAnonKey || 'dummy-key-for-development'
);

export const supabase = client;