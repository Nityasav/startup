'use client';

import { motion } from 'framer-motion';
import GradientText from './components/GradientText';
import FloatingButton from './components/FloatingButton';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pt-16 text-center overflow-hidden">
      <main className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
            <span className="cyber-title" data-text="STARTUP">STARTUP</span>
            <GradientText animated className="ml-2">SIGHT</GradientText>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-xl md:text-2xl mb-16 max-w-2xl mx-auto tracking-wider"
        >
          Transform your business ideas into reality with 
          <span className="text-[#00aaff]"> AI-powered </span> 
          market analysis and feasibility assessment
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="mb-20 relative"
        >
          <FloatingButton href="/signup">
            START YOUR JOURNEY
          </FloatingButton>
        </motion.div>
      </main>
    </div>
  );
}
