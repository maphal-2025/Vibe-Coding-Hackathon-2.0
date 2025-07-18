import React, { createContext, useContext, useState, useEffect } from 'react'

interface Farm {
  id: string
  name: string
  location: {
    latitude: number
    longitude: number
    address: string
  }
  size: number // in hectares
  cropTypes: string[]
  soilType: string
  irrigationType: string
}

interface CropData {
  id: string
  name: string
  plantingDate: string
  expectedHarvest: string
  currentGrowthStage: string
  healthStatus: 'healthy' | 'warning' | 'critical'
  predictedYield: number
  area: number
}

interface SoilData {
  ph: number
  nitrogen: number
  phosphorus: number
  potassium: number
  organicMatter: number
  moisture: number
  temperature: number
  lastUpdated: string
}

interface WeatherData {
  current: {
    temperature: number
    humidity: number
    windSpeed: number
    precipitation: number
    cloudCover: number
  }
  forecast: Array<{
    date: string
    maxTemp: number
    minTemp: number
    precipitation: number
    humidity: number
    condition: string
  }>
}

interface MarketData {
  crop: string
  currentPrice: number
  priceChange: number
  demand: 'high' | 'medium' | 'low'
  forecast: Array<{
    date: string
    price: number
  }>
}

interface FarmContextType {
  farm: Farm | null
  setFarm: (farm: Farm) => void
  crops: CropData[]
  setCrops: (crops: CropData[]) => void
  soilData: SoilData | null
  setSoilData: (data: SoilData) => void
  weatherData: WeatherData | null
  setWeatherData: (data: WeatherData) => void
  marketData: MarketData[]
  setMarketData: (data: MarketData[]) => void
  aiRecommendations: string[]
  setAiRecommendations: (recommendations: string[]) => void
  isLoadingWeather: boolean
  isLoadingSoil: boolean
  isLoadingMarket: boolean
  refreshWeatherData: () => Promise<void>
  refreshSoilData: () => Promise<void>
  refreshMarketData: () => Promise<void>
}

const FarmContext = createContext<FarmContextType | undefined>(undefined)

