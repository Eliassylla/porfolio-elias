import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isTransparent = location.pathname === '/' && !isScrolled;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isTransparent
          ? 'bg-transparent'
          : 'bg-background/90 backdrop-blur-lg border-b border-border shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className={cn(
              'text-lg font-bold tracking-tight transition-all duration-300',
              isTransparent
                ? 'text-primary-foreground hover:opacity-80'
                : 'text-foreground hover:text-foreground/80'
            )}
          >
            Elias · Automatisation
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors duration-300',
                  location.pathname === link.href
                    ? isTransparent
                      ? 'text-primary-foreground'
                      : 'text-foreground'
                    : isTransparent
                      ? 'text-primary-foreground/70 hover:text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact">
              <Button size="sm" variant={isTransparent ? 'secondary' : 'default'}>
                Réserver un appel
              </Button>
            </Link>
            <ThemeToggle />
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn('size-9', isTransparent && 'text-primary-foreground hover:bg-primary-foreground/10')}
                  aria-label="Ouvrir le menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80">
                <nav className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'text-lg font-medium text-left',
                        location.pathname === link.href
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="mt-4 w-full">
                      Réserver un appel
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
