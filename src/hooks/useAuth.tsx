import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { User as AppUser } from '../types/database';
import { SIGN_IN } from '../constants/routes';

interface AuthContextType {
  user: User | null;
  appUser: AppUser | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  appUser: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchAppUser(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    // IMPORTANT: This callback must be non-blocking (no await) to avoid
    // deadlocks with supabase-js internal auth lock. See:
    // https://github.com/supabase/supabase/pull/19902
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Use setTimeout to avoid deadlock — fetchAppUser calls supabase
          // which needs the auth lock that onAuthStateChange is holding
          setTimeout(() => fetchAppUser(session.user.id), 0);
        } else {
          setAppUser(null);
          setLoading(false);
        }
      }
    );

    // Refresh session when tab becomes visible (handles stale tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Use setTimeout to avoid deadlock with auth lock when tab regains focus
        setTimeout(async () => {
          const { data: { session: currentSession }, error } = await supabase.auth.getSession();

          if (error || !currentSession) {
            setSession(null);
            setUser(null);
            setAppUser(null);
            return;
          }

          const expiresAt = currentSession.expires_at;
          if (expiresAt && expiresAt * 1000 - Date.now() < 60000) {
            await supabase.auth.refreshSession();
          }
        }, 0);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const fetchAppUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setAppUser(data);
    } catch (error) {
      console.error('Error fetching app user:', error);
      setAppUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      // Even if signOut fails (e.g., expired session), we still want to clear local state
      console.error('Error signing out:', error);
    } finally {
      // Always clear local state and redirect, regardless of API success
      setUser(null);
      setAppUser(null);
      setSession(null);
      navigate(SIGN_IN);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        appUser,
        session,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
