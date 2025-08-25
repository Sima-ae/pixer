import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  original_price?: number
  image_url: string
  category: string
  author: string
  author_icon: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'vendor' | 'customer'
  avatar_url?: string
}

export interface Order {
  id: string
  tracking_number: string
  customer_email: string
  customer_name: string
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  created_at: string
}
