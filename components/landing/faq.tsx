'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'Is this platform free to use?',
    answer: 'Yes! Our basic features are completely free. You can access the sign library, take quizzes, and track your progress at no cost. We also offer premium features for advanced learners.',
  },
  {
    question: 'How many traffic signs are included?',
    answer: 'Our platform includes over 400 Irish traffic signs, covering all categories: warning signs, regulatory signs, mandatory signs, informational signs, and directional signs.',
  },
  {
    question: 'Can I use this on my mobile device?',
    answer: 'Absolutely! Our platform is fully responsive and works perfectly on smartphones, tablets, and desktop computers. You can learn on the go wherever you are.',
  },
  {
    question: 'How does the quiz system work?',
    answer: 'Currently, we offer sign and visual matching quizzes. Development is ongoing to add more quiz types and features.',
  },
  {
    question: 'Will this help me pass my driving test?',
    answer: 'Yes! Our platform is specifically designed to help learners master Irish traffic signs for the driving test.',
  },
  {
    question: 'Can I track my learning progress?',
    answer: 'Currently, only incorrect answers from each quiz are shown. No data is stored and development is ongoing for more comprehensive progress tracking.',
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Yes, we do not store any data.',
  },
  {
    question: 'Do you offer support if I have questions?',
    answer: 'Limited support is available through the links on the site. For more comprehensive help, please refer to official resources.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Got questions? We've got answers. Here are the most common questions about our platform.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
