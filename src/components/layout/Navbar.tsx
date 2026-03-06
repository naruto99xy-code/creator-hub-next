import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { GlowButton } from '@/components/ui/GlowButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, X, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/ai', label: 'AI' },
  { href: '/shop', label: 'Shop' },
  { href: '/support', label: 'Support' },
  { href: '/membership', label: 'Membership' },
];

export function Navbar() {
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="Next Developer logo" className="w-9 h-9 rounded-lg object-contain" />
            <span className="text-xl font-bold glow-text">Next Developer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <GlowButton variant="ghost" size="sm">
                      <Shield className="w-4 h-4" />
                      Admin
                    </GlowButton>
                  </Link>
                )}
                <Link to="/dashboard">
                  <GlowButton variant="secondary" size="sm">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </GlowButton>
                </Link>
                <GlowButton variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </GlowButton>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <GlowButton variant="ghost" size="sm">
                    Sign In
                  </GlowButton>
                </Link>
                <Link to="/auth?mode=signup">
                  <GlowButton variant="primary" size="sm">
                    Get Started
                  </GlowButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-base font-medium ${
                    location.pathname === link.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <div className="pt-2 space-y-2">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                        <GlowButton variant="ghost" size="sm" className="w-full justify-start">
                          <Shield className="w-4 h-4" />
                          Admin
                        </GlowButton>
                      </Link>
                    )}
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <GlowButton variant="secondary" size="sm" className="w-full justify-start">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </GlowButton>
                    </Link>
                    <GlowButton variant="ghost" size="sm" className="w-full justify-start" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </GlowButton>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <GlowButton variant="ghost" size="sm" className="w-full">
                        Sign In
                      </GlowButton>
                    </Link>
                    <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                      <GlowButton variant="primary" size="sm" className="w-full">
                        Get Started
                      </GlowButton>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
