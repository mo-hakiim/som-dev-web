'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  isLoading?: boolean;
  glow?: boolean;
  magnetic?: boolean;
}

export const PremiumButton = React.forwardRef<
  HTMLButtonElement,
  PremiumButtonProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      icon,
      iconPosition = 'right',
      fullWidth = false,
      isLoading = false,
      glow = false,
      magnetic = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 relative overflow-hidden group',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      {
        'w-full': fullWidth,
        'hover:scale-105 active:scale-95': magnetic && !disabled,
      }
    );

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl',
    };

    const variantStyles = {
      primary: cn(
        'bg-gradient-to-r from-primary via-cyan-400 to-accent text-primary-foreground font-bold',
        'hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.5)]',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-accent before:via-cyan-400 before:to-primary before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100'
      ),
      secondary: cn(
        'bg-card backdrop-blur-md text-foreground border-2 border-border',
        'hover:bg-muted hover:border-primary/50',
        'hover:shadow-lg transition-all duration-300'
      ),
      outline: cn(
        'border-2 border-primary/40 text-primary bg-transparent',
        'hover:bg-primary/10 hover:border-primary',
        'hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]'
      ),
      ghost: cn(
        'text-foreground hover:bg-muted',
        'hover:shadow-lg transition-all duration-300'
      ),
      gradient: cn(
        'bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white',
        'hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-red-500 before:via-pink-500 before:to-purple-600 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100'
      ),
      glow: cn(
        'bg-primary text-primary-foreground font-bold',
        'shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]',
        'hover:shadow-[0_0_60px_rgba(var(--primary-rgb),0.8)]',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:-translate-x-full before:transition-transform before:duration-1000 hover:before:translate-x-full'
      ),
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {glow && (
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />
        )}

        <span className='relative z-10 flex items-center gap-2'>
          {isLoading ? (
            <div className='w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin' />
          ) : (
            <>
              {icon && iconPosition === 'left' && icon}
              {children}
              {icon && iconPosition === 'right' && icon}
            </>
          )}
        </span>
      </button>
    );
  }
);

PremiumButton.displayName = 'PremiumButton';
