'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, Sparkles, ArrowRight } from 'lucide-react';

interface BeautifulFormProps {
  type?: 'project' | 'newsletter' | 'contact';
  title?: string;
  subtitle?: string;
  className?: string;
}

export function BeautifulForm({
  type = 'contact',
  title,
  subtitle,
  className,
}: BeautifulFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  // Content configuration based on type
  const config = {
    project: {
      defaultTitle: 'Start Your Project',
      defaultSubtitle:
        "Tell us about your next big idea. We'll help you bring it to life.",
      buttonText: 'Request Consultation',
    },
    newsletter: {
      defaultTitle: 'Stay Ahead of the Curve',
      defaultSubtitle:
        'Get the latest tech insights and development trends delivered to your inbox.',
      buttonText: 'Subscribe Now',
    },
    contact: {
      defaultTitle: 'Get in Touch',
      defaultSubtitle: "Have a question? We'd love to hear from you.",
      buttonText: 'Send Message',
    },
  };

  const currentConfig = config[type];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className='w-full max-w-2xl mx-auto p-12 glass-premium rounded-3xl text-center relative overflow-hidden'
      >
        <div className='absolute inset-0 bg-linear-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none' />
        <div className='relative z-10'>
          <div className='w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary'>
            <Sparkles className='w-8 h-8' />
          </div>
          <h3 className='text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent mb-4'>
            Thank You!
          </h3>
          <p className='text-muted-foreground text-lg mb-8'>
            We've received your submission and will get back to you shortly.
          </p>
          <Button
            variant='outline'
            onClick={() => setSubmitted(false)}
            className='hover-lift'
          >
            Send Another
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      {/* Decorative background elements */}
      <div className='absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse-slow' />
      <div className='absolute -bottom-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl opacity-50 animate-pulse-slow delay-1000' />

      <motion.form
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className='relative z-10 glass-premium rounded-3xl p-8 md:p-12 border border-white/10 dark:border-white/5 shadow-2xl'
      >
        <div className='text-center mb-10'>
          <motion.h3
            variants={itemVariants}
            className='text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-primary via-foreground to-accent animate-gradient-x'
          >
            {title || currentConfig.defaultTitle}
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className='text-muted-foreground text-lg max-w-xl mx-auto'
          >
            {subtitle || currentConfig.defaultSubtitle}
          </motion.p>
        </div>

        <div className='space-y-6'>
          <motion.div
            variants={itemVariants}
            className='grid md:grid-cols-2 gap-6'
          >
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-foreground/80'>
                Name
              </Label>
              <Input
                id='name'
                required
                placeholder='John Doe'
                className='bg-background/30 border-white/10 focus:border-primary/50 transition-all duration-300 h-12'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-foreground/80'>
                Email
              </Label>
              <Input
                id='email'
                type='email'
                required
                placeholder='john@example.com'
                className='bg-background/30 border-white/10 focus:border-primary/50 transition-all duration-300 h-12'
              />
            </div>
          </motion.div>

          {type === 'project' && (
            <motion.div variants={itemVariants} className='space-y-2'>
              <Label htmlFor='type' className='text-foreground/80'>
                Project Type
              </Label>
              <Input
                id='type'
                placeholder='Web Development, Mobile App, AI Integration...'
                className='bg-background/30 border-white/10 focus:border-primary/50 transition-all duration-300 h-12'
              />
            </motion.div>
          )}

          {type !== 'newsletter' && (
            <motion.div variants={itemVariants} className='space-y-2'>
              <Label htmlFor='message' className='text-foreground/80'>
                Message
              </Label>
              <Textarea
                id='message'
                required
                placeholder={
                  type === 'project'
                    ? 'Tell us about your project goals and requirements...'
                    : 'How can we help you?'
                }
                className='min-h-[120px] bg-background/30 border-white/10 focus:border-primary/50 transition-all duration-300 resize-none'
              />
            </motion.div>
          )}

          <motion.div variants={itemVariants} className='pt-4'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full h-14 text-lg font-medium bg-linear-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-primary/25 rounded-xl group relative overflow-hidden'
            >
              <span className='relative z-10 flex items-center justify-center gap-2'>
                {isSubmitting ? 'Sending...' : currentConfig.buttonText}
                {!isSubmitting && (
                  <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                )}
              </span>
              <div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300' />
            </Button>
          </motion.div>
        </div>
      </motion.form>
    </div>
  );
}
