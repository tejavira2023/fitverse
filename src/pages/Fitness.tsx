
import React from "react";
import { motion } from "framer-motion";
import { useFitness } from "@/contexts/FitnessContext";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MotionCard = motion(Card);

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
        <Link to="/">
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <MotionCard
            key={category.id}
            className="relative overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => handleCategorySelect(category.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className={`absolute inset-0 ${category.color} opacity-90`} />
            <CardContent className="relative z-10 p-8">
              <h2 className="text-2xl font-bold text-white mb-3">{category.name}</h2>
              <p className="text-white/90 text-lg">{category.description}</p>
              <div className="absolute bottom-4 right-4">
                <Button 
                  variant="secondary" 
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  Get Started
                </Button>
              </div>
            </CardContent>
          </MotionCard>
        ))}
      </div>
      
      <motion.div
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
      </motion.div>
    </div>
  );
};

export default Fitness;

