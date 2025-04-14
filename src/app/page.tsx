'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import GradientText from './components/GradientText';
import FloatingButton from './components/FloatingButton';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!loading && user) {
      setRedirecting(true);
      router.push('/projects');
    }
  }, [user, loading, router]);

  // Show nothing during loading or redirecting
  if (loading || redirecting || user) {
    return null;
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
                src="/logo.png"
                alt="Venturly Logo" 
                width={320}
                height={240}
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
            <GradientText animated className="ml-2">VENTURLY</GradientText>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-xl md:text-2xl mb-16 max-w-2xl mx-auto tracking-wider"
        >
          Turn your business ideas into 
          <span className="text-[#00aaff]"> ready-to-launch </span> 
          ventures with our complete toolkit
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="mb-20 relative grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto"
        >
          <FloatingButton href="/signup">
            SIGN UP
          </FloatingButton>
          <FloatingButton href="/login" variant="secondary">
            LOG IN
          </FloatingButton>
        </motion.div>
      </main>
    </div>
  );
}
