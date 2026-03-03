import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

  const handlePurchase = async (productName: string, price: number) => {
    toast.error('Please use the purchase modal');
  };

  const handlePurchaseWithDetails = async ({ productName, price, userName, userMobile, themeColor }: PurchaseOptions) => {
    if (processing) return;
    setProcessing(true);

    try {
      // Call create-order without auth
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/create-razorpay-order`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productName, amount: price, userName, userMobile }),
        }
      );

      const orderData = await res.json();

      if (!res.ok || !orderData?.order_id) {
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
            const verifyRes = await fetch(
              `https://${projectId}.supabase.co/functions/v1/verify-razorpay-payment`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  product_name: productName,
                  amount: price,
                  user_name: userName,
                  user_mobile: userMobile,
                }),
              }
            );

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData?.success) {
              toast.error('Payment verification failed. Contact support.');
              setProcessing(false);
              return;
            }

            toast.success('Payment Successful 🎉');
            window.location.href = `/success?product=${encodeURIComponent(productName)}&payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&amount=${price}&name=${encodeURIComponent(userName)}&mobile=${encodeURIComponent(userMobile)}`;
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
