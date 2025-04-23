
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useFitness } from "@/contexts/FitnessContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Lock, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// We'll simulate importing framer-motion
const MotionDiv = motion.div;

const FitnessCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { categories, setCurrentCategory, canAccessLevel, completedLevels, todaysProgress } = useFitness();
  const navigate = useNavigate();
  
  const category = categories.find((cat) => cat.id === categoryId);
  
  useEffect(() => {
    if (categoryId) {
      setCurrentCategory(categoryId);
    }
    
    if (!category) {
      navigate("/fitness");
    }
  }, [categoryId, category, setCurrentCategory, navigate]);
  
  if (!category) {
    return null;
  }
  
  const handleLevelSelect = (levelIndex: number) => {
    if (canAccessLevel(category.id, levelIndex)) {
      navigate(`/fitness/${categoryId}/level/${levelIndex + 1}`);
    }
  };

  return (
    <div className="py-6 space-y-8">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          as={Link}
          to="/fitness"
          className="mr-2"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <h1 className="text-3xl font-bold">{category.name}</h1>
      </div>
      
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-muted-foreground mb-6"
      >
        <p>{category.description}</p>
        
        {todaysProgress.completed && todaysProgress.categoryId !== category.id && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700">
            <p className="text-sm font-medium">
              You've already completed a level in another category today.
              Come back tomorrow to progress in this category!
            </p>
          </div>
        )}
      </MotionDiv>
      
      <div className="relative">
        {/* Journey Path */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 -z-10 rounded-full"></div>
        
        {/* Level Nodes */}
        <div className="flex justify-between items-center">
          {category.levels.map((level, index) => {
            const isCompleted = completedLevels.includes(level.id);
            const isUnlocked = canAccessLevel(category.id, index);
            
            return (
              <MotionDiv
                key={level.id}
                className={`level-node ${
                  isCompleted
                    ? "level-node-completed"
                    : isUnlocked
                    ? "level-node-unlocked"
                    : "level-node-locked"
                }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                onClick={() => handleLevelSelect(index)}
                whileHover={isUnlocked ? { scale: 1.1 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
              >
                {isCompleted ? (
                  <Check className="size-6 text-white" />
                ) : isUnlocked ? (
                  <div className="flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{index + 1}</span>
                  </div>
                ) : (
                  <Lock className="size-5 text-white/70" />
                )}
                
                {/* Level stars - animation for completed levels */}
                {isCompleted && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex">
                    {[...Array(3)].map((_, i) => (
                      <MotionDiv
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.2 }}
                      >
                        <Star className="size-5 fill-yellow-400 text-yellow-400" />
                      </MotionDiv>
                    ))}
                  </div>
                )}
                
                {/* Level name */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 text-center">
                  <span className="text-xs font-medium">
                    {level.name}
                  </span>
                </div>
              </MotionDiv>
            );
          })}
        </div>
      </div>
      
      {/* Level descriptions */}
      <div className="space-y-4 mt-10">
        {category.levels.map((level, index) => {
          const isUnlocked = canAccessLevel(category.id, index);
          const isCompleted = completedLevels.includes(level.id);
          
          return (
            <MotionDiv
              key={level.id}
              className={`p-4 rounded-lg ${
                isCompleted
                  ? "bg-green-50 border border-green-200" 
                  : isUnlocked
                  ? "bg-white border border-primary/20 shadow-sm"
                  : "bg-gray-50 border border-gray-200"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    {level.name}
                    {isCompleted && <Check className="size-4 text-green-500" />}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {level.description}
                  </p>
                </div>
                {isUnlocked ? (
                  <Button
                    size="sm"
                    variant={isCompleted ? "outline" : "default"}
                    onClick={() => handleLevelSelect(index)}
                  >
                    {isCompleted ? "Review" : "Start"}
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" disabled>
                    <Lock className="size-4 mr-1" /> Locked
                  </Button>
                )}
              </div>
            </MotionDiv>
          );
        })}
      </div>
    </div>
  );
};

export default FitnessCategory;
