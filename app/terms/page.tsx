import { FileText, Scale, AlertTriangle, Shield, Users, Gavel } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <Scale className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Please read these terms carefully before using our educational platform.
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
                  <FileText className="h-6 w-6 mr-3 text-green-600" />
                  Acceptance of Terms
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    By accessing and using Irish Traffic Signs, you accept and agree to be bound by the 
                    terms and provision of this agreement.
                  </p>
                  <p>
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Users className="h-6 w-6 mr-3 text-green-600" />
                  Use License
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    Permission is granted to temporarily use Irish Traffic Signs for personal, 
                    non-commercial educational purposes. This is the grant of a license, not a 
                    transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-green-600" />
                  User Responsibilities
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>As a user of our platform, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information when creating an account</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Use the service only for lawful educational purposes</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                    <li>Respect the intellectual property rights of others</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-3 text-green-600" />
                  Prohibited Uses
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>You may not use our service:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Gavel className="h-6 w-6 mr-3 text-green-600" />
                  Disclaimer
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    The information on this website is provided on an 'as is' basis. To the fullest extent 
                    permitted by law, Irish Traffic Signs:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Excludes all representations and warranties relating to this website and its contents</li>
                    <li>Does not guarantee the accuracy, completeness, or timeliness of the information</li>
                    <li>Is not responsible for any errors or omissions in the content</li>
                    <li>Reserves the right to modify or discontinue the service at any time</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Limitation of Liability
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    In no event shall Irish Traffic Signs, nor its directors, employees, partners, agents, 
                    suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, 
                    or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                    or other intangible losses, resulting from your use of the service.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Governing Law
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    These terms shall be interpreted and governed by the laws of Ireland, without regard to 
                    its conflict of law provisions. Our failure to enforce any right or provision of these terms 
                    will not be considered a waiver of those rights.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Changes to Terms
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these terms at any time. 
                    If a revision is material, we will try to provide at least 30 days notice prior to any new 
                    terms taking effect.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p><strong>Email:</strong> legal@irishtrafficsigns.ie</p>
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
