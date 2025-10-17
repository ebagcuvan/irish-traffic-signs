import { Metadata } from 'next'
import { BookOpen, Users, Target, Award, Heart, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - Irish Traffic Signs',
  description: 'Learn about our mission to help Irish drivers master traffic signs through interactive learning and comprehensive resources.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Irish Traffic Signs
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Empowering Irish drivers with comprehensive traffic sign knowledge through innovative learning experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We believe that understanding traffic signs is fundamental to safe and confident driving in Ireland. 
                Our platform makes learning these essential road rules engaging, accessible, and effective.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Comprehensive Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Access detailed explanations and visual guides for every Irish traffic sign.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Visual Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  High-quality images and clear explanations for every Irish traffic sign.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Category Organization
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Signs organized by categories: Warning, Regulatory, Mandatory, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    Irish Traffic Signs was created to solve a real problem: finding accurate, 
                    up-to-date information about Irish traffic signs in one place. We noticed 
                    that drivers often had to search through multiple sources to understand 
                    what different signs meant.
                  </p>
                  <p>
                    Our platform provides a comprehensive database of Irish traffic signs with 
                    high-quality images, detailed meanings, and clear explanations. Each sign 
                    is categorized properly and includes practical information about when and 
                    where you'll encounter it on Irish roads.
                  </p>
                  <p>
                    Whether you're preparing for your driving test, refreshing your knowledge, 
                    or just curious about road signs, our platform makes it easy to learn 
                    and understand Irish traffic signage.
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Made in Ireland
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Developed by car lovers, for Irish drivers, with Irish road safety in mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Values
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Accuracy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All information is verified and up-to-date with Irish road regulations.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Clarity
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Clear, easy-to-understand explanations for every traffic sign.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Organization
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Signs are well-organized by categories and easy to find.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Completeness
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Comprehensive coverage of all Irish traffic signs in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Impact
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Numbers that show our commitment to Irish road safety
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  400+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Traffic Signs
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  8
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Categories
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  100%
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Free Access
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  24/7
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Learn Irish Traffic Signs?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Browse our comprehensive database of Irish traffic signs with detailed explanations and meanings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signs"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse All Signs
              </a>
              <a
                href="/help-center"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
