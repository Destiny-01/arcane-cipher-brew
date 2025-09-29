import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export const SectionHeader = ({ title, subtitle, icon }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center gap-4 mb-2">
        {icon && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        )}
        <h1 className="text-4xl md:text-5xl font-cinzel font-bold glow-purple">
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="text-xl text-accent glow-gold font-semibold">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
