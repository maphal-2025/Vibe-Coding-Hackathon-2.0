import { useState } from 'react'
import { 
  Leaf, 
  AlertTriangle, 
  CheckCircle, 
  Camera,
  Satellite,
  TrendingUp,
  Calendar,
  MapPin,
  Activity,
  Eye,
  Download,
  Upload,
  Filter
} from 'lucide-react'
import { useFarm } from '../contexts/FarmContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const CropMonitoring = () => {
  const { crops, farm } = useFarm()
  const [selectedCrop, setSelectedCrop] = useState(crops[0]?.id || '')
  const [viewMode, setViewMode] = useState<'grid' | 'satellite' | 'analysis'>('grid')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const selectedCropData = crops.find(crop => crop.id === selectedCrop)

  // Mock data for crop health over time
  const cropHealthHistory = [
    { date: '2024-01-01', health: 85, ndvi: 0.75, moisture: 65 },
    { date: '2024-01-05', health: 87, ndvi: 0.78, moisture: 62 },
    { date: '2024-01-10', health: 89, ndvi: 0.81, moisture: 68 },
    { date: '2024-01-15', health: 92, ndvi: 0.85, moisture: 70 },
    { date: '2024-01-20', health: 88, ndvi: 0.82, moisture: 66 },
    { date: '2024-01-25', health: 91, ndvi: 0.86, moisture: 72 },
    { date: '2024-01-30', health: 94, ndvi: 0.89, moisture: 75 }
  ]

  const diseaseAlerts = [
    {
      id: '1',
      crop: 'Soybeans',
      disease: 'Soybean Rust',
      severity: 'Medium',
      confidence: 87,
      location: 'Field B - Section 3',
      detectedAt: '2024-01-08 14:30',
      status: 'active'
    },
    {
      id: '2',
      crop: 'Corn',
      disease: 'Corn Leaf Blight',
      severity: 'Low',
      confidence: 72,
      location: 'Field A - Section 1',
      detectedAt: '2024-01-07 09:15',
      status: 'monitoring'
    }
  ]

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getHealthStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-5 w-5" />
      case 'warning': return <AlertTriangle className="h-5 w-5" />
      case 'critical': return <AlertTriangle className="h-5 w-5" />
      default: return <Activity className="h-5 w-5" />
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Crop Monitoring</h1>
          <p className="mt-2 text-gray-600">
            Real-time crop health analysis powered by AI and satellite imagery
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Upload className="mr-2 h-4 w-4" />
            Upload Images
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            <Satellite className="mr-2 h-4 w-4" />
            Refresh Satellite Data
          </button>
        </div>
      </div>

      {/* View Toggle and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('satellite')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'satellite'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Satellite View
          </button>
          <button
            onClick={() => setViewMode('analysis')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'analysis'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            AI Analysis
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Crops</option>
              <option value="healthy">Healthy Only</option>
              <option value="warning">Needs Attention</option>
              <option value="critical">Critical Issues</option>
            </select>
          </div>
        </div>
      </div>

      {viewMode === 'grid' && (
        <>
          {/* Crop Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crops
              .filter(crop => selectedFilter === 'all' || crop.healthStatus === selectedFilter)
              .map((crop) => (
              <div key={crop.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Crop Image */}
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getHealthStatusColor(crop.healthStatus)}`}>
                      {getHealthStatusIcon(crop.healthStatus)}
                      <span className="ml-1 capitalize">{crop.healthStatus}</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{crop.name}</h3>
                    <p className="text-sm opacity-90">{crop.area} hectares</p>
                  </div>
                </div>

                {/* Crop Details */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Growth Stage</p>
                      <p className="font-medium text-gray-900">{crop.currentGrowthStage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Predicted Yield</p>
                      <p className="font-medium text-gray-900">{crop.predictedYield} tons</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Planted</p>
                      <p className="font-medium text-gray-900">
                        {new Date(crop.plantingDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Harvest Est.</p>
                      <p className="font-medium text-gray-900">
                        {new Date(crop.expectedHarvest).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-2">
                    <button
                      onClick={() => setSelectedCrop(crop.id)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      <Eye className="h-4 w-4 inline mr-1" />
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Crop Analysis */}
          {selectedCropData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Health Trends Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedCropData.name} Health Trends
                  </h3>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Field A</span>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cropHealthHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="health"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.1}
                        name="Health Score (%)"
                      />
                      <Area
                        type="monotone"
                        dataKey="ndvi"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.1}
                        name="NDVI Index"
                        yAxisId="right"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Growth Metrics */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Growth Metrics</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Plant Height</span>
                      <span className="text-sm text-gray-900">1.8m (Target: 2.1m)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Canopy Coverage</span>
                      <span className="text-sm text-gray-900">92% (Excellent)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Biomass Index</span>
                      <span className="text-sm text-gray-900">0.78 NDVI</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Water Stress</span>
                      <span className="text-sm text-gray-900">Low Risk</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {viewMode === 'satellite' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Satellite Imagery Analysis</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">Last updated: Jan 8, 2024</span>
            </div>
          </div>
          
          {/* Satellite Map Placeholder */}
          <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Satellite className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Satellite Map View</h4>
              <p className="text-gray-600 mb-4">Interactive satellite imagery with NDVI overlay</p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                Load Satellite Data
              </button>
            </div>
          </div>

          {/* NDVI Legend */}
          <div className="mt-6 flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Stressed Vegetation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm text-gray-600">Moderate Health</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Healthy Vegetation</span>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'analysis' && (
        <div className="space-y-6">
          {/* Disease Detection Alerts */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">AI Disease Detection</h3>
                <span className="text-sm text-gray-500">{diseaseAlerts.length} active alerts</span>
              </div>
            </div>
            <div className="p-6">
              {diseaseAlerts.length > 0 ? (
                <div className="space-y-4">
                  {diseaseAlerts.map((alert) => (
                    <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className={`h-5 w-5 ${
                              alert.severity === 'High' ? 'text-red-500' :
                              alert.severity === 'Medium' ? 'text-yellow-500' : 'text-blue-500'
                            }`} />
                            <h4 className="font-medium text-gray-900">{alert.disease}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              alert.severity === 'High' ? 'bg-red-100 text-red-800' :
                              alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.severity} Risk
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p><strong>Crop:</strong> {alert.crop}</p>
                            <p><strong>Location:</strong> {alert.location}</p>
                            <p><strong>Detected:</strong> {alert.detectedAt}</p>
                            <p><strong>Confidence:</strong> {alert.confidence}%</p>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                            View Details
                          </button>
                          <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                            Mark Resolved
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Issues Detected</h4>
                  <p className="text-gray-600">All crops are healthy based on current AI analysis</p>
                </div>
              )}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Optimize Irrigation Schedule</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Soil moisture in Field A is slightly below optimal. Consider increasing irrigation frequency by 10-15%.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Early Harvest Opportunity</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Tomato crop is ahead of schedule and showing excellent maturity. Consider harvesting 5-7 days early for premium pricing.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Weather-Based Action Needed</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Heavy rainfall forecasted in 3 days. Recommend applying fungicide preventively to soybeans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CropMonitoring