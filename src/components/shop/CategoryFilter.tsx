'use client'

import { useState, useRef, useEffect } from 'react'

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const categories = [
  'All', 'Free', 'PHP Script', 'HTML', 'React', 'WordPress Plugin', 
  'WordPress Theme', 'Angular', 'CMS', 'Wireframe Kits', 'UI templates', 
  'Illustrations', 'Icon Sets', 'Mobile App', '3D Assets', 'Bootstrap',
  'Vue.js', 'Node.js', 'Laravel', 'Django', 'Flutter', 'Swift', 'Kotlin'
]

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const scrollLeftDirection = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRightDirection = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  // Touch events for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return
    const touch = e.touches[0]
    setStartX(touch.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return
    const touch = e.touches[0]
    const x = touch.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={scrollLeftDirection}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-dark-800 hover:bg-dark-700 rounded-full flex items-center justify-center text-white shadow-lg border border-dark-600 transition-all duration-200 hover:scale-110"
        style={{ left: '0px' }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRightDirection}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-dark-800 hover:bg-dark-700 rounded-full flex items-center justify-center text-white shadow-lg border border-dark-600 transition-all duration-200 hover:scale-110"
        style={{ right: '0px' }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Categories Container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-3 px-16 overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
              selectedCategory === category
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
