'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  CheckCircle,
  ChevronDown,
  Check,
  PhoneCall,
  X,
  Mic,
  MicOff,
  PhoneOff,
} from 'lucide-react';
import { ScrollReveal } from '@/components/animations';
import { cn } from '@/lib/utils';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@somdev.com',
    subtext: 'We respond within 24 hours',
    link: 'mailto:contact@somdev.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+252 634 223 100',
    subtext: 'Mon - Fri, 9AM - 6PM PST',
    link: 'tel:+252634223100',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: '123 Tech Boulevard, Suite 500',
    subtext: 'Xidigta, Hargeisa',
    link: null,
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Monday - Friday',
    subtext: '9:00 AM - 6:00 PM PST',
    link: null,
  },
];

const inquiryTypes = [
  { value: 'general', label: 'General Question' },
  { value: 'support', label: 'Technical Support' },
  { value: 'consultation', label: 'Free Consultation' },
  { value: 'partnership', label: 'Partnership Inquiry' },
  { value: 'other', label: 'Other' },
];

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

function CustomSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <label className='block text-sm font-semibold text-muted-foreground mb-3'>
        {label} {required && '*'}
      </label>
      <div className='relative'>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full px-5 py-4 rounded-xl bg-card border text-left flex items-center justify-between transition-all duration-300',
            isOpen
              ? 'border-primary ring-2 ring-primary/20'
              : 'border-border hover:border-muted-foreground',
            value ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          <span className='truncate'>
            {value
              ? options.find((opt) => opt.value === value)?.label
              : placeholder || 'Select...'}
          </span>
          <ChevronDown
            className={cn(
              'w-5 h-5 text-muted-foreground transition-transform duration-300',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <>
            <div
              className='fixed inset-0 z-10'
              onClick={() => setIsOpen(false)}
            />
            <div className='absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200'>
              <div className='max-h-60 overflow-y-auto py-2'>
                {options.map((option) => (
                  <button
                    key={option.value}
                    type='button'
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'w-full px-5 py-3 text-left text-sm transition-colors duration-200 flex items-center justify-between group/option',
                      value === option.value
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {option.label}
                    {value === option.value && <Check className='w-4 h-4' />}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Professional Customer Support Call Modal
interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function VapiCallModal({ isOpen, onClose }: CallModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isConnected) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isConnected]);

  const handleStartCall = async () => {
    setIsConnecting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsConnecting(false);
    setIsConnected(true);
  };

  const handleEndCall = () => {
    setIsConnected(false);
    setCallDuration(0);
    onClose();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
      <div
        className='absolute inset-0 bg-background/80 backdrop-blur-xl'
        onClick={!isConnected ? onClose : undefined}
      />
      <div className='relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300'>
        <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent' />

        {!isConnected && (
          <button
            onClick={onClose}
            className='absolute top-6 right-6 z-50 p-2 rounded-full bg-muted/50 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-all'
          >
            <X className='w-5 h-5' />
          </button>
        )}

        <div className='p-10'>
          <div className='text-center mb-8'>
            {isConnecting && (
              <div className='mb-6'>
                <div className='w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30 animate-pulse'>
                  <PhoneCall className='w-10 h-10 text-primary' />
                </div>
              </div>
            )}

            {isConnected && (
              <div className='mb-6'>
                <div className='w-20 h-20 mx-auto rounded-full bg-green-500/10 flex items-center justify-center border-2 border-green-500/30 relative'>
                  <Phone className='w-10 h-10 text-green-500' />
                  <div className='absolute -top-1 -right-1'>
                    <span className='relative flex h-3 w-3'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                      <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {!isConnecting && !isConnected && (
              <div className='mb-6'>
                <div className='w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center border-2 border-primary/30'>
                  <PhoneCall className='w-10 h-10 text-primary' />
                </div>
              </div>
            )}

            <h2 className='text-2xl font-bold text-foreground mb-2'>
              {isConnecting
                ? 'Connecting to Support...'
                : isConnected
                ? 'Customer Support'
                : 'Contact Support'}
            </h2>
            <p className='text-muted-foreground text-base'>
              {isConnecting
                ? 'Please wait while we connect you'
                : isConnected
                ? 'You are now connected with our support team'
                : 'Speak with a support representative'}
            </p>
          </div>

          {isConnected && (
            <div className='mb-8 p-6 rounded-2xl bg-muted/30 border border-border'>
              <div className='flex items-center gap-4'>
                <div className='relative'>
                  <div className='w-14 h-14 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white font-bold text-xl'>
                    SS
                  </div>
                  <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background' />
                </div>
                <div className='flex-1'>
                  <h3 className='text-foreground font-semibold text-lg mb-1'>
                    SomDev Support
                  </h3>
                  <p className='text-muted-foreground text-sm'>Support Team</p>
                </div>
                <div className='text-right'>
                  <div className='text-2xl font-bold text-primary tabular-nums'>
                    {formatTime(callDuration)}
                  </div>
                  <p className='text-xs text-gray-500'>Duration</p>
                </div>
              </div>
            </div>
          )}

          {isConnecting && (
            <div className='mb-8'>
              <div className='flex justify-center items-center gap-2 mb-4'>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className='w-2.5 h-2.5 bg-primary rounded-full animate-bounce'
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <p className='text-center text-sm text-gray-500'>
                Establishing secure connection...
              </p>
            </div>
          )}

          {!isConnecting && (
            <div className='space-y-4'>
              {!isConnected ? (
                <>
                  <button
                    onClick={handleStartCall}
                    className='w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-primary to-cyan-400 text-white font-bold text-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 group'
                  >
                    <PhoneCall className='w-6 h-6 group-hover:rotate-12 transition-transform' />
                    Start Call
                  </button>

                  <div className='p-5 rounded-xl bg-muted/30 border border-border'>
                    <div className='flex items-start gap-3'>
                      <div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5'>
                        <HelpCircle className='w-5 h-5 text-primary' />
                      </div>
                      <div>
                        <h4 className='text-foreground font-semibold text-sm mb-1'>
                          24/7 Support Available
                        </h4>
                        <p className='text-xs text-muted-foreground leading-relaxed'>
                          Our support team is here to help you with any
                          questions or concerns. Calls are free and
                          confidential.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className='flex items-center justify-center gap-6'>
                    <button
                      onClick={toggleMute}
                      className={cn(
                        'p-5 rounded-2xl transition-all duration-300 border-2',
                        isMuted
                          ? 'bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20'
                          : 'bg-card border-border text-foreground hover:bg-muted hover:border-primary/20'
                      )}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <MicOff className='w-6 h-6' />
                      ) : (
                        <Mic className='w-6 h-6' />
                      )}
                    </button>

                    <button
                      onClick={handleEndCall}
                      className='p-6 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 hover:scale-110 border-2 border-red-400/50'
                      title='End Call'
                    >
                      <PhoneOff className='w-7 h-7' />
                    </button>
                  </div>

                  <div className='flex items-center justify-center gap-2 text-sm text-gray-400 mt-2'>
                    <div className='w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse' />
                    <span>Excellent connection quality</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        inquiryType: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <main className='min-h-screen bg-background'>
      <Navigation />

      {/* Hero Section - Increased text sizes */}
      <section className='pt-32 pb-20 relative overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse-slow' />
          <div className='absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000' />
          <div className='absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]' />
        </div>

        <div className='container mx-auto px-4 lg:px-8 max-w-7xl relative'>
          <ScrollReveal>
            <div className='max-w-3xl mx-auto text-center mb-20'>
              <div className='inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-full mb-8'>
                <MessageCircle className='w-4 h-4 text-primary' />
                <span className='text-sm font-semibold text-primary uppercase tracking-wider'>
                  Get in Touch
                </span>
              </div>
              <h1 className='text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight'>
                Have a{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-cyan-300'>
                  Question?
                </span>
              </h1>
              <p className='text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
                We're here to help! Reach out to us with any questions,
                concerns, or inquiries you may have.
              </p>
            </div>
          </ScrollReveal>

          {/* Main Content Grid */}
          <div className='grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto'>
            {/* Contact Form */}
            <ScrollReveal delay={100}>
              <div className='bg-card border border-border rounded-3xl p-8 lg:p-10 shadow-2xl shadow-primary/5'>
                <div className='mb-8'>
                  <h2 className='text-3xl font-bold text-foreground mb-3'>
                    Send Us a Message
                  </h2>
                  <p className='text-muted-foreground text-lg'>
                    Fill out the form below and we'll get back to you within one
                    business day.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className='py-16 text-center animate-in fade-in zoom-in-95 duration-500'>
                    <div className='w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6 mx-auto shadow-2xl shadow-green-500/30'>
                      <CheckCircle className='w-10 h-10 text-white' />
                    </div>
                    <h3 className='text-2xl font-bold text-foreground mb-3'>
                      Message Sent!
                    </h3>
                    <p className='text-muted-foreground text-lg'>
                      Thank you for reaching out. We'll get back to you soon!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                      <label className='block text-base font-semibold text-foreground mb-3'>
                        Full Name *
                      </label>
                      <input
                        type='text'
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className='w-full px-5 py-4 rounded-xl bg-card border border-border text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300'
                        placeholder='Enter Your Full Name'
                      />
                    </div>

                    <div className='grid md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-base font-semibold text-foreground mb-3'>
                          Email Address *
                        </label>
                        <input
                          type='email'
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className='w-full px-5 py-4 rounded-xl bg-card border border-border text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300'
                          placeholder='Enter Your Company Email'
                        />
                      </div>
                      <div>
                        <label className='block text-base font-semibold text-foreground mb-3'>
                          Phone Number
                        </label>
                        <input
                          type='tel'
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className='w-full px-5 py-4 rounded-xl bg-card border border-border text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300'
                          placeholder='Enter Your Number'
                        />
                      </div>
                    </div>

                    <div className='grid md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-base font-semibold text-foreground mb-3'>
                          Company Name
                        </label>
                        <input
                          type='text'
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          className='w-full px-5 py-4 rounded-xl bg-card border border-border text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300'
                          placeholder='Your Company Ltd'
                        />
                      </div>
                      <CustomSelect
                        label='Inquiry Type'
                        value={formData.inquiryType}
                        onChange={(val) =>
                          setFormData({ ...formData, inquiryType: val })
                        }
                        options={inquiryTypes}
                        placeholder='Select inquiry type'
                        required
                      />
                    </div>

                    <div>
                      <label className='block text-base font-semibold text-foreground mb-3'>
                        Subject *
                      </label>
                      <input
                        type='text'
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className='w-full px-5 py-4 rounded-xl bg-card border border-border text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300'
                        placeholder='What is this about?'
                      />
                    </div>

                    <div>
                      <label className='block text-base font-semibold text-foreground mb-3'>
                        Your Message *
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={6}
                        className='w-full px-5 py-4 rounded-xl bg-card border border-border text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none'
                        placeholder='Please describe your question or inquiry in detail...'
                      />
                    </div>

                    <button
                      type='submit'
                      disabled={isLoading}
                      className={cn(
                        'w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 group',
                        isLoading
                          ? 'bg-primary/50 cursor-not-allowed'
                          : 'bg-gradient-to-r from-primary to-cyan-400 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]'
                      )}
                    >
                      {isLoading ? (
                        <>
                          <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Request
                          <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                        </>
                      )}
                    </button>

                    <p className='text-sm text-muted-foreground text-center'>
                      By submitting this form, you agree to our{' '}
                      <a href='#' className='text-primary hover:underline'>
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a href='#' className='text-primary hover:underline'>
                        Terms of Service
                      </a>
                      .
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Contact Info & Call */}
            <div className='space-y-8'>
              <ScrollReveal delay={200}>
                <div className='bg-card border border-border rounded-3xl p-8 shadow-2xl shadow-primary/5'>
                  <h3 className='text-2xl font-bold text-foreground mb-6 flex items-center gap-3'>
                    <Phone className='w-6 h-6 text-primary' />
                    Contact Information
                  </h3>
                  <div className='space-y-6'>
                    {contactInfo.map((info, index) => (
                      <div
                        key={index}
                        className='flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group'
                      >
                        <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors'>
                          <info.icon className='w-5 h-5 text-primary' />
                        </div>
                        <div className='flex-1'>
                          <div className='text-sm font-semibold text-muted-foreground mb-1'>
                            {info.label}
                          </div>
                          {info.link ? (
                            <a
                              href={info.link}
                              className='text-foreground text-base font-medium hover:text-primary transition-colors block mb-1'
                            >
                              {info.value}
                            </a>
                          ) : (
                            <div className='text-foreground text-base font-medium mb-1'>
                              {info.value}
                            </div>
                          )}
                          <div className='text-sm text-muted-foreground'>
                            {info.subtext}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className='bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10 border border-primary/20 rounded-3xl p-8 shadow-2xl shadow-primary/5'>
                  <div className='flex items-start gap-4 mb-6'>
                    <div className='w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0'>
                      <HelpCircle className='w-6 h-6 text-primary' />
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-foreground mb-2'>
                        Need Immediate Help?
                      </h3>
                      <p className='text-muted-foreground text-base leading-relaxed'>
                        Talk to our support team for instant answers or email us
                        directly.
                      </p>
                    </div>
                  </div>
                  <div className='space-y-3'>
                    <button
                      onClick={() => setIsCallModalOpen(true)}
                      className='flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-gradient-to-r from-primary to-cyan-400 hover:shadow-xl hover:shadow-primary/30 text-white font-semibold transition-all duration-300 hover:scale-105'
                    >
                      <PhoneCall className='w-5 h-5' />
                      Call Support Now
                    </button>
                    <a
                      href='mailto:contact@somdev.com'
                      className='flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-muted/30 hover:bg-muted/50 border border-border text-foreground font-semibold transition-all duration-300'
                    >
                      <Mail className='w-5 h-5' />
                      Email Us
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <VapiCallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />
    </main>
  );
}
