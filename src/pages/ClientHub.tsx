import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Plus, 
  Search, 
  Send,
  BookOpen,
  Clock,
  CheckCircle,
  MessageSquare,
  Filter,
  User,
  Calendar,
  TrendingUp
} from 'lucide-react'

interface Client {
  id: string
  name: string
  email: string
  avatar?: string
  assignedModules: number
  completedModules: number
  lastActivity: string
  progress: number
  status: 'active' | 'inactive'
}

const ClientHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [showAssignModal, setShowAssignModal] = useState(false)

  // Mock client data
  const clients: Client[] = [
    {
      id: '1',
      name: 'Emma Thompson',
      email: 'emma.thompson@email.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      assignedModules: 5,
      completedModules: 3,
      lastActivity: '2 hours ago',
      progress: 60,
      status: 'active'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      assignedModules: 3,
      completedModules: 1,
      lastActivity: '1 day ago',
      progress: 33,
      status: 'active'
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      assignedModules: 4,
      completedModules: 4,
      lastActivity: '3 days ago',
      progress: 100,
      status: 'inactive'
    },
    {
      id: '4',
      name: 'David Rodriguez',
      email: 'david.rodriguez@email.com',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      assignedModules: 6,
      completedModules: 2,
      lastActivity: '5 hours ago',
      progress: 33,
      status: 'active'
    }
  ]

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const availableModules = [
    { id: '1', title: 'Introduction to CBT', category: 'CBT', duration: 15 },
    { id: '2', title: 'Mindfulness Techniques', category: 'Mindfulness', duration: 10 },
    { id: '3', title: 'Cognitive Distortions', category: 'CBT', duration: 12 },
    { id: '4', title: 'Grounding Techniques', category: 'Mindfulness', duration: 8 }
  ]

  const stats = [
    {
      label: 'Total Clients',
      value: clients.length.toString(),
      icon: Users,
      color: 'text-primary-600 bg-primary-50'
    },
    {
      label: 'Active Clients',
      value: clients.filter(c => c.status === 'active').length.toString(),
      icon: TrendingUp,
      color: 'text-accent-600 bg-accent-50'
    },
    {
      label: 'Modules Assigned',
      value: clients.reduce((acc, c) => acc + c.assignedModules, 0).toString(),
      icon: BookOpen,
      color: 'text-secondary-600 bg-secondary-50'
    },
    {
      label: 'Avg. Completion',
      value: `${Math.round(clients.reduce((acc, c) => acc + c.progress, 0) / clients.length)}%`,
      icon: CheckCircle,
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
          <h1 className="text-3xl font-bold text-gray-900">Client Hub</h1>
          <p className="text-gray-600 mt-1">Manage client assignments and track progress</p>
        </div>
        <button
          onClick={() => setShowAssignModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Client List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Clients</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
                />
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredClients.map((client) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedClient?.id === client.id
                    ? 'border-primary-300 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedClient(client)}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {client.avatar ? (
                      <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      client.status === 'active' ? 'bg-accent-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{client.name}</h3>
                      <span className="text-sm text-gray-500">{client.lastActivity}</span>
                    </div>
                    <p className="text-sm text-gray-600">{client.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <BookOpen className="w-4 h-4" />
                        <span>{client.completedModules}/{client.assignedModules} modules</span>
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${client.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{client.progress}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Client Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          {selectedClient ? (
            <div className="space-y-6">
              <div className="text-center">
                {selectedClient.avatar ? (
                  <img
                    src={selectedClient.avatar}
                    alt={selectedClient.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900">{selectedClient.name}</h3>
                <p className="text-sm text-gray-600">{selectedClient.email}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  selectedClient.status === 'active'
                    ? 'bg-accent-100 text-accent-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {selectedClient.status.charAt(0).toUpperCase() + selectedClient.status.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Overall Progress</span>
                  <span className="text-sm font-medium text-gray-900">{selectedClient.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${selectedClient.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-gray-900">{selectedClient.assignedModules}</p>
                    <p className="text-xs text-gray-600">Assigned</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-gray-900">{selectedClient.completedModules}</p>
                    <p className="text-xs text-gray-600">Completed</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Assign Module</span>
                </button>
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Client</h3>
              <p className="text-gray-600">Choose a client from the list to view details and manage assignments</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ClientHub