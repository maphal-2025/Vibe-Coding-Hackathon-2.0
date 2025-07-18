import { useState } from 'react'
import {
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
  AlertTriangle,
  TrendingUp,
  Calendar,
  MapPin,
  RefreshCw,
  Download
} from 'lucide-react'
import { useFarm } from '../contexts/FarmContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const WeatherForecast = () => {
  const { weatherData, farm, isLoadingWeather, refreshWeatherData } = useFarm()
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  // Extended forecast data for agricultural planning
  const extendedForecast = [
    { date: '2024-01-09', temp: 24, humidity: 65, precipitation: 0, windSpeed: 8.5, condition: 'Sunny', icon: Sun },
    { date: '2024-01-10', temp: 26, humidity: 70, precipitation: 5, windSpeed: 12, condition: 'Partly Cloudy', icon: Cloud },
    { date: '2024-01-11', temp: 22, humidity: 85, precipitation: 25, windSpeed: 15, condition: 'Rain', icon: CloudRain },
    { date: '2024-01-12', temp: 25, humidity: 60, precipitation: 0, windSpeed: 10, condition: 'Clear', icon: Sun },
    { date: '2024-01-13', temp: 27, humidity: 55, precipitation: 0, windSpeed: 8, condition: 'Sunny', icon: Sun },
    { date: '2024-01-14', temp: 23, humidity: 80, precipitation: 30, windSpeed: 18, condition: 'Heavy Rain', icon: CloudRain },
    { date: '2024-01-15', temp: 21, humidity: 75, precipitation: 10, windSpeed: 14, condition: 'Light Rain', icon: CloudRain }
  ]

  // Agricultural weather alerts
  const weatherAlerts = [
    {
      id: '1',
      type: 'Heavy Rainfall',
      severity: 'High',
      message: 'Heavy rainfall expected (30mm) on Jan 14. Consider harvesting mature crops early.',
      impact: 'Crop Protection',
      validUntil: '2024-01-15',
      actions: ['Harvest ready crops', 'Apply fungicide preventively', 'Ensure drainage']
    },
    {
      id: '2',
      type: 'High Winds',
      severity: 'Medium',
      message: 'Strong winds (18 km/h) forecast for Jan 14. Secure equipment and young plants.',
      impact: 'Infrastructure',
      validUntil: '2024-01-14',
      actions: ['Secure equipment', 'Check plant supports', 'Monitor for damage']
    }
  ]

  // Historical weather data for trends
  const weatherTrends = [
    { month: 'Jul', temp: 22, precipitation: 45, avgTemp: 20 },
    { month: 'Aug', temp: 24, precipitation: 38, avgTemp: 22 },
    { month: 'Sep', temp: 26, precipitation: 42, avgTemp: 24 },
    { month: 'Oct', temp: 28, precipitation: 35, avgTemp: 25 },
    { month: 'Nov', temp: 25, precipitation: 52, avgTemp: 23 },
    { month: 'Dec', temp: 23, precipitation: 48, avgTemp: 21 },
    { month: 'Jan', temp: 24, precipitation: 41, avgTemp: 22 }
  ]

  const getWeatherIcon = (condition: string, size: string = 'h-8 w-8') => {
    const iconClass = `${size} text-current`
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className={`${iconClass} text-yellow-500`} />
      case 'partly cloudy':
        return <Cloud className={`${iconClass} text-gray-500`} />
      case 'rain':
      case 'light rain':
      case 'heavy rain':
      case 'scattered showers':
        return <CloudRain className={`${iconClass} text-blue-500`} />
      case 'snow':
        return <CloudSnow className={`${iconClass} text-blue-300`} />
      default:
        return <Cloud className={`${iconClass} text-gray-500`} />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weather Forecast</h1>
          <p className="mt-2 text-gray-600 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {farm?.location.address} • Agricultural Weather Intelligence
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button
            onClick={refreshWeatherData}
            disabled={isLoadingWeather}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoadingWeather ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Current Weather Card */}
      {weatherData && (
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg text-white p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              {getWeatherIcon('sunny', 'h-16 w-16')}
              <h3 className="text-3xl font-bold mt-4">{weatherData.current.temperature}°C</h3>
              <p className="text-blue-100">Current Temperature</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Droplets className="h-5 w-5 mr-2" />
                  <span>Humidity</span>
                </div>
                <span className="font-semibold">{weatherData.current.humidity}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wind className="h-5 w-5 mr-2" />
                  <span>Wind Speed</span>
                </div>
                <span className="font-semibold">{weatherData.current.windSpeed} km/h</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CloudRain className="h-5 w-5 mr-2" />
                  <span>Precipitation</span>
                </div>
                <span className="font-semibold">{weatherData.current.precipitation}mm</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  <span>Cloud Cover</span>
                </div>
                <span className="font-semibold">{weatherData.current.cloudCover}%</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold">Excellent</div>
              <p className="text-blue-100">Farming Conditions</p>
              <div className="mt-4 bg-blue-600 bg-opacity-50 rounded-lg p-3">
                <p className="text-sm">Perfect for field work and crop care</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weather Alerts */}
      {weatherAlerts.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Weather Alerts</h2>
              <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {weatherAlerts.length} Active
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {weatherAlerts.map((alert) => (
                <div key={alert.id} className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-red-900">{alert.type}</h3>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        alert.severity === 'High' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {alert.severity} Impact
                      </span>
                    </div>
                    <div className="text-right text-sm text-red-700">
                      <p>Valid until {new Date(alert.validUntil).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-red-800 mb-3">{alert.message}</p>
                  <div>
                    <h4 className="font-medium text-red-900 mb-2">Recommended Actions:</h4>
                    <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                      {alert.actions.map((action, index) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">7-Day Agricultural Forecast</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {extendedForecast.map((day, index) => (
              <div key={day.date} className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <p className="font-medium text-gray-900 mb-2">
                  {index === 0 ? 'Today' : formatDate(day.date)}
                </p>
                <div className="mb-3 flex justify-center">
                  {getWeatherIcon(day.condition, 'h-10 w-10')}
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-bold text-gray-900">{day.temp}°C</div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center justify-center mb-1">
                      <Droplets className="h-3 w-3 mr-1" />
                      {day.precipitation}mm
                    </div>
                    <div className="flex items-center justify-center">
                      <Wind className="h-3 w-3 mr-1" />
                      {day.windSpeed} km/h
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weather Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature and Precipitation Trend */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Temperature & Precipitation Trends</h3>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="7d">Next 7 Days</option>
                <option value="14d">Next 14 Days</option>
                <option value="30d">Next 30 Days</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={extendedForecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis yAxisId="temp" />
                  <YAxis yAxisId="precip" orientation="right" />
                  <Tooltip 
                    labelFormatter={(value) => formatDate(value)}
                    formatter={(value, name) => [
                      `${value}${name === 'Temperature' ? '°C' : 'mm'}`,
                      name
                    ]}
                  />
                  <Line
                    yAxisId="temp"
                    type="monotone"
                    dataKey="temp"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    name="Temperature"
                  />
                  <Line
                    yAxisId="precip"
                    type="monotone"
                    dataKey="precipitation"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Precipitation"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Historical Comparison */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Historical Weather Comparison</h3>
            <p className="text-sm text-gray-600">Current season vs. historical averages</p>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weatherTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="temp" fill="#10B981" name="Current Temp (°C)" />
                  <Bar dataKey="avgTemp" fill="#6B7280" name="Historical Avg (°C)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Agricultural Recommendations */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Weather-Based Farming Recommendations</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Sun className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-medium text-green-900">Ideal Field Work Days</h4>
              </div>
              <p className="text-sm text-green-800 mb-2">
                Today, Jan 10, and Jan 12-13 are perfect for field activities.
              </p>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• Soil cultivation and planting</li>
                <li>• Equipment maintenance</li>
                <li>• Harvest operations</li>
              </ul>
            </div>

            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <CloudRain className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-blue-900">Irrigation Planning</h4>
              </div>
              <p className="text-sm text-blue-800 mb-2">
                Skip irrigation on Jan 11 and Jan 14 due to natural rainfall.
              </p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Total rainfall: 35mm expected</li>
                <li>• Soil moisture will be optimal</li>
                <li>• Resume irrigation Jan 16</li>
              </ul>
            </div>

            <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                <h4 className="font-medium text-yellow-900">Crop Protection</h4>
              </div>
              <p className="text-sm text-yellow-800 mb-2">
                High humidity after rain may increase disease risk.
              </p>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>• Monitor for fungal diseases</li>
                <li>• Apply preventive treatments</li>
                <li>• Ensure good air circulation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherForecast