import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Send, 
  Shield, 
  User, 
  Clock,
  Paperclip,
  MoreVertical
} from 'lucide-react'

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  encrypted: boolean
  attachments?: any[]
}

interface Conversation {
  id: string
  participantName: string
  participantRole: 'psychologist' | 'client'
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  avatar?: string
}

const EncryptedMessaging: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')

  // Mock data
  const conversations: Conversation[] = [
    {
      id: '1',
      participantName: 'Dr. Sarah Johnson',
      participantRole: 'psychologist',
      lastMessage: 'How are you feeling about the CBT exercises we discussed?',
      lastMessageTime: '2 hours ago',
      unreadCount: 2,
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: '2',
      participantName: 'Emma Thompson',
      participantRole: 'client',
      lastMessage: 'Thank you for the mindfulness module recommendation',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ]

  const messages: Message[] = [
    {
      id: '1',
      senderId: 'therapist',
      senderName: 'Dr. Sarah Johnson',
      content: 'Hi! I hope you\'re doing well. I wanted to check in about the CBT exercises we discussed in our last session.',
      timestamp: '2 hours ago',
      encrypted: true
    },
    {
      id: '2',
      senderId: 'client',
      senderName: 'You',
      content: 'Hi Dr. Johnson! I\'ve been practicing the thought challenging exercises daily. They\'re really helping me recognize my negative thought patterns.',
      timestamp: '1 hour ago',
      encrypted: true
    },
    {
      id: '3',
      senderId: 'therapist',
      senderName: 'Dr. Sarah Johnson',
      content: 'That\'s wonderful to hear! Consistency is key with CBT techniques. How are you feeling about the mindfulness module I assigned?',
      timestamp: '45 minutes ago',
      encrypted: true
    }
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending encrypted message:', newMessage)
      setNewMessage('')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-96 flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              whileHover={{ backgroundColor: '#f9fafb' }}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 cursor-pointer border-b border-gray-100 ${
                selectedConversation === conversation.id ? 'bg-primary-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={conversation.avatar || 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
                    alt={conversation.participantName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conversation.participantName}
                    </p>
                    <p className="text-xs text-gray-500">{conversation.lastMessageTime}</p>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{conversation.lastMessage}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Shield className="w-3 h-3 text-accent-600" />
                    <span className="text-xs text-accent-600">Encrypted</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                  alt="Dr. Sarah Johnson"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">Dr. Sarah Johnson</p>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-3 h-3 text-accent-600" />
                    <span className="text-xs text-accent-600">End-to-end encrypted</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'client' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === 'client'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs ${
                        message.senderId === 'client' ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                      {message.encrypted && (
                        <Shield className={`w-3 h-3 ${
                          message.senderId === 'client' ? 'text-primary-200' : 'text-accent-600'
                        }`} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-lg transition-colors duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EncryptedMessaging