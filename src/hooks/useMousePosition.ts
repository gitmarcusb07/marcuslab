'use client';

import { useState, useEffect, useCallback } from 'react';
import { isMobile } from '@/lib/utils';

interface MousePosition {
  /** Normalized X position from -1 (left) to 1 (right) */
  x: number;
  /** Normalized Y position from -1 (top) to 1 (bottom) */
  y: number;
}

/**
 * Custom hook returning the normalized mouse position centered on the viewport.
 * Values range from -1 to 1 on both axes.
 * Returns {x: 0, y: 0} on mobile devices to avoid unnecessary computation.
 * Uses requestAnimationFrame throttling for performance.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (clientY / window.innerHeight) * 2 - 1;
    setPosition({ x, y });
  }, []);

  useEffect(() => {
    if (isMobile()) {
      return;
    }

    let rafId: number | null = null;
    let ticking = false;
    let latestX = 0;
    let latestY = 0;

    const onMouseMove = (event: MouseEvent) => {
      latestX = event.clientX;
      latestY = event.clientY;

      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          updatePosition(latestX, latestY);
          ticking = false;
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [updatePosition]);

  return position;
}
