import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Sign Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The traffic sign you're looking for doesn't exist or may have been removed.
          </p>
          <div className="space-y-4">
            <Link href="/signs">
              <Button className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Signs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
