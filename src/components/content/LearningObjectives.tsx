import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LearningObjectivesProps {
  objectives: string[];
}

export const LearningObjectives = ({ objectives }: LearningObjectivesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="parchment-scroll my-6"
    >
      <h3 className="font-cinzel text-lg font-bold mb-3 flex items-center gap-2 text-secondary glow-green">
        <Sparkles className="w-5 h-5" />
        Spells You'll Master
      </h3>
      <ul className="space-y-2">
        {objectives.map((objective, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-start gap-3"
          >
            <span className="text-accent text-lg mt-0.5">✦</span>
            <span className="flex-1">{objective}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
