import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Search, 
  Filter,
  Grid,
  List,
  Clock,
  Star,
  Users,
  Play,
  Download,
  Bookmark
} from 'lucide-react'

interface Resource {
  id: string
  title: string
  description: string
  type: 'module' | 'article' | 'video' | 'worksheet' | 'assessment'
  category: string
  duration?: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  rating: number
  learners: number
  tags: string[]
  thumbnail?: string
  author: string
  publishedAt: string
}

const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Mock library data
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Introduction to CBT',
      description: 'Learn the fundamentals of Cognitive Behavioral Therapy and its core principles.',
      type: 'module',
      category: 'CBT',
      duration: 15,
      difficulty: 'beginner',
      rating: 4.8,
      learners: 1247,
      tags: ['therapy', 'cognitive', 'behavioral'],
      author: 'Dr. Sarah Johnson',
      publishedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Mindfulness in Clinical Practice',
      description: 'Integrating mindfulness techniques into therapeutic interventions.',
      type: 'video',
      category: 'Mindfulness',
      duration: 25,
      difficulty: 'intermediate',
      rating: 4.9,
      learners: 892,
      tags: ['mindfulness', 'meditation', 'clinical'],
      author: 'Dr. Michael Chen',
      publishedAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'Trauma Assessment Worksheet',
      description: 'Comprehensive worksheet for initial trauma assessment and screening.',
      type: 'worksheet',
      category: 'Trauma Therapy',
      difficulty: 'advanced',
      rating: 4.7,
      learners: 634,
      tags: ['trauma', 'assessment', 'screening'],
      author: 'Dr. Emily Rodriguez',
      publishedAt: '2024-01-10'
    },
    {
      id: '4',
      title: 'Ethical Dilemmas in Psychology',
      description: 'Case studies and discussions on common ethical challenges in practice.',
      type: 'article',
      category: 'Ethics',
      difficulty: 'intermediate',
      rating: 4.6,
      learners: 456,
      tags: ['ethics', 'dilemmas', 'practice'],
      author: 'Dr. David Thompson',
      publishedAt: '2024-01-25'
    },
    {
      id: '5',
      title: 'Depression Screening Tool',
      description: 'Validated assessment tool for screening depression symptoms.',
      type: 'assessment',
      category: 'Assessment',
      difficulty: 'beginner',
      rating: 4.5,
      learners: 789,
      tags: ['depression', 'screening', 'assessment'],
      author: 'Dr. Lisa Wang',
      publishedAt: '2024-01-18'
    },
    {
      id: '6',
      title: 'Advanced CBT Techniques',
      description: 'Explore advanced cognitive behavioral therapy interventions and strategies.',
      type: 'module',
      category: 'CBT',
      duration: 30,
      difficulty: 'advanced',
      rating: 4.9,
      learners: 567,
      tags: ['CBT', 'advanced', 'techniques'],
      author: 'Dr. Robert Kim',
      publishedAt: '2024-01-12'
    }
  ]

  const categories = ['all', 'CBT', 'Mindfulness', 'Trauma Therapy', 'Ethics', 'Assessment']
  const types = ['all', 'module', 'article', 'video', 'worksheet', 'assessment']

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesType = selectedType === 'all' || resource.type === selectedType
    
    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'module': return BookOpen
      case 'video': return Play
      case 'article': return BookOpen
      case 'worksheet': return Download
      case 'assessment': return List
      default: return BookOpen
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'module': return 'text-primary-600 bg-primary-50'
      case 'video': return 'text-red-600 bg-red-50'
      case 'article': return 'text-accent-600 bg-accent-50'
      case 'worksheet': return 'text-secondary-600 bg-secondary-50'
      case 'assessment': return 'text-orange-600 bg-orange-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-accent-600 bg-accent-50'
      case 'intermediate': return 'text-primary-600 bg-primary-50'
      case 'advanced': return 'text-secondary-600 bg-secondary-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Library</h1>
          <p className="text-gray-600 mt-1">Explore our comprehensive collection of learning resources</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
          </div>
          <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-4 items-center"
      >
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
        
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {types.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>{filteredResources.length} resources found</span>
        </div>
      </motion.div>

      {/* Resources Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'space-y-4'
      }>
        {filteredResources.map((resource, index) => {
          const TypeIcon = getTypeIcon(resource.type)
          
          return viewMode === 'grid' ? (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(resource.type)}`}>
                  <TypeIcon className="w-5 h-5" />
                </div>
                <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors duration-200">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {resource.description}
              </p>

              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                {resource.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{resource.duration} min</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{resource.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{resource.learners}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                  {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
                </span>
                <span className="text-xs text-gray-500">{resource.category}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  <p>by {resource.author}</p>
                  <p>{new Date(resource.publishedAt).toLocaleDateString()}</p>
                </div>
                <button className="btn-primary text-sm py-1 px-3">
                  View
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(resource.type)}`}>
                  <TypeIcon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {resource.duration && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{resource.duration} min</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{resource.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{resource.learners} learners</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span>{resource.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                        {resource.difficulty}
                      </span>
                      <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors duration-200">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="btn-primary text-sm py-1 px-3">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredResources.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  )
}

export default Library