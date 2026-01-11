import { Layout } from '@/components/layout/Layout';

export default function Terms() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 glow-text">Terms of Service</h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Next Developer, you accept and agree to be bound by these 
                Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use of Services</h2>
              <p className="mb-4">You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the services in any way that violates applicable laws</li>
                <li>Share your account credentials with others</li>
                <li>Redistribute purchased content without permission</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Intellectual Property</h2>
              <p>
                All content, templates, and materials available through Next Developer are protected 
                by intellectual property rights. Purchasing a product grants you a license to use it 
                according to the specified license terms, but does not transfer ownership.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. User Accounts</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account and password. 
                You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Memberships</h2>
              <p>
                Membership subscriptions are billed on a recurring basis. You can cancel your 
                membership at any time, and you will continue to have access until the end of 
                your current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
              <p>
                Next Developer shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages resulting from your use or inability to use 
                the services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of 
                significant changes via email or through our platform.
              </p>
            </section>

            <p className="text-sm mt-8">Last updated: January 2026</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
