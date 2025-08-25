'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/supabase'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card group cursor-pointer">
      <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>
      
      <div className="space-y-3">
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary-500 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-400 text-sm line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center space-x-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
            product.author_icon === 'i' ? 'bg-green-500' :
            product.author_icon === 'Q' ? 'bg-green-500' :
            product.author_icon === 'M' ? 'bg-purple-500' :
            'bg-yellow-500'
          }`}>
            {product.author_icon}
          </div>
          <span className="text-gray-300 text-sm">{product.author}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.original_price && product.original_price > product.price ? (
              <>
                <span className="text-lg font-bold text-primary-500">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-400 line-through">
                  ${product.original_price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary-500">
                {product.price === 0 ? 'FREE' : `$${product.price.toFixed(2)}`}
              </span>
            )}
          </div>
          
          <Link 
            href={`/product/${product.id}`}
            className="btn-primary text-sm py-1 px-3"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
