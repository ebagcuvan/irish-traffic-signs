import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body)
    
    if (error) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message,
        })),
      })
      return
    }
    
    next()
  }
}

// Common validation schemas
export const authSchemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    displayName: Joi.string().min(2).max(50).required(),
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  
  forgotPassword: Joi.object({
    email: Joi.string().email().required(),
  }),
  
  resetPassword: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
}

export const userSchemas = {
  updateProfile: Joi.object({
    displayName: Joi.string().min(2).max(50),
    bio: Joi.string().max(500),
    avatar: Joi.string().uri(),
  }),
}

export const signSchemas = {
  create: Joi.object({
    irishName: Joi.string().min(1).max(100).required(),
    englishName: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).max(1000).required(),
    category: Joi.string().valid('WARNING', 'REGULATORY', 'MANDATORY', 'INFORMATIONAL', 'DIRECTIONAL').required(),
    difficultyLevel: Joi.string().valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED').required(),
    imageUrl: Joi.string().uri().required(),
    context: Joi.string().max(500),
    relatedSignIds: Joi.array().items(Joi.string().uuid()),
  }),
  
  update: Joi.object({
    irishName: Joi.string().min(1).max(100),
    englishName: Joi.string().min(1).max(100),
    description: Joi.string().min(1).max(1000),
    category: Joi.string().valid('WARNING', 'REGULATORY', 'MANDATORY', 'INFORMATIONAL', 'DIRECTIONAL'),
    difficultyLevel: Joi.string().valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED'),
    imageUrl: Joi.string().uri(),
    context: Joi.string().max(500),
    relatedSignIds: Joi.array().items(Joi.string().uuid()),
  }),
}

export const favoriteSchemas = {
  create: Joi.object({
    signId: Joi.string().uuid().required(),
    collectionId: Joi.string().uuid(),
  }),
  
  createCollection: Joi.object({
    name: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500),
    isPublic: Joi.boolean().default(false),
  }),
  
  updateCollection: Joi.object({
    name: Joi.string().min(1).max(100),
    description: Joi.string().max(500),
    isPublic: Joi.boolean(),
  }),
}

export const quizSchemas = {
  create: Joi.object({
    title: Joi.string().min(1).max(200).required(),
    description: Joi.string().max(1000),
    difficultyLevel: Joi.string().valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED').required(),
    timeLimit: Joi.number().integer().min(30).max(3600), // 30 seconds to 1 hour
    questions: Joi.array().items(Joi.object({
      question: Joi.string().min(1).max(500).required(),
      type: Joi.string().valid('MULTIPLE_CHOICE', 'TRUE_FALSE', 'MATCHING', 'IMAGE_IDENTIFICATION').required(),
      options: Joi.array().items(Joi.string().max(200)),
      correctAnswer: Joi.string().required(),
      explanation: Joi.string().max(1000).required(),
      imageUrl: Joi.string().uri(),
      points: Joi.number().integer().min(1).max(10).default(1),
      order: Joi.number().integer().min(0).default(0),
    })).min(1).max(50),
  }),
  
  submitAttempt: Joi.object({
    answers: Joi.array().items(Joi.object({
      questionId: Joi.string().uuid().required(),
      answer: Joi.string().required(),
      timeSpent: Joi.number().integer().min(0).required(),
    })).required(),
  }),
}

export const ratingSchemas = {
  create: Joi.object({
    signId: Joi.string().uuid().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    review: Joi.string().max(1000),
  }),
  
  update: Joi.object({
    rating: Joi.number().integer().min(1).max(5),
    review: Joi.string().max(1000),
  }),
}
