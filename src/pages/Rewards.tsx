
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Award, Medal, Trophy, Star, Gift } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getProfileValue } from "@/types/profile";

// We'll simulate importing framer-motion
const MotionDiv = motion.div;

const Rewards = () => {
  const { user } = useAuth();
  
  // Define achievements based on user progress
  const achievements = [
    {
      id: "streak-3",
      title: "3-Day Streak",
      description: "Complete workouts for 3 consecutive days",
      icon: <Award className="size-8 text-yellow-400" />,
      progress: Math.min(100, ((getProfileValue(user, 'streak') || 0) / 3) * 100),
      completed: (getProfileValue(user, 'streak') || 0) >= 3,
    },
    {
      id: "streak-7",
      title: "7-Day Streak",
      description: "Complete workouts for 7 consecutive days",
      icon: <Medal className="size-8 text-blue-500" />,
      progress: Math.min(100, ((getProfileValue(user, 'streak') || 0) / 7) * 100),
      completed: (getProfileValue(user, 'streak') || 0) >= 7,
    },
    {
      id: "streak-30",
      title: "30-Day Streak",
      description: "Complete workouts for 30 consecutive days",
      icon: <Trophy className="size-8 text-purple-500" />,
      progress: Math.min(100, ((getProfileValue(user, 'streak') || 0) / 30) * 100),
      completed: (getProfileValue(user, 'streak') || 0) >= 30,
    },
    {
      id: "coins-50",
      title: "Coin Collector",
      description: "Earn 50 coins through workouts and quizzes",
      icon: <Star className="size-8 text-amber-400" />,
      progress: Math.min(100, ((getProfileValue(user, 'coins') || 0) / 50) * 100),
      completed: (getProfileValue(user, 'coins') || 0) >= 50,
    },
    {
      id: "coins-100",
      title: "Fitness Fortune",
      description: "Earn 100 coins through workouts and quizzes",
      icon: <Gift className="size-8 text-green-500" />,
      progress: Math.min(100, ((getProfileValue(user, 'coins') || 0) / 100) * 100),
      completed: (getProfileValue(user, 'coins') || 0) >= 100,
    }
  ];
  
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Rewards & Achievements</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Award className="text-fitverse-yellow" />
                Streak
              </CardTitle>
              <CardDescription>Current consecutive days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center text-primary">
                {getProfileValue(user, 'streak') || 0} days
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
        
        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-accent/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Star className="text-fitverse-yellow" />
                Coins
              </CardTitle>
              <CardDescription>Total coins earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center text-accent">
                {getProfileValue(user, 'coins') || 0} coins
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
      </div>
      
      {/* Achievements */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Achievements</h2>
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <MotionDiv
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`overflow-hidden ${
              achievement.completed ? "border-2 border-yellow-400" : ""
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    achievement.completed 
                      ? "bg-yellow-100" 
                      : "bg-gray-100"
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <span className={`text-sm font-medium ${
                        achievement.completed ? "text-yellow-500" : "text-muted-foreground"
                      }`}>
                        {achievement.completed ? "Completed" : "In Progress"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>
        ))}
      </div>
      
      {/* Coming Soon */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8"
      >
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>More rewards and special content unlockable with coins!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-4">
              <p>Stay tuned for special offers, premium content, and customization options.</p>
              <p className="mt-2">Continue earning coins to unlock these features!</p>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>
    </div>
  );
};

export default Rewards;
