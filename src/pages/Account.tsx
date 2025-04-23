
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { User, Save, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// We'll simulate importing framer-motion
const MotionDiv = motion.div;

const Account = () => {
  const { user, updateUserProfile, logout } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age || "",
    gender: user?.gender || "",
    weight: user?.weight || "",
    height: user?.height || "",
    goal: user?.goal || "",
    fitnessLevel: user?.fitnessLevel || "",
    healthIssues: user?.healthIssues || ""
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
        age: formData.age ? parseInt(formData.age as string, 10) : undefined,
        weight: formData.weight ? parseFloat(formData.weight as string) : undefined,
        height: formData.height ? parseFloat(formData.height as string) : undefined
      };
      
      updateUserProfile(updatedData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Account</h1>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleLogout}
        >
          <LogOut className="size-5" />
        </Button>
      </div>
      
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your account details and preferences</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="size-10 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold">{user?.name || "User"}</h2>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email} 
                    disabled 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    min="1" 
                    max="120" 
                    value={formData.age} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    value={formData.gender as string} 
                    onValueChange={(value) => handleSelectChange("gender", value)}
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
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    min="1" 
                    step="0.1" 
                    value={formData.weight} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    min="1" 
                    step="0.1" 
                    value={formData.height} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal">Fitness Goal</Label>
                <Select 
                  value={formData.goal as string} 
                  onValueChange={(value) => handleSelectChange("goal", value)}
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
                <Label htmlFor="fitnessLevel">Current Fitness Level</Label>
                <Select 
                  value={formData.fitnessLevel as string} 
                  onValueChange={(value) => handleSelectChange("fitnessLevel", value)}
                >
                  <SelectTrigger id="fitnessLevel">
                    <SelectValue placeholder="Select your fitness level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="healthIssues">Health Concerns or Issues</Label>
                <Textarea 
                  id="healthIssues" 
                  placeholder="List any health issues or concerns that might affect your fitness journey..." 
                  value={formData.healthIssues as string} 
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  "Updating..."
                ) : (
                  <>
                    <Save className="size-4 mr-2" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </MotionDiv>
    </div>
  );
};

export default Account;
