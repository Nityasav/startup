// Utility functions for debugging Supabase authentication issues

export function logSessionDetails(session: any) {
  if (!session) {
    console.log('DEBUG: No session found');
    return;
  }
  
  try {
    const safeSession = {
      hasAccessToken: !!session.access_token,
      accessTokenLength: session.access_token ? session.access_token.length : 0,
      hasRefreshToken: !!session.refresh_token,
      refreshTokenLength: session.refresh_token ? session.refresh_token.length : 0,
      expiresAt: session.expires_at,
      provider: session.provider,
      user: session.user ? {
        id: session.user.id,
        email: session.user.email,
        hasSession: !!session.user.session,
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