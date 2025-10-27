import { createClient } from '@supabase/supabase-js'
import { logError, ErrorSeverity, ErrorCategory } from '@/lib/error-logger'

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string

if (!supabaseUrl || !supabaseKey) {
  const error = 'Missing Supabase environment variables. Please check your .env file.'
  logError(error, ErrorSeverity.CRITICAL, ErrorCategory.UNKNOWN)
  console.error(error)
}

// Create Supabase client with error handling
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'x-application-name': 'kosa-beach-resort',
    },
  },
  db: {
    schema: 'public',
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Supabase error handler helper
export async function handleSupabaseOperation<T>(
  operation: () => Promise<{ data: T | null; error: any }>
): Promise<T | null> {
  try {
    const { data, error } = await operation()
    
    if (error) {
      logError(
        error.message || 'Supabase operation failed',
        ErrorSeverity.MEDIUM,
        ErrorCategory.API,
        { error }
      )
      throw new Error(error.message || 'Database operation failed')
    }
    
    return data
  } catch (error) {
    logError(
      error instanceof Error ? error : String(error),
      ErrorSeverity.MEDIUM,
      ErrorCategory.API
    )
    throw error
  }
}