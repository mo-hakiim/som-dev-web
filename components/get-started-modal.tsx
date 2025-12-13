'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Check,
  DollarSign,
  Mail,
  Phone,
  User,
  FileText,
  Target,
  Calendar,
  Zap,
  ChevronRight,
  Rocket,
  ShieldCheck,
  Globe,
  Smartphone,
  Layout,
  Code2,
  MessageSquare,
  Star,
  Send,
  Building2,
  Briefcase,
  Users,
  Clock,
  TrendingUp,
  Award,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  { id: 'auth', label: 'Authentication', icon: ShieldCheck, color: '#10b981' },
  { id: 'payment', label: 'Payments', icon: DollarSign, color: '#f59e0b' },
  { id: 'admin', label: 'Admin Panel', icon: Layout, color: '#8b5cf6' },
  { id: 'analytics', label: 'Analytics', icon: Target, color: '#ec4899' },
  { id: 'api', label: 'API', icon: Code2, color: '#06b6d4' },
  { id: 'mobile', label: 'Responsive', icon: Smartphone, color: '#14b8a6' },
  { id: 'db', label: 'Database', icon: FileText, color: '#6366f1' },
  { id: 'cloud', label: 'Cloud', icon: Globe, color: '#3b82f6' },
  { id: 'realtime', label: 'Real-time', icon: Zap, color: '#eab308' },
  // New Features
  { id: 'seo', label: 'SEO Optimization', icon: TrendingUp, color: '#84cc16' },
  { id: 'cms', label: 'CMS Integrated', icon: Layout, color: '#f97316' },
  { id: 'blog', label: 'Blog System', icon: MessageSquare, color: '#eab308' },
  { id: 'multilang', label: 'Multi-language', icon: Globe, color: '#0ea5e9' },
  { id: 'sso', label: 'SSO Login', icon: User, color: '#6366f1' },
  { id: 'audit', label: 'Audit Logs', icon: FileText, color: '#a855f7' },
  { id: 'ai', label: 'AI Integration', icon: Sparkles, color: '#10b981' },
  {
    id: 'security',
    label: 'Adv. Security',
    icon: ShieldCheck,
    color: '#ef4444',
  },
  { id: 'blockchain', label: 'Blockchain', icon: Code2, color: '#3b82f6' },
];

// All Services from the website
const services = [
  {
    value: 'web-dev',
    label: 'Web Development',
    icon: Globe,
    desc: 'Full-stack web solutions',
    color: '#3b82f6',
  },
  {
    value: 'mobile-dev',
    label: 'Mobile Development',
    icon: Smartphone,
    desc: 'iOS & Android apps',
    color: '#14b8a6',
  },
  {
    value: 'ui-ux',
    label: 'UI/UX Design',
    icon: Layout,
    desc: 'Beautiful interfaces',
    color: '#8b5cf6',
  },
  {
    value: 'cloud',
    label: 'Cloud Solutions',
    icon: Globe,
    desc: 'Scalable infrastructure',
    color: '#06b6d4',
  },
  {
    value: 'ai-ml',
    label: 'AI & ML',
    icon: Sparkles,
    desc: 'Intelligent automation',
    color: '#ec4899',
  },
  {
    value: 'devops',
    label: 'DevOps & CI/CD',
    icon: Rocket,
    desc: 'Automated workflows',
    color: '#f59e0b',
  },
  {
    value: 'blockchain',
    label: 'Blockchain',
    icon: ShieldCheck,
    desc: 'Decentralized apps',
    color: '#10b981',
  },
  {
    value: 'consulting',
    label: 'Tech Consulting',
    icon: Target,
    desc: 'Strategic guidance',
    color: '#6366f1',
  },
  {
    value: 'maintenance',
    label: 'Support & Maintenance',
    icon: ShieldCheck,
    desc: 'Ongoing support',
    color: '#ef4444',
  },
];

// Payment options
const paymentMethods = [
  {
    value: 'upfront-50',
    label: '50% Upfront',
    desc: '50% now, 50% on completion',
    icon: DollarSign,
    popular: true,
  },
  {
    value: 'milestone',
    label: 'Milestone-Based',
    desc: 'Pay as we progress',
    icon: Target,
    popular: false,
  },
  {
    value: 'monthly',
    label: 'Monthly Retainer',
    desc: 'Fixed monthly fee',
    icon: Calendar,
    popular: false,
  },
  {
    value: 'full-upfront',
    label: 'Full Upfront',
    desc: '100% now (5% discount)',
    icon: Award,
    popular: false,
  },
];

const packages = [
  {
    id: 'basic',
    label: 'Basic Package',
    budget: '< $10K',
    timeline: '1-3 Months',
    description: 'Perfect for MVPs & Startups',
    features: [
      'Core Development',
      'Standard UI/UX',
      'Basic SEO',
      'Email Support',
    ],
    color: '#10b981',
    icon: Zap,
    popular: false,
  },
  {
    id: 'enterprise',
    label: 'Enterprise Package',
    budget: '$10K - $50K',
    timeline: '3-6 Months',
    description: 'For Scaling Businesses',
    features: [
      'Advanced Features',
      'Premium UI Design',
      'CMS Integration',
      'Priority Support',
    ],
    color: '#f59e0b',
    icon: Building2,
    popular: true,
  },
  {
    id: 'premium',
    label: 'Premium Package',
    budget: '$50K+',
    timeline: '6+ Months',
    description: 'Full Digital Transformation',
    features: [
      'Complex Architecture',
      'Custom AI Solutions',
      'Full DevOps',
      '24/7 Dedicated Team',
    ],
    color: '#8b5cf6',
    icon: Award,
    popular: false,
  },
];

const teamSizes = [
  { value: 'solo', label: 'Just Me', icon: User },
  { value: 'small', label: '2-10', icon: Users },
  { value: 'medium', label: '11-50', icon: Users },
  { value: 'large', label: '50+', icon: Users },
];

