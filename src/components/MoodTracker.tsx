import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Brain, MessageCircle } from 'lucide-react'

interface MoodEntry {
  date: string
  mood: number
  energy: number
  stress: number
  notes?: string
}

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [energy, setEnergy] = useState(5)
  const [stress, setStress] = useState(5)
  const [notes, setNotes] = useState('')

  const moodEmojis = [
    { value: 1, emoji: '😢', label: 'Very Low', color: 'text-red-500' },
    { value: 2, emoji: '😔', label: 'Low', color: 'text-orange-500' },
    { value: 3, emoji: '😐', label: 'Neutral', color: 'text-yellow-500' },
    { value: 4, emoji: '🙂', label: 'Good', color: 'text-green-500' },
    { value: 5, emoji: '😊', label: 'Great', color: 'text-accent-500' }
  ]

  const handleSubmit = () => {
    if (selectedMood) {
      const entry: MoodEntry = {
        date: new Date().toISOString(),
        mood: selectedMood,
        energy,
        stress,
        notes
      }
      console.log('Mood entry:', entry)
      // Reset form
      setSelectedMood(null)
      setEnergy(5)
      setStress(5)
      setNotes('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Daily Mood Check-in</h2>
      </div>

      <div className="space-y-6">
        {/* Mood Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How are you feeling today?
          </label>
          <div className="flex justify-between">
            {moodEmojis.map((mood) => (
              <motion.button
                key={mood.value}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                  selectedMood === mood.value
                    ? 'bg-primary-50 border-2 border-primary-300'
                    : 'hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className={`text-xs font-medium ${mood.color}`}>
                  {mood.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Energy Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Energy Level: {energy}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Stress Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stress Level: {stress}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={stress}
            onChange={(e) => setStress(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How was your day? Any thoughts or reflections..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedMood}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Save Check-in</span>
        </button>
      </div>
    </motion.div>
  )
}

export default MoodTracker