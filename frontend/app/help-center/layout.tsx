import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://irish-traffic-signs.vercel.app'),
  title: 'Help Center - Irish Traffic Signs',
  description: 'Get help with Irish traffic signs, driving tests, and road safety. Find comprehensive guides, resources, and support for learning Irish road signs.',
  keywords: [
    'Irish traffic signs help',
    'driving test help',
    'road signs guide',
    'Ireland driving support',
    'traffic safety help',
    'road regulations guide'
  ],
  openGraph: {
    title: 'Help Center - Irish Traffic Signs',
    description: 'Get help with Irish traffic signs, driving tests, and road safety. Find comprehensive guides, resources, and support for learning Irish road signs.',
    type: 'website',
    url: 'https://irish-traffic-signs.vercel.app/help-center',
    siteName: 'Irish Traffic Signs',
    images: [
      {
        url: '/appicon.png',
        width: 512,
        height: 512,
        alt: 'Irish Traffic Signs Help Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Help Center - Irish Traffic Signs',
    description: 'Get help with Irish traffic signs, driving tests, and road safety. Find comprehensive guides, resources, and support for learning Irish road signs.',
    images: ['/appicon.png'],
  },
}

export default function HelpCenterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
