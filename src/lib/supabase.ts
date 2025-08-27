import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔧 Supabase config check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  urlLength: supabaseUrl?.length || 0,
  keyLength: supabaseAnonKey?.length || 0
})

if (!supabaseUrl) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Validate URL format
if (!supabaseUrl.startsWith('https://')) {
  console.error('❌ Invalid NEXT_PUBLIC_SUPABASE_URL format. Must start with https://')
  throw new Error('Invalid NEXT_PUBLIC_SUPABASE_URL format. Must start with https://')
}

console.log('✅ Supabase configuration valid, creating client...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('✅ Supabase client created successfully')

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('❌ Supabase connection test failed:', error)
  } else {
    console.log('✅ Supabase connection test successful')
  }
}).catch(error => {
  console.error('❌ Supabase connection test exception:', error)
})

// Database types
export interface Product {
  id: string
  name: string
  description: string
  short_description?: string
  price: number
  original_price?: number
  image_url: string
  gallery_images?: string[]
  category: string
  tags?: string[]
  author_id?: string
  author: string
  author_icon: string
  sku?: string
  download_url?: string
  demo_url?: string
  documentation_url?: string
  version?: string
  license_type?: string
  file_size?: string
  requirements?: string
  features?: string[]
  changelog?: string
  rating?: number
  review_count?: number
  download_count?: number
  status: 'active' | 'inactive' | 'draft'
  featured?: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: string
  sort_order?: number
  active?: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name?: string
  role: 'admin' | 'buyer' | 'seller'
  avatar_url?: string
  bio?: string
  website?: string
  location?: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  customer_id?: string
  customer_email: string
  customer_name: string
  customer_phone?: string
  billing_address?: any
  shipping_address?: any
  subtotal: number
  tax_amount?: number
  shipping_amount?: number
  discount_amount?: number
  total: number
  currency?: string
  payment_method?: string
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
  order_status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded'
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id?: string
  product_name: string
  product_sku?: string
  quantity: number
  unit_price: number
  total_price: number
  license_type?: string
  download_url?: string
  created_at: string
}

export interface CartItem {
  id: string
  user_id?: string
  session_id?: string
  product_id: string
  quantity: number
  license_type?: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  product_id: string
  user_id?: string
  user_name: string
  rating: number
  title?: string
  comment?: string
  verified_purchase?: boolean
  helpful_count?: number
  status?: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
}

export interface Download {
  id: string
  user_id: string
  product_id: string
  order_id?: string
  download_count?: number
  last_downloaded?: string
  expires_at?: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  read?: boolean
  data?: any
  created_at: string
}

export interface Setting {
  id: string
  key: string
  value?: string
  description?: string
  created_at: string
  updated_at: string
}
