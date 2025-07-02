import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Play, CheckCircle, Star, Brain } from 'lucide-react'

interface MicrolearningCardProps {
  module: {
    id: string
    title: string
    description: string
    duration: number
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    category: string
    progress: number
    completed: boolean
    aiRecommended?: boolean
    rating: number
    thumbnail?: string
  }
  onStart: (moduleId: string) => void
  compact?: boolean
}

const MicrolearningCard: React.FC<MicrolearningCardProps> = ({ 
  module, 
  onStart, 
  compact = false 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-accent-600 bg-accent-50'
      case 'intermediate': return 'text-primary-600 bg-primary-50'
      case 'advanced': return 'text-secondary-600 bg-secondary-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group cursor-pointer ${
        compact ? 'p-4' : 'p-6'
      }`}
      onClick={() => onStart(module.id)}
    >
      {module.aiRecommended && (
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <Brain className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-medium text-primary-600">AI Recommended</span>
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={`font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 ${
            compact ? 'text-sm' : 'text-base'
          }`}>
            {module.title}
          </h3>
          <p className={`text-gray-600 mt-1 line-clamp-2 ${
            compact ? 'text-xs' : 'text-sm'
          }`}>
            {module.description}
          </p>
        </div>
        {module.completed && (
          <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 ml-2" />
        )}
      </div>

      <div className={`flex items-center justify-between ${compact ? 'text-xs' : 'text-sm'} text-gray-500 mb-3`}>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{module.duration} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>{module.rating}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
          {module.difficulty}
        </span>
      </div>

      {module.progress > 0 && !module.completed && (
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${module.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{module.progress}% complete</p>
        </div>
      )}

      <button
        className={`w-full flex items-center justify-center space-x-2 font-medium rounded-lg transition-colors duration-200 ${
          compact ? 'py-2 px-3 text-sm' : 'py-2 px-4'
        } ${
          module.completed
            ? 'bg-accent-50 text-accent-700 hover:bg-accent-100'
            : module.progress > 0
            ? 'bg-primary-600 text-white hover:bg-primary-700'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {module.completed ? (
          <>
            <CheckCircle className="w-4 h-4" />
            <span>Review</span>
          </>
        ) : module.progress > 0 ? (
          <>
            <Play className="w-4 h-4" />
            <span>Continue</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            <span>Start</span>
          </>
        )}
      </button>
    </motion.div>
  )
}

export default MicrolearningCard