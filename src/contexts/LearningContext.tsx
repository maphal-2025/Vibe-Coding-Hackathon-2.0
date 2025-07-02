import React, { createContext, useContext, useState } from 'react'

interface LearningModule {
  id: string
  title: string
  description: string
  category: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  completed: boolean
  progress: number
  content: {
    type: 'video' | 'text' | 'quiz' | 'interactive'
    data: any
  }[]
}

interface LearningProgress {
  moduleId: string
  progress: number
  completedAt?: Date
  timeSpent: number
  quizScores: number[]
}

interface LearningContextType {
  modules: LearningModule[]
  progress: LearningProgress[]
  currentModule: LearningModule | null
  setCurrentModule: (module: LearningModule | null) => void
  updateProgress: (moduleId: string, progress: number) => void
  completeModule: (moduleId: string) => void
}

const LearningContext = createContext<LearningContextType | undefined>(undefined)

export const useLearning = () => {
  const context = useContext(LearningContext)
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider')
  }
  return context
}

const mockModules: LearningModule[] = [
  {
    id: '1',
    title: 'Introduction to CBT',
    description: 'Learn the fundamentals of Cognitive Behavioral Therapy',
    category: 'CBT',
    duration: 15,
    difficulty: 'beginner',
    completed: false,
    progress: 0,
    content: [
      { type: 'text', data: { text: 'CBT is a form of psychological treatment...' } },
      { type: 'video', data: { url: 'https://example.com/video1' } },
      { type: 'quiz', data: { questions: [] } }
    ]
  },
  {
    id: '2',
    title: 'Mindfulness Techniques',
    description: 'Practical mindfulness exercises for daily practice',
    category: 'Mindfulness',
    duration: 10,
    difficulty: 'beginner',
    completed: true,
    progress: 100,
    content: []
  },
  {
    id: '3',
    title: 'Trauma-Informed Care',
    description: 'Understanding and implementing trauma-informed approaches',
    category: 'Trauma Therapy',
    duration: 20,
    difficulty: 'intermediate',
    completed: false,
    progress: 45,
    content: []
  },
  {
    id: '4',
    title: 'Cognitive Distortions',
    description: 'Identifying and addressing common thinking patterns',
    category: 'CBT',
    duration: 12,
    difficulty: 'intermediate',
    completed: false,
    progress: 0,
    content: []
  },
  {
    id: '5',
    title: 'Professional Ethics',
    description: 'Ethical considerations in psychological practice',
    category: 'Ethics',
    duration: 18,
    difficulty: 'advanced',
    completed: false,
    progress: 0,
    content: []
  }
]

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<LearningModule[]>(mockModules)
  const [progress, setProgress] = useState<LearningProgress[]>([])
  const [currentModule, setCurrentModule] = useState<LearningModule | null>(null)

  const updateProgress = (moduleId: string, newProgress: number) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, progress: newProgress }
        : module
    ))
    
    setProgress(prev => {
      const existing = prev.find(p => p.moduleId === moduleId)
      if (existing) {
        return prev.map(p => 
          p.moduleId === moduleId 
            ? { ...p, progress: newProgress }
            : p
        )
      } else {
        return [...prev, { moduleId, progress: newProgress, timeSpent: 0, quizScores: [] }]
      }
    })
  }

  const completeModule = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, completed: true, progress: 100 }
        : module
    ))
    
    setProgress(prev => prev.map(p => 
      p.moduleId === moduleId 
        ? { ...p, progress: 100, completedAt: new Date() }
        : p
    ))
  }

  return (
    <LearningContext.Provider value={{
      modules,
      progress,
      currentModule,
      setCurrentModule,
      updateProgress,
      completeModule
    }}>
      {children}
    </LearningContext.Provider>
  )
}