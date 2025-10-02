import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ContentBlockProps {
  content: string | ReactNode;
  className?: string;
}

export const ContentBlock = ({ content, className = '' }: ContentBlockProps) => {
  const processContent = (text: string) => {
    return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`my-4 text-foreground leading-relaxed ${className}`}
    >
      {typeof content === 'string' ? (
        <p dangerouslySetInnerHTML={{ __html: processContent(content) }} />
      ) : (
        content
      )}
    </motion.div>
  );
};
