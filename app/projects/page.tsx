'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  ArrowUpRight,
  Filter,
  Layers,
  Zap,
  Globe,
  Smartphone,
  Database,
} from 'lucide-react';
import Link from 'next/link';
import {
  ScrollReveal,
  TiltCard,
  AnimatedCounter,
  MagneticButton,
} from '@/components/animations';
import { Button } from '@/components/ui/button';

const categories = [
  { name: 'All', icon: Layers },
  { name: 'Web App', icon: Globe },
  { name: 'Mobile', icon: Smartphone },
  { name: 'AI/ML', icon: Zap },
  { name: 'E-commerce', icon: Database },
  { name: 'SaaS', icon: Layers },
];

const projects = [
  {
    id: 'fintech-dashboard',
    title: 'FinTech Dashboard',
    category: 'Web App',
    description:
      'A comprehensive financial management platform with real-time analytics and trading capabilities.',
    image: '/modern-fintech-dashboard-dark-theme.jpg',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    client: 'TechVentures Inc.',
    year: '2024',
    color: '#00D4FF',
  },
  {
    id: 'healthcare-platform',
    title: 'AI Healthcare Platform',
    category: 'AI/ML',
    description:
      'Intelligent healthcare management system with AI-powered diagnostics and patient monitoring.',
    image: '/healthcare-ai-platform-interface.jpg',
    tags: ['Python', 'TensorFlow', 'React'],
    client: 'MedTech Solutions',
    year: '2024',
    color: '#A855F7',
  },
  {
    id: 'ecommerce-suite',
    title: 'E-Commerce Suite',
    category: 'E-commerce',
    description:
      'Full-featured e-commerce platform with inventory management and analytics dashboard.',
    image: '/modern-ecommerce-platform-dark.jpg',
    tags: ['Next.js', 'Stripe', 'MongoDB'],
    client: 'RetailPro',
    year: '2023',
    color: '#EF4444',
  },
  {
    id: 'fitness-app',
    title: 'Fitness Tracking App',
    category: 'Mobile',
    description:
      'Cross-platform mobile application for fitness tracking with AI-powered workout recommendations.',
    image: '/fitness-mobile-app-dark-theme-workout-tracking.jpg',
    tags: ['React Native', 'Firebase', 'ML Kit'],
    client: 'FitLife Inc.',
    year: '2023',
    color: '#F59E0B',
  },
  {
    id: 'saas-platform',
    title: 'SaaS Management Platform',
    category: 'SaaS',
    description:
      'Enterprise SaaS platform for team collaboration and project management.',
    image: '/saas-collaboration-platform-dark-theme-dashboard.jpg',
    tags: ['Vue.js', 'GraphQL', 'AWS'],
    client: 'CollabWorks',
    year: '2023',
    color: '#10B981',
  },
  {
    id: 'ai-chatbot',
    title: 'Enterprise AI Chatbot',
    category: 'AI/ML',
    description:
      'Intelligent conversational AI for customer support with multi-language capabilities.',
    image: '/ai-chatbot-interface-dark-theme-modern.jpg',
    tags: ['OpenAI', 'Python', 'React'],
    client: 'SupportHub',
    year: '2024',
    color: '#EC4899',
  },
  {
    id: 'real-estate',
    title: 'Real Estate Marketplace',
    category: 'Web App',
    description:
      'Property listing and management platform with virtual tour integration.',
    image: '/real-estate-marketplace-dark-theme-property-listin.jpg',
    tags: ['Next.js', 'Three.js', 'PostgreSQL'],
    client: 'PropertyPro',
    year: '2023',
    color: '#6366F1',
  },
  {
    id: 'banking-app',
    title: 'Mobile Banking App',
    category: 'Mobile',
    description:
      'Secure mobile banking application with biometric authentication and real-time transactions.',
    image: '/mobile-banking-app-dark-theme-secure-finance.jpg',
    tags: ['Flutter', 'Node.js', 'AWS'],
    client: 'SecureBank',
    year: '2024',
    color: '#8B5CF6',
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className='min-h-screen bg-background selection:bg-primary/20 selection:text-primary'>
      <Navigation />

      {/* Hero Section */}
      <section className='pt-40 pb-20 relative overflow-hidden'>
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow' />
          <div className='absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000' />
          <div className='absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20' />
        </div>

        <div className='container mx-auto px-4 lg:px-8 relative'>
          <ScrollReveal>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6 backdrop-blur-sm'>
                <span className='relative flex h-2 w-2'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-2 w-2 bg-primary'></span>
                </span>
                Our Portfolio
              </div>

              <h1 className='text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight'>
                Showcasing Our{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-accent animate-gradient-x'>
                  Best Work
                </span>
              </h1>

              <p className='text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12'>
                Explore our portfolio of successful projects spanning web
                applications, mobile apps, AI solutions, and more.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter */}
      <section className='pb-12 sticky top-20 z-40'>
        <div className='container mx-auto px-4 lg:px-8'>
          <div className='flex flex-wrap justify-center gap-3 p-2 rounded-full bg-card backdrop-blur-xl border border-border max-w-fit mx-auto'>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.name
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <category.icon className='w-4 h-4' />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className='pb-32'>
        <div className='container mx-auto px-4 lg:px-8'>
          <div className='grid md:grid-cols-2 gap-8 lg:gap-12'>
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 100}>
                <TiltCard className='h-full'>
                  <Link
                    href={`/projects/${project.id}`}
                    className='group relative flex flex-col h-full rounded-3xl overflow-hidden bg-card backdrop-blur-xl border border-border hover:border-primary/30 transition-all duration-500'
                  >
                    {/* Image */}
                    <div className='aspect-[16/10] overflow-hidden relative'>
                      <img
                        src={project.image || '/placeholder.svg'}
                        alt={project.title}
                        className='w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500' />

                      <div className='absolute top-4 right-4'>
                        <div className='w-12 h-12 rounded-full bg-muted backdrop-blur-md flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110'>
                          <ArrowUpRight className='w-6 h-6' />
                        </div>
                      </div>

                      <div className='absolute bottom-4 left-4 right-4'>
                        <div className='flex flex-wrap gap-2 mb-3'>
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className='px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-border text-xs text-white font-medium'
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className='p-8 flex-grow flex flex-col relative overflow-hidden'>
                      <div className='absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                      <div className='flex items-center justify-between mb-4'>
                        <span className='text-primary text-sm font-medium tracking-wider uppercase'>
                          {project.category}
                        </span>
                        <span className='text-muted-foreground text-sm'>
                          {project.year}
                        </span>
                      </div>

                      <h3 className='text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors'>
                        {project.title}
                      </h3>

                      <p className='text-muted-foreground mb-6 line-clamp-2 flex-grow leading-relaxed'>
                        {project.description}
                      </p>

                      <div className='flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors mt-auto'>
                        View Case Study
                        <ArrowUpRight className='w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1' />
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className='py-24 bg-muted/20 relative overflow-hidden'>
        <div className='absolute inset-0 bg-primary/5' />
        <div className='container mx-auto px-4 lg:px-8 relative'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {[
              { value: 150, label: 'Projects Completed', suffix: '+' },
              { value: 50, label: 'Happy Clients', suffix: '+' },
              { value: 15, label: 'Countries Served', suffix: '+' },
              { value: 25, label: 'Team Members', suffix: '+' },
            ].map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 100}>
                <div className='text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors'>
                  <div className='text-4xl md:text-5xl font-bold text-foreground mb-2'>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className='text-muted-foreground font-medium'>
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-24 relative'>
        <div className='container mx-auto px-4 lg:px-8 text-center'>
          <ScrollReveal>
            <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-8'>
              Have a Project in Mind?
            </h2>
            <p className='text-xl text-muted-foreground mb-10 max-w-2xl mx-auto'>
              Let's collaborate to bring your vision to life with our expert
              team of developers and designers.
            </p>
            <MagneticButton>
              <Link href='/contact'>
                <Button
                  size='lg'
                  className='bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full'
                >
                  Start Your Project
                  <ArrowUpRight className='ml-2 w-5 h-5' />
                </Button>
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
