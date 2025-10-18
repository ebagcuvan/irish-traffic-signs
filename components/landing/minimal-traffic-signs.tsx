'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { trafficSignsData } from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'

export function MinimalTrafficSigns() {
  // Selected 4 specific signs to display
  const selectedSignIds = [
    'warning_001', // Accompanied Horses
    'regulatory_custom_133', // Barrier Board - 3 Bars
    'others_custom_313', // Barrier Board - 4 Bars
    'warning_005'  // Cattle or Farm Animals
  ]

  const selectedSigns = selectedSignIds.map(id => 
    trafficSignsData.signs.find(sign => sign.id === id)
  ).filter(Boolean)

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Essential Traffic Signs
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn about these important Irish traffic signs. Click on any sign to discover its meaning and importance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {selectedSigns.filter(Boolean).map((sign, index) => (
            <motion.div
              key={sign.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link 
                href={`/signs/${sign.id}`}
                className="block bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 h-full"
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors duration-300">
                    <Image
                      src={sign.imagePath}
                      alt={sign.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm leading-tight">
                    {sign.name}
                  </h3>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                    {sign.category}
                  </p>
                  
                  <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/signs"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            View All Signs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
