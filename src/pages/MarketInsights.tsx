import { TrendingUp, DollarSign, BarChart3, Globe } from 'lucide-react'

const MarketInsights = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="text-center py-20">
        <Globe className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Market Insights</h1>
        <p className="text-gray-600 text-lg mb-8">
          AI-powered market intelligence and commodity price forecasting
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <TrendingUp className="h-8 w-8 text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Price Trends</h3>
            <p className="text-gray-600 text-sm">Real-time commodity pricing and market forecasts</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <DollarSign className="h-8 w-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Demand Analysis</h3>
            <p className="text-gray-600 text-sm">Supply and demand insights for optimal selling</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <BarChart3 className="h-8 w-8 text-purple-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Market Analytics</h3>
            <p className="text-gray-600 text-sm">Comprehensive market data and predictions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketInsights