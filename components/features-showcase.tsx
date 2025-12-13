'use client';

import { Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Cutting-Edge Technology',
    description:
      'Leverage the latest frameworks and tools to build future-proof solutions',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Optimized performance that keeps your users engaged and satisfied',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security measures to protect your valuable data',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Growth',
    description:
      'Infrastructure that grows seamlessly with your business needs',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export function FeaturesShowcase() {
  return (
    <section className='py-32 relative overflow-hidden'>
      {/* Background Effects */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow' />
        <div className='absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000' />
      </div>

      <div className='container mx-auto px-4 lg:px-8 relative'>
        <div className='text-center mb-20'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6'>
            <Sparkles className='w-4 h-4 text-primary' />
            <span className='text-sm font-semibold text-primary uppercase tracking-widest'>
              Why Choose Us
            </span>
          </div>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6'>
            Engineered for{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-accent'>
              Excellence
            </span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            We combine innovation with reliability to deliver solutions that
            exceed expectations
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className='group relative'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='relative p-8 rounded-3xl bg-card backdrop-blur-md border border-border hover:border-primary/50 transition-all duration-500 h-full overflow-hidden group-hover:shadow-xl'>
                {/* Gradient Glow on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className='relative mb-6'>
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <div className='w-full h-full rounded-2xl bg-background flex items-center justify-center'>
                      <feature.icon className='w-8 h-8 text-foreground' />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className='text-xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-500'>
                  {feature.title}
                </h3>
                <p className='text-muted-foreground leading-relaxed'>
                  {feature.description}
                </p>

                {/* Animated Line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} w-0 group-hover:w-full transition-all duration-500`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
