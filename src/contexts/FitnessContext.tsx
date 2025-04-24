
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

// Define fitness categories
export const fitnessCategories = [
  {
    id: "weight-loss",
    name: "Weight Loss",
    description: "Effective workouts to help you shed extra pounds",
    color: "from-red-400 to-orange-500",
    icon: "weight-lose",
    levels: [
      {
        id: "weight-loss-1",
        name: "Level 1",
        description: "Getting Started with Weight Loss",
        isUnlocked: true,
        videoUrl: "https://www.youtube.com/embed/usDffbGGb_g",
        avatarImage: "obese-avatar.png",
        quiz: [
          {
            question: "How many exercises were demonstrated in the video?",
            options: ["2", "4", "6", "8"],
            correctAnswer: "6"
          },
          {
            question: "What is the primary focus of these exercises?",
            options: ["Muscle building", "Fat burning", "Flexibility", "Balance"],
            correctAnswer: "Fat burning"
          },
          {
            question: "How long should you do each exercise?",
            options: ["10 seconds", "30 seconds", "1 minute", "2 minutes"],
            correctAnswer: "30 seconds"
          }
        ]
      },
      {
        id: "weight-loss-2",
        name: "Level 2",
        description: "Intermediate Weight Loss Workout",
        isUnlocked: false,
        videoUrl: "https://www.youtube.com/embed/mZT86qHSM5c",
        avatarImage: "overweight-avatar.png",
        quiz: [
          {
            question: "What type of workout is this?",
            options: ["Yoga", "Pilates", "HIIT", "Strength Training"],
            correctAnswer: "HIIT"
          },
          {
            question: "What muscle groups does this workout target?",
            options: ["Just arms", "Just legs", "Core only", "Full body"],
            correctAnswer: "Full body"
          },
          {
            question: "Do you need equipment for this workout?",
            options: ["Yes, weights", "Yes, resistance bands", "Yes, a mat", "No equipment needed"],
            correctAnswer: "No equipment needed"
          }
        ]
      },
      {
        id: "weight-loss-3",
        name: "Level 3",
        description: "Advanced Weight Loss Routine",
        isUnlocked: false,
        videoUrl: "https://www.youtube.com/embed/d-KcXSg8wUU",
        avatarImage: "fit-avatar.png",
        quiz: [
          {
            question: "How many rounds of exercises are recommended?",
            options: ["1", "2", "3", "4"],
            correctAnswer: "3"
          },
          {
            question: "What is the rest time between exercises?",
            options: ["No rest", "15 seconds", "30 seconds", "1 minute"],
            correctAnswer: "15 seconds"
          },
          {
            question: "Which exercise targets the core the most?",
            options: ["Jumping jacks", "Burpees", "Mountain climbers", "Squats"],
            correctAnswer: "Mountain climbers"
          }
        ]
      }
    ]
  },
  {
    id: "meditation",
    name: "Meditation",
    description: "Calm your mind and reduce stress with guided meditation",
    color: "from-blue-400 to-purple-500",
    icon: "meditation",
    levels: [
      {
        id: "meditation-1",
        name: "Level 1",
        description: "Introduction to Meditation",
        isUnlocked: true,
        videoUrl: "https://www.youtube.com/embed/O-6f5wQXSu8",
        avatarImage: "beginner-meditation-avatar.png",
        quiz: [
          {
            question: "What is the recommended posture for meditation?",
            options: ["Lying down", "Standing", "Sitting with a straight back", "Any position"],
            correctAnswer: "Sitting with a straight back"
          },
          {
            question: "What should you focus on during basic meditation?",
            options: ["Your thoughts", "Your breath", "External sounds", "Your heartbeat"],
            correctAnswer: "Your breath"
          },
          {
            question: "How long was the guided meditation in the video?",
            options: ["5 minutes", "10 minutes", "15 minutes", "20 minutes"],
            correctAnswer: "10 minutes"
          }
        ]
      },
      {
        id: "meditation-2",
        name: "Level 2",
        description: "Mindfulness Meditation",
        isUnlocked: false,
        videoUrl: "https://www.youtube.com/embed/ZToicYcHIOU",
        avatarImage: "intermediate-meditation-avatar.png",
        quiz: [
          {
            question: "What is mindfulness meditation primarily about?",
            options: ["Sleeping better", "Being aware of the present moment", "Visualizing success", "Chanting mantras"],
            correctAnswer: "Being aware of the present moment"
          },
          {
            question: "What should you do when your mind wanders during meditation?",
            options: ["Give up and try again later", "Force yourself to focus", "Gently bring attention back to your breath", "Switch to a different technique"],
            correctAnswer: "Gently bring attention back to your breath"
          },
          {
            question: "How often should you practice meditation for best results?",
            options: ["Once a month", "Once a week", "Daily", "Only when stressed"],
            correctAnswer: "Daily"
          }
        ]
      },
      {
        id: "meditation-3",
        name: "Level 3",
        description: "Advanced Meditation Techniques",
        isUnlocked: false,
        videoUrl: "https://www.youtube.com/embed/wirV265ZYSw",
        avatarImage: "advanced-meditation-avatar.png",
        quiz: [
          {
            question: "What is the body scan technique used for?",
            options: ["Medical diagnosis", "Relaxing each part of the body", "Energizing the body", "Flexibility"],
            correctAnswer: "Relaxing each part of the body"
          },
          {
            question: "What is loving-kindness meditation focused on?",
            options: ["Self-love only", "Sending good wishes to others", "Romantic relationships", "Material success"],
            correctAnswer: "Sending good wishes to others"
          },
          {
            question: "What is a common challenge in advanced meditation?",
            options: ["Finding comfortable clothes", "Maintaining focus for longer periods", "Finding the right music", "Meditating with others"],
            correctAnswer: "Maintaining focus for longer periods"
          }
        ]
      }
    ]
  },
  {
    id: "weight-gain",
    name: "Weight Gain",
    description: "Build muscle and increase your strength",
    color: "from-green-400 to-blue-500",
    icon: "weight-gain",
    levels: [
      {
        id: "weight-gain-1",
        name: "Level 1",
        description: "Beginner's Muscle Building",
        isUnlocked: true,
        videoUrl: "https://www.youtube.com/embed/F46ZpTM8h7g",
        avatarImage: "skinny-avatar.png",
        quiz: [
          {
            question: "What exercise targets the chest muscles?",
            options: ["Squats", "Push-ups", "Lunges", "Crunches"],
            correctAnswer: "Push-ups"
          },
          {
            question: "How many reps are recommended for beginners?",
            options: ["5-8", "8-12", "15-20", "As many as possible"],
            correctAnswer: "8-12"
          },
          {
            question: "How many days per week should you train each muscle group?",
            options: ["Every day", "1-2 times", "2-3 times", "Once a week"],
            correctAnswer: "2-3 times"
          }
        ]
      },
      {
        id: "weight-gain-2",
        name: "Level 2",
        description: "Intermediate Strength Training",
        isUnlocked: false,
        videoUrl: "https://www.youtube.com/embed/8LJ3T5Wy5yg",
        avatarImage: "fit-avatar.png",
        quiz: [
          {
            question: "Which exercise is a compound movement?",
            options: ["Bicep curls", "Leg extensions", "Squats", "Calf raises"],
            correctAnswer: "Squats"
          },
          {
            question: "What is progressive overload?",
            options: ["Doing too many exercises", "Gradually increasing weight or reps", "Working out daily", "Training to failure"],
            correctAnswer: "Gradually increasing weight or reps"
          },
          {
            question: "What macronutrient is most important for muscle building?",
            options: ["Carbohydrates", "Fats", "Protein", "Fiber"],
            correctAnswer: "Protein"
          }
        ]
      },
      {
        id: "weight-gain-3",
        name: "Level 3",
        description: "Advanced Mass Building",
        isUnlocked: false,
        videoUrl: "https://www.youtube.com/embed/PYpLzUm9p1k",
        avatarImage: "muscular-avatar.png",
        quiz: [
          {
            question: "What is time under tension?",
            options: ["How long you're at the gym", "The total time your muscles are working during a set", "How long you rest between sets", "How long you've been working out"],
            correctAnswer: "The total time your muscles are working during a set"
          },
          {
            question: "What is a drop set?",
            options: ["Decreasing the weight during a set", "Dropping the weights on the floor", "Reducing your workout time", "Missing a workout"],
            correctAnswer: "Decreasing the weight during a set"
          },
          {
            question: "How much protein is typically recommended for muscle building (per pound of bodyweight)?",
            options: ["0.5g", "0.8-1g", "1.5-2g", "3g"],
            correctAnswer: "0.8-1g"
          }
        ]
      }
    ]
  },
  {
    id: "figure-management",
    name: "Figure Management",
    description: "Tone your body and improve your physique",
    color: "from-yellow-400 to-orange-500",
    icon: "activity",
    levels: [
      {
        id: "figure-management-1",
        name: "Level 1",
        description: "Body Toning Basics",
        isUnlocked: true,
        videoUrl: "https://www.youtube.com/embed/3Pr6n-nKfMA",
        avatarImage: "beginner-fitness-avatar.png",
        quiz: [
          {
            question: "What is body toning focused on?",
            options: ["Just losing weight", "Building huge muscles", "Defining muscles and improving shape", "Flexibility only"],
            correctAnswer: "Defining muscles and improving shape"
          },
          {
            question: "Which exercise helps tone the abdominal muscles?",
            options: ["Bicep curls", "Shoulder press", "Planks", "Tricep dips"],
            correctAnswer: "Planks"
          },
          {
            question: "How does body toning differ from bodybuilding?",
            options: ["It's the same thing", "Toning focuses on definition rather than size", "Toning is only for women", "Bodybuilding is easier"],
            correctAnswer: "Toning focuses on definition rather than size"
          }
        ]
      },
      {
        id: "figure-management-2",
        name: "Level 2",
        description: "Sculpting Your Physique",
        isUnlocked: false,
        videoUrl: "https://www.youtube.com/embed/7tRiB6g0Yas",
        avatarImage: "intermediate-fitness-avatar.png",
        quiz: [
          {
            question: "What is the recommended rep range for toning exercises?",
            options: ["1-5 reps", "8-12 reps", "12-15 reps", "20+ reps"],
            correctAnswer: "12-15 reps"
          },
          {
            question: "What type of cardio is best for maintaining muscle while toning?",
            options: ["High-intensity interval training (HIIT)", "Long distance running", "Walking", "Swimming"],
            correctAnswer: "High-intensity interval training (HIIT)"
          },
          {
            question: "Why is proper form important in toning exercises?",
            options: ["It looks better", "It targets the specific muscles better", "It makes the workout easier", "It doesn't matter"],
            correctAnswer: "It targets the specific muscles better"
          }
        ]
      },
      {
        id: "figure-management-3",
        name: "Level 3",
        description: "Advanced Body Sculpting",
        isUnlocked: false,
        videoUrl: "https://www.youtube.com/embed/QiuTvy5Yl3Q",
        avatarImage: "toned-fitness-avatar.png",
        quiz: [
          {
            question: "What is superset training?",
            options: ["Doing one exercise at a time", "Performing two exercises back-to-back with no rest", "Taking extra rest between sets", "Using heavy weights"],
            correctAnswer: "Performing two exercises back-to-back with no rest"
          },
          {
            question: "Why is protein timing important for body toning?",
            options: ["It isn't important", "It helps with muscle recovery and growth", "It helps you sleep better", "It makes workouts easier"],
            correctAnswer: "It helps with muscle recovery and growth"
          },
          {
            question: "What role does diet play in achieving a toned physique?",
            options: ["Diet isn't important", "Diet is somewhat important", "Diet is equally important as exercise", "Diet is more important than exercise"],
            correctAnswer: "Diet is equally important as exercise"
          }
        ]
      }
    ]
  },
  {
    id: "yoga",
    name: "Yoga",
    description: "Improve flexibility, strength and mental wellbeing",
    color: "from-pink-400 to-red-500",
    icon: "yoga",
    levels: [
      {
        id: "yoga-1",
        name: "Level 1",
        description: "Yoga for Beginners",
        isUnlocked: true,
        videoUrl: "https://www.youtube.com/embed/v7AYKMP6rOE",
        avatarImage: "beginner-yoga-avatar.png",
        quiz: [
          {
            question: "What is the name of the basic resting pose in yoga?",
            options: ["Warrior", "Child's pose", "Downward dog", "Tree pose"],
            correctAnswer: "Child's pose"
          },
          {
            question: "What should you focus on during yoga practice?",
            options: ["Speed of movements", "Competition with others", "Breath and alignment", "How far you can stretch"],
            correctAnswer: "Breath and alignment"
          },
          {
            question: "What is the purpose of Savasana (Corpse Pose)?",
            options: ["Warm up", "Cool down and integration", "Build strength", "Improve balance"],
            correctAnswer: "Cool down and integration"
          }
        ]
      },
      {
        id: "yoga-2",
        name: "Level 2",
        description: "Intermediate Yoga Flow",
        isUnlocked: false,
        videoUrl: "https://www.youtube.com/embed/9kOCY0KNByw",
        avatarImage: "intermediate-yoga-avatar.png",
        quiz: [
          {
            question: "What does 'vinyasa' mean in yoga?",
            options: ["Relaxation", "Breath synchronized movement", "Holding poses", "Meditation"],
            correctAnswer: "Breath synchronized movement"
          },
          {
            question: "What is the Sun Salutation sequence?",
            options: ["A warm-up routine", "A cool-down routine", "A type of yoga mat", "A breathing exercise"],
            correctAnswer: "A warm-up routine"
          },
          {
            question: "Which pose is known as 'Downward Facing Dog'?",
            options: ["Lying flat on your back", "Balancing on one leg", "An inverted V shape with hands and feet on the ground", "Sitting cross-legged"],
            correctAnswer: "An inverted V shape with hands and feet on the ground"
          }
        ]
      },
      {
        id: "yoga-3",
        name: "Level 3",
        description: "Advanced Yoga Practices",
        isUnlocked: false,
        videoUrl: "https://www.youtube.com/embed/Pppg_4AMIZI",
        avatarImage: "advanced-yoga-avatar.png",
        quiz: [
          {
            question: "What is an inversion in yoga?",
            options: ["A twisting pose", "A pose where your heart is higher than your head", "A pose performed on one leg", "A pose lying down"],
            correctAnswer: "A pose where your heart is higher than your head"
          },
          {
            question: "What is important when attempting advanced yoga poses?",
            options: ["Pushing through pain", "Having a strong foundation in basic poses", "Comparing yourself to others", "Doing it without instruction"],
            correctAnswer: "Having a strong foundation in basic poses"
          },
          {
            question: "What is a common advanced yoga breathing technique?",
            options: ["Normal breathing", "Mouth breathing", "Ujjayi breath", "Holding your breath"],
            correctAnswer: "Ujjayi breath"
          }
        ]
      }
    ]
  }
];

