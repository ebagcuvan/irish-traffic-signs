import { NextRequest, NextResponse } from 'next/server'
import { pingGoogleSitemap, notifyGoogleBatch } from '../../../../lib/google-indexing'

export async function POST(request: NextRequest) {
  try {
    // Webhook secret kontrolü (güvenlik için)
    const webhookSecret = request.headers.get('x-webhook-secret')
    const expectedSecret = process.env.WEBHOOK_SECRET
    
    if (expectedSecret && webhookSecret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { event, data } = body

    // Farklı event türlerini handle et
    switch (event) {
      case 'content.updated':
      case 'content.created':
        // Yeni içerik eklendiğinde veya güncellendiğinde
        const urls = data?.urls || []
        if (urls.length > 0) {
          await notifyGoogleBatch(urls)
        }
        await pingGoogleSitemap()
        break

      case 'sitemap.updated':
        // Sitemap güncellendiğinde
        await pingGoogleSitemap()
        break

      case 'urls.updated':
        // Belirli URL'ler güncellendiğinde
        const updatedUrls = data?.urls || []
        if (updatedUrls.length > 0) {
          await notifyGoogleBatch(updatedUrls)
        }
        break

      default:
        // Diğer durumlarda sadece sitemap ping et
        await pingGoogleSitemap()
    }

    return NextResponse.json({
      success: true,
      message: `Webhook processed for event: ${event}`,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process webhook',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    message: 'Sitemap webhook endpoint is running',
    timestamp: new Date().toISOString()
  })
}
