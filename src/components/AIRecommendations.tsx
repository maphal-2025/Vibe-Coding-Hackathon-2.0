import React from 'react'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, Target, Sparkles } from 'lucide-react'
import MicrolearningCard from './MicrolearningCard'

interface AIRecommendationsProps {
  recommendations: any[]
  onStartModule: (moduleId: string) => void
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ 
  recommendations, 
  onStartModule 
}) => {
  const insights = [
    {
      icon: TrendingUp,
      title: "Learning Velocity",
      description: "You're 23% faster than average this week",
      color: "text-accent-600 bg-accent-50"
    },
    {
      icon: Target,
      title: "Focus Area",
      description: "CBT techniques showing strong retention",
      color: "text-primary-600 bg-primary-50"
    },
    {
      icon: Sparkles,
      title: "Optimal Time",
      description: "Best learning window: 9-11 AM",
      color: "text-secondary-600 bg-secondary-50"
    }
  ]

  return (
    <div className="space-y-6">
      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">AI Learning Insights</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-4"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${insight.color}`}>
                  <insight.icon className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-gray-900">{insight.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommended Modules */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((module) => (
            <MicrolearningCard
              key={module.id}
              module={{ ...module, aiRecommended: true }}
              onStart={onStartModule}
              compact
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIRecommendations