'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseInViewOptions {
  /** Intersection threshold (0 to 1). Default: 0.1 */
  threshold?: number;
  /** If true, the observer disconnects after the element first enters view. Default: false */
  triggerOnce?: boolean;
  /** Root margin for the observer. Default: '0px' */
  rootMargin?: string;
}

/**
 * Custom hook using IntersectionObserver to detect when an element enters the viewport.
 * Returns a ref to attach to the target element and a boolean indicating visibility.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, triggerOnce = false, rootMargin = '0px' } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);

        if (visible && triggerOnce) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce, rootMargin]);

  return [ref, isInView];
}
