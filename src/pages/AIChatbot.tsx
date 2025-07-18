import { Bot, MessageCircle, Languages, Lightbulb } from 'lucide-react'

const AIChatbot = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="text-center py-20">
        <Bot className="h-16 w-16 text-purple-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Farming Assistant</h1>
        <p className="text-gray-600 text-lg mb-8">
          Multilingual AI chatbot providing personalized farming guidance
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <MessageCircle className="h-8 w-8 text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Get instant answers to your farming questions</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Languages className="h-8 w-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">12+ Languages</h3>
            <p className="text-gray-600 text-sm">Communicate in your preferred language</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Lightbulb className="h-8 w-8 text-orange-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
            <p className="text-gray-600 text-sm">Context-aware farming advice based on your data</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIChatbot