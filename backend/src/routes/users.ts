import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken, requireAdmin } from '../middleware/auth'
import { validateRequest, userSchemas } from '../middleware/validation'

const router = express.Router()
const prisma = new PrismaClient()

// Get user profile
router.get('/:id', async (req, res): Promise<void> => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        displayName: true,
        avatar: true,
        bio: true,
        createdAt: true,
        _count: {
          select: {
            quizAttempts: true,
            favorites: true,
            achievements: true,
          },
        },
      },
    })

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
      return
    }

    res.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Update user profile
router.put('/me', authenticateToken, validateRequest(userSchemas.updateProfile), async (req: any, res) => {
  try {
    const { displayName, bio, avatar } = req.body

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(displayName && { displayName }),
        ...(bio !== undefined && { bio }),
        ...(avatar && { avatar }),
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        avatar: true,
        bio: true,
        isAdmin: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Get user statistics
router.get('/:id/stats', async (req, res): Promise<void> => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        displayName: true,
      },
    })

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
      return
    }

    // Get quiz statistics
    const quizStats = await prisma.quizAttempt.aggregate({
      where: { userId: id },
      _count: { id: true },
      _avg: { score: true },
      _sum: { timeSpent: true },
    })

    // Get current streak (simplified - would need more complex logic for actual streak calculation)
    const recentAttempts = await prisma.quizAttempt.findMany({
      where: { userId: id },
      orderBy: { completedAt: 'desc' },
      take: 10,
    })

    // Get achievements
    const achievements = await prisma.achievement.findMany({
      where: { userId: id },
      orderBy: { earnedAt: 'desc' },
    })

    // Get favorite signs count
    const favoritesCount = await prisma.favorite.count({
      where: { userId: id },
    })

    const stats = {
      totalQuizzesCompleted: quizStats._count.id || 0,
      averageScore: Math.round(quizStats._avg.score || 0),
      totalTimeSpent: quizStats._sum.timeSpent || 0,
      currentStreak: recentAttempts.length, // Simplified
      longestStreak: recentAttempts.length, // Simplified
      totalSignsLearned: favoritesCount,
      achievements: achievements,
    }

    res.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('Get user stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const { limit = 10, period = 'all' } = req.query

    let whereClause: any = {}
    
    if (period === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      whereClause.completedAt = { gte: weekAgo }
    } else if (period === 'month') {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      whereClause.completedAt = { gte: monthAgo }
    }

    // Get top users by average score
    const topUsers = await prisma.user.findMany({
      select: {
        id: true,
        displayName: true,
        avatar: true,
        quizAttempts: {
          where: whereClause,
          select: {
            score: true,
            totalQuestions: true,
          },
        },
      },
      take: parseInt(limit as string),
    })

    // Calculate scores and rank users
    const leaderboard = topUsers
      .map(user => {
        const attempts = user.quizAttempts
        const totalQuizzes = attempts.length
        const averageScore = totalQuizzes > 0 
          ? Math.round(attempts.reduce((sum, attempt) => sum + (attempt.score / attempt.totalQuestions) * 100, 0) / totalQuizzes)
          : 0

        return {
          user: {
            id: user.id,
            displayName: user.displayName,
            avatar: user.avatar,
          },
          score: averageScore,
          totalQuizzes,
          averageScore,
        }
      })
      .filter(user => user.totalQuizzes > 0)
      .sort((a, b) => b.score - a.score)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }))

    res.json({
      success: true,
      data: leaderboard,
    })
  } catch (error) {
    console.error('Get leaderboard error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Get all users (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query

    const whereClause: any = {}
    if (search) {
      whereClause.OR = [
        { displayName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
      ]
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        displayName: true,
        avatar: true,
        isAdmin: true,
        isVerified: true,
        createdAt: true,
        _count: {
          select: {
            quizAttempts: true,
            favorites: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
    })

    const total = await prisma.user.count({ where: whereClause })

    res.json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

export default router
