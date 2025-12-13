'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  Share2,
  Linkedin,
  Twitter,
  Copy,
  CheckCircle2,
  ArrowLeft,
  Clock,
  Calendar,
  Sparkles,
  User,
  Tag,
} from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface BlogClientProps {
  post: {
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    authorImage: string;
    authorBio: string;
    date: string;
    readTime: string;
    category: string;
  };
}

export function BlogClient({ post }: BlogClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const { theme } = useTheme();

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className='min-h-screen bg-white dark:bg-[#020202] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-600 dark:selection:text-indigo-200 transition-colors duration-500 relative overflow-hidden'>
      <Navigation />

      {/* --- Ambient Background (Theme Aware) --- */}
      <div className='fixed inset-0 z-0 pointer-events-none'>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        {/* Glows */}
        <div className='absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-indigo-500/10 dark:bg-indigo-900/20 rounded-full blur-[120px] animate-blob' />
        <div className='absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-900/10 rounded-full blur-[100px] animate-blob animation-delay-4000' />
      </div>

      {/* Progress Bar (Electric Indigo) */}
      <motion.div
        className='fixed top-0 left-0 right-0 h-1 z-[100] origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500'
        style={{ scaleX }}
      />

      <div className='relative z-10 pt-32 pb-24'>
        <div className='container mx-auto max-w-5xl px-6'>
          {/* Back Link */}
          <Link href='/blog'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className='inline-flex items-center gap-2 mb-12 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors text-xs font-mono font-bold uppercase tracking-widest group'
            >
              <div className='p-2 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 group-hover:bg-indigo-500/10 dark:group-hover:bg-indigo-500/20 transition-colors'>
                <ArrowLeft className='w-4 h-4' />
              </div>
              Back to Journal
            </motion.div>
          </Link>

          {/* Header Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16'>
            {/* Title Section */}
            <div className='col-span-1 lg:col-span-8'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex flex-wrap gap-3 mb-6'
              >
                <span className='px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2'>
                  <Tag className='w-3 h-3' />
                  {post.category}
                </span>
                <span className='px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2'>
                  <Calendar className='w-3 h-3' />
                  {post.date}
                </span>
                <span className='px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2'>
                  <Clock className='w-3 h-3' />
                  {post.readTime}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='text-4xl md:text-6xl font-mono font-bold text-zinc-900 dark:text-white mb-8 leading-tight tracking-tighter'
              >
                {post.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif italic border-l-2 border-indigo-500/50 pl-6'
              >
                {post.excerpt}
              </motion.p>
            </div>

            {/* Metadata "Form" Card (Dossier) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className='col-span-1 lg:col-span-4'
            >
              <div className='relative rounded-2xl bg-zinc-50 dark:bg-[#09090b]/80 backdrop-blur-xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm'>
                <div className='absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none dark:opacity-10' />
                <div className='p-6'>
                  <h3 className='text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-200 dark:border-white/5 pb-2'>
                    Article Metadata
                  </h3>

                  <div className='space-y-6'>
                    {/* Author */}
                    <div className='flex items-center gap-4'>
                      <div className='relative'>
                        <img
                          src={post.authorImage}
                          alt={post.author}
                          className='w-12 h-12 rounded-full border border-white/10 shadow-sm'
                        />
                        <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-50 dark:border-[#09090b] rounded-full' />
                      </div>
                      <div>
                        <p className='text-sm font-bold text-zinc-900 dark:text-white mb-0.5'>
                          {post.author}
                        </p>
                        <p className='text-[10px] text-zinc-500 uppercase tracking-wider font-mono font-medium'>
                          Author
                        </p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='p-3 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/5'>
                        <p className='text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1 font-mono'>
                          Ref
                        </p>
                        <p className='text-xs font-mono text-zinc-600 dark:text-zinc-300'>
                          #8X-29
                        </p>
                      </div>
                      <div className='p-3 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/5'>
                        <p className='text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1 font-mono'>
                          Status
                        </p>
                        <p className='text-xs font-mono text-emerald-500 dark:text-emerald-400 flex items-center gap-1.5'>
                          <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse' />
                          verified
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className='p-4 rounded-xl bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10'>
                      <p className='text-xs text-indigo-900/70 dark:text-indigo-200/80 leading-relaxed font-serif italic'>
                        "{post.authorBio}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Bottom Bar */}
                <div className='h-1 w-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0' />
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='relative aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden mb-20 group border border-zinc-200 dark:border-white/10 shadow-2xl'
          >
            <div className='absolute inset-0 bg-indigo-500/5 dark:bg-indigo-500/10 mix-blend-overlay z-10' />
            <img
              src={post.image}
              alt={post.title}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out'
            />
            {/* Corner Accents */}
            <div className='absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-white/50 dark:border-white/30 rounded-tl-xl z-20' />
            <div className='absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-white/50 dark:border-white/30 rounded-br-xl z-20' />
          </motion.div>

          {/* Article Content */}
          <div className='max-w-[800px] mx-auto'>
            <article
              className='prose prose-lg prose-zinc dark:prose-invert max-w-none 
              font-serif
              prose-headings:font-mono prose-headings:font-bold prose-headings:tracking-tight 
              prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-8 
              prose-li:text-zinc-600 dark:prose-li:text-zinc-400
              prose-strong:text-zinc-900 dark:prose-strong:text-white
              prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500 dark:hover:prose-a:text-indigo-300 
              prose-blockquote:border-l-indigo-500 prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:font-serif
              prose-img:rounded-2xl prose-img:border prose-img:border-zinc-200 dark:prose-img:border-white/10 prose-hr:border-zinc-200 dark:prose-hr:border-white/10'
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Share Section */}
            <div className='mt-24 pt-12 border-t border-zinc-200 dark:border-white/10'>
              <div className='flex flex-col items-center gap-8 text-center'>
                <div className='space-y-2'>
                  <h3 className='text-xl font-mono font-bold text-zinc-900 dark:text-white tracking-tight'>
                    Share this insight
                  </h3>
                  <p className='text-sm text-zinc-500'>
                    Spread definitions of the future.
                  </p>
                </div>

                <div className='flex gap-4'>
                  {[
                    { icon: Twitter, label: 'Twitter' },
                    { icon: Linkedin, label: 'LinkedIn' },
                  ].map((item, i) => (
                    <Button
                      key={i}
                      variant='outline'
                      size='lg'
                      className='rounded-xl border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-all w-14 h-14'
                    >
                      <item.icon className='w-5 h-5' />
                    </Button>
                  ))}
                  <Button
                    variant='outline'
                    size='lg'
                    className='rounded-xl border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-all w-14 h-14'
                    onClick={handleCopy}
                  >
                    {isCopied ? (
                      <CheckCircle2 className='w-5 h-5 text-emerald-500 dark:text-emerald-400' />
                    ) : (
                      <Copy className='w-5 h-5' />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
