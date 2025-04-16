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

export async function deleteProject(projectId: string): Promise<boolean> {
  const supabase = createClient();

  try {
    console.log('Deleting project with ID:', projectId);
    
    // Check if user can actually view the project before trying to delete it
    const { data: projectData, error: projectFetchError } = await supabase
      .from('projects')
      .select('user_id')
      .eq('id', projectId)
      .single();
    
    if (projectFetchError) {
      console.error('Error fetching project before deletion:', projectFetchError);
      return false;
    }
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('Authentication error - cannot delete project:', authError || 'No user found');
      return false;
    }
    
    console.log('Trying to delete project owned by:', projectData.user_id);
    console.log('Current authenticated user:', user.id);
    
    // Double-check that we're the owner - this is critical for RLS
    if (projectData.user_id !== user.id) {
      console.error('Cannot delete project - authenticated user does not match project owner');
      return false;
    }
    
    // First, delete all associated conversations
    console.log('Deleting associated conversations...');
    const { data: deletedConversations, error: conversationsError } = await supabase
      .from('conversations')
      .delete()
      .eq('project_id', projectId)
      .select('id');
    
    if (conversationsError) {
      console.error('Error deleting conversations:', conversationsError);
      // If this fails because of RLS, we might need a different approach
    } else {
      console.log(`Successfully deleted ${deletedConversations?.length || 0} conversations`);
    }
    
    // Try simple delete without returning data first (this often works when select() fails due to RLS)
    console.log('Attempting simplified project deletion...');
    const { error: simpleDeleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);
    
    if (simpleDeleteError) {
      console.error('Simple deletion failed:', simpleDeleteError);
      
      // As a last resort, try the delete with select but handle the empty result
      console.log('Attempting deletion with data return...');
      const { data: deletedProject, error: projectError } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user.id) // Add this extra check to ensure RLS works
        .select();
      
      if (projectError) {
        console.error('Error deleting project with data return:', projectError);
        return false;
      }
      
      if (!deletedProject || deletedProject.length === 0) {
        // This is expected in some RLS configurations, verify deletion instead
        console.log('No deletion data returned, verifying if project still exists...');
        
        // Verify the project is actually gone
        const { data: checkProject, error: checkError } = await supabase
          .from('projects')
          .select('id')
          .eq('id', projectId)
          .single();
        
        if (checkError && checkError.code === 'PGRST116') {
          // PGRST116 means no rows returned, which is good in this case
          console.log('Verified project was deleted successfully');
          return true;
        } else if (checkProject) {
          console.error('Project still exists after deletion attempt');
          return false;
        }
      } else {
        console.log('Project deleted successfully with data returned:', deletedProject);
        return true;
      }
    } else {
      // Simple delete succeeded
      console.log('Project deleted successfully with simple approach');
      return true;
    }
    
    // If we reached here, the deletion might have worked, do a final check
    const { error: finalCheckError } = await supabase
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .single();
    
    if (finalCheckError && finalCheckError.code === 'PGRST116') {
      // No rows returned = success
      console.log('Final verification confirms project was deleted');
      return true;
    }
    
    console.error('Final check shows project still exists or check failed');
    return false;
  } catch (err) {
    console.error('Unexpected error in deleteProject:', err);
    return false;
  }
}

export async function getProject(projectId: string): Promise<Project | null> {
  const supabase = createClient();
  console.log('Fetching project by ID:', projectId);

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (error) {
      console.error('Error fetching project:', {
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      return null;
    }

    console.log('Project fetched successfully:', data || 'No project found');
    return data as Project;
  } catch (err) {
    console.error('Unexpected error in getProject:', err);
    return null;
  }
} 