export const useFarm = () => {
  const context = useContext(FarmContext)
  if (context === undefined) {
    throw new Error('useFarm must be used within a FarmProvider')
  }
  return context
}

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farm, setFarm] = useState<Farm | null>(null)
  const [crops, setCrops] = useState<CropData[]>([])
  const [soilData, setSoilData] = useState<SoilData | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([])
  const [isLoadingWeather, setIsLoadingWeather] = useState(false)
  const [isLoadingSoil, setIsLoadingSoil] = useState(false)
  const [isLoadingMarket, setIsLoadingMarket] = useState(false)

  // Initialize with demo data
  useEffect(() => {
    const demoFarm: Farm = {
      id: '1',
      name: 'Green Valley Farm',
      location: {
        latitude: 40.7128,
        longitude: -74.0060,
        address: 'Sustainable Valley, Agriville, AV 12345'
      },
      size: 25.5,
      cropTypes: ['Corn', 'Soybeans', 'Wheat', 'Tomatoes'],
      soilType: 'Loamy',
      irrigationType: 'Drip Irrigation'
    }

    const demoCrops: CropData[] = [
      {
        id: '1',
        name: 'Corn',
        plantingDate: '2024-04-15',
        expectedHarvest: '2024-09-30',
        currentGrowthStage: 'Tasseling',
        healthStatus: 'healthy',
        predictedYield: 8.5,
        area: 10.2
      },
      {
        id: '2',
        name: 'Soybeans',
        plantingDate: '2024-05-01',
        expectedHarvest: '2024-10-15',
        currentGrowthStage: 'Flowering',
        healthStatus: 'warning',
        predictedYield: 3.2,
        area: 8.3
      },
      {
        id: '3',
        name: 'Tomatoes',
        plantingDate: '2024-03-20',
        expectedHarvest: '2024-08-15',
        currentGrowthStage: 'Fruiting',
        healthStatus: 'healthy',
        predictedYield: 45.8,
        area: 4.0
      }
    ]

    const demoSoil: SoilData = {
      ph: 6.8,
      nitrogen: 45,
      phosphorus: 25,
      potassium: 180,
      organicMatter: 3.2,
      moisture: 68,
      temperature: 22,
      lastUpdated: new Date().toISOString()
    }

    const demoWeather: WeatherData = {
      current: {
        temperature: 24,
        humidity: 65,
        windSpeed: 8.5,
        precipitation: 0,
        cloudCover: 20
      },
      forecast: [
        { date: '2024-01-09', maxTemp: 26, minTemp: 18, precipitation: 5, humidity: 70, condition: 'Partly Cloudy' },
        { date: '2024-01-10', maxTemp: 28, minTemp: 20, precipitation: 0, humidity: 65, condition: 'Sunny' },
        { date: '2024-01-11', maxTemp: 25, minTemp: 17, precipitation: 15, humidity: 80, condition: 'Light Rain' },
        { date: '2024-01-12', maxTemp: 27, minTemp: 19, precipitation: 0, humidity: 60, condition: 'Sunny' },
        { date: '2024-01-13', maxTemp: 29, minTemp: 21, precipitation: 0, humidity: 55, condition: 'Clear' },
        { date: '2024-01-14', maxTemp: 24, minTemp: 16, precipitation: 25, humidity: 85, condition: 'Rain' },
        { date: '2024-01-15', maxTemp: 26, minTemp: 18, precipitation: 10, humidity: 75, condition: 'Scattered Showers' }
      ]
    }

    const demoMarket: MarketData[] = [
      {
        crop: 'Corn',
        currentPrice: 245.50,
        priceChange: 2.3,
        demand: 'high',
        forecast: [
          { date: '2024-01-09', price: 245.50 },
          { date: '2024-01-16', price: 248.20 },
          { date: '2024-01-23', price: 251.10 },
          { date: '2024-01-30', price: 249.80 }
        ]
      },
      {
        crop: 'Soybeans',
        currentPrice: 428.75,
        priceChange: -1.8,
        demand: 'medium',
        forecast: [
          { date: '2024-01-09', price: 428.75 },
          { date: '2024-01-16', price: 425.60 },
          { date: '2024-01-23', price: 432.15 },
          { date: '2024-01-30', price: 435.20 }
        ]
      },
      {
        crop: 'Tomatoes',
        currentPrice: 2.85,
        priceChange: 5.2,
        demand: 'high',
        forecast: [
          { date: '2024-01-09', price: 2.85 },
          { date: '2024-01-16', price: 2.92 },
          { date: '2024-01-23', price: 3.05 },
          { date: '2024-01-30', price: 3.12 }
        ]
      }
    ]

    const demoRecommendations = [
      'Consider applying nitrogen fertilizer to soybean field - soil levels are below optimal',
      'Weather forecast shows rain in 3 days - delay irrigation schedule',
      'Corn market prices trending upward - consider selling 20% of current stock',
      'Tomato plants showing excellent growth - increase harvesting frequency',
      'Soil moisture is optimal for all crops - maintain current irrigation schedule'
    ]

    setFarm(demoFarm)
    setCrops(demoCrops)
    setSoilData(demoSoil)
    setWeatherData(demoWeather)
    setMarketData(demoMarket)
    setAiRecommendations(demoRecommendations)
  }, [])

  const refreshWeatherData = async () => {
    setIsLoadingWeather(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // In a real app, this would fetch from OpenWeatherMap API
      console.log('Weather data refreshed')
    } catch (error) {
      console.error('Failed to refresh weather data:', error)
    } finally {
      setIsLoadingWeather(false)
    }
  }

  const refreshSoilData = async () => {
    setIsLoadingSoil(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // In a real app, this would fetch from soil sensors
      console.log('Soil data refreshed')
    } catch (error) {
      console.error('Failed to refresh soil data:', error)
    } finally {
      setIsLoadingSoil(false)
    }
  }

  const refreshMarketData = async () => {
    setIsLoadingMarket(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // In a real app, this would fetch from commodity markets API
      console.log('Market data refreshed')
    } catch (error) {
      console.error('Failed to refresh market data:', error)
    } finally {
      setIsLoadingMarket(false)
    }
  }

  const value: FarmContextType = {
    farm,
    setFarm,
    crops,
    setCrops,
    soilData,
    setSoilData,
    weatherData,
    setWeatherData,
    marketData,
    setMarketData,
    aiRecommendations,
    setAiRecommendations,
    isLoadingWeather,
    isLoadingSoil,
    isLoadingMarket,
    refreshWeatherData,
    refreshSoilData,
    refreshMarketData
  }

  return (
    <FarmContext.Provider value={value}>
      {children}
    </FarmContext.Provider>
  )
}