import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'psychologist' | 'student' | 'client'
  avatar?: string
  specializations?: string[]
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('mindscape_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, _password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser: User = {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email,
      role: 'psychologist',
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specializations: ['CBT', 'Trauma Therapy', 'Mindfulness']
    }
    
    setUser(mockUser)
    localStorage.setItem('mindscape_user', JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'student',
      specializations: userData.specializations || []
    }
    
    setUser(newUser)
    localStorage.setItem('mindscape_user', JSON.stringify(newUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('mindscape_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}