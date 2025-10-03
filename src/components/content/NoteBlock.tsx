import { processContent } from "@/lib/utils";
import { motion } from "framer-motion";
import { Scroll, Lock, Sparkles, AlertCircle } from "lucide-react";
import { ReactNode } from "react";

interface NoteBlockProps {
  title: string;
  content: string;
  icon?: "scroll" | "lock" | "sparkles" | "alert";
}

const iconMap = {
  scroll: Scroll,
  lock: Lock,
  sparkles: Sparkles,
  alert: AlertCircle,
};

export const NoteBlock = ({
  title,
  content,
  icon = "scroll",
}: NoteBlockProps) => {
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="parchment-scroll my-6"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
          {Icon && <Icon className="w-5 h-5 text-accent" />}
        </div>
        <div className="flex-1">
          <h4 className="font-cinzel font-bold text-accent mb-2">{title}</h4>
          <p
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processContent(content) }}
          />
        </div>
      </div>
    </motion.div>
  );
};
