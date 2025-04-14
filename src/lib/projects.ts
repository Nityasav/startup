import { createClient } from './supabase/client';
import { Database } from './supabase/types';
import { generateBusinessAdvice } from './openai';

export type Project = Database['public']['Tables']['projects']['Row'];
export type Conversation = Database['public']['Tables']['conversations']['Row'];
export type Message = Conversation['messages'][0];

export async function createProject(
  userId: string,
  name: string,
  description: string,
  projectType: 'new' | 'existing'
): Promise<Project | null> {
  const supabase = createClient();
  console.log('Creating project with data:', { userId, name, description, projectType });

  // Add debugging for authentication
  const { data: authData } = await supabase.auth.getUser();
  console.log('Current authenticated user:', authData?.user || 'No user found');
  console.log('Auth user ID:', authData?.user?.id || 'No ID');
  console.log('Requested user ID for project:', userId);
  
  // Check if user IDs match
  if (authData?.user?.id !== userId) {
    console.warn('Auth user ID does not match requested user ID for project creation');
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          user_id: userId,
          name,
          description,
          project_type: projectType,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return null;
    }

    if (!data) {
      console.error('No project data returned after successful insert');
      return null;
    }

    console.log('Project created successfully:', data);
    return data;
  } catch (err) {
    console.error('Unexpected error in createProject:', err);
    return null;
  }
}

export async function getUserProjects(userId: string): Promise<Project[]> {
  const supabase = createClient();
  console.log('Fetching projects for user:', userId);

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', {
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      return [];
    }

    console.log('Projects fetched successfully:', data?.length || 0, 'projects found');
    return data || [];
  } catch (err) {
    console.error('Unexpected error in getUserProjects:', err);
    return [];
  }
}

export async function createConversation(
  projectId: string,
  message: string
): Promise<Conversation | null> {
  const supabase = createClient();

  try {
    console.log('Creating conversation with data:', { projectId, message });
    
    // Create initial conversation with user message
    const { data: conversation, error: createError } = await supabase
      .from('conversations')
      .insert([
        {
          project_id: projectId,
          messages: [{
            role: 'user' as const,
            content: message,
            timestamp: new Date().toISOString(),
          }],
        },
      ])
      .select()
      .single();

    if (createError) {
      console.error('Supabase error creating conversation:', {
        message: createError.message,
        details: createError.details,
        hint: createError.hint,
        code: createError.code
      });
      return null;
    }

    // Generate AI response
    try {
      // Cast to the proper type to fix type error
      const messages = conversation.messages as Message[];
      const aiResponse = await generateBusinessAdvice(messages);
      
      // Update conversation with AI response
      const { data: updatedConversation, error: updateError } = await supabase
        .from('conversations')
        .update({
          messages: [
            ...messages,
            {
              role: 'assistant' as const,
              content: aiResponse,
              timestamp: new Date().toISOString(),
            }
          ]
        })
        .eq('id', conversation.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating conversation with AI response:', updateError);
        return conversation as Conversation;
      }

      return updatedConversation as Conversation;
    } catch (aiError) {
      console.error('Error generating AI response:', aiError);
      return conversation as Conversation;
    }
  } catch (err) {
    console.error('Unexpected error in createConversation:', err);
    return null;
  }
}

export async function getProjectConversations(projectId: string): Promise<Conversation[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error in getProjectConversations:', err);
    return [];
  }
}

export async function updateConversation(
  conversationId: string,
  message: string
): Promise<Conversation | null> {
  const supabase = createClient();

  try {
    // Get the existing conversation
    const { data: existingConversation, error: fetchError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .single();

    if (fetchError) {
      console.error('Error fetching conversation:', fetchError);
      return null;
    }

    // Add user message to the existing messages
    // Cast to proper type to fix type error
    const existingMessages = existingConversation.messages as Message[];
    const updatedMessages = [
      ...existingMessages,
      {
        role: 'user' as const,
        content: message,
        timestamp: new Date().toISOString(),
      }
    ];

    // Update the conversation with the new user message
    const { data: updatedWithUserMsg, error: updateError } = await supabase
      .from('conversations')
      .update({
        messages: updatedMessages
      })
      .eq('id', conversationId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating conversation with user message:', updateError);
      return null;
    }

    // Generate AI response
    try {
      const aiResponse = await generateBusinessAdvice(updatedMessages);
      
      // Update conversation with AI response
      const finalMessages = [
        ...updatedMessages,
        {
          role: 'assistant' as const,
          content: aiResponse,
          timestamp: new Date().toISOString(),
        }
      ];
      
      const { data: finalConversation, error: finalUpdateError } = await supabase
        .from('conversations')
        .update({
          messages: finalMessages
        })
        .eq('id', conversationId)
        .select()
        .single();

      if (finalUpdateError) {
        console.error('Error updating conversation with AI response:', finalUpdateError);
        return updatedWithUserMsg as Conversation;
      }

      return finalConversation as Conversation;
    } catch (aiError) {
      console.error('Error generating AI response:', aiError);
      return updatedWithUserMsg as Conversation;
    }
  } catch (err) {
    console.error('Unexpected error in updateConversation:', err);
    return null;
  }
}

export async function deleteConversation(conversationId: string): Promise<boolean> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId);

    if (error) {
      console.error('Error deleting conversation:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error in deleteConversation:', err);
    return false;
  }
}

export async function generateImage(prompt: string): Promise<{ url: string; revisedPrompt: string } | null> {
  try {
    const response = await fetch('/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}

export async function addImageToConversation(
  conversationId: string,
  imageUrl: string,
  prompt: string,
  revisedPrompt: string
): Promise<Conversation | null> {
  const supabase = createClient();

  try {
    // Get the existing conversation
    const { data: existingConversation, error: fetchError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .single();

    if (fetchError) {
      console.error('Error fetching conversation:', fetchError);
      return null;
    }

    // Cast to proper type to fix type error
    const existingMessages = existingConversation.messages as Message[];
    
    // Create messages for the image request and response
    const userMessage = {
      role: 'user' as const,
      content: `Generate image: ${prompt}`,
      timestamp: new Date().toISOString(),
    };
    
    const assistantMessage = {
      role: 'assistant' as const,
      content: revisedPrompt,
      timestamp: new Date().toISOString(),
      imageUrl: imageUrl // Add the image URL to the message
    };

    // Add both messages to the conversation
    const updatedMessages = [
      ...existingMessages,
      userMessage,
      assistantMessage
    ];

    // Update the conversation with the new messages
    const { data: updatedConversation, error: updateError } = await supabase
      .from('conversations')
      .update({
        messages: updatedMessages
      })
      .eq('id', conversationId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating conversation with image:', updateError);
      return null;
    }

    return updatedConversation as Conversation;
  } catch (err) {
    console.error('Unexpected error in addImageToConversation:', err);
    return null;
  }
} 