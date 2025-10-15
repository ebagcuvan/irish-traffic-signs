import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Irish Traffic Signs - Learn Irish Road Signs',
  description: 'Master Irish traffic signs with interactive quizzes, detailed explanations, and personalized learning paths.',
  keywords: ['Irish traffic signs', 'road signs', 'Ireland', 'driving', 'quiz', 'learning'],
  authors: [{ name: 'Irish Traffic Signs Team' }],
  openGraph: {
    title: 'Irish Traffic Signs - Learn Irish Road Signs',
    description: 'Master Irish traffic signs with interactive quizzes, detailed explanations, and personalized learning paths.',
    type: 'website',
    locale: 'en_IE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Irish Traffic Signs - Learn Irish Road Signs',
    description: 'Master Irish traffic signs with interactive quizzes, detailed explanations, and personalized learning paths.',
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
      </body>
    </html>
  )
}
