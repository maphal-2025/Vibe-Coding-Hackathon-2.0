import { Link } from 'react-router-dom'
import { 
  Sprout, 
  Satellite, 
  TrendingUp, 
  Bot, 
  TestTube,
  CloudRain,
  ArrowRight,
  CheckCircle,
  Globe,
  Users,
  BarChart3,
  Leaf
} from 'lucide-react'
import { useFarm } from '../contexts/FarmContext'

const Home = () => {
  const { farm, crops } = useFarm()

  const features = [
    {
      icon: Satellite,
      title: 'Satellite & Drone Analysis',
      description: 'CNN-based crop disease detection and plant health assessment using real-time satellite imagery.',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: CloudRain,
      title: 'Climate Prediction Models',
      description: 'Time-series analysis for weather-based planting recommendations with 85% accuracy.',
      color: 'text-cyan-600 bg-cyan-100'
    },
    {
      icon: TestTube,
      title: 'Soil Health Analysis',
      description: 'ML classification models on soil sensor data for personalized fertilization guidance.',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Bot,
      title: 'Multilingual AI Assistant',
      description: 'NLP-powered farming advice in 12+ local languages with voice-enabled interface.',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: TrendingUp,
      title: 'Market Intelligence',
      description: 'Predictive modeling for crop pricing and demand patterns with supply chain optimization.',
      color: 'text-orange-600 bg-orange-100'
    },
    {
      icon: BarChart3,
      title: 'Fairness-Aware AI',
      description: 'Regular bias audits ensuring equitable service delivery across diverse farming communities.',
      color: 'text-indigo-600 bg-indigo-100'
    }
  ]

  const stats = [
    { label: 'Farmers Served', value: '1,200+', icon: Users },
    { label: 'Average Yield Increase', value: '25%', icon: TrendingUp },
    { label: 'Languages Supported', value: '15+', icon: Globe },
    { label: 'Countries Active', value: '8', icon: Leaf }
  ]

  const testimonials = [
    {
      name: 'Maria Santos',
      location: 'Brazil',
      quote: 'AgriSense helped me increase my corn yield by 30% while reducing fertilizer costs. The AI recommendations are incredibly accurate.',
      crop: 'Corn & Soybeans'
    },
    {
      name: 'Kofi Asante',
      location: 'Ghana',
      quote: 'The multilingual chatbot in Twi has been a game-changer. I get expert advice in my native language instantly.',
      crop: 'Cocoa & Cassava'
    },
    {
      name: 'Raj Patel',
      location: 'India',
      quote: 'Weather predictions helped me save my entire wheat crop from unexpected frost. The satellite monitoring is amazing.',
      crop: 'Wheat & Rice'
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-blue-800">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sprout className="h-16 w-16 text-white mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                AgriSense
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              AI-Powered Smart Farming for Zero Hunger
            </p>
            <p className="text-lg text-green-200 mb-12 max-w-2xl mx-auto">
              Empowering smallholder farmers with cutting-edge AI technology to optimize crop production, 
              monitor soil health, predict yields, and connect to global food distribution networks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition-colors"
              >
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/crop-monitoring"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-green-600 transition-colors"
              >
                Start Monitoring
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <stat.icon className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive AI-Powered Agriculture Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              70% AI integration across all farming operations - from satellite monitoring to market intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-6`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission: SDG Goal 2 - Zero Hunger
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                AgriSense bridges the technology gap for smallholder farmers who often lack access to 
                timely information about crop health, weather patterns, and market prices. By democratizing 
                AI-powered agricultural insights, we're working towards a world where every farmer can 
                maximize their yield and contribute to global food security.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-800">25% average yield increase in pilot communities</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-800">30% reduction in fertilizer costs through precision agriculture</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-800">40% improvement in water usage efficiency</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-800">18% average decrease in carbon footprint per farm</span>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-8">
                <div className="text-center">
                  <Globe className="h-20 w-20 text-green-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Impact</h3>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-green-600">1,200+</div>
                      <div className="text-sm text-gray-600">Active Farmers</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">15+</div>
                      <div className="text-sm text-gray-600">Languages</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600">3</div>
                      <div className="text-sm text-gray-600">Continents</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-orange-600">94.2%</div>
                      <div className="text-sm text-gray-600">AI Accuracy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Farmers Around the World Trust AgriSense
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real farmers making a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Sprout className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
                <div className="text-sm text-gray-500">
                  Grows: {testimonial.crop}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers already using AgriSense to increase yields, reduce costs, and build sustainable farming practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition-colors"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/ai-assistant"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-green-600 transition-colors"
            >
              Try AI Assistant
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home