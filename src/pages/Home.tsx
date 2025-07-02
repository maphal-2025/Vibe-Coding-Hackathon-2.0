import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Clock,
  Award,
  Target,
  ArrowRight,
  Play,
  Brain,
  Heart
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLearning } from '../contexts/LearningContext'
import AIRecommendations from '../components/AIRecommendations'
import MoodTracker from '../components/MoodTracker'
import JournalingPrompts from '../components/JournalingPrompts'
import EncryptedMessaging from '../components/EncryptedMessaging'

const Home: React.FC = () => {
  const { user } = useAuth()
  const { modules } = useLearning()

  const completedModules = modules.filter(m => m.completed).length
  const inProgressModules = modules.filter(m => m.progress > 0 && !m.completed).length
  const totalProgress = modules.reduce((acc, m) => acc + m.progress, 0) / modules.length

  // Mock AI recommendations
  const aiRecommendations = modules
    .filter(m => !m.completed && m.progress === 0)
    .slice(0, 3)
    .map(module => ({
      ...module,
      rating: 4.8,
      aiRecommended: true
    }))

  const handleStartModule = (moduleId: string) => {
    console.log('Starting module:', moduleId)
    // Navigate to module content
  }

  const quickStats = [
    {
      label: 'Completed Modules',
      value: completedModules,
      icon: Award,
      color: 'text-accent-600 bg-accent-50'
    },
    {
      label: 'In Progress',
      value: inProgressModules,
      icon: Clock,
      color: 'text-primary-600 bg-primary-50'
    },
    {
      label: 'Overall Progress',
      value: `${Math.round(totalProgress)}%`,
      icon: TrendingUp,
      color: 'text-secondary-600 bg-secondary-50'
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-primary-100 text-lg mb-4">
              Your personalized microlearning journey continues
            </p>
            <div className="flex items-center space-x-4">
              <Link
                to="/learning"
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Continue Learning</span>
              </Link>
              <Link
                to="/library"
                className="border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200"
              >
                Browse Library
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <Brain className="w-16 h-16 text-white/80" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AIRecommendations 
          recommendations={aiRecommendations}
          onStartModule={handleStartModule}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Tracker */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <MoodTracker />
        </motion.div>

        {/* Journaling Prompts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <JournalingPrompts />
        </motion.div>
      </div>

      {/* Encrypted Messaging */}
      {user?.role === 'client' || user?.role === 'psychologist' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Secure Communication</h2>
            <p className="text-gray-600">End-to-end encrypted messaging with your therapist/clients</p>
          </div>
          <EncryptedMessaging />
        </motion.div>
      ) : null}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Link
          to="/client-hub"
          className="card hover:shadow-lg transition-all duration-200 group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors duration-200">
              <Users className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Client Hub</h3>
              <p className="text-sm text-gray-600">Manage client assignments</p>
            </div>
          </div>
        </Link>

        <Link
          to="/progress"
          className="card hover:shadow-lg transition-all duration-200 group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">View Progress</h3>
              <p className="text-sm text-gray-600">Track your learning journey</p>
            </div>
          </div>
        </Link>

        <Link
          to="/library"
          className="card hover:shadow-lg transition-all duration-200 group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center group-hover:bg-secondary-200 transition-colors duration-200">
              <BookOpen className="w-6 h-6 text-secondary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Content Library</h3>
              <p className="text-sm text-gray-600">Explore all resources</p>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}

export default Home