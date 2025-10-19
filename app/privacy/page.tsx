import { Shield, Lock, Eye, Database, UserCheck, FileText, AlertTriangle } from 'lucide-react'

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
              This privacy policy applies to the Irish Traffic Signs app and website created by Emre Bagcuvan as a Free service.
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
                  What information does the Application obtain and how is it used?
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    The Application does not obtain any personal information when you download and use it. 
                    Registration is not required to use the Application. All learning progress and favorites 
                    are stored locally on your device.
                  </p>
                  <p>
                    However, we do use Google Analytics to collect anonymous usage statistics to help us 
                    improve the application. This includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Page views and user interactions (anonymous)</li>
                    <li>Device and browser information</li>
                    <li>General geographic location (country/city level)</li>
                    <li>Usage patterns and popular features</li>
                  </ul>
                  <p>
                    No personally identifiable information is collected through Google Analytics.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-3 text-yellow-600" />
                  Content Sources and Disclaimer
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-lg">
                    <p className="font-semibold text-yellow-800 dark:text-yellow-200">
                      <strong>IMPORTANT DISCLAIMER:</strong> This application compiles educational content from open-source materials, 
                      Wikipedia, and publicly available internet resources. The content is NOT from official sources.
                    </p>
                  </div>
                  <p>
                    The Service Provider (Emre Bagcuvan) accepts no responsibility for the accuracy, completeness, 
                    or timeliness of the traffic sign information provided. This application is intended for 
                    educational purposes only.
                  </p>
                  <p>
                    <strong>Users must always verify traffic sign information through current official Irish authorities 
                    (such as the Road Safety Authority) before relying on it for:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Official driving tests or examinations</li>
                    <li>Legal compliance or official purposes</li>
                    <li>Professional driving or commercial use</li>
                    <li>Any situation requiring legally accurate information</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Eye className="h-6 w-6 mr-3 text-green-600" />
                  Does the Application collect precise real time location information of the device?
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    This Application does not collect precise information about the location of your mobile device.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Database className="h-6 w-6 mr-3 text-green-600" />
                  Do third parties see and/or have access to information obtained by the Application?
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    Since the Application does not collect any personal information, no personal data is shared with third parties.
                  </p>
                  <p>
                    However, we do use Google Analytics, which is a third-party service provided by Google Inc. 
                    Google Analytics may collect anonymous usage data as described above. This data is processed 
                    according to Google's Privacy Policy.
                  </p>
                  <p>
                    You can opt-out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on 
                    or by disabling cookies in your browser settings.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <UserCheck className="h-6 w-6 mr-3 text-green-600" />
                  What are my opt-out rights?
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    You can stop all collection of information by the Application easily by uninstalling it. 
                    You may use the standard uninstall processes as may be available as part of your mobile 
                    device or via the mobile application marketplace or network.
                  </p>
                  <p>
                    To opt-out of Google Analytics tracking, you can:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Install the Google Analytics Opt-out Browser Add-on</li>
                    <li>Disable cookies in your browser settings</li>
                    <li>Use private/incognito browsing mode</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileText className="h-6 w-6 mr-3 text-green-600" />
                  Children
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    The Application is not used to knowingly solicit data from or market to children under the age of 13.
                  </p>
                  <p>
                    The Service Provider does not knowingly collect personally identifiable information from children. 
                    The Service Provider encourages all children to never submit any personally identifiable information 
                    through the Application and/or Services. The Service Provider encourage parents and legal guardians 
                    to monitor their children's Internet usage and to help enforce this Policy by instructing their 
                    children never to provide personally identifiable information through the Application and/or Services 
                    without their permission.
                  </p>
                  <p>
                    If you have reason to believe that a child has provided personally identifiable information to the 
                    Service Provider through the Application and/or Services, please contact the Service Provider 
                    (emreba2@yandex.com) so that they will be able to take the necessary actions. You must also be at 
                    least 16 years of age to consent to the processing of your personally identifiable information in 
                    your country (in some countries we may allow your parent or guardian to do so on your behalf).
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Lock className="h-6 w-6 mr-3 text-green-600" />
                  Security
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    The Service Provider is concerned about safeguarding the confidentiality of your information. 
                    However, since the Application does not collect any personal information, there is no risk of 
                    your personal data being accessed by unauthorized individuals.
                  </p>
                  <p>
                    Google Analytics data is processed securely according to Google's security standards and privacy policies.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Eye className="h-6 w-6 mr-3 text-green-600" />
                  Changes
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    This Privacy Policy may be updated from time to time for any reason. The Service Provider will 
                    notify you of any changes to their Privacy Policy by updating this page with the new Privacy Policy. 
                    You are advised to consult this Privacy Policy regularly for any changes, as continued use is 
                    deemed approval of all changes.
                  </p>
                  <p>
                    This privacy policy is effective as of October 19, 2025.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <UserCheck className="h-6 w-6 mr-3 text-green-600" />
                  Your Consent
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    By using the Application, you are consenting to the processing of your information as set forth 
                    in this Privacy Policy now and as amended by the Service Provider.
                  </p>
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
                    <p><strong>Email:</strong> emreba2@yandex.com</p>
                    <p><strong>Developer:</strong> Emre Bagcuvan</p>
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
