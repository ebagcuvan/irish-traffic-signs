import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://irish-traffic-signs.vercel.app'),
  title: 'About - Irish Traffic Signs',
  description: 'Learn about our mission to help people master Irish traffic signs. Discover how we make learning road signs easy and effective for drivers in Ireland.',
  keywords: [
    'about Irish traffic signs',
    'road signs learning platform',
    'Ireland driving education',
    'traffic safety mission',
    'road signs about'
  ],
  openGraph: {
    title: 'About - Irish Traffic Signs',
    description: 'Learn about our mission to help people master Irish traffic signs. Discover how we make learning road signs easy and effective for drivers in Ireland.',
    type: 'website',
    url: 'https://irish-traffic-signs.vercel.app/about',
    siteName: 'Irish Traffic Signs',
    images: [
      {
        url: '/appicon.png',
        width: 512,
        height: 512,
        alt: 'Irish Traffic Signs About',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About - Irish Traffic Signs',
    description: 'Learn about our mission to help people master Irish traffic signs. Discover how we make learning road signs easy and effective for drivers in Ireland.',
    images: ['/appicon.png'],
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
