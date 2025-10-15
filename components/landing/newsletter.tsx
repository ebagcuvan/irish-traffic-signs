'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Smartphone, Download, Star, Award, BookOpen } from 'lucide-react'

export function AppPromotion() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 dark:from-green-800 dark:to-green-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile App Available
              </motion.div>
              
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Learn Irish Traffic Signs{' '}
                <span className="text-green-200">On the Go</span>
              </h2>
              
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Download our mobile app and master Irish traffic signs anywhere, anytime. 
                Interactive quizzes, offline learning, and progress tracking in your pocket.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                  <Link href="/app">
                    <Download className="mr-2 h-5 w-5" />
                    Download App
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl" asChild>
                  <Link href="/app">
                    Learn More
                  </Link>
                </Button>
              </div>

              {/* App Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white/20">
                    <Star className="h-5 w-5 text-yellow-300" />
                  </div>
                  <span className="text-green-100">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white/20">
                    <Award className="h-5 w-5 text-yellow-300" />
                  </div>
                  <span className="text-green-100">Offline Learning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white/20">
                    <BookOpen className="h-5 w-5 text-yellow-300" />
                  </div>
                  <span className="text-green-100">400+ Signs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white/20">
                    <Smartphone className="h-5 w-5 text-yellow-300" />
                  </div>
                  <span className="text-green-100">iOS & Android</span>
                </div>
              </div>
            </div>

            {/* Mock Phone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <div className="relative w-64 h-[500px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
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
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-4 rounded-2xl shadow-xl"
              >
                <Star className="h-8 w-8" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-2xl shadow-xl"
              >
                <Award className="h-8 w-8" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
