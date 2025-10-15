'use client'

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Brain, 
  Heart, 
  Trophy, 
  Users, 
  Smartphone,
  Shield,
  Zap
} from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Sign Library',
    description: 'Access 400+ Irish traffic signs with detailed explanations, Irish and English names, and real-world context.',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900',
  },
  {
    icon: Brain,
    title: 'Interactive Quizzes',
    description: 'Test your knowledge with multiple quiz types: multiple choice, true/false, matching, and image identification.',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-900/50',
  },
  {
    icon: Heart,
    title: 'Personalized Favorites',
    description: 'Save your favorite signs, create custom collections, and organize your learning materials.',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900',
  },
  {
    icon: Trophy,
    title: 'Progress Tracking',
    description: 'Monitor your learning progress with detailed analytics, achievements, and streak counters.',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-900/50',
  },
  {
    icon: Users,
    title: 'Community Features',
    description: 'Join leaderboards, share progress, and learn from other drivers preparing for their test.',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Learn on the go with our responsive design that works perfectly on all devices.',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-900/50',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is protected with enterprise-grade security and privacy controls.',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900',
  },
  {
    icon: Zap,
    title: 'Fast & Reliable',
    description: 'Lightning-fast performance with 99.9% uptime to ensure uninterrupted learning.',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-900/50',
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to master Irish traffic signs
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our comprehensive platform combines interactive learning, progress tracking, and community features to help you succeed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
