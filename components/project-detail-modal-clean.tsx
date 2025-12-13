'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  TrendUp,
  Users,
  ArrowRight,
  ExternalLink,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// ... (other components)

interface ProjectDetailModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  onStartProject,
}: ProjectDetailModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
      {/* Clean Backdrop */}
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300'
        onClick={onClose}
      />

      {/* Modern Professional Modal */}
      <div className='relative w-full max-w-5xl bg-background rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-[0.98] duration-300 border border-border/50'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 z-50 p-2 rounded-lg bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 border border-border/50'
        >
          <X className='w-4 h-4' />
        </button>

        <div className='flex flex-col lg:flex-row h-full max-h-[90vh]'>
          {/* LEFT: Project Visual */}
          <div className='lg:w-[45%] bg-muted/30 relative overflow-hidden group min-h-[300px] lg:min-h-full'>
            <div className='absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10' />
            <img
              src={project.image || '/placeholder.svg'}
              alt={project.title}
              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
            />

            {/* Overlay Content */}
            <div className='absolute bottom-0 left-0 right-0 p-8 z-20'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md'>
                  <span className='text-[10px] font-bold text-primary uppercase tracking-wider'>
                    {project.category}
                  </span>
                </div>
              </div>

              <h1 className='text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-2'>
                {project.title}
              </h1>
            </div>
          </div>

          {/* RIGHT: Content & Details */}
          <div className='flex-1 p-8 lg:p-10 flex flex-col overflow-y-auto'>
            <div className='flex-1 space-y-8'>
              {/* Overview */}
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <Sparkles className='w-4 h-4 text-primary' />
                  <span className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                    Project Overview
                  </span>
                </div>
                <p className='text-muted-foreground leading-relaxed text-sm lg:text-base'>
                  {project.description}
                </p>
              </div>

              {/* Stats Grid */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='p-5 rounded-xl border border-border/50 bg-muted/20 hover:border-primary/20 transition-colors group'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider'>
                      Growth
                    </span>
                    <TrendingUp className='w-4 h-4 text-emerald-500 opacity-70 group-hover:opacity-100 transition-opacity' />
                  </div>
                  <div className='text-2xl font-bold text-foreground'>
                    {project.stats.growth}
                  </div>
                </div>

                <div className='p-5 rounded-xl border border-border/50 bg-muted/20 hover:border-primary/20 transition-colors group'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider'>
                      Active Users
                    </span>
                    <Users className='w-4 h-4 text-blue-500 opacity-70 group-hover:opacity-100 transition-opacity' />
                  </div>
                  <div className='text-2xl font-bold text-foreground'>
                    {project.stats.users}
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className='space-y-3'>
                <span className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                  Technologies
                </span>
                <div className='flex flex-wrap gap-2'>
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className='px-3 py-1.5 rounded-lg border border-border/50 bg-background text-xs font-medium text-foreground hover:border-primary/30 hover:text-primary transition-colors cursor-default'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='flex items-center gap-4 pt-8 mt-4 border-t border-border/50'>
              <button
                onClick={onStartProject}
                className='flex-1 lg:flex-none px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm hover:shadow-md'
              >
                Start Similar Project
                <ArrowRight className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' />
              </button>

              <Link href={project.href} className='flex-1 lg:flex-none'>
                <button className='w-full px-6 py-3 rounded-xl border border-border bg-background hover:bg-muted/50 text-foreground font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2'>
                  View Live Demo
                  <ExternalLink className='w-4 h-4 text-muted-foreground' />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
