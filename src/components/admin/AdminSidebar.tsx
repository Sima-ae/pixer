'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Squares2X2Icon,
  ShoppingCartIcon,
  EnvelopeIcon,
  CheckIcon,
  CubeIcon,
  HomeIcon,
  TagIcon,
  BanknotesIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'

const navigation = [
  {
    name: 'MAIN',
    items: [
      { name: 'Dashboard', href: '/admin', icon: Squares2X2Icon }
    ]
  },
  {
    name: 'SHOP MANAGEMENT',
    items: [
      { name: 'Shops', href: '/admin/shops', icon: ShoppingCartIcon, hasArrow: true },
      { name: 'My Shops', href: '/admin/my-shops', icon: EnvelopeIcon },
      { name: 'Shop Transfer Request', href: '/admin/shop-transfer', icon: CheckIcon }
    ]
  },
  {
    name: 'PRODUCT MANAGEMENT',
    items: [
      { name: 'Products', href: '/admin/products', icon: CubeIcon, hasArrow: true },
      { name: 'Layout Type', href: '/admin/layout-type', icon: HomeIcon },
      { name: 'Inventory', href: '/admin/inventory', icon: ClipboardDocumentListIcon },
      { name: 'Categories', href: '/admin/categories', icon: TagIcon },
      { name: 'Tags', href: '/admin/tags', icon: TagIcon }
    ]
  },
  {
    name: 'E-COMMERCE MANAGEMENT',
    items: [
      { name: 'Taxes', href: '/admin/taxes', icon: BanknotesIcon },
      { name: 'Withdrawals', href: '/admin/withdrawals', icon: BanknotesIcon }
    ]
  },
  {
    name: 'ORDER MANAGEMENT',
    items: [
      { name: 'Orders', href: '/admin/orders', icon: ClipboardDocumentListIcon }
    ]
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="sidebar w-64">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <h1 className="text-xl font-bold text-gradient">TripleZero iT</h1>
        </div>

        <nav className="space-y-6">
          {navigation.map((section) => (
            <div key={section.name}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {section.name}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-500 text-white'
                          : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="w-5 h-5 mr-3" />
                        <span>{item.name}</span>
                      </div>
                      {item.hasArrow && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
