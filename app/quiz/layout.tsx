import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://irish-traffic-signs.vercel.app'),
  title: 'Traffic Signs Quiz - Irish Traffic Signs',
  description: 'Test your knowledge of Irish traffic signs with our interactive quiz. Practice with multiple choice questions and improve your driving test preparation.',
  keywords: [
    'Irish traffic signs quiz',
    'traffic signs test',
    'driving test practice',
    'road signs quiz',
    'Ireland driving test',
    'traffic safety quiz',
    'road safety test'
  ],
  openGraph: {
    title: 'Traffic Signs Quiz - Irish Traffic Signs',
    description: 'Test your knowledge of Irish traffic signs with our interactive quiz. Practice with multiple choice questions and improve your driving test preparation.',
    type: 'website',
    url: 'https://irish-traffic-signs.vercel.app/quiz',
    siteName: 'Irish Traffic Signs',
    images: [
      {
        url: '/appicon.png',
        width: 512,
        height: 512,
        alt: 'Irish Traffic Signs Quiz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Traffic Signs Quiz - Irish Traffic Signs',
    description: 'Test your knowledge of Irish traffic signs with our interactive quiz. Practice with multiple choice questions and improve your driving test preparation.',
    images: ['/appicon.png'],
  },
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
