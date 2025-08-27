'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { useTheme } from '@/lib/theme'
import { ArrowLeftIcon, StarIcon, HeartIcon, ShareIcon, TruckIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

// Mock product data - replace with actual Supabase query
const mockProduct = {
  id: '1',
  name: 'Temprador WooCommerce Template',
  description: 'Great software is built with amazing developers. This premium WooCommerce template provides everything you need to create a professional online store with modern design and powerful functionality.',
  longDescription: `Temprador is a premium WooCommerce template designed for modern e-commerce businesses. Built with the latest web technologies, it offers:

• Responsive design that works perfectly on all devices
• Advanced product filtering and search capabilities
• Multiple layout options and customization possibilities
• SEO optimized structure for better search engine rankings
• Fast loading times and excellent performance
• Comprehensive documentation and support

Perfect for fashion stores, electronics, home goods, and any other e-commerce business looking for a professional and modern online presence.`,
  price: 59.0,
  original_price: 65.0,
  sku: 'TEMP-WC-001',
  category: 'WordPress Theme',
  author: 'TripleZero iT',
  author_icon: 'i',
  rating: 4.8,
  reviewCount: 127,
  downloads: 2341,
  lastUpdated: '2024-01-15',
  version: '2.1.0',
  compatibility: 'WordPress 6.0+, WooCommerce 7.0+',
  license: 'GPL v2 or later',
  tags: ['WooCommerce', 'WordPress', 'E-commerce', 'Responsive', 'Modern'],
  features: [
    'Responsive Design',
    'Advanced Product Filtering',
    'Multiple Layout Options',
    'SEO Optimized',
    'Fast Loading',
    'Customizable Colors',
    'Translation Ready',
    'RTL Support'
  ],
  requirements: [
    'WordPress 6.0 or higher',
    'WooCommerce 7.0 or higher',
    'PHP 8.0 or higher',
    'MySQL 5.7 or higher'
  ],
  image_url: 'https://picsum.photos/600/400?random=1',
  gallery: [
    'https://picsum.photos/600/400?random=1',
    'https://picsum.photos/600/400?random=2',
    'https://picsum.photos/600/400?random=3',
    'https://picsum.photos/400/300?random=4',
    'https://picsum.photos/400/300?random=5'
  ],
  demo_url: 'https://demo.temprador.com',
  documentation_url: 'https://docs.temprador.com',
  support_url: 'https://support.triplezero-it.com',
  created_at: '2024-01-01',
  updated_at: '2024-01-15',
}

export default function ProductPage() {
  const params = useParams()
  const { addItem, isInCart, getItemQuantity } = useCart()
  const { theme } = useTheme()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedLicense, setSelectedLicense] = useState('standard')
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  // In a real app, fetch product data based on params.id
  const product = mockProduct

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        original_price: product.original_price,
        image_url: product.image_url,
      })
    } finally {
      setIsAdding(false)
    }
  }

  const quantityInCart = getItemQuantity(product.id)
  const inCart = isInCart(product.id)

  const licenseOptions = [
    { id: 'standard', name: 'Standard License', price: product.price, description: 'Use for 1 project' },
    { id: 'extended', name: 'Extended License', price: product.price * 2.5, description: 'Use for multiple projects' },
    { id: 'unlimited', name: 'Unlimited License', price: product.price * 4, description: 'Unlimited use' }
  ]

  const selectedLicenseOption = licenseOptions.find(option => option.id === selectedLicense)

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-dark-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`transition-colors duration-200 ${
        theme === 'dark' ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'
      } border-b px-4 sm:px-6 lg:px-8 py-4`}>
        <div className="flex items-center space-x-4">
          <Link href="/" className={`transition-colors ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}>
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <div className={`flex items-center space-x-2 text-sm transition-colors ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <Link href="/" className={`hover:text-white transition-colors ${
              theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'
            }`}>Home</Link>
            <span>/</span>
            <Link href={`/?category=${product.category}`} className={`hover:text-white transition-colors ${
              theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'
            }`}>
              {product.category}
            </Link>
            <span>/</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-video bg-dark-800 rounded-lg overflow-hidden">
              <Image
                src={product.gallery[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 bg-dark-800 bg-opacity-80 rounded-lg text-gray-300 hover:text-white transition-colors">
                  <HeartIcon className="w-5 h-5" />
                </button>
                <button className="p-2 bg-dark-800 bg-opacity-80 rounded-lg text-gray-300 hover:text-white transition-colors">
                  <ShareIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-video bg-dark-800 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-primary-500' 
                      : 'border-transparent hover:border-gray-600'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-400 bg-dark-700 px-2 py-1 rounded">
                  {product.category}
                </span>
                <span className="text-sm text-gray-400 bg-dark-700 px-2 py-1 rounded">
                  v{product.version}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-3">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-300">{product.rating}</span>
                </div>
                <span className="text-gray-400">({product.reviewCount} reviews)</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{product.downloads} downloads</span>
              </div>
            </div>

            {/* Price and License Selection */}
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-3xl font-bold text-primary-500">
                  € {selectedLicenseOption?.price.toFixed(2).replace('.', ',')}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-xl text-gray-400 line-through">
                    € {product.original_price.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <span className="text-sm text-gray-400">EUR</span>
              </div>

              {/* License Options */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium text-gray-300">License Type:</label>
                {licenseOptions.map((option) => (
                  <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="license"
                      value={option.id}
                      checked={selectedLicense === option.id}
                      onChange={(e) => setSelectedLicense(e.target.value)}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{option.name}</span>
                        <span className="text-primary-500 font-bold">
                          € {option.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Add to Cart Section */}
              <div className="space-y-4">
                {inCart ? (
                  <div className="text-center">
                    <div className="text-green-400 mb-2">✓ Added to Cart</div>
                    <div className="text-sm text-gray-400">
                      Quantity in cart: {quantityInCart}
                    </div>
                    <Link 
                      href="/cart"
                      className="btn-primary w-full mt-3"
                    >
                      View Cart
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <label className="text-sm font-medium text-gray-300">Quantity:</label>
                      <div className="flex items-center border border-dark-600 rounded-lg">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-2 text-white min-w-[3rem] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleAddToCart}
                      disabled={isAdding}
                      className="btn-primary w-full py-3 text-lg font-medium"
                    >
                      {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-2 mb-2">
                  <TruckIcon className="w-5 h-5 text-primary-500" />
                  <span className="text-white font-medium">Instant Download</span>
                </div>
                <p className="text-sm text-gray-400">Get your files immediately after purchase</p>
              </div>
              
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center space-x-2 mb-2">
                  <ShieldCheckIcon className="w-5 h-5 text-primary-500" />
                  <span className="text-white font-medium">Secure Payment</span>
                </div>
                <p className="text-sm text-gray-400">SSL encrypted, secure checkout</p>
              </div>
            </div>

            {/* Product Meta */}
            <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">SKU:</span>
                  <span className="text-white ml-2">{product.sku}</span>
                </div>
                <div>
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white ml-2">{product.category}</span>
                </div>
                <div>
                  <span className="text-gray-400">Author:</span>
                  <span className="text-white ml-2">{product.author}</span>
                </div>
                <div>
                  <span className="text-gray-400">Last Updated:</span>
                  <span className="text-white ml-2">{product.lastUpdated}</span>
                </div>
                <div>
                  <span className="text-gray-400">Version:</span>
                  <span className="text-white ml-2">{product.version}</span>
                </div>
                <div>
                  <span className="text-gray-400">License:</span>
                  <span className="text-white ml-2">{product.license}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-dark-700">
            <nav className="flex space-x-8">
              {[
                { id: 'description', name: 'Description' },
                { id: 'features', name: 'Features' },
                { id: 'requirements', name: 'Requirements' },
                { id: 'reviews', name: 'Reviews' },
                { id: 'support', name: 'Support' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-500'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">{product.longDescription}</p>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'requirements' && (
              <div className="space-y-4">
                <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                  <h4 className="text-white font-medium mb-2">System Requirements</h4>
                  <div className="space-y-2">
                    {product.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-gray-300">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                  <h4 className="text-white font-medium mb-2">Compatibility</h4>
                  <p className="text-gray-300">{product.compatibility}</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-2xl font-bold text-white mb-2">Customer Reviews</h3>
                <p className="text-gray-400">Reviews coming soon!</p>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link 
                  href={product.demo_url}
                  target="_blank"
                  className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-colors text-center"
                >
                  <div className="w-12 h-12 bg-primary-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">🎯</span>
                  </div>
                  <h4 className="text-white font-medium mb-2">Live Demo</h4>
                  <p className="text-gray-400 text-sm">See the template in action</p>
                </Link>
                
                <Link 
                  href={product.documentation_url}
                  target="_blank"
                  className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-colors text-center"
                >
                  <div className="w-12 h-12 bg-primary-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">📚</span>
                  </div>
                  <h4 className="text-white font-medium mb-2">Documentation</h4>
                  <p className="text-gray-400 text-sm">Complete setup guide</p>
                </Link>
                
                <Link 
                  href={product.support_url}
                  target="_blank"
                  className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-colors text-center"
                >
                  <div className="w-12 h-12 bg-primary-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">🆘</span>
                  </div>
                  <h4 className="text-white font-medium mb-2">Support</h4>
                  <p className="text-gray-400 text-sm">Get help when you need it</p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
