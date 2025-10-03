import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Trophy, Star, Zap } from "lucide-react";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CelebrationModal = ({ isOpen, onClose }: CelebrationModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-lg"
      >
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={true}
          numberOfPieces={300}
          gravity={0.15}
        />

        <motion.div
          initial={{ scale: 0.5, rotateY: -180, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
          exit={{ scale: 0.5, rotateY: 180, opacity: 0 }}
          transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
          className="relative w-full max-w-2xl mx-4 bg-card rounded-2xl border-2 border-primary/50 shadow-[0_0_50px_rgba(139,92,246,0.5)] overflow-hidden"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative z-10 p-12 text-center">
            {/* Trophy animation */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mb-6 relative inline-block"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <Trophy className="w-24 h-24 text-accent mx-auto" />
              </motion.div>
              
              {/* Floating sparkles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, (i % 2 === 0 ? 1 : -1) * (30 + i * 10)],
                    y: [0, -20 - i * 5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                >
                  {i % 3 === 0 ? (
                    <Sparkles className="w-4 h-4 text-accent" />
                  ) : i % 3 === 1 ? (
                    <Star className="w-4 h-4 text-primary" />
                  ) : (
                    <Zap className="w-4 h-4 text-secondary" />
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl font-cinzel font-bold glow-gold mb-4"
            >
              🎉 Congratulations! 🎉
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 mb-8"
            >
              <p className="text-xl md:text-2xl font-cinzel text-primary">
                You've Mastered the Art of Encrypted Brewing!
              </p>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                You've completed all sections and unlocked the secrets of fhEVM. You are now a true master of Fully Homomorphic Encryption!
              </p>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="inline-block px-6 py-3 bg-gradient-glow rounded-full mt-4"
              >
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Achievement Unlocked: FHE Master Alchemist
                  <Sparkles className="w-5 h-5" />
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Button
                onClick={onClose}
                size="lg"
                className="btn-enchanted text-lg px-8 py-6"
              >
                Close & Celebrate ✨
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};