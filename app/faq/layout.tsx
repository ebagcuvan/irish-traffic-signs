import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://irish-traffic-signs.vercel.app'),
  title: 'FAQ - Irish Traffic Signs',
  description: 'Frequently asked questions about Irish traffic signs, driving tests, and road safety. Find answers to common questions about Irish road signs and regulations.',
  keywords: [
    'Irish traffic signs FAQ',
    'driving test questions',
    'road signs FAQ',
    'Ireland driving help',
    'traffic safety questions',
    'road regulations Ireland'
  ],
  openGraph: {
    title: 'FAQ - Irish Traffic Signs',
    description: 'Frequently asked questions about Irish traffic signs, driving tests, and road safety. Find answers to common questions about Irish road signs and regulations.',
    type: 'website',
    url: 'https://irish-traffic-signs.vercel.app/faq',
    siteName: 'Irish Traffic Signs',
    images: [
      {
        url: '/appicon.png',
        width: 512,
        height: 512,
        alt: 'Irish Traffic Signs FAQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Irish Traffic Signs',
    description: 'Frequently asked questions about Irish traffic signs, driving tests, and road safety. Find answers to common questions about Irish road signs and regulations.',
    images: ['/appicon.png'],
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
