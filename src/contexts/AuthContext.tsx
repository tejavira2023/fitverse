
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => void;
  addCoins: (amount: number) => void;
  updateStreak: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success("Logged in successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });

      if (error) throw error;
      toast.success("Account created successfully! Please check your email to verify your account.");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to logout");
      throw error;
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    if (user) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update(userData)
          .eq('id', user.id);
          
        if (error) throw error;
        toast.success("Profile updated!");
      } catch (error: any) {
        toast.error(error.message || "Failed to update profile");
        throw error;
      }
    }
  };

  const addCoins = async (amount: number) => {
    if (user) {
      try {
        const { error } = await supabase.rpc('add_coins', { amount });
        if (error) throw error;
        toast.success(`You earned ${amount} coins!`);
      } catch (error: any) {
        toast.error(error.message || "Failed to add coins");
      }
    }
  };

  const updateStreak = async () => {
    if (user) {
      try {
        const { error } = await supabase.rpc('update_streak');
        if (error) throw error;
      } catch (error: any) {
        console.error("Error updating streak:", error);
      }
    }
  };

  const value = {
    isAuthenticated,
    user,
    session,
    login,
    signup,
    logout,
    updateUserProfile,
    addCoins,
    updateStreak
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
