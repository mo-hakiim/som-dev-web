'use client';

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  type MouseEvent,
} from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Sparkles,
  Code2,
  Brain,
  Cloud,
  Smartphone,
  Shield,
  Zap,
  ArrowUpRight,
  ExternalLink,
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  TrendingUp,
  Users,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CursorFollow, CursorProvider } from '@/components/ui/custom-cursor';
import { CometCard } from '@/components/ui/comet-card';
import {
  AnimatedCounter,
  MagneticButton,
  ScrollReveal,
  TiltCard,
} from '@/components/animations';
import { ServiceDetailModal } from '@/components/service-detail-modal';
import { PremiumButton } from '@/components/ui/premium-button';
import { GetStartedModal } from '@/components/get-started-modal';

// --- Hero Section ---

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
}

function useMagneticEffect(
  ref: React.RefObject<HTMLElement | null>,
  strength = 0.3
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
      element.style.transition = 'transform 0.3s ease-out';
    };

    const handleMouseEnter = () => {
      element.style.transition = 'none';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [ref, strength]);
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
  const scrollYRef = useRef(0);
  const heroRef = useRef<HTMLElement>(null);
  const magneticBtnRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useMagneticEffect(magneticBtnRef, 0.2);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mousePositionRef.current = { x, y };
  }, []);

  const handleScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleArray: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
    }[] = [];

    for (let i = 0; i < 80; i++) {
      particleArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.4 + 0.1,
        hue: 180 + Math.random() * 40,
      });
    }

    // Get theme colors
    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return {
        particle: isDark ? 'hsla(180, 70%, 60%, ' : 'hsla(220, 70%, 40%, ',
        line: isDark ? 'hsla(180, 60%, 50%, ' : 'hsla(220, 60%, 40%, ',
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = getThemeColors();

      // Canvas Particles
      particleArray.forEach((particle, index) => {
        particle.x +=
          particle.speedX + (mousePositionRef.current.x - 0.5) * 0.5;
        particle.y +=
          particle.speedY + (mousePositionRef.current.y - 0.5) * 0.5;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${colors.particle}${particle.opacity})`;
        ctx.fill();

        particleArray.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `${colors.line}${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // DOM Parallax Updates
      if (heroRef.current) {
        const { x, y } = mousePositionRef.current;
        const scroll = scrollYRef.current;

        // Update Parallax Layers
        const layers = heroRef.current.querySelectorAll('.parallax-layer');
        layers.forEach((layer) => {
          const el = layer as HTMLElement;
          const depth = parseFloat(el.getAttribute('data-depth') || '0');
          const scrollSpeed = parseFloat(
            el.getAttribute('data-scroll-speed') || '0'
          );
          const moveX = (x - 0.5) * depth * 50;
          const moveY = (y - 0.5) * depth * 50;
          const moveScroll = scroll * scrollSpeed;
          el.style.transform = `translate3d(${moveX}px, ${
            moveY + moveScroll
          }px, 0)`;
        });

        // Update 3D Grid
        const grid = heroRef.current.querySelector('.hero-grid-3d');
        if (grid) {
          (
            grid as HTMLElement
          ).style.transform = `perspective(1000px) rotateX(${
            (y - 0.5) * 5
          }deg) rotateY(${(x - 0.5) * 5}deg)`;
        }

        // Update Spotlight
        const spotlight = heroRef.current.querySelector('.hero-spotlight');
        if (spotlight) {
          (spotlight as HTMLElement).style.left = `${x * 100 - 40}%`;
          (spotlight as HTMLElement).style.top = `${y * 100 - 40}%`;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <CursorProvider>
      <section
        ref={heroRef}
        className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20'
      >
        {/* Gradient Background Overlay - Adapts to theme */}
        <div className='absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-0' />

        <canvas
          ref={canvasRef}
          className='absolute inset-0 pointer-events-none z-[1]'
          style={{ opacity: 0.6 }}
        />

        <div className='absolute inset-0 overflow-hidden z-[2]'>
          <div
            className='hero-spotlight absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 dark:opacity-20 opacity-10'
            style={{
              background:
                'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
              left: '10%', // Initial position
              top: '10%',
              transition: 'left 0.8s ease-out, top 0.8s ease-out',
            }}
          />

          <div
            className='parallax-layer absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-float'
            data-depth='0.3'
          />
          <div
            className='parallax-layer absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float'
            style={{ animationDelay: '2s' }}
            data-depth='0.5'
          />
          <div
            className='parallax-layer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-glow'
            data-depth='0.2'
            style={{
              background:
                'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            }}
          />

          <div
            className='hero-grid-3d absolute inset-0'
            style={{
              backgroundImage: `
              linear-gradient(color-mix(in srgb, var(--primary), transparent 95%) 1px, transparent 1px),
              linear-gradient(90deg, color-mix(in srgb, var(--primary), transparent 95%) 1px, transparent 1px)
            `,
              backgroundSize: '100px 100px',
              transition: 'transform 0.3s ease-out',
            }}
          />

          <div
            className='parallax-layer absolute top-20 left-20 w-32 h-32 opacity-15'
            data-depth='0.8'
            data-scroll-speed='-0.1'
          >
            <div
              className='w-full h-full border border-primary/30 rounded-2xl rotate-45 animate-float'
              style={{ animationDuration: '8s' }}
            />
            <div
              className='absolute inset-2 border border-primary/20 rounded-xl rotate-12 animate-float'
              style={{ animationDuration: '6s', animationDelay: '1s' }}
            />
          </div>

          <div
            className='parallax-layer absolute bottom-32 right-32 w-40 h-40 opacity-15'
            data-depth='0.6'
            data-scroll-speed='-0.15'
          >
            <div
              className='w-full h-full border border-primary/30 rounded-full animate-float'
              style={{ animationDuration: '10s' }}
            />
            <div
              className='absolute inset-4 border border-primary/20 rounded-full animate-float'
              style={{ animationDuration: '7s', animationDelay: '0.5s' }}
            />
          </div>

          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className='absolute w-[1px] h-[40vh] bg-gradient-to-t from-primary/0 via-primary/10 to-primary/0'
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  opacity: 0.3,
                  animation: `pulse-line 4s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className='relative container mx-auto px-4 lg:px-8 text-center z-10'>
          <div
            className={`space-y-8 transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div
              className='inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 text-sm animate-scale-in relative overflow-hidden group mt-5'
              style={{ animationDelay: '0.2s' }}
            >
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />
              <Sparkles className='w-4 h-4 text-primary animate-pulse' />
              <span className='text-muted-foreground'>
                Innovating the Future of Technology
              </span>
            </div>

            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight text-balance'>
              <span className='inline-block overflow-hidden'>
                <span
                  className='inline-block animate-fade-in-up'
                  style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
                >
                  Building
                </span>
              </span>{' '}
              <span className='inline-block overflow-hidden'>
                <span
                  className='relative inline-block animate-fade-in-up text-primary'
                  style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
                >
                  World-Class
                  <svg
                    className='absolute w-[105%] h-4 -bottom-1 -left-[2.5%] text-primary animate-expand origin-left'
                    viewBox='0 0 100 10'
                    preserveAspectRatio='none'
                  >
                    <path
                      d='M0 5 Q 50 10 100 5'
                      stroke='currentColor'
                      strokeWidth='4'
                      fill='none'
                      strokeLinecap='round'
                    />
                  </svg>
                </span>
              </span>
              <br />
              <span className='inline-block overflow-hidden'>
                <span
                  className='inline-block animate-fade-in-up'
                  style={{ animationDelay: '0.7s', animationFillMode: 'both' }}
                >
                  Digital Solutions
                </span>
              </span>
            </h1>

            <p
              className='text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty animate-fade-in-up'
              style={{ animationDelay: '0.9s', animationFillMode: 'both' }}
            >
              Enterprise-grade technology solutions that scale with your
              ambitions and deliver measurable business results.
            </p>

            <div
              className='flex flex-col sm:flex-row gap-6 justify-center pt-4 animate-fade-in-up'
              style={{ animationDelay: '1.1s', animationFillMode: 'both' }}
            >
              <div ref={magneticBtnRef}>
                <PremiumButton
                  variant='glow'
                  size='lg'
                  magnetic
                  onClick={() => setIsGetStartedOpen(true)}
                  icon={<ArrowRight className='w-5 h-5' />}
                >
                  Start Your Project
                </PremiumButton>
              </div>
              <Link href='/projects'>
                <PremiumButton variant='outline' size='lg' glow>
                  View Our Work
                </PremiumButton>
              </Link>
            </div>

            <div
              className='pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up'
              style={{ animationDelay: '1.3s', animationFillMode: 'both' }}
            >
              {[
                { value: 150, label: 'Projects Delivered', suffix: '+' },
                { value: 50, label: 'Happy Clients', suffix: '+' },
                { value: 5, label: 'Years Experience', suffix: '+' },
                { value: 99, label: 'Client Satisfaction', suffix: '%' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className='text-center group cursor-default'
                  style={{ animationDelay: `${1.4 + index * 0.1}s` }}
                >
                  <div className='relative inline-block'>
                    <div className='text-3xl md:text-4xl lg:text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-300'>
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className='absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10' />
                  </div>
                  <div className='text-sm md:text-base text-muted-foreground mt-2 group-hover:text-foreground/80 transition-colors duration-300'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className='parallax-layer absolute top-1/4 left-8 lg:left-16 hidden lg:block'
            data-depth='1'
            data-scroll-speed='-0.2'
          >
            <div className='relative w-24 h-24'>
              <div
                className='absolute inset-0 glass rounded-2xl rotate-12 animate-float shadow-lg shadow-primary/10'
                style={{ animationDuration: '7s' }}
              >
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent' />
              </div>
              <div
                className='absolute inset-2 glass rounded-xl -rotate-6 animate-float'
                style={{ animationDuration: '5s', animationDelay: '0.5s' }}
              />
            </div>
          </div>

          <div
            className='parallax-layer absolute top-1/3 right-8 lg:right-16 hidden lg:block'
            data-depth='0.8'
            data-scroll-speed='-0.15'
          >
            <div className='relative w-20 h-20'>
              <div
                className='absolute inset-0 glass rounded-xl -rotate-12 animate-float shadow-lg shadow-primary/10'
                style={{ animationDuration: '6s', animationDelay: '1s' }}
              >
                <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-transparent' />
              </div>
            </div>
          </div>

          <div
            className='parallax-layer absolute bottom-1/3 left-1/4 hidden lg:block'
            data-depth='0.6'
            data-scroll-speed='-0.1'
          >
            <div className='relative w-16 h-16'>
              <div
                className='absolute inset-0 glass rounded-lg rotate-45 animate-float shadow-lg shadow-primary/10'
                style={{ animationDuration: '8s', animationDelay: '2s' }}
              >
                <div className='absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 to-transparent' />
              </div>
            </div>
          </div>

          <div
            className='parallax-layer absolute bottom-1/4 right-1/3 w-8 h-8 rounded-full bg-primary/30 blur-sm animate-float hidden lg:block'
            style={{
              animationDuration: '5s',
              animationDelay: '1.5s',
            }}
            data-depth='1.2'
          />
          <div
            className='parallax-layer absolute top-1/2 left-1/3 w-6 h-6 rounded-full bg-primary/20 blur-sm animate-float hidden lg:block'
            style={{
              animationDuration: '6s',
              animationDelay: '2.5s',
            }}
            data-depth='0.9'
          />
        </div>

        <div
          className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-fade-in-up'
          style={{ animationDelay: '1.5s', animationFillMode: 'both' }}
        >
          <span className='text-xs tracking-widest uppercase opacity-60'>
            Scroll to explore
          </span>
          <div className='w-7 h-12 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2 relative overflow-hidden'>
            <div className='w-1.5 h-3 bg-primary rounded-full animate-scroll-indicator' />
          </div>
          <div className='flex flex-col gap-1 opacity-40'>
            <svg
              className='w-4 h-4 animate-bounce'
              style={{ animationDelay: '0s' }}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </div>
        <GetStartedModal
          isOpen={isGetStartedOpen}
          onClose={() => setIsGetStartedOpen(false)}
        />
      </section>
    </CursorProvider>
  );
}

// --- Trusted Companies ---

export function TrustedCompanies() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const companies = [
    {
      name: 'Telesom',
      logo: 'https://telesom.so/wp-content/uploads/2023/06/Logo-Blue.svg',
      color: '#0668E1',
      website: 'https://telesom.so',
    },
    {
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
      color: '#00A4EF',
      website: 'https://microsoft.com',
    },
    {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      color: '#FF9900',
      website: 'https://amazon.com',
    },
    {
      name: 'Telesom',
      logo: 'https://imgs.search.brave.com/LS_b9KgvzPTPagXmzoSzMLRik6uKYGnr-Azw5bIutxQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8zLzNlL1Rl/bGVzb21fbG9nby5w/bmcvNTEycHgtVGVs/ZXNvbV9sb2dvLnBu/Zw',
      color: '#A2AAAD',
      // website: 'https://telesom.so',
    },
    {
      name: 'Netflix',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
      color: '#E50914',
      website: 'https://netflix.com',
    },
    {
      name: 'Spotify',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
      color: '#1DB954',
      website: 'https://spotify.com',
    },
    {
      name: 'Airbnb',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',
      color: '#FF5A5F',
      website: 'https://airbnb.com',
    },
    {
      name: 'Uber',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png',
      color: '#000000',
      website: 'https://uber.com',
    },
    {
      name: 'Slack',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
      color: '#4A154B',
      website: 'https://slack.com',
    },
    {
      name: 'Stripe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
      color: '#635BFF',
      website: 'https://stripe.com',
    },
    {
      name: 'Shopify',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
      color: '#96BF48',
      website: 'https://shopify.com',
    },
    {
      name: 'Adobe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg',
      color: '#FF0000',
      website: 'https://adobe.com',
    },
  ];

  return (
    <section className='py-24 overflow-hidden relative'>
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse-slow' />
        <div className='absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000' />
      </div>

      <div className='container mx-auto px-4 lg:px-8 mb-16 relative'>
        <div className='text-center'>
          <p className='text-primary text-sm font-medium uppercase tracking-widest mb-4 animate-fade-in'>
            Trusted Worldwide
          </p>
          <h3 className='text-2xl md:text-3xl font-bold text-foreground text-balance'>
            Powering Innovation for Industry Leaders
          </h3>
        </div>
      </div>

      <div
        ref={containerRef}
        className='relative'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className='absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10' />
        <div className='absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10' />

        <div
          className={`flex mb-6 ${isPaused ? 'animation-paused' : ''}`}
          style={{ animation: 'marquee 40s linear infinite' }}
        >
          {[...companies, ...companies, ...companies].map((company, index) => (
            <div
              key={`row1-${company.name}-${index}`}
              className='flex items-center justify-center mx-4 flex-shrink-0'
            >
              <a
                href={company.website}
                target='_blank'
                rel='noopener noreferrer'
                className='group glass rounded-2xl px-6 py-4 flex items-center gap-4 hover:bg-secondary/50 transition-all duration-300 hover:scale-105 cursor-pointer border border-border hover:border-primary/20 bg-card/50'
              >
                <div className='w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg p-2 bg-background border border-border'>
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-110'
                  />
                </div>
                <span className='text-foreground font-medium whitespace-nowrap group-hover:text-primary transition-colors'>
                  {company.name}
                </span>
              </a>
            </div>
          ))}
        </div>

        <div
          className={`flex ${isPaused ? 'animation-paused' : ''}`}
          style={{ animation: 'marquee-reverse 45s linear infinite' }}
        >
          {[
            ...companies.slice().reverse(),
            ...companies.slice().reverse(),
            ...companies.slice().reverse(),
          ].map((company, index) => (
            <div
              key={`row2-${company.name}-${index}`}
              className='flex items-center justify-center mx-4 flex-shrink-0'
            >
              <a
                href={company.website}
                target='_blank'
                rel='noopener noreferrer'
                className='group glass rounded-2xl px-6 py-4 flex items-center gap-4 hover:bg-secondary/50 transition-all duration-300 hover:scale-105 cursor-pointer border border-border hover:border-primary/20 bg-card/50'
              >
                <div className='w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg p-2 bg-background border border-border'>
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-110'
                  />
                </div>
                <span className='text-foreground font-medium whitespace-nowrap group-hover:text-primary transition-colors'>
                  {company.name}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Services Preview ---

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description:
      'Custom web applications built with cutting-edge technologies for optimal performance and scalability.',
    color: '#00D4FF',
    features: ['React & Next.js', 'API Development', 'E-commerce'],
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description:
      'Intelligent solutions powered by machine learning and artificial intelligence to automate your workflows.',
    color: '#A855F7',
    features: ['Machine Learning', 'NLP & Chatbots', 'Predictive Analytics'],
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description:
      'Scalable cloud infrastructure and migration services for seamless digital transformation.',
    color: '#22C55E',
    features: ['AWS & Azure', 'Cloud Migration', 'DevOps'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description:
      'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    color: '#F59E0B',
    features: ['iOS & Android', 'React Native', 'Flutter'],
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description:
      'Comprehensive security solutions to protect your digital assets and customer data.',
    color: '#EF4444',
    features: ['Security Audits', 'Penetration Testing', 'Compliance'],
  },
  {
    icon: Zap,
    title: 'Performance',
    description:
      'Optimization services to ensure lightning-fast load times and superior performance.',
    color: '#06B6D4',
    features: ['Speed Optimization', 'SEO', 'Analytics'],
  },
];

export function ServicesPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <section className='py-32 relative overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow' />
        <div className='absolute top-1/4 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000' />
        <div className='absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000' />
        <div className='absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.02)_1px,transparent_1px)] bg-[size:80px_80px]' />
      </div>

      <div className='container mx-auto px-4 lg:px-8 relative'>
        <ScrollReveal>
          <div className='text-center mb-20'>
            <p className='text-primary text-sm font-medium uppercase tracking-widest mb-4'>
              What We Offer
            </p>
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance'>
              Our <span className='text-gradient-animated'>Services</span>
            </h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              We offer comprehensive technology solutions tailored to your
              business needs, delivered with excellence.
            </p>
          </div>
        </ScrollReveal>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 100}>
              <CometCard glowColor={service.color}>
                <div
                  onClick={() => setSelectedService(service)}
                  className='group/card relative flex flex-col rounded-3xl bg-card border border-border p-8 transition-all duration-500 hover:shadow-2xl h-full overflow-hidden cursor-pointer hover:-translate-y-2'
                >
                  {/* Top colored bar */}
                  <div
                    className='absolute top-0 left-0 right-0 h-1.5 opacity-100 transition-opacity duration-500'
                    style={{ backgroundColor: service.color }}
                  />

                  {/* Radial glow effect */}
                  <div
                    className='absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover/card:opacity-10 blur-3xl transition-opacity duration-700'
                    style={{ backgroundColor: service.color }}
                  />

                  {/* Icon */}
                  <div className='relative mb-8'>
                    <div className='w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover/card:scale-110 bg-background shadow-sm border border-border'>
                      <service.icon
                        className='w-8 h-8 transition-all duration-500'
                        style={{ color: service.color }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className='text-2xl font-bold text-foreground mb-4 group-hover/card:translate-x-1 transition-transform duration-500'>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className='text-muted-foreground text-base leading-relaxed mb-6 flex-grow'>
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className='space-y-3 mb-6'>
                    {service.features.map((feature, idx) => (
                      <div
                        key={feature}
                        className='flex items-center gap-3 opacity-80 group-hover/card:opacity-100 transition-all duration-500'
                        style={{ transitionDelay: `${idx * 100}ms` }}
                      >
                        <div
                          className='w-1.5 h-1.5 rounded-full'
                          style={{ backgroundColor: service.color }}
                        />
                        <span className='text-sm text-foreground/80 font-medium'>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className='flex items-center gap-2 text-sm font-bold group-hover/card:gap-3 transition-all duration-300 mt-auto'>
                    <span style={{ color: service.color }}>
                      Explore Service
                    </span>
                    <ArrowRight
                      className='w-4 h-4 transition-transform duration-300 group-hover/card:translate-x-1'
                      style={{ color: service.color }}
                    />
                  </div>
                </div>
              </CometCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceDetailModal
          isOpen={!!selectedService}
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}

// --- Project Detail Modal ---

function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  onStartProject,
}: {
  project: any;
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}) {
  if (!isOpen || !project) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 font-sans'>
      {/* Cinematic Backdrop */}
      <div
        className='absolute inset-0 bg-white/60 dark:bg-[#020202]/80 backdrop-blur-xl transition-all duration-700'
        onClick={onClose}
      />

      {/* COMPACT Card (Minimized & Theme-Colored) */}
      <div className='relative w-full max-w-5xl h-[70vh] min-h-[500px] bg-[#fafafa] dark:bg-black rounded-[2.5rem] overflow-hidden animate-in fade-in zoom-in-[0.98] duration-500 flex flex-col lg:flex-row shadow-2xl border border-black/5 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5'>
        {/* Dynamic Background Mesh (Monochrome/Subtle) */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-100'>
          <div className='absolute top-[-50%] left-[-20%] w-[1000px] h-[1000px] rounded-full blur-[150px] opacity-20 dark:opacity-10 bg-zinc-200 dark:bg-white/10 animate-pulse-slow' />
          <div className='absolute bottom-[-50%] right-[-20%] w-[1000px] h-[1000px] rounded-full blur-[150px] opacity-20 dark:opacity-10 bg-zinc-200 dark:bg-white/10 animate-pulse-slow delay-1000' />
        </div>

        {/* Close Button (Floating) */}
        <button
          onClick={onClose}
          className='absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/5 dark:border-white/5 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-all duration-300 backdrop-blur-md group hover:rotate-90'
        >
          <X className='w-4 h-4 transition-transform duration-300' />
        </button>

        {/* LEFT: Immersive Visual (55%) */}
        <div className='hidden lg:block lg:w-[55%] relative h-full overflow-hidden'>
          {/* Image Contrast Layer */}
          <div className='absolute inset-0 bg-black/5 dark:bg-black/40 z-10' />
          <img
            src={project.image || '/placeholder.svg'}
            alt={project.title}
            className='w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-[3s] ease-out'
          />

          {/* Overlay Content */}
          <div className='absolute bottom-0 left-0 right-0 p-12 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg'>
                <span className='text-[10px] font-bold uppercase tracking-[0.2em] text-white'>
                  {project.category}
                </span>
              </div>
            </div>

            <h1 className='text-5xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-xl font-display'>
              {project.title}
            </h1>

            <div className='flex items-center gap-8'>
              <div className='flex flex-col'>
                <span className='text-3xl font-bold text-white'>
                  {project.stats.growth}
                </span>
                <span className='text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1'>
                  Growth
                </span>
              </div>
              <div className='w-px h-10 bg-white/20' />
              <div className='flex flex-col'>
                <span className='text-3xl font-bold text-white'>
                  {project.stats.users}
                </span>
                <span className='text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1'>
                  Users
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Compact Details Panel (45%) */}
        <div className='flex-1 bg-white/90 dark:bg-[#08080A]/95 backdrop-blur-3xl border-l border-black/5 dark:border-white/5 p-8 flex flex-col justify-center relative z-20 text-zinc-900 dark:text-white'>
          {/* Mobile Header */}
          <div className='lg:hidden mb-6'>
            <h1 className='text-3xl font-bold text-foreground mb-1 font-display'>
              {project.title}
            </h1>
          </div>

          <div className='flex flex-col justify-between h-full py-2'>
            {/* Description Section */}
            <div className='text-center space-y-6'>
              <div className='flex justify-center'>
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10'>
                  <Sparkles className='w-4 h-4 text-zinc-900 dark:text-white' />
                  <span className='text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white'>
                    About Project
                  </span>
                </div>
              </div>
              <p className='text-base text-zinc-600 dark:text-white/70 font-light leading-relaxed text-center line-clamp-5'>
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <div className='h-px flex-1 bg-black/5 dark:bg-white/10' />
                <span className='text-[10px] font-bold text-zinc-400 dark:text-white/30 uppercase tracking-widest'>
                  Technologies
                </span>
                <div className='h-px flex-1 bg-black/5 dark:bg-white/10' />
              </div>

              <div className='flex flex-wrap justify-center gap-2'>
                {project.tags.map((tag: string) => (
                  <div
                    key={tag}
                    className='px-3 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 transition-all text-xs font-medium text-zinc-700 dark:text-white/80 cursor-default'
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Theme-Colored Action Bar */}
            <div className='space-y-3 pt-2'>
              <button
                onClick={onStartProject}
                className='w-full py-4 rounded-xl font-bold text-sm bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-zinc-500/10 dark:shadow-white/5 flex items-center justify-center gap-2 group relative overflow-hidden'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out z-10' />
                <span className='relative z-20 flex items-center gap-2'>
                  Start Similar Project
                  <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                </span>
              </button>

              <Link href={project.href} className='block'>
                <button className='w-full py-3 rounded-xl bg-transparent border border-black/10 dark:border-white/10 font-bold text-sm text-zinc-500 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2'>
                  Visit Live Website
                  <ExternalLink className='w-3 h-3' />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    title: 'FinTech Dashboard',
    category: 'Web Application',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    description:
      'A comprehensive financial analytics platform serving over 50k active users with real-time data visualization.',
    tags: ['Next.js', 'TypeScript', 'D3.js'],
    stats: { growth: '240%', users: '50k+' },
    href: '/projects/fintech',
  },
  {
    title: 'AI Healthcare Platform',
    category: 'AI Integration',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    description:
      'Machine learning powered diagnostic assistant reducing analysis time by 60% for medical professionals.',
    tags: ['Python', 'TensorFlow', 'React'],
    stats: { growth: '180%', users: '10k+' },
    href: '/projects/healthcare',
  },
  {
    title: 'E-Commerce Suite',
    category: 'Mobile & Web',
    image:
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2064&auto=format&fit=crop',
    description:
      'Omnichannel retail solution processing $2M+ monthly transactions with 99.99% uptime.',
    tags: ['React Native', 'Node.js', 'AWS'],
    stats: { growth: '300%', users: '100k+' },
    href: '/projects/ecommerce',
  },
  {
    title: 'Smart City Interface',
    category: 'IoT Dashboard',
    image:
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
    description:
      'Centralized control system for smart city infrastructure management and monitoring.',
    tags: ['Vue.js', 'Socket.io', 'Mapbox'],
    stats: { growth: '150%', users: '25k+' },
    href: '/projects/smart-city',
  },
  {
    title: 'EdTech Learning Hub',
    category: 'Education Platform',
    image:
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop',
    description:
      'Interactive learning management system serving universities worldwide.',
    tags: ['React', 'Firebase', 'WebRTC'],
    stats: { growth: '400%', users: '1M+' },
    href: '/projects/edtech',
  },
  {
    title: 'Logistics Tracker',
    category: 'Supply Chain',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
    description:
      'Real-time fleet tracking and supply chain optimization platform.',
    tags: ['Angular', 'Go', 'PostgreSQL'],
    stats: { growth: '200%', users: '5k+' },
    href: '/projects/logistics',
  },
];

export function ProjectsPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <section className='py-40 relative overflow-hidden bg-background'>
      {/* Premium Background */}
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow' />
        <div className='absolute bottom-1/3 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000' />
        <div className='absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-[size:60px_60px]' />
      </div>

      <div className='container mx-auto px-4 lg:px-8 relative z-10'>
        {/* Header */}
        <ScrollReveal>
          <div className='max-w-4xl mb-24'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-8'>
              <div className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-primary'></span>
              </div>
              <span className='text-xs font-bold text-primary uppercase tracking-[0.2em]'>
                Featured Work
              </span>
            </div>

            <h2 className='text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-none'>
              <span className='text-foreground'>Crafting </span>
              <span className='relative inline-block'>
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent'>
                  Excellence
                </span>
                <div className='absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-cyan-300/50 to-accent/50 blur-sm' />
              </span>
            </h2>

            <p className='text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl'>
              Explore our portfolio of transformative digital solutions that
              have redefined success for our clients.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid Layout - 6 Projects */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {projects.map((project, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div
                className='group relative flex flex-col h-[450px] rounded-[2rem] overflow-hidden cursor-pointer border border-border bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2'
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Section (Top Half) */}
                <div className='relative h-[55%] overflow-hidden'>
                  <img
                    src={project.image || '/placeholder.svg'}
                    alt={project.title}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                  {/* Floating Action Button */}
                  <div className='absolute top-4 right-4 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500'>
                    <div className='w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg'>
                      <ArrowUpRight className='w-5 h-5 text-black' />
                    </div>
                  </div>
                </div>

                {/* Content Section (Bottom Half) */}
                <div className='flex flex-col flex-grow p-8 bg-card relative z-10'>
                  <p className='text-primary text-xs font-bold uppercase tracking-wider mb-3'>
                    {project.category}
                  </p>

                  <h3 className='text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors'>
                    {project.title}
                  </h3>

                  <p className='text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-6'>
                    {project.description}
                  </p>

                  <div className='mt-auto flex items-center justify-between pt-4 border-t border-border/50'>
                    <div className='flex gap-2'>
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className='text-[10px] font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className='flex items-center gap-1 text-foreground font-bold'>
                      <span>{project.stats.growth}</span>
                      <ArrowUpRight className='w-3 h-3 text-green-500' />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal delay={400}>
          <div className='flex justify-center'>
            <Link href='/projects'>
              <div className='group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-card backdrop-blur-xl border border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 overflow-hidden shadow-lg'>
                <div className='absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                <span className='relative text-foreground font-semibold tracking-wide'>
                  Explore All Projects
                </span>
                <ArrowRight className='relative w-5 h-5 text-primary group-hover:translate-x-1 transition-transform' />
              </div>
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <ProjectDetailModal
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartProject={() => {
          setSelectedProject(null);
          setIsGetStartedOpen(true);
        }}
      />
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </section>
  );
}

// --- Testimonials ---

const companies = [
  {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    name: 'Telesom',
    logo: 'https://imgs.search.brave.com/LS_b9KgvzPTPagXmzoSzMLRik6uKYGnr-Azw5bIutxQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8zLzNlL1Rl/bGVzb21fbG9nby5w/bmcvNTEycHgtVGVs/ZXNvbV9sb2dvLnBu/Zw',
  },
  {
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  {
    name: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
  },
  {
    name: 'Airbnb',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',
  },
  {
    name: 'Uber',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png',
  },
  {
    name: 'Slack',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
  },
  {
    name: 'Stripe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
  },
  {
    name: 'Shopify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
  },
  {
    name: 'Adobe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg',
  },
];

const testimonials = [
  {
    quote:
      'Somdev Solutions transformed our enterprise infrastructure with their cutting-edge AI integration. The scalable architecture they built handles our global traffic effortlessly.',
    author: 'Enterprise Team',
    role: 'Global Infrastructure Div.',
    image: companies[0].logo,
    rating: 5,
    company: companies[0].name,
  },
  {
    quote:
      "The operational efficiency we achieved with Somdev's automation tools is unprecedented. We saw a 40% reduction in server costs within the first quarter.",
    author: 'Cloud Operations',
    role: 'Systems Engineering',
    image: companies[1].logo,
    rating: 5,
    company: companies[1].name,
  },
  {
    quote:
      'Partnering with Somdev for our digital transformation was the best decision. Their secure, high-performance solutions are exactly what a telecom leader needs.',
    author: 'Innovation Lead',
    role: 'Network Operations',
    image: companies[2].logo,
    rating: 5,
    company: companies[2].name,
  },
  {
    quote:
      'Their expertise in high-concurrency systems helped us optimize our streaming delivery pipeline. A truly world-class engineering team.',
    author: 'Video Engineering',
    role: 'Platform Architecture',
    image: companies[3].logo,
    rating: 5,
    company: companies[3].name,
  },
  {
    quote:
      'Somdev Solutions delivered a seamless, data-driven experience for our users. Their attention to performance metrics is outstanding.',
    author: 'Product Team',
    role: 'User Experience',
    image: companies[4].logo,
    rating: 5,
    company: companies[4].name,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  return (
    <section className='py-32 relative overflow-hidden bg-background'>
      {/* Luxury Background Gradient */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-gray-50 to-white dark:from-zinc-900 dark:via-black dark:to-black z-0' />

      {/* Ambient Glows */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none' />
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none' />

      <div className='container mx-auto px-4 lg:px-8 relative z-10'>
        <div className='max-w-5xl mx-auto'>
          <div className='text-center mb-20'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md mb-8 shadow-sm'>
              <div className='w-4 h-4 rounded-full bg-gradient-to-tr from-amber-300 to-amber-600 flex items-center justify-center'>
                <Star className='w-2.5 h-2.5 text-white fill-current' />
              </div>
              <span className='text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest'>
                Trusted Partners
              </span>
            </div>

            <h2 className='text-4xl md:text-5xl lg:text-7xl font-bold text-foreground tracking-tight mb-6'>
              <span className='relative inline-block'>
                <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-amber-500 animate-text-shimmer bg-[length:200%_auto]'>
                  Trusted by the World’s
                </span>
                <div className='absolute -bottom-2 left-0 right-0 h-[6px] bg-gradient-to-r from-primary/30 via-purple-500/30 to-amber-500/30 blur-md rounded-full' />
              </span>{' '}
              Leading Innovators
            </h2>
          </div>

          <div className='relative px-4 pb-24'>
            {/* Navigation Arrows */}
            <div className='absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-30 px-2 md:px-0'>
              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  prev();
                }}
                className='w-14 h-14 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl flex items-center justify-center text-foreground hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto group'
              >
                <ChevronLeft className='w-6 h-6 group-hover:-translate-x-0.5 transition-transform' />
              </button>
              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  next();
                }}
                className='w-14 h-14 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl flex items-center justify-center text-foreground hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto group'
              >
                <ChevronRight className='w-6 h-6 group-hover:translate-x-0.5 transition-transform' />
              </button>
            </div>

            <div className='relative max-w-5xl mx-auto perspective-[2000px]'>
              <div
                className='relative bg-white/60 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-2 group overflow-hidden'
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Texture Overlay */}
                <div className='absolute inset-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] opacity-10 mix-blend-soft-light pointer-events-none' />

                {/* Running Light Border Effect */}
                <div className='absolute inset-0 rounded-[2.5rem] p-px bg-gradient-to-r from-transparent via-white/50 to-transparent -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-gradient-xy' />

                {/* Premium Glass Sheen & Glow */}
                <div className='absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/5 pointer-events-none' />

                {/* Decorative colored glow spots */}
                <div className='absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-screen' />
                <div className='absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-screen' />

                <div className='relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12'>
                  {/* Left: Author Image & Badge */}
                  <div className='flex-shrink-0 flex flex-col items-center gap-5'>
                    <div className='relative w-28 h-28 md:w-36 md:h-36 group/image'>
                      {/* Rotating Rings */}
                      <div
                        className='absolute inset-0 rounded-full border border-dashed border-primary/30 animate-rotate-slow'
                        style={{ animationDuration: '30s' }}
                      />
                      <div
                        className='absolute -inset-2 rounded-full border border-dotted border-amber-500/20 animate-rotate-slow'
                        style={{
                          animationDuration: '40s',
                          animationDirection: 'reverse',
                        }}
                      />

                      <div className='absolute inset-1.5 rounded-full bg-gradient-to-br from-white to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 shadow-2xl p-1 z-10'>
                        <div className='w-full h-full rounded-full bg-white flex items-center justify-center p-4 overflow-hidden'>
                          <img
                            src={
                              testimonials[current].image || '/placeholder.svg'
                            }
                            alt={testimonials[current].author}
                            className='w-full h-full object-contain transition-transform duration-700 group-hover/image:scale-110'
                          />
                        </div>
                      </div>

                      {/* Verified Check - Floating */}
                      <div className='absolute bottom-2 right-0 bg-gradient-to-tr from-blue-600 to-blue-400 text-white p-2 rounded-full ring-4 ring-white dark:ring-zinc-900 shadow-lg z-20 animate-bounce-subtle'>
                        <Check className='w-4 h-4 stroke-[3]' />
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className='flex-grow text-center md:text-left pt-2'>
                    {/* Rating & Company Pill */}
                    <div className='flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8'>
                      <div className='flex items-center gap-1 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 px-3 py-1.5 rounded-full'>
                        <div className='flex gap-0.5'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'w-3.5 h-3.5',
                                i < testimonials[current].rating
                                  ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                                  : 'text-zinc-300 dark:text-zinc-700'
                              )}
                            />
                          ))}
                        </div>
                        <span className='w-px h-3 bg-amber-200 dark:bg-amber-800 mx-1.5' />
                        <span className='text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400'>
                          Platinum Rated
                        </span>
                      </div>

                      <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50'>
                        <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
                        <span className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
                          {testimonials[current].company}
                        </span>
                      </div>
                    </div>

                    {/* Quote - Editorial Style */}
                    <div className='mb-10 relative'>
                      <Quote className='absolute -top-6 -left-8 w-12 h-12 text-primary/5 transform -scale-x-100 hidden md:block select-none' />
                      <p className='text-2xl md:text-3xl lg:text-4xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 leading-relaxed tracking-tight'>
                        "{testimonials[current].quote}"
                      </p>
                    </div>

                    {/* Author Details */}
                    <div>
                      <h4 className='text-lg font-bold text-foreground'>
                        {testimonials[current].author}
                      </h4>
                      <p className='text-sm font-medium text-primary'>
                        {testimonials[current].role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Lines */}
            <div className='flex justify-center gap-2 mt-12'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className='group py-4 px-2'
                >
                  <div
                    className={cn(
                      'h-1 rounded-full transition-all duration-500',
                      index === current
                        ? 'w-12 bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]'
                        : 'w-4 bg-zinc-300 dark:bg-zinc-700 group-hover:bg-primary/50'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Trusted Companies Section */}
          <div className='mt-8 pt-16 border-t border-black/5 dark:border-white/5'>
            <p className='text-center text-sm font-semibold text-muted-foreground uppercase tracking-[0.3em] mb-12'>
              Trusted by Industry-Leading Innovators
            </p>

            <div className='relative w-full overflow-hidden'>
              <div className='absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10' />
              <div className='absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10' />

              <div className='flex gap-16 animate-marquee hover:pause-animation py-4 w-max'>
                {[...companies, ...companies, ...companies].map(
                  (company, i) => (
                    <div
                      key={`${company.name}-${i}`}
                      className='flex items-center justify-center flex-shrink-0 group cursor-pointer'
                    >
                      <div className='relative h-12 w-32 transition-all duration-300 transform group-hover:scale-110 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100'>
                        <img
                          src={company.logo}
                          alt={company.name}
                          className='w-full h-full object-contain'
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- CTA Section ---

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className='py-32 relative overflow-hidden'>
      {/* Dynamic Background */}
      <div className='absolute inset-0 bg-background'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 opacity-50' />

        {/* Interactive Glow */}
        <div
          className='absolute w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl transition-all duration-100 ease-out mix-blend-screen will-change-transform'
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Animated Orbs */}
        <div className='absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow' />
        <div className='absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000' />

        {/* Grid Pattern */}
        <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20' />
      </div>

      <div className='container mx-auto px-4 lg:px-8 relative'>
        <ScrollReveal>
          <div className='glass-premium rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden group border border-border shadow-2xl shadow-primary/5 bg-card'>
            {/* Inner Glow */}
            <div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700' />

            {/* Floating Icons */}
            <div className='absolute top-10 left-10 opacity-20 group-hover:opacity-50 transition-all duration-700 group-hover:translate-x-4 group-hover:translate-y-4'>
              <Sparkles className='w-12 h-12 text-primary animate-pulse-slow' />
            </div>
            <div className='absolute bottom-10 right-10 opacity-20 group-hover:opacity-50 transition-all duration-700 group-hover:-translate-x-4 group-hover:-translate-y-4'>
              <Zap className='w-12 h-12 text-accent animate-pulse-slow animation-delay-1000' />
            </div>

            <div className='relative z-10 max-w-4xl mx-auto'>
              <div className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border-2 border-green-500/30 mb-8 backdrop-blur-md shadow-lg shadow-green-500/10'>
                <span className='relative flex h-2.5 w-2.5'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-lg shadow-green-500/50'></span>
                </span>
                <span className='text-sm font-bold text-green-600 dark:text-green-400 tracking-wide uppercase'>
                  Accepting New Projects
                </span>
              </div>

              <h2 className='text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-[1.1] tracking-tight'>
                Ready to{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-accent animate-gradient-x'>
                  Transform
                </span>
                <br />
                Your Vision?
              </h2>

              <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed'>
                Let's collaborate to build something extraordinary. Our team of
                experts is ready to bring your digital dreams to life.
              </p>

              <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
                <PremiumButton
                  variant='glow'
                  size='xl'
                  icon={<ArrowRight className='w-6 h-6' />}
                  magnetic
                  glow
                  onClick={() => setIsGetStartedOpen(true)}
                >
                  Start a Project
                </PremiumButton>

                <Link href='/services'>
                  <PremiumButton variant='secondary' size='xl'>
                    View Services
                  </PremiumButton>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className='mt-16 pt-10 border-t border-border flex flex-col md:flex-row items-center justify-center gap-8 text-muted-foreground'>
                <div className='flex items-center gap-3'>
                  <div className='flex -space-x-3'>
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className='w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs font-bold text-white'
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className='text-sm font-medium'>
                    <strong className='text-foreground'>500+</strong> Happy
                    Clients
                  </span>
                </div>
                <div className='hidden md:block w-px h-8 bg-border' />
                <div className='flex items-center gap-2'>
                  <div className='flex gap-1'>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className='w-4 h-4 fill-yellow-400 text-yellow-400'
                      />
                    ))}
                  </div>
                  <span className='text-sm font-medium'>
                    <strong className='text-foreground'>4.9/5</strong> Average
                    Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </section>
  );
}
