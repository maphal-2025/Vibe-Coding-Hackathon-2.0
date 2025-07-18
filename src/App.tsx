import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { FarmProvider } from './contexts/FarmContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import CropMonitoring from './pages/CropMonitoring'
import WeatherForecast from './pages/WeatherForecast'
import SoilAnalysis from './pages/SoilAnalysis'
import MarketInsights from './pages/MarketInsights'
import AIChatbot from './pages/AIChatbot'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <AuthProvider>
      <FarmProvider>
        <div className="min-h-screen bg-green-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="crop-monitoring" element={<CropMonitoring />} />
              <Route path="weather" element={<WeatherForecast />} />
              <Route path="soil-analysis" element={<SoilAnalysis />} />
              <Route path="market-insights" element={<MarketInsights />} />
              <Route path="ai-assistant" element={<AIChatbot />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </FarmProvider>
    </AuthProvider>
  )
}

export default App