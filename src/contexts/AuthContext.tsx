import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  signUp: (email: string, password: string, fullName?: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUser(session.user);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    const signUpParams: Parameters<typeof supabase.auth.signUp>[0] = { email, password };
    if (fullName) {
      signUpParams.options = { data: { full_name: fullName } };
    }
    const { data: d2, error: e2 } = await supabase.auth.signUp(signUpParams);
    if (d2.session?.user) setUser(d2.session.user);
    return { data: d2, error: e2 };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data.session?.user) setUser(data.session.user);
    return { data, error };
  };
  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
