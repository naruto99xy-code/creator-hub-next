import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Loader2 } from 'lucide-react';

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
    if (validate()) onConfirm(name.trim(), mobile.trim());
  };

  const isValid = name.trim().length > 0 && /^\d{10}$/.test(mobile.trim());

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative w-full max-w-md rounded-2xl border border-border bg-card/95 backdrop-blur-xl p-6 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gradient */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${gradientFrom}, ${gradientTo}, transparent)` }}
            />

            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-foreground mb-1">Complete Your Purchase</h3>
            <p className="text-sm text-muted-foreground mb-6">
              <span className="font-semibold" style={{ color: gradientTo }}>{productName}</span> — ₹{price}
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    maxLength={100}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  />
                </div>
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  />
                </div>
                {errors.mobile && <p className="text-xs text-destructive mt-1">{errors.mobile}</p>}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              disabled={!isValid || processing}
              onClick={handleSubmit}
              className="w-full mt-6 py-3 rounded-lg font-semibold text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-shadow duration-300"
              style={{
                background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                boxShadow: `0 0 20px ${gradientFrom}55`,
              }}
            >
              {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Pay ₹{price}
            </motion.button>

            <p className="text-[11px] text-muted-foreground text-center mt-3">
              Secured by Razorpay • 100% Safe Payment
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
