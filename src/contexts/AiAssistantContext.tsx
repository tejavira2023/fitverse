
import React, { createContext, useContext, useState, useRef } from "react";
import { useAuth } from "./AuthContext";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AiAssistantContextType {
  messages: Message[];
  isProcessing: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  isOpen: boolean;
  toggleAssistant: () => void;
  closeAssistant: () => void;
  openAssistant: () => void;
}

// Sample diet plans and exercise recommendations
const dietPlans = {
  "weight-loss": [
    "**Breakfast:** Greek yogurt with berries and a sprinkle of chia seeds",
    "**Lunch:** Grilled chicken salad with mixed vegetables and olive oil dressing",
    "**Dinner:** Baked salmon with steamed broccoli and quinoa",
    "**Snacks:** Apple slices with a small handful of almonds, carrot sticks with hummus",
    "**Hydration:** Aim for at least 8 glasses of water daily, green tea is also excellent"
  ],
  "weight-gain": [
    "**Breakfast:** Oatmeal with banana, peanut butter, and protein powder",
    "**Lunch:** Brown rice with grilled beef and mixed vegetables",
    "**Dinner:** Whole grain pasta with ground turkey meatballs and tomato sauce",
    "**Snacks:** Protein shake with milk and banana, Greek yogurt with honey and granola",
    "**Hydration:** Aim for at least 8 glasses of water daily, consider adding smoothies"
  ],
  "figure-management": [
    "**Breakfast:** Egg white omelet with spinach and whole grain toast",
    "**Lunch:** Tuna salad with mixed greens and light vinaigrette",
    "**Dinner:** Grilled chicken breast with sweet potato and steamed vegetables",
    "**Snacks:** Cottage cheese with fruit, protein bar",
    "**Hydration:** Aim for at least 8 glasses of water daily, limit sugary drinks"
  ],
  "yoga": [
    "**Breakfast:** Overnight oats with fruit and nuts",
    "**Lunch:** Quinoa bowl with roasted vegetables and avocado",
    "**Dinner:** Vegetable stir-fry with tofu and brown rice",
    "**Snacks:** Fresh fruit, nuts, or seeds",
    "**Hydration:** Aim for at least 8 glasses of water daily, herbal teas are also beneficial"
  ],
  "meditation": [
    "**Breakfast:** Smoothie with spinach, banana, and plant-based protein",
    "**Lunch:** Buddha bowl with chickpeas, vegetables, and tahini dressing",
    "**Dinner:** Vegetable soup with whole grain bread",
    "**Snacks:** Mixed berries, dark chocolate (70% or higher)",
    "**Hydration:** Aim for at least 8 glasses of water daily, calming herbal teas"
  ]
};

const exerciseRecommendations = {
  "weight-loss": [
    "30-45 minutes of cardio (running, cycling, or swimming) 4-5 times a week",
    "High-intensity interval training (HIIT) 2-3 times a week",
    "Full-body strength training 2-3 times a week",
    "Regular stretching or yoga for recovery",
    "Try to get 7,000-10,000 steps daily"
  ],
  "weight-gain": [
    "Progressive overload strength training 4-5 times a week",
    "Focus on compound movements: squats, deadlifts, bench press",
    "Limit cardio to 1-2 short sessions weekly",
    "Ensure proper rest between workouts (48 hours for each muscle group)",
    "Prioritize recovery with 7-9 hours of sleep"
  ],
  "figure-management": [
    "Combination of strength training and moderate cardio",
    "Body-part split routines focusing on problem areas",
    "Incorporate resistance bands and bodyweight exercises",
    "Pilates or barre classes for muscle toning",
    "Consistent routine of 4-5 workouts per week"
  ],
  "yoga": [
    "Daily yoga practice of at least 20-30 minutes",
    "Mix of vinyasa flow and restorative practices",
    "Light cardio like walking or swimming 2-3 times a week",
    "Balance poses to improve stability",
    "Deep stretching routines for flexibility"
  ],
  "meditation": [
    "Daily meditation practice (start with 5-10 minutes and build up)",
    "Gentle yoga or tai chi for mind-body connection",
    "Walking meditation in nature",
    "Light to moderate exercise like swimming or walking",
    "Breathing exercises throughout the day"
  ]
};

const AiAssistantContext = createContext<AiAssistantContextType | null>(null);

export const useAiAssistant = () => {
  const context = useContext(AiAssistantContext);
  if (!context) {
    throw new Error("useAiAssistant must be used within an AiAssistantProvider");
  }
  return context;
};

