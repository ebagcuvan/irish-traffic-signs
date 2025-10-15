import { Accessibility, Eye, Ear, Hand, Brain, Settings, CheckCircle } from 'lucide-react'

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <Accessibility className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Accessibility Statement
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We are committed to making Irish Traffic Signs accessible to everyone.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
                  Our Commitment
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    Irish Traffic Signs is committed to ensuring digital accessibility for people with disabilities. 
                    We are continually improving the user experience for everyone, and applying the relevant 
                    accessibility standards.
                  </p>
                  <p>
                    We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA standards.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Eye className="h-6 w-6 mr-3 text-green-600" />
                  Visual Accessibility
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>We have implemented the following features to support visual accessibility:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>High contrast color schemes and dark mode support</li>
                    <li>Scalable text and images that work with screen magnifiers</li>
                    <li>Clear visual hierarchy with proper heading structure</li>
                    <li>Alternative text for all images and icons</li>
                    <li>Focus indicators for keyboard navigation</li>
                    <li>Color is not the only means of conveying information</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Ear className="h-6 w-6 mr-3 text-green-600" />
                  Audio Accessibility
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>For users with hearing impairments, we provide:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Text alternatives for all audio content</li>
                    <li>Visual indicators for audio cues and notifications</li>
                    <li>Captions and transcripts for video content</li>
                    <li>Visual feedback for interactive elements</li>
                    <li>No reliance on audio-only instructions</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Hand className="h-6 w-6 mr-3 text-green-600" />
                  Motor Accessibility
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>To support users with motor disabilities, we offer:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Full keyboard navigation support</li>
                    <li>Large, easy-to-click buttons and interactive elements</li>
                    <li>No time limits on quizzes and learning activities</li>
                    <li>Customizable interaction methods</li>
                    <li>Skip links for efficient navigation</li>
                    <li>Touch-friendly interface for mobile devices</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Brain className="h-6 w-6 mr-3 text-green-600" />
                  Cognitive Accessibility
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>We support cognitive accessibility through:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Clear, simple language and instructions</li>
                    <li>Consistent navigation and layout patterns</li>
                    <li>Progress indicators and clear feedback</li>
                    <li>Option to save progress and resume later</li>
                    <li>Multiple ways to access the same information</li>
                    <li>Error prevention and clear error messages</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Settings className="h-6 w-6 mr-3 text-green-600" />
                  Assistive Technologies
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>Our platform is compatible with:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
                    <li>Voice recognition software</li>
                    <li>Switch navigation devices</li>
                    <li>Eye tracking systems</li>
                    <li>Screen magnifiers</li>
                    <li>Alternative input devices</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Accessibility Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                      Keyboard Navigation
                    </h3>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Use Tab, Shift+Tab, Enter, and arrow keys to navigate through all content.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                      Screen Reader Support
                    </h3>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      All content is properly labeled and structured for screen readers.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                      High Contrast Mode
                    </h3>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Toggle between light and dark themes for better visibility.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                      Text Scaling
                    </h3>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      All text scales with browser zoom up to 200% without horizontal scrolling.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Feedback and Support
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    We welcome your feedback on the accessibility of Irish Traffic Signs. If you encounter 
                    any accessibility barriers, please let us know:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p><strong>Email:</strong> accessibility@irishtrafficsigns.ie</p>
                    <p><strong>Phone:</strong> +353 1 234 5678</p>
                    <p><strong>Address:</strong> Irish Traffic Signs, Dublin, Ireland</p>
                  </div>
                  <p>
                    We aim to respond to accessibility feedback within 2 business days.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Ongoing Improvements
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    We are committed to continuously improving the accessibility of our platform. 
                    We regularly review and update our accessibility features based on user feedback 
                    and evolving standards.
                  </p>
                  <p>
                    This accessibility statement will be updated as we make improvements to our platform.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
