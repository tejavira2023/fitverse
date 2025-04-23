
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { User, ArrowRight, Activity, Weight, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// We'll simulate importing framer-motion
const MotionDiv = motion.div;

const AccountSetup = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    goal: "",
    fitnessLevel: "",
    healthIssues: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const updatedData = {
        ...formData,
        age: formData.age ? parseInt(formData.age, 10) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        height: formData.height ? parseFloat(formData.height) : undefined
      };
      
      updateUserProfile(updatedData);
      toast.success("Profile setup complete!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to set up profile");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container min-h-screen py-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Complete Your Profile
          </h1>
          <p className="text-xl text-muted-foreground">
            Help us personalize your fitness journey
          </p>
        </MotionDiv>
        
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Tell us a bit about yourself to help us personalize your experience
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="size-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{user?.name || "User"}</h2>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <div className="relative">
                      <Input 
                        id="age" 
                        type="number" 
                        min="1" 
                        max="120" 
                        value={formData.age} 
                        onChange={handleChange} 
                        placeholder="Enter your age"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={formData.gender} 
                      onValueChange={(value) => handleSelectChange("gender", value)}
                      required
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <div className="relative">
                      <Weight className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input 
                        id="weight" 
                        type="number" 
                        min="1" 
                        step="0.1" 
                        value={formData.weight} 
                        onChange={handleChange} 
                        placeholder="Enter your weight"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input 
                        id="height" 
                        type="number" 
                        min="1" 
                        step="0.1" 
                        value={formData.height} 
                        onChange={handleChange} 
                        placeholder="Enter your height"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goal">What is your primary fitness goal?</Label>
                  <Select 
                    value={formData.goal} 
                    onValueChange={(value) => handleSelectChange("goal", value)}
                    required
                  >
                    <SelectTrigger id="goal">
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight-loss">Lose Weight</SelectItem>
                      <SelectItem value="weight-gain">Gain Weight</SelectItem>
                      <SelectItem value="build-muscle">Build Muscle</SelectItem>
                      <SelectItem value="improve-flexibility">Improve Flexibility</SelectItem>
                      <SelectItem value="reduce-stress">Reduce Stress</SelectItem>
                      <SelectItem value="general-fitness">Improve General Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fitnessLevel">What is your current fitness level?</Label>
                  <Select 
                    value={formData.fitnessLevel} 
                    onValueChange={(value) => handleSelectChange("fitnessLevel", value)}
                    required
                  >
                    <SelectTrigger id="fitnessLevel">
                      <SelectValue placeholder="Select your fitness level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner - New to fitness</SelectItem>
                      <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                      <SelectItem value="advanced">Advanced - Very experienced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="healthIssues">
                    Do you have any health issues or concerns we should know about?
                  </Label>
                  <Textarea 
                    id="healthIssues" 
                    placeholder="E.g., back problems, joint pain, heart conditions, etc. (Leave blank if none)" 
                    value={formData.healthIssues} 
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full gradient-bg" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Setting Up..."
                  ) : (
                    <>
                      Complete Setup <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </MotionDiv>
      </div>
    </div>
  );
};

export default AccountSetup;
