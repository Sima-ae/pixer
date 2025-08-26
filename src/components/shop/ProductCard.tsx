'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/supabase'
import { useCart } from '@/lib/cart'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart, getItemQuantity } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  
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

  const quantity = getItemQuantity(product.id)
  const inCart = isInCart(product.id)

  return (
    <div className="card group cursor-pointer hover:shadow-xl transition-all duration-300 w-full">
      <div className="relative aspect-video mb-3 overflow-hidden rounded-lg">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 group-hover:text-primary-500 transition-colors leading-tight">
          {product.name}
        </h3>
        
        <p className="text-gray-400 text-xs line-clamp-2 leading-tight">
          {product.description}
        </p>
        
        <div className="flex items-center space-x-2">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
            product.author_icon === 'i' ? 'bg-green-500' :
            product.author_icon === 'Q' ? 'bg-green-500' :
            product.author_icon === 'M' ? 'bg-purple-500' :
            'bg-yellow-500'
          }`}>
            {product.author_icon}
          </div>
          <span className="text-gray-300 text-xs truncate">{product.author}</span>
        </div>
        
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2 min-w-0">
            {product.original_price && product.original_price > product.price ? (
              <>
                <span className="text-sm sm:text-base font-bold text-primary-500 truncate">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-400 line-through text-xs truncate">
                  ${product.original_price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-sm sm:text-base font-bold text-primary-500 truncate">
                {product.price === 0 ? 'FREE' : `$${product.price.toFixed(2)}`}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {inCart ? (
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="btn-primary text-xs py-1 px-2 flex-shrink-0 bg-green-600 hover:bg-green-700"
                >
                  {isAdding ? 'Adding...' : `In Cart (${quantity})`}
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="btn-primary text-xs py-1 px-2 flex-shrink-0"
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
            )}
            
            <Link 
              href={`/product/${product.id}`}
              className="btn-secondary text-xs py-1 px-2 flex-shrink-0"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
