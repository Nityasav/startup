'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOutUser, supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to refresh the user data
  const refreshUser = async () => {
    try {
      const { user: currentUser, error } = await getCurrentUser();
      if (error) {
        console.error('Error getting current user:', error);
        setUser(null);
        return;
      }
      
      setUser(currentUser || null);
    } catch (error) {
      console.error('Unexpected error in refreshUser:', error);
      setUser(null);
    }
  };

  // Check for user session on initial load
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      await refreshUser();
      setLoading(false);
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_IN') {
          refreshUser();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign out function
  const signOut = async () => {
    const { error } = await signOutUser();
    if (error) {
      console.error('Error signing out:', error);
      return;
    }
    
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 