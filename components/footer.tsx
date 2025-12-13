'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Send,
  Heart,
  Facebook,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import darkLogo from '@/Logo/Website_logo_Copy-removebg-preview.png';
import lightLogo from '@/Logo/Logo_Copy-removebg-preview.png';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Web Development', href: '/services#web' },
    { name: 'AI Solutions', href: '/services#ai' },
    { name: 'Cloud Services', href: '/services#cloud' },
    { name: 'Mobile Apps', href: '/services#mobile' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#', color: '#1DA1F2' },
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: '#0A66C2' },
  { name: 'Facebook', icon: Facebook, href: '#', color: '#0A66C5' },
  { name: 'Instagram', icon: Instagram, href: '#', color: '#E4405F' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLogo =
    mounted && (theme === 'light' || resolvedTheme === 'light')
      ? lightLogo
      : darkLogo;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className='relative overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent' />
      </div>

      <div className='container mx-auto px-4 lg:px-8 relative'>
        <div className='py-24 border-b border-border/30 relative'>
          {/* Decorative Gradients Removed */}

          <div className='max-w-4xl mx-auto text-center relative z-10'>
            <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center mb-8 border border-primary/10 mx-auto'>
              <Sparkles className='w-8 h-8 text-primary' />
            </div>

            <h3 className='text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight'>
              Subscribe to Excellence
            </h3>
            <p className='text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed text-lg'>
              Join 20,000+ developers receiving our curated insights on
              engineering and design.
            </p>

            <form
              onSubmit={handleSubscribe}
              className='w-full max-w-md mx-auto relative group'
            >
              <div className='absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity duration-1000' />
              <div className='relative flex items-center bg-background border border-border hover:border-primary/50 rounded-full h-16 pl-6 pr-2 shadow-xl shadow-primary/5 transition-colors'>
                <Input
                  type='email'
                  placeholder='Enter your email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='flex-1 bg-transparent border-none h-full text-base placeholder:text-muted-foreground/50 focus-visible:ring-0 p-0 shadow-none focus-visible:ring-offset-0'
                  required
                />
                <Button
                  type='submit'
                  disabled={isSubscribed}
                  className='h-12 rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 font-bold transition-transform active:scale-95 ml-2'
                >
                  {isSubscribed ? (
                    <span className='flex items-center'>
                      Subscribed{' '}
                      <Heart className='ml-2 w-4 h-4 fill-current text-red-500' />
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </div>
              <p className='text-muted-foreground text-xs mt-4'>
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        {/* Main footer content */}
        <div className='py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12'>
          {/* Brand */}
          <div className='lg:col-span-2'>
            <Link href='/' className='flex items-center gap-3 mb-6 group'>
              <div className='relative transition-transform duration-300 group-hover:scale-105'>
                <Image
                  src={currentLogo}
                  alt='Somdev Solutions'
                  height={48}
                  className='h-12 w-auto object-contain'
                />
              </div>
            </Link>
            <p className='text-muted-foreground mb-8 max-w-sm leading-relaxed'>
              Transforming businesses through innovative technology solutions.
              We build the future, one project at a time.
            </p>
            <div className='space-y-4'>
              {[
                {
                  icon: Mail,
                  text: 'contact@somdevsolutions.com',
                  href: 'mailto:contact@somdevsolutions.com',
                },
                {
                  icon: Phone,
                  text: '+252 634223100',
                  href: 'tel:542842',
                },
                { icon: MapPin, text: 'Xidigta Area', href: '#' },
              ].map((item) => (
                <Link
                  key={item.text}
                  href={item.href}
                  className='flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group'
                >
                  <div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                    <item.icon className='w-4 h-4 text-primary' />
                  </div>
                  <span className='text-sm'>{item.text}</span>
                </Link>
              ))}
            </div>
          </div>

          {[
            { title: 'Company', links: footerLinks.company },
            { title: 'Services', links: footerLinks.services },
            { title: 'Resources', links: footerLinks.resources },
          ].map((column) => (
            <div key={column.title}>
              <h4 className='font-semibold text-foreground mb-6 text-sm uppercase tracking-wider'>
                {column.title}
              </h4>
              <ul className='space-y-4'>
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='text-muted-foreground hover:text-foreground transition-all text-sm flex items-center group'
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <ArrowRight
                        className={`w-3 h-3 mr-2 transition-all duration-300 ${
                          hoveredLink === link.name
                            ? 'opacity-100 translate-x-0 text-primary'
                            : 'opacity-0 -translate-x-2'
                        }`}
                      />
                      <span
                        className={
                          hoveredLink === link.name ? 'text-primary' : ''
                        }
                      >
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='border-t border-border/30 py-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <p className='text-sm text-muted-foreground flex items-center gap-1'>
              © {new Date().getFullYear()} Somdev Solutions. Made with
              <Heart className='w-4 h-4 text-red-500 fill-red-500 animate-pulse' />
              All rights reserved.
            </p>

            <div className='flex items-center gap-3'>
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className='group relative w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 overflow-hidden'
                  aria-label={social.name}
                >
                  <div
                    className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    style={{ backgroundColor: `${social.color}20` }}
                  />
                  <social.icon
                    className='w-5 h-5 relative z-10 group-hover:scale-110 transition-transform'
                    style={{
                      color:
                        hoveredLink === social.name ? social.color : undefined,
                    }}
                    onMouseEnter={() => setHoveredLink(social.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
