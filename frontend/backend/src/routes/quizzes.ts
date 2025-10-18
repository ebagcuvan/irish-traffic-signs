import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken, optionalAuth } from '../middleware/auth'
import { validateRequest, quizSchemas } from '../middleware/validation'

const router = express.Router()
const prisma = new PrismaClient()

// Get all quizzes
router.get('/', optionalAuth, async (req: any, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      difficulty, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query

    const whereClause: any = {}
    
    if (difficulty) {
      whereClause.difficultyLevel = difficulty
    }
    
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const quizzes = await prisma.quiz.findMany({
      where: whereClause,
      include: {
        creator: {
          select: {
            id: true,
            displayName: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            questions: true,
            attempts: true,
          },
        },
      },
      orderBy: { [sortBy]: sortOrder },
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
    })

    const total = await prisma.quiz.count({ where: whereClause })

    res.json({
      success: true,
      data: quizzes,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    })
  } catch (error) {
    console.error('Get quizzes error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Get single quiz
router.get('/:id', optionalAuth, async (req: any, res) => {
  try {
    const { id } = req.params
    const { includeQuestions = false } = req.query

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            displayName: true,
            avatar: true,
          },
        },
        ...(includeQuestions === 'true' && {
          questions: {
            orderBy: { order: 'asc' },
          },
        }),
        _count: {
          select: {
            questions: true,
            attempts: true,
          },
        },
      },
    })

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      })
    }

    res.json({
      success: true,
      data: quiz,
    })
  } catch (error) {
    console.error('Get quiz error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Start quiz attempt
router.post('/:id/attempt', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      })
    }

    // Create attempt record
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: req.user.id,
        quizId: id,
        totalQuestions: quiz.questions.length,
      },
    })

    res.status(201).json({
      success: true,
      message: 'Quiz attempt started',
      data: {
        attemptId: attempt.id,
        quiz: {
          id: quiz.id,
          title: quiz.title,
          description: quiz.description,
          timeLimit: quiz.timeLimit,
          questions: quiz.questions,
        },
      },
    })
  } catch (error) {
    console.error('Start quiz attempt error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Submit quiz answers
router.post('/:id/submit', authenticateToken, validateRequest(quizSchemas.submitAttempt), async (req: any, res) => {
  try {
    const { id } = req.params
    const { answers } = req.body

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    })

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      })
    }

    // Find the most recent attempt for this user and quiz
    const attempt = await prisma.quizAttempt.findFirst({
      where: {
        userId: req.user.id,
        quizId: id,
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: 'Quiz attempt not found',
      })
    }

    // Calculate score
    let score = 0
    const questionMap = new Map(quiz.questions.map(q => [q.id, q]))
    
    const answerRecords = answers.map((answer: any) => {
      const question = questionMap.get(answer.questionId)
      const isCorrect = question && answer.answer === question.correctAnswer
      
      if (isCorrect) {
        score += question.points
      }

      return {
        attemptId: attempt.id,
        questionId: answer.questionId,
        answer: answer.answer,
        isCorrect,
        timeSpent: answer.timeSpent,
      }
    })

    // Save answers
    await prisma.quizAnswer.createMany({
      data: answerRecords,
    })

    // Update attempt with score
    const totalTimeSpent = answers.reduce((sum: number, answer: any) => sum + answer.timeSpent, 0)
    
    const updatedAttempt = await prisma.quizAttempt.update({
      where: { id: attempt.id },
      data: {
        score,
        timeSpent: totalTimeSpent,
        completedAt: new Date(),
      },
    })

    // Check for achievements
    await checkAchievements(req.user.id)

    res.json({
      success: true,
      message: 'Quiz submitted successfully',
      data: {
        attempt: updatedAttempt,
        score,
        totalQuestions: quiz.questions.length,
        percentage: Math.round((score / quiz.questions.length) * 100),
      },
    })
  } catch (error) {
    console.error('Submit quiz error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Get quiz results
router.get('/:id/results', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params
    const { attemptId } = req.query

    const whereClause: any = {
      userId: req.user.id,
      quizId: id,
    }

    if (attemptId) {
      whereClause.id = attemptId
    }

    const attempts = await prisma.quizAttempt.findMany({
      where: whereClause,
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
      orderBy: { completedAt: 'desc' },
    })

    res.json({
      success: true,
      data: attempts,
    })
  } catch (error) {
    console.error('Get quiz results error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Create quiz (authenticated users)
router.post('/', authenticateToken, validateRequest(quizSchemas.create), async (req: any, res) => {
  try {
    const { title, description, difficultyLevel, timeLimit, questions } = req.body

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        difficultyLevel,
        timeLimit,
        createdBy: req.user.id,
        questions: {
          create: questions.map((q: any, index: number) => ({
            question: q.question,
            type: q.type,
            options: q.options || [],
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            imageUrl: q.imageUrl,
            points: q.points || 1,
            order: q.order || index,
          })),
        },
      },
      include: {
        questions: true,
      },
    })

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      data: quiz,
    })
  } catch (error) {
    console.error('Create quiz error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Helper function to check and award achievements
async function checkAchievements(userId: string) {
  try {
    // Get user's quiz attempts
    const attempts = await prisma.quizAttempt.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
    })

    // Check for first quiz completion
    if (attempts.length === 1) {
      await prisma.achievement.create({
        data: {
          userId,
          badgeName: 'First Quiz',
          description: 'Completed your first quiz!',
        },
      })
    }

    // Check for perfect score
    const perfectScores = attempts.filter(attempt => 
      attempt.score === attempt.totalQuestions
    )
    
    if (perfectScores.length === 1) {
      await prisma.achievement.create({
        data: {
          userId,
          badgeName: 'Perfect Score',
          description: 'Got a perfect score on a quiz!',
        },
      })
    }

    // Check for streak achievements
    const recentAttempts = attempts.slice(0, 5)
    const consecutiveDays = calculateConsecutiveDays(recentAttempts)
    
    if (consecutiveDays >= 7) {
      await prisma.achievement.create({
        data: {
          userId,
          badgeName: 'Week Warrior',
          description: 'Completed quizzes for 7 consecutive days!',
        },
      })
    }
  } catch (error) {
    console.error('Achievement check error:', error)
  }
}

function calculateConsecutiveDays(attempts: any[]): number {
  // Simplified logic - would need more complex date calculation
  return Math.min(attempts.length, 7)
}

export default router
