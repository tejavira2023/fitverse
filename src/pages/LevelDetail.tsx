
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFitness } from "@/contexts/FitnessContext";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Check, Award, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ConfettiEffect } from "@/components/ConfettiEffect";

// We'll simulate importing framer-motion
const MotionDiv = motion.div;

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

const LevelDetail = () => {
  const { categoryId, levelNum } = useParams<{ categoryId: string; levelNum: string }>();
  const { categories, completeLevel } = useFitness();
  const { addCoins } = useAuth();
  const navigate = useNavigate();

  const [videoCompleted, setVideoCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const category = categories.find((cat) => cat.id === categoryId);
  const levelIndex = levelNum ? parseInt(levelNum) - 1 : 0;
  const level = category?.levels[levelIndex];

  useEffect(() => {
    if (!category || !level) {
      navigate("/fitness");
    }
  }, [category, level, navigate]);

  if (!category || !level) {
    return null;
  }

  const handleVideoEnd = () => {
    setVideoCompleted(true);
    setShowQuiz(true);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuizQuestion = level.quiz[currentQuestion];
    const isCorrect = selectedAnswer === currentQuizQuestion.correctAnswer;

    setIsAnswerSubmitted(true);
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
    }

    // Proceed to next question after a delay
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);

      if (currentQuestion < level.quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
        completeLevel(level.id);
        addCoins(5); // Add 5 coins for completing the level
        setShowConfetti(true);
      }
    }, 1500);
  };

  return (
    <div className="py-6 space-y-6">
      {showConfetti && <ConfettiEffect />}
      
      <div className="flex items-center mb-6">
        <Link to={`/fitness/${categoryId}`} className="mr-2">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
          >
            <ArrowLeft className="size-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{level.name}</h1>
          <p className="text-sm text-muted-foreground">{category.name}</p>
        </div>
      </div>

      {!quizCompleted ? (
        <>
          {!showQuiz ? (
            <div className="space-y-4">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-black flex items-center justify-center"
              >
                <iframe
                  title={level.name}
                  width="100%"
                  height="100%"
                  src={`${level.videoUrl}?autoplay=1&enablejsapi=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onEnded={handleVideoEnd}
                ></iframe>
              </MotionDiv>

              <Button 
                onClick={handleVideoEnd} 
                className="w-full"
                variant="outline"
              >
                I've completed watching the video
              </Button>
            </div>
          ) : (
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-center">
                    Quiz ({currentQuestion + 1}/{level.quiz.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-lg font-medium mb-4">
                    {level.quiz[currentQuestion].question}
                  </p>
                  <RadioGroup 
                    value={selectedAnswer || ""} 
                    onValueChange={handleAnswerSelect}
                    className="space-y-3"
                  >
                    {level.quiz[currentQuestion].options.map((option) => (
                      <div key={option} className={`
                        flex items-center space-x-2 p-3 rounded-lg border-2 
                        ${isAnswerSubmitted 
                          ? option === level.quiz[currentQuestion].correctAnswer
                            ? "border-green-500 bg-green-50"
                            : selectedAnswer === option
                              ? "border-red-500 bg-red-50" 
                              : "border-transparent"
                          : "border-gray-200 hover:border-primary"
                        }
                      `}>
                        <RadioGroupItem 
                          value={option} 
                          id={option} 
                          disabled={isAnswerSubmitted}
                        />
                        <Label htmlFor={option} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                        {isAnswerSubmitted && option === level.quiz[currentQuestion].correctAnswer && (
                          <Check className="size-5 text-green-500" />
                        )}
                        {isAnswerSubmitted && selectedAnswer === option && option !== level.quiz[currentQuestion].correctAnswer && (
                          <X className="size-5 text-red-500" />
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer || isAnswerSubmitted}
                    className="w-full"
                  >
                    Submit Answer
                  </Button>
                </CardFooter>
              </Card>
            </MotionDiv>
          )}
        </>
      ) : (
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Card className="border-2 border-primary">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-center">Level Completed!</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex flex-col items-center justify-center">
                <Award className="size-16 text-yellow-400" />
                <h2 className="text-2xl font-bold mt-4">Congratulations!</h2>
                <p className="text-muted-foreground">
                  You've earned 5 coins and completed this level!
                </p>
              </div>
              
              <div className="flex gap-4 justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{score}</div>
                  <div className="text-xs text-muted-foreground">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">5</div>
                  <div className="text-xs text-muted-foreground">Coins Earned</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button 
                onClick={() => navigate(`/fitness/${categoryId}`)}
                className="w-full gradient-bg"
              >
                Continue Journey
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setShowQuiz(false);
                  setCurrentQuestion(0);
                  setSelectedAnswer(null);
                  setIsAnswerSubmitted(false);
                  setScore(0);
                  setQuizCompleted(false);
                }}
              >
                Watch Video Again
              </Button>
            </CardFooter>
          </Card>
        </MotionDiv>
      )}
    </div>
  );
};

export default LevelDetail;
