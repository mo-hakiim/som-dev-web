'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/animations';
import darkLogo from '@/Logo/Website_logo_Copy-removebg-preview.png';
import lightLogo from '@/Logo/Logo_Copy-removebg-preview.png';
import { Menu, X, ChevronRight } from 'lucide-react';
import { GetStartedModal } from '@/components/get-started-modal';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Determine which logo to use
  const currentLogo =
    mounted && (theme === 'light' || resolvedTheme === 'light')
      ? lightLogo
      : darkLogo;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
          isScrolled ? 'py-4' : 'py-6'
        )}
      >
        <div
          className={cn(
            'mx-auto transition-all duration-500',
            isScrolled ? 'container max-w-6xl' : 'container'
          )}
        >
          <div
            className={cn(
              'relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500',
              isScrolled
                ? 'bg-card/80 backdrop-blur-xl border border-border shadow-lg'
                : 'bg-transparent'
            )}
          >
            {/* Logo */}
            <Link
              href='/'
              className='flex items-center gap-2 group relative z-50'
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className='relative transition-transform duration-300 group-hover:scale-105'>
                <Image
                  src={currentLogo}
                  alt='SomDev Logo'
                  height={40}
                  className='h-10 w-auto object-contain'
                />
                <div className='absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10' />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center gap-1'>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-full group overflow-hidden',
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                    onMouseEnter={() => setActiveHover(item.name)}
                    onMouseLeave={() => setActiveHover(null)}
                  >
                    <span className='relative z-10'>{item.name}</span>

                    {/* Active/Hover Background */}
                    <span
                      className={cn(
                        'absolute inset-0 bg-muted rounded-full transition-all duration-300 ease-out',
                        isActive || activeHover === item.name
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-90'
                      )}
                    />

                    {/* Active Indicator Dot */}
                    {isActive && (
                      <span className='absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]' />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className='hidden lg:flex items-center gap-4'>
              <ThemeToggle />
              <MagneticButton>
                <Button
                  size='sm'
                  onClick={() => setIsGetStartedOpen(true)}
                  className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:scale-105'
                >
                  Get Started
                </Button>
              </MagneticButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className='lg:hidden relative z-50 p-2 text-foreground'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-center items-center',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className='w-full max-w-md px-6 space-y-6'>
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center justify-between text-3xl font-bold py-4 border-b border-border transition-all duration-500 group',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                  isMobileMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{item.name}</span>
                <ChevronRight
                  className={cn(
                    'w-6 h-6 transition-transform duration-300',
                    isActive
                      ? 'opacity-100'
                      : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
                  )}
                />
              </Link>
            );
          })}

          <div
            className={cn(
              'pt-8 transition-all duration-500 delay-300',
              isMobileMenuOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            )}
          >
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsGetStartedOpen(true);
              }}
              className='w-full py-6 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(var(--primary),0.3)]'
            >
              Start Your Project
            </Button>
          </div>
        </div>
      </div>

      {/* Get Started Modal */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </>
  );
}
