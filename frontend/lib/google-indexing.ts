// Google Indexing API utility functions
// Bu dosya Google Search Console API ile sitemap güncellemelerini otomatik gönderir

interface GoogleIndexingRequest {
  url: string
  type: 'URL_UPDATED' | 'URL_DELETED'
}

export class GoogleIndexingService {
  private static instance: GoogleIndexingService
  private serviceAccountKey: any
  private accessToken: string | null = null

  private constructor() {
    // Service account key'i environment variable'dan al
    this.serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
      ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
      : null
  }

  public static getInstance(): GoogleIndexingService {
    if (!GoogleIndexingService.instance) {
      GoogleIndexingService.instance = new GoogleIndexingService()
    }
    return GoogleIndexingService.instance
  }

  // Google'a URL güncellemesi gönder
  async notifyGoogle(url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'): Promise<boolean> {
    try {
      if (!this.serviceAccountKey) {
        console.log('Google service account key not configured')
        return false
      }

      const accessToken = await this.getAccessToken()
      if (!accessToken) {
        console.error('Failed to get Google access token')
        return false
      }

      const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          type: type,
        }),
      })

      if (response.ok) {
        console.log(`Successfully notified Google about ${type}: ${url}`)
        return true
      } else {
        console.error(`Failed to notify Google: ${response.status} ${response.statusText}`)
        return false
      }
    } catch (error) {
      console.error('Error notifying Google:', error)
      return false
    }
  }

  // Batch olarak birden fazla URL gönder
  async notifyGoogleBatch(urls: string[], type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'): Promise<boolean> {
    const results = await Promise.all(
      urls.map(url => this.notifyGoogle(url, type))
    )
    return results.every(result => result)
  }

  // Sitemap'i Google'a ping et
  async pingSitemap(sitemapUrl: string): Promise<boolean> {
    try {
      const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
      const response = await fetch(pingUrl)
      
      if (response.ok) {
        console.log(`Successfully pinged Google with sitemap: ${sitemapUrl}`)
        return true
      } else {
        console.error(`Failed to ping Google sitemap: ${response.status}`)
        return false
      }
    } catch (error) {
      console.error('Error pinging Google sitemap:', error)
      return false
    }
  }

  // Access token al
  private async getAccessToken(): Promise<string | null> {
    if (this.accessToken) {
      return this.accessToken
    }

    try {
      const jwt = require('jsonwebtoken')
      
      const now = Math.floor(Date.now() / 1000)
      const payload = {
        iss: this.serviceAccountKey.client_email,
        scope: 'https://www.googleapis.com/auth/indexing',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
      }

      const token = jwt.sign(payload, this.serviceAccountKey.private_key, {
        algorithm: 'RS256',
      })

      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: token,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        this.accessToken = data.access_token
        return this.accessToken
      } else {
        console.error('Failed to get access token:', response.statusText)
        return null
      }
    } catch (error) {
      console.error('Error getting access token:', error)
      return null
    }
  }
}

// Utility functions
export const notifyGoogleIndexing = async (url: string) => {
  const service = GoogleIndexingService.getInstance()
  return await service.notifyGoogle(url, 'URL_UPDATED')
}

export const pingGoogleSitemap = async () => {
  const service = GoogleIndexingService.getInstance()
  const sitemapUrl = 'https://irish-traffic-signs.vercel.app/sitemap.xml'
  return await service.pingSitemap(sitemapUrl)
}

export const notifyGoogleBatch = async (urls: string[]) => {
  const service = GoogleIndexingService.getInstance()
  return await service.notifyGoogleBatch(urls, 'URL_UPDATED')
}
