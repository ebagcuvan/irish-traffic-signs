'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Star, Eye } from 'lucide-react'
import { TrafficSign } from '@/types'
import { Button } from '@/components/ui/button'
import { getCategoryColor, getDifficultyColor } from '@/lib/utils'

interface SignCardProps {
  sign: TrafficSign
  viewMode: 'grid' | 'list'
  showFavoriteButton?: boolean
  isFavorited?: boolean
}

export function SignCard({ sign, viewMode, showFavoriteButton = true, isFavorited: propIsFavorited }: SignCardProps) {

  const [isFavorited, setIsFavorited] = useState(() => {
    if (propIsFavorited !== undefined) return propIsFavorited
    
    // Check localStorage for existing favorites
    try {
      const savedFavorites = localStorage.getItem('favoriteSigns')
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites)
        return favorites.some((fav: TrafficSign) => fav.id === sign.id)
      }
    } catch (error) {
      console.error('Error checking favorites from localStorage:', error)
    }
    
    return sign.isFavorite || false
  })

  // Generate slug for URL
  const generateSlug = (sign: TrafficSign) => {
    const cleanName = sign.englishName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_')
    return `${sign.id}_${cleanName}`
  }

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const savedFavorites = localStorage.getItem('favoriteSigns')
      let favorites = savedFavorites ? JSON.parse(savedFavorites) : []
      
      if (isFavorited) {
        // Remove from favorites
        favorites = favorites.filter((fav: TrafficSign) => fav.id !== sign.id)
        setIsFavorited(false)
      } else {
        // Add to favorites
        favorites.push(sign)
        setIsFavorited(true)
      }
      
      localStorage.setItem('favoriteSigns', JSON.stringify(favorites))
    } catch (error) {
      console.error('Failed to update favorite:', error)
    }
  }

  if (viewMode === 'list') {
    return (
      <Link href={`/signs/${generateSlug(sign)}`} className="group">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow group-hover:scale-105">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={sign.imageUrl}
                  alt={sign.englishName}
                  width={96}
                  height={96}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {sign.englishName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {sign.irishName}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {sign.description}
                </p>
              </div>
              
              <div className="flex items-center ml-4">
                {showFavoriteButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFavorite}
                    className={`p-2 ${isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(sign.category)}`}>
                {sign.category.charAt(0).toUpperCase() + sign.category.slice(1).toLowerCase()}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(sign.difficultyLevel)}`}>
                {sign.difficultyLevel.toLowerCase()}
              </span>
            </div>
          </div>
        </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/signs/${generateSlug(sign)}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 group-hover:scale-105">
        <div className="relative">
            <div className="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
              <Image
                src={sign.imageUrl}
                alt={sign.englishName}
                width={300}
                height={300}
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-200"
              />
            </div>
          
          <div className="absolute top-2 right-2">
            {showFavoriteButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavorite}
                className={`p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 ${
                  isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {sign.englishName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {sign.irishName}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-4">
            {sign.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(sign.category)}`}>
                {sign.category.charAt(0).toUpperCase() + sign.category.slice(1).toLowerCase()}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(sign.difficultyLevel)}`}>
                {sign.difficultyLevel.toLowerCase()}
              </span>
            </div>
            
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
