'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  MapIcon, 
  CubeIcon, 
  UserGroupIcon, 
  RssIcon, 
  PaperAirplaneIcon,
  PhoneIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'

// Custom Euro Icon component
const EuroIcon = ({ className }: { className?: string }) => (
  <div className={`${className} flex items-center justify-center font-bold text-2xl`}>
    €
  </div>
)

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Explore', href: '/explore', icon: MapIcon },
  { name: 'Popular Products', href: '/popular', icon: CubeIcon },
  { name: 'Top Authors', href: '/authors', icon: UserGroupIcon },
  { name: 'Feed', href: '/feed', icon: RssIcon },
  { name: 'Contact', href: '/contact', icon: PhoneIcon },
  { name: 'Become a Seller', href: '/seller', icon: EuroIcon },
]

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`sidebar transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`font-bold text-xl text-gradient ${isCollapsed ? 'hidden' : 'block'}`}>
            TripleZero iT
          </h1>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className={`w-[26px] h-[26px] flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-dark-700">
          <nav className="space-y-2">
            {bottomNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className={`w-[26px] h-[26px] flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>
        </div>

        {!isCollapsed && (
          <div className="mt-8 pt-6 border-t border-dark-700 text-xs text-gray-400">
            <div className="space-y-2">
            <Link href="/cookie-policy" className="block hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/privacy-policy" className="block hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="block hover:text-white transition-colors">Terms & Conditions</Link>
              
              
            </div>
            <div className="mt-4 text-left">
              <br /><br />
              <p><b>TripleZero iT © 2025</b></p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
