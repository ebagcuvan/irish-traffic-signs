'use client'

import { useState } from 'react'
import { BookOpen, Car, FileText, Clock, Shield, Users, Phone, Mail, MapPin, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HelpCenterPage() {
  const [activeTab, setActiveTab] = useState('driving-test')

  const drivingTestInfo = {
    requirements: [
      {
        title: "Age Requirements",
        description: "You must be at least 17 years old to apply for a driving test in Ireland.",
        icon: Users
      },
      {
        title: "Learner Permit",
        description: "You must hold a valid learner permit for at least 6 months before taking the test.",
        icon: FileText
      },
      {
        title: "Theory Test",
        description: "You must pass the theory test before booking your practical driving test.",
        icon: BookOpen
      },
      {
        title: "Lessons Required",
        description: "Complete at least 12 EDT (Essential Driver Training) lessons with an approved instructor.",
        icon: Car
      }
    ],
    process: [
      {
        step: "1",
        title: "Get Your Learner Permit",
        description: "Apply for a learner permit at your local NDLS centre. You'll need to pass the theory test first."
      },
      {
        step: "2", 
        title: "Complete EDT Lessons",
        description: "Take 12 Essential Driver Training lessons with an approved driving instructor."
      },
      {
        step: "3",
        title: "Practice Driving",
        description: "Practice driving with a qualified supervisor for at least 6 months."
      },
      {
        step: "4",
        title: "Book Your Test",
        description: "Book your practical driving test online through the RSA website."
      },
      {
        step: "5",
        title: "Take the Test",
        description: "Complete your practical driving test with an RSA tester."
      }
    ],
    costs: [
      { item: "Theory Test", cost: "€45" },
      { item: "Learner Permit", cost: "€35" },
      { item: "EDT Lessons (12)", cost: "€600-800" },
      { item: "Practical Test", cost: "€85" },
      { item: "Full License", cost: "€55" }
    ]
  }

  const licenseInfo = {
    types: [
      {
        title: "Learner Permit",
        description: "Allows you to learn to drive under supervision",
        requirements: ["Pass theory test", "Be 17+ years old", "Medical certificate"],
        validity: "2 years"
      },
      {
        title: "Full License",
        description: "Allows you to drive independently",
        requirements: ["Pass practical test", "Hold learner permit 6+ months", "Complete EDT"],
        validity: "10 years (under 70)"
      },
      {
        title: "International License",
        description: "For driving abroad with your Irish license",
        requirements: ["Valid Irish license", "Apply at NDLS centre"],
        validity: "1 year"
      }
    ],
    renewal: [
      {
        title: "When to Renew",
        description: "Full licenses must be renewed every 10 years (or every 3 years if over 70)"
      },
      {
        title: "How to Renew", 
        description: "Apply online at ndls.ie or visit your local NDLS centre"
      },
      {
        title: "Documents Needed",
        description: "Current license, proof of address, and medical certificate (if required)"
      }
    ]
  }

  const resources = [
    {
      title: "RSA Official Website",
      description: "Official information from the Road Safety Authority",
      url: "https://www.rsa.ie",
      icon: ExternalLink
    },
    {
      title: "NDLS Centres",
      description: "Find your nearest National Driver Licence Service centre",
      url: "https://www.ndls.ie",
      icon: MapPin
    },
    {
      title: "Theory Test Practice",
      description: "Practice for your theory test with official questions",
      url: "https://www.theorytest.ie",
      icon: BookOpen
    },
    {
      title: "Driving Test Booking",
      description: "Book your practical driving test online",
      url: "https://www.rsa.ie/driving-tests",
      icon: Car
    }
  ]

  const contactInfo = [
    {
      title: "RSA Helpline",
      description: "General driving test and license queries",
      contact: "01 879 2000",
      icon: Phone
    },
    {
      title: "NDLS Support",
      description: "License application and renewal support", 
      contact: "0761 08 7890",
      icon: Phone
    },
    {
      title: "Email Support",
      description: "Send your questions via email",
      contact: "info@rsa.ie",
      icon: Mail
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900">
              <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about getting your Irish driving license and passing your driving test.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
            <div className="flex flex-wrap gap-1">
              <Button
                variant={activeTab === 'driving-test' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('driving-test')}
                className="flex items-center gap-2"
              >
                <Car className="h-4 w-4" />
                Driving Test
              </Button>
              <Button
                variant={activeTab === 'license' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('license')}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                License Info
              </Button>
              <Button
                variant={activeTab === 'resources' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('resources')}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Resources
              </Button>
              <Button
                variant={activeTab === 'contact' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('contact')}
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Contact
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {/* Driving Test Tab */}
          {activeTab === 'driving-test' && (
            <div className="space-y-8">
              {/* Requirements */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary-600" />
                  Test Requirements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {drivingTestInfo.requirements.map((req, index) => {
                    const Icon = req.icon
                    return (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <div className="flex-shrink-0">
                          <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900">
                            <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{req.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{req.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Process Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary-600" />
                  Step-by-Step Process
                </h2>
                <div className="space-y-4">
                  {drivingTestInfo.process.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Costs */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary-600" />
                  Estimated Costs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {drivingTestInfo.costs.map((cost, index) => (
                    <div key={index} className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <span className="text-gray-900 dark:text-white font-medium">{cost.item}</span>
                      <span className="text-primary-600 dark:text-primary-400 font-bold">{cost.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* License Tab */}
          {activeTab === 'license' && (
            <div className="space-y-8">
              {/* License Types */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary-600" />
                  License Types
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {licenseInfo.types.map((license, index) => (
                    <div key={index} className="p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{license.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{license.description}</p>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Requirements:</span>
                          <ul className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {license.requirements.map((req, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Valid for:</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">{license.validity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Renewal Info */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary-600" />
                  License Renewal
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {licenseInfo.renewal.map((info, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{info.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                  Useful Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resources.map((resource, index) => {
                    const Icon = resource.icon
                    return (
                      <div key={index} className="p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900">
                              <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{resource.description}</p>
                            <Button variant="outline" size="sm" asChild>
                              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Visit Website
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary-600" />
                  Get Help & Support
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {contactInfo.map((contact, index) => {
                    const Icon = contact.icon
                    return (
                      <div key={index} className="p-6 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900">
                            <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{contact.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{contact.description}</p>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">{contact.contact}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
