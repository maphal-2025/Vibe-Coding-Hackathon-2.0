import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Sprout, 
  CloudRain, 
  TestTube, 
  TrendingUp,
  Bot,
  User,
  Wheat,
  Satellite,
  BarChart3
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Sidebar = () => {
  const location = useLocation()
  const { user } = useAuth()

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Farm overview & insights'
    },
    {
      name: 'Crop Monitoring',
      href: '/crop-monitoring',
      icon: Sprout,
      description: 'Real-time crop health'
    },
    {
      name: 'Weather Forecast',
      href: '/weather',
      icon: CloudRain,
      description: 'Climate predictions'
    },
    {
      name: 'Soil Analysis',
      href: '/soil-analysis',
      icon: TestTube,
      description: 'Soil health metrics'
    },
    {
      name: 'Market Insights',
      href: '/market-insights',
      icon: TrendingUp,
      description: 'Pricing & demand trends'
    },
    {
      name: 'AI Assistant',
      href: '/ai-assistant',
      icon: Bot,
      description: 'Farming guidance chatbot'
    }
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <div className="flex h-screen w-64 flex-col bg-white shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg">
          <Wheat className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">AgriSense</h1>
          <p className="text-xs text-green-600">Smart Farming AI</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors
                ${
                  isActive(item.href)
                    ? 'bg-green-100 text-green-900 border-r-2 border-green-600'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-900'
                }
              `}
            >
              <Icon
                className={`
                  mr-3 h-5 w-5 transition-colors
                  ${
                    isActive(item.href)
                      ? 'text-green-600'
                      : 'text-gray-400 group-hover:text-green-600'
                  }
                `}
              />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500 group-hover:text-green-700">
                  {item.description}
                </div>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Farm Stats */}
      <div className="px-3 py-4 border-t border-gray-200">
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Satellite className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">Farm Stats</span>
          </div>
          <div className="space-y-1 text-xs text-green-700">
            <div className="flex justify-between">
              <span>Total Area:</span>
              <span className="font-medium">25.5 ha</span>
            </div>
            <div className="flex justify-between">
              <span>Active Crops:</span>
              <span className="font-medium">4 types</span>
            </div>
            <div className="flex justify-between">
              <span>Health Score:</span>
              <span className="font-medium text-green-600">94%</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-3 py-4 border-t border-gray-200">
        <Link
          to="/profile"
          className={`
            group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors
            ${
              isActive('/profile')
                ? 'bg-green-100 text-green-900'
                : 'text-gray-700 hover:bg-green-50 hover:text-green-900'
            }
          `}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="mr-3 h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <User className="mr-3 h-8 w-8 rounded-full bg-gray-200 p-1 text-gray-400" />
          )}
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">
              {user?.name || 'Farmer'}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {user?.farmLocation || 'Farm Location'}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar