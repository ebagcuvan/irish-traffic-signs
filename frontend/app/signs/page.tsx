'use client'

import { useState, useEffect } from 'react'
import { TrafficSign } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Grid, List, Heart, Star, Eye, Clock, MapPin, ChevronDown } from 'lucide-react'
import { SignCard } from '@/components/signs/sign-card'
import Image from 'next/image'
// JSON data will be loaded at runtime

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

export default function SignsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [signs, setSigns] = useState<TrafficSign[]>([])
  const [filteredSigns, setFilteredSigns] = useState<TrafficSign[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Load signs from JSON file
  useEffect(() => {
    const loadSigns = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/data/traffic_signs.json')
        const data = await response.json()
        
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
        
        setSigns(transformedSigns)
        setFilteredSigns(transformedSigns)
      } catch (error) {
        console.error('Error loading signs:', error)
        setSigns([])
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

  // Filter signs based on search and filters
  useEffect(() => {
    let filtered = [...signs]

    // Search filter
    if (search) {
      filtered = filtered.filter(sign =>
        sign.englishName.toLowerCase().includes(search.toLowerCase()) ||
        sign.irishName.toLowerCase().includes(search.toLowerCase()) ||
        sign.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Category filter
    if (category) {
      filtered = filtered.filter(sign => sign.category === category)
    }

    // Difficulty filter
    if (difficulty) {
      filtered = filtered.filter(sign => sign.difficultyLevel === difficulty)
    }

    setFilteredSigns(filtered)
    setPage(1) // Reset to first page when filters change
  }, [search, category, difficulty, signs])

  // Pagination
  const itemsPerPage = 20
  const totalPages = Math.ceil(filteredSigns.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const paginatedSigns = filteredSigns.slice(startIndex, startIndex + itemsPerPage)

  // Get unique categories for filter
  const categories = Array.from(new Set(signs.map(sign => sign.category))).sort()
  const difficulties = Array.from(new Set(signs.map(sign => sign.difficultyLevel))).sort()

  // Debug bilgileri
  console.log('Signs Page Debug:', {
    isLoading,
    signs: signs.length,
    filteredSigns: filteredSigns.length,
    paginatedSigns: paginatedSigns.length,
    totalPages,
    currentPage: page
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Irish Traffic Signs
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Explore our comprehensive library of Irish traffic signs with detailed explanations and interactive features.
          </p>
          
          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{signs.length} Signs</span>
            </div>
            <div className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>{filteredSigns.length} Filtered</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Updated Daily</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search signs by name or description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="px-4"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>

            {/* View Mode Toggle */}
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-3"
            >
              {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.toLowerCase().replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">All Levels</option>
                    {difficulties.map((diff) => (
                      <option key={diff} value={diff}>
                        {diff.toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              {(category || difficulty) && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCategory('')
                      setDifficulty('')
                    }}
                    className="text-sm"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredSigns.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No signs found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearch('')
                setCategory('')
                setDifficulty('')
              }}
              variant="outline"
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {filteredSigns.length} Sign{filteredSigns.length !== 1 ? 's' : ''} Found
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredSigns.length)} of {filteredSigns.length}
                </p>
              </div>
              
              {/* Active Filters */}
              <div className="flex items-center gap-2">
                {category && (
                  <Badge variant="secondary" className="text-sm">
                    {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase().replace('_', ' ')}
                  </Badge>
                )}
                {difficulty && (
                  <Badge variant="secondary" className="text-sm">
                    {difficulty.toLowerCase()}
                  </Badge>
                )}
                {search && (
                  <Badge variant="secondary" className="text-sm">
                    "{search}"
                  </Badge>
                )}
              </div>
            </div>

            {/* Signs Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {paginatedSigns.map((sign: TrafficSign) => (
                <SignCard 
                  key={sign.id} 
                  sign={sign} 
                  viewMode={viewMode}
                  showFavoriteButton={true}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1
                      return (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? "default" : "outline"}
                          onClick={() => setPage(pageNum)}
                          className="w-10 h-10 p-0"
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}