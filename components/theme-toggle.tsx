'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='w-[88px] h-10 rounded-full bg-muted/30 border border-border' />
    );
  }

  const isDark = theme === 'dark';

  return (
    <div
      className='relative flex items-center w-[88px] h-10 p-1 rounded-full bg-muted/30 border border-border cursor-pointer'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setTheme(isDark ? 'light' : 'dark');
        }
      }}
    >
      {/* Sliding Indicator */}
      <div
        className={cn(
          'absolute top-1 left-1 w-8 h-8 rounded-full bg-background shadow-sm border border-border transition-all duration-300 ease-out z-10',
          isDark ? 'translate-x-[48px]' : 'translate-x-0'
        )}
      />

      {/* Icons Container */}
      <div className='relative z-20 flex justify-between w-full'>
        {/* Sun Icon (Light Mode) */}
        <div
          className={cn(
            'flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300',
            !isDark ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Sun className='w-4 h-4' />
        </div>

        {/* Divider */}
        <div className='w-px h-4 bg-border self-center mx-1' />

        {/* Moon Icon (Dark Mode) */}
        <div
          className={cn(
            'flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300',
            isDark ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Moon className='w-4 h-4' />
        </div>
      </div>
    </div>
  );
}