// Fake consultants data
export const consultants = [
  {
    id: "c1",
    name: "Dr. Sarah Johnson",
    specialty: "Nutrition & Weight Management",
    experience: "12 years",
    rating: 4.9,
    image: "consultant-1.png",
    bio: "Dr. Johnson specializes in creating personalized nutrition plans that work with your lifestyle. She has helped thousands of clients achieve sustainable weight loss and improved health."
  },
  {
    id: "c2",
    name: "Michael Chen",
    specialty: "Strength & Conditioning",
    experience: "8 years",
    rating: 4.8,
    image: "consultant-2.png",
    bio: "Former professional athlete turned fitness consultant, Michael excels at designing strength programs for all levels. His holistic approach combines traditional and modern training methods."
  },
  {
    id: "c3",
    name: "Aisha Patel",
    specialty: "Yoga & Meditation",
    experience: "15 years",
    rating: 4.9,
    image: "consultant-3.png",
    bio: "Aisha is a certified yoga instructor and mindfulness coach who helps clients reduce stress and improve mental clarity through ancient practices adapted for modern life."
  },
  {
    id: "c4",
    name: "Robert Garcia",
    specialty: "Physical Therapy & Rehabilitation",
    experience: "10 years",
    rating: 4.7,
    image: "consultant-4.png",
    bio: "Robert specializes in helping clients recover from injuries and manage chronic conditions through targeted exercise and movement therapy."
  }
];

