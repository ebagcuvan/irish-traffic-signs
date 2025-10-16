import { MetadataRoute } from 'next'
import { trafficSignsData } from '../lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://irish-traffic-signs.vercel.app'
  
  // Static sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/signs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Dinamik trafik işareti sayfaları
  const signPages = trafficSignsData.signs.map((sign) => {
    // Slug oluştur
    const slug = `${sign.id}_${sign.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '_')}`
    
    return {
      url: `${baseUrl}/signs/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  })

  // Quiz sayfaları (sayfa numaraları)
  const quizPages = []
  for (let page = 1; page <= 20; page++) { // Maksimum 20 sayfa
    quizPages.push({
      url: `${baseUrl}/quiz?page=${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })
  }

  return [...staticPages, ...signPages, ...quizPages]
}
