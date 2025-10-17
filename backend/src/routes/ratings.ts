import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'
import { validateRequest, ratingSchemas } from '../middleware/validation'

const router = express.Router()
const prisma = new PrismaClient()

// Get sign ratings
router.get('/sign/:signId', async (req, res) => {
  try {
    const { signId } = req.params
    const { page = 1, limit = 20 } = req.query

    const ratings = await prisma.rating.findMany({
      where: { signId },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
    })

    const total = await prisma.rating.count({ where: { signId } })

    // Calculate average rating
    const allRatings = await prisma.rating.findMany({
      where: { signId },
      select: { rating: true },
    })

    const averageRating = allRatings.length > 0 
      ? Math.round(allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length * 10) / 10
      : null

    res.json({
      success: true,
      data: {
        ratings,
        averageRating,
        totalRatings: allRatings.length,
      },
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    })
  } catch (error) {
    console.error('Get sign ratings error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Create rating
router.post('/', authenticateToken, validateRequest(ratingSchemas.create), async (req: any, res) => {
  try {
    const { signId, rating, review } = req.body

    // Check if sign exists
    const sign = await prisma.trafficSign.findUnique({
      where: { id: signId },
    })

    if (!sign) {
      return res.status(404).json({
        success: false,
        message: 'Sign not found',
      })
    }

    // Check if user already rated this sign
    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_signId: {
          userId: req.user.id,
          signId,
        },
      },
    })

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: 'You have already rated this sign',
      })
    }

    const newRating = await prisma.rating.create({
      data: {
        userId: req.user.id,
        signId,
        rating,
        review,
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            avatar: true,
          },
        },
      },
    })

    res.status(201).json({
      success: true,
      message: 'Rating created successfully',
      data: newRating,
    })
  } catch (error) {
    console.error('Create rating error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Update rating
router.put('/:id', authenticateToken, validateRequest(ratingSchemas.update), async (req: any, res) => {
  try {
    const { id } = req.params
    const { rating, review } = req.body

    const existingRating = await prisma.rating.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    })

    if (!existingRating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found',
      })
    }

    const updatedRating = await prisma.rating.update({
      where: { id },
      data: {
        ...(rating && { rating }),
        ...(review !== undefined && { review }),
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            avatar: true,
          },
        },
      },
    })

    res.json({
      success: true,
      message: 'Rating updated successfully',
      data: updatedRating,
    })
  } catch (error) {
    console.error('Update rating error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Delete rating
router.delete('/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params

    const rating = await prisma.rating.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    })

    if (!rating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found',
      })
    }

    await prisma.rating.delete({
      where: { id },
    })

    res.json({
      success: true,
      message: 'Rating deleted successfully',
    })
  } catch (error) {
    console.error('Delete rating error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Get user's ratings
router.get('/user/me', authenticateToken, async (req: any, res) => {
  try {
    const { page = 1, limit = 20 } = req.query

    const ratings = await prisma.rating.findMany({
      where: { userId: req.user.id },
      include: {
        sign: {
          select: {
            id: true,
            irishName: true,
            englishName: true,
            imageUrl: true,
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
    })

    const total = await prisma.rating.count({
      where: { userId: req.user.id },
    })

    res.json({
      success: true,
      data: ratings,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    })
  } catch (error) {
    console.error('Get user ratings error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

export default router
