import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Calendar, 
  Award, 
  Clock,
  Target,
  BookOpen,
  CheckCircle,
  BarChart3
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useLearning } from '../contexts/LearningContext'
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns'

const Progress: React.FC = () => {
  const { modules } = useLearning()
  const [timeRange, setTimeRange] = useState('week')

  // Mock progress data
  const dailyProgress = Array.from({ length: 30 }, (_, i) => ({
    date: format(subDays(new Date(), 29 - i), 'MMM dd'),
    minutes: Math.floor(Math.random() * 60) + 10,
    modules: Math.floor(Math.random() * 3)
  }))

  const categoryProgress = [
    { category: 'CBT', completed: 8, total: 12, percentage: 67 },
    { category: 'Mindfulness', completed: 5, total: 8, percentage: 63 },
    { category: 'Trauma Therapy', completed: 3, total: 6, percentage: 50 },
    { category: 'Ethics', completed: 2, total: 5, percentage: 40 },
    { category: 'Other', completed: 1, total: 3, percentage: 33 }
  ]

  const achievements = [
    {
      title: 'First Steps',
      description: 'Complete your first module',
      icon: BookOpen,
      earned: true,
      date: '2 weeks ago'
    },
    {
      title: 'Consistent Learner',
      description: '7-day learning streak',
      icon: Target,
      earned: true,
      date: '1 week ago'
    },
    {
      title: 'CBT Expert',
      description: 'Complete all CBT modules',
      icon: Award,
      earned: false,
      progress: 67
    },
    {
      title: 'Time Master',
      description: '50 hours of learning',
      icon: Clock,
      earned: false,
      progress: 94
    }
  ]

  const completedModules = modules.filter(m => m.completed)
  const totalProgress = modules.reduce((acc, m) => acc + m.progress, 0) / modules.length
  const totalTimeSpent = 47 // Mock data
  const currentStreak = 7 // Mock data

  const stats = [
    {
      label: 'Overall Progress',
      value: `${Math.round(totalProgress)}%`,
      icon: TrendingUp,
      color: 'text-primary-600 bg-primary-50'
    },
    {
      label: 'Modules Completed',
      value: `${completedModules.length}/${modules.length}`,
      icon: CheckCircle,
      color: 'text-accent-600 bg-accent-50'
    },
    {
      label: 'Total Time',
      value: `${totalTimeSpent}h`,
      icon: Clock,
      color: 'text-secondary-600 bg-secondary-50'
    },
    {
      label: 'Current Streak',
      value: `${currentStreak} days`,
      icon: Target,
      color: 'text-orange-600 bg-orange-50'
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Progress</h1>
          <p className="text-gray-600 mt-1">Track your learning journey and achievements</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Learning Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyProgress.slice(-14)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="minutes" 
                stroke="#0ea5e9" 
                strokeWidth={3}
                dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Progress by Category</h2>
          <div className="space-y-4">
            {categoryProgress.map((category, index) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{category.category}</span>
                  <span className="text-sm text-gray-600">
                    {category.completed}/{category.total} modules
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage}%` }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="bg-primary-600 h-2 rounded-full"
                  ></motion.div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">{category.percentage}% complete</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                achievement.earned
                  ? 'border-accent-200 bg-accent-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  achievement.earned
                    ? 'bg-accent-100 text-accent-600'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <achievement.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    achievement.earned ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h3>
                  {achievement.earned && (
                    <p className="text-xs text-accent-600">{achievement.date}</p>
                  )}
                </div>
              </div>
              <p className={`text-sm mb-3 ${
                achievement.earned ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>
              {!achievement.earned && achievement.progress && (
                <div className="space-y-1">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{achievement.progress}% complete</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {modules.filter(m => m.progress > 0).slice(0, 5).map((module, index) => (
            <div key={module.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                module.completed ? 'bg-accent-100 text-accent-600' : 'bg-primary-100 text-primary-600'
              }`}>
                {module.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <BookOpen className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{module.title}</h3>
                <p className="text-sm text-gray-600">
                  {module.completed ? 'Completed' : `${module.progress}% complete`} • {module.category}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {index === 0 ? 'Today' : `${index + 1} days ago`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Progress