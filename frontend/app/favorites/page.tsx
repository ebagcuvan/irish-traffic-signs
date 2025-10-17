'use client'

import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { api } from '@/lib/api'
import { TrafficSign } from '@/types'
import { Button } from '@/components/ui/button'
import { SignCard } from '@/components/signs/sign-card'
import { Heart, Grid, List, Search, Filter, Star, Trash2, Plus } from 'lucide-react'

export default function FavoritesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)

  // Local storage'dan favori işaretleri al
  const [favorites, setFavorites] = useState<TrafficSign[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteSigns')
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites)
        setFavorites(parsedFavorites)
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error)
        setFavorites([])
      }
    }
    setIsLoading(false)
  }, [])

  // Filtrelenmiş favoriler
  const filteredFavorites = favorites.filter(sign => {
    const matchesSearch = !search || 
      sign.englishName.toLowerCase().includes(search.toLowerCase()) ||
      sign.irishName.toLowerCase().includes(search.toLowerCase()) ||
      sign.description.toLowerCase().includes(search.toLowerCase())
    
    const matchesCategory = !category || sign.category === category
    const matchesDifficulty = !difficulty || sign.difficultyLevel === difficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  // Pagination
  const itemsPerPage = 20
  const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const paginatedFavorites = filteredFavorites.slice(startIndex, startIndex + itemsPerPage)

  // Debug bilgileri
  console.log('Favorites Page Debug:', {
    isLoading,
    favorites: favorites.length,
    filteredFavorites: filteredFavorites.length,
    paginatedFavorites: paginatedFavorites.length,
    totalPages
  })

  // Favoriler sayfası artık üyeliksiz çalışıyor
  // localStorage'dan favori işaretleri alınıyor

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Favorites
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Your collection of favorite Irish traffic signs for quick reference and study.
          </p>
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
                  placeholder="Search your favorites..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">All Categories</option>
                <option value="WARNING">Warning</option>
                <option value="REGULATORY">Regulatory</option>
                <option value="MANDATORY">Mandatory</option>
                <option value="INFORMATIONAL">Informational</option>
                <option value="DIRECTIONAL">Directional</option>
              </select>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">All Levels</option>
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>

              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-3"
              >
                {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
              </Button>
            </div>
          </div>
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
        ) : filteredFavorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start adding traffic signs to your favorites by clicking the heart icon on any sign.
            </p>
            <Button asChild>
              <a href="/signs">
                <Plus className="h-4 w-4 mr-2" />
                Explore Signs
              </a>
            </Button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Your Collection
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {filteredFavorites.length} favorite sign{filteredFavorites.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Saved</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Favorites Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {paginatedFavorites.map((favorite: TrafficSign) => (
                <div key={favorite.id} className="relative">
                  <SignCard 
                    sign={favorite} 
                    viewMode={viewMode}
                    showFavoriteButton={true}
                    isFavorited={true}
                  />
                </div>
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
                  
                  <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                    Page {page} of {totalPages}
                  </span>
                  
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
