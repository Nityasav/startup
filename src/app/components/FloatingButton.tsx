'use client';

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface FloatingButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function FloatingButton({
  href,
  children,
  className = '',
}: FloatingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className={`relative embedded-btn-container ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Horizontal and vertical lines that appear to connect with background grid */}
      <div className="embedded-btn-line embedded-btn-line-h" />
      <div className="embedded-btn-line embedded-btn-line-v" />
      
      {/* Circular glow effect */}
      <div className="btn-glow-circle" />
      
      {/* Connection dots that pulse */}
      {isHovered && (
        <>
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-[#00aaff]"
            style={{ 
              left: '-30px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              boxShadow: '0 0 10px 2px rgba(0, 170, 255, 0.8)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-[#ff00aa]"
            style={{ 
              right: '-30px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              boxShadow: '0 0 10px 2px rgba(255, 0, 170, 0.8)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}
      
      {/* Energy particles that float up */}
      {isHovered && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-white"
              style={{ 
                left: `${30 + i * 10}%`,
                bottom: 0
              }}
              initial={{ y: 0, opacity: 0.7 }}
              animate={{ y: -50, opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-white"
              style={{ 
                right: `${30 + i * 10}%`,
                bottom: 0
              }}
              initial={{ y: 0, opacity: 0.7 }}
              animate={{ y: -50, opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: 0.5 + i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}
      
      <Link href={href} className="block relative">
        <motion.div
          className="embedded-btn"
          animate={isHovered ? {
            textShadow: [
              '0 0 5px rgba(0, 170, 255, 0.5), 0 0 10px rgba(0, 170, 255, 0.3)',
              '0 0 5px rgba(255, 0, 170, 0.5), 0 0 10px rgba(255, 0, 170, 0.3)',
              '0 0 5px rgba(0, 170, 255, 0.5), 0 0 10px rgba(0, 170, 255, 0.3)'
            ]
          } : {}}
          transition={{
            textShadow: {
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop'
            }
          }}
        >
          {children}
          
          {/* Animated scan line effect */}
          {isHovered && (
            <motion.div
              className="absolute left-0 right-0 h-[1px] bg-[#00aaff] opacity-70"
              initial={{ top: 0 }}
              animate={{ top: '100%' }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
} 