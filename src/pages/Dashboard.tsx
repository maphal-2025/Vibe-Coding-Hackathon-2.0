import { useState } from 'react'
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Sprout,
  BarChart3,
  Satellite,
  Bot,
  RefreshCw
} from 'lucide-react'
import { useFarm } from '../contexts/FarmContext'
import { useAuth } from '../contexts/AuthContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const Dashboard = () => {
  const { user } = useAuth()
  const { 
    farm, 
    crops, 
    soilData, 
    weatherData, 
    marketData, 
    aiRecommendations,
    isLoadingWeather,
    refreshWeatherData,
    refreshSoilData,
    refreshMarketData
  } = useFarm()

  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  // Calculate summary stats
  const totalCrops = crops.length
  const healthyCrops = crops.filter(crop => crop.healthStatus === 'healthy').length
  const warningCrops = crops.filter(crop => crop.healthStatus === 'warning').length
  const criticalCrops = crops.filter(crop => crop.healthStatus === 'critical').length
  const totalYield = crops.reduce((sum, crop) => sum + crop.predictedYield, 0)

  // Chart data
  const cropHealthData = [
    { name: 'Healthy', value: healthyCrops, color: '#10B981' },
    { name: 'Warning', value: warningCrops, color: '#F59E0B' },
    { name: 'Critical', value: criticalCrops, color: '#EF4444' }
  ]

  const yieldTrendData = [
    { date: 'Jan', yield: 45, target: 50 },
    { date: 'Feb', yield: 52, target: 55 },
    { date: 'Mar', yield: 48, target: 52 },
    { date: 'Apr', yield: 61, target: 58 },
    { date: 'May', yield: 55, target: 60 },
    { date: 'Jun', yield: 67, target: 65 },
    { date: 'Jul', yield: 62, target: 68 }
  ]

  const getCurrentTime = () => {
    return new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0]}! 🌱
          </h1>
          <p className="mt-2 text-gray-600">
            {getCurrentTime()} • {farm?.name}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button
            onClick={refreshWeatherData}
            disabled={isLoadingWeather}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoadingWeather ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Sprout className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Total Crops</h3>
              <p className="text-3xl font-bold text-green-600">{totalCrops}</p>
              <p className="text-sm text-gray-500">{healthyCrops} healthy, {warningCrops} need attention</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Predicted Yield</h3>
              <p className="text-3xl font-bold text-blue-600">{totalYield.toFixed(1)} tons</p>
              <p className="text-sm text-gray-500">This season estimate</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Thermometer className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Temperature</h3>
              <p className="text-3xl font-bold text-orange-600">{weatherData?.current.temperature}°C</p>
              <p className="text-sm text-gray-500">Optimal for growth</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Droplets className="h-8 w-8 text-cyan-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Soil Moisture</h3>
              <p className="text-3xl font-bold text-cyan-600">{soilData?.moisture}%</p>
              <p className="text-sm text-gray-500">Good level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Recommendations */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-6 w-6 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">AI Recommendations</h2>
              </div>
              <span className="text-sm text-gray-500">Updated 2 hours ago</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {aiRecommendations.slice(0, 4).map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {recommendation.includes('Consider') ? (
                      <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Crop Health Overview */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Crop Health</h2>
          </div>
          <div className="p-6">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cropHealthData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {cropHealthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {cropHealthData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yield Trends */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Yield Trends</h2>
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yieldTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="yield" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Actual Yield"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#6B7280" 
                    strokeDasharray="5 5"
                    name="Target Yield"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Market Prices */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Market Prices</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {marketData.map((market, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{market.crop}</h3>
                    <p className="text-sm text-gray-500">
                      Demand: <span className={`capitalize font-medium ${
                        market.demand === 'high' ? 'text-green-600' :
                        market.demand === 'medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>{market.demand}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${market.currentPrice}</p>
                    <div className="flex items-center text-sm">
                      {market.priceChange >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={market.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {Math.abs(market.priceChange)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weather and Soil Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Weather */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Current Weather</h2>
          </div>
          <div className="p-6">
            {weatherData && (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <Thermometer className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{weatherData.current.temperature}°C</p>
                  <p className="text-sm text-gray-500">Temperature</p>
                </div>
                <div className="text-center">
                  <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{weatherData.current.humidity}%</p>
                  <p className="text-sm text-gray-500">Humidity</p>
                </div>
                <div className="text-center">
                  <Wind className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{weatherData.current.windSpeed} km/h</p>
                  <p className="text-sm text-gray-500">Wind Speed</p>
                </div>
                <div className="text-center">
                  <div className="h-8 w-8 bg-blue-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{weatherData.current.precipitation}mm</p>
                  <p className="text-sm text-gray-500">Precipitation</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Soil Conditions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Soil Conditions</h2>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            {soilData && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">pH Level</span>
                  <span className="text-lg font-bold text-green-600">{soilData.ph}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Nitrogen (N)</span>
                  <span className="text-lg font-bold text-blue-600">{soilData.nitrogen} ppm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Phosphorus (P)</span>
                  <span className="text-lg font-bold text-purple-600">{soilData.phosphorus} ppm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Potassium (K)</span>
                  <span className="text-lg font-bold text-orange-600">{soilData.potassium} ppm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Organic Matter</span>
                  <span className="text-lg font-bold text-green-700">{soilData.organicMatter}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard