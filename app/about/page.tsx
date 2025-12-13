'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Rocket,
  Globe,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import {
  ScrollReveal,
  TiltCard,
  AnimatedCounter,
  MagneticButton,
} from '@/components/animations';
import { CometCard } from '@/components/ui/comet-card';

const values = [
  {
    icon: Target,
    title: 'Innovation First',
    description:
      'We push boundaries and embrace cutting-edge technologies to deliver solutions that set new standards.',
    color: '#00D4FF',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'Open communication and honest relationships form the foundation of everything we do.',
    color: '#A855F7',
  },
  {
    icon: Heart,
    title: 'Client Success',
    description:
      "Your success is our success. We're committed to delivering results that exceed expectations.",
    color: '#EF4444',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description:
      'We believe in the power of teamwork, both internally and with our clients.',
    color: '#F59E0B',
  },
];

const team = [
  {
    name: 'Alex Thompson',
    role: 'CEO & Founder',
    image: '/professional-male-ceo-portrait-dark-background.jpg',
    bio: '15+ years in tech leadership',
    social: ['twitter', 'linkedin'],
  },
  {
    name: 'Sarah Chen',
    role: 'CTO',
    image: '/professional-asian-woman-cto-portrait-dark-backgro.jpg',
    bio: 'Former Google engineer',
    social: ['github', 'linkedin'],
  },
  {
    name: 'Marcus Williams',
    role: 'Head of Design',
    image: '/professional-black-man-designer-portrait-dark-back.jpg',
    bio: 'Award-winning UX designer',
    social: ['dribbble', 'linkedin'],
  },
  {
    name: 'Elena Rodriguez',
    role: 'Head of Engineering',
    image: '/professional-latina-woman-engineer-portrait-dark-b.jpg',
    bio: 'Full-stack expert',
    social: ['github', 'twitter'],
  },
];

const milestones = [
  {
    year: '2019',
    title: 'Founded',
    description: 'Started with a vision to transform businesses',
  },
  {
    year: '2020',
    title: 'First Major Client',
    description: 'Partnered with Fortune 500 company',
  },
  {
    year: '2021',
    title: 'Team Growth',
    description: 'Expanded to 25+ team members',
  },
  {
    year: '2022',
    title: 'Global Reach',
    description: 'Clients across 15 countries',
  },
  {
    year: '2023',
    title: 'AI Division',
    description: 'Launched dedicated AI solutions team',
  },
  {
    year: '2024',
    title: '150+ Projects',
    description: 'Milestone of completed projects',
  },
];

const stats = [
  { value: 5, label: 'Years of Excellence', suffix: '+' },
  { value: 150, label: 'Projects Delivered', suffix: '+' },
  { value: 50, label: 'Team Members', suffix: '+' },
  { value: 98, label: 'Client Retention', suffix: '%' },
];

export default function AboutPage() {
  return (
    <main className='min-h-screen bg-background selection:bg-primary/20 selection:text-primary'>
      <Navigation />

      {/* Hero Section */}
      <section className='pt-40 pb-20 relative overflow-hidden'>
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow' />
          <div className='absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000' />
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
                About Somdev Solutions
              </div>

              <h1 className='text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight leading-tight'>
                We Build the{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-accent animate-gradient-x'>
                  Future
                </span>{' '}
                of <br />
                Digital Innovation
              </h1>

              <p className='text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12'>
                Somdev Solutions is a world-class technology company dedicated
                to transforming businesses through innovative digital solutions
                and cutting-edge expertise.
              </p>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12'>
                {stats.map((stat, index) => (
                  <div key={stat.label} className='text-center'>
                    <div className='text-4xl font-bold text-foreground mb-2'>
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className='text-sm text-muted-foreground uppercase tracking-wider font-medium'>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className='py-24 relative'>
        <div className='container mx-auto px-4 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <ScrollReveal>
              <div className='relative'>
                <div className='absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl blur-2xl opacity-20' />
                <div className='relative rounded-3xl overflow-hidden border border-border bg-card backdrop-blur-xl p-8 md:p-12'>
                  <Rocket className='w-12 h-12 text-primary mb-6' />
                  <h2 className='text-3xl font-bold text-foreground mb-6'>
                    Our Mission
                  </h2>
                  <p className='text-muted-foreground text-lg leading-relaxed mb-8'>
                    To empower businesses with transformative technology
                    solutions that drive growth, efficiency, and innovation. We
                    believe in creating digital experiences that make a real
                    difference in how companies operate and connect with their
                    customers.
                  </p>
                  <ul className='space-y-4'>
                    {[
                      'Digital Transformation',
                      'Scalable Architecture',
                      'User-Centric Design',
                    ].map((item) => (
                      <li
                        key={item}
                        className='flex items-center gap-3 text-foreground'
                      >
                        <CheckCircle2 className='w-5 h-5 text-primary' />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className='space-y-8'>
                <div>
                  <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-6'>
                    Driving Global <span className='text-primary'>Impact</span>
                  </h2>
                  <p className='text-muted-foreground text-lg leading-relaxed'>
                    We envision a world where technology seamlessly enhances
                    every aspect of business. Our goal is to be the global
                    leader in digital transformation, recognized for our
                    innovative approach and exceptional quality.
                  </p>
                </div>

                <div className='grid gap-6'>
                  <TiltCard className='h-full'>
                    <div className='p-6 rounded-2xl bg-card border border-border hover:bg-muted transition-colors'>
                      <Globe className='w-8 h-8 text-accent mb-4' />
                      <h3 className='text-xl font-bold text-foreground mb-2'>
                        Global Reach
                      </h3>
                      <p className='text-muted-foreground'>
                        Serving clients across 15+ countries with 24/7 support.
                      </p>
                    </div>
                  </TiltCard>
                  <TiltCard className='h-full'>
                    <div className='p-6 rounded-2xl bg-card border border-border hover:bg-muted transition-colors'>
                      <Zap className='w-8 h-8 text-yellow-400 mb-4' />
                      <h3 className='text-xl font-bold text-foreground mb-2'>
                        Rapid Innovation
                      </h3>
                      <p className='text-muted-foreground'>
                        Deploying cutting-edge solutions faster than the
                        competition.
                      </p>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className='py-24 bg-muted/20 relative overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background' />
        <div className='container mx-auto px-4 lg:px-8 relative'>
          <ScrollReveal>
            <div className='text-center mb-16'>
              <p className='text-primary text-sm font-medium uppercase tracking-widest mb-4'>
                Our Core Values
              </p>
              <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
                What Drives Us Forward
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Our culture is built on a foundation of excellence, integrity,
                and a relentless pursuit of innovation.
              </p>
            </div>
          </ScrollReveal>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 100}>
                <CometCard glowColor={value.color}>
                  <div className='h-full p-8 flex flex-col items-center text-center bg-card backdrop-blur-xl rounded-2xl border border-border hover:bg-muted transition-colors'>
                    <div
                      className='w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 hover:scale-110'
                      style={{
                        backgroundColor: `${value.color}15`,
                        color: value.color,
                      }}
                    >
                      <value.icon className='w-8 h-8' />
                    </div>
                    <h3 className='text-xl font-bold text-foreground mb-4'>
                      {value.title}
                    </h3>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      {value.description}
                    </p>
                  </div>
                </CometCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className='py-24 relative'>
        <div className='container mx-auto px-4 lg:px-8'>
          <ScrollReveal>
            <div className='text-center mb-20'>
              <p className='text-primary text-sm font-medium uppercase tracking-widest mb-4'>
                Our Journey
              </p>
              <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
                Milestones Along the Way
              </h2>
            </div>
          </ScrollReveal>

          <div className='max-w-4xl mx-auto relative'>
            {/* Timeline Line */}
            <div className='absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30' />

            <div className='space-y-12'>
              {milestones.map((milestone, index) => (
                <ScrollReveal key={milestone.year} delay={index * 100}>
                  <div
                    className={`flex flex-col md:flex-row gap-8 items-center ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className='flex-1 w-full md:w-auto'>
                      <div
                        className={`glass p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 ${
                          index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                        }`}
                      >
                        <h3 className='text-xl font-bold text-foreground mb-2'>
                          {milestone.title}
                        </h3>
                        <p className='text-muted-foreground'>
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    <div className='relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-[#0a0a0a] border-4 border-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.3)]'>
                      <div className='w-3 h-3 rounded-full bg-primary animate-pulse' />
                    </div>

                    <div
                      className={`flex-1 w-full md:w-auto ${
                        index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      <span className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 opacity-50'>
                        {milestone.year}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className='py-24 bg-black/20'>
        <div className='container mx-auto px-4 lg:px-8'>
          <ScrollReveal>
            <div className='text-center mb-16'>
              <p className='text-primary text-sm font-medium uppercase tracking-widest mb-4'>
                Our Team
              </p>
              <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
                Meet the Experts
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                The brilliant minds behind our innovative solutions.
              </p>
            </div>
          </ScrollReveal>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 100}>
                <div className='group relative'>
                  <div className='relative overflow-hidden rounded-3xl aspect-[3/4] mb-6'>
                    <img
                      src={member.image || '/placeholder.svg'}
                      alt={member.name}
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity' />

                    {/* Social Links Overlay */}
                    <div className='absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                      <div className='flex justify-center gap-4'>
                        {member.social.map((social) => (
                          <div
                            key={social}
                            className='w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-black transition-colors cursor-pointer'
                          >
                            <span className='capitalize text-xs'>
                              {social[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className='text-center'>
                    <h3 className='text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors'>
                      {member.name}
                    </h3>
                    <p className='text-primary/80 text-sm font-medium mb-2'>
                      {member.role}
                    </p>
                    <p className='text-muted-foreground text-sm'>
                      {member.bio}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
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
                Ready to Transform Your Business?
              </h2>
              <p className='text-xl text-muted-foreground mb-10 max-w-2xl mx-auto'>
                Join forces with Somdev Solutions and let's build something
                extraordinary together.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <MagneticButton>
                  <Link href='/contact'>
                    <Button
                      size='lg'
                      className='bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full'
                    >
                      Start a Project
                      <ArrowRight className='ml-2 w-5 h-5' />
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href='/careers'>
                    <Button
                      variant='outline'
                      size='lg'
                      className='border-white/10 text-white hover:bg-white/5 px-8 py-6 text-lg rounded-full'
                    >
                      Join Our Team
                    </Button>
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
