'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

export default function AdminHeader() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="header px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-dark-700 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search your route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-dark-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="btn-primary">
            Create Shop
          </button>
          
          <button className="btn-secondary flex items-center space-x-2">
            <BuildingOfficeIcon className="w-5 h-5" />
            <span>Visit Site</span>
          </button>
          
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-dark-700 transition-colors">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">J</span>
            </div>
            <div className="text-left">
              <p className="font-medium">Jhon Doe</p>
              <p className="text-sm text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
