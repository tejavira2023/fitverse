
import React from "react";
import { motion } from "framer-motion";
import { useFitness } from "@/contexts/FitnessContext";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// We'll simulate importing framer-motion
const MotionDiv = motion.div;
const MotionCard = motion.div;

const Fitness = () => {
  const { categories, setCurrentCategory } = useFitness();
  const navigate = useNavigate();
  
  const handleCategorySelect = (categoryId: string) => {
    setCurrentCategory(categoryId);
    navigate(`/fitness/${categoryId}`);
  };
  
  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-2">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
          >
            <ArrowLeft className="size-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Fitness Programs</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <MotionCard
            key={category.id}
            className={`fitness-card ${category.color} text-white cursor-pointer`}
            onClick={() => handleCategorySelect(category.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="relative z-10 text-center p-6">
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p className="text-white/80">{category.description}</p>
            </div>
          </MotionCard>
        ))}
      </div>
      
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Daily Challenge</h3>
            <p className="text-sm text-muted-foreground">
              Complete one level each day to maintain your streak and earn rewards. 
              Each category has different levels to progress through.
            </p>
          </CardContent>
        </Card>
      </MotionDiv>
    </div>
  );
};

export default Fitness;
