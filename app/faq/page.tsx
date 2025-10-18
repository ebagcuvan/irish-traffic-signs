'use client'

import { useState, useEffect } from 'react'
import { Search, ChevronDown, ChevronUp, HelpCircle, BookOpen, Shield, Car, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { faqData } from '../../lib/faq-data'

interface FAQItem {
  id: string
  question: string
  answer: string
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = !searchTerm || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our Irish traffic signs learning platform. 
            Can't find what you're looking for? Check out our traffic signs library or take a quiz!
          </p>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Search Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Type keywords to find specific questions and answers
            </p>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for questions about traffic signs, quizzes, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-lg"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 border border-primary-200 dark:border-primary-800">
            <p className="text-primary-800 dark:text-primary-200 font-medium">
              📋 Showing {filteredFAQs.length} of {faqData.length} questions
              {searchTerm && (
                <span className="ml-2 text-sm">
                  for "{searchTerm}"
                </span>
              )}
            </p>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <div className="col-span-full text-center py-16">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  No questions found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  We couldn't find any questions matching your search. Try different keywords or browse all questions.
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => {
                      setSearchTerm('')
                    }}
                    className="w-full"
                  >
                    Show All Questions
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="outline" asChild className="flex-1">
                      <a href="/signs">Browse Signs</a>
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <a href="/quiz">Take Quiz</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isExpanded = expandedItems.has(faq.id)
              
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {faq.question}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span>Click to {isExpanded ? 'hide' : 'show'} answer</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isExpanded 
                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                        }`}>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Help Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
                <Car className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Still Need Help?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Explore our comprehensive traffic signs library 
                or test your knowledge with our interactive quiz. We're here to help you master Irish traffic signs!
              </p>
              <div className="flex flex-row gap-4 justify-center">
                <Button asChild className="px-8 py-3">
                  <a href="/signs">
                    📚 Browse All Signs
                  </a>
                </Button>
                <Button variant="outline" asChild className="px-8 py-3">
                  <a href="/quiz">
                    🧠 Take Practice Quiz
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
