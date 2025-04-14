'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { createProject } from '@/lib/projects';

export default function NewProject() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectType: 'new' as 'new' | 'existing'
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log('Creating project for user:', user.id);
      
      const project = await createProject(
        user.id,
        formData.name,
        formData.description,
        formData.projectType
      );

      if (project) {
        router.push(`/projects/${project.id}`);
      } else {
        throw new Error('Failed to create project. Please check the console for details or try again.');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Create New Project</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-200">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-800 focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff] outline-none transition-all"
                placeholder="E.g., My Coffee Shop Business"
                required
              />
            </div>

            <div>
              <label htmlFor="projectDescription" className="block mb-2 text-sm font-medium text-gray-200">
                Business Idea Description
              </label>
              <textarea
                id="projectDescription"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-gray-800 focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff] outline-none transition-all"
                placeholder="Describe your business idea in detail so we can help create it for you..."
                required
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Business Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setFormData({ ...formData, projectType: 'new' })}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.projectType === 'new'
                      ? 'border-[#00aaff] bg-[#00aaff]/10'
                      : 'border-gray-800 hover:border-[#00aaff]/50'
                  }`}
                >
                  <h3 className="font-medium mb-1">New Business</h3>
                  <p className="text-gray-400 text-sm">Create a complete toolkit for a new business idea</p>
                </div>
                <div
                  onClick={() => setFormData({ ...formData, projectType: 'existing' })}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.projectType === 'existing'
                      ? 'border-[#00aaff] bg-[#00aaff]/10'
                      : 'border-gray-800 hover:border-[#00aaff]/50'
                  }`}
                >
                  <h3 className="font-medium mb-1">Existing Business</h3>
                  <p className="text-gray-400 text-sm">Enhance and improve your current business</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 rounded-lg border border-gray-800 hover:bg-gray-800/50 transition-all"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 
                          hover:from-cyan-500 hover:to-blue-700 text-white transition-all duration-300 
                          shadow-[0_0_15px_rgba(0,170,255,0.5)] hover:shadow-[0_0_25px_rgba(0,170,255,0.7)]
                          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 