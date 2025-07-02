import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Clock, 
  Award, 
  Target,
  Calendar,
  BookOpen,
  Users,
  BarChart3
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useLearning } from '../contexts/LearningContext'
import { useAuth } from '../contexts/AuthContext'

const Dashboard: React.FC = () => {
  const { modules } = useLearning()
  const { user } = useAuth()

  // Mock data for charts
  const weeklyProgress = [
    { day: 'Mon', minutes: 25 },
    { day: 'Tue', minutes: 45 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 60 },
    { day: 'Fri', minutes: 35 },
    { day: 'Sat', minutes: 20 },
    { day: 'Sun', minutes: 40 }
  ]

  const categoryData = [
    { name: 'CBT', value: 35, color: '#0ea5e9' },
    { name: 'Mindfulness', value: 25, color: '#d946ef' },
    { name: 'Trauma Therapy', value: 20, color: '#22c55e' },
    { name: 'Ethics', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#6b7280' }
  ]

  const stats = [
    {
      label: 'Total Learning Time',
      value: '47 hours',
      change: '+12%',
      icon: Clock,
      color: 'text-primary-600 bg-primary-50'
    },
    {
      label: 'Modules Completed',
      value: modules.filter(m => m.completed).length.toString(),
      change: '+3 this week',
      icon: Award,
      color: 'text-accent-600 bg-accent-50'
    },
    {
      label: 'Current Streak',
      value: '7 days',
      change: 'Personal best!',
      icon: Target,
      color: 'text-secondary-600 bg-secondary-50'
    },
    {
      label: 'Avg. Session',
      value: '23 min',
      change: '+5 min',
      icon: BarChart3,
      color: 'text-orange-600 bg-orange-50'
    }
  ]

  const upcomingGoals = [
    { title: 'Complete CBT Fundamentals', deadline: '3 days', progress: 75 },
    { title: 'Trauma-Informed Care Certification', deadline: '1 week', progress: 45 },
    { title: 'Mindfulness Practice Module', deadline: '2 weeks', progress: 20 }
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
          <h1 className="text-3xl font-bold text-gray-900">Learning Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your progress and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
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
                <p className="text-sm text-accent-600 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Learning Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#64748b" />
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

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Categories</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-gray-600">{category.name}</span>
                <span className="text-sm font-medium text-gray-900">{category.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Goals</h2>
          <div className="space-y-4">
            {upcomingGoals.map((goal, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{goal.title}</h3>
                  <span className="text-sm text-gray-500">{goal.deadline}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{goal.progress}% complete</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors duration-200">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Start New Module</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Users className="w-5 h-5" />
              <span className="font-medium">Assign to Client</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">View Detailed Report</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard