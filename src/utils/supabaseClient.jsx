import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xmdnzbqfqzqicnuyizvy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZG56YnFmcXpxaWNudXlpenZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMjc0NTcsImV4cCI6MjA2MTYwMzQ1N30.UDE3HS9bo5r_9OsZMIBKig3XDVJnBMN6syxATYBfn8E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
