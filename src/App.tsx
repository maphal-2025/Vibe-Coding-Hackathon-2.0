import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LearningProvider } from './contexts/LearningContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Learning from './pages/Learning'
import Progress from './pages/Progress'
import ClientHub from './pages/ClientHub'
import Library from './pages/Library'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <AuthProvider>
      <LearningProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="learning" element={<Learning />} />
              <Route path="progress" element={<Progress />} />
              <Route path="client-hub" element={<ClientHub />} />
              <Route path="library" element={<Library />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </LearningProvider>
    </AuthProvider>
  )
}

export default App