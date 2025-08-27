'use client'

import { useState, useEffect } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import StatCard from '@/components/admin/StatCard'
import { 
  BanknotesIcon, 
  ShoppingCartIcon, 
  ClipboardDocumentListIcon, 
  ShoppingBagIcon,
  EyeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth'

const timeFilters = ['Today', 'Weekly', 'Monthly', 'Yearly']

interface Product {
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

interface Order {
  id: string
  tracking_number: string
  customer_email: string
  customer_name: string
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  created_at: string
}

export default function AdminDashboard() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Today')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalVendors: 0
  })
  const [loading, setLoading] = useState(true)
  const { user, loading: authLoading, isAdmin } = useAuth()

  console.log('🔍 AdminDashboard render:', { user, authLoading, isAdmin, loading })

  useEffect(() => {
    console.log('🔍 AdminDashboard useEffect triggered')
    if (!authLoading && user && isAdmin) {
      console.log('🔍 User authenticated and is admin, fetching data...')
      fetchData()
    } else if (!authLoading && !user) {
      console.log('🔍 User not authenticated')
    } else if (!authLoading && !isAdmin) {
      console.log('🔍 User not admin')
    }
  }, [authLoading, user, isAdmin])

  const fetchData = async () => {
    let productsData: Product[] = []
    
    try {
      setLoading(true)
      console.log('🔄 Starting admin data fetch...')
      
      // Fetch products using direct REST API (same as homepage)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase credentials')
      }
      
      console.log('📦 Fetching products...')
      const productsResponse = await fetch(`${supabaseUrl}/rest/v1/products?select=*&order=created_at.desc`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (!productsResponse.ok) {
        throw new Error(`Products fetch failed: ${productsResponse.status}`)
      }

      productsData = await productsResponse.json()
      console.log('✅ Products fetched:', productsData?.length || 0, 'products')
      
      // Set products immediately so they display
      setProducts(productsData || [])
      
      // Calculate basic stats with products
      const totalProducts = productsData?.length || 0
      const totalVendors = new Set(productsData?.map((p: Product) => p.author) || []).size
      
      // Set initial stats
      setStats({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts,
        totalVendors
      })

      // Fetch orders using original Supabase client (keep this as is)
      let ordersData = []
      try {
        console.log('📦 Fetching orders...')
        const { data: ordersResult, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })

        if (!ordersError && ordersResult) {
          ordersData = ordersResult
          console.log('✅ Orders fetched:', ordersData.length, 'orders')
        }
      } catch (orderError) {
        // Orders table might not exist, continue without it
        console.log('⚠️ Orders not available, continuing without orders')
      }

      // Update stats with orders if available
      const totalRevenue = ordersData?.reduce((sum, order) => sum + order.total, 0) || 0
      const totalOrders = ordersData?.length || 0
      
      setOrders(ordersData || [])
      setStats({
        totalRevenue,
        totalOrders,
        totalProducts,
        totalVendors
      })
      
      console.log('✅ Admin data fetch completed successfully')
    } catch (error) {
      console.error('💥 Error in admin data fetch:', error)
      // Even if there's an error, try to show products if we have them
      if (productsData && productsData.length > 0) {
        setProducts(productsData)
        setStats({
          totalRevenue: 0,
          totalOrders: 0,
          totalProducts: productsData.length,
          totalVendors: new Set(productsData.map((p: Product) => p.author)).size
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) throw error

      // Refresh data
      fetchData()
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    }
  }

  // Show loading state while auth is loading
  if (authLoading) {
    console.log('🔍 Showing auth loading state')
    return (
      <div className="flex min-h-screen bg-dark-900">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4">Authenticating...</p>
            <p className="text-sm text-gray-400 mt-2">This may take a few seconds</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 text-primary-400 hover:text-primary-300 underline"
            >
              Click here if this takes too long
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show error if user is not admin
  if (!user || !isAdmin) {
    console.log('🔍 User not authenticated or not admin, showing error')
    return (
      <div className="flex min-h-screen bg-dark-900">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-gray-400 mb-6">
              {!user ? 'Please log in to access the admin dashboard.' : 'You do not have permission to access this page.'}
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = '/login'} 
                className="btn-primary w-full"
              >
                Go to Login
              </button>
              
              <button 
                onClick={() => window.location.href = '/debug'} 
                className="btn-secondary w-full"
              >
                Debug Authentication
              </button>
              
              <button 
                onClick={() => window.location.reload()} 
                className="text-primary-400 hover:text-primary-300 underline text-sm"
              >
                Reload Page
              </button>
            </div>
            
            {!user && (
              <div className="mt-6 p-4 bg-dark-800 rounded-lg border border-dark-700">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Troubleshooting:</h3>
                <ul className="text-xs text-gray-400 space-y-1 text-left">
                  <li>• Check if you're logged in</li>
                  <li>• Verify your account has admin role</li>
                  <li>• Check browser console for errors</li>
                  <li>• Visit <span className="text-primary-400">/debug</span> for more info</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    console.log('🔍 Showing data loading state')
    return (
      <div className="flex min-h-screen bg-dark-900">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    )
  }

  console.log('🔍 Rendering admin dashboard with:', { products: products.length, orders: orders.length, stats })

  return (
    <div className="flex min-h-screen bg-dark-900">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 p-6">
          {/* Summary Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={`€ ${stats.totalRevenue.toFixed(2).replace('.', ',')}`}
                icon={<BanknotesIcon className="w-6 h-6 text-white" />}
                accentColor="bg-green-500"
              />
              <StatCard
                title="Total Orders"
                value={stats.totalOrders.toString()}
                icon={<ShoppingCartIcon className="w-6 h-6 text-white" />}
                accentColor="bg-purple-500"
              />
              <StatCard
                title="Total Products"
                value={stats.totalProducts.toString()}
                icon={<ClipboardDocumentListIcon className="w-6 h-6 text-white" />}
                accentColor="bg-pink-500"
              />
              <StatCard
                title="Total Vendors"
                value={stats.totalVendors.toString()}
                icon={<ShoppingBagIcon className="w-6 h-6 text-white" />}
                accentColor="bg-red-500"
              />
            </div>
          </div>

          {/* Products Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Products</h2>
              <button className="btn-primary flex items-center space-x-2">
                <PlusIcon className="w-5 h-5" />
                <span>Add Product</span>
              </button>
            </div>
            
            <div className="card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Product</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Price</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Author</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product.id} className="border-b border-dark-700">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={product.image_url} 
                                alt={product.name}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <div>
                                <p className="text-white font-medium">{product.name}</p>
                                <p className="text-gray-400 text-sm line-clamp-1">{product.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-white">{product.category}</td>
                          <td className="py-3 px-4 text-white">
                            € {product.price.toFixed(2).replace('.', ',')}
                          </td>
                          <td className="py-3 px-4 text-white">{product.author}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 rounded-lg hover:bg-dark-700 transition-colors">
                                <EyeIcon className="w-5 h-5 text-gray-400" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-dark-700 transition-colors">
                                <PencilIcon className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 rounded-lg hover:bg-dark-700 transition-colors text-red-400 hover:text-red-300"
                              >
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-400">
                          No products found. Add your first product to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Recent Orders</h2>
            <div className="card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Order ID</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Customer</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Total</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order.id} className="border-b border-dark-700">
                          <td className="py-3 px-4 text-white">{order.id}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-white">{order.customer_name}</p>
                              <p className="text-gray-400 text-sm">{order.customer_email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-white">
                            € {order.total.toFixed(2).replace('.', ',')}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'completed' 
                                ? 'bg-green-500 text-white' 
                                : order.status === 'pending'
                                ? 'bg-yellow-500 text-white'
                                : order.status === 'processing'
                                ? 'bg-blue-500 text-white'
                                : 'bg-red-500 text-white'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-400">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <button className="p-2 rounded-lg hover:bg-dark-700 transition-colors">
                              <EyeIcon className="w-5 h-5 text-gray-400" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-400">
                          No orders found yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
