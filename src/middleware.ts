import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware ensures that all API routes receive proper authentication headers

export async function middleware(request: NextRequest) {
  // Skip non-API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Middleware: Supabase credentials missing');
    return NextResponse.next();
  }

  // Get auth cookie
  const authCookie = request.cookies.get('sb-access-token')?.value;
  const refreshCookie = request.cookies.get('sb-refresh-token')?.value;
  
  // Log cookies for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('Middleware: Auth cookie present:', !!authCookie);
    console.log('Middleware: Refresh cookie present:', !!refreshCookie);
  }
  
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // If we have an auth cookie, add it to the request
  if (authCookie) {
    requestHeaders.set('x-supabase-auth', authCookie);
  }
  
  // Pass the headers to the response
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Configure which paths this middleware applies to
export const config = {
  matcher: [
    '/api/:path*',
  ],
}; 