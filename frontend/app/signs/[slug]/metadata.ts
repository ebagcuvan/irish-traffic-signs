import { Metadata } from 'next'
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
}

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

// Generate slug for URL
const generateSlug = (id: string, name: string) => {
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
  return `${id}_${cleanName}`
}

// Generate metadata for a sign
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const data = trafficSignsData
    
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
    
    if (!signData) {
      return {
        title: 'Sign Not Found - Irish Traffic Signs',
        description: 'The traffic sign you are looking for could not be found.',
      }
    }

    const category = mapCategory(signData.category)
    const title = `${signData.name} - Irish Traffic Signs`
    const description = signData.description || signData.meaning || `Learn about the ${signData.name} traffic sign in Ireland.`
    
    return {
      metadataBase: new URL('https://irish-traffic-signs.vercel.app'),
      title,
      description,
      keywords: [
        'Irish traffic signs',
        'Ireland road signs',
        signData.name,
        category.toLowerCase(),
        'traffic safety',
        'road safety Ireland',
        'driving Ireland',
        ...(signData.tags || [])
      ],
      openGraph: {
        title,
        description,
        type: 'article',
        url: `https://irish-traffic-signs.vercel.app/signs/${generateSlug(signData.id, signData.name)}`,
        siteName: 'Irish Traffic Signs',
        images: [
          {
            url: signData.imagePath || '/images/default-sign.jpg',
            width: 800,
            height: 600,
            alt: signData.name,
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [signData.imagePath || '/images/default-sign.jpg'],
      },
      alternates: {
        canonical: `/signs/${generateSlug(signData.id, signData.name)}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      metadataBase: new URL('https://irish-traffic-signs.vercel.app'),
      title: 'Irish Traffic Signs',
      description: 'Learn about Irish traffic signs and road safety.',
    }
  }
}

// Generate static params for all signs
export async function generateStaticParams() {
  try {
    const data = trafficSignsData
    
    return data.signs.map((sign: TrafficSignData) => ({
      slug: generateSlug(sign.id, sign.name),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
