
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  name?: string | null;
  coins?: number | null;
  streak?: number | null;
  last_completed_day?: string | null;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  goal?: string;
  fitnessLevel?: string;
  healthIssues?: string;
  created_at?: string;
}

// Extend the User type from Supabase with our custom fields
export interface ExtendedUser extends User {
  profile?: UserProfile;
}

// Helper function to safely access profile properties
export const getProfileValue = (user: User | ExtendedUser | null, key: keyof UserProfile) => {
  if (!user) return null;
  // Check if we have a profile property with our custom data
  if ('profile' in user && user.profile) {
    return user.profile[key];
  }
  return null;
};
