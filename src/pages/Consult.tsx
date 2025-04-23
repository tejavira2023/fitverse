
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFitness } from "@/contexts/FitnessContext";
import { Clock, Calendar, MessageSquare, Star, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// We'll simulate importing framer-motion
const MotionDiv = motion.div;
const MotionCard = motion(Card);

const Consult = () => {
  const { consultants } = useFitness();
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [consultationDetails, setConsultationDetails] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  
  const handleBook = () => {
    if (!consultationDetails || !selectedDate || !selectedTime) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setShowBookingSuccess(true);
    
    // Reset form
    setConsultationDetails("");
    setSelectedDate("");
    setSelectedTime("");
  };
  
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Consult with Experts</h1>
      
      <div className="space-y-6">
        {consultants.map((consultant, index) => (
          <MotionCard
            key={consultant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="overflow-hidden border-2 hover:border-primary transition-all duration-200"
          >
            <CardContent className="p-0">
              <div className="flex items-start p-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4 shrink-0">
                  <span className="text-xl font-bold text-primary">
                    {consultant.name.split(' ').map(name => name[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{consultant.name}</h2>
                  <p className="text-sm text-muted-foreground mb-2">{consultant.specialty}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span>{consultant.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{consultant.experience} experience</span>
                  </div>
                </div>
              </div>
              
              <div className="px-4 pb-4">
                <p className="text-sm text-muted-foreground">{consultant.bio}</p>
              </div>
              
              <div className="border-t p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedConsultant(consultant)}
                    >
                      Schedule Session
                      <ChevronRight className="ml-2 size-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Book a Consultation</DialogTitle>
                      <DialogDescription>
                        Tell us about your concerns and what you'd like to discuss with {selectedConsultant?.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="details">Details</Label>
                        <Textarea
                          id="details"
                          placeholder="Describe your fitness goals, concerns, or questions..."
                          value={consultationDetails}
                          onChange={(e) => setConsultationDetails(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 size-4 text-muted-foreground" />
                            <Input
                              id="date"
                              type="date"
                              className="pl-10"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                            <Input
                              id="time"
                              type="time"
                              className="pl-10"
                              value={selectedTime}
                              onChange={(e) => setSelectedTime(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleBook} className="w-full">
                        Book Session
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                {/* Success Dialog */}
                <Dialog open={showBookingSuccess} onOpenChange={setShowBookingSuccess}>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Booking Confirmed!</DialogTitle>
                      <DialogDescription>
                        Your consultation has been scheduled successfully.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                      <div className="flex flex-col items-center justify-center">
                        <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <MessageSquare className="size-8 text-green-600" />
                        </div>
                        <p className="text-center text-sm text-muted-foreground">
                          You will receive a notification before your session with {selectedConsultant?.name} on {selectedDate} at {selectedTime}.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={() => setShowBookingSuccess(false)}
                        className="w-full"
                      >
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </MotionCard>
        ))}
      </div>
    </div>
  );
};

export default Consult;
