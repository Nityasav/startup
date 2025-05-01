import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, Bot, Send, Plus, Paperclip, MoreHorizontal, PhoneCall, Video, Settings, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import ApiKeyInput from "@/components/ApiKeyInput";
import { initializeOpenAI, generateAIResponse } from "@/services/openai";
import {
  getUserAgents,
  getUserConversations,
  getConversationMessages,
  createConversation,
  addMessageToConversation,
  markConversationAsRead,
  incrementUnreadCount,
  Conversation,
  UserAgent,
  ChatMessage
} from "@/services/userDataService";

const FALLBACK_GREETING = "Hello! How can I help you today?";

export default function DashboardChatSection() {
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [agents, setAgents] = useState<UserAgent[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newConversationTitle, setNewConversationTitle] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Check if API key exists in localStorage
  useEffect(() => {
    const apiKey = localStorage.getItem('openai_api_key');
    if (apiKey) {
      try {
        initializeOpenAI(apiKey);
        setIsApiKeyConfigured(true);
      } catch (error) {
        console.error('Error initializing OpenAI:', error);
        setIsApiKeyConfigured(false);
      }
    }
  }, []);
  
  // Load user's conversations and agents
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const userAgents = await getUserAgents(user.id);
        setAgents(userAgents);
        
        const userConversations = await getUserConversations(user.id);
        setConversations(userConversations);
        
        if (userConversations.length > 0) {
          handleConversationSelect(userConversations[0]);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [user]);
  
  // Load messages when active conversation changes
  useEffect(() => {
    const loadMessages = async () => {
      if (!activeConversation) return;
      
      try {
        const conversationMessages = await getConversationMessages(activeConversation.id);
        setMessages(conversationMessages);
        
        // Mark conversation as read
        await markConversationAsRead(activeConversation.id);
        
        // Update the unread count in the UI
        setConversations(prev => 
          prev.map(conv => 
            conv.id === activeConversation.id 
              ? { ...conv, unread_count: 0 }
              : conv
          )
        );
        
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };
    
    loadMessages();
  }, [activeConversation]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleApiKeySubmit = (isValid: boolean) => {
    setIsApiKeyConfigured(isValid);
    setApiKeyDialogOpen(false);
  };
  
  const handleConversationSelect = (conversation: Conversation) => {
    setActiveConversation(conversation);
  };
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || isTyping || !activeConversation || !user) return;
    
    // Add user message to UI immediately
    const userMessageContent = newMessage.trim();
    setNewMessage("");
    
    try {
      // Add the message to the database
      const savedMessage = await addMessageToConversation(
        activeConversation.id,
        'user',
        userMessageContent
      );
      
      if (savedMessage) {
        setMessages(prev => [...prev, savedMessage]);
      }
      
      // Set typing indicator
      setIsTyping(true);
      
      // Get AI response
      try {
        const aiMessages = messages.map(msg => ({
          role: msg.role,
          message: msg.content
        }));
        
        // Add the new user message that we just sent
        aiMessages.push({
          role: 'user',
          message: userMessageContent
        });
        
        const aiResponse = await generateAIResponse(aiMessages);
        
        // Save AI response to database
        const savedAiMessage = await addMessageToConversation(
          activeConversation.id,
          'assistant',
          aiResponse
        );
        
        if (savedAiMessage) {
          setMessages(prev => [...prev, savedAiMessage]);
        }
        
        // Update conversation in the list with the latest message
        setConversations(prev => 
          prev.map(conv => 
            conv.id === activeConversation.id 
              ? { ...conv, last_message: aiResponse, updated_at: new Date().toISOString() }
              : conv
          )
        );
        
      } catch (error) {
        console.error('Error getting AI response:', error);
        
        // Add fallback error message
        const errorMessage = "I'm sorry, I'm having trouble connecting to my language model. Please try again later.";
        const savedErrorMessage = await addMessageToConversation(
          activeConversation.id,
          'assistant',
          errorMessage
        );
        
        if (savedErrorMessage) {
          setMessages(prev => [...prev, savedErrorMessage]);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleCreateNewConversation = async () => {
    if (!user || !selectedAgentId || !newConversationTitle.trim()) return;
    
    try {
      const newConversation = await createConversation(
        user.id,
        selectedAgentId,
        newConversationTitle.trim()
      );
      
      if (newConversation) {
        // Add to conversations list
        setConversations(prev => [newConversation, ...prev]);
        
        // Select the new conversation
        setActiveConversation(newConversation);
        
        // Reset form
        setNewConversationTitle("");
        setSelectedAgentId(null);
        setIsCreateDialogOpen(false);
        
        // Send initial greeting
        setIsTyping(true);
        
        try {
          const greeting = await generateAIResponse([]);
          const savedGreeting = await addMessageToConversation(
            newConversation.id,
            'assistant',
            greeting
          );
          
          if (savedGreeting) {
            setMessages([savedGreeting]);
          }
          
          // Update conversation with greeting
          setConversations(prev => 
            prev.map(conv => 
              conv.id === newConversation.id 
                ? { ...conv, last_message: greeting }
                : conv
            )
          );
        } catch (error) {
          console.error('Error getting greeting:', error);
          
          // Use fallback greeting
          const savedGreeting = await addMessageToConversation(
            newConversation.id,
            'assistant',
            FALLBACK_GREETING
          );
          
          if (savedGreeting) {
            setMessages([savedGreeting]);
          }
        } finally {
          setIsTyping(false);
        }
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };
  
  const getAgentName = (agentId: string): string => {
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || 'AI Agent';
  };
  
  const getAgentInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-muted-foreground">Loading chats...</p>
        </div>
      </div>
    );
  }
  
  if (!isApiKeyConfigured) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
        <Card className="w-full max-w-md bg-[#131318] border-0">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <MessageSquare className="h-12 w-12 text-blue-500" />
              <h2 className="text-xl font-semibold">Configure AI Service</h2>
              <p className="text-center text-muted-foreground mb-4">
                You need to configure an OpenAI API key to use the chat feature.
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => setApiKeyDialogOpen(true)}
              >
                Set API Key
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Configure OpenAI API Key</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
        <Card className="w-full max-w-md bg-[#131318] border-0">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <MessageSquare className="h-12 w-12 text-blue-500" />
              <h2 className="text-xl font-semibold">No Conversations Yet</h2>
              <p className="text-center text-muted-foreground mb-4">
                Start a new conversation with one of your AI agents.
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Conversation
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>New Conversation</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="title">Conversation Title</Label>
                <Input
                  id="title"
                  value={newConversationTitle}
                  onChange={e => setNewConversationTitle(e.target.value)}
                  placeholder="e.g. Project Discussion"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="agent">Select Agent</Label>
                <Tabs defaultValue={agents[0]?.id} onValueChange={setSelectedAgentId} className="mt-1">
                  <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${Math.min(agents.length, 3)}, 1fr)` }}>
                    {agents.map(agent => (
                      <TabsTrigger key={agent.id} value={agent.id}>
                        {agent.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {agents.map(agent => (
                    <TabsContent key={agent.id} value={agent.id} className="mt-2">
                      <div className="text-sm text-muted-foreground">
                        {agent.description || `AI assistant that can help with various tasks.`}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={handleCreateNewConversation}
                disabled={!newConversationTitle.trim() || !selectedAgentId}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  
  return (
    <div className="flex h-[calc(100vh-12rem)] border border-blue-900/20 rounded-lg bg-[#0e0e11] overflow-hidden">
      {/* Sidebar - Conversations List */}
      <div className="w-80 border-r border-blue-900/20 flex flex-col">
        <div className="p-3 border-b border-blue-900/20">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Messages</h2>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search conversations..."
              className="pl-8 h-9 border-blue-900/30 bg-blue-900/10"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => {
            const agentName = getAgentName(conversation.agent_id);
            const initials = getAgentInitials(agentName);
            
            return (
              <div 
                key={conversation.id}
                className={`flex gap-3 p-3 hover:bg-blue-900/20 cursor-pointer border-l-2 ${
                  activeConversation?.id === conversation.id 
                    ? "bg-blue-900/20 border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => handleConversationSelect(conversation)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-purple-900/40">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium truncate">{conversation.title}</span>
                      <Badge className="h-5 text-xs bg-purple-500/20 text-purple-300 border-0">
                        <Bot className="h-3 w-3 mr-1" /> AI
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(conversation.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <p className="text-sm text-muted-foreground truncate">{conversation.last_message}</p>
                    {conversation.unread_count > 0 && (
                      <Badge className="rounded-full h-5 w-5 flex items-center justify-center p-0 bg-blue-600">
                        {conversation.unread_count}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>New Conversation</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="title">Conversation Title</Label>
                <Input
                  id="title"
                  value={newConversationTitle}
                  onChange={e => setNewConversationTitle(e.target.value)}
                  placeholder="e.g. Project Discussion"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="agent">Select Agent</Label>
                <Tabs defaultValue={agents[0]?.id} onValueChange={setSelectedAgentId} className="mt-1">
                  <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${Math.min(agents.length, 3)}, 1fr)` }}>
                    {agents.map(agent => (
                      <TabsTrigger key={agent.id} value={agent.id}>
                        {agent.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {agents.map(agent => (
                    <TabsContent key={agent.id} value={agent.id} className="mt-2">
                      <div className="text-sm text-muted-foreground">
                        {agent.description || `AI assistant that can help with various tasks.`}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={handleCreateNewConversation}
                disabled={!newConversationTitle.trim() || !selectedAgentId}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation && (
          <>
            {/* Chat Header */}
            <div className="p-3 border-b border-blue-900/20 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-purple-900/40">
                    {getAgentInitials(getAgentName(activeConversation.agent_id))}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activeConversation.title}</span>
                    <Badge className="h-5 text-xs bg-purple-500/20 text-purple-300 border-0">
                      <Bot className="h-3 w-3 mr-1" /> AI
                    </Badge>
                  </div>
                  <span className="flex items-center text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                    {getAgentName(activeConversation.agent_id)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
                  <Settings className="h-4 w-4" onClick={() => setApiKeyDialogOpen(true)} />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${message.role === "user" ? "order-2" : "order-1"}`}>
                    <div className="flex items-start gap-3">
                      {message.role !== "user" && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback className="bg-purple-900/40">
                            {getAgentInitials(getAgentName(activeConversation.agent_id))}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="text-xs text-muted-foreground">
                            {message.role === "user" ? "You" : getAgentName(activeConversation.agent_id)}
                          </span>
                          <span className="mx-2 text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className={`p-3 rounded-lg ${
                          message.role === "user" 
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800 text-slate-100"
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback className="bg-blue-900/40">
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] order-1">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-purple-900/40">
                          {activeConversation ? getAgentInitials(getAgentName(activeConversation.agent_id)) : 'AI'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="text-xs text-muted-foreground">
                            {activeConversation ? getAgentName(activeConversation.agent_id) : 'AI Assistant'}
                          </span>
                          <span className="mx-2 text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-800 text-slate-100">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message Input */}
            <div className="p-3 border-t border-blue-900/20">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="border-blue-900/30 bg-blue-900/10 focus:bg-blue-900/20"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10 shrink-0 bg-blue-600 hover:bg-blue-700"
                  disabled={!newMessage.trim() || isTyping}
                >
                  {isTyping ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
      
      <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configure OpenAI API Key</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 