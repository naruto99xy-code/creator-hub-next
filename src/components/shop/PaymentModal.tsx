import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Loader2, ShieldCheck } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, mobile: string) => void;
  productName: string;
  price: number;
  gradientFrom?: string;
  gradientTo?: string;
  processing: boolean;
}

export function PaymentModal({ isOpen, onClose, onConfirm, productName, price, gradientFrom = '#7c3aed', gradientTo = '#a855f7', processing }: PaymentModalProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState<{ name?: string; mobile?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; mobile?: boolean }>({});

  const validate = () => {
    const e: { name?: string; mobile?: string } = {};
    if (!name.trim()) e.name = 'Name is required';
    else if (name.trim().length > 100) e.name = 'Name too long';
    if (!mobile.trim()) e.mobile = 'Mobile is required';
    else if (!/^\d{10}$/.test(mobile.trim())) e.mobile = 'Enter valid 10-digit number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    setTouched({ name: true, mobile: true });
    if (validate()) onConfirm(name.trim(), mobile.trim());
  };

  const isValid = name.trim().length > 0 && /^\d{10}$/.test(mobile.trim());

  const handleBlur = (field: 'name' | 'mobile') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Processing overlay */}
          {processing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-[3px] border-transparent mb-6"
                style={{
                  borderTopColor: gradientTo,
                  borderRightColor: gradientFrom,
                  boxShadow: `0 0 30px ${gradientFrom}66, 0 0 60px ${gradientTo}33`,
                }}
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-foreground font-semibold text-lg"
              >
                Securing your payment...
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground text-sm mt-2"
              >
                Please do not close this window
              </motion.p>
            </motion.div>
          )}

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300, duration: 0.4 }}
            className="relative w-full max-w-md rounded-2xl bg-card/80 backdrop-blur-2xl p-7 overflow-hidden z-10"
            style={{
              boxShadow: `0 0 40px ${gradientFrom}22, 0 0 80px ${gradientTo}11, 0 25px 50px rgba(0,0,0,0.4)`,
              border: `1px solid ${gradientFrom}33`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Neon top border */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${gradientFrom}, ${gradientTo}, transparent)` }}
            />

            {/* Subtle corner glow */}
            <div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: gradientTo }}
            />

            <button
              onClick={onClose}
              disabled={processing}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors duration-200 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5" style={{ color: gradientTo }} />
              <h3 className="text-xl font-bold text-foreground">Complete Your Purchase</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-7">
              <span className="font-semibold" style={{ color: gradientTo }}>{productName}</span>
              <span className="mx-2">·</span>
              <span className="font-bold text-foreground">₹{price}</span>
              <span className="text-xs ml-1">(one-time)</span>
            </p>

            <div className="space-y-5">
              {/* Name field */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="Enter your full name"
                    maxLength={100}
                    disabled={processing}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/60 border text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 text-sm disabled:opacity-50"
                    style={{
                      borderColor: touched.name && errors.name ? 'hsl(var(--destructive))' : `${gradientFrom}33`,
                      boxShadow: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = gradientTo;
                      e.currentTarget.style.boxShadow = `0 0 12px ${gradientFrom}33`;
                    }}
                    onBlurCapture={(e) => {
                      if (!touched.name || !errors.name) {
                        e.currentTarget.style.borderColor = `${gradientFrom}33`;
                      }
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <AnimatePresence>
                  {touched.name && errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="text-xs text-destructive mt-1.5"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile field */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Mobile Number</label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    onBlur={() => handleBlur('mobile')}
                    placeholder="10-digit mobile number"
                    disabled={processing}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/60 border text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 text-sm disabled:opacity-50"
                    style={{
                      borderColor: touched.mobile && errors.mobile ? 'hsl(var(--destructive))' : `${gradientFrom}33`,
                      boxShadow: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = gradientTo;
                      e.currentTarget.style.boxShadow = `0 0 12px ${gradientFrom}33`;
                    }}
                    onBlurCapture={(e) => {
                      if (!touched.mobile || !errors.mobile) {
                        e.currentTarget.style.borderColor = `${gradientFrom}33`;
                      }
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <AnimatePresence>
                  {touched.mobile && errors.mobile && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="text-xs text-destructive mt-1.5"
                    >
                      {errors.mobile}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Submit button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={!isValid || processing}
              onClick={handleSubmit}
              className="w-full mt-7 py-3.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-400 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                boxShadow: isValid ? `0 0 25px ${gradientFrom}44` : 'none',
              }}
              onMouseEnter={(e) => {
                if (isValid && !processing) (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 40px ${gradientFrom}77`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = isValid ? `0 0 25px ${gradientFrom}44` : 'none';
              }}
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Proceed to Secure Payment
                </>
              )}
            </motion.button>

            <div className="flex items-center justify-center gap-2 mt-4">
              <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-[11px] text-muted-foreground">
                Secured by Razorpay · 256-bit encryption
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
