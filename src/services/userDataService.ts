import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

// Types
export interface UserSettings {
  id: string;
  user_id: string;
  dark_mode: boolean;
  compact_view: boolean;
  animations_enabled: boolean;
  timezone: string;
  
  // User profile information
  display_name: string;
  company_name: string;
  
  // Notification preferences
  email_notifications: boolean;
  workflow_alerts: boolean;
  agent_updates: boolean;
  system_announcements: boolean;
  
  // Billing information
  current_plan: string;
  billing_cycle: string;
  payment_method: string;
  
  created_at: string;
  updated_at: string;
}

export interface UserAgent {
  id: string;
  user_id: string;
  name: string;
  avatar_url?: string;
  description?: string;
  is_enabled: boolean;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  agent_id: string;
  title: string;
  last_message?: string;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

// User Settings
export const getUserSettings = async (userId: string): Promise<UserSettings | null> => {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user settings:', error);
    return null;
  }

  return data as UserSettings;
};

export const createDefaultUserSettings = async (userId: string): Promise<UserSettings | null> => {
  const defaultSettings = {
    user_id: userId,
    dark_mode: true,
    compact_view: false,
    animations_enabled: true,
    timezone: 'UTC',
    
    // Default user profile information
    display_name: '',
    company_name: 'Acme Inc.',
    
    // Default notification preferences
    email_notifications: true,
    workflow_alerts: true,
    agent_updates: false,
    system_announcements: true,
    
    // Default billing information
    current_plan: 'Free',
    billing_cycle: 'Monthly',
    payment_method: 'None',
  };

  const { data, error } = await supabase
    .from('user_settings')
    .insert([defaultSettings])
    .select()
    .single();

  if (error) {
    console.error('Error creating default user settings:', error);
    return null;
  }

  return data as UserSettings;
};

export const updateUserSettings = async (userId: string, settings: Partial<UserSettings>): Promise<UserSettings | null> => {
  const { data, error } = await supabase
    .from('user_settings')
    .update(settings)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user settings:', error);
    return null;
  }

  return data as UserSettings;
};

// User Agents
export const getUserAgents = async (userId: string): Promise<UserAgent[]> => {
  const { data, error } = await supabase
    .from('user_agents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user agents:', error);
    return [];
  }

  return data as UserAgent[];
};

export const createDefaultAgentsForUser = async (userId: string): Promise<UserAgent[]> => {
  const defaultAgents = [
    {
      user_id: userId,
      name: 'Customer Support Agent',
      description: 'Handles customer inquiries and support requests',
      is_enabled: true,
    },
    {
      user_id: userId,
      name: 'Data Analysis Agent',
      description: 'Analyzes data and provides insights',
      is_enabled: true,
    },
    {
      user_id: userId,
      name: 'Content Generator',
      description: 'Creates content based on prompts',
      is_enabled: true,
    }
  ];

  const { data, error } = await supabase
    .from('user_agents')
    .insert(defaultAgents)
    .select();

  if (error) {
    console.error('Error creating default agents:', error);
    return [];
  }

  return data as UserAgent[];
};

// Conversations
export const getUserConversations = async (userId: string): Promise<Conversation[]> => {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }

  return data as Conversation[];
};

export const getConversation = async (conversationId: string): Promise<Conversation | null> => {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('id', conversationId)
    .single();

  if (error) {
    console.error('Error fetching conversation:', error);
    return null;
  }

  return data as Conversation;
};

export const createConversation = async (userId: string, agentId: string, title: string): Promise<Conversation | null> => {
  const newConversation = {
    user_id: userId,
    agent_id: agentId,
    title,
    unread_count: 0,
  };

  const { data, error } = await supabase
    .from('conversations')
    .insert([newConversation])
    .select()
    .single();

  if (error) {
    console.error('Error creating conversation:', error);
    return null;
  }

  return data as Conversation;
};

export const updateConversation = async (conversationId: string, updates: Partial<Conversation>): Promise<Conversation | null> => {
  const { data, error } = await supabase
    .from('conversations')
    .update(updates)
    .eq('id', conversationId)
    .select()
    .single();

  if (error) {
    console.error('Error updating conversation:', error);
    return null;
  }

  return data as Conversation;
};

// Chat Messages
export const getConversationMessages = async (conversationId: string): Promise<ChatMessage[]> => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data as ChatMessage[];
};

export const addMessageToConversation = async (
  conversationId: string, 
  role: 'user' | 'assistant', 
  content: string
): Promise<ChatMessage | null> => {
  const newMessage = {
    conversation_id: conversationId,
    role,
    content,
  };

  const { data, error } = await supabase
    .from('chat_messages')
    .insert([newMessage])
    .select()
    .single();

  if (error) {
    console.error('Error adding message:', error);
    return null;
  }

  // Update the conversation's last_message and updated_at
  await updateConversation(conversationId, {
    last_message: content,
    updated_at: new Date().toISOString(),
  });

  return data as ChatMessage;
};

// User Data Initialization
export const initializeUserData = async (user: User): Promise<void> => {
  try {
    // Check if user settings exist
    const settings = await getUserSettings(user.id);
    if (!settings) {
      await createDefaultUserSettings(user.id);
    }

    // Check if user has agents
    const agents = await getUserAgents(user.id);
    if (agents.length === 0) {
      await createDefaultAgentsForUser(user.id);
    }
  } catch (error) {
    console.error('Error initializing user data:', error);
  }
};

// Mark conversation as read
export const markConversationAsRead = async (conversationId: string): Promise<void> => {
  const { error } = await supabase
    .from('conversations')
    .update({ unread_count: 0 })
    .eq('id', conversationId);

  if (error) {
    console.error('Error marking conversation as read:', error);
  }
};

// Increment unread count for conversation (used when user receives message but is viewing another conversation)
export const incrementUnreadCount = async (conversationId: string): Promise<void> => {
  const conversation = await getConversation(conversationId);
  if (!conversation) return;

  const { error } = await supabase
    .from('conversations')
    .update({ unread_count: conversation.unread_count + 1 })
    .eq('id', conversationId);

  if (error) {
    console.error('Error incrementing unread count:', error);
  }
}; 