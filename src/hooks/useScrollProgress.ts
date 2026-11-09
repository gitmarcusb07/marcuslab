'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook that returns the page scroll progress as a value from 0 to 1.
 * Uses passive scroll listeners and requestAnimationFrame throttling for performance.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      setProgress(0);
      return;
    }

    const scrolled = Math.min(Math.max(scrollTop / docHeight, 0), 1);
    setProgress(scrolled);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [updateProgress]);

  return progress;
}
