'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Project, getUserProjects, deleteProject } from '@/lib/projects';

export default function Projects() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    // Only load projects when we have a user and not during auth loading
    if (!authLoading && user) {
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
    }
  }, [user, router, authLoading]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpenId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the project navigation
    setMenuOpenId(menuOpenId === projectId ? null : projectId);
  };

  const handleDeleteProject = async (projectId: string, e?: React.MouseEvent) => {
    // Prevent event propagation if event is provided
    if (e) {
      e.stopPropagation(); // Prevent navigation to project page
    }
    
    if (isDeleting) return;
    
    // Ask for confirmation
    const confirmed = window.confirm('Are you sure you want to delete this project and all its conversations? This action cannot be undone.');
    if (!confirmed) return;
    
    setIsDeleting(true);
    setMenuOpenId(null); // Close menu immediately
    setError(null);
    
    try {
      console.log('Attempting to delete project:', projectId);
      const success = await deleteProject(projectId);
      
      if (success) {
        console.log('Project deleted successfully');
        
        // Immediately verify the deletion by refetching projects
        if (user) {
          console.log('Verifying deletion by refetching projects');
          const refreshedProjects = await getUserProjects(user.id);
          // Update the state with the fresh data from the server
          setProjects(refreshedProjects);
          
          if (refreshedProjects.some(p => p.id === projectId)) {
            console.error('Project still exists in database after deletion');
            setError('Project appears to be deleted but may reappear. Supabase RLS policies may need to be checked.');
          } else {
            console.log('Project confirmed deleted from database');
            setFeedbackMessage('Project deleted successfully');
            setFeedbackType('success');
            setTimeout(() => setFeedbackMessage(''), 3000);
          }
        }
      } else {
        console.error('Failed to delete project');
        setError('Failed to delete project. This could be due to Supabase Row Level Security (RLS) policies.');
        
        // Refresh projects to ensure UI state matches database
        if (user) {
          const refreshedProjects = await getUserProjects(user.id);
          setProjects(refreshedProjects);
        }
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('An unexpected error occurred. Please try again.');
      
      // Refresh projects to ensure UI state matches database
      if (user) {
        const refreshedProjects = await getUserProjects(user.id);
        setProjects(refreshedProjects);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Show loading state during authentication or project loading
  if (authLoading || (!user && isLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-[#00aaff] rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Return null if no user - we're redirecting
  if (!user) {
    return null;
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
          {feedbackMessage && (
            <div className={`mt-4 p-4 ${feedbackType === 'success' ? 'bg-green-500/10 border border-green-500/50 text-green-400' : 'bg-red-500/10 border border-red-500/50 text-red-400'} rounded-lg`}>
              {feedbackMessage}
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
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6 animate-pulse">
                <div className="h-6 w-2/3 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-4/5 bg-gray-700 rounded mb-6"></div>
                <div className="flex justify-between">
                  <div className="h-4 w-1/4 bg-gray-700 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))
          ) : projects.length > 0 ? (
            // Project cards
            projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.02 }}
                className="bg-black/30 relative backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-[#00aaff]/50 transition-all duration-300 cursor-pointer group"
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
                
                {/* Three-dot menu button */}
                <button
                  onClick={(e) => toggleMenu(project.id, e)}
                  className="absolute top-4 right-4 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-800 transition-opacity"
                  disabled={isDeleting}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                
                {/* Dropdown menu */}
                {menuOpenId === project.id && (
                  <div 
                    ref={menuRef}
                    className="absolute right-4 top-10 z-10 w-40 rounded-md bg-gray-900 shadow-lg border border-gray-700"
                    onClick={(e) => e.stopPropagation()} // Prevent card click when clicking on menu
                  >
                    <div className="py-1">
                      <button
                        onClick={(e) => handleDeleteProject(project.id, e)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors flex items-center"
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Delete Project
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
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
        </motion.div>
      </div>
    </div>
  );
} 