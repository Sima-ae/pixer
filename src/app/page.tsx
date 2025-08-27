'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import ProductCard from '@/components/shop/ProductCard'
import CategoryFilter from '@/components/shop/CategoryFilter'
import { Product, supabase } from '@/lib/supabase'
import { useCart } from '@/lib/cart'
import { useTheme } from '@/lib/theme'
import Link from 'next/link'

// Mock data for development - replace with Supabase data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Temprador WooCommerce Template',
    description: 'Great software is built with amazing developers',
    price: 59.0,
    original_price: 65.0,
    image_url: 'https://picsum.photos/400/300?random=1',
    category: 'WordPress Theme',
    author: 'TripleZero iT',
    author_icon: 'i',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '2',
    name: 'Shoppie UI Kit PSD Ecommerce',
    description: 'Bring the smile to orphans face',
    price: 7.99,
    image_url: 'https://picsum.photos/400/300?random=2',
    category: 'UI templates',
    author: 'TripleZero iT',
    author_icon: 'T',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '3',
    name: 'Shippipro Rental Laravel Script',
    description: 'The leading Customer dashboard for your daily workspace',
    price: 69.0,
    image_url: 'https://picsum.photos/400/300?random=3',
    category: 'PHP Script',
    author: 'Marvel',
    author_icon: 'M',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '4',
    name: 'Bookify Rental Laravel Rental Solution',
    description: 'Bookify Rental Laravel Rental Solution',
    price: 43.0,
    image_url: 'https://picsum.photos/400/300?random=4',
    category: 'PHP Script',
    author: 'Marvel',
    author_icon: 'M',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '5',
    name: 'Phonify Modern Phone Application',
    description: 'Experience your ultimate mobile application',
    price: 29.0,
    image_url: 'https://picsum.photos/400/300?random=5',
    category: 'Mobile App',
    author: 'TripleZero iT',
    author_icon: 'i',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '6',
    name: 'Landity Joomla Angular Landing Page',
    description: 'Learn Design with Nia Matos',
    price: 75.0,
    image_url: 'https://picsum.photos/400/300?random=6',
    category: 'Angular',
    author: 'Marvel',
    author_icon: 'M',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '7',
    name: 'Blogsy Agency Blog Theme',
    description: 'The leading Customer dashboard for your daily workspace',
    price: 79.0,
    image_url: 'https://picsum.photos/400/300?random=7',
    category: 'WordPress Theme',
    author: 'Marvel',
    author_icon: 'M',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '8',
    name: 'Dashify React Shopify Dashboard',
    description: 'Most powerful Dashboard we made',
    price: 69.0,
    image_url: 'https://picsum.photos/400/300?random=8',
    category: 'React',
    author: 'Marvel',
    author_icon: 'M',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '9',
    name: 'Isomorphic React Next Joomla Dashboard',
    description: 'Most powerful Dashboard we made',
    price: 0,
    image_url: 'https://picsum.photos/400/300?random=9',
    category: 'React',
    author: 'Marvel',
    author_icon: 'M',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '10',
    name: 'Phone Gapp All in One Phone CRM',
    description: 'Cloud CRM Software for entry level business enterprise',
    price: 25.0,
    image_url: 'https://picsum.photos/400/300?random=10',
    category: 'Mobile App',
    author: 'Marvel',
    author_icon: 'M',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
]

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(false)
  const { state: cartState } = useCart()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    // TODO: Replace with actual Supabase query
    // fetchProducts()
  }, [selectedCategory])

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((product) => product.category === selectedCategory)

  return (
    <div className={`flex min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-dark-900' : 'bg-gray-50'
    } overflow-x-hidden`}>
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header with Search and Actions */}
        <div className={`transition-colors duration-200 ${
          theme === 'dark' ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'
        } border-b px-4 sm:px-6 lg:px-8 py-4`}>
          <div className="flex items-center justify-between">
            {/* Search Bar - Left Side */}
            <div className="max-w-lg">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    theme === 'dark' 
                      ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-400' 
                      : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Action Icons - Right Side */}
            <div className="flex items-center space-x-4">
              {/* Light/Dark Mode Toggle */}
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-white hover:bg-dark-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`} 
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              
              {/* Overview/Grid Icon */}
              <button className={`p-2 rounded-lg transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-white hover:bg-dark-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`} title="Grid View">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              
              {/* Cart Icon with Notification Badge */}
              <Link href="/cart" className={`relative p-2 rounded-lg transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-white hover:bg-dark-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`} title="Shopping Cart">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartState.itemCount > 99 ? '99+' : cartState.itemCount}
                  </span>
                )}
              </Link>
              
              {/* Become a Seller Button */}
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 hover:shadow-lg" title="Become a Seller">
                Become a Seller
              </button>
            </div>
          </div>
        </div>

        <main className={`flex-1 p-4 sm:p-6 overflow-x-hidden transition-colors duration-200 ${
          theme === 'dark' ? 'bg-dark-900' : 'bg-gray-50'
        }`}>
          <div className="max-w-full">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mt-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className={`text-lg transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>No products found in this category.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
