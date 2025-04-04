'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
  animated?: boolean;
}

export default function GradientText({
  children,
  className = '',
  as = 'span',
  animated = false,
}: GradientTextProps) {
  const baseClass = `gradient-text ${className}`;
  
  const getAnimatedElement = () => {
    return (
      <motion.span
        className={baseClass}
        animate={{ 
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          textShadow: [
            '0 0 7px rgba(0, 170, 255, 0.6), 0 0 10px rgba(0, 170, 255, 0.4), 0 0 15px rgba(0, 170, 255, 0.2)',
            '0 0 7px rgba(255, 0, 170, 0.6), 0 0 10px rgba(255, 0, 170, 0.4), 0 0 15px rgba(255, 0, 170, 0.2)',
            '0 0 7px rgba(0, 170, 255, 0.6), 0 0 10px rgba(0, 170, 255, 0.4), 0 0 15px rgba(0, 170, 255, 0.2)',
          ]
        }}
        transition={{
          backgroundPosition: {
            duration: 8,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          },
          textShadow: {
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      >
        {children}
      </motion.span>
    );
  };
  
  const getStaticElement = () => {
    return <span className={baseClass}>{children}</span>;
  };
  
  const element = animated ? getAnimatedElement() : getStaticElement();
  
  switch (as) {
    case 'h1':
      return <h1 className="inline-block">{element}</h1>;
    case 'h2':
      return <h2 className="inline-block">{element}</h2>;
    case 'h3':
      return <h3 className="inline-block">{element}</h3>;
    case 'h4':
      return <h4 className="inline-block">{element}</h4>;
    default:
      return element;
  }
} 