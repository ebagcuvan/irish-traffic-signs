import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken, optionalAuth, requireAdmin } from '../middleware/auth'
import { validateRequest, signSchemas } from '../middleware/validation'

const router = express.Router()
const prisma = new PrismaClient()

// Get all signs with filtering and pagination
router.get('/', optionalAuth, async (req: any, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      difficulty, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query

    const whereClause: any = {}
    
    if (category) {
      whereClause.category = category
    }
    
    if (difficulty) {
      whereClause.difficultyLevel = difficulty
    }
    
    if (search) {
      whereClause.OR = [
        { irishName: { contains: search, mode: 'insensitive' } },
        { englishName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const signs = await prisma.trafficSign.findMany({
      where: whereClause,
      include: {
        ratings: {
          select: {
            rating: true,
          },
        },
        ...(req.user && {
          favorites: {
            where: { userId: req.user.id },
            select: { id: true },
          },
        }),
      },
      orderBy: { [sortBy]: sortOrder },
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
    })

    // Calculate average ratings
    const signsWithRatings = signs.map(sign => {
      const ratings = sign.ratings.map((r: any) => r.rating)
      const averageRating = ratings.length > 0 
        ? Math.round(ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length * 10) / 10
        : null

      return {
        ...sign,
        rating: averageRating,
        isFavorite: req.user ? sign.favorites.length > 0 : false,
        favorites: undefined,
        ratings: undefined,
      }
    })

    const total = await prisma.trafficSign.count({ where: whereClause })

    res.json({
      success: true,
      data: signsWithRatings,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    })
  } catch (error) {
    console.error('Get signs error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Get single sign
router.get('/:id', optionalAuth, async (req: any, res) => {
  try {
    const { id } = req.params

    const sign = await prisma.trafficSign.findUnique({
      where: { id },
      include: {
        ratings: {
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
        },
        ...(req.user && {
          favorites: {
            where: { userId: req.user.id },
            select: { id: true },
          },
        }),
      },
    })

    if (!sign) {
      return res.status(404).json({
        success: false,
        message: 'Sign not found',
      })
    }

    // Calculate average rating
    const ratings = sign.ratings.map((r: any) => r.rating)
    const averageRating = ratings.length > 0 
      ? Math.round(ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length * 10) / 10
      : null

    const signWithRating = {
      ...sign,
      rating: averageRating,
      isFavorite: req.user ? sign.favorites.length > 0 : false,
      favorites: undefined,
    }

    res.json({
      success: true,
      data: signWithRating,
    })
  } catch (error) {
    console.error('Get sign error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Get related signs
router.get('/:id/related', async (req, res) => {
  try {
    const { id } = req.params
    const { limit = 5 } = req.query

    const sign = await prisma.trafficSign.findUnique({
      where: { id },
      select: { relatedSignIds: true, category: true },
    })

    if (!sign) {
      return res.status(404).json({
        success: false,
        message: 'Sign not found',
      })
    }

    let relatedSigns: any[] = []

    if (sign.relatedSignIds.length > 0) {
      // Get specifically related signs
      relatedSigns = await prisma.trafficSign.findMany({
        where: {
          id: { in: sign.relatedSignIds },
        },
        select: {
          id: true,
          irishName: true,
          englishName: true,
          imageUrl: true,
          category: true,
          difficultyLevel: true,
        },
        take: parseInt(limit as string),
      })
    }

    // If not enough related signs, get signs from same category
    if (relatedSigns.length < parseInt(limit as string)) {
      const additionalSigns = await prisma.trafficSign.findMany({
        where: {
          category: sign.category,
          id: { not: id },
          ...(relatedSigns.length > 0 && {
            id: { notIn: relatedSigns.map(s => s.id) },
          }),
        },
        select: {
          id: true,
          irishName: true,
          englishName: true,
          imageUrl: true,
          category: true,
          difficultyLevel: true,
        },
        take: parseInt(limit as string) - relatedSigns.length,
      })

      relatedSigns = [...relatedSigns, ...additionalSigns]
    }

    res.json({
      success: true,
      data: relatedSigns,
    })
  } catch (error) {
    console.error('Get related signs error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Create sign (admin only)
router.post('/', authenticateToken, requireAdmin, validateRequest(signSchemas.create), async (req: any, res) => {
  try {
    const sign = await prisma.trafficSign.create({
      data: req.body,
    })

    res.status(201).json({
      success: true,
      message: 'Sign created successfully',
      data: sign,
    })
  } catch (error) {
    console.error('Create sign error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Update sign (admin only)
router.put('/:id', authenticateToken, requireAdmin, validateRequest(signSchemas.update), async (req, res) => {
  try {
    const { id } = req.params

    const sign = await prisma.trafficSign.update({
      where: { id },
      data: req.body,
    })

    res.json({
      success: true,
      message: 'Sign updated successfully',
      data: sign,
    })
  } catch (error) {
    console.error('Update sign error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Delete sign (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params

    await prisma.trafficSign.delete({
      where: { id },
    })

    res.json({
      success: true,
      message: 'Sign deleted successfully',
    })
  } catch (error) {
    console.error('Delete sign error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

export default router
