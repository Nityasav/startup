'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Project, Conversation, createConversation, getProjectConversations } from '@/lib/projects';

interface DashboardContentProps {
  projectId: string;
}

export default function DashboardContent({ projectId }: DashboardContentProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadConversations = useCallback(async () => {
    if (!projectId || !user) return;
    try {
      const projectConversations = await getProjectConversations(projectId);
      setConversations(projectConversations);
    } catch (err) {
      console.error('Error loading conversations:', err);
      setError('Failed to load conversations');
    }
  }, [projectId, user]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    loadConversations();
  }, [user, loadConversations, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const conversation = await createConversation(projectId, message);
      if (conversation) {
        setConversations([conversation, ...conversations]);
        setMessage('');
      } else {
        throw new Error('Failed to create conversation');
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
      setError('Failed to create conversation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
            {error}
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Conversations List */}
          <div className="md:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-4"
            >
              <h2 className="text-xl font-bold mb-4">Conversations</h2>
              <div className="space-y-3">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="border border-gray-800 rounded-lg p-3 hover:border-[#00aaff]/50 cursor-pointer transition-all"
                  >
                    <p className="text-sm text-gray-400">
                      {conv.messages[0]?.content.substring(0, 100)}...
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(conv.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Chat Interface */}
          <div className="md:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-4"
            >
              <div className="min-h-[400px] flex flex-col">
                <div className="flex-1 mb-4">
                  {/* Messages will be displayed here */}
                  <div className="bg-[#00aaff]/10 rounded-lg p-4">
                    <p className="text-[#00aaff]">AI Assistant</p>
                    <p className="mt-2">
                      Hello! I'm here to help with your project. What would you like to know?
                    </p>
                  </div>
                </div>

                {/* Message Input */}
                <form onSubmit={handleSubmit} className="mt-auto">
                  <div className="relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      rows={3}
                      className="w-full px-4 py-3 bg-black/30 border border-gray-800 rounded-lg focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff] outline-none resize-none"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !message.trim()}
                      className={`absolute right-3 bottom-3 p-2 rounded-lg 
                        ${message.trim() 
                          ? 'text-[#00aaff] hover:bg-[#00aaff]/10' 
                          : 'text-gray-600'} 
                        transition-all`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 