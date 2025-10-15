import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
                  <Lock className="h-6 w-6 mr-3 text-green-600" />
                  Information We Collect
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    We collect information you provide directly to us, such as when you create an account, 
                    use our services, or contact us for support.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Account information (email address, username)</li>
                    <li>Learning progress and quiz results</li>
                    <li>Favorite traffic signs and preferences</li>
                    <li>Communication data when you contact us</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Eye className="h-6 w-6 mr-3 text-green-600" />
                  How We Use Your Information
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide and improve our educational services</li>
                    <li>Track your learning progress and achievements</li>
                    <li>Personalize your learning experience</li>
                    <li>Send you important updates about our services</li>
                    <li>Respond to your inquiries and provide support</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Database className="h-6 w-6 mr-3 text-green-600" />
                  Data Storage and Security
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited access to personal information</li>
                    <li>Secure data centers with physical security</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <UserCheck className="h-6 w-6 mr-3 text-green-600" />
                  Your Rights
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate or incomplete data</li>
                    <li>Delete your account and associated data</li>
                    <li>Export your learning progress and data</li>
                    <li>Opt out of marketing communications</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileText className="h-6 w-6 mr-3 text-green-600" />
                  Cookies and Tracking
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                    and provide personalized content.
                </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Essential cookies for website functionality</li>
                    <li>Analytics cookies to understand usage patterns</li>
                    <li>Preference cookies to remember your settings</li>
                    <li>You can manage cookie preferences in your browser</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Us
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, 
                    please contact us at:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p><strong>Email:</strong> privacy@irishtrafficsigns.ie</p>
                    <p><strong>Address:</strong> Irish Traffic Signs, Dublin, Ireland</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
