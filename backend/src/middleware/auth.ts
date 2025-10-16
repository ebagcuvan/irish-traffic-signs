import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    displayName: string
    isAdmin: boolean
  }
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Access token required',
    })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    // Get user from database to ensure they still exist
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        isAdmin: true,
        isVerified: true,
      },
    })

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
      })
      return
    }

    req.user = user
    next()
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Invalid or expired token',
    })
    return
  }
}

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user?.isAdmin) {
    res.status(403).json({
      success: false,
      message: 'Admin access required',
    })
    return
  }
  next()
}

export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    next()
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        isAdmin: true,
        isVerified: true,
      },
    })

    if (user) {
      req.user = user
    }
  } catch (error) {
    // Ignore auth errors for optional auth
  }

  next()
}
