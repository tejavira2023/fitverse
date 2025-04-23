
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name?: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  goal?: string;
  fitnessLevel?: string;
  healthIssues?: string;
  coins: number;
  streak: number;
  lastCompletedDay?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
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
  
  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("fitverse-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("fitverse-user", JSON.stringify(user));
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    try {
      // Mock API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from the API
      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        coins: 0,
        streak: 0
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please try again.");
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    // In a real app, this would be an API call
    try {
      // Mock API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock user creation - in real app, this would be done on the server
      const newUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email,
        name,
        coins: 0,
        streak: 0
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("fitverse-user");
    toast.success("Logged out successfully!");
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      toast.success("Profile updated!");
    }
  };

  const addCoins = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, coins: (user.coins || 0) + amount };
      setUser(updatedUser);
      toast.success(`You earned ${amount} coins!`);
    }
  };

  const updateStreak = () => {
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      
      // If user has already completed today, don't update
      if (user.lastCompletedDay === today) return;
      
      // Check if last completion was yesterday to continue streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      let newStreak = user.lastCompletedDay === yesterdayStr 
        ? user.streak + 1 
        : 1;
      
      const updatedUser = { 
        ...user, 
        streak: newStreak,
        lastCompletedDay: today
      };
      
      setUser(updatedUser);
      
      if (newStreak > 1) {
        toast.success(`🔥 ${newStreak} day streak! Keep it up!`);
      }
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    updateUserProfile,
    addCoins,
    updateStreak
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
