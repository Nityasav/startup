'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function NewProject() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Create New Project</h1>

          <div className="space-y-6">
            <div>
              <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-200">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-800 focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff] outline-none transition-all"
                placeholder="E.g., Coffee Shop Business"
              />
            </div>

            <div>
              <label htmlFor="projectDescription" className="block mb-2 text-sm font-medium text-gray-200">
                Brief Description
              </label>
              <textarea
                id="projectDescription"
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-800 focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff] outline-none transition-all"
                placeholder="Describe your business idea briefly..."
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Project Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-800 rounded-lg p-4 cursor-pointer hover:border-[#00aaff] transition-all">
                  <h3 className="font-medium mb-1">New Business</h3>
                  <p className="text-gray-400 text-sm">Start from scratch with a new business idea</p>
                </div>
                <div className="border border-gray-800 rounded-lg p-4 cursor-pointer hover:border-[#00aaff] transition-all">
                  <h3 className="font-medium mb-1">Existing Business</h3>
                  <p className="text-gray-400 text-sm">Analyze and improve your current business</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                onClick={() => router.back()}
                className="px-6 py-2 rounded-lg border border-gray-800 hover:bg-gray-800/50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push('/projects')}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 
                        text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,170,255,0.5)] 
                        hover:shadow-[0_0_25px_rgba(0,170,255,0.7)]"
              >
                Create Project
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 