'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Send, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Service {
  icon: any;
  title: string;
  description: string;
  color: string;
  features: string[];
}

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export function ServiceDetailModal({
  isOpen,
  onClose,
  service,
}: ServiceDetailModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>(
    'idle'
  );
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    projectDetails: '',
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setFormData({ fullName: '', email: '', projectDetails: '' });
        setFormState('idle');
      }, 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }

    // Safety cleanup: Ensure scroll is unlocked if component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    setTimeout(() => {
      setFormState('success');
      setTimeout(() => onClose(), 2500);
    }, 1500);
  };

  if (!isVisible && !isOpen) return null;
  if (!service) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center p-3 transition-all duration-500',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Enhanced Backdrop with Radial Gradient */}
      <div
        className='absolute inset-0 backdrop-blur-md transition-all duration-500'
        style={{
          background: `radial-gradient(circle at 50% 50%, ${service.color}20, rgba(0,0,0,0.75))`,
        }}
        onClick={onClose}
      />

      {/* Modal - Compact */}
      <div
        className={cn(
          'relative w-full max-w-3xl transition-all duration-700 ease-out',
          isOpen
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-90 rotate-1 opacity-0'
        )}
      >
        {/* Glowing Border with Multiple Layers */}
        <div
          className='absolute -inset-1 rounded-[1.75rem] opacity-70 blur-xl animate-pulse-slow'
          style={{
            background: `linear-gradient(135deg, ${service.color}50, transparent, ${service.color}50)`,
          }}
        />
        <div
          className='absolute -inset-0.5 rounded-[1.75rem] opacity-40 blur-xl'
          style={{
            background: service.color,
          }}
        />

        {/* Main Container - Enhanced */}
        <div className='relative bg-gradient-to-br from-card/98 to-card/95 backdrop-blur-2xl rounded-[1.75rem] border border-white/20 shadow-2xl overflow-hidden'>
          {/* Decorative Corner Lights */}
          <div
            className='absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl animate-pulse'
            style={{ background: service.color }}
          />
          <div
            className='absolute bottom-0 left-0 w-32 h-32 opacity-20 blur-3xl animate-pulse animation-delay-1000'
            style={{ background: service.color }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className='absolute right-4 top-4 z-50 p-1.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all duration-300 hover:rotate-90 hover:scale-110 shadow-lg'
          >
            <X className='h-4 w-4' />
          </button>

          <div className='flex flex-col md:flex-row'>
            {/* Left: Service Details - Compact */}
            <div className='flex-1 p-6 md:p-7 relative overflow-hidden'>
              {/* Animated Background Gradient */}
              <div
                className='absolute inset-0 opacity-[0.08]'
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${service.color}, transparent 60%)`,
                }}
              />

              <div className='relative z-10'>
                {/* Icon with Enhanced Glow */}
                <div className='relative inline-block mb-5'>
                  <div
                    className='absolute inset-0 blur-xl opacity-70 animate-pulse'
                    style={{ background: service.color }}
                  />
                  <div
                    className='relative w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-xl shadow-2xl transition-transform duration-300 hover:scale-110 hover:rotate-3'
                    style={{
                      background: `linear-gradient(135deg, ${service.color}40, ${service.color}10)`,
                      border: `2px solid ${service.color}50`,
                      boxShadow: `0 8px 16px ${service.color}30`,
                    }}
                  >
                    <service.icon
                      className='w-6 h-6'
                      style={{ color: service.color }}
                    />
                  </div>
                </div>

                {/* Title with Enhanced Gradient */}
                <h2
                  className='text-2xl md:text-3xl font-bold mb-3 leading-tight'
                  style={{
                    background: `linear-gradient(135deg, ${service.color}, #fff)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {service.title}
                </h2>

                {/* Description */}
                <p className='text-sm text-muted-foreground/90 mb-6 leading-relaxed'>
                  {service.description}
                </p>

                {/* Features with Enhanced Design */}
                <div className='space-y-2'>
                  {service.features.map((feature, idx) => (
                    <div key={idx} className='flex items-center gap-2.5 group'>
                      <div
                        className='w-6 h-6 rounded-lg flex items-center justify-center backdrop-blur-lg transition-all duration-300 group-hover:scale-110 shadow-md'
                        style={{
                          background: `linear-gradient(135deg, ${service.color}30, ${service.color}10)`,
                          border: `1px solid ${service.color}40`,
                          boxShadow: `0 2px 8px ${service.color}20`,
                        }}
                      >
                        <Check
                          className='w-3 h-3'
                          style={{ color: service.color }}
                        />
                      </div>
                      <span className='text-xs text-foreground font-medium group-hover:text-foreground/80 transition-colors'>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Beautiful Form */}
            <div className='flex-1 p-6 md:p-7 border-t md:border-t-0 md:border-l border-white/10 relative'>
              {/* Subtle Form Background Glow */}
              <div
                className='absolute inset-0 opacity-[0.03]'
                style={{
                  background: `radial-gradient(circle at 70% 30%, ${service.color}, transparent 70%)`,
                }}
              />

              <div className='relative z-10 h-full flex flex-col justify-center'>
                {formState === 'success' ? (
                  <div className='text-center py-10 animate-in zoom-in duration-500'>
                    <div className='relative inline-block mb-5'>
                      <div
                        className='absolute inset-0 blur-2xl opacity-70 animate-pulse'
                        style={{ background: service.color }}
                      />
                      <div
                        className='relative w-16 h-16 rounded-full flex items-center justify-center animate-bounce-subtle'
                        style={{
                          background: `linear-gradient(135deg, ${service.color}30, ${service.color}10)`,
                          border: `2px solid ${service.color}50`,
                          boxShadow: `0 8px 24px ${service.color}40`,
                        }}
                      >
                        <Check
                          className='w-8 h-8'
                          style={{ color: service.color }}
                        />
                      </div>
                    </div>
                    <h3 className='text-xl font-bold text-foreground mb-2'>
                      Perfect! 🎉
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      We'll reach out within 24 hours!
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Header - Centered with Glow */}
                    <div className='mb-6 text-center'>
                      <div
                        className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 backdrop-blur-xl transition-transform duration-300 hover:scale-105'
                        style={{
                          background: `linear-gradient(135deg, ${service.color}25, ${service.color}10)`,
                          border: `1px solid ${service.color}40`,
                          boxShadow: `0 4px 12px ${service.color}20`,
                        }}
                      >
                        <Star
                          className='w-3.5 h-3.5 animate-pulse'
                          style={{ color: service.color }}
                        />
                        <span
                          className='text-xs font-bold'
                          style={{ color: service.color }}
                        >
                          Premium Service
                        </span>
                      </div>
                      <h3 className='text-xl font-bold text-foreground mb-1.5'>
                        Start Your Journey
                      </h3>
                      <p className='text-xs text-muted-foreground'>
                        Let's bring your vision to life
                      </p>
                    </div>

                    {/* Compact Beautiful Form */}
                    <form onSubmit={handleSubmit} className='space-y-3.5'>
                      {/* Name */}
                      <div>
                        <label className='block text-[10px] font-bold uppercase tracking-wider text-foreground/80 mb-1.5'>
                          Your Name
                        </label>
                        <input
                          id='fullName'
                          name='fullName'
                          type='text'
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className='w-full px-3.5 py-2.5 bg-background/50 backdrop-blur-xl border-2 border-border/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:border-primary/50 focus:bg-background/80 focus:shadow-lg outline-none'
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                          }}
                          placeholder='John Doe'
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className='block text-[10px] font-bold uppercase tracking-wider text-foreground/80 mb-1.5'>
                          Email Address
                        </label>
                        <input
                          id='email'
                          name='email'
                          type='email'
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className='w-full px-3.5 py-2.5 bg-background/50 backdrop-blur-xl border-2 border-border/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:border-primary/50 focus:bg-background/80 focus:shadow-lg outline-none'
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                          }}
                          placeholder='john@company.com'
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className='block text-[10px] font-bold uppercase tracking-wider text-foreground/80 mb-1.5'>
                          Project Details
                        </label>
                        <textarea
                          id='projectDetails'
                          name='projectDetails'
                          required
                          rows={3}
                          value={formData.projectDetails}
                          onChange={handleInputChange}
                          className='w-full px-3.5 py-2.5 bg-background/50 backdrop-blur-xl border-2 border-border/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 resize-none transition-all duration-300 focus:border-primary/50 focus:bg-background/80 focus:shadow-lg outline-none'
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                          }}
                          placeholder='Describe your project...'
                        />
                      </div>

                      {/* Beautiful Button with Enhanced Effects */}
                      <button
                        type='submit'
                        disabled={formState === 'submitting'}
                        className='relative w-full group overflow-hidden rounded-xl py-3 px-5 font-bold text-sm text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] disabled:opacity-60'
                        style={{
                          background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)`,
                          boxShadow: `0 8px 24px -6px ${service.color}60`,
                        }}
                      >
                        {/* Shimmer Effect */}
                        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />

                        {/* Glow on Hover */}
                        <div
                          className='absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300'
                          style={{ background: service.color }}
                        />

                        <span className='relative flex items-center justify-center gap-2'>
                          {formState === 'submitting' ? (
                            <>
                              <span className='h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Sparkles className='w-4 h-4 animate-pulse' />
                              Send Message
                              <Send className='w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1' />
                            </>
                          )}
                        </span>
                      </button>

                      {/* Trust Badge */}
                      <div className='flex items-center justify-center gap-2 text-[10px] text-muted-foreground/60 pt-1'>
                        <Check className='w-3 h-3 text-green-500' />
                        <span>Secured • 24hr Response</span>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
