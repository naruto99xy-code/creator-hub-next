import { Layout } from '@/components/layout/Layout';
import { AlertTriangle } from 'lucide-react';

export default function Refund() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="w-10 h-10 text-destructive" />
            <h1 className="text-4xl font-bold glow-text">No Refund Policy</h1>
          </div>
          
          <div className="p-6 bg-destructive/10 border border-destructive/30 rounded-lg mb-8">
            <p className="text-lg font-semibold text-destructive text-center">
              ⚠️ IMPORTANT: ALL SALES ARE FINAL. NO REFUNDS UNDER ANY CIRCUMSTANCES.
            </p>
          </div>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Strict No Refund Policy</h2>
              <p className="text-foreground font-medium">
                We do NOT offer refunds. Once you purchase a product and receive your access key, 
                the sale is final. No money will be refunded under any circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Digital Products</h2>
              <p className="mb-4">
                All our products are digital goods. Due to the nature of digital products:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li className="text-destructive font-medium">NO REFUNDS once access key is delivered</li>
                <li className="text-destructive font-medium">NO REFUNDS after product download</li>
                <li className="text-destructive font-medium">NO REFUNDS for change of mind</li>
                <li className="text-destructive font-medium">NO REFUNDS for any reason whatsoever</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Membership Subscriptions</h2>
              <p className="mb-4">For membership subscriptions:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You can cancel anytime from your account settings</li>
                <li>Access continues until the end of your billing period</li>
                <li className="text-destructive font-medium">NO REFUNDS for partial months</li>
                <li className="text-destructive font-medium">NO REFUNDS for unused time</li>
                <li className="text-destructive font-medium">NO REFUNDS even for first-time members</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Before You Purchase</h2>
              <p className="mb-4">
                Please review all product details carefully before making a purchase:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Read the product description thoroughly</li>
                <li>Check system requirements and compatibility</li>
                <li>Review all features and what's included</li>
                <li>Contact us with any questions BEFORE purchasing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Exceptions</h2>
              <p className="text-destructive font-medium">
                There are NO exceptions to our no refund policy. This policy applies to all customers 
                and all situations without exception.
              </p>
            </section>

            <p className="text-sm mt-8">Last updated: March 2026</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
