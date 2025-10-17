'use client'

import { useState, useEffect } from 'react'

export default function DebugPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testDataLoading = async () => {
      try {
        setLoading(true)
        console.log('Testing data loading...')
        
        // Test traffic signs
        const signsResponse = await fetch('/data/traffic_signs.json')
        console.log('Signs response status:', signsResponse.status)
        
        if (!signsResponse.ok) {
          throw new Error(`Signs HTTP error! status: ${signsResponse.status}`)
        }
        
        const signsData = await signsResponse.json()
        console.log('Signs data loaded:', signsData.signs?.length || 0, 'signs')
        
        // Test FAQ
        const faqResponse = await fetch('/data/faq.json')
        console.log('FAQ response status:', faqResponse.status)
        
        if (!faqResponse.ok) {
          throw new Error(`FAQ HTTP error! status: ${faqResponse.status}`)
        }
        
        const faqData = await faqResponse.json()
        console.log('FAQ data loaded:', faqData?.length || 0, 'items')
        
        setData({
          signs: {
            count: signsData.signs?.length || 0,
            firstSign: signsData.signs?.[0] || null,
            status: 'success'
          },
          faq: {
            count: faqData?.length || 0,
            firstItem: faqData?.[0] || null,
            status: 'success'
          }
        })
        
      } catch (err) {
        console.error('Error loading data:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    testDataLoading()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading debug data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Debug Page - Data Loading Test
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {data && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Traffic Signs Data
              </h2>
              <div className="space-y-2">
                <p><strong>Status:</strong> <span className="text-green-600">{data.signs.status}</span></p>
                <p><strong>Count:</strong> {data.signs.count} signs</p>
                {data.signs.firstSign && (
                  <div>
                    <p><strong>First Sign:</strong></p>
                    <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-auto">
                      {JSON.stringify(data.signs.firstSign, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                FAQ Data
              </h2>
              <div className="space-y-2">
                <p><strong>Status:</strong> <span className="text-green-600">{data.faq.status}</span></p>
                <p><strong>Count:</strong> {data.faq.count} items</p>
                {data.faq.firstItem && (
                  <div>
                    <p><strong>First FAQ Item:</strong></p>
                    <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-auto">
                      {JSON.stringify(data.faq.firstItem, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}