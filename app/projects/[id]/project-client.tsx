'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Building,
  Tag,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { BeautifulForm } from '@/components/beautiful-form';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ProjectClientProps {
  project: {
    title: string;
    category: string;
    description: string;
    fullDescription: string;
    image: string;
    tags: string[];
    client: string;
    year: string;
    challenge: string;
    solution: string;
    results: string[];
    gallery: string[];
  };
}

export function ProjectClient({ project }: ProjectClientProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className='min-h-screen bg-background overflow-x-hidden selection:bg-primary selection:text-primary-foreground'>
      <Navigation />

      {/* Immersive Hero */}
      <section
        ref={ref}
        className='relative h-screen w-full flex items-center justify-center overflow-hidden'
      >
        <motion.div
          style={{ y, opacity }}
          className='absolute inset-0 w-full h-full'
        >
          <img
            src={project.image || '/placeholder.svg'}
            alt={project.title}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gray-950/70 backdrop-blur-sm' />
        </motion.div>

        <div className='relative z-10 container mx-auto px-4 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='max-w-4xl'
          >
            <Link
              href='/projects'
              className='inline-flex items-center gap-2 text-white/80 hover:text-primary mb-8 transition-colors group'
            >
              <div className='bg-white/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors'>
                <ArrowLeft className='w-4 h-4' />
              </div>
              <span className='font-medium'>Back to Projects</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className='flex items-center gap-3 mb-6'
            >
              <span className='px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-semibold tracking-wide uppercase backdrop-blur-md'>
                {project.category}
              </span>
              <span className='px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/80 text-sm font-medium tracking-wide uppercase backdrop-blur-md'>
                {project.year}
              </span>
            </motion.div>

            <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight'>
              {project.title}
            </h1>

            <p className='text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-10 font-light'>
              {project.fullDescription}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                size='lg'
                className='h-14 px-8 bg-white text-black hover:bg-white/90 rounded-full text-lg font-medium group'
              >
                Visit Live Site
                <ExternalLink className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50'
        >
          <ChevronDown className='w-8 h-8' />
        </motion.div>
      </section>

      {/* Info Bar - Sticky */}
      <div className='sticky top-20 z-40 my-12 pointer-events-none'>
        <div className='container mx-auto px-4 lg:px-8'>
          <div className='glass-premium rounded-2xl p-6 flex flex-wrap items-center justify-between gap-8 pointer-events-auto backdrop-blur-xl bg-background/80 shadow-2xl border-white/10'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary'>
                <Building className='w-5 h-5' />
              </div>
              <div>
                <p className='text-xs text-muted-foreground uppercase tracking-wider font-semibold'>
                  Client
                </p>
                <p className='font-medium text-foreground'>{project.client}</p>
              </div>
            </div>

            <div className='hidden md:block w-px h-10 bg-border/50' />

            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary'>
                <Calendar className='w-5 h-5' />
              </div>
              <div>
                <p className='text-xs text-muted-foreground uppercase tracking-wider font-semibold'>
                  Timeline
                </p>
                <p className='font-medium text-foreground'>{project.year}</p>
              </div>
            </div>

            <div className='hidden md:block w-px h-10 bg-border/50' />

            <div className='flex flex-wrap gap-2 max-w-md'>
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className='px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-medium text-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The Story */}
      <section className='py-20 relative overflow-hidden'>
        {/* Abstract Background */}
        <div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none' />

        <div className='container mx-auto px-4 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-16 lg:gap-24'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-8 relative inline-block'>
                The Challenge
                <span className='absolute -bottom-2 left-0 w-1/3 h-1.5 bg-primary rounded-full' />
              </h2>
              <p className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
                {project.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='relative'
            >
              <div className='absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-transparent hidden lg:block' />
              <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-8'>
                The Solution
              </h2>
              <p className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
                {project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results - Stats Grid */}
      <section className='py-24 bg-secondary/20'>
        <div className='container mx-auto px-4 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl md:text-5xl font-bold text-foreground mb-6'>
              Impact & Results
            </h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              Measuring success through tangible metrics and user satisfaction.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {project.results.map((result: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className='group relative bg-background rounded-3xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5'
              >
                <div className='absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity'>
                  <CheckCircle2 className='w-12 h-12 text-primary' />
                </div>
                <div className='relative z-10'>
                  <div className='w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300'>
                    <span className='font-bold text-xl'>0{index + 1}</span>
                  </div>
                  <p className='text-lg font-medium text-foreground leading-snug'>
                    {result}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery - Full Width */}
      <section className='py-24 overflow-hidden'>
        <div className='container mx-auto px-4 lg:px-8 mb-12'>
          <h2 className='text-3xl md:text-5xl font-bold text-foreground'>
            Project Gallery
          </h2>
        </div>

        <div className='flex gap-8 overflow-x-auto pb-12 px-4 lg:px-8 -mx-4 lg:-mx-8 scrollbar-hide snap-x snap-mandatory'>
          {project.gallery.map((image: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className='flex-none w-[85vw] md:w-[60vw] lg:w-[45vw] aspect-video relative rounded-3xl overflow-hidden snap-center group'
            >
              <img
                src={image || '/placeholder.svg'}
                alt={`${project.title} screenshot ${index + 1}`}
                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Form - Redesigned */}
      <section className='py-24 relative'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none' />
        <div className='container mx-auto px-4 lg:px-8'>
          <BeautifulForm
            type='project'
            title='Inspired by this project?'
            subtitle="Let's build something world-class together. Tell us about your vision."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
