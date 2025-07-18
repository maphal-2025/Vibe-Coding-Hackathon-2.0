import { useState } from 'react'
import {
  TestTube,
  Droplets,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Zap,
  Leaf,
  Target,
  Calendar,
  MapPin,
  Download,
  Upload,
  RefreshCw,
  Activity
} from 'lucide-react'
import { useFarm } from '../contexts/FarmContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

const SoilAnalysis = () => {
  const { soilData, farm, isLoadingSoil, refreshSoilData } = useFarm()
  const [selectedField, setSelectedField] = useState('Field A')
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d')

  // Historical soil data for trends
  const soilTrends = [
    { date: '2024-01-01', ph: 6.5, nitrogen: 42, phosphorus: 22, potassium: 175, moisture: 65 },
    { date: '2024-01-05', ph: 6.6, nitrogen: 44, phosphorus: 24, potassium: 178, moisture: 62 },
    { date: '2024-01-10', ph: 6.7, nitrogen: 43, phosphorus: 23, potassium: 180, moisture: 68 },
    { date: '2024-01-15', ph: 6.8, nitrogen: 45, phosphorus: 25, potassium: 182, moisture: 70 },
    { date: '2024-01-20', ph: 6.9, nitrogen: 46, phosphorus: 26, potassium: 185, moisture: 66 },
    { date: '2024-01-25', ph: 6.8, nitrogen: 45, phosphorus: 25, potassium: 180, moisture: 72 },
    { date: '2024-01-30', ph: 6.8, nitrogen: 45, phosphorus: 25, potassium: 180, moisture: 68 }
  ]

  // Soil composition radar chart data
  const soilComposition = [
    { nutrient: 'pH Level', current: 85, optimal: 90, max: 100 },
    { nutrient: 'Nitrogen', current: 75, optimal: 80, max: 100 },
    { nutrient: 'Phosphorus', current: 65, optimal: 70, max: 100 },
    { nutrient: 'Potassium', current: 90, optimal: 85, max: 100 },
    { nutrient: 'Organic Matter', current: 80, optimal: 75, max: 100 },
    { nutrient: 'Moisture', current: 85, optimal: 80, max: 100 }
  ]

  // Soil health recommendations
  const soilRecommendations = [
    {
      id: '1',
      type: 'Fertilization',
      priority: 'High',
      metric: 'Nitrogen',
      currentValue: 45,
      targetValue: 50,
      message: 'Nitrogen levels are slightly below optimal. Consider applying 25kg/ha of nitrogen fertilizer.',
      action: 'Apply nitrogen fertilizer within 7 days',
      impact: 'Expected 15% yield increase',
      cost: '$125 per hectare'
    },
    {
      id: '2',
      type: 'pH Management',
      priority: 'Medium',
      metric: 'pH Level',
      currentValue: 6.8,
      targetValue: 7.0,
      message: 'Soil pH is within acceptable range but could be optimized for maximum nutrient availability.',
      action: 'Apply lime at 500kg/ha during next cultivation',
      impact: 'Improved nutrient uptake efficiency',
      cost: '$85 per hectare'
    },
    {
      id: '3',
      type: 'Organic Matter',
      priority: 'Low',
      metric: 'Organic Content',
      currentValue: 3.2,
      targetValue: 3.5,
      message: 'Organic matter levels are good but can be enhanced for better soil structure.',
      action: 'Incorporate compost or cover crops',
      impact: 'Enhanced soil water retention',
      cost: '$45 per hectare'
    }
  ]

  // Soil zones data for different field areas
  const soilZones = [
    { zone: 'Zone A', area: 8.5, ph: 6.9, nitrogen: 48, phosphorus: 27, quality: 'Excellent' },
    { zone: 'Zone B', area: 6.2, ph: 6.7, nitrogen: 43, phosphorus: 24, quality: 'Good' },
    { zone: 'Zone C', area: 4.8, ph: 6.6, nitrogen: 41, phosphorus: 22, quality: 'Fair' },
    { zone: 'Zone D', area: 6.0, ph: 6.8, nitrogen: 46, phosphorus: 26, quality: 'Good' }
  ]

  const getNutrientStatus = (value: number, optimal: number) => {
    const percentage = (value / optimal) * 100
    if (percentage >= 95) return { status: 'Excellent', color: 'text-green-600 bg-green-100' }
    if (percentage >= 85) return { status: 'Good', color: 'text-blue-600 bg-blue-100' }
    if (percentage >= 70) return { status: 'Fair', color: 'text-yellow-600 bg-yellow-100' }
    return { status: 'Poor', color: 'text-red-600 bg-red-100' }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Soil Analysis</h1>
          <p className="mt-2 text-gray-600 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {farm?.location.address} • AI-Powered Soil Health Monitoring
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button
            onClick={refreshSoilData}
            disabled={isLoadingSoil}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoadingSoil ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Upload className="mr-2 h-4 w-4" />
            Upload Test Results
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Field Selector */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">Field:</label>
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="Field A">Field A (Corn)</option>
          <option value="Field B">Field B (Soybeans)</option>
          <option value="Field C">Field C (Tomatoes)</option>
          <option value="Field D">Field D (Wheat)</option>
        </select>
      </div>

      {/* Current Soil Metrics */}
      {soilData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">pH Level</p>
                <p className="text-2xl font-bold text-green-600">{soilData.ph}</p>
                <p className="text-sm text-gray-600">Optimal: 6.5-7.5</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TestTube className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm text-green-600">Optimal Range</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Nitrogen (N)</p>
                <p className="text-2xl font-bold text-blue-600">{soilData.nitrogen} ppm</p>
                <p className="text-sm text-gray-600">Target: 50+ ppm</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Leaf className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="text-sm text-yellow-600">Below Target</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Phosphorus (P)</p>
                <p className="text-2xl font-bold text-purple-600">{soilData.phosphorus} ppm</p>
                <p className="text-sm text-gray-600">Target: 30+ ppm</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="text-sm text-yellow-600">Below Target</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Soil Moisture</p>
                <p className="text-2xl font-bold text-cyan-600">{soilData.moisture}%</p>
                <p className="text-sm text-gray-600">Optimal: 60-75%</p>
              </div>
              <div className="p-3 bg-cyan-100 rounded-full">
                <Droplets className="h-6 w-6 text-cyan-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm text-green-600">Good Level</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Soil Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nutrient Radar Chart */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Soil Health Overview</h3>
            <p className="text-sm text-gray-600">Current levels vs. optimal ranges</p>
          </div>
          <div className="p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={soilComposition}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="nutrient" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Optimal"
                    dataKey="optimal"
                    stroke="#6B7280"
                    fill="transparent"
                    strokeDasharray="5 5"
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Soil Trends */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Nutrient Trends</h3>
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
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={soilTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(label) => formatDate(label)}
                  />
                  <Line
                    type="monotone"
                    dataKey="nitrogen"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Nitrogen (ppm)"
                  />
                  <Line
                    type="monotone"
                    dataKey="phosphorus"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    name="Phosphorus (ppm)"
                  />
                  <Line
                    type="monotone"
                    dataKey="potassium"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    name="Potassium (ppm)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Soil Zones Analysis */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Field Zone Analysis</h3>
          <p className="text-sm text-gray-600">Soil variability across different field zones</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {soilZones.map((zone) => (
              <div key={zone.zone} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{zone.zone}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    zone.quality === 'Excellent' ? 'bg-green-100 text-green-800' :
                    zone.quality === 'Good' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {zone.quality}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area:</span>
                    <span className="font-medium">{zone.area} ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">pH:</span>
                    <span className="font-medium">{zone.ph}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">N:</span>
                    <span className="font-medium">{zone.nitrogen} ppm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">P:</span>
                    <span className="font-medium">{zone.phosphorus} ppm</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">AI-Driven Soil Recommendations</h3>
            <span className="text-sm text-gray-500">{soilRecommendations.length} recommendations</span>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {soilRecommendations.map((rec) => (
              <div key={rec.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Target className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-gray-900">{rec.type}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                        {rec.priority} Priority
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{rec.message}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Current Value</p>
                    <p className="text-lg font-bold text-gray-900">{rec.currentValue}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Target Value</p>
                    <p className="text-lg font-bold text-green-600">{rec.targetValue}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Expected Impact</p>
                    <p className="text-sm font-medium text-blue-600">{rec.impact}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Estimated Cost</p>
                    <p className="text-sm font-medium text-gray-900">{rec.cost}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <strong>Action:</strong> {rec.action}
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors">
                      Apply Recommendation
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors">
                      Schedule Later
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Soil Temperature</h4>
            <Activity className="h-5 w-5 text-orange-500" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">{soilData?.temperature}°C</p>
            <p className="text-sm text-gray-600 mt-2">Optimal for crop growth</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Organic Matter</h4>
            <Leaf className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{soilData?.organicMatter}%</p>
            <p className="text-sm text-gray-600 mt-2">Good soil structure</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Last Analysis</h4>
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">
              {soilData && new Date(soilData.lastUpdated).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mt-2">Comprehensive soil test</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoilAnalysis