'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Input } from '@/components/ui/input';
import {
  Search,
  Sparkles,
  Zap,
  Code2,
  Cpu,
  Globe,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';
import { useState, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';

// --- Data ---
const posts = [
  {
    id: 'future-of-ai-web-development',
    title: 'The Future of AI in Web Development',
    excerpt:
      'Explore how artificial intelligence is revolutionizing the way we build, deploy, and scale web applications in 2025.',
    image: '/futuristic-ai-web-development-abstract.jpg',
    category: 'AI & Tech',
    date: 'Nov 15, 2024',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 'nextjs-15-features',
    title: "Next.js 15: What's New",
    excerpt:
      'A deep dive into the latest features of Next.js 15, including Turbopack and the new React Compiler.',
    image: '/nextjs-modern-web-framework-dark.jpg',
    category: 'Engineering',
    date: 'Nov 10, 2024',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 'cloud-architecture-best-practices',
    title: 'Modern Cloud Patterns',
    excerpt:
      'Essential architecture patterns ensuring scalability, reliability, and cost-efficiency.',
    image: '/cloud-architecture-diagram-modern-dark.jpg',
    category: 'Cloud',
    date: 'Nov 05, 2024',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns',
    excerpt:
      'Master advanced TypeScript patterns to write more maintainable and type-safe code.',
    image: '/placeholder.svg',
    category: 'Engineering',
    date: 'Oct 15, 2024',
    readTime: '9 min read',
    featured: false,
  },
  {
    id: 'design-systems-scale',
    title: 'Scalable Design Systems',
    excerpt:
      'How to create a unified design language that bridges the gap between designers and engineers.',
    image: '/placeholder.svg',
    category: 'Design',
    date: 'Oct 28, 2024',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: 'mobile-app-security',
    title: 'Mobile Security Guide',
    excerpt:
      'A comprehensive guide to protecting your mobile applications from common Modern security vulnerabilities.',
    image: '/placeholder.svg',
    category: 'Security',
    date: 'Oct 20, 2024',
    readTime: '12 min read',
    featured: false,
  },
];

const categories = [
  { name: 'All', icon: Globe },
  { name: 'AI & Tech', icon: Sparkles },
  { name: 'Engineering', icon: Code2 },
  { name: 'Cloud', icon: Cpu },
  { name: 'Design', icon: Zap },
];

// --- Components ---

function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        'group relative border overflow-hidden rounded-3xl transition-colors duration-300',
        'bg-white border-black/5 hover:border-black/10 dark:bg-[#0A0A0A] dark:border-white/5 dark:hover:border-white/10',
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className='pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100'
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              var(--spotlight-color),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { theme } = useTheme();

  // Filter Logic
  const filteredPosts = posts.filter((post) => {
    if (activeCategory === 'All') return true;
    return (
      post.category === activeCategory ||
      (activeCategory === 'Engineering' &&
        ['Web Development', 'Development'].includes(post.category))
    );
  });

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const gridPosts = filteredPosts.filter((p) => p.id !== featuredPost.id);

  return (
    <main
      className='min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-500'
      style={{
        ['--spotlight-color' as any]:
          theme === 'dark' ? 'rgba(14, 165, 233, 0.15)' : 'rgba(0, 0, 0, 0.05)',
      }}
    >
      <Navigation />

      {/* --- Ambient Background --- */}
      <div className='fixed inset-0 z-0 pointer-events-none overflow-hidden'>
        {/* Light Mode Blobs */}
        <div className='absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[100px] opacity-60 mix-blend-multiply dark:mix-blend-normal animate-blob' />
        <div className='absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-100/50 dark:bg-purple-900/10 rounded-full blur-[100px] opacity-60 mix-blend-multiply dark:mix-blend-normal animate-blob animation-delay-2000' />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" />
      </div>

      {/* --- Hero Section --- */}
      <section className='relative z-10 pt-44 pb-20 px-6'>
        <div className='container mx-auto max-w-7xl'>
          <div className='flex flex-col items-center text-center mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8'
            >
              <span className='w-2 h-2 rounded-full bg-primary animate-pulse' />
              The Journal
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-6'
            >
              Insights for <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400'>
                Modern Builders
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'
            >
              Deep dives into engineering, design, and scaling. Curated for the
              thoughtful creator.
            </motion.p>
          </div>

          {/* --- Filter Bar (Floating Glass) --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='sticky top-24 z-50 mb-20 max-w-4xl mx-auto'
          >
            <div className='bg-white/70 dark:bg-[#111]/70 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-2 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-black/5 dark:shadow-black/20 ring-1 ring-black/5 dark:ring-white/5'>
              <div className='flex gap-1 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0 px-2'>
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-transparent whitespace-nowrap',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground'
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-3.5 h-3.5',
                          isActive
                            ? 'text-primary-foreground'
                            : 'text-muted-foreground'
                        )}
                      />
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              <div className='relative w-full md:w-64 pl-2 md:pl-0 pr-2'>
                <Input
                  placeholder='Search...'
                  className='bg-black/5 dark:bg-white/5 border-transparent rounded-xl h-10 pl-10 text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-primary/20 transition-all font-medium text-sm'
                />
                <Search className='absolute left-5 md:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground' />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Layout: Bento Grid --- */}
      <section className='container mx-auto max-w-7xl px-6 pb-24 z-10 relative'>
        <div className='grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8'>
          {/* Featured Post - Keeping SpotlightCard for the "Hero" feel but wrapped lightly if needed or left as is to preserve the overlay design. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='col-span-1 md:col-span-6 lg:col-span-8 row-span-1 group cursor-pointer'
          >
            <Link href={`/blog/${featuredPost.id}`} className='h-full block'>
              <SpotlightCard className='h-full flex flex-col justify-end p-8 md:p-12 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500 min-h-[420px]'>
                <div className='absolute inset-0 z-0'>
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent' />
                </div>

                <div className='relative z-10 max-w-2xl'>
                  <div className='flex items-center gap-3 mb-6'>
                    <span className='px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/10'>
                      Featured Story
                    </span>
                    <span className='text-white/60 text-xs font-bold uppercase tracking-wider'>
                      {featuredPost.date}
                    </span>
                  </div>

                  <h2 className='text-3xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-blue-200 transition-colors'>
                    {featuredPost.title}
                  </h2>

                  <p className='text-lg text-white/70 mb-8 line-clamp-2 md:line-clamp-none'>
                    {featuredPost.excerpt}
                  </p>

                  <div className='flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs group/btn'>
                    Read Full Article
                    <div className='w-6 h-6 rounded-full bg-white text-black flex items-center justify-center group-hover/btn:translate-x-2 transition-transform'>
                      <ArrowRight className='w-3 h-3' />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          </motion.div>

          {/*  Replaced Newsletter Block with Technical Post (Filling Grid Gap) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='col-span-1 md:col-span-6 lg:col-span-4 row-span-1'
          >
            {gridPosts[0] && (
              <Link href={`/blog/${gridPosts[0].id}`} className='block h-full'>
                <CardContainer
                  className='inter-var h-full'
                  containerClassName='py-0 h-full'
                >
                  <CardBody className='relative group/card w-full h-full rounded-3xl p-[1px] bg-transparent border-none'>
                    {/* Dynamic Border Gradient */}
                    <div className='absolute inset-0 rounded-3xl overflow-hidden'>
                      <div className='absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#6366f1_100%)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 will-change-transform' />
                    </div>

                    {/* Inner Content Card (Theme Aware) */}
                    <div className='relative flex flex-col h-full w-full rounded-3xl bg-white/60 dark:bg-[#050505]/95 backdrop-blur-3xl border border-zinc-200 dark:border-white/10 p-6 overflow-hidden transition-colors duration-500'>
                      {/* Noise Texture Overlay */}
                      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

                      {/* Ambient Background Glow (Subtle & Moving) - Adjusted for Light Mode */}
                      <div className='absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none group-hover/card:bg-indigo-500/20 dark:group-hover/card:bg-indigo-500/30 transition-colors duration-500' />
                      <div className='absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover/card:bg-blue-500/20 transition-colors duration-500' />

                      <CardItem translateZ='60' className='w-full mt-0 mb-6'>
                        <div className='relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-2xl border border-zinc-200 dark:border-white/5 group-hover/card:border-indigo-500/20 dark:group-hover/card:border-white/10 transition-colors'>
                          <img
                            src={gridPosts[0].image}
                            className='h-full w-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out grayscale-[0.2] group-hover/card:grayscale-0'
                            alt={gridPosts[0].title}
                          />
                          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity duration-500' />

                          {/* Top Badges (Category & Date) */}
                          <div className='absolute top-3 left-3 flex items-center gap-2'>
                            <span className='px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5'>
                              {gridPosts[0].category}
                            </span>
                          </div>
                          <div className='absolute top-3 right-3'>
                            <span className='px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg'>
                              {gridPosts[0].date}
                            </span>
                          </div>

                          {/* Shine Effect */}
                          <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/card:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none' />
                        </div>
                      </CardItem>

                      <CardItem
                        translateZ='50'
                        className='text-2xl lg:text-3xl font-mono font-bold tracking-tighter text-zinc-800 dark:text-white mb-4 relative z-10 leading-tight group-hover/card:text-indigo-600 dark:group-hover/card:text-indigo-200 transition-colors'
                      >
                        {gridPosts[0].title}
                      </CardItem>

                      <CardItem
                        as='p'
                        translateZ='40'
                        className='text-zinc-600 dark:text-neutral-400 text-sm font-serif italic leading-relaxed max-w-sm line-clamp-3 mb-8 relative z-10'
                      >
                        {gridPosts[0].excerpt}
                      </CardItem>

                      <div className='flex justify-between items-end mt-auto pt-6 border-t border-zinc-200 dark:border-white/5 relative z-10'>
                        <CardItem translateZ={30} className='px-0 py-0'>
                          <div className='flex items-center gap-2'>
                            <div className='w-8 h-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-neutral-700 dark:to-neutral-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center'>
                              <span className='text-[10px] font-bold text-zinc-700 dark:text-white'>
                                SD
                              </span>
                            </div>
                            <div className='flex flex-col'>
                              <span className='text-[10px] font-bold text-zinc-500 dark:text-neutral-300 uppercase tracking-widest leading-none mb-1'>
                                Author
                              </span>
                              <span className='text-[10px] font-bold text-zinc-400 dark:text-neutral-500 uppercase tracking-widest leading-none'>
                                SomDev Team
                              </span>
                            </div>
                          </div>
                        </CardItem>

                        <CardItem
                          translateZ={40}
                          as='button'
                          className='group/btn relative px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-mono font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-indigo-600 dark:hover:bg-indigo-50 hover:shadow-lg'
                        >
                          <span className='relative z-10 flex items-center gap-2 group-hover/btn:text-white dark:group-hover/btn:text-indigo-600 transition-colors'>
                            Read Article{' '}
                            <ArrowRight className='w-3 h-3 -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300' />
                          </span>
                        </CardItem>
                      </div>
                    </div>
                  </CardBody>
                </CardContainer>
              </Link>
            )}
          </motion.div>

          {/* Remaining Posts Grid */}
          <AnimatePresence>
            {gridPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className='col-span-1 md:col-span-3 lg:col-span-4 row-span-1'
              >
                <Link href={`/blog/${post.id}`} className='block h-full'>
                  <CardContainer
                    className='inter-var h-full'
                    containerClassName='py-0 h-full'
                  >
                    <CardBody className='relative group/card w-full h-full rounded-3xl p-[1px] bg-transparent border-none'>
                      {/* Dynamic Border Gradient */}
                      <div className='absolute inset-0 rounded-3xl overflow-hidden'>
                        <div className='absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#6366f1_100%)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 will-change-transform' />
                      </div>

                      {/* Inner Content Card with Noise & Holographic Dark Theme */}
                      <div className='relative flex flex-col h-full w-full rounded-3xl bg-white/80 dark:bg-[#050505]/90 backdrop-blur-3xl border border-zinc-200 dark:border-white/10 p-6 overflow-hidden'>
                        {/* Noise Texture Overlay */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

                        {/* Ambient Background Glow (Subtle & Moving) */}
                        <div className='absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none group-hover/card:bg-indigo-500/20 dark:group-hover/card:bg-indigo-500/30 transition-colors duration-500' />
                        <div className='absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover/card:bg-blue-500/20 transition-colors duration-500' />

                        <CardItem translateZ='60' className='w-full mt-0 mb-6'>
                          <div className='relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-2xl border border-zinc-200 dark:border-white/5 group-hover/card:border-white/10 transition-colors'>
                            <img
                              src={post.image}
                              className='h-full w-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out grayscale-[0.2] group-hover/card:grayscale-0'
                              alt={post.title}
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity duration-500' />

                            {/* Top Badges (Category & Date) */}
                            <div className='absolute top-3 left-3 flex items-center gap-2'>
                              <span className='px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5'>
                                {post.category}
                              </span>
                            </div>
                            <div className='absolute top-3 right-3'>
                              <span className='px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg'>
                                {post.date}
                              </span>
                            </div>

                            {/* Shine Effect */}
                            <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/card:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none' />
                          </div>
                        </CardItem>

                        <CardItem
                          translateZ='50'
                          className='text-2xl lg:text-3xl font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 relative z-10 leading-tight group-hover/card:text-indigo-200 transition-colors'
                        >
                          {post.title}
                        </CardItem>

                        <CardItem
                          as='p'
                          translateZ='40'
                          className='text-neutral-600 dark:text-neutral-400 text-sm font-serif italic leading-relaxed max-w-sm line-clamp-3 mb-8 relative z-10 font-medium'
                        >
                          {post.excerpt}
                        </CardItem>

                        <div className='flex justify-between items-end mt-auto pt-6 border-t border-zinc-200 dark:border-white/5 relative z-10'>
                          <CardItem translateZ={30} className='px-0 py-0'>
                            <div className='flex items-center gap-2'>
                              <div className='w-8 h-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-neutral-700 dark:to-neutral-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center'>
                                <span className='text-[10px] font-bold text-zinc-700 dark:text-white'>
                                  SD
                                </span>
                              </div>
                              <div className='flex flex-col'>
                                <span className='text-[10px] font-bold text-zinc-500 dark:text-neutral-300 uppercase tracking-widest leading-none mb-1'>
                                  Author
                                </span>
                                <span className='text-[10px] font-bold text-zinc-400 dark:text-neutral-500 uppercase tracking-widest leading-none'>
                                  SomDev Team
                                </span>
                              </div>
                            </div>
                          </CardItem>

                          <CardItem
                            translateZ={40}
                            as='button'
                            className='group/btn relative px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-mono font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-indigo-600 dark:hover:bg-indigo-50 hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]'
                          >
                            <span className='relative z-10 flex items-center gap-2 group-hover/btn:text-white dark:group-hover/btn:text-indigo-600 transition-colors'>
                              Read Article{' '}
                              <ArrowRight className='w-3 h-3 -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300' />
                            </span>
                          </CardItem>
                        </div>
                      </div>
                    </CardBody>
                  </CardContainer>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
