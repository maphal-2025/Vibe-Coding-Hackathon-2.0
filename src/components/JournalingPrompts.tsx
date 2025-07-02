import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PenTool, Lightbulb, RefreshCw, Save, Calendar } from 'lucide-react'

const JournalingPrompts: React.FC = () => {
  const [currentPrompt, setCurrentPrompt] = useState(0)
  const [response, setResponse] = useState('')
  const [savedEntries, setSavedEntries] = useState<any[]>([])

  const prompts = [
    {
      category: "Self-Reflection",
      question: "What emotions did you experience most strongly today, and what might have triggered them?",
      followUp: "How did you respond to these emotions? What would you do differently next time?"
    },
    {
      category: "Gratitude",
      question: "What are three things you're grateful for today, and why do they matter to you?",
      followUp: "How can you cultivate more of these positive experiences in your life?"
    },
    {
      category: "Growth",
      question: "What challenge did you face today, and what did you learn from it?",
      followUp: "How can this learning help you in similar situations in the future?"
    },
    {
      category: "Mindfulness",
      question: "Describe a moment today when you felt fully present. What made that moment special?",
      followUp: "How can you create more opportunities for mindful presence in your daily routine?"
    },
    {
      category: "Relationships",
      question: "How did your interactions with others today reflect your values and intentions?",
      followUp: "What would you like to improve about how you connect with others?"
    },
    {
      category: "Professional",
      question: "What aspect of your work or studies energized you today? What drained your energy?",
      followUp: "How can you align your daily activities more closely with what energizes you?"
    }
  ]

  const handleSaveEntry = () => {
    if (response.trim()) {
      const entry = {
        id: Date.now(),
        date: new Date().toISOString(),
        prompt: prompts[currentPrompt],
        response: response.trim()
      }
      setSavedEntries([entry, ...savedEntries])
      setResponse('')
    }
  }

  const getNextPrompt = () => {
    setCurrentPrompt((prev) => (prev + 1) % prompts.length)
    setResponse('')
  }

  return (
    <div className="space-y-6">
      {/* Current Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Daily Reflection</h2>
              <p className="text-sm text-gray-600">{prompts[currentPrompt].category}</p>
            </div>
          </div>
          <button
            onClick={getNextPrompt}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>New Prompt</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-900 font-medium mb-2">
                  {prompts[currentPrompt].question}
                </p>
                <p className="text-sm text-gray-600">
                  {prompts[currentPrompt].followUp}
                </p>
              </div>
            </div>
          </div>

          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Take your time to reflect and write your thoughts..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {response.length} characters
            </p>
            <button
              onClick={handleSaveEntry}
              disabled={!response.trim()}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <Save className="w-4 h-4" />
              <span>Save Entry</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Recent Entries */}
      {savedEntries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h3>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {savedEntries.slice(0, 3).map((entry) => (
              <div key={entry.id} className="border-l-4 border-primary-200 pl-4 py-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {entry.prompt.category}
                  </span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {entry.response}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default JournalingPrompts