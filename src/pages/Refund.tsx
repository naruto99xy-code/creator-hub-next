import { Layout } from '@/components/layout/Layout';

export default function Refund() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 glow-text">Refund Policy</h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Commitment</h2>
              <p>
                We want you to be completely satisfied with your purchase. If you're not happy 
                with a product, we're here to help.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Digital Products</h2>
              <p className="mb-4">
                Due to the nature of digital products, we offer refunds under the following conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Request must be made within 14 days of purchase</li>
                <li>Product must not have been substantially used</li>
                <li>Valid reason for dissatisfaction must be provided</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Membership Subscriptions</h2>
              <p className="mb-4">For membership subscriptions:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You can cancel anytime from your account settings</li>
                <li>Access continues until the end of your billing period</li>
                <li>Refunds for partial months are not provided</li>
                <li>First-time members can request a full refund within 7 days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">How to Request a Refund</h2>
              <p className="mb-4">To request a refund:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Contact us through our Support page</li>
                <li>Include your order number and email</li>
                <li>Explain the reason for your refund request</li>
                <li>We'll respond within 2-3 business days</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Processing Time</h2>
              <p>
                Once approved, refunds are typically processed within 5-10 business days. 
                The time it takes to appear in your account depends on your payment provider.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Exceptions</h2>
              <p className="mb-4">Refunds will not be granted in cases of:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Abuse of the refund policy</li>
                <li>Products that have been downloaded and used extensively</li>
                <li>Requests made after the refund window has closed</li>
              </ul>
            </section>

            <p className="text-sm mt-8">Last updated: January 2026</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
