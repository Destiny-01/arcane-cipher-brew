import { motion } from "framer-motion";
import { Lightbulb, Sparkles, Zap } from "lucide-react";

interface TipBlockProps {
  title: string;
  content: string;
  icon?: "lightbulb" | "sparkles" | "zap";
}

const iconMap = {
  lightbulb: Lightbulb,
  sparkles: Sparkles,
  zap: Zap,
};

export const TipBlock = ({
  title,
  content,
  icon = "sparkles",
}: TipBlockProps) => {
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="my-6 p-4 rounded-lg bg-secondary/10 border-l-4 border-secondary shadow-glow-green"
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex-shrink-0"
          >
            <Icon className="w-6 h-6 text-secondary" />
          </motion.div>
        )}
        <div className="flex-1">
          <h4 className="font-cinzel font-bold text-secondary mb-2">{title}</h4>
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    </motion.div>
  );
};
