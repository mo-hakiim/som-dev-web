'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Code2,
  Brain,
  Cloud,
  Smartphone,
  Shield,
  Zap,
  Database,
  Globe,
  Palette,
  BarChart3,
  Settings,
  Headphones,
  Check,
  Cpu,
  Server,
  Layers,
} from 'lucide-react';
import Link from 'next/link';
import {
  ScrollReveal,
  TiltCard,
  MagneticButton,
} from '@/components/animations';
import { CometCard } from '@/components/ui/comet-card';
import { GetStartedModal } from '@/components/get-started-modal';
import { ServiceDetailModal } from '@/components/service-detail-modal';
import { useState } from 'react';

const mainServices = [
  {
    id: 'web',
    icon: Code2,
    title: 'Web Development',
    description:
      'Custom web applications built with cutting-edge technologies for optimal performance and scalability.',
    features: [
      'Custom Web Applications',
      'E-commerce Solutions',
      'Progressive Web Apps',
      'API Development',
      'CMS Integration',
      'Performance Optimization',
    ],
    color: '#00D4FF',
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI & Machine Learning',
    description:
      'Intelligent solutions powered by artificial intelligence to automate and optimize your business processes.',
    features: [
      'Custom AI Models',
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics',
      'Chatbot Development',
      'AI Integration',
    ],
    color: '#A855F7',
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Solutions',
    description:
      'Scalable cloud infrastructure and migration services for seamless digital transformation.',
    features: [
      'Cloud Architecture',
      'AWS/GCP/Azure',
      'DevOps & CI/CD',
      'Cloud Migration',
      'Serverless Solutions',
      'Container Orchestration',
    ],
    color: '#22C55E',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    features: [
      'iOS Development',
      'Android Development',
      'React Native',
      'Flutter Apps',
      'App Store Optimization',
      'Mobile Backend',
    ],
    color: '#F59E0B',
  },
];

const additionalServices = [
  {
    icon: Shield,
    title: 'Cybersecurity',
    description:
      'Comprehensive security solutions to protect your digital assets and customer data from evolving threats.',
    color: '#EF4444',
    features: [
      'Security Audits & Assessment',
      'Penetration Testing',
      'Compliance & Standards',
      'Incident Response',
      'Security Training',
      'Threat Monitoring',
    ],
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description:
      'Build robust data pipelines and infrastructure for scalable data processing and analytics.',
    color: '#06B6D4',
    features: [
      'Data Pipeline Design',
      'ETL Development',
      'Data Warehouse Solutions',
      'Real-time Processing',
      'Data Quality & Governance',
      'Big Data Technologies',
    ],
  },
  {
    icon: Globe,
    title: 'Digital Marketing',
    description:
      'Grow your online presence with data-driven marketing strategies that deliver results.',
    color: '#EC4899',
    features: [
      'SEO Optimization',
      'Content Marketing',
      'Social Media Management',
      'PPC Campaigns',
      'Email Marketing',
      'Analytics & Reporting',
    ],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Create beautiful, user-centered digital experiences that engage and convert.',
    color: '#8B5CF6',
    features: [
      'User Research',
      'Wireframing & Prototyping',
      'Visual Design',
      'Interaction Design',
      'Usability Testing',
      'Design Systems',
    ],
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description:
      'Make data-driven decisions with advanced analytics and business intelligence solutions.',
    color: '#14B8A6',
    features: [
      'Business Intelligence',
      'Custom Dashboards',
      'Predictive Analytics',
      'Data Visualization',
      'KPI Tracking',
      'Reporting Automation',
    ],
  },
  {
    icon: Settings,
    title: 'Maintenance',
    description:
      'Keep your systems running smoothly with 24/7 maintenance and support services.',
    color: '#64748B',
    features: [
      '24/7 Monitoring',
      'Regular Updates',
      'Bug Fixes',
      'Performance Tuning',
      'Backup & Recovery',
      'System Optimization',
    ],
  },
  {
    icon: Headphones,
    title: 'Support',
    description:
      'Dedicated technical support team available to assist with all your needs.',
    color: '#6366F1',
    features: [
      '24/7 Help Desk',
      'Technical Assistance',
      'User Training',
      'Documentation',
      'Issue Resolution',
      'Priority Support',
    ],
  },
  {
    icon: Zap,
    title: 'Performance',
    description:
      'Optimize your applications and infrastructure for lightning-fast performance and superior user experience.',
    color: '#EAB308',
    features: [
      'Speed Optimization',
      'Load Testing',
      'Caching Strategies',
      'CDN Integration',
      'Database Optimization',
      'Code Profiling',
    ],
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We analyze your needs and define project goals',
    icon: SearchIcon,
  },
  {
    step: '02',
    title: 'Strategy',
    description: 'Create a comprehensive roadmap and architecture',
    icon: Layers,
  },
  {
    step: '03',
    title: 'Development',
    description: 'Build your solution with agile methodology',
    icon: Code2,
  },
  {
    step: '04',
    title: 'Launch',
    description: 'Deploy, test, and ensure everything works perfectly',
    icon: RocketIcon,
  },
];

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}

function RocketIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z' />
      <path d='m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z' />
      <path d='M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0' />
      <path d='M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5' />
    </svg>
  );
}

