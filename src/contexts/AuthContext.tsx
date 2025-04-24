
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Session } from '@supabase/supabase-js';
import { UserProfile, ExtendedUser } from "@/types/profile";

interface AuthContextType {
  isAuthenticated: boolean;
  user: ExtendedUser | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (userData: Partial<UserProfile>) => Promise<void>;
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
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        setUser(currentUser => {
          if (!currentUser) return null;
          return {
            ...currentUser,
            profile: data as UserProfile
          };
        });
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setIsAuthenticated(!!session);
        
        if (session?.user) {
          setTimeout(() => {
            setUser({
              ...session.user,
              profile: {} as UserProfile
            });
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        setUser({
          ...session.user,
          profile: {} as UserProfile
        });
        fetchUserProfile(session.user.id);
      }
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
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      toast.success("Account created successfully!");
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

  const updateUserProfile = async (userData: Partial<UserProfile>) => {
    if (user?.id) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update(userData)
          .eq('id', user.id);
          
        if (error) throw error;
        
        setUser(currentUser => {
          if (!currentUser) return null;
          return {
            ...currentUser,
            profile: {
              ...currentUser.profile,
              ...userData
            }
          };
        });
        
        toast.success("Profile updated!");
      } catch (error: any) {
        toast.error(error.message || "Failed to update profile");
        throw error;
      }
    }
  };

  const addCoins = async (amount: number) => {
    if (user?.id) {
      try {
        // Instead of using RPC, update the profiles table directly
        const currentCoins = user.profile?.coins || 0;
        const newCoins = currentCoins + amount;
        
        const { error } = await supabase
          .from('profiles')
          .update({ coins: newCoins })
          .eq('id', user.id);
          
        if (error) throw error;
        
        setUser(currentUser => {
          if (!currentUser?.profile) return currentUser;
          return {
            ...currentUser,
            profile: {
              ...currentUser.profile,
              coins: newCoins
            }
          };
        });
        
        toast.success(`You earned ${amount} coins!`);
      } catch (error: any) {
        console.error("Error adding coins:", error);
        toast.error(error.message || "Failed to add coins");
      }
    }
  };

  const updateStreak = async () => {
    if (user?.id) {
      try {
        // Instead of using RPC, update the streak directly
        const today = new Date().toISOString().split('T')[0];
        const lastCompletedDay = user.profile?.last_completed_day;
        let newStreak = user.profile?.streak || 0;
        
        // If there's no last completed day or it's not today
        if (!lastCompletedDay || lastCompletedDay !== today) {
          // Check if the last completed day was yesterday
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          if (lastCompletedDay === yesterdayStr) {
            // If last completed day was yesterday, increment streak
            newStreak += 1;
          } else if (lastCompletedDay !== today) {
            // If last completed day was neither yesterday nor today, reset streak
            newStreak = 1;
          }
          
          // Update the database
          const { error } = await supabase
            .from('profiles')
            .update({
              streak: newStreak,
              last_completed_day: today
            })
            .eq('id', user.id);
            
          if (error) throw error;
          
          // Update local state
          setUser(currentUser => {
            if (!currentUser?.profile) return currentUser;
            return {
              ...currentUser,
              profile: {
                ...currentUser.profile,
                streak: newStreak,
                last_completed_day: today
              }
            };
          });
          
          if (newStreak > 1) {
            toast.success(`Streak updated! You're on a ${newStreak}-day streak!`);
          } else {
            toast.success(`First day completed! Keep going!`);
          }
        }
      } catch (error: any) {
        console.error("Error updating streak:", error);
        toast.error(error.message || "Failed to update streak");
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
