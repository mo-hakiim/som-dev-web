'use client';
import React from 'react';
import { cn } from '@/lib/utils';

export const CometCard = ({
  children,
  className,
  glowColor = '#ffffff',
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) => {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl p-[2px] transition-all duration-300 hover:scale-[1.02]',
        className
      )}
    >
      {/* Spinning Gradient (Comet) */}
      <div
        className='absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500'
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 50%, ${glowColor} 100%)`,
        }}
      />

      {/* Static Border (fallback/base) */}
      <div
        className='absolute inset-0 rounded-2xl opacity-20'
        style={{
          border: `1px solid ${glowColor}`,
        }}
      />

      {/* Content Container */}
      <div className='relative h-full w-full rounded-2xl bg-background/90 backdrop-blur-xl'>
        {children}
      </div>
    </div>
  );
};
