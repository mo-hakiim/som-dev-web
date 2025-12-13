'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { cn } from '@/lib/utils';

interface CursorContextType {
  cursorText: string;
  setCursorText: (text: string) => void;
  isHovering: boolean;
  setIsHovering: (hovering: boolean) => void;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorText: '',
  setCursorText: () => {},
  isHovering: false,
  setIsHovering: () => {},
  isVisible: false,
  setIsVisible: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <CursorContext.Provider
      value={{
        cursorText,
        setCursorText,
        isHovering,
        setIsHovering,
        isVisible,
        setIsVisible,
      }}
    >
      <div
        className={cn('cursor-none', className)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      <Cursor />
    </CursorContext.Provider>
  );
};

const Cursor = () => {
  const { isHovering, setIsHovering, cursorText, isVisible } = useCursor();
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const isMobile = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.matchMedia('(max-width: 768px)').matches;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouse.current = { x: clientX, y: clientY };

      // INSTANT update for the main cursor dot - Zero Lag
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Auto-hover detection for interactive elements
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button';

      if (isInteractive) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button';

      if (isInteractive) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [setIsHovering]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      // Smooth follow for the ring
      // Lerp factor 0.2 gives a snappier, more responsive feel
      const lerp = 0.2;

      followerPos.current.x += (mouse.current.x - followerPos.current.x) * lerp;
      followerPos.current.y += (mouse.current.y - followerPos.current.y) * lerp;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (badgeRef.current) {
        // Badge follows the smooth position but with a slight offset
        badgeRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(20px, 20px)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (isMobile.current) return null;

  // Default text when not hovering specific elements
  const displayText = cursorText || 'Discover';
  const showBadge = isVisible && (isHovering || cursorText);

  return (
    <div className='fixed top-0 left-0 pointer-events-none z-[9999] inset-0 overflow-hidden h-0'>
      {/* Main Dot - Instant Response */}
      <div
        ref={cursorRef}
        className={cn(
          'fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full mix-blend-difference z-[10000]',
          'transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Follower Ring - Smooth Physics */}
      <div
        ref={followerRef}
        className={cn(
          'fixed top-0 left-0 w-10 h-10 border border-white/40 rounded-full z-[9999]',
          'transition-all duration-300 ease-out',
          isVisible ? 'opacity-100' : 'opacity-0',
          isHovering ? 'scale-150 border-white bg-white/5' : 'scale-100'
        )}
      />

      {/* Floating Badge - Contextual */}
      <div
        ref={badgeRef}
        className={cn(
          'fixed top-0 left-0 z-[10001]',
          'transition-all duration-300 ease-out origin-top-left',
          showBadge ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        )}
      >
        <div className='bg-black/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-2xl whitespace-nowrap flex items-center gap-2'>
          <div className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
          {displayText}
        </div>
      </div>
    </div>
  );
};

export const CursorFollow = ({
  children,
  text = '',
  className,
}: {
  children: React.ReactNode;
  text?: string;
  className?: string;
}) => {
  const { setIsHovering, setCursorText } = useCursor();

  const handleMouseEnter = () => {
    setIsHovering(true);
    setCursorText(text);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCursorText('');
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('inline-block', className)}
    >
      {children}
    </div>
  );
};
