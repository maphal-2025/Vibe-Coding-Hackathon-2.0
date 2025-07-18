import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'farmer' | 'agricultural_expert' | 'extension_officer'
  avatar?: string
  farmLocation?: string
  farmSize?: number
  cropTypes?: string[]
  experienceYears?: number
  preferredLanguage?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: Partial<User> & { password: string }) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize with demo user
  useEffect(() => {
    const demoUser: User = {
      id: '1',
      name: 'Maria Santos',
      email: 'maria@greenvalleyfarm.com',
      role: 'farmer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      farmLocation: 'Sustainable Valley, Agriville',
      farmSize: 25.5,
      cropTypes: ['Corn', 'Soybeans', 'Wheat', 'Tomatoes'],
      experienceYears: 12,
      preferredLanguage: 'English'
    }
    setUser(demoUser)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Demo login - in real app, this would validate credentials
      const demoUser: User = {
        id: '1',
        name: 'Maria Santos',
        email: email,
        role: 'farmer',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
        farmLocation: 'Sustainable Valley, Agriville',
        farmSize: 25.5,
        cropTypes: ['Corn', 'Soybeans', 'Wheat', 'Tomatoes'],
        experienceYears: 12,
        preferredLanguage: 'English'
      }
      
      setUser(demoUser)
      localStorage.setItem('agrisense_user', JSON.stringify(demoUser))
    } catch (error) {
      console.error('Login failed:', error)
      throw new Error('Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || 'New Farmer',
        email: userData.email || '',
        role: userData.role || 'farmer',
        farmLocation: userData.farmLocation,
        farmSize: userData.farmSize,
        cropTypes: userData.cropTypes || [],
        experienceYears: userData.experienceYears || 0,
        preferredLanguage: userData.preferredLanguage || 'English'
      }
      
      setUser(newUser)
      localStorage.setItem('agrisense_user', JSON.stringify(newUser))
    } catch (error) {
      console.error('Registration failed:', error)
      throw new Error('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('agrisense_user')
  }

  // Check for stored user on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('agrisense_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}