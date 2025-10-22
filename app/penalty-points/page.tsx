'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, AlertTriangle, Euro, Clock, Shield, Car, Phone, User, FileText, Wrench, MapPin, Grid3X3, Table } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { penaltyPointsData, penaltyPointCategories, severityLevels, type PenaltyPointOffence } from '../../lib/penalty-points-data'

const categoryIcons = {
  'Speeding': Clock,
  'Mobile Phone': Phone,
  'Seatbelt': Shield,
  'Drink Driving': AlertTriangle,
  'Dangerous Driving': AlertTriangle,
  'Parking': MapPin,
  'Documentation': FileText,
  'Vehicle Condition': Wrench,
  'Other': Car
}

const severityColors = {
  'Low': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-800',
  'High': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-800',
  'Very High': 'bg-red-600 text-white dark:bg-red-700 dark:text-white hover:bg-red-700 dark:hover:bg-red-600 whitespace-nowrap'
}

export default function PenaltyPointsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSeverity, setSelectedSeverity] = useState('All')
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')

  const filteredOffences = penaltyPointsData.filter(offence => {
    const matchesSearch = !searchTerm || 
      offence.offence.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offence.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All' || offence.category === selectedCategory
    const matchesSeverity = selectedSeverity === 'All' || offence.severity === selectedSeverity
    
    return matchesSearch && matchesCategory && matchesSeverity
  })

  const totalOffences = penaltyPointsData.length
  const totalPoints = penaltyPointsData.reduce((sum, offence) => sum + offence.penaltyPoints, 0)
  const courtOnlyOffences = penaltyPointsData.filter(offence => offence.fineEarly === 'Court').length
  const fixedPenaltyOffences = penaltyPointsData.filter(offence => offence.fineEarly !== 'Court')
  const averageFine = fixedPenaltyOffences.length > 0 ? Math.round(fixedPenaltyOffences.reduce((sum, offence) => {
    const fineAmount = parseInt(offence.fineEarly.replace('€', ''))
    return sum + fineAmount
  }, 0) / fixedPenaltyOffences.length) : 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Penalty Points & Traffic Offences
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Complete guide to Irish traffic penalty points and fines. Learn about traffic offences, 
            penalty point system, and fines for various driving violations in Ireland.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Offences</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{totalOffences}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Points</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{totalPoints}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Euro className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Average Fine</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">€{averageFine}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Court-Only Offences</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{courtOnlyOffences}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Search & Filter Offences
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find specific traffic offences by searching or filtering by category and severity
            </p>
          </div>
          
          {/* Search */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for offences, descriptions, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-lg"
            />
          </div>

          {/* Filters and View Toggle */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {penaltyPointCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Severity
              </label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {severityLevels.map(severity => (
                  <option key={severity} value={severity}>{severity}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                View Mode
              </label>
              <div className="flex rounded-xl border border-gray-300 dark:border-gray-600 overflow-hidden">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`flex-1 px-4 py-3 flex items-center justify-center transition-colors ${
                    viewMode === 'cards'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex-1 px-4 py-3 flex items-center justify-center transition-colors ${
                    viewMode === 'table'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <Table className="h-4 w-4 mr-2" />
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 border border-primary-200 dark:border-primary-800">
            <p className="text-primary-800 dark:text-primary-200 font-medium">
              📋 Showing {filteredOffences.length} of {totalOffences} offences
              {(searchTerm || selectedCategory !== 'All' || selectedSeverity !== 'All') && (
                <span className="ml-2 text-sm">
                  (filtered results)
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Offences List */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </>
          ) : filteredOffences.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  No offences found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  We couldn't find any offences matching your search criteria. Try adjusting your filters.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('All')
                    setSelectedSeverity('All')
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          ) : (
            filteredOffences.map((offence) => {
              const CategoryIcon = categoryIcons[offence.category] || Car
              
              return (
                <div
                  key={offence.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg mr-3">
                          <CategoryIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {offence.category}
                          </Badge>
                          <Badge className={`ml-2 transition-colors duration-200 ${severityColors[offence.severity]}`}>
                            {offence.severity}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {offence.penaltyPoints}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          points
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {offence.offence}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {offence.description}
                    </p>
                    
                    <div className="space-y-3">
                      {/* Fine Information */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        {offence.fineEarly === 'Court' ? (
                          <div className="text-center">
                            <div className="flex items-center justify-center text-red-600 dark:text-red-400 mb-2">
                              <AlertTriangle className="h-5 w-5 mr-2" />
                              <span className="font-semibold text-lg">Court Appearance Required</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              No fixed penalty - must appear in court
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Early Payment (28 days)</span>
                              <div className="flex items-center text-green-600 dark:text-green-400">
                                <Euro className="h-4 w-4 mr-1" />
                                <span className="font-semibold">{offence.fineEarly}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Late Payment</span>
                              <div className="flex items-center text-red-600 dark:text-red-400">
                                <Euro className="h-4 w-4 mr-1" />
                                <span className="font-semibold">{offence.fineLate}</span>
                              </div>
                            </div>
                            {offence.fineThird && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">3rd Payment Option</span>
                                <div className="flex items-center text-orange-600 dark:text-orange-400">
                                  <Euro className="h-4 w-4 mr-1" />
                                  <span className="font-semibold">{offence.fineThird}</span>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Penalty Points Information */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <span className="text-gray-600 dark:text-gray-400 mr-2">Fixed Penalty:</span>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {offence.penaltyPoints} points
                          </Badge>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 dark:text-gray-400 mr-2">Court:</span>
                          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            {offence.penaltyPointsCourt} points
                          </Badge>
                        </div>
                      </div>
                      
                      {offence.additionalInfo && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-2">
                          <AlertTriangle className="h-4 w-4 inline mr-1" />
                          {offence.additionalInfo}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Offence
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Early Fine
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Late Fine
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {filteredOffences.map((offence) => {
                    const CategoryIcon = categoryIcons[offence.category] || Car
                    
                    return (
                      <tr key={offence.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg mr-3">
                              <CategoryIcon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {offence.offence}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {offence.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <Badge variant="outline" className="text-xs px-2 py-1 text-center">
                              {offence.category}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <Badge className={`transition-colors duration-200 text-xs px-2 py-1 text-center ${severityColors[offence.severity]}`}>
                              {offence.severity}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-1">
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1">
                              {offence.penaltyPoints}
                            </Badge>
                            <span className="text-gray-400 text-xs">/</span>
                            <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs px-2 py-1">
                              {offence.penaltyPointsCourt}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            {offence.fineEarly === 'Court' ? (
                              <div className="flex items-center text-red-600 dark:text-red-400">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                <span className="font-semibold">Court</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-green-600 dark:text-green-400">
                                <Euro className="h-4 w-4 mr-1" />
                                <span className="font-semibold">{offence.fineEarly}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            {offence.fineLate === 'Court' ? (
                              <div className="flex items-center text-red-600 dark:text-red-400">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                <span className="font-semibold">Court</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-red-600 dark:text-red-400">
                                <Euro className="h-4 w-4 mr-1" />
                                <span className="font-semibold">{offence.fineLate}</span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Important Information */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-6">
                <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Important Information
              </h2>
              <div className="text-left max-w-4xl mx-auto space-y-4 text-gray-600 dark:text-gray-300">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                    ⚠️ <strong>Important Disclaimer:</strong> The information provided here is for educational purposes only. 
                    Penalty points and fines are subject to change. Always check official sources such as the RSA (Road Safety Authority) 
                    and An Garda Síochána for the most current and accurate information.
                  </p>
                </div>
                
                <p>
                  <strong>Penalty Point System:</strong> Points are added to your driving licence when you commit certain traffic offences. 
                  If you accumulate 12 penalty points within any 3-year period, you will be disqualified from driving.
                </p>
                <p>
                  <strong>Fines:</strong> All fines listed are current as of 2024. Fines may vary and are subject to change. 
                  Some offences may also result in court appearances and additional penalties.
                </p>
                <p>
                  <strong>Disqualification:</strong> Some serious offences may result in immediate disqualification from driving, 
                  regardless of your current penalty point total.
                </p>
                <p>
                  <strong>Appeals:</strong> You have the right to appeal penalty points and fines. Contact the relevant authority 
                  for information about the appeals process.
                </p>
                <p>
                  <strong>Official Sources:</strong> For the most up-to-date information, please visit:
                  <br />• <a href="https://www.rsa.ie" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">RSA (Road Safety Authority)</a>
                  <br />• <a href="https://www.garda.ie" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">An Garda Síochána</a>
                </p>
              </div>
              <div className="mt-8 flex flex-row gap-4 justify-center">
                <Button asChild className="px-8 py-3">
                  <a href="/signs">
                    📚 Learn Traffic Signs
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
