'use client';

import { motion } from 'framer-motion';
import GradientText from '../components/GradientText';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      setRedirecting(true);
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || redirecting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-[#00aaff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-xl">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pt-24">
      <main className="max-w-4xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-4">
            <GradientText animated>DASHBOARD</GradientText>
          </h1>

          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-[#00aaff] to-[#ff00aa] mx-auto rounded-full my-8"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>
        
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass p-8 rounded-lg"
          >
            <h2 className="text-2xl font-audiowide mb-6">
              Welcome, <GradientText>{user?.email?.split('@')[0] || 'User'}</GradientText>
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/40 rounded-lg p-4 border border-[#00aaff]/20">
                  <h3 className="text-lg font-bold mb-2 text-[#00aaff]">Account Details</h3>
                  <p className="text-gray-300"><span className="text-gray-400">Email:</span> {user?.email}</p>
                  <p className="text-gray-300"><span className="text-gray-400">User ID:</span> {user?.id.substring(0, 8)}...</p>
                  <p className="text-gray-300"><span className="text-gray-400">Created:</span> {new Date(user?.created_at || '').toLocaleDateString()}</p>
                </div>
                
                <div className="bg-black/40 rounded-lg p-4 border border-[#00aaff]/20">
                  <h3 className="text-lg font-bold mb-2 text-[#00aaff]">Account Status</h3>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Status:</span>{' '}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-200">
                      Active
                    </span>
                  </p>
                  <p className="text-gray-300"><span className="text-gray-400">Plan:</span> Free Trial</p>
                  <p className="text-gray-300"><span className="text-gray-400">Email verified:</span> {user?.email_confirmed_at ? 'Yes' : 'No'}</p>
                </div>
              </div>
              
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <button
                  onClick={() => signOut()}
                  className="bg-black/40 hover:bg-black/60 text-[#ff00aa] border border-[#ff00aa]/30 px-4 py-2 rounded transition-colors duration-300"
                >
                  Sign Out
                </button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass p-8 rounded-lg"
          >
            <h2 className="text-2xl font-audiowide mb-6">
              Your <GradientText>Projects</GradientText>
            </h2>
            
            <div className="text-center p-8">
              <p className="text-gray-400 mb-4">You don&apos;t have any projects yet.</p>
              <Link href="/projects">
                <motion.button 
                  className="bg-gradient-to-r from-[#00aaff] to-[#ff00aa] hover:from-[#3cc0ff] hover:to-[#ff3caa] text-white font-medium py-2 px-4 rounded-md transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create Your First Project
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 