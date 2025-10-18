import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

// Map category from JSON to database enum
function mapCategory(category: string): 'WARNING' | 'REGULATORY' | 'MANDATORY' | 'INFORMATIONAL' | 'DIRECTIONAL' {
  const categoryMap: { [key: string]: 'WARNING' | 'REGULATORY' | 'MANDATORY' | 'INFORMATIONAL' | 'DIRECTIONAL' } = {
    'Warning Signs': 'WARNING',
    'Regulatory Signs': 'REGULATORY',
    'Mandatory Signs': 'MANDATORY',
    'Informational Signs': 'INFORMATIONAL',
    'Directional Signs': 'DIRECTIONAL',
    'Temporary Signs': 'WARNING',
    'Road Markings': 'INFORMATIONAL',
  }
  
  return categoryMap[category] || 'INFORMATIONAL'
}

// Determine difficulty level based on sign properties
function determineDifficultyLevel(sign: any): 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' {
  // Simple heuristic based on category and tags
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

async function main() {
  console.log('🌱 Seeding database...')

  // Read traffic signs from JSON file
  const signsPath = path.join(process.cwd(), '..', 'data', 'traffic_signs.json')
  const signsData = fs.readFileSync(signsPath, 'utf8')
  const jsonData = JSON.parse(signsData)
  const signs = jsonData.signs

  for (const sign of signs) {
    // Map JSON fields to database schema
    const mappedSign = {
      irishName: sign.name, // Using name as Irish name for now
      englishName: sign.name,
      description: sign.description || '',
      category: mapCategory(sign.category),
      difficultyLevel: determineDifficultyLevel(sign),
      imageUrl: sign.imagePath || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
      context: sign.meaning || sign.description || '',
    }

    await prisma.trafficSign.create({
      data: mappedSign,
    })
  }

  console.log(`✅ Created ${signs.length} traffic signs`)

  // Create sample admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@irishtrafficsigns.ie' },
    update: {},
    create: {
      email: 'admin@irishtrafficsigns.ie',
      passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/7QjK8K2', // password: admin123
      displayName: 'Admin User',
      isAdmin: true,
      isVerified: true,
    },
  })

  console.log('✅ Created admin user')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
