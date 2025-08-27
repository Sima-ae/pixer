'use client'

import { useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import StatCard from '@/components/admin/StatCard'
import { 
  BanknotesIcon, 
  ShoppingCartIcon, 
  ClipboardDocumentListIcon, 
  ShoppingBagIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

const timeFilters = ['Today', 'Weekly', 'Monthly', 'Yearly']

const mockOrders = [
  {
    id: '1',
    trackingNumber: '20231117130887',
    customer: 'Customer',
    email: 'customer@demo.com',
    products: 1,
    orderDate: '2 years ago',
    total: 26.25,
    status: 'cancelled'
  },
  {
    id: '2',
    trackingNumber: '20231117881331',
    customer: 'Customer',
    email: 'customer@demo.com',
    products: 1,
    orderDate: '2 years ago',
    total: 72.45,
    status: 'completed'
  }
]

export default function AdminDashboard() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Today')

  return (
    <div className="flex min-h-screen bg-dark-900">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 p-6">
          {/* Summary Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value="€ 403,20"
                icon={<BanknotesIcon className="w-6 h-6 text-white" />}
                accentColor="bg-green-500"
              />
              <StatCard
                title="Total Order"
                value="16"
                icon={<ShoppingCartIcon className="w-6 h-6 text-white" />}
                accentColor="bg-purple-500"
              />
              <StatCard
                title="Vendor"
                value="171"
                icon={<ClipboardDocumentListIcon className="w-6 h-6 text-white" />}
                accentColor="bg-pink-500"
              />
              <StatCard
                title="Total Shops"
                value="99"
                icon={<ShoppingBagIcon className="w-6 h-6 text-white" />}
                accentColor="bg-red-500"
              />
            </div>
          </div>

          {/* Order Status Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Order Status</h2>
            <div className="flex space-x-4 mb-6">
              {timeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedTimeFilter(filter)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTimeFilter === filter
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                title="Pending Order"
                value="0"
                icon={<ClipboardDocumentListIcon className="w-6 h-6 text-white" />}
                accentColor="bg-blue-500"
              />
              <StatCard
                title="Processing Order"
                value="0"
                icon={<ClipboardDocumentListIcon className="w-6 h-6 text-white" />}
                accentColor="bg-cyan-500"
              />
              <StatCard
                title="Completed Order"
                value="0"
                icon={<ClipboardDocumentListIcon className="w-6 h-6 text-white" />}
                accentColor="bg-orange-500"
              />
              <StatCard
                title="Cancelled Order"
                value="0"
                icon={<BanknotesIcon className="w-6 h-6 text-white" />}
                accentColor="bg-green-400"
              />
            </div>
          </div>

          {/* Recent Orders Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Recent Orders</h2>
            <div className="card">
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by Name"
                    className="w-full bg-dark-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Tracking Number</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Customer</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Products</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Order Date</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Total</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b border-dark-700">
                        <td className="py-3 px-4 text-white">{order.trackingNumber}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-medium">C</span>
                            </div>
                            <div>
                              <p className="text-white">{order.customer}</p>
                              <p className="text-gray-400 text-sm">{order.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-white">{order.products}</td>
                        <td className="py-3 px-4 text-gray-400">{order.orderDate}</td>
                        <td className="py-3 px-4 text-white">€ {order.total.toFixed(2).replace('.', ',')}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'completed' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-green-400 text-white'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="p-2 rounded-lg hover:bg-dark-700 transition-colors">
                            <EyeIcon className="w-5 h-5 text-gray-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
