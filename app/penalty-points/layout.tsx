import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://irish-traffic-signs.vercel.app'),
  title: 'Penalty Points & Traffic Offences - Irish Traffic Signs',
  description: 'Complete guide to Irish traffic penalty points and fines. Learn about traffic offences, penalty point system, and fines for various driving violations in Ireland.',
  keywords: [
    'Irish penalty points',
    'traffic fines Ireland',
    'driving offences',
    'RSA penalty points',
    'traffic violations',
    'Irish road safety',
    'penalty point system',
    'driving penalties'
  ],
  openGraph: {
    title: 'Penalty Points & Traffic Offences - Irish Traffic Signs',
    description: 'Complete guide to Irish traffic penalty points and fines. Learn about traffic offences, penalty point system, and fines for various driving violations in Ireland.',
    type: 'website',
    url: 'https://irish-traffic-signs.vercel.app/penalty-points',
    siteName: 'Irish Traffic Signs',
    images: [
      {
        url: '/appicon.png',
        width: 512,
        height: 512,
        alt: 'Irish Traffic Signs Penalty Points',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Penalty Points & Traffic Offences - Irish Traffic Signs',
    description: 'Complete guide to Irish traffic penalty points and fines. Learn about traffic offences, penalty point system, and fines for various driving violations in Ireland.',
    images: ['/appicon.png'],
  },
}

export default function PenaltyPointsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