const priorities = [
  { value: 'urgent', label: 'Urgent', color: '#ef4444', icon: Zap },
  { value: 'high', label: 'High Priority', color: '#f59e0b', icon: TrendingUp },
  { value: 'normal', label: 'Normal', color: '#3b82f6', icon: Clock },
  { value: 'flexible', label: 'Flexible', color: '#8b5cf6', icon: Calendar },
];

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>(
    'idle'
  );
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    projectName: '',
    description: '',
    budget: '',
    timeline: '',
    package: '',
    teamSize: '',
    priority: '',
    paymentMethod: '',
    selectedFeatures: [] as string[],
    contactMethod: 'email',
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setFormState('idle');
        setFormData({
          service: '',
          name: '',
          email: '',
          phone: '',
          company: '',
          projectName: '',
          description: '',
          budget: '',
          timeline: '',
          package: '',
          teamSize: '',
          priority: '',
          paymentMethod: '',
          selectedFeatures: [],
          contactMethod: 'email',
        });
      }, 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Form submitted:', formData);
    setFormState('success');
  };

  const toggleFeature = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(featureId)
        ? prev.selectedFeatures.filter((f) => f !== featureId)
        : [...prev.selectedFeatures, featureId],
    }));
  };

  // Calculate form completion
  const calculateProgress = () => {
    const fields = [
      formData.service,
      formData.name,
      formData.projectName,
      formData.description,
      formData.budget,
      formData.timeline,
      formData.contactMethod === 'email' || formData.contactMethod === 'both'
        ? formData.email
        : 'ok',
      formData.contactMethod === 'phone' || formData.contactMethod === 'both'
        ? formData.phone
        : 'ok',
    ];
    const filled = fields.filter((f) => f).length;
    return Math.round((filled / fields.length) * 100);
  };

  const progress = calculateProgress();

  if (!isVisible && !isOpen) return null;

  const primaryColor = '#6366f1';

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Enhanced Backdrop */}
      <div
        className='absolute inset-0 backdrop-blur-3xl transition-all duration-500'
        style={{
          background: `radial-gradient(circle at 50% 50%, ${primaryColor}10, rgba(0,0,0,0.85))`,
        }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={cn(
          'relative w-full max-w-6xl max-h-[94vh] transition-all duration-700 ease-out',
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        )}
      >
        {/* Multi-Layer Glows */}
        <div
          className='absolute -inset-2 rounded-[2.5rem] opacity-60 blur-3xl animate-pulse-slow'
          style={{
            background: `linear-gradient(135deg, ${primaryColor}40, transparent, ${primaryColor}40)`,
          }}
        />
        <div
          className='absolute -inset-1 rounded-[2.5rem] opacity-30 blur-2xl'
          style={{
            background: `conic-gradient(from 0deg, ${primaryColor}30, transparent, ${primaryColor}30)`,
          }}
        />

        {/* Main Container */}
        <div className='relative bg-gradient-to-br from-card/98 via-card/96 to-card/98 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden'>
          {/* Background Effects */}
          <div
            className='absolute inset-0 opacity-[0.02]'
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${primaryColor} 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
          <div
            className='absolute top-0 right-0 w-80 h-80 opacity-20 blur-[120px] animate-pulse'
            style={{
              background: `radial-gradient(circle, ${primaryColor}, transparent)`,
            }}
          />
          <div
            className='absolute bottom-0 left-0 w-80 h-80 opacity-20 blur-[120px] animate-pulse animation-delay-1000'
            style={{
              background: `radial-gradient(circle, #8b5cf6, transparent)`,
            }}
          />

          {/* Progress Bar */}
          {formState !== 'success' && (
            <div className='absolute top-0 left-0 right-0 h-1.5 bg-background/20 overflow-hidden'>
              <div
                className='h-full transition-all duration-500 ease-out'
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${primaryColor}, #8b5cf6)`,
                  boxShadow: `0 0 10px ${primaryColor}80`,
                }}
              />
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className='absolute right-6 top-6 z-50 p-2.5 rounded-full bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all duration-300 hover:rotate-90 hover:scale-110 shadow-xl group'
          >
            <X className='h-4 w-4' />
          </button>

          <div className='relative z-10 max-h-[94vh] overflow-y-auto custom-scrollbar'>
            {formState === 'success' ? (
              /* Enhanced Success State - keeping existing code */
              <div className='p-20 text-center'>
                <div className='relative inline-block mb-12 animate-in zoom-in duration-700'>
                  {/* Celebration Effect */}
                  <div className='absolute -inset-20'>
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className='absolute w-2 h-2 rounded-full animate-ping'
                        style={{
                          background: [
                            '#10b981',
                            '#f59e0b',
                            '#8b5cf6',
                            '#3b82f6',
                          ][i % 4],
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '2s',
                        }}
                      />
                    ))}
                  </div>
                  <div
                    className='absolute inset-0 blur-3xl opacity-60 animate-pulse'
                    style={{ background: '#10b981' }}
                  />
                  <div
                    className='relative w-32 h-32 rounded-full flex items-center justify-center'
                    style={{
                      background:
                        'linear-gradient(135deg, #10b98140, #10b98110)',
                      border: '3px solid #10b98160',
                      boxShadow: '0 20px 60px #10b98150',
                    }}
                  >
                    <Check className='w-16 h-16 text-emerald-500 animate-bounce-subtle' />
                  </div>
                </div>
                <div className='space-y-2 mb-12'>
                  <h3 className='text-5xl font-bold text-foreground mb-4'>
                    Submission Successful!
                  </h3>
                  <p className='text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
                    Thank you for choosing us! Our expert team will review your
                    project and reach out within 24 hours.
                  </p>
                  <div className='flex items-center justify-center gap-8 mt-8 text-sm'>
                    <div className='flex items-center gap-2'>
                      <div className='w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center'>
                        <Check className='w-4 h-4 text-emerald-500' />
                      </div>
                      <span className='text-muted-foreground'>
                        Project Received
                      </span>
                    </div>
                    <ChevronRight className='w-4 h-4 text-muted-foreground/40' />
                    <div className='flex items-center gap-2'>
                      <div className='w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center'>
                        <Loader2 className='w-4 h-4 text-blue-500 animate-spin' />
                      </div>
                      <span className='text-muted-foreground'>Team Review</span>
                    </div>
                    <ChevronRight className='w-4 h-4 text-muted-foreground/40' />
                    <div className='flex items-center gap-2'>
                      <div className='w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center'>
                        <Rocket className='w-4 h-4 text-purple-500' />
                      </div>
                      <span className='text-muted-foreground'>
                        We'll Reach Out
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className='relative group px-12 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-2xl overflow-hidden'
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
                    boxShadow: `0 10px 40px ${primaryColor}40`,
                  }}
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />
                  <span className='relative'>Back to Home</span>
                </button>
              </div>
            ) : (
              <div className='p-10 lg:p-14'>
                {/* Header */}
                <div className='text-center mb-10'>
                  <div
                    className='inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-6 backdrop-blur-2xl transition-all duration-500 hover:scale-105 cursor-default'
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}20, ${primaryColor}08)`,
                      border: `1px solid ${primaryColor}30`,
                      boxShadow: `0 4px 24px ${primaryColor}15, inset 0 1px 0 rgba(255,255,255,0.1)`,
                    }}
                  >
                    <Award
                      className='w-4 h-4 animate-pulse'
                      style={{ color: primaryColor }}
                    />
                    <span
                      className='text-sm font-bold tracking-wide'
                      style={{ color: primaryColor }}
                    >
                      Premium Development Services
                    </span>
                    <div className='flex gap-0.5'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className='w-3 h-3 fill-yellow-400 text-yellow-400'
                        />
                      ))}
                    </div>
                  </div>

                  <h2 className='text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight'>
                    Let's Build Something
                    <span
                      className='block mt-1'
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, #8b5cf6)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Extraordinary Together
                    </span>
                  </h2>
                  <p className='text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
                    Share your vision and we'll transform it into reality with
                    cutting-edge technology
                  </p>

                  {/* Progress Indicator */}
                  <div className='mt-6 max-w-md mx-auto'>
                    <div className='flex items-center justify-between text-xs font-semibold mb-2'>
                      <span className='text-muted-foreground'>
                        Form Completion
                      </span>
                      <span style={{ color: primaryColor }}>{progress}%</span>
                    </div>
                    <div className='h-2 bg-background/40 rounded-full overflow-hidden'>
                      <div
                        className='h-full transition-all duration-500 rounded-full'
                        style={{
                          width: `${progress}%`,
                          background: `linear-gradient(90deg, ${primaryColor}, #8b5cf6)`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className='max-w-5xl mx-auto space-y-8'
                >
                  {/* Service Selection */}
                  <div>
                    <label className='block text-xs font-bold uppercase tracking-widest text-foreground/70 mb-4 flex items-center gap-2'>
                      <Briefcase
                        className='w-4 h-4'
                        style={{ color: primaryColor }}
                      />
                      Select Your Service{' '}
                      <span className='text-red-400 ml-1'>*</span>
                    </label>
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-3'>
                      {services.map((service) => (
                        <button
                          key={service.value}
                          type='button'
                          onClick={() =>
                            setFormData({ ...formData, service: service.value })
                          }
                          className={cn(
                            'relative p-5 rounded-2xl border-2 transition-all duration-300 text-left group overflow-hidden',
                            formData.service === service.value
                              ? 'scale-[1.04] shadow-2xl'
                              : 'bg-card/30 border-border/50 hover:border-primary/20 hover:bg-card/50 hover:scale-[1.02]'
                          )}
                          style={
                            formData.service === service.value
                              ? {
                                  background: `linear-gradient(135deg, ${service.color}12, ${service.color}05)`,
                                  borderColor: `${service.color}80`,
                                  boxShadow: `0 8px 32px ${service.color}30`,
                                }
                              : {}
                          }
                        >
                          {/* Glow effect on hover */}
                          <div
                            className='absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300'
                            style={{
                              background: `radial-gradient(circle, ${service.color}20, transparent)`,
                            }}
                          />
                          <service.icon
                            className='relative z-10 w-7 h-7 mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'
                            style={
                              formData.service === service.value
                                ? { color: service.color }
                                : {}
                            }
                          />
                          <h4 className='relative z-10 text-sm font-bold text-foreground mb-1'>
                            {service.label}
                          </h4>
                          <p className='relative z-10 text-xs text-muted-foreground'>
                            {service.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info Grid */}
                  <div className='grid lg:grid-cols-2 gap-6'>
                    <div className='space-y-6'>
                      <div>
                        <label className='block text-[11px] font-bold uppercase tracking-widest text-foreground/70 mb-2.5'>
                          Full Name <span className='text-red-400'>*</span>
                        </label>
                        <div className='relative group'>
                          <User className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 transition-colors group-focus-within:text-primary' />
                          <input
                            type='text'
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className='w-full pl-11 pr-4 py-3.5 bg-background/40 backdrop-blur-xl border-2 border-border/40 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary/40 focus:bg-background/60 focus:shadow-lg focus:shadow-primary/5 outline-none'
                            placeholder='Your Full Name'
                          />
                        </div>
                      </div>

                      <div>
                        <label className='block text-[11px] font-bold uppercase tracking-widest text-foreground/70 mb-2.5'>
                          Company Name
                        </label>
                        <div className='relative group'>
                          <Building2 className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 transition-colors group-focus-within:text-primary' />
                          <input
                            type='text'
                            value={formData.company}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                company: e.target.value,
                              })
                            }
                            className='w-full pl-11 pr-4 py-3.5 bg-background/40 backdrop-blur-xl border-2 border-border/40 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary/40 focus:bg-background/60 focus:shadow-lg focus:shadow-primary/5 outline-none'
                            placeholder='Acme Inc.'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='space-y-6'>
                      <div>
                        <label className='block text-[11px] font-bold uppercase tracking-widest text-foreground/70 mb-2.5'>
                          Project Name <span className='text-red-400'>*</span>
                        </label>
                        <div className='relative group'>
                          <Rocket className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 transition-colors group-focus-within:text-primary' />
                          <input
                            type='text'
                            required
                            value={formData.projectName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                projectName: e.target.value,
                              })
                            }
                            className='w-full pl-11 pr-4 py-3.5 bg-background/40 backdrop-blur-xl border-2 border-border/40 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary/40 focus:bg-background/60 focus:shadow-lg focus:shadow-primary/5 outline-none'
                            placeholder='My Dream Project'
                          />
                        </div>
                      </div>

                      {/* Contact Method Toggle */}
                      <div>
                        <label className='block text-[11px] font-bold uppercase tracking-widest text-foreground/70 mb-2.5'>
                          Contact Via <span className='text-red-400'>*</span>
                        </label>
                        <div className='flex gap-2 p-1.5 bg-background/30 backdrop-blur-xl rounded-xl border border-border/30'>
                          {[
                            { value: 'email', label: 'Email', icon: Mail },
                            { value: 'phone', label: 'Phone', icon: Phone },
                            {
                              value: 'both',
                              label: 'Both',
                              icon: MessageSquare,
                            },
                          ].map((method) => (
                            <button
                              key={method.value}
                              type='button'
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  contactMethod: method.value,
                                })
                              }
                              className={cn(
                                'flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold transition-all duration-300',
                                formData.contactMethod === method.value
                                  ? 'text-white shadow-lg scale-[1.02]'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-background/40'
                              )}
                              style={
                                formData.contactMethod === method.value
                                  ? {
                                      background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
                                      boxShadow: `0 4px 16px ${primaryColor}40`,
                                    }
                                  : {}
                              }
                            >
                              <method.icon className='w-3.5 h-3.5' />
                              {method.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className='grid lg:grid-cols-2 gap-6'>
                    {(formData.contactMethod === 'email' ||
                      formData.contactMethod === 'both') && (
                      <div className='animate-in fade-in slide-in-from-top-4 duration-300'>
                        <label className='block text-[11px] font-bold uppercase tracking-widest text-foreground/70 mb-2.5'>
                          Email Address <span className='text-red-400'>*</span>
                        </label>
                        <div className='relative group'>
                          <Mail className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 transition-colors group-focus-within:text-primary' />
                          <input
                            type='email'
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className='w-full pl-11 pr-4 py-3.5 bg-background/40 backdrop-blur-xl border-2 border-border/40 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary/40 focus:bg-background/60 focus:shadow-lg focus:shadow-primary/5 outline-none'
                            placeholder='Your Company Email '
                          />
                        </div>
                      </div>
                    )}
                    {(formData.contactMethod === 'phone' ||
                      formData.contactMethod === 'both') && (
                      <div className='animate-in fade-in slide-in-from-top-4 duration-300'>
                        <label className='block text-[11px] font-bold uppercase tracking-widest text-foreground/70 mb-2.5'>
                          Phone Number <span className='text-red-400'>*</span>
                        </label>
                        <div className='relative group'>
                          <Phone className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 transition-colors group-focus-within:text-primary' />
                          <input
                            type='tel'
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className='w-full pl-11 pr-4 py-3.5 bg-background/40 backdrop-blur-xl border-2 border-border/40 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary/40 focus:bg-background/60 focus:shadow-lg focus:shadow-primary/5 outline-none'
                            placeholder='+252 63 XXX XXXX'
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Description */}
                  <div>
                    <div className='flex items-center justify-between mb-2.5'>
                      <label className='block text-[11px] font-bold uppercase tracking-widest text-foreground/70'>
                        Project Description{' '}
                        <span className='text-red-400'>*</span>
                      </label>
                      <span className='text-xs text-muted-foreground'>
                        {formData.description.length}/500
                      </span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      maxLength={500}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className='w-full px-4 py-3.5 bg-background/40 backdrop-blur-xl border-2 border-border/40 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 resize-none transition-all duration-300 focus:border-primary/40 focus:bg-background/60 focus:shadow-lg focus:shadow-primary/5 outline-none'
                      placeholder='Describe your vision, goals, target audience, and what makes your project unique...'
                    />
                  </div>

                  {/* Priority & Team Size */}
                  <div className='grid lg:grid-cols-2 gap-8'>
                    <div>
                      <label className='block text-[11px] font-bold uppercase tracking-widest text-foreground/70 mb-3'>
                        Project Priority
                      </label>
                      <div className='grid grid-cols-2 gap-2'>
                        {priorities.map((priority) => (
                          <button
                            key={priority.value}
                            type='button'
                            onClick={() =>
                              setFormData({
                                ...formData,
                                priority: priority.value,
                              })
                            }
                            className={cn(
                              'flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold border-2 transition-all duration-300',
                              formData.priority === priority.value
                                ? 'scale-105 shadow-lg'
                                : 'bg-card/30 border-border/40 hover:scale-105'
                            )}
                            style={
                              formData.priority === priority.value
                                ? {
                                    background: `linear-gradient(135deg, ${priority.color}15, ${priority.color}08)`,
                                    borderColor: `${priority.color}60`,
                                    color: priority.color,
                                  }
                                : {}
                            }
                          >
                            <priority.icon className='w-3.5 h-3.5' />
                            {priority.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className='block text-[11px] font-bold uppercase tracking-widest text-foreground/70 mb-3'>
                        Team Size
                      </label>
                      <div className='grid grid-cols-2 gap-2'>
                        {teamSizes.map((size) => (
                          <button
                            key={size.value}
                            type='button'
                            onClick={() =>
                              setFormData({ ...formData, teamSize: size.value })
                            }
                            className={cn(
                              'flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold border-2 transition-all duration-300',
                              formData.teamSize === size.value
                                ? 'scale-105 shadow-lg'
                                : 'bg-card/30 border-border/40 hover:scale-105'
                            )}
                            style={
                              formData.teamSize === size.value
                                ? {
                                    background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`,
                                    borderColor: `${primaryColor}60`,
                                    color: primaryColor,
                                  }
                                : {}
                            }
                          >
                            <size.icon className='w-3.5 h-3.5' />
                            {size.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  {/* Package Selection */}
                  <div className='space-y-6'>
                    <label className='block text-[11px] font-bold uppercase tracking-widest text-foreground/70 flex items-center gap-2'>
                      <Award
                        className='w-4 h-4'
                        style={{ color: primaryColor }}
                      />
                      Select Your Package
                    </label>

                    <div className='grid lg:grid-cols-3 gap-4'>
                      {packages.map((pkg) => (
                        <button
                          key={pkg.id}
                          type='button'
                          onClick={() => {
                            setFormData({
                              ...formData,
                              package: pkg.id,
                              budget: pkg.budget,
                              timeline: pkg.timeline,
                            });
                          }}
                          className={cn(
                            'relative p-4 rounded-xl border-2 transition-all duration-300 text-left group overflow-hidden flex flex-col gap-3',
                            formData.package === pkg.id
                              ? 'scale-[1.03] shadow-xl'
                              : 'bg-card/30 border-border/40 hover:border-border hover:bg-card/50 hover:scale-[1.01]',
                            pkg.popular && formData.package !== pkg.id
                              ? 'border-primary/40 bg-primary/5'
                              : ''
                          )}
                          style={
                            formData.package === pkg.id
                              ? {
                                  background: `linear-gradient(135deg, ${pkg.color}15, ${pkg.color}05)`,
                                  borderColor: `${pkg.color}60`,
                                  boxShadow: `0 8px 32px ${pkg.color}20`,
                                }
                              : {}
                          }
                        >
                          <div className='flex items-center justify-between w-full'>
                            <div
                              className='p-2 rounded-lg'
                              style={{
                                background: `${pkg.color}15`,
                                color: pkg.color,
                              }}
                            >
                              <pkg.icon className='w-5 h-5' />
                            </div>
                            {formData.package === pkg.id ? (
                              <div className='absolute top-0 right-0 p-2'>
                                <div
                                  className='w-2 h-2 rounded-full animate-pulse'
                                  style={{ background: pkg.color }}
                                />
                              </div>
                            ) : pkg.popular ? (
                              <span className='px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20'>
                                Popular
                              </span>
                            ) : null}
                          </div>

                          <div>
                            <h4 className='text-sm font-bold text-foreground'>
                              {pkg.label}
                            </h4>
                            <p className='text-[10px] text-muted-foreground mt-1'>
                              {pkg.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Selected Package Details */}
                    {formData.package && (
                      <div className='animate-in fade-in slide-in-from-top-4 duration-500'>
                        {packages
                          .filter((p) => p.id === formData.package)
                          .map((pkg) => (
                            <div
                              key={pkg.id}
                              className='relative overflow-hidden rounded-2xl border border-white/10 p-6'
                              style={{
                                background: `linear-gradient(135deg, ${pkg.color}10, transparent)`,
                              }}
                            >
                              <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10'>
                                <div className='space-y-1'>
                                  <span className='text-[10px] uppercase tracking-wider text-muted-foreground font-semibold'>
                                    Budget Range
                                  </span>
                                  <div className='flex items-center gap-2 text-lg font-bold text-foreground'>
                                    <DollarSign className='w-4 h-4 text-muted-foreground' />
                                    {pkg.budget}
                                  </div>
                                </div>

                                <div className='space-y-1'>
                                  <span className='text-[10px] uppercase tracking-wider text-muted-foreground font-semibold'>
                                    Timeline
                                  </span>
                                  <div className='flex items-center gap-2 text-lg font-bold text-foreground'>
                                    <Calendar className='w-4 h-4 text-muted-foreground' />
                                    {pkg.timeline}
                                  </div>
                                </div>

                                <div className='space-y-2'>
                                  <span className='text-[10px] uppercase tracking-wider text-muted-foreground font-semibold'>
                                    Included Features
                                  </span>
                                  <ul className='space-y-1.5'>
                                    {pkg.features.map((feat, i) => (
                                      <li
                                        key={i}
                                        className='flex items-center gap-2 text-xs text-foreground/80'
                                      >
                                        <div
                                          className='w-1 h-1 rounded-full'
                                          style={{ background: pkg.color }}
                                        />
                                        {feat}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Stack Customization - Specific to Package */}
                                <div className='space-y-2'>
                                  <span className='text-[10px] uppercase tracking-wider text-muted-foreground font-semibold'>
                                    Recommended Add-ons
                                  </span>
                                  <div className='grid gap-2'>
                                    {features
                                      .filter((f) => {
                                        if (pkg.id === 'basic')
                                          return [
                                            'auth',
                                            'mobile',
                                            'db',
                                            'seo',
                                            'cms',
                                            'blog',
                                          ].includes(f.id);
                                        if (pkg.id === 'enterprise')
                                          return [
                                            'payment',
                                            'admin',
                                            'api',
                                            'multilang',
                                            'sso',
                                            'audit',
                                          ].includes(f.id);
                                        return [
                                          'analytics',
                                          'cloud',
                                          'realtime',
                                          'ai',
                                          'security',
                                          'blockchain',
                                        ].includes(f.id);
                                      })
                                      .map((feature) => {
                                        const price =
                                          pkg.id === 'basic'
                                            ? '+$500'
                                            : pkg.id === 'enterprise'
                                            ? '+$2,500'
                                            : '+$5,000';

                                        const isSelected =
                                          formData.selectedFeatures.includes(
                                            feature.id
                                          );

                                        return (
                                          <button
                                            key={feature.id}
                                            type='button'
                                            onClick={() =>
                                              toggleFeature(feature.id)
                                            }
                                            className={cn(
                                              'relative flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-300 group overflow-hidden',
                                              isSelected
                                                ? 'border-transparent shadow-lg scale-[1.02]'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]'
                                            )}
                                            style={
                                              isSelected
                                                ? {
                                                    background: `linear-gradient(90deg, ${pkg.color}25, ${pkg.color}10)`,
                                                    borderColor: `${pkg.color}40`,
                                                  }
                                                : {}
                                            }
                                          >
                                            <div className='flex items-center gap-2.5'>
                                              <div
                                                className={cn(
                                                  'w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300',
                                                  isSelected
                                                    ? 'border-transparent scale-110'
                                                    : 'border-white/30 group-hover:border-white/50'
                                                )}
                                                style={
                                                  isSelected
                                                    ? { background: pkg.color }
                                                    : {}
                                                }
                                              >
                                                {isSelected && (
                                                  <Check className='w-2.5 h-2.5 text-white' />
                                                )}
                                              </div>
                                              <span
                                                className={cn(
                                                  'text-[11px] font-medium transition-colors',
                                                  isSelected
                                                    ? 'text-foreground font-bold'
                                                    : 'text-muted-foreground group-hover:text-foreground'
                                                )}
                                              >
                                                {feature.label}
                                              </span>
                                            </div>

                                            <span
                                              className={cn(
                                                'text-[10px] px-1.5 py-0.5 rounded-md font-mono transition-colors',
                                                isSelected
                                                  ? 'bg-background/40 text-foreground font-bold'
                                                  : 'bg-white/5 text-muted-foreground/60 group-hover:text-muted-foreground'
                                              )}
                                              style={
                                                isSelected
                                                  ? { color: pkg.color }
                                                  : {}
                                              }
                                            >
                                              {price}
                                            </span>
                                          </button>
                                        );
                                      })}
                                  </div>
                                </div>
                              </div>

                              {/* Decor */}
                              <div
                                className='absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20'
                                style={{ background: pkg.color }}
                              />
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  {/* Submit Button */}
                  <div className='pt-6'>
                    <button
                      type='submit'
                      disabled={formState === 'submitting'}
                      className='relative w-full group overflow-hidden rounded-2xl py-5 px-8 font-bold text-base text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] disabled:opacity-60'
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
                        boxShadow: `0 12px 48px -12px ${primaryColor}50`,
                      }}
                    >
                      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />
                      <div
                        className='absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500'
                        style={{ background: primaryColor }}
                      />

                      <span className='relative flex items-center justify-center gap-3'>
                        {formState === 'submitting' ? (
                          <>
                            <Loader2 className='w-5 h-5 animate-spin' />
                            Processing Your Request...
                          </>
                        ) : (
                          <>
                            <Sparkles className='w-5 h-5 animate-pulse' />
                            Start Your Project Journey
                            <ChevronRight className='w-5 h-5 transition-transform group-hover:translate-x-1' />
                          </>
                        )}
                      </span>
                    </button>

                    {/* Trust Elements */}
                    <div className='flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground/60'>
                      <div className='flex items-center gap-1.5'>
                        <ShieldCheck className='w-4 h-4 text-green-500' />
                        <span>Secure & Encrypted</span>
                      </div>
                      <div className='w-1 h-1 rounded-full bg-muted-foreground/30' />
                      <div className='flex items-center gap-1.5'>
                        <Zap className='w-4 h-4 text-yellow-500' />
                        <span>24hr Response</span>
                      </div>
                      <div className='w-1 h-1 rounded-full bg-muted-foreground/30' />
                      <div className='flex items-center gap-1.5'>
                        <Check className='w-4 h-4 text-blue-500' />
                        <span>No Commitment</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
