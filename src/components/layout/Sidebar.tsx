import { motion } from 'framer-motion';
import { Lock, Unlock, Sparkles } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import sectionsData from '@/data/sections.json';
import { cn } from '@/lib/utils';

interface SidebarProps {
  currentSection: number;
  onSectionClick: (sectionId: number) => void;
}

export const Sidebar = ({ currentSection, onSectionClick }: SidebarProps) => {
  const { isSectionUnlocked, progress } = useProgress();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-80 bg-card/80 backdrop-blur-md border-r border-primary/20 overflow-y-auto shadow-mystical">
      <div className="p-6">
        <h2 className="text-lg font-cinzel font-bold mb-4 glow-purple flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Grimoire of Knowledge
        </h2>
        
        <div className="space-y-3">
          {sectionsData.sections.map((section) => {
            const isUnlocked = isSectionUnlocked(section.id);
            const isCompleted = progress.completedSections.includes(section.id);
            const isCurrent = currentSection === section.id;

            return (
              <motion.div
                key={section.id}
                whileHover={isUnlocked ? { scale: 1.02, x: 4 } : {}}
                className={cn(
                  "relative p-4 rounded-lg border transition-all cursor-pointer",
                  isCurrent && "border-primary shadow-glow-purple",
                  !isCurrent && isUnlocked && "border-primary/30 hover:border-primary/50",
                  !isUnlocked && "section-locked border-muted"
                )}
                onClick={() => isUnlocked && onSectionClick(section.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                    isCompleted && "bg-secondary shadow-glow-green",
                    !isCompleted && isUnlocked && "bg-primary/20",
                    !isUnlocked && "bg-muted"
                  )}>
                    {!isUnlocked && <Lock className="w-4 h-4" />}
                    {isUnlocked && !isCompleted && <Unlock className="w-4 h-4" />}
                    {isCompleted && <Sparkles className="w-4 h-4" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-cinzel font-semibold text-sm mb-1">
                      {section.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {section.subtitle}
                    </p>
                    {!isUnlocked && (
                      <p className="text-xs text-accent mt-2">
                        🔒 Complete previous section to unlock
                      </p>
                    )}
                  </div>
                </div>

                {isCurrent && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-glow rounded-r"
                    layoutId="current-section"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
