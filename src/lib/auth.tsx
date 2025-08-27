'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

export interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'buyer' | 'seller'
  name?: string
  avatar_url?: string
}

interface AuthContextType {
  user: AuthUser | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  isAdmin: boolean
  isSeller: boolean
  isBuyer: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileError, setProfileError] = useState<string | null>(null)

  useEffect(() => {
    console.log('🔐 AuthProvider: Starting authentication setup...')
    
    // Get initial session
    const initializeAuth = async () => {
      try {
        console.log('🔐 AuthProvider: Getting initial session...')
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('🔐 AuthProvider: Error getting session:', error)
          setLoading(false)
          return
        }
        
        console.log('🔐 AuthProvider: Initial session:', session ? 'exists' : 'none')
        setSession(session)
        
        if (session?.user) {
          console.log('🔐 AuthProvider: User found, fetching profile...')
          await fetchUserProfile(session.user)
        } else {
          console.log('🔐 AuthProvider: No user session found')
        }
        
        setLoading(false)
      } catch (error) {
        console.error('🔐 AuthProvider: Exception in initializeAuth:', error)
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔐 AuthProvider: Auth state change:', event, session?.user?.email)
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setSession(session)
        if (session?.user) {
          await fetchUserProfile(session.user)
        }
      } else if (event === 'SIGNED_OUT') {
        setSession(null)
        setUser(null)
        setProfileError(null)
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (user: User) => {
    try {
      console.log('🔐 AuthProvider: Fetching profile for user:', user.email)
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('🔐 AuthProvider: Error fetching user profile:', error)
        setProfileError(error.message)
        
        // Don't set user to null on profile fetch error
        // Keep the user authenticated even if profile fetch fails
        if (error.code === 'PGRST116') {
          console.log('🔐 AuthProvider: Profile not found, but user is authenticated')
          // Create a basic user object with default role
          setUser({
            id: user.id,
            email: user.email!,
            role: 'buyer', // Default role
            name: user.email?.split('@')[0] || 'User'
          })
        }
        return
      }

      console.log('🔐 AuthProvider: Profile fetched successfully:', data)
      setProfileError(null)
      setUser({
        id: user.id,
        email: user.email!,
        role: data.role,
        name: data.name,
        avatar_url: data.avatar_url
      })
    } catch (error) {
      console.error('🔐 AuthProvider: Exception in fetchUserProfile:', error)
      setProfileError('Failed to fetch profile')
      
      // Don't logout on profile fetch failure
      // Keep user authenticated with basic info
      setUser({
        id: user.id,
        email: user.email!,
        role: 'buyer', // Default role
        name: user.email?.split('@')[0] || 'User'
      })
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 AuthProvider: Signing in:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('🔐 AuthProvider: Sign in error:', error)
        return { error }
      }

      if (data.user) {
        console.log('🔐 AuthProvider: Sign in successful, fetching profile...')
        await fetchUserProfile(data.user)
      }

      return { error: null }
    } catch (error) {
      console.error('🔐 AuthProvider: Sign in exception:', error)
      return { error }
    }
  }

  const signOut = async () => {
    console.log('🔐 AuthProvider: Signing out...')
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setProfileError(null)
  }

  const isAdmin = user?.role === 'admin'
  const isSeller = user?.role === 'seller'
  const isBuyer = user?.role === 'buyer'

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn('🔐 AuthProvider: Loading timeout reached, forcing loading to false')
        setLoading(false)
      }
    }, 10000) // 10 second timeout

    return () => clearTimeout(timeout)
  }, [loading])

  const value = {
    user,
    session,
    loading,
    signIn,
    signOut,
    isAdmin,
    isSeller,
    isBuyer,
  }

  console.log('🔐 AuthProvider: Current state:', { user: !!user, loading, isAdmin, isSeller, isBuyer })

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
