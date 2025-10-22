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
              These terms apply to the Irish Traffic Signs app and website provided as a Free educational service.
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
                    By accessing and using the Irish Traffic Signs application and website, you accept and agree to be bound by the 
                    terms and provision of this agreement. This service is provided "AS IS" for educational purposes only.
                  </p>
                  <p>
                    No registration is required to use this application. The service can be used anonymously without providing 
                    any personal information.
                  </p>
                  <p>
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Users className="h-6 w-6 mr-3 text-green-600" />
                  Educational Use License
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    Permission is granted to use Irish Traffic Signs for personal, non-commercial educational purposes only. 
                    This application is intended solely for learning Irish traffic signs and road safety education.
                  </p>
                  <p>
                    The application contains information compiled from open-source materials, Wikipedia, 
                    and other publicly available educational resources from the internet. Under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use the application for any commercial purpose</li>
                    <li>Redistribute or resell the content</li>
                    <li>Attempt to reverse engineer the software</li>
                    <li>Use the information for official driving tests or legal purposes</li>
                    <li>Claim ownership of the educational content</li>
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
                    <li>Use the service only for educational purposes</li>
                    <li>Not rely on this application for official driving tests or legal compliance</li>
                    <li>Verify traffic sign information through official Irish authorities when needed</li>
                    <li>Use the service in compliance with Irish laws and regulations</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                    <li>Understand that no registration or personal information is required</li>
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
                  Content Disclaimer and Sources
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    The information in this application is compiled from open-source materials, Wikipedia, 
                    and other publicly available educational resources from the internet. The content is provided on an 
                    'AS IS' basis for educational purposes only.
                  </p>
                  <p>
                    <strong>IMPORTANT DISCLAIMER:</strong> The Service Provider accepts no responsibility for the 
                    accuracy, completeness, or timeliness of the traffic sign information provided. Users should 
                    verify all information through official Irish authorities before relying on it for legal or 
                    official purposes.
                  </p>
                  <p>To the fullest extent permitted by Irish law, the Service Provider:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Makes no warranties regarding the accuracy of traffic sign information</li>
                    <li>Does not guarantee the completeness or timeliness of the educational content</li>
                    <li>Is not responsible for any errors or omissions in the compiled information</li>
                    <li>Disclaims liability for decisions made based on this educational content</li>
                    <li>Reserves the right to modify or discontinue the service at any time</li>
                    <li>Does not provide official driving test preparation or legal advice</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Limitation of Liability
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    In no event shall the Service Provider be liable for any direct, indirect, 
                    incidental, special, consequential, or punitive damages, including without limitation, loss of 
                    profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                  </p>
                  <p>
                    The Service Provider specifically disclaims liability for any consequences arising from:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Reliance on traffic sign information for official purposes</li>
                    <li>Use of the application for driving tests or legal compliance</li>
                    <li>Inaccuracies in the compiled educational content</li>
                    <li>Decisions made based on the educational materials provided</li>
                  </ul>
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
                    If you have any questions about these Terms of Service, please contact the Service Provider:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p><strong>Email:</strong> sign [at] emrebagcuvan [dot] com.tr</p>
                    <p><strong>Support Team:</strong> Irish Traffic Signs</p>
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Copyright Infringement Notice:</strong> For any copyright infringement claims, 
                        please contact us at the above email. We will respond within 1 week of receiving your notice.
                      </p>
                    </div>
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
