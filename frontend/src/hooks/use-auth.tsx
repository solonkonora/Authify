"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { getCurrentUser, initializeAuth } from '../api/auth'

interface AuthContextType {
  user: any
  setUser: (user: any) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        initializeAuth()
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const value: AuthContextType = {
    user,
    setUser,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}