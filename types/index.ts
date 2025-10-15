export interface User {
  id: string
  email: string
  displayName: string
  avatar?: string
  isAdmin: boolean
  createdAt: string
  updatedAt: string
}

export interface TrafficSign {
  id: string
  irishName: string
  englishName: string
  description: string
  category: 'WARNING' | 'REGULATORY' | 'MANDATORY' | 'INFORMATIONAL' | 'DIRECTIONAL' | 'ROADWORK' | 'OTHERS' | 'SUPPLEMENTARY'
  difficultyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  imageUrl: string
  context: string
  relatedSignIds: string[]
  createdAt: string
  rating?: number
  isFavorite?: boolean
}

export interface Favorite {
  id: string
  userId: string
  signId: string
  collectionId?: string
  createdAt: string
}

export interface FavoriteCollection {
  id: string
  userId: string
  name: string
  description?: string
  isPublic: boolean
  createdAt: string
  signs?: TrafficSign[]
}

export interface Quiz {
  id: string
  title: string
  description: string
  questions: QuizQuestion[]
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
  createdBy: string
  createdAt: string
  timeLimit?: number
}

export interface QuizQuestion {
  id: string
  question: string
  type: 'multiple-choice' | 'true-false' | 'matching' | 'image-identification'
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  imageUrl?: string
  points: number
}

export interface QuizAttempt {
  id: string
  userId: string
  quizId: string
  score: number
  totalQuestions: number
  answers: QuizAnswer[]
  timeSpent: number
  completedAt: string
}

export interface QuizAnswer {
  questionId: string
  answer: string | string[]
  isCorrect: boolean
  timeSpent: number
}

export interface Achievement {
  id: string
  userId: string
  badgeName: string
  description: string
  earnedAt: string
}

export interface Rating {
  id: string
  userId: string
  signId: string
  rating: number
  review?: string
  createdAt: string
  user?: User
}

export interface UserStats {
  totalSignsLearned: number
  totalQuizzesCompleted: number
  averageScore: number
  currentStreak: number
  longestStreak: number
  totalTimeSpent: number
  achievements: Achievement[]
}

export interface LeaderboardEntry {
  user: User
  score: number
  rank: number
  totalQuizzes: number
  averageScore: number
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
