import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - Movie Streaming Studio",
  description:
    "Learn about how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center bg-linear-to-b from-primary/20 to-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we protect your data.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="rounded-lg border bg-card p-6 md:p-8">
            <p className="text-sm text-muted-foreground mb-6">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              {/* Introduction */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Movie Streaming Studio ("we," "our," or "us") is committed to
                  protecting your privacy. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you use our service.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  2. Information We Collect
                </h2>
                <h3 className="text-xl font-semibold">Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information that you provide directly to us,
                  including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    Name and contact information (email address, phone number)
                  </li>
                  <li>Account credentials (username and password)</li>
                  <li>
                    Payment information (processed securely through third-party
                    providers)
                  </li>
                  <li>Profile information and preferences</li>
                  <li>Communication history with our support team</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6">
                  Automatically Collected Information
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  When you use our service, we automatically collect:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    Device information (IP address, browser type, operating
                    system)
                  </li>
                  <li>
                    Usage data (viewing history, search queries, preferences)
                  </li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Log data (access times, pages viewed, app crashes)</li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  3. How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide, maintain, and improve our services</li>
                  <li>
                    Process your transactions and manage your subscription
                  </li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>
                    Personalize your experience and provide recommendations
                  </li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>
                    Detect, prevent, and address technical issues and security
                    threats
                  </li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              {/* Information Sharing */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  4. Information Sharing and Disclosure
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may share your information in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    <strong>Service Providers:</strong> With third-party vendors
                    who perform services on our behalf
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with any
                    merger, sale, or acquisition
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law or
                    to protect our rights
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> When you explicitly
                    agree to share your information
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </div>

              {/* Data Security */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. These measures
                  include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Employee training on data protection</li>
                </ul>
              </div>

              {/* Your Rights */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  6. Your Rights and Choices
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You have the following rights regarding your personal
                  information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    <strong>Access:</strong> Request a copy of your personal
                    information
                  </li>
                  <li>
                    <strong>Correction:</strong> Update or correct inaccurate
                    information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal
                    information
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Unsubscribe from marketing
                    communications
                  </li>
                  <li>
                    <strong>Data Portability:</strong> Receive your data in a
                    structured format
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To exercise these rights, please contact us at
                  privacy@movies.com
                </p>
              </div>

              {/* Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  7. Cookies and Tracking Technologies
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to track
                  activity on our service and store certain information. You can
                  instruct your browser to refuse all cookies or to indicate
                  when a cookie is being sent. However, if you do not accept
                  cookies, you may not be able to use some portions of our
                  service.
                </p>
              </div>

              {/* Children's Privacy */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">8. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service is not intended for children under the age of 18.
                  We do not knowingly collect personal information from children
                  under 18. If you become aware that a child has provided us
                  with personal information, please contact us immediately.
                </p>
              </div>

              {/* International Data Transfers */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  9. International Data Transfers
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and maintained on
                  computers located outside of your state, province, country, or
                  other governmental jurisdiction where data protection laws may
                  differ. We ensure appropriate safeguards are in place for such
                  transfers.
                </p>
              </div>

              {/* Changes to Privacy Policy */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  10. Changes to This Privacy Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date. You are
                  advised to review this Privacy Policy periodically for any
                  changes.
                </p>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">11. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <div className="text-muted-foreground">
                  <p>Email: privacy@movies.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Movie Street, Los Angeles, CA 90028</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
