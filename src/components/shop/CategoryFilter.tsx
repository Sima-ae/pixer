'use client'

import { useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

const categories = [
  'All', 'Free', 'PHP Script', 'HTML', 'React', 'WordPress Plugin', 
  'WordPress Theme', 'Angular', 'CMS', 'Wireframe Kits', 'UI templates',
  'Illustrations', 'Icon Sets', 'Mobile App', '3D Assets', 'Bootstrap'
]

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
        <div className="flex items-center text-gray-400 ml-2">
          <ChevronRightIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
