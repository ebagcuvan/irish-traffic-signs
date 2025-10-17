'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, BookOpen, Trophy, Clock } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Active Learners',
    description: 'Join thousands of drivers mastering Irish traffic signs',
  },
  {
    icon: BookOpen,
    value: '200+',
    label: 'Traffic Signs',
    description: 'Comprehensive library of Irish road signs',
  },
  {
    icon: Trophy,
    value: '95%',
    label: 'Success Rate',
    description: 'Average pass rate for our learners',
  },
  {
    icon: Clock,
    value: '5 min',
    label: 'Daily Practice',
    description: 'Just 5 minutes a day to master traffic signs',
  },
]

export function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-primary-600 dark:bg-primary-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by thousands of learners
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Our platform has helped thousands of drivers master Irish traffic signs and pass their driving tests.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="inline-flex p-3 rounded-lg bg-white/20 mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={inView ? { scale: 1 } : { scale: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  className="text-3xl sm:text-4xl font-bold text-white mb-2"
                >
                  {stat.value}
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-primary-100 text-sm">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
