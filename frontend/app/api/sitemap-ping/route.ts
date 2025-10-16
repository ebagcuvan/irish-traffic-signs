import { NextRequest, NextResponse } from 'next/server'
import { pingGoogleSitemap, notifyGoogleBatch } from '../../../lib/google-indexing'

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json()
    
    // Sitemap'i Google'a ping et
    const sitemapPingResult = await pingGoogleSitemap()
    
    // Eğer specific URL'ler varsa onları da bildir
    let urlNotificationResult = true
    if (urls && Array.isArray(urls) && urls.length > 0) {
      urlNotificationResult = await notifyGoogleBatch(urls)
    }

    return NextResponse.json({
      success: sitemapPingResult && urlNotificationResult,
      sitemapPing: sitemapPingResult,
      urlNotifications: urlNotificationResult,
      message: 'Google indexing notifications sent successfully'
    })
  } catch (error) {
    console.error('Error in sitemap-ping API:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send Google indexing notifications',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Sadece sitemap ping et
  try {
    const result = await pingGoogleSitemap()
    return NextResponse.json({
      success: result,
      message: result ? 'Sitemap pinged successfully' : 'Failed to ping sitemap'
    })
  } catch (error) {
    console.error('Error pinging sitemap:', error)
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
