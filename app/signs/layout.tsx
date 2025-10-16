import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://irish-traffic-signs.vercel.app'),
  title: 'All Traffic Signs - Irish Traffic Signs',
  description: 'Browse and learn about all Irish traffic signs. Find detailed information, meanings, and explanations for every road sign in Ireland.',
  keywords: [
    'Irish traffic signs',
    'Ireland road signs',
    'traffic signs list',
    'road safety Ireland',
    'driving Ireland',
    'warning signs',
    'regulatory signs',
    'mandatory signs',
    'informational signs'
  ],
  openGraph: {
    title: 'All Traffic Signs - Irish Traffic Signs',
    description: 'Browse and learn about all Irish traffic signs. Find detailed information, meanings, and explanations for every road sign in Ireland.',
    type: 'website',
    url: 'https://irish-traffic-signs.vercel.app/signs',
    siteName: 'Irish Traffic Signs',
    images: [
      {
        url: '/appicon.png',
        width: 512,
        height: 512,
        alt: 'Irish Traffic Signs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Traffic Signs - Irish Traffic Signs',
    description: 'Browse and learn about all Irish traffic signs. Find detailed information, meanings, and explanations for every road sign in Ireland.',
    images: ['/appicon.png'],
  },
}

export default function SignsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
