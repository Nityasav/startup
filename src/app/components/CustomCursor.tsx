'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleHoverStart = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || 
          (e.target as HTMLElement).tagName === 'BUTTON' ||
          (e.target as HTMLElement).closest('a') || 
          (e.target as HTMLElement).closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleHoverStart);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleHoverStart);
    };
  }, []);

  const variants: Variants = {
    default: {
      x: position.x,
      y: position.y,
      width: 20,
      height: 20,
      backgroundColor: "var(--primary)",
    },
    hover: {
      x: position.x,
      y: position.y,
      width: 40,
      height: 40,
      backgroundColor: "var(--primary-light)",
    },
    click: {
      x: position.x,
      y: position.y,
      width: 15,
      height: 15,
      backgroundColor: "white",
    },
    hidden: {
      x: position.x,
      y: position.y,
      width: 0,
      height: 0,
      opacity: 0,
    }
  };

  return (
    <motion.div
      className="custom-cursor"
      style={{ mixBlendMode: "difference" }}
      variants={variants}
      animate={
        isHidden ? "hidden" : isClicking ? "click" : isHovering ? "hover" : "default"
      }
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 400,
        mass: 0.1,
      }}
    />
  );
} 