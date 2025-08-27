'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'seller' | 'buyer'
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  requiredRole = 'admin',
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { user, loading, isAdmin, isSeller, isBuyer } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      // Check role-based access
      let hasAccess = false
      switch (requiredRole) {
        case 'admin':
          hasAccess = isAdmin
          break
        case 'seller':
          hasAccess = isSeller || isAdmin
          break
        case 'buyer':
          hasAccess = isBuyer || isSeller || isAdmin
          break
        default:
          hasAccess = true
      }

      if (!hasAccess) {
        router.push('/')
        return
      }
    }
  }, [user, loading, isAdmin, isSeller, isBuyer, requiredRole, router, redirectTo])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Check role-based access
  let hasAccess = false
  switch (requiredRole) {
    case 'admin':
      hasAccess = isAdmin
      break
    case 'seller':
      hasAccess = isSeller || isAdmin
      break
    case 'buyer':
      hasAccess = isBuyer || isSeller || isAdmin
      break
    default:
      hasAccess = true
  }

  if (!hasAccess) {
    return null
  }

  return <>{children}</>
}
