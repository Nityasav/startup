import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { logAuthHeaderDetails } from '@/lib/supabase/debug';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const projectId = params.id;
  
  try {
    // Check for auth in different possible headers
    const authHeader = request.headers.get('authorization');
    const supabaseAuthHeader = request.headers.get('x-supabase-auth');
    
    logAuthHeaderDetails(authHeader);
    console.log('API route: Custom auth header present:', !!supabaseAuthHeader);
    
    // Priority: 1. Authorization header, 2. Custom header
    let token: string | null = null;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
      console.log('API route: Using authorization header token');
    } else if (supabaseAuthHeader) {
      token = supabaseAuthHeader;
      console.log('API route: Using custom auth header token');
    }
    
    if (!token) {
      console.error('API route: No valid token found in any header');
      return NextResponse.json(
        { error: 'Authentication failed: No valid token provided' },
        { status: 401 }
      );
    }
    
    // Initialize Supabase client
    const supabase = createServerClient(request);
    console.log('API route: Starting project deletion for ID:', projectId);
    
    // Use the token for authentication
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    
    if (authError) {
      console.error('Authentication error in project deletion:', {
        message: authError.message,
        status: authError.status,
        name: authError.name
      });
      return NextResponse.json(
        { error: 'Authentication failed: ' + authError.message },
        { status: 401 }
      );
    }
    
    if (!authData?.user) {
      console.error('No user found in authenticated session');
      return NextResponse.json(
        { error: 'Authentication failed: No user found in session' },
        { status: 401 }
      );
    }
    
    console.log('API route: Authenticated user:', authData.user.id);

    // Verify project ownership
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select('id, user_id')
      .eq('id', projectId)
      .single();

    if (projectError) {
      console.error('Error fetching project for deletion:', projectError);
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    if (projectData.user_id !== authData.user.id) {
      console.error('Unauthorized deletion attempt:', {
        projectId,
        projectOwner: projectData.user_id,
        requestUser: authData.user.id
      });
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Delete conversations first
    const { error: conversationsError } = await supabase
      .from('conversations')
      .delete()
      .eq('project_id', projectId);

    if (conversationsError) {
      console.error('Error deleting project conversations:', conversationsError);
      // Continue with project deletion even if conversations deletion fails
    }

    // Delete the project
    const { data: deleteData, error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)
      .select();

    if (deleteError) {
      console.error('Error deleting project:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete project: ' + deleteError.message },
        { status: 500 }
      );
    }

    console.log('API route: Project deleted successfully:', deleteData);
    return NextResponse.json(
      { success: true, deleted: deleteData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in project deletion:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
} 