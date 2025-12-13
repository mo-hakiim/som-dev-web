'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from '@/components/animations';

interface Stat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

const stats: Stat[] = [
  { value: 250, label: 'Projects Completed', suffix: '+' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
  { value: 50, label: 'Expert Team Members', suffix: '+' },
  { value: 15, label: 'Industry Awards', suffix: '+' },
];

function CountUpNumber({
  value,
  duration = 2000,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOutExpo * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return (
    <div
      ref={ref}
      className='text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-accent'
    >
      {count}
    </div>
  );
}

export function AnimatedStats() {
  return (
    <section className='py-20 relative overflow-hidden border-y border-white/5'>
      {/* Animated Background */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent' />
        <div className='absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20' />
      </div>

      <div className='container mx-auto px-4 lg:px-8 relative'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-12'>
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 100}>
              <div className='text-center group'>
                <div className='relative inline-block'>
                  {/* Glow Effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-primary to-accent blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500' />

                  {/* Counter */}
                  <div className='relative flex items-center justify-center'>
                    {stat.prefix && (
                      <span className='text-3xl md:text-4xl font-bold text-primary mr-1'>
                        {stat.prefix}
                      </span>
                    )}
                    <CountUpNumber value={stat.value} />
                    {stat.suffix && (
                      <span className='text-3xl md:text-4xl font-bold text-primary ml-1'>
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                </div>

                {/* Label */}
                <p className='mt-4 text-gray-400 font-medium text-sm md:text-base group-hover:text-gray-300 transition-colors'>
                  {stat.label}
                </p>

                {/* Animated Underline */}
                <div className='mt-3 h-0.5 w-0 mx-auto bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500' />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