interface FitnessContextType {
  categories: typeof fitnessCategories;
  consultants: typeof consultants;
  currentCategory: string | null;
  setCurrentCategory: (id: string | null) => void;
  completedLevels: string[];
  completeLevel: (levelId: string) => void;
  canAccessLevel: (categoryId: string, levelIndex: number) => boolean;
  resetDailyProgress: () => void;
  todaysProgress: {
    categoryId: string | null;
    levelId: string | null;
    completed: boolean;
  };
}

const FitnessContext = createContext<FitnessContextType | null>(null);

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error("useFitness must be used within a FitnessProvider");
  }
  return context;
};

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, updateStreak } = useAuth();
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const [todaysProgress, setTodaysProgress] = useState<{
    categoryId: string | null;
    levelId: string | null;
    completed: boolean;
  }>({
    categoryId: null,
    levelId: null,
    completed: false,
  });

  // Load completed levels from localStorage on initial render
  useEffect(() => {
    if (user) {
      const storedLevels = localStorage.getItem(`fitverse-completed-levels-${user.id}`);
      if (storedLevels) {
        setCompletedLevels(JSON.parse(storedLevels));
      } else {
        // Important: Initialize with empty array for new users
        setCompletedLevels([]);
      }
      
      const storedProgress = localStorage.getItem(`fitverse-today-progress-${user.id}`);
      if (storedProgress) {
        setTodaysProgress(JSON.parse(storedProgress));
      } else {
        // Important: Initialize with empty progress for new users
        setTodaysProgress({
          categoryId: null,
          levelId: null,
          completed: false
        });
      }
    } else {
      // When no user is logged in, reset the states
      setCompletedLevels([]);
      setTodaysProgress({
        categoryId: null,
        levelId: null,
        completed: false
      });
    }
  }, [user]);

  // Save completed levels to localStorage when they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`fitverse-completed-levels-${user.id}`, JSON.stringify(completedLevels));
    }
  }, [completedLevels, user]);
  
  // Save today's progress to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`fitverse-today-progress-${user.id}`, JSON.stringify(todaysProgress));
    }
  }, [todaysProgress, user]);

  // Check if a new day has started and reset progress if needed
  useEffect(() => {
    const checkAndResetDailyProgress = () => {
      if (!user) return;
      
      const lastResetDay = localStorage.getItem(`fitverse-last-reset-day-${user.id}`);
      const today = new Date().toISOString().split('T')[0];
      
      if (lastResetDay !== today) {
        // It's a new day, reset the daily progress
        setTodaysProgress({
          categoryId: null,
          levelId: null,
          completed: false,
        });
        localStorage.setItem(`fitverse-last-reset-day-${user.id}`, today);
      }
    };
    
    checkAndResetDailyProgress();
    
    // Set up a timer to check periodically (e.g., every hour)
    const intervalId = setInterval(checkAndResetDailyProgress, 60 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [user]);

  const completeLevel = (levelId: string) => {
    if (!user) return;
    
    // Find the category that contains this level
    const category = fitnessCategories.find(cat => 
      cat.levels.some(level => level.id === levelId)
    );
    
    if (!category) return;
    
    // Update completed levels if not already completed
    if (!completedLevels.includes(levelId)) {
      setCompletedLevels([...completedLevels, levelId]);
    }
    
    // Update today's progress
    setTodaysProgress({
      categoryId: category.id,
      levelId: levelId,
      completed: true
    });
    
    // Update user streak
    updateStreak();
  };

  const canAccessLevel = (categoryId: string, levelIndex: number) => {
    // First level is always accessible
    if (levelIndex === 0) return true;
    
    // If we've already completed a level in another category today,
    // don't allow access to any new levels
    if (todaysProgress.completed && todaysProgress.categoryId !== categoryId) {
      return false;
    }
    
    // If level is already completed, always allow access
    const category = fitnessCategories.find(cat => cat.id === categoryId);
    if (!category) return false;
    
    const levelId = category.levels[levelIndex].id;
    if (completedLevels.includes(levelId)) return true;
    
    // Check if previous level in same category is completed
    const prevLevelId = category.levels[levelIndex - 1].id;
    return completedLevels.includes(prevLevelId);
  };

  const resetDailyProgress = () => {
    if (!user) return;
    
    setTodaysProgress({
      categoryId: null,
      levelId: null,
      completed: false
    });
  };

  const value = {
    categories: fitnessCategories,
    consultants,
    currentCategory,
    setCurrentCategory,
    completedLevels,
    completeLevel,
    canAccessLevel,
    resetDailyProgress,
    todaysProgress
  };

  return <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>;
};
