import { createClient } from './supabase/client';
import { Database } from './supabase/types';

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
      console.error('Error creating project:', error);
      return null;
    }

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
    
    const { data, error } = await supabase
      .from('conversations')
      .insert([
        {
          project_id: projectId,
          messages: [{
            role: 'user',
            content: message,
            timestamp: new Date().toISOString(),
          }],
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating conversation:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return null;
    }

    console.log('Conversation created successfully:', data);
    return data;
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