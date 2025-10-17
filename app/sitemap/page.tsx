'use client'

import { useState, useEffect } from 'react'
import { trafficSignsData } from '../../lib/data'
import Link from 'next/link'

export default function SitemapPage() {
  const [signs, setSigns] = useState<any[]>([])

  useEffect(() => {
    setSigns(trafficSignsData.signs)
  }, [])

  const generateSlug = (id: string, name: string) => {
    const cleanName = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_')
    return `${id}_${cleanName}`
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Sitemap
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tüm sayfalarımızı keşfedin
            </p>
          </div>

          {/* Main Pages */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Ana Sayfalar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link 
                href="/" 
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Ana Sayfa</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">İrlanda trafik işaretleri ana sayfası</p>
              </Link>
              
              <Link 
                href="/signs" 
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Trafik İşaretleri</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tüm trafik işaretlerini görüntüleyin</p>
              </Link>
              
              <Link 
                href="/quiz" 
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quiz</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bilginizi test edin</p>
              </Link>
              
              <Link 
                href="/faq" 
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Sık Sorulan Sorular</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Yaygın sorular ve cevaplar</p>
              </Link>
              
              <Link 
                href="/about" 
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Hakkımızda</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Proje hakkında bilgi</p>
              </Link>
              
              <Link 
                href="/privacy" 
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Gizlilik Politikası</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Gizlilik ve veri koruma</p>
              </Link>
            </div>
          </div>

          {/* Traffic Signs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Trafik İşaretleri ({signs.length} adet)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {signs.map((sign) => {
                const slug = generateSlug(sign.id, sign.name)
                return (
                  <Link
                    key={sign.id}
                    href={`/signs/${slug}`}
                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    <div className="font-medium text-gray-900 dark:text-white mb-1">
                      {sign.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {sign.category}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Quiz Pages */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Quiz Sayfaları
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Array.from({ length: 20 }, (_, i) => (
                <Link
                  key={i + 1}
                  href={`/quiz?page=${i + 1}`}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    Sayfa {i + 1}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