export default function ServicesPage() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

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
                Our Services
              </div>

              <h1 className='text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 tracking-tight leading-tight'>
                Elite Tech for{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-accent animate-gradient-x'>
                  Modern Business
                </span>
              </h1>

              <p className='text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12'>
                From concept to deployment, we offer end-to-end technology
                services designed to accelerate your digital transformation
                journey.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Services */}
      <section className='py-24 relative'>
        <div className='container mx-auto px-4 lg:px-8'>
          <div className='space-y-24'>
            {mainServices.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 100}>
                <div
                  className={`grid lg:grid-cols-2 gap-16 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div
                      className='w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-transform duration-500 hover:scale-110 hover:rotate-3'
                      style={{
                        backgroundColor: `${service.color}15`,
                        boxShadow: `0 0 0 1px ${service.color}30`,
                      }}
                    >
                      <service.icon
                        className='w-10 h-10'
                        style={{ color: service.color }}
                      />
                    </div>

                    <h2 className='text-4xl font-bold text-foreground mb-6'>
                      {service.title}
                    </h2>
                    <p className='text-muted-foreground text-xl mb-8 leading-relaxed'>
                      {service.description}
                    </p>

                    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10'>
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className='flex items-center gap-3 text-foreground'
                        >
                          <div className='w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0'>
                            <Check
                              className='w-3 h-3'
                              style={{ color: service.color }}
                            />
                          </div>
                          <span className='text-base'>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <MagneticButton>
                      <Button
                        onClick={() => setIsGetStartedOpen(true)}
                        className='px-8 py-6 rounded-full text-base font-medium transition-all duration-300 hover:scale-105'
                        style={{
                          backgroundColor: service.color,
                          color: '#000',
                        }}
                      >
                        Get Started
                        <ArrowRight className='ml-2 w-5 h-5' />
                      </Button>
                    </MagneticButton>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <CometCard glowColor={service.color}>
                      <div className='aspect-square rounded-3xl bg-card backdrop-blur-xl border border-border p-12 flex items-center justify-center relative overflow-hidden group'>
                        <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                        <service.icon
                          className='w-64 h-64 opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:opacity-30'
                          style={{ color: service.color }}
                        />
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <div className='w-32 h-32 rounded-full bg-muted backdrop-blur-md flex items-center justify-center border border-border shadow-2xl'>
                            <service.icon
                              className='w-16 h-16'
                              style={{ color: service.color }}
                            />
                          </div>
                        </div>
                      </div>
                    </CometCard>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className='py-24 bg-black/20 relative overflow-hidden'>
        <div className='absolute inset-0 bg-primary/5' />
        <div className='container mx-auto px-4 lg:px-8 relative'>
          <ScrollReveal>
            <div className='text-center mb-20'>
              <p className='text-primary text-sm font-medium uppercase tracking-widest mb-4'>
                More Services
              </p>
              <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
                Complete Suite of Solutions
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Comprehensive technology services to cover every aspect of your
                digital needs.
              </p>
            </div>
          </ScrollReveal>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {additionalServices.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 50}>
                <TiltCard className='h-full'>
                  <div
                    onClick={() => setSelectedService(service)}
                    className='h-full glass rounded-2xl p-8 hover:bg-muted border border-border hover:border-primary/20 transition-all duration-300 group cursor-pointer'
                  >
                    <div
                      className='w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110'
                      style={{ backgroundColor: `${service.color}15` }}
                    >
                      <service.icon
                        className='w-7 h-7'
                        style={{ color: service.color }}
                      />
                    </div>
                    <h3 className='text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors'>
                      {service.title}
                    </h3>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      {service.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className='py-24 relative'>
        <div className='container mx-auto px-4 lg:px-8'>
          <ScrollReveal>
            <div className='text-center mb-20'>
              <p className='text-primary text-sm font-medium uppercase tracking-widest mb-4'>
                Our Process
              </p>
              <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
                How We Work
              </h2>
            </div>
          </ScrollReveal>

          <div className='relative'>
            <div className='hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent' />

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-12'>
              {process.map((item, index) => (
                <ScrollReveal key={item.step} delay={index * 150}>
                  <div className='relative group'>
                    <div className='w-24 h-24 rounded-full bg-card border-4 border-border flex items-center justify-center mx-auto mb-8 relative z-10 transition-colors duration-500 group-hover:border-primary/50 shadow-xl'>
                      <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                        <item.icon className='w-8 h-8 text-primary' />
                      </div>
                      <div className='absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm'>
                        {item.step}
                      </div>
                    </div>

                    <div className='text-center px-4'>
                      <h3 className='text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors'>
                        {item.title}
                      </h3>
                      <p className='text-muted-foreground text-sm leading-relaxed'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-24 relative overflow-hidden'>
        <div className='absolute inset-0 bg-primary/5' />
        <div className='container mx-auto px-4 lg:px-8 relative'>
          <div className='max-w-4xl mx-auto text-center'>
            <ScrollReveal>
              <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-8'>
                Ready to Start Your Project?
              </h2>
              <p className='text-xl text-muted-foreground mb-10 max-w-2xl mx-auto'>
                Let's discuss how our services can help transform your business.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <MagneticButton>
                  <Link href='/contact'>
                    <Button
                      size='lg'
                      className='bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full'
                    >
                      Contact Us
                      <ArrowRight className='ml-2 w-5 h-5' />
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href='/projects'>
                    <Button
                      variant='outline'
                      size='lg'
                      className='border-white/10 text-white hover:bg-white/5 px-8 py-6 text-lg rounded-full'
                    >
                      View Our Work
                    </Button>
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
      <ServiceDetailModal
        isOpen={!!selectedService}
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </main>
  );
}
