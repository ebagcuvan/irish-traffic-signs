'use client'

import { useState, useEffect } from 'react'
import { Search, ChevronDown, ChevronUp, HelpCircle, BookOpen, Shield, Car, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  keywords: string[]
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  // FAQ verilerini yükle
  const [faqData, setFaqData] = useState<FAQItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadFAQData = async () => {
      try {
        const response = await fetch('/data/faq.json')
        const data = await response.json()
        setFaqData(data)
      } catch (error) {
        console.error('Error loading FAQ data:', error)
        setFaqData([])
      } finally {
        setIsLoading(false)
      }
    }
    loadFAQData()
  }, [])

  const getCategoryIcon = (category: string) => {
    const categoryInfo = categories.find(cat => cat.value === category)
    return categoryInfo?.icon || BookOpen
  }

  const getCategoryColor = (category: string) => {
    const categoryInfo = categories.find(cat => cat.value === category)
    return categoryInfo?.color || 'bg-gray-100 text-gray-600'
  }

  // Sadece ana kategorileri göster
  const categories = [
    { name: 'All', value: '', icon: BookOpen, color: 'bg-gray-100 text-gray-600' },
    { name: 'Braking', value: 'Braking', icon: Shield, color: 'bg-red-100 text-red-600' },
    { name: 'Safety', value: 'Safety', icon: AlertTriangle, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Traffic Rules', value: 'Lanes', icon: Car, color: 'bg-green-100 text-green-600' },
    { name: 'Signs & Signals', value: 'Signals', icon: AlertTriangle, color: 'bg-blue-100 text-blue-600' }
  ]

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = !searchTerm || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesCategory = true
    if (selectedCategory === 'Lanes') {
      matchesCategory = ['Lanes', 'Parking', 'Junctions', 'Motorways', 'Following', 'Manoeuvres'].includes(faq.category)
    } else if (selectedCategory === 'Signals') {
      matchesCategory = ['Signals', 'Signs', 'Markings', 'Crossings'].includes(faq.category)
    } else if (selectedCategory) {
      matchesCategory = faq.category === selectedCategory
    }
    
    return matchesSearch && matchesCategory
  })

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            FAQ
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Common questions about Irish traffic rules and road safety.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center gap-2 h-10 ${
                      selectedCategory === category.value 
                        ? 'bg-primary-600 text-white' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredFAQs.length} of {faqData.length} questions
          </p>
        </div>

        {/* FAQ Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </>
          ) : filteredFAQs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No questions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search terms or category filter.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('')
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isExpanded = expandedItems.has(faq.id)
              const categoryInfo = categories.find(cat => cat.value === faq.category)
              const Icon = categoryInfo?.icon || BookOpen
              const colorClass = categoryInfo?.color || 'bg-gray-100 text-gray-600'
              
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                            <Icon className="h-3 w-3 mr-1" />
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need more help? Explore our traffic signs library or try our quiz.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="/signs">Browse Signs</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/quiz">Take Quiz</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
