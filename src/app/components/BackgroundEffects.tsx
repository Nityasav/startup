'use client';

import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Create ripple effect on mouse move
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 50);
        
        // Add 5 particles around mouse position
        for (let i = 0; i < 3; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 50;
          
          particlesRef.current.push({
            x: mouseRef.current.x + Math.cos(angle) * distance,
            y: mouseRef.current.y + Math.sin(angle) * distance,
            size: Math.random() * 3 + 1,
            baseSize: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 1,
            speedY: (Math.random() - 0.5) * 1,
            color: getRandomColor(),
            opacity: 1
          });
          
          // Keep particle count manageable
          if (particlesRef.current.length > 200) {
            particlesRef.current.splice(0, 50);
          }
        }
      }
    };
    
    const getRandomColor = () => {
      const colors = [
        '#00aaff', // Blue
        '#ff00aa', // Pink
        '#aa00ff', // Purple
        '#00ffaa', // Cyan
        '#ffffff'  // White
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          baseSize: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: getRandomColor(),
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid effect
      drawGrid(ctx, canvas);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Fade out particles over time and remove if fully transparent
        if (index < 100) {
          // Base particles - bounce at edges
          if (particle.x > canvas.width || particle.x < 0) {
            particle.speedX = -particle.speedX;
          }
          if (particle.y > canvas.height || particle.y < 0) {
            particle.speedY = -particle.speedY;
          }
        } else {
          // Mouse-generated particles - fade out
          particle.opacity -= 0.01;
          particle.size -= 0.05;
          
          if (particle.opacity <= 0 || particle.size <= 0) {
            particlesRef.current.splice(index, 1);
            return;
          }
        }
        
        // Increase size when near mouse
        const mouseDistance = getDistance(particle.x, particle.y, mouseRef.current.x, mouseRef.current.y);
        const mouseInfluenceRadius = 150;
        
        if (mouseDistance < mouseInfluenceRadius) {
          const sizeFactor = 1 + ((mouseInfluenceRadius - mouseDistance) / mouseInfluenceRadius);
          particle.size = particle.baseSize * sizeFactor;
        } else {
          particle.size = particle.baseSize;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
        ctx.fill();
        
        // Draw connections
        drawConnections(particle, index, ctx);
      });
      
      requestAnimationFrame(animate);
    };
    
    const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const gridSize = 40;
      const gridColor = 'rgba(0, 170, 255, 0.1)';
      
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      
      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };
    
    const drawConnections = (particle: Particle, index: number, ctx: CanvasRenderingContext2D) => {
      for (let j = index + 1; j < particlesRef.current.length; j++) {
        const otherParticle = particlesRef.current[j];
        const distance = getDistance(particle.x, particle.y, otherParticle.x, otherParticle.y);
        
        const maxDistance = 120;
        if (distance < maxDistance) {
          ctx.beginPath();
          const opacity = (1 - distance / maxDistance) * 0.8 * particle.opacity * otherParticle.opacity;
          ctx.strokeStyle = `rgba(0, 170, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
      
      // Connect to mouse if nearby
      const mouseDistance = getDistance(particle.x, particle.y, mouseRef.current.x, mouseRef.current.y);
      const mouseMaxDistance = 150;
      
      if (mouseDistance < mouseMaxDistance) {
        ctx.beginPath();
        const opacity = (1 - mouseDistance / mouseMaxDistance) * 0.8 * particle.opacity;
        ctx.strokeStyle = `rgba(255, 0, 170, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
        ctx.stroke();
      }
    };
    
    const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    // Initialize
    handleResize();
    animate();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8, zIndex: -1 }}
    />
  );
} 