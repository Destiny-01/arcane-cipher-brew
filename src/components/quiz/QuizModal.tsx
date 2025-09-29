import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, Sparkles, ChevronRight } from 'lucide-react';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useProgress } from '@/hooks/useProgress';
import cauldronIcon from '@/assets/cauldron-icon.png';

interface Question {
  id: number;
  type: 'mcq' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: number | boolean | string;
  explanation: string;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionId: number;
  questions: Question[];
}

export const QuizModal = ({ isOpen, onClose, sectionId, questions }: QuizModalProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | number | boolean | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const { recordQuizAttempt, completeSection } = useProgress();

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setAnswers(Array(questions.length).fill(null));
      setShowFeedback(false);
      setQuizComplete(false);
      setScore(0);
    }
  }, [isOpen, questions.length]);

  const handleAnswerSubmit = () => {
    const userAnswer = answers[currentQuestionIndex];
    let correct = false;

    if (currentQuestion.type === 'mcq') {
      correct = userAnswer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'true-false') {
      correct = userAnswer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'fill-blank') {
      correct = 
        String(userAnswer).toLowerCase().trim() === 
        String(currentQuestion.correctAnswer).toLowerCase().trim();
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const newScore = score + 1;
      setScore(newScore);

      // If last question and all correct, complete the quiz
      if (currentQuestionIndex === questions.length - 1) {
        if (newScore === questions.length) {
          setQuizComplete(true);
          recordQuizAttempt(sectionId, 100);
          completeSection(sectionId);
        }
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
    } else {
      // Check if all answers are correct
      if (score === questions.length) {
        setQuizComplete(true);
      } else {
        // Retry quiz
        setCurrentQuestionIndex(0);
        setAnswers(Array(questions.length).fill(null));
        setShowFeedback(false);
        setScore(0);
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers(Array(questions.length).fill(null));
    setShowFeedback(false);
    setQuizComplete(false);
    setScore(0);
  };

  const handleMCQAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleTrueFalseAnswer = (value: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleFillBlankAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-lg"
      >
        {quizComplete && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
          />
        )}

        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto bg-card rounded-xl border-2 border-primary/30 shadow-glow-purple"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10"
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="p-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.img
                src={cauldronIcon}
                alt="Cauldron"
                className="w-16 h-16"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h2 className="text-3xl font-cinzel font-bold glow-purple">
                Cauldron of Questions
              </h2>
            </div>

            {!quizComplete ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <span className="text-sm text-accent">
                      Score: {score}/{questions.length}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-glow"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-cinzel mb-6">
                    {currentQuestion.question}
                  </h3>

                  {currentQuestion.type === 'mcq' && currentQuestion.options && (
                    <RadioGroup
                      value={String(answers[currentQuestionIndex] ?? '')}
                      onValueChange={(value) => handleMCQAnswer(Number(value))}
                      className="space-y-3"
                    >
                      {currentQuestion.options.map((option, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.01, x: 4 }}
                          className="flex items-center space-x-3 p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors cursor-pointer"
                        >
                          <RadioGroupItem value={String(index)} id={`option-${index}`} />
                          <Label
                            htmlFor={`option-${index}`}
                            className="flex-1 cursor-pointer"
                          >
                            {option}
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  )}

                  {currentQuestion.type === 'true-false' && (
                    <RadioGroup
                      value={String(answers[currentQuestionIndex] ?? '')}
                      onValueChange={(value) => handleTrueFalseAnswer(value === 'true')}
                      className="space-y-3"
                    >
                      {['true', 'false'].map((value) => (
                        <motion.div
                          key={value}
                          whileHover={{ scale: 1.01, x: 4 }}
                          className="flex items-center space-x-3 p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors cursor-pointer"
                        >
                          <RadioGroupItem value={value} id={value} />
                          <Label htmlFor={value} className="flex-1 cursor-pointer">
                            {value === 'true' ? 'True' : 'False'}
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  )}

                  {currentQuestion.type === 'fill-blank' && (
                    <Input
                      value={String(answers[currentQuestionIndex] ?? '')}
                      onChange={(e) => handleFillBlankAnswer(e.target.value)}
                      placeholder="Type your answer..."
                      className="text-lg p-4"
                    />
                  )}
                </div>

                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      ...(isCorrect ? {} : { x: [0, -10, 10, -10, 10, 0] })
                    }}
                    transition={{ duration: isCorrect ? 0.3 : 0.5 }}
                    className={`p-4 rounded-lg mb-6 ${
                      isCorrect
                        ? 'bg-secondary/20 border border-secondary shadow-glow-green'
                        : 'bg-destructive/20 border border-destructive'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
                      )}
                      <div>
                        <h4 className="font-cinzel font-bold mb-2">
                          {isCorrect ? 'Brilliant! ✨' : 'Not quite right'}
                        </h4>
                        <p className="text-sm">{currentQuestion.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-end gap-3">
                  {!showFeedback && (
                    <Button
                      onClick={handleAnswerSubmit}
                      disabled={answers[currentQuestionIndex] === null}
                      className="btn-enchanted"
                    >
                      Submit Answer
                    </Button>
                  )}

                  {showFeedback && (
                    <Button onClick={handleNextQuestion} className="btn-enchanted">
                      {currentQuestionIndex < questions.length - 1 ? (
                        <>
                          Next Question
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </>
                      ) : score === questions.length ? (
                        <>
                          Complete Quest
                          <Sparkles className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        'Retry Quiz'
                      )}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <Sparkles className="w-20 h-20 text-accent mx-auto mb-6" />
                </motion.div>

                <h3 className="text-3xl font-cinzel font-bold glow-gold mb-4">
                  Quest Completed!
                </h3>
                <p className="text-lg mb-6">
                  You've mastered this section with a perfect score! The next scroll has
                  been unsealed.
                </p>

                <div className="flex justify-center gap-3">
                  <Button onClick={handleRetry} variant="outline">
                    Review Questions
                  </Button>
                  <Button onClick={onClose} className="btn-enchanted">
                    Continue Journey
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
