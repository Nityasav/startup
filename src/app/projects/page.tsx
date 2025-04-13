'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function Projects() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // Return null while redirecting
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome back, <span className="text-[#00aaff]">{user.email?.split('@')[0]}</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Start a new project or continue working on existing ones
          </p>
        </motion.div>

        {/* New Project Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <button
            onClick={() => router.push('/projects/new')}
            className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 
                     text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 
                     shadow-[0_0_15px_rgba(0,170,255,0.5)] hover:shadow-[0_0_25px_rgba(0,170,255,0.7)]
                     flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Start New Project
          </button>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Project Card Placeholder */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-[#00aaff]/50 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-2 text-[#00aaff]">Your Projects</h3>
            <p className="text-gray-400">
              Start your first project by clicking the button above. Your projects will appear here.
            </p>
          </div>

          {/* AI Assistant Card */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-[#00aaff]/50 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-2 text-[#00aaff]">AI Assistant</h3>
            <p className="text-gray-400">
              Need help? Ask our AI assistant anything about your startup ideas or market analysis.
            </p>
            <button
              onClick={() => router.push('/chat')}
              className="mt-4 text-[#00aaff] hover:text-white transition-colors duration-300"
            >
              Start a conversation →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 