// Utility functions for debugging Supabase authentication issues

export function logSessionDetails(session: unknown) {
  if (!session) {
    console.log('DEBUG: No session found');
    return;
  }
  
  try {
    const sessionObj = session as {
      access_token?: string;
      refresh_token?: string;
      expires_at?: number;
      provider?: string;
      user?: {
        id?: string;
        email?: string;
        session?: unknown;
      };
    };
    
    const safeSession = {
      hasAccessToken: !!sessionObj.access_token,
      accessTokenLength: sessionObj.access_token ? sessionObj.access_token.length : 0,
      hasRefreshToken: !!sessionObj.refresh_token,
      refreshTokenLength: sessionObj.refresh_token ? sessionObj.refresh_token.length : 0,
      expiresAt: sessionObj.expires_at,
      provider: sessionObj.provider,
      user: sessionObj.user ? {
        id: sessionObj.user.id,
        email: sessionObj.user.email,
        hasSession: !!sessionObj.user.session,
      } : null
    };
    
    console.log('DEBUG: Session details:', safeSession);
  } catch (error) {
    console.error('Error logging session details:', error);
  }
}

export function logAuthHeaderDetails(authHeader: string | null) {
  if (!authHeader) {
    console.log('DEBUG: No Authorization header found');
    return;
  }
  
  try {
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      console.log('DEBUG: Authorization header contains Bearer token of length:', token.length);
      
      // Log first and last few characters of token for debugging
      if (token.length > 10) {
        console.log(`DEBUG: Token starts with: ${token.substring(0, 5)}... and ends with: ...${token.substring(token.length - 5)}`);
      }
    } else {
      console.log('DEBUG: Authorization header does not start with "Bearer "');
    }
  } catch (error) {
    console.error('Error logging auth header details:', error);
  }
} 