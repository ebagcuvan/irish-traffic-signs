'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    name: 'Sarah Murphy',
    role: 'New Driver',
    avatar: '/appicon.png',
    content: 'This platform made learning Irish traffic signs so much easier! The interactive quizzes helped me pass my driving test on the first try.',
    rating: 5,
  },
  {
    name: 'Michael O\'Brien',
    role: 'Driving Instructor',
    avatar: '/appicon.png',
    content: 'I recommend this to all my students. The comprehensive sign library and progress tracking features are excellent.',
    rating: 5,
  },
  {
    name: 'Emma Kelly',
    role: 'International Driver',
    avatar: '/appicon.png',
    content: 'As someone new to Ireland, this platform was invaluable for understanding Irish road signs. The explanations are clear and helpful.',
    rating: 5,
  },
  {
    name: 'David Walsh',
    role: 'Student',
    avatar: '/appicon.png',
    content: 'The personalized learning paths and favorites system helped me focus on the signs I needed to work on most.',
    rating: 5,
  },
  {
    name: 'Lisa Ryan',
    role: 'Professional Driver',
    avatar: '/appicon.png',
    content: 'Even as an experienced driver, I found new insights about Irish traffic signs. The community features are great too.',
    rating: 5,
  },
  {
    name: 'James Murphy',
    role: 'Driving Test Candidate',
    avatar: '/appicon.png',
    content: 'The mobile app is perfect for studying on the go. I used it during my lunch breaks and it made all the difference.',
    rating: 5,
  },
]

export function Testimonials() {
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
            What our learners say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what real users have to say about their experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary-200 dark:text-primary-800" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-6">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
