'use client'

import { useCart } from '@/lib/cart'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function CartPage() {
  const { state: cartState, removeItem, updateQuantity, clearCart } = useCart()
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    setIsUpdating(id)
    try {
      updateQuantity(id, newQuantity)
    } finally {
      setIsUpdating(null)
    }
  }

  const handleRemoveItem = async (id: string) => {
    setIsUpdating(id)
    try {
      removeItem(id)
    } finally {
      setIsUpdating(null)
    }
  }

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-dark-800 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            href="/"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeftIcon className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
            <span className="text-gray-400">({cartState.itemCount} items)</span>
          </div>
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 transition-colors text-sm"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartState.items.map((item) => (
                <div key={item.id} className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-primary-500 font-bold">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.original_price && item.original_price > item.price && (
                          <span className="text-gray-400 line-through text-sm">
                            ${item.original_price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={isUpdating === item.id || item.quantity <= 1}
                        className="w-8 h-8 rounded-lg bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="w-12 text-center text-white font-medium">
                        {isUpdating === item.id ? '...' : item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={isUpdating === item.id}
                        className="w-8 h-8 rounded-lg bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={isUpdating === item.id}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                      title="Remove item"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({cartState.itemCount} items)</span>
                  <span>${cartState.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-dark-600 pt-3">
                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span>${cartState.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full btn-primary py-3 text-lg font-medium">
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
