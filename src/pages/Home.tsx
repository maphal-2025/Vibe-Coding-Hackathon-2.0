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
  Play
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLearning } from '../contexts/LearningContext'

const Home: React.FC = () => {
  const { user } = useAuth()
  const { modules } = useLearning()

  const completedModules = modules.filter(m => m.completed).length
  const inProgressModules = modules.filter(m => m.progress > 0 && !m.completed).length
  const totalProgress = modules.reduce((acc, m) => acc + m.progress, 0) / modules.length

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

  const recentModules = modules
    .filter(m => m.progress > 0)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3)

  const recommendedModules = modules
    .filter(m => !m.completed && m.progress === 0)
    .slice(0, 3)

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
              Continue your journey in mental wellness education
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
              <BookOpen className="w-16 h-16 text-white/80" />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
            <Link
              to="/learning"
              className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm font-medium"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentModules.length > 0 ? (
              recentModules.map((module) => (
                <div key={module.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-600">{module.category} • {module.duration} min</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{module.progress}% complete</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No modules in progress yet</p>
                <Link
                  to="/learning"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Start your first module
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recommended for You */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
            <Link
              to="/library"
              className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm font-medium"
            >
              <span>Browse all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recommendedModules.map((module) => (
              <div key={module.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-200 cursor-pointer">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-secondary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{module.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{module.category}</span>
                    <span>{module.duration} min</span>
                    <span className="capitalize">{module.difficulty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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