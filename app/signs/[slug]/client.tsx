'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { TrafficSign } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Heart, Share2, ExternalLink, MapPin, Clock, AlertTriangle, Info, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatTextWithLineBreaks } from '@/lib/text-utils'
import { trafficSignsData } from '../../../lib/data'

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
  difficultyLevel?: string
}

export default function SignDetailClient() {
  const params = useParams()
  const [sign, setSign] = useState<TrafficSign | null>(null)
  const [relatedSigns, setRelatedSigns] = useState<TrafficSign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)


  // Load sign data
  useEffect(() => {
    const loadSignData = () => {
      try {
        setIsLoading(true)
        const data = trafficSignsData
        
        // Find sign by slug (convert from URL format)
        const slug = params.slug as string
        // Extract the ID from slug - handle both 2-part and 3-part IDs
        const slugParts = slug.split('_')
        let signId: string
        
        if (slugParts.length >= 3 && slugParts[1] === 'custom') {
          // Handle 3-part IDs like "warning_custom_083_side_road_left" -> "warning_custom_083"
          signId = `${slugParts[0]}_${slugParts[1]}_${slugParts[2]}`
        } else if (slugParts.length >= 2) {
          // Handle 2-part IDs like "warning_001_accompanied_horses" -> "warning_001"
          signId = `${slugParts[0]}_${slugParts[1]}`
        } else {
          // Fallback to first part only
          signId = slugParts[0]
        }
        
        const signData = data.signs.find((s: TrafficSignData) => s.id === signId)
        
        if (signData) {
          const transformedSign: TrafficSign = {
            id: signData.id.toString(),
            irishName: signData.name,
            englishName: signData.name,
            description: signData.description || signData.meaning || '',
            category: mapCategory(signData.category) as any,
            difficultyLevel: getDifficultyLevel(signData),
            imageUrl: signData.imagePath || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
            context: signData.meaning || signData.description || '',
            relatedSignIds: [],
            createdAt: new Date().toISOString(),
            isFavorite: false,
            rating: 0
          }
          
          setSign(transformedSign)
          
          // Load related signs (same category)
          const related = data.signs
            .filter((s: TrafficSignData) => s.id !== signId && s.category === signData.category)
            .slice(0, 6)
            .map((s: TrafficSignData) => ({
              id: s.id.toString(),
              irishName: s.name,
              englishName: s.name,
              description: s.description || s.meaning || '',
              category: mapCategory(s.category) as any,
              difficultyLevel: getDifficultyLevel(s),
              imageUrl: s.imagePath || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
              context: s.meaning || s.description || '',
              relatedSignIds: [],
              createdAt: new Date().toISOString(),
              isFavorite: false,
              rating: 0
            }))
          
          setRelatedSigns(related)
          
          // Check if favorited
          const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
          setIsFavorited(favorites.includes(transformedSign.id))
        }
      } catch (error) {
        console.error('Error loading sign data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.slug) {
      loadSignData()
    }
  }, [params.slug])

  // Map category from JSON to database enum
  const mapCategory = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
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

  // Get difficulty level from sign data (now included in JSON)
  const getDifficultyLevel = (sign: TrafficSignData): 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' => {
    const level = sign.difficultyLevel
    if (level === 'BEGINNER' || level === 'INTERMEDIATE' || level === 'ADVANCED') {
      return level
    }
    return 'INTERMEDIATE'
  }

  // Handle favorite toggle
  const handleFavorite = () => {
    if (!sign) return
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const isCurrentlyFavorited = favorites.includes(sign.id)
    
    if (isCurrentlyFavorited) {
      const newFavorites = favorites.filter((id: string) => id !== sign.id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      setIsFavorited(false)
    } else {
      const newFavorites = [...favorites, sign.id]
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      setIsFavorited(true)
    }
  }

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${sign?.englishName} - Irish Traffic Sign`,
          text: `Learn about the ${sign?.englishName} traffic sign`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  // Generate slug for URL
  const generateSlug = (sign: TrafficSign) => {
    const cleanName = sign.englishName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_')
    return `${sign.id}_${cleanName}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!sign) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Sign Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The traffic sign you're looking for doesn't exist.
            </p>
            <Link href="/signs">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Signs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/signs">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Signs
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative w-full h-96 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <Image
                src={sign.imageUrl}
                alt={sign.englishName}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain p-4"
                priority
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                onClick={handleFavorite}
                variant={isFavorited ? "default" : "outline"}
                className="flex-1"
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? 'Favorited' : 'Add to Favorites'}
              </Button>
              <Button onClick={handleShare} variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Title and Badges */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {sign.englishName}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-sm">
                  {sign.category.charAt(0).toUpperCase() + sign.category.slice(1).toLowerCase()}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {sign.difficultyLevel.charAt(0).toUpperCase() + sign.difficultyLevel.slice(1).toLowerCase()}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {sign.description || 'No description available for this traffic sign.'}
              </p>
            </div>

            {/* Meaning */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Meaning
              </h2>
              <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {sign.context ? (
                  formatTextWithLineBreaks(sign.context).map((line, index) => (
                    <div key={index}>
                      {line}
                    </div>
                  ))
                ) : (
                  'No meaning information available for this traffic sign.'
                )}
              </div>
            </div>

            {/* Category Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Category Information
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    This is a {sign.category.toLowerCase()} sign, typically used for {
                      sign.category === 'WARNING' ? 'alerting drivers to potential hazards' :
                      sign.category === 'REGULATORY' ? 'enforcing traffic rules and regulations' :
                      sign.category === 'MANDATORY' ? 'indicating required actions' :
                      sign.category === 'INFORMATIONAL' ? 'providing helpful information' :
                      sign.category === 'DIRECTIONAL' ? 'showing directions and locations' :
                      sign.category === 'ROADWORK' ? 'indicating road construction areas' :
                      sign.category === 'OTHERS' ? 'various other purposes' :
                      'supplementary information'
                    }.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Signs */}
        {relatedSigns.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Signs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedSigns.map((relatedSign) => (
                <Link
                  key={relatedSign.id}
                  href={`/signs/${generateSlug(relatedSign)}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700">
                      <Image
                        src={relatedSign.imageUrl}
                        alt={relatedSign.englishName}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                        {relatedSign.englishName}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {relatedSign.category.charAt(0).toUpperCase() + relatedSign.category.slice(1).toLowerCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {relatedSign.difficultyLevel.charAt(0).toUpperCase() + relatedSign.difficultyLevel.slice(1).toLowerCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
