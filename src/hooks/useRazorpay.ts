import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth';

// Razorpay publishable key (safe for client-side usage)
const RAZORPAY_KEY_ID = 'rzp_live_SHJ1Thmo1tv1Z6';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PurchaseOptions {
  productName: string;
  price: number;
  userName: string;
  userMobile: string;
  themeColor?: string;
}

export function useRazorpay() {
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();

  const handlePurchase = async (productName: string, price: number) => {
    // Legacy compatibility — opens modal flow instead
    toast.error('Please use the purchase modal');
  };

  const handlePurchaseWithDetails = async ({ productName, price, userName, userMobile, themeColor }: PurchaseOptions) => {
    if (processing) return;

    if (!user) {
      toast.error('Please log in to continue');
      window.location.href = '/auth';
      return;
    }

    setProcessing(true);

    try {
      const session = (await supabase.auth.getSession()).data.session;
      if (!session) {
        toast.error('Please log in to continue');
        setProcessing(false);
        return;
      }

      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
        body: { productName, amount: price, userName, userMobile },
      });

      if (orderError || !orderData?.order_id) {
        toast.error('Failed to create order. Please try again.');
        setProcessing(false);
        return;
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: price * 100,
        currency: 'INR',
        name: 'Next Developer',
        description: productName,
        order_id: orderData.order_id,
        handler: async (response: any) => {
          try {
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-razorpay-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                product_name: productName,
                amount: price,
                user_name: userName,
                user_mobile: userMobile,
              },
            });

            if (verifyError || !verifyData?.success) {
              toast.error('Payment verification failed. Contact support.');
              setProcessing(false);
              return;
            }

            toast.success('Payment Successful 🎉');
            window.location.href = `/success?product=${encodeURIComponent(productName)}&payment_id=${response.razorpay_payment_id}`;
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
        prefill: {
          name: userName,
          contact: userMobile,
          email: user.email,
        },
        theme: { color: themeColor || '#6C5CE7' },
        notes: {
          source: 'nextdeveloper.in',
          product: productName,
        },
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

  return { handlePurchase, handlePurchaseWithDetails, processing };
}
