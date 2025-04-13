'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import GradientText from './components/GradientText';
import FloatingButton from './components/FloatingButton';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/projects');
    }
  }, [user, router]);

  // Only render landing page content if user is not logged in
  if (user) {
    return null; // Return null while redirecting to prevent flash of content
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pt-16 text-center overflow-hidden">
      <main className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-80 h-48 md:w-96 md:h-64 relative"
            >
              <Image 
                src={`/images/logo.png?v=${new Date().getTime()}`}
                alt="StartupSight Logo" 
                width={384}
                height={240}
                className="object-contain"
                priority
                onError={(e) => {
                  console.error('Error loading homepage logo:', e);
                }}
              />
            </motion.div>
          </div>
          
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
