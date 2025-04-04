'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: ScrollRevealProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once it's been seen, no need to observe anymore
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Define initial and animate values based on direction
  const getInitialAndAnimate = () => {
    switch (direction) {
      case 'up':
        return {
          initial: { y: 50, opacity: 0 },
          animate: { y: 0, opacity: 1 },
        };
      case 'down':
        return {
          initial: { y: -50, opacity: 0 },
          animate: { y: 0, opacity: 1 },
        };
      case 'left':
        return {
          initial: { x: 50, opacity: 0 },
          animate: { x: 0, opacity: 1 },
        };
      case 'right':
        return {
          initial: { x: -50, opacity: 0 },
          animate: { x: 0, opacity: 1 },
        };
      default:
        return {
          initial: { y: 50, opacity: 0 },
          animate: { y: 0, opacity: 1 },
        };
    }
  };

  const { initial, animate } = getInitialAndAnimate();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={initial}
        animate={isInView ? animate : initial}
        transition={{
          duration: 0.6,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for a nice easing
        }}
      >
        {children}
      </motion.div>
    </div>
  );
} 