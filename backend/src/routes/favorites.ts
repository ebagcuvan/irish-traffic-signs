import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'
import { validateRequest, favoriteSchemas } from '../middleware/validation'

const router = express.Router()
const prisma = new PrismaClient()

// Get user favorites
router.get('/', authenticateToken, async (req: any, res) => {
  try {
    const { collectionId, page = 1, limit = 20 } = req.query

    const whereClause: any = { userId: req.user.id }
    if (collectionId) {
      whereClause.collectionId = collectionId
    }

    const favorites = await prisma.favorite.findMany({
      where: whereClause,
      include: {
        sign: {
          include: {
            ratings: {
              select: { rating: true },
            },
          },
        },
        collection: {
          select: {
            id: true,
            name: true,
            description: true,
            isPublic: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
    })

    // Calculate average ratings for signs
    const favoritesWithRatings = favorites.map(favorite => {
      const ratings = favorite.sign.ratings.map(r => r.rating)
      const averageRating = ratings.length > 0 
        ? Math.round(ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length * 10) / 10
        : null

      return {
        ...favorite,
        sign: {
          ...favorite.sign,
          rating: averageRating,
          ratings: undefined,
        },
      }
    })

    const total = await prisma.favorite.count({ where: whereClause })

    res.json({
      success: true,
      data: favoritesWithRatings,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    })
  } catch (error) {
    console.error('Get favorites error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Add to favorites
router.post('/', authenticateToken, validateRequest(favoriteSchemas.create), async (req: any, res) => {
  try {
    const { signId, collectionId } = req.body

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

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_signId: {
          userId: req.user.id,
          signId,
        },
      },
    })

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: 'Sign already in favorites',
      })
    }

    // If collectionId provided, verify it belongs to user
    if (collectionId) {
      const collection = await prisma.favoriteCollection.findFirst({
        where: {
          id: collectionId,
          userId: req.user.id,
        },
      })

      if (!collection) {
        return res.status(404).json({
          success: false,
          message: 'Collection not found',
        })
      }
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: req.user.id,
        signId,
        collectionId,
      },
      include: {
        sign: true,
        collection: true,
      },
    })

    res.status(201).json({
      success: true,
      message: 'Added to favorites',
      data: favorite,
    })
  } catch (error) {
    console.error('Add favorite error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Remove from favorites
router.delete('/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params

    const favorite = await prisma.favorite.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    })

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found',
      })
    }

    await prisma.favorite.delete({
      where: { id },
    })

    res.json({
      success: true,
      message: 'Removed from favorites',
    })
  } catch (error) {
    console.error('Remove favorite error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Get user collections
router.get('/collections', authenticateToken, async (req: any, res) => {
  try {
    const { page = 1, limit = 20 } = req.query

    const collections = await prisma.favoriteCollection.findMany({
      where: { userId: req.user.id },
      include: {
        _count: {
          select: { favorites: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
    })

    const total = await prisma.favoriteCollection.count({
      where: { userId: req.user.id },
    })

    res.json({
      success: true,
      data: collections,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    })
  } catch (error) {
    console.error('Get collections error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Create collection
router.post('/collections', authenticateToken, validateRequest(favoriteSchemas.createCollection), async (req: any, res) => {
  try {
    const { name, description, isPublic } = req.body

    const collection = await prisma.favoriteCollection.create({
      data: {
        userId: req.user.id,
        name,
        description,
        isPublic: isPublic || false,
      },
    })

    res.status(201).json({
      success: true,
      message: 'Collection created successfully',
      data: collection,
    })
  } catch (error) {
    console.error('Create collection error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Update collection
router.put('/collections/:id', authenticateToken, validateRequest(favoriteSchemas.updateCollection), async (req: any, res) => {
  try {
    const { id } = req.params

    const collection = await prisma.favoriteCollection.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    })

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
      })
    }

    const updatedCollection = await prisma.favoriteCollection.update({
      where: { id },
      data: req.body,
    })

    res.json({
      success: true,
      message: 'Collection updated successfully',
      data: updatedCollection,
    })
  } catch (error) {
    console.error('Update collection error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Delete collection
router.delete('/collections/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params

    const collection = await prisma.favoriteCollection.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    })

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
      })
    }

    await prisma.favoriteCollection.delete({
      where: { id },
    })

    res.json({
      success: true,
      message: 'Collection deleted successfully',
    })
  } catch (error) {
    console.error('Delete collection error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

export default router
