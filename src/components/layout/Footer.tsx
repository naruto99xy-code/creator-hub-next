import { Link, useLocation } from 'react-router-dom';
import { Code, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `text-sm transition-all duration-200 hover:text-primary hover:translate-x-1 inline-block ${
      isActive(path) ? 'text-primary font-medium' : 'text-muted-foreground'
    }`;

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary group-hover:shadow-lg group-hover:shadow-primary/25 transition-shadow">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold glow-text">Next Developer</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Learn. Build. Grow. Your journey to becoming a better developer starts here.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/support" className={linkClass('/support')}>
                  Support Me
                </Link>
              </li>
              <li>
                <Link to="/membership" className={linkClass('/membership')}>
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/shop" className={linkClass('/shop')}>
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className={linkClass('/blog')}>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className={linkClass('/tutorials')}>
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/docs" className={linkClass('/docs')}>
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className={linkClass('/privacy')}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className={linkClass('/terms')}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund" className={linkClass('/refund')}>
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Next Developer. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
