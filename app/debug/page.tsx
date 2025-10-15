'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'

export default function DebugPage() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const [signsCount, setSignsCount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkBackend()
  }, [])

  const checkBackend = async () => {
    try {
      // Health check
      const healthResponse = await fetch('http://localhost:3003/health')
      if (healthResponse.ok) {
        setBackendStatus('online')
        
        // Try to get signs count
        try {
          const signsResponse = await api.get('/signs?limit=1')
          setSignsCount(signsResponse.data.pagination?.total || 0)
        } catch (signsError) {
          console.error('Signs API Error:', signsError)
          setError('Backend is running but signs API failed')
        }
      } else {
        setBackendStatus('offline')
        setError('Backend health check failed')
      }
    } catch (err) {
      setBackendStatus('offline')
      setError('Cannot connect to backend')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            System Debug
          </h1>

          <div className="space-y-6">
            {/* Backend Status */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Backend Status
              </h2>
              
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  backendStatus === 'online' ? 'bg-green-500' : 
                  backendStatus === 'offline' ? 'bg-red-500' : 
                  'bg-yellow-500'
                }`}></div>
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {backendStatus === 'online' ? 'Online' : 
                   backendStatus === 'offline' ? 'Offline' : 
                   'Checking...'}
                </span>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}

              {backendStatus === 'offline' && (
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                    Backend is not running
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                    To start the backend, run:
                  </p>
                  <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
                    npm run dev:backend
                  </code>
                </div>
              )}
            </div>

            {/* Signs Count */}
            {backendStatus === 'online' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Database Status
                </h2>
                
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    signsCount !== null ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {signsCount !== null ? `${signsCount} signs in database` : 'Checking...'}
                  </span>
                </div>

                {signsCount === 0 && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                      No signs found
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                      To load signs from your JSON file, run:
                    </p>
                    <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
                      npm run load:signs
                    </code>
                  </div>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                <button
                  onClick={checkBackend}
                  className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Refresh Status
                </button>
                
                <a
                  href="/signs"
                  className="block w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center"
                >
                  Go to Signs Page
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