export const AiAssistantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I'm your FitVerse AI assistant. I can help you with diet plans, exercise recommendations, and fitness advice. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Generate a response based on user message
  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Check if message contains diet-related keywords
    if (lowerCaseMessage.includes("diet") || 
        lowerCaseMessage.includes("eat") || 
        lowerCaseMessage.includes("food") || 
        lowerCaseMessage.includes("meal") || 
        lowerCaseMessage.includes("nutrition")) {
      
      // Determine which diet plan to recommend based on user profile or message content
      let dietType = "weight-loss";
      if (user?.goal?.toLowerCase().includes("gain")) {
        dietType = "weight-gain";
      } else if (user?.goal?.toLowerCase().includes("tone") || 
                user?.goal?.toLowerCase().includes("shape") || 
                user?.goal?.toLowerCase().includes("figure")) {
        dietType = "figure-management";
      } else if (lowerCaseMessage.includes("yoga") || 
                user?.goal?.toLowerCase().includes("yoga")) {
        dietType = "yoga";
      } else if (lowerCaseMessage.includes("meditation") ||
                lowerCaseMessage.includes("stress") ||
                lowerCaseMessage.includes("relax") ||
                user?.goal?.toLowerCase().includes("meditation")) {
        dietType = "meditation";
      }
      
      return `Here's a personalized diet plan that might help you achieve your goals:\n\n${dietPlans[dietType as keyof typeof dietPlans].join("\n\n")}\n\nWould you like me to customize this further based on any dietary restrictions?`;
    }
    
    // Check if message contains exercise-related keywords
    if (lowerCaseMessage.includes("exercise") ||
        lowerCaseMessage.includes("workout") ||
        lowerCaseMessage.includes("training") ||
        lowerCaseMessage.includes("routine") ||
        lowerCaseMessage.includes("activity")) {
      
      // Determine which exercise plan to recommend based on user profile or message content
      let exerciseType = "weight-loss";
      if (user?.goal?.toLowerCase().includes("gain")) {
        exerciseType = "weight-gain";
      } else if (user?.goal?.toLowerCase().includes("tone") || 
                user?.goal?.toLowerCase().includes("shape") || 
                user?.goal?.toLowerCase().includes("figure")) {
        exerciseType = "figure-management";
      } else if (lowerCaseMessage.includes("yoga") || 
                user?.goal?.toLowerCase().includes("yoga")) {
        exerciseType = "yoga";
      } else if (lowerCaseMessage.includes("meditation") ||
                lowerCaseMessage.includes("stress") ||
                lowerCaseMessage.includes("relax") ||
                user?.goal?.toLowerCase().includes("meditation")) {
        exerciseType = "meditation";
      }
      
      return `Based on your goals, here are some exercise recommendations:\n\n${exerciseRecommendations[exerciseType as keyof typeof exerciseRecommendations].join("\n\n")}\n\nWould you like more specific guidance on any of these exercises?`;
    }
    
    // Check if message is asking about progress or goals
    if (lowerCaseMessage.includes("progress") ||
        lowerCaseMessage.includes("goal") ||
        lowerCaseMessage.includes("target") ||
        lowerCaseMessage.includes("achieve")) {
      
      return "Tracking your progress is crucial for staying motivated! Here are some tips:\n\n1. Take weekly measurements and photos\n2. Keep a workout journal\n3. Use the streak feature in our app to maintain consistency\n4. Set small, achievable goals along the way\n5. Celebrate your victories, no matter how small\n\nRemember that progress isn't always linear. Focus on consistency and the habits you're building rather than just the end result.";
    }
    
    // Generic responses for other queries
    const genericResponses = [
      "I'm here to support your fitness journey! What specific help do you need with your workout or nutrition plan?",
      "Your dedication to fitness is inspiring! How can I help you optimize your routine today?",
      "Health is a journey, not a destination. What aspect of your wellness routine would you like to discuss?",
      "Let me know if you need help with exercise techniques, meal planning, or motivation strategies!",
      "Every step counts on your fitness journey. How can I help you take the next one?"
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isProcessing) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      // Generate AI response
      const responseContent = await generateResponse(content);
      
      // Add AI response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hi there! I'm your FitVerse AI assistant. I can help you with diet plans, exercise recommendations, and fitness advice. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  const toggleAssistant = () => {
    setIsOpen(prev => !prev);
  };

  const closeAssistant = () => {
    setIsOpen(false);
  };

  const openAssistant = () => {
    setIsOpen(true);
  };

  const value = {
    messages,
    isProcessing,
    sendMessage,
    clearMessages,
    isOpen,
    toggleAssistant,
    closeAssistant,
    openAssistant
  };

  return <AiAssistantContext.Provider value={value}>{children}</AiAssistantContext.Provider>;
};
