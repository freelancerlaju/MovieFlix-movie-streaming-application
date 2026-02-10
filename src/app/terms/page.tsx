import { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions - Movie Streaming Studio",
  description:
    "Read our terms and conditions for using Movie Streaming Studio services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center bg-linear-to-b from-primary/20 to-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <FileText className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our
            service
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
                  Welcome to Movie Streaming Studio. These Terms and Conditions
                  govern your use of our website and services. By accessing or
                  using our platform, you agree to be bound by these terms.
                </p>
              </div>

              {/* Account Terms */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">2. Account Terms</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>You must be 18 years or older to use this service</li>
                  <li>
                    You must provide accurate and complete information when
                    creating an account
                  </li>
                  <li>
                    You are responsible for maintaining the security of your
                    account
                  </li>
                  <li>
                    You are responsible for all activities that occur under your
                    account
                  </li>
                  <li>
                    You must notify us immediately of any unauthorized use of
                    your account
                  </li>
                </ul>
              </div>

              {/* Service Usage */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">3. Service Usage</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Movie Streaming Studio grants you a limited, non-exclusive,
                  non-transferable license to access and use our services for
                  personal, non-commercial purposes.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    Copy, modify, or distribute content without authorization
                  </li>
                  <li>
                    Use the service for any illegal or unauthorized purpose
                  </li>
                  <li>Attempt to bypass any security measures</li>
                  <li>Share your account credentials with others</li>
                  <li>Use automated systems to access the service</li>
                </ul>
              </div>

              {/* Content Rights */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">4. Content Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content available on Movie Streaming Studio, including but
                  not limited to movies, images, text, graphics, and logos, is
                  protected by copyright and other intellectual property rights.
                  These rights are owned by Movie Streaming Studio or our
                  content providers.
                </p>
              </div>

              {/* Subscription and Payment */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  5. Subscription and Payment
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    Subscriptions are billed in advance on a recurring basis
                  </li>
                  <li>Fees are non-refundable except as required by law</li>
                  <li>
                    We reserve the right to change subscription fees with notice
                  </li>
                  <li>You can cancel your subscription at any time</li>
                </ul>
              </div>

              {/* Termination */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">6. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to suspend or terminate your account at
                  our discretion, without notice, for conduct that we believe
                  violates these Terms or is harmful to other users, us, or
                  third parties, or for any other reason.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  7. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Movie Streaming Studio shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages
                  resulting from your use of or inability to use the service.
                </p>
              </div>

              {/* Changes to Terms */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">8. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. We
                  will notify users of any material changes. Your continued use
                  of the service after such modifications constitutes your
                  acceptance of the updated terms.
                </p>
              </div>

              {/* Governing Law */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">9. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance
                  with the laws of the State of California, United States,
                  without regard to its conflict of law provisions.
                </p>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">10. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <div className="text-muted-foreground">
                  <p>Email: legal@movies.com</p>
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
