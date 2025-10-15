import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://irish-traffic-signs.vercel.app'),
  title: 'My Favorites - Irish Traffic Signs',
  description: 'View your favorite Irish traffic signs. Access your saved signs and continue learning from where you left off.',
  keywords: [
    'Irish traffic signs favorites',
    'saved traffic signs',
    'favorite road signs',
    'personalized learning',
    'saved signs Ireland'
  ],
  openGraph: {
    title: 'My Favorites - Irish Traffic Signs',
    description: 'View your favorite Irish traffic signs. Access your saved signs and continue learning from where you left off.',
    type: 'website',
    url: 'https://irish-traffic-signs.vercel.app/favorites',
    siteName: 'Irish Traffic Signs',
    images: [
      {
        url: '/appicon.png',
        width: 512,
        height: 512,
        alt: 'Irish Traffic Signs Favorites',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Favorites - Irish Traffic Signs',
    description: 'View your favorite Irish traffic signs. Access your saved signs and continue learning from where you left off.',
    images: ['/appicon.png'],
  },
}

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
