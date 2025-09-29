import { motion } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';

interface Resource {
  title: string;
  url: string;
}

interface ResourceListProps {
  resources: Resource[];
}

export const ResourceList = ({ resources }: ResourceListProps) => {
  if (resources.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 rounded-lg bg-card border border-primary/30 shadow-mystical"
    >
      <h3 className="font-cinzel text-lg font-bold mb-4 flex items-center gap-2 text-primary">
        <BookOpen className="w-5 h-5" />
        Enchanted Tomes & References
      </h3>
      <ul className="space-y-3">
        {resources.map((resource, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <ExternalLink className="w-4 h-4 text-accent group-hover:text-accent-glow" />
              <span className="flex-1 group-hover:text-primary transition-colors">
                {resource.title}
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
