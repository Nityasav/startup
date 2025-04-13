'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Project, getUserProjects } from '@/lib/projects';

export default function Projects() {
  const { user } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Load user's projects
    const loadProjects = async () => {
      try {
        console.log('Loading projects for user:', user.id);
        const userProjects = await getUserProjects(user.id);
        setProjects(userProjects);
        setError(null);
      } catch (err) {
        console.error('Error in loadProjects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
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
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
              {error}
            </div>
          )}
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
          {isLoading ? (
            // Loading skeleton
            <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6 animate-pulse">
              <div className="h-6 w-2/3 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-700 rounded"></div>
            </div>
          ) : projects.length > 0 ? (
            // Project cards
            projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.02 }}
                className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-[#00aaff]/50 transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                <h3 className="text-xl font-semibold mb-2 text-[#00aaff]">{project.name}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-sm px-3 py-1 rounded-full bg-[#00aaff]/10 text-[#00aaff]">
                    {project.project_type}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            // Empty state
            <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-[#00aaff]/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-2 text-[#00aaff]">Your First Project</h3>
              <p className="text-gray-400">
                Start your journey by clicking the "Start New Project" button above.
              </p>
            </div>
          )}

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