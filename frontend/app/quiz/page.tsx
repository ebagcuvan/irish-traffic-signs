'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { TrafficSign } from '@/types'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trophy, 
  Star,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Target
} from 'lucide-react'
import Image from 'next/image'
import { formatTextWithLineBreaks } from '@/lib/text-utils'
import { trafficSignsData } from '../../lib/data'

interface TrafficSignData {
  id: string
  name: string
  category: string
  categories: string[]
  imagePath: string
  description: string
  meaning: string
  tags: string[]
  shape: string
  color: string
}

interface QuizQuestion {
  id: string
  sign: TrafficSign
  options: string[]
  correctAnswer: string
  explanation: string
}

interface QuizResult {
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  accuracy: number
}

export default function QuizPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({})
  const [startTime, setStartTime] = useState<number | null>(null)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [difficulty, setDifficulty] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'MIXED'>('MIXED')
  const [category, setCategory] = useState<string>('')
  const [questionCount, setQuestionCount] = useState(10)
  const [allSigns, setAllSigns] = useState<TrafficSign[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])

  // URL'den sayfa numarasını oku (sadece quiz başladıktan sonra)
  useEffect(() => {
    if (!quizStarted || quizQuestions.length === 0) return
    
    const pageParam = searchParams.get('page')
    if (pageParam && !isNaN(Number(pageParam))) {
      const pageNumber = Number(pageParam) - 1 // URL'de 1-based, state'te 0-based
      if (pageNumber >= 0 && pageNumber < quizQuestions.length) {
        setCurrentQuestion(pageNumber)
        setSelectedAnswer(userAnswers[pageNumber] || null)
      }
    }
  }, [searchParams, quizQuestions.length, userAnswers, quizStarted])

  // URL'yi güncelle
  const updateURL = (questionIndex: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('page', (questionIndex + 1).toString())
    router.push(`/quiz?${newSearchParams.toString()}`, { scroll: false })
  }

  // Load signs from data file
  useEffect(() => {
    const loadSigns = () => {
      try {
        setIsLoading(true)
        const data = trafficSignsData
        
        // Transform JSON data to TrafficSign format
        const transformedSigns: TrafficSign[] = data.signs.map((sign: TrafficSignData) => ({
          id: sign.id,
          irishName: sign.name,
          englishName: sign.name,
          description: sign.description || sign.meaning || '',
          category: mapCategory(sign.category),
          difficultyLevel: determineDifficultyLevel(sign),
          imageUrl: sign.imagePath || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
          context: sign.meaning || sign.description || '',
          relatedSignIds: [],
          createdAt: new Date().toISOString(),
          isFavorite: false,
          rating: 0
        }))
        
        setAllSigns(transformedSigns)
      } catch (error) {
        console.error('Error loading signs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSigns()
  }, [])

  // Map category from JSON to database enum
  const mapCategory = (category: string): 'WARNING' | 'REGULATORY' | 'MANDATORY' | 'INFORMATIONAL' | 'DIRECTIONAL' | 'ROADWORK' | 'OTHERS' | 'SUPPLEMENTARY' => {
    const categoryMap: { [key: string]: 'WARNING' | 'REGULATORY' | 'MANDATORY' | 'INFORMATIONAL' | 'DIRECTIONAL' | 'ROADWORK' | 'OTHERS' | 'SUPPLEMENTARY' } = {
      'Warning Signs': 'WARNING',
      'Regulatory Signs': 'REGULATORY',
      'Mandatory Signs': 'MANDATORY',
      'Informational Signs': 'INFORMATIONAL',
      'Directional Signs': 'DIRECTIONAL',
      'Temporary Signs': 'WARNING',
      'Road Markings': 'INFORMATIONAL',
      'Others Signs': 'OTHERS',
      'Roadwork Signs': 'ROADWORK',
      'Supplementary Plates': 'SUPPLEMENTARY',
    }
    return categoryMap[category] || 'OTHERS'
  }

  // Determine difficulty level based on sign properties
  const determineDifficultyLevel = (sign: TrafficSignData): 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' => {
    if (sign.category === 'Warning Signs' && sign.tags?.includes('complex')) {
      return 'ADVANCED'
    }
    if (sign.category === 'Regulatory Signs' || sign.category === 'Mandatory Signs') {
      return 'INTERMEDIATE'
    }
    if (sign.category === 'Informational Signs' || sign.category === 'Directional Signs') {
      return 'BEGINNER'
    }
    return 'INTERMEDIATE'
  }

  // Generate quiz questions
  useEffect(() => {
    console.log('Quiz useEffect triggered:', { allSignsLength: allSigns.length, quizStarted, questionCount })
    if (allSigns.length > 0 && quizStarted) {
      console.log('Generating quiz questions...')
      const questions = generateQuizQuestions(allSigns, questionCount)
      console.log('Generated questions:', questions.length)
      setQuizQuestions(questions)
      setStartTime(Date.now())
      // Quiz başladıktan sonra URL'yi güncelle
      updateURL(0)
    }
  }, [allSigns, quizStarted, questionCount])

  const generateQuizQuestions = (signs: TrafficSign[], count: number): QuizQuestion[] => {
    // Filter signs based on difficulty and category
    let filteredSigns = signs
    if (difficulty !== 'MIXED') {
      filteredSigns = filteredSigns.filter(sign => sign.difficultyLevel.toUpperCase() === difficulty)
    }
    if (category) {
      filteredSigns = filteredSigns.filter(sign => sign.category === category)
    }
    
    // If not enough signs for the selected filters, use all signs
    if (filteredSigns.length < count) {
      filteredSigns = signs
    }
    
    const shuffled = [...filteredSigns].sort(() => Math.random() - 0.5)
    const selectedSigns = shuffled.slice(0, count)
    
    return selectedSigns.map((sign, index) => {
      // Get other signs for wrong options (from same category if possible)
      const sameCategorySigns = signs.filter(s => s.category === sign.category && s.id !== sign.id)
      const otherSigns = signs.filter(s => s.id !== sign.id)
      
      // Try to get 2 from same category, 1 from different category
      let wrongOptions: string[] = []
      if (sameCategorySigns.length >= 2) {
        wrongOptions = sameCategorySigns
          .sort(() => Math.random() - 0.5)
          .slice(0, 2)
          .map(s => s.englishName)
        
        const differentCategorySigns = otherSigns.filter(s => s.category !== sign.category)
        if (differentCategorySigns.length > 0) {
          wrongOptions.push(differentCategorySigns[Math.floor(Math.random() * differentCategorySigns.length)].englishName)
        }
      } else {
        wrongOptions = otherSigns
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(s => s.englishName)
      }
      
      const options = [sign.englishName, ...wrongOptions].sort(() => Math.random() - 0.5)
      
      return {
        id: `question-${index}`,
        sign,
        options,
        correctAnswer: sign.englishName,
        explanation: sign.description || sign.context || 'No explanation available.'
      }
    })
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestion]: selectedAnswer
      }))
    }

    if (currentQuestion < quizQuestions.length - 1) {
      const nextQuestion = currentQuestion + 1
      setCurrentQuestion(nextQuestion)
      setSelectedAnswer(userAnswers[nextQuestion] || null)
      setShowResult(false)
      updateURL(nextQuestion)
    } else {
      // Quiz completed
      const finalAnswers = {
        ...userAnswers,
        [currentQuestion]: selectedAnswer || ''
      }
      setUserAnswers(finalAnswers)
      completeQuiz(finalAnswers)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1
      setCurrentQuestion(prevQuestion)
      setSelectedAnswer(userAnswers[prevQuestion] || null)
      setShowResult(false)
      updateURL(prevQuestion)
    }
  }

  const completeQuiz = (answers: { [key: number]: string }) => {
    const correctAnswers = quizQuestions.filter((question, index) => 
      answers[index] === question.correctAnswer
    ).length

    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0
    const accuracy = Math.round((correctAnswers / quizQuestions.length) * 100)

    setQuizResult({
      score: correctAnswers,
      totalQuestions: quizQuestions.length,
      correctAnswers,
      timeSpent,
      accuracy
    })

    setQuizCompleted(true)
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setQuizCompleted(false)
    setUserAnswers({})
    setStartTime(null)
    setQuizResult(null)
    setCategory('')
    setDifficulty('MIXED')
    setQuestionCount(10)
    // URL'yi temizle
    router.push('/quiz', { scroll: false })
  }

  const getScoreColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600'
    if (accuracy >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = (accuracy: number) => {
    if (accuracy >= 90) return 'Excellent! You know your Irish traffic signs!'
    if (accuracy >= 80) return 'Great job! You have good knowledge of traffic signs.'
    if (accuracy >= 60) return 'Not bad! Keep studying to improve your score.'
    return 'Keep practicing! You\'ll get better with time.'
  }

  // Debug quiz state
  const isButtonDisabled = isLoading || allSigns.length === 0
  console.log('Quiz state:', { 
    quizStarted, 
    allSignsLength: allSigns.length, 
    quizQuestionsLength: quizQuestions.length,
    currentQuestion,
    isLoading,
    isButtonDisabled
  })

  // Don't auto-start quiz, let user choose settings first

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Target className="h-12 w-12 text-primary-600" />
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Irish Traffic Signs Quiz
                </h1>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Test your knowledge of Irish traffic signs with our interactive quiz!
              </p>
            </div>

            {/* Quiz Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Quiz Settings
              </h2>
              
              <div className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Category (Optional)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">All Categories</option>
                    {Array.from(new Set(allSigns.map(sign => sign.category))).sort().map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.toLowerCase().replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Difficulty Level
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'MIXED', label: 'Mixed', color: 'bg-gray-100 text-gray-800' },
                      { value: 'BEGINNER', label: 'Beginner', color: 'bg-green-100 text-green-800' },
                      { value: 'INTERMEDIATE', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
                      { value: 'ADVANCED', label: 'Advanced', color: 'bg-red-100 text-red-800' }
                    ].map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setDifficulty(level.value as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          difficulty === level.value
                            ? level.color + ' ring-2 ring-primary-500'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Number of Questions
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[5, 10, 20].map((count) => (
                      <button
                        key={count}
                        onClick={() => setQuestionCount(count)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          questionCount === count
                            ? 'bg-primary-100 text-primary-800 ring-2 ring-primary-500'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {count} Questions
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Start Quiz Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  console.log('Start Quiz clicked!', { allSignsLength: allSigns.length, isLoading })
                  setQuizStarted(true)
                }}
                disabled={isLoading || allSigns.length === 0}
                style={{ 
                  backgroundColor: (isLoading || allSigns.length === 0) ? '#gray' : '#blue',
                  cursor: (isLoading || allSigns.length === 0) ? 'not-allowed' : 'pointer',
                  padding: '16px 32px',
                  fontSize: '18px',
                  borderRadius: '8px',
                  border: 'none',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Play className="h-5 w-5 mr-2" />
                {isLoading ? 'Loading Signs...' : allSigns.length === 0 ? 'No Signs Available' : 'Start Quiz'}
              </Button>
              
              {allSigns.length > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {allSigns.length} signs available for quiz
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (quizCompleted && quizResult) {
    const wrongAnswers = quizQuestions.filter((question, index) => 
      userAnswers[index] !== question.correctAnswer
    )

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="h-12 w-12 text-yellow-500" />
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Quiz Complete!
                </h1>
              </div>
              <p className={`text-2xl font-semibold ${getScoreColor(quizResult.accuracy)}`}>
                {quizResult.accuracy}% Accuracy
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                {getScoreMessage(quizResult.accuracy)}
              </p>
            </div>

            {/* Results Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {quizResult.correctAnswers}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Correct
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                    {quizResult.totalQuestions - quizResult.correctAnswers}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Incorrect
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {Math.floor(quizResult.timeSpent / 60)}:{(quizResult.timeSpent % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Time
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {quizResult.accuracy}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Accuracy
                  </div>
                </div>
              </div>
            </div>

            {/* Wrong Answers Review */}
            {wrongAnswers.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <XCircle className="h-6 w-6 text-red-500" />
                  Review Wrong Answers
                </h2>
                <div className="space-y-6">
                  {wrongAnswers.map((question, index) => {
                    const questionIndex = quizQuestions.findIndex(q => q.id === question.id)
                    const userAnswer = userAnswers[questionIndex]
                    return (
                      <div key={question.id} className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                              <Image
                                src={question.sign.imageUrl}
                                alt={question.sign.englishName}
                                width={80}
                                height={80}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {question.sign.category.charAt(0).toUpperCase() + question.sign.category.slice(1).toLowerCase()}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {question.sign.difficultyLevel.toLowerCase()}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                              Question {questionIndex + 1}
                            </h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Your answer:</span>
                                <span className="text-sm font-medium text-red-600 dark:text-red-400">{userAnswer}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Correct answer:</span>
                                <span className="text-sm font-medium text-green-600 dark:text-green-400">{question.correctAnswer}</span>
                              </div>
                              <div className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                <strong>Explanation:</strong> {formatTextWithLineBreaks(question.explanation).map((line, index) => (
                                  <div key={index}>
                                    {line}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={resetQuiz}
                variant="outline"
                size="lg"
                className="px-8 py-4"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Try Again
              </Button>
              <Button
                onClick={() => window.location.href = '/signs'}
                size="lg"
                className="px-8 py-4"
              >
                <Target className="h-5 w-5 mr-2" />
                Study More Signs
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading quiz questions...</p>
        </div>
      </div>
    )
  }

  const currentQ = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Settings Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Category:</span>
                <Badge variant="outline">
                  {category || 'All Categories'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                <Badge variant="outline">
                  {difficulty.toLowerCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Questions:</span>
                <Badge variant="outline">
                  {questionCount}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Available:</span>
                <Badge variant="outline">
                  {allSigns.length} signs
                </Badge>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            
            {/* Page Numbers */}
            <div className="flex justify-center mt-4">
              <div className="flex gap-2">
                {quizQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentQuestion(index)
                      setSelectedAnswer(userAnswers[index] || null)
                      setShowResult(false)
                      updateURL(index)
                    }}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                      currentQuestion === index
                        ? 'bg-primary-600 text-white'
                        : userAnswers[index]
                        ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Question Content - Left Side */}
              <div className="flex-1 p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    What does this traffic sign mean?
                  </h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-sm">
                      {currentQ.sign.category.charAt(0).toUpperCase() + currentQ.sign.category.slice(1).toLowerCase()}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {currentQ.sign.difficultyLevel.toLowerCase()}
                    </Badge>
                  </div>
                </div>

                {/* Answer Options */}
                <div className="space-y-3 mb-6">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedAnswer === option
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          selectedAnswer === option
                            ? 'border-primary-500 bg-primary-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {selectedAnswer === option && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <Button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    variant="outline"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    {userAnswers[currentQuestion] && (
                      <Badge variant="secondary" className="text-sm">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Answered
                      </Badge>
                    )}
                  </div>

                  <Button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className="min-w-[120px]"
                  >
                    {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Question Image - Right Side */}
              <div className="w-full lg:w-80 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-6 lg:p-8">
                <div className="relative w-full h-64 lg:h-80">
                  <Image
                    src={currentQ.sign.imageUrl}
                    alt={currentQ.sign.englishName}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
