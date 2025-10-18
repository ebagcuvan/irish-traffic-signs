import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { Stats } from '@/components/landing/stats'
import { FAQ } from '@/components/landing/faq'
import { AppPromotion } from '@/components/landing/newsletter'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Hero />
      <Features />
      <Stats />
      <FAQ />
      <AppPromotion />
    </div>
  )
}
