import { NextRequest, NextResponse } from 'next/server'
import { pingGoogleSitemap } from '../../../lib/google-indexing'

export async function GET(request: NextRequest) {
  try {
    // Cron job secret kontrolü
    const cronSecret = request.headers.get('x-cron-secret')
    const expectedSecret = process.env.CRON_SECRET
    
    if (expectedSecret && cronSecret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Sitemap'i Google'a ping et
    const result = await pingGoogleSitemap()
    
    return NextResponse.json({
      success: result,
      message: result ? 'Sitemap pinged successfully' : 'Failed to ping sitemap',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error in cron sitemap ping:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to ping sitemap',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
