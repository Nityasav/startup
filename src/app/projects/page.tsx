'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import GradientText from '../components/GradientText';
import Link from 'next/link';

// Mock data for projects - this would be fetched from your database in a real implementation
const MOCK_PROJECTS = [
  { 
    id: 'proj-1', 
    name: 'Coffee Shop Startup', 
    description: 'Specialty coffee shop with a tech twist',
    createdAt: '2023-10-15T12:00:00Z',
    lastUpdated: '2023-10-20T15:30:00Z',
  },
  { 
    id: 'proj-2', 
    name: 'Mobile App for Fitness', 
    description: 'AI-powered fitness coaching app',
    createdAt: '2023-11-05T09:15:00Z',
    lastUpdated: '2023-11-10T14:20:00Z',
  },
  { 
    id: 'proj-3', 
    name: 'E-commerce Platform', 
    description: 'Sustainable products marketplace',
    createdAt: '2023-12-01T11:30:00Z', 
    lastUpdated: '2023-12-05T16:45:00Z',
  },
];

export default function ProjectsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [promptInput, setPromptInput] = useState('');
  
  // Protect the route - redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
    <div className="min-h-screen pt-16 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for Projects */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-64 bg-black/50 backdrop-blur-sm border-r border-gray-800 overflow-auto hidden md:block"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Projects</h2>
              <button 
                onClick={() => setShowNewProjectModal(true)}
                className="w-8 h-8 rounded-full bg-[#00aaff]/20 flex items-center justify-center text-[#00aaff] hover:bg-[#00aaff]/40 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-2">
              {MOCK_PROJECTS.map(project => (
                <motion.div
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedProject === project.id 
                      ? 'bg-[#00aaff]/20 border border-[#00aaff]/40'
                      : 'hover:bg-gray-800/50'
                  }`}
                >
                  <h3 className="font-medium mb-1 truncate">{project.name}</h3>
                  <p className="text-gray-400 text-sm truncate">{project.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Updated {new Date(project.lastUpdated).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="mt-6 w-full py-2 px-4 bg-gradient-to-r from-[#00aaff]/20 to-[#ff00aa]/20 hover:from-[#00aaff]/30 hover:to-[#ff00aa]/30 rounded-lg border border-[#00aaff]/30 flex items-center justify-center group transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#00aaff] group-hover:text-[#3cc0ff] transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Project
            </button>
          </div>
        </motion.div>
        
        {/* Main Content Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-auto"
        >
          {selectedProject ? (
            <div className="h-full flex flex-col">
              {/* Project header */}
              <div className="border-b border-gray-800 p-4">
                <h1 className="text-xl font-bold">
                  {MOCK_PROJECTS.find(p => p.id === selectedProject)?.name}
                </h1>
                <p className="text-gray-400">
                  {MOCK_PROJECTS.find(p => p.id === selectedProject)?.description}
                </p>
              </div>
              
              {/* Chat/analysis area */}
              <div className="flex-1 p-4 overflow-auto">
                <div className="max-w-3xl mx-auto">
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <div className="flex">
                      <div className="w-8 h-8 rounded-full bg-[#00aaff] flex items-center justify-center text-white font-bold mr-3">
                        AI
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300">
                          Hello! I've analyzed your {MOCK_PROJECTS.find(p => p.id === selectedProject)?.name} idea. What specific aspect would you like me to help with today?
                        </p>
                        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                          <li className="bg-gray-800/50 hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition-colors">
                            Market Analysis
                          </li>
                          <li className="bg-gray-800/50 hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition-colors">
                            Competitor Research
                          </li>
                          <li className="bg-gray-800/50 hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition-colors">
                            Financial Projections
                          </li>
                          <li className="bg-gray-800/50 hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition-colors">
                            Business Model Canvas
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Input area */}
              <div className="border-t border-gray-800 p-4">
                <div className="max-w-3xl mx-auto">
                  <div className="relative">
                    <textarea 
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      className="w-full bg-gray-900/50 border border-gray-800 focus:border-[#00aaff] rounded-lg p-3 pr-10 resize-none outline-none transition-colors"
                      placeholder="Type your business question here..."
                      rows={3}
                    ></textarea>
                    <button 
                      className="absolute right-3 bottom-3 text-[#00aaff] hover:text-[#3cc0ff] transition-colors"
                      disabled={!promptInput.trim()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-2 text-center">
                    AI analysis is powered by advanced business intelligence algorithms.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-md"
              >
                <div className="mb-6">
                  <GradientText className="text-3xl md:text-4xl font-bold">
                    Your Projects
                  </GradientText>
                </div>
                <h2 className="text-xl mb-4">Select a project or create a new one</h2>
                <p className="text-gray-400 mb-8">
                  Projects help you organize and analyze different business ideas with AI-powered insights.
                </p>
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="bg-gradient-to-r from-[#00aaff] to-[#ff00aa] hover:from-[#3cc0ff] hover:to-[#ff3caa] text-white font-medium py-3 px-6 rounded-md transition-all duration-300"
                >
                  Create New Project
                </button>
                
                {/* Mobile project list */}
                <div className="md:hidden mt-10">
                  <h3 className="text-lg font-bold mb-4 text-left">Your Projects</h3>
                  <div className="space-y-3">
                    {MOCK_PROJECTS.map(project => (
                      <div
                        key={project.id}
                        onClick={() => setSelectedProject(project.id)}
                        className="p-3 rounded-lg cursor-pointer hover:bg-gray-800/50 text-left"
                      >
                        <h3 className="font-medium mb-1">{project.name}</h3>
                        <p className="text-gray-400 text-sm">{project.description}</p>
                        <p className="text-gray-500 text-xs mt-2">
                          Updated {new Date(project.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* New Project Modal */}
      {showNewProjectModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-lg p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="projectName" className="block mb-1 text-sm font-medium">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  className="w-full px-4 py-2 rounded bg-black border border-gray-700 focus:border-[#00aaff] focus:outline-none"
                  placeholder="E.g., Coffee Shop Business"
                />
              </div>
              
              <div>
                <label htmlFor="projectDescription" className="block mb-1 text-sm font-medium">
                  Brief Description
                </label>
                <textarea
                  id="projectDescription"
                  rows={3}
                  className="w-full px-4 py-2 rounded bg-black border border-gray-700 focus:border-[#00aaff] focus:outline-none"
                  placeholder="Describe your business idea briefly..."
                ></textarea>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Project Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-gray-700 rounded-lg p-3 cursor-pointer hover:border-[#00aaff] transition-colors">
                    <h3 className="font-medium text-sm">New Business</h3>
                    <p className="text-gray-400 text-xs">Start from scratch</p>
                  </div>
                  <div className="border border-gray-700 rounded-lg p-3 cursor-pointer hover:border-[#00aaff] transition-colors">
                    <h3 className="font-medium text-sm">Existing Business</h3>
                    <p className="text-gray-400 text-xs">Analyze current venture</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="px-4 py-2 rounded border border-gray-700 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowNewProjectModal(false);
                  // In a real implementation, you would save the project to the database here
                  setSelectedProject('proj-1'); // Select a default project for demo
                }}
                className="px-4 py-2 rounded bg-gradient-to-r from-[#00aaff] to-[#ff00aa] hover:from-[#3cc0ff] hover:to-[#ff3caa] text-white transition-all duration-300"
              >
                Create Project
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 