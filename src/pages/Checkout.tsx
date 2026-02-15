import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Shield, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const RAZORPAY_KEY_ID = 'rzp_test_SGJlMugI0Soq4A';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const { productName } = useParams<{ productName: string }>();
  const [searchParams] = useSearchParams();
  const price = Number(searchParams.get('price')) || 0;
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    // Load Razorpay script
    if (!document.getElementById('razorpay-script')) {
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const gst = Math.round(price * 0.18);
  const total = price + gst;
  const decodedName = decodeURIComponent(productName || '');

  const handlePayNow = async () => {
    if (processing || !user) return;
    setProcessing(true);

    try {
      const session = (await supabase.auth.getSession()).data.session;
      if (!session) {
        toast.error('Please log in to continue');
        setProcessing(false);
        return;
      }

      // 1. Create order
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
        body: { productName: decodedName, amount: total },
      });

      if (orderError || !orderData?.order_id) {
        toast.error('Failed to create order. Please try again.');
        setProcessing(false);
        return;
      }

      // 2. Open Razorpay checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: total * 100,
        currency: 'INR',
        name: 'Next Developer',
        description: decodedName,
        order_id: orderData.order_id,
        handler: async (response: any) => {
          try {
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-razorpay-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                product_name: decodedName,
                amount: total,
              },
            });

            if (verifyError || !verifyData?.success) {
              toast.error('Payment verification failed. Contact support.');
              setProcessing(false);
              return;
            }

            toast.success('Payment Successful 🎉');
            navigate('/dashboard');
          } catch {
            toast.error('Verification error. Contact support.');
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            toast.warning('Payment cancelled');
            setProcessing(false);
          },
        },
        prefill: { email: user.email },
        theme: { color: '#6C5CE7' },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        toast.error(`Payment failed: ${response.error.description}`);
        setProcessing(false);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
      setProcessing(false);
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 relative overflow-hidden min-h-[70vh] flex items-center">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-primary blur-[150px]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-secondary blur-[130px]"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Complete Your <span className="glow-text">Purchase</span>
              </h1>
              <p className="text-muted-foreground text-sm flex items-center justify-center gap-1.5">
                <Shield className="w-4 h-4" /> Secure payment powered by Razorpay
              </p>
            </div>

            {/* Payment card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-2xl opacity-40 blur-lg bg-gradient-to-r from-primary to-secondary group-hover:opacity-60 transition-opacity" />
              <div className="relative rounded-2xl border border-primary/20 bg-card/70 backdrop-blur-xl p-6 space-y-5">
                {/* Product info */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Product</p>
                  <p className="text-lg font-bold text-foreground">{decodedName}</p>
                </div>

                <div className="h-px bg-border" />

                {/* Summary */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="text-foreground font-medium">₹{price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="text-foreground font-medium">₹{gst}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{total}</span>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Email */}
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground">{user?.email}</p>
                </div>

                {/* Pay button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handlePayNow}
                  disabled={processing}
                  className="w-full py-3.5 rounded-lg font-semibold text-white text-sm relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(262 83% 58%))',
                    boxShadow: '0 0 25px hsl(var(--primary) / 0.4)',
                  }}
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                    </span>
                  ) : (
                    'Pay Now'
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
