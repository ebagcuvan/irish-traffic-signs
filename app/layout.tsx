import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://irish-traffic-signs.vercel.app'),
  title: 'Irish Traffic Signs - Learn Irish Road Signs',
  description: 'Master Irish traffic signs with interactive quizzes, detailed explanations, and personalized learning paths.',
  keywords: ['Irish traffic signs', 'road signs', 'Ireland', 'driving', 'quiz', 'learning'],
  authors: [{ name: 'Irish Traffic Signs Team' }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Irish Traffic Signs - Learn Irish Road Signs',
    description: 'Master Irish traffic signs with interactive quizzes, detailed explanations, and personalized learning paths.',
    type: 'website',
    locale: 'en_IE',
    url: 'https://irish-traffic-signs.vercel.app',
    siteName: 'Irish Traffic Signs',
    images: [
      {
        url: '/appicon.png',
        width: 512,
        height: 512,
        alt: 'Irish Traffic Signs Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Irish Traffic Signs - Learn Irish Road Signs',
    description: 'Master Irish traffic signs with interactive quizzes, detailed explanations, and personalized learning paths.',
    images: ['/appicon.png'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Irish Traffic Signs" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
              },
            }}
          />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
