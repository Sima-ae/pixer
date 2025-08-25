'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import ProductCard from '@/components/shop/ProductCard'
import CategoryFilter from '@/components/shop/CategoryFilter'
import { Product, supabase } from '@/lib/supabase'

// Mock data for development - replace with Supabase data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Temprador WooCommerce Template',
    description: 'Great software is built with amazing developers',
    price: 59.00,
    original_price: 65.00,
    image_url: 'https://picsum.photos/400/300?random=1',
    category: 'WordPress Theme',
    author: 'REDQ',
    author_icon: 'i',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '2',
    name: 'Shoppie UI Kit PSD Ecommerce',
    description: 'Bring the smile to orphans face',
    price: 7.99,
    image_url: 'https://picsum.photos/400/300?random=2',
    category: 'UI templates',
    author: 'REDQ',
    author_icon: 'Q',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '3',
    name: 'Shippipro Rental Laravel Script',
    description: 'The leading Customer dashboard for your daily workspace',
    price: 69.00,
    image_url: 'https://picsum.photos/400/300?random=3',
    category: 'PHP Script',
    author: 'Marvel',
    author_icon: 'M',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '4',
    name: 'Bookify Rental Laravel Rental Solution',
    description: 'Bookify Rental Laravel Rental Solution',
    price: 43.00,
    image_url: 'https://picsum.photos/400/300?random=4',
    category: 'PHP Script',
    author: 'Marvel',
    author_icon: 'M',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '5',
    name: 'Phonify Modern Phone Application',
    description: 'Experience your ultimate mobile application',
    price: 29.00,
    image_url: 'https://picsum.photos/400/300?random=5',
    category: 'Mobile App',
    author: 'REDQ',
    author_icon: 'i',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '6',
    name: 'Landity Joomla Angular Landing Page',
    description: 'Learn Design with Nia Matos',
    price: 75.00,
    image_url: 'https://picsum.photos/400/300?random=6',
    category: 'Angular',
    author: 'Marvel',
    author_icon: 'M',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '7',
    name: 'Blogsy Agency Blog Theme',
    description: 'The leading Customer dashboard for your daily workspace',
    price: 79.00,
    image_url: 'https://picsum.photos/400/300?random=7',
    category: 'WordPress Theme',
    author: 'Marvel',
    author_icon: 'M',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '8',
    name: 'Dashify React Shopify Dashboard',
    description: 'Most powerful Dashboard we made',
    price: 69.00,
    image_url: 'https://picsum.photos/400/300?random=8',
    category: 'React',
    author: 'Marvel',
    author_icon: 'M',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
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
    updated_at: '2024-01-01'
  },
  {
    id: '10',
    name: 'Phone Gapp All in One Phone CRM',
    description: 'Cloud CRM Software for entry level business enterprise',
    price: 25.00,
    image_url: 'https://picsum.photos/400/300?random=10',
    category: 'Mobile App',
    author: 'Marvel',
    author_icon: 'M',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  }
]

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // TODO: Replace with actual Supabase query
    // fetchProducts()
  }, [selectedCategory])

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No products found in this category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
