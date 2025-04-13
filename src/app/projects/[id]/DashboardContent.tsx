'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Project, Conversation, Message, createConversation, getProjectConversations, updateConversation, deleteConversation } from '@/lib/projects';

interface DashboardContentProps {
  projectId: string;
}

export default function DashboardContent({ projectId }: DashboardContentProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const loadConversations = useCallback(async () => {
    if (!projectId || !user) return;
    try {
      const projectConversations = await getProjectConversations(projectId);
      setConversations(projectConversations);
      
      // Only auto-select the first conversation if we're not explicitly in "new conversation" mode
      // and there's no currently selected conversation
      if (projectConversations.length > 0 && selectedConversation === undefined) {
        setSelectedConversation(projectConversations[0]);
      }
    } catch (err) {
      console.error('Error loading conversations:', err);
      setError('Failed to load conversations');
    }
  }, [projectId, user, selectedConversation]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    loadConversations();
  }, [user, loadConversations, router]);

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

  // Add an event handler for Enter key to send messages
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message with Enter (but allow Shift+Enter for new lines)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent adding a new line
      if (message.trim()) {
        handleSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  // Fix the form submission to ensure proper handling of new conversations
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Creating/updating conversation with message:", message);
      console.log("Selected conversation:", selectedConversation ? selectedConversation.id : "none");
      
      // If there's no selected conversation or no conversations at all, create a new one
      if (selectedConversation === null) {
        const newConversation = await createConversation(projectId, message);
        console.log("New conversation created:", newConversation);
        
        if (newConversation) {
          setConversations(prev => [newConversation, ...prev]);
          setSelectedConversation(newConversation);
          setMessage('');
        } else {
          throw new Error('Failed to create conversation');
        }
      } else {
        // Otherwise, update the existing conversation
        const updatedConversation = await updateConversation(selectedConversation.id, message);
        console.log("Conversation updated:", updatedConversation);
        
        if (updatedConversation) {
          setConversations(prev => 
            prev.map(conv => conv.id === updatedConversation.id ? updatedConversation : conv)
          );
          setSelectedConversation(updatedConversation);
          setMessage('');
        } else {
          throw new Error('Failed to update conversation');
        }
      }
    } catch (error) {
      console.error('Error handling message:', error);
      setError('Failed to process message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    // Force set to null explicitly to indicate we're creating a new conversation
    console.log("Starting new conversation...");
    setSelectedConversation(null);
    setMessage(''); // Clear any existing message
    setMenuOpenId(null); // Close any open menus
    
    // Scroll to the message input box to prompt user to type
    setTimeout(() => {
      const textArea = document.querySelector('textarea');
      if (textArea) {
        textArea.focus();
        // Scroll the textarea into view
        textArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleDeleteConversation = async (conversationId: string) => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    setError(null);
    try {
      const success = await deleteConversation(conversationId);
      if (success) {
        // Remove the deleted conversation from state
        const updatedConversations = conversations.filter(c => c.id !== conversationId);
        setConversations(updatedConversations);
        
        // If the deleted conversation was selected, select another one or none
        if (selectedConversation?.id === conversationId) {
          setSelectedConversation(updatedConversations.length > 0 ? updatedConversations[0] : null);
        }
        
        setMenuOpenId(null); // Close the menu
      } else {
        throw new Error('Failed to delete conversation');
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      setError('Failed to delete conversation. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMenuOpenId(null); // Close any open menus
  };

  const toggleMenu = (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the conversation selection
    setMenuOpenId(menuOpenId === conversationId ? null : conversationId);
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Conversations
                  {selectedConversation === null && conversations.length > 0 && (
                    <span className="ml-2 text-sm text-[#00aaff] font-normal">(Creating new)</span>
                  )}
                </h2>
                <button
                  onClick={handleNewConversation}
                  className={`p-2 rounded-full border transition-all ${
                    selectedConversation === null 
                      ? 'bg-[#00aaff]/20 border-[#00aaff] text-[#00aaff]'
                      : 'bg-black/30 border-gray-800 hover:border-[#00aaff]/50 text-[#00aaff]'
                  }`}
                  title="Start a new conversation"
                  disabled={isLoading || isDeleting}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`relative border border-gray-800 rounded-lg p-3 hover:border-[#00aaff]/50 cursor-pointer transition-all group ${
                      selectedConversation?.id === conv.id ? 'border-[#00aaff]' : ''
                    }`}
                  >
                    <div className="flex justify-between" onClick={() => handleConversationSelect(conv)}>
                      <div className="w-full pr-8">
                        <p className="text-sm text-gray-400 truncate">
                          {conv.messages[0]?.content.substring(0, 100)}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(conv.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* Three-dot menu button */}
                    <button
                      onClick={(e) => toggleMenu(conv.id, e)}
                      className="absolute top-3 right-3 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-800 transition-opacity"
                      disabled={isDeleting}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    
                    {/* Dropdown menu */}
                    {menuOpenId === conv.id && (
                      <div 
                        ref={menuRef}
                        className="absolute right-0 top-8 z-10 w-40 rounded-md bg-gray-900 shadow-lg border border-gray-700"
                      >
                        <div className="py-1">
                          <button
                            onClick={() => handleDeleteConversation(conv.id)}
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
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
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
                <div className="flex-1 mb-4 space-y-4 overflow-y-auto max-h-[500px]">
                  {selectedConversation ? (
                    selectedConversation.messages.map((msg: Message, index: number) => (
                      <div
                        key={index}
                        className={`rounded-lg p-4 ${
                          msg.role === 'assistant'
                            ? 'bg-[#00aaff]/10 text-white'
                            : 'bg-gray-800/50 ml-8'
                        }`}
                      >
                        <p className={msg.role === 'assistant' ? 'text-[#00aaff]' : 'text-gray-400'}>
                          {msg.role === 'assistant' ? 'AI Assistant' : 'You'}
                        </p>
                        <p className="mt-2 whitespace-pre-wrap">{msg.content}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="bg-[#00aaff]/10 rounded-lg p-4 border-2 border-dashed border-[#00aaff]/30">
                      <div className="flex items-center mb-2">
                        <p className="text-[#00aaff] font-bold">New Conversation</p>
                        {conversations.length > 0 && (
                          <span className="ml-2 px-2 py-1 bg-[#00aaff]/20 text-[#00aaff] text-xs rounded-full">
                            Ready to start
                          </span>
                        )}
                      </div>
                      <p className="mt-2">
                        {conversations.length === 0
                          ? "Hello! I'm here to help validate your business idea and provide strategic advice. What would you like to discuss?"
                          : "You've started a new conversation. Type your message below to begin."}
                      </p>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSubmit} className="mt-auto">
                  <div className="relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={selectedConversation 
                        ? "Continue this conversation..." 
                        : conversations.length === 0 
                          ? "Type to start your first conversation..." 
                          : "Type to begin your new conversation..."}
                      rows={3}
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-black/30 border border-gray-800 rounded-lg focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff] outline-none resize-none disabled:opacity-50"
                      onKeyDown={handleKeyDown}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !message.trim()}
                      className={`absolute right-3 bottom-3 p-2 rounded-lg 
                        ${message.trim() && !isLoading
                          ? 'text-[#00aaff] hover:bg-[#00aaff]/10' 
                          : 'text-gray-600'} 
                        transition-all disabled:opacity-50`}
                    >
                      {isLoading ? (
                        <div className="h-6 w-6 border-2 border-[#00aaff] border-t-transparent rounded-full animate-spin" />
                      ) : (
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
                      )}
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