'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Star, Users, BookOpen, Trophy, Shield, Clock, Award } from 'lucide-react'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 bg-green-50/20 opacity-40"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium mb-6"
            >
              <Shield className="h-4 w-4 mr-2" />
              Official Irish Traffic Signs
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
            >
              Master Irish{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Traffic Signs
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Learn Irish road signs with interactive quizzes, detailed explanations, and personalized learning paths. Perfect for drivers, students, and anyone preparing for the Irish driving test.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16"
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link href="/signs">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 px-8 py-4 text-lg font-semibold rounded-xl" asChild>
                <Link href="/quiz">
                  <Play className="mr-2 h-5 w-5" />
                  Try Quiz
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-8 max-w-lg mx-auto lg:mx-0"
            >
              <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-green-200 dark:border-green-700">
                <div className="flex items-center justify-center mb-3">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Active Learners</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-green-200 dark:border-green-700">
                <div className="flex items-center justify-center mb-3">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">410+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Traffic Signs</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-green-200 dark:border-green-700">
                <div className="flex items-center justify-center mb-3">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-green-200 dark:border-green-700">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Irish Traffic Signs Quiz
                  </h3>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      Question 3 of 10
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-400">30%</span>
                  </div>
                  <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full transition-all duration-500" style={{ width: '30%' }}></div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-2xl mb-6 flex items-center justify-center border-2 border-green-300 dark:border-green-600">
                      <span className="text-4xl">🚦</span>
                    </div>
                    <p className="text-gray-900 dark:text-white font-semibold text-lg">
                      What does this sign mean?
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {['Stop', 'Give Way', 'No Entry', 'One Way'].map((option, i) => (
                      <button
                        key={i}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium ${
                          i === 0 
                            ? 'border-green-500 bg-green-100 text-green-800 dark:border-green-400 dark:bg-green-900/30 dark:text-green-200 shadow-md'
                            : 'border-gray-200 bg-white hover:bg-green-50 hover:border-green-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-green-900/20 dark:hover:border-green-600'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-gradient-to-r from-green-600 to-green-500 text-white p-4 rounded-2xl shadow-xl"
            >
              <Trophy className="h-8 w-8" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-green-400 text-white p-4 rounded-2xl shadow-xl"
            >
              <BookOpen className="h-8 w-8" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute top-1/2 -left-8 bg-gradient-to-r from-green-400 to-green-300 text-white p-3 rounded-xl shadow-lg"
            >
              <Clock className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}