import { Smartphone, Download, Star, Shield, BookOpen, Brain, Users, Award, CheckCircle, ArrowRight, Play, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function AppPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium mb-6">
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile App Available
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Learn Irish Traffic Signs{' '}
                <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  On the Go
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Master Irish traffic signs with our comprehensive mobile app. Interactive quizzes, 
                detailed explanations, and personalized learning paths - all in your pocket.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                  <a href="#download">
                    <Download className="mr-2 h-5 w-5" />
                    Download App
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 px-8 py-4 text-lg font-semibold rounded-xl" asChild>
                  <a href="#features">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </a>
                </Button>
              </div>

              {/* App Store Badges */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="bg-black rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold text-lg">📱</span>
                    </div>
                    <div>
                      <p className="text-white text-sm">Download on the</p>
                      <p className="text-white font-bold text-lg">App Store</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold text-lg">🤖</span>
                    </div>
                    <div>
                      <p className="text-white text-sm">Get it on</p>
                      <p className="text-white font-bold text-lg">Google Play</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* App Screenshots */}
            <div className="relative">
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-green-200 dark:border-green-700">
                {/* Mock Phone Frame */}
                <div className="relative mx-auto w-64 h-[500px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
                      <span className="text-xs font-medium">9:41</span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* App Content */}
                    <div className="p-4">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Irish Traffic Signs</h3>
                        <p className="text-sm text-gray-600">Learn & Practice</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-green-50 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-green-800">Progress</span>
                            <span className="text-sm text-green-600">75%</span>
                          </div>
                          <div className="w-full bg-green-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-2xl mb-1">🚦</div>
                            <p className="text-xs text-gray-600">Signs</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-2xl mb-1">🧠</div>
                            <p className="text-xs text-gray-600">Quiz</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-600 to-green-500 text-white p-4 rounded-2xl shadow-xl animate-bounce">
                  <Star className="h-8 w-8" />
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-green-400 text-white p-4 rounded-2xl shadow-xl animate-bounce" style={{ animationDelay: '1s' }}>
                  <Award className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Mobile App?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to master Irish traffic signs, optimized for mobile learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Complete Sign Library',
                description: 'Access all 410+ Irish traffic signs with high-quality images, detailed explanations, and real-world context.',
                color: 'text-green-600',
                bgColor: 'bg-green-100 dark:bg-green-900'
              },
              {
                icon: Brain,
                title: 'Smart Quizzes',
                description: 'Adaptive quiz system that learns your strengths and weaknesses, providing personalized practice sessions.',
                color: 'text-blue-600',
                bgColor: 'bg-blue-100 dark:bg-blue-900'
              },
              {
                icon: Users,
                title: 'Progress Tracking',
                description: 'Track your learning journey with detailed analytics, achievements, and streak counters.',
                color: 'text-purple-600',
                bgColor: 'bg-purple-100 dark:bg-purple-900'
              },
              {
                icon: Shield,
                title: 'Offline Learning',
                description: 'Download content for offline study. Perfect for commuting or areas with poor internet connection.',
                color: 'text-orange-600',
                bgColor: 'bg-orange-100 dark:bg-orange-900'
              },
              {
                icon: Award,
                title: 'Achievement System',
                description: 'Unlock badges and certificates as you progress through different difficulty levels and categories.',
                color: 'text-red-600',
                bgColor: 'bg-red-100 dark:bg-red-900'
              },
              {
                icon: Star,
                title: 'Personalized Learning',
                description: 'AI-powered recommendations based on your performance and learning preferences.',
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-100 dark:bg-yellow-900'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 dark:border-gray-700">
                <div className={`p-4 rounded-full ${feature.bgColor} inline-flex items-center justify-center mb-6`}>
                  <feature.icon className={`h-10 w-10 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              App Screenshots
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See how our app looks and works
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Home Dashboard',
                description: 'Overview of your learning progress and quick access to features',
                mockup: '📱'
              },
              {
                title: 'Sign Library',
                description: 'Browse and search through all Irish traffic signs with detailed information',
                mockup: '🚦'
              },
              {
                title: 'Interactive Quiz',
                description: 'Test your knowledge with multiple question types and difficulty levels',
                mockup: '🧠'
              },
              {
                title: 'Progress Tracking',
                description: 'Monitor your learning journey with detailed analytics and achievements',
                mockup: '📊'
              },
              {
                title: 'Favorites',
                description: 'Save your favorite signs for quick access and personalized study',
                mockup: '❤️'
              },
              {
                title: 'Settings',
                description: 'Customize your learning experience with various preferences',
                mockup: '⚙️'
              }
            ].map((screenshot, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                <div className="w-48 h-80 mx-auto bg-gray-100 dark:bg-gray-700 rounded-2xl mb-4 flex items-center justify-center text-6xl">
                  {screenshot.mockup}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{screenshot.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{screenshot.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-16 lg:py-24 bg-green-600 dark:bg-green-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto">
              Download our mobile app today and master Irish traffic signs on the go. 
              Available for both iOS and Android devices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="bg-black rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-xl">📱</span>
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm">Download on the</p>
                    <p className="text-white font-bold text-xl">App Store</p>
                    <p className="text-gray-300 text-xs">iOS 12.0 or later</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-xl">🤖</span>
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm">Get it on</p>
                    <p className="text-white font-bold text-xl">Google Play</p>
                    <p className="text-gray-300 text-xs">Android 6.0 or later</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-4 text-green-100">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">Free to download</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">No ads</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">Offline support</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">Regular updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to know about our mobile app
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "Is the app free to download?",
                  answer: "Yes, our mobile app is completely free to download and use. There are no hidden costs or in-app purchases required for basic functionality."
                },
                {
                  question: "Does the app work offline?",
                  answer: "Yes! You can download content for offline study. This is perfect for commuting or areas with poor internet connection."
                },
                {
                  question: "What devices are supported?",
                  answer: "Our app is available for both iOS (iPhone/iPad) and Android devices. We support iOS 12.0+ and Android 6.0+."
                },
                {
                  question: "How often is the content updated?",
                  answer: "We regularly update our app with new traffic signs, improved features, and bug fixes. Updates are automatic and free."
                },
                {
                  question: "Can I sync my progress across devices?",
                  answer: "Yes! Your learning progress, favorites, and achievements are automatically synced across all your devices when you're signed in."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
