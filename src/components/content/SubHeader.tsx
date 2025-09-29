import { motion } from 'framer-motion';

interface SubHeaderProps {
  text: string;
}

export const SubHeader = ({ text }: SubHeaderProps) => {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-2xl font-cinzel font-bold mt-8 mb-4 text-primary"
    >
      {text}
    </motion.h2>
  );
};
