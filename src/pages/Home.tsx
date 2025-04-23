
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Activity, Award, MessageCircle, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProfileValue } from "@/types/profile";

// We'll simulate importing framer-motion
const MotionButton = motion(Button);
const MotionCard = motion(Card);

const Home = () => {
  const { user } = useAuth();
  
  return (
    <div className="py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Welcome to FitVerse
        </h1>
        <p className="text-muted-foreground">
          Your journey to a healthier you starts here
        </p>
      </motion.div>
      
      {/* User Stats */}
      <MotionCard
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="border-2 border-primary/20 bg-primary/5"
      >
        <CardHeader className="pb-2">
          <CardTitle>Today's Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary">{getProfileValue(user, 'streak') || 0}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-accent">{getProfileValue(user, 'coins') || 0}</div>
              <div className="text-sm text-muted-foreground">Total Coins</div>
            </div>
          </div>
        </CardContent>
      </MotionCard>
      
      {/* Main Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/fitness">
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="cursor-pointer hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Activity className="text-primary" />
                Start Fitness
              </CardTitle>
              <CardDescription>Begin your workout journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Choose from various fitness programs including weight loss, meditation, weight gain, figure management, and yoga.
              </p>
            </CardContent>
          </MotionCard>
        </Link>
        
        <Link to="/rewards">
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="cursor-pointer hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Award className="text-accent" />
                Rewards
              </CardTitle>
              <CardDescription>Earn coins and unlock achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Complete workouts and quizzes to earn coins. Use them to unlock special content and track your progress.
              </p>
            </CardContent>
          </MotionCard>
        </Link>
        
        <Link to="/consult">
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="cursor-pointer hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="text-fitverse-blue" />
                Consult
              </CardTitle>
              <CardDescription>Get expert advice</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Book sessions with our fitness consultants to get personalized guidance on your fitness journey.
              </p>
            </CardContent>
          </MotionCard>
        </Link>
        
        <Link to="/account">
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="cursor-pointer hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <User className="text-secondary" />
                My Account
              </CardTitle>
              <CardDescription>Manage your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Update your personal information, track your progress, and customize your fitness goals.
              </p>
            </CardContent>
          </MotionCard>
        </Link>
      </div>
      
      {/* Quick Start */}
      <Link to="/fitness">
        <MotionButton
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="w-full py-6 text-lg gradient-bg mt-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Today's Workout
        </MotionButton>
      </Link>
    </div>
  );
};

export default Home;
