import { Link } from 'react-router-dom';
import { Coffee, Crown, Package } from 'lucide-react';

export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-card/95 backdrop-blur-xl border-t border-border/50 px-2 py-2 safe-area-pb">
        <div className="flex items-center justify-around gap-1">
          <Link
            to="/support"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <Coffee className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium">Support</span>
          </Link>
          <Link
            to="/membership"
            className="flex flex-col items-center gap-1 px-6 py-2 rounded-lg bg-primary/20 border border-primary/30"
          >
            <Crown className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-primary">Membership</span>
          </Link>
          <Link
            to="/shop"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <Package className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium">Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
