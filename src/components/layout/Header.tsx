import { motion } from 'framer-motion';
import { FlaskConical, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/hooks/useProgress';
import cauldronIcon from '@/assets/cauldron-icon.png';

export const Header = () => {
  const { getManaPercentage, resetProgress } = useProgress();
  const manaPercentage = getManaPercentage();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card/90 backdrop-blur-md border-b border-primary/20 z-50 shadow-mystical">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.img
            src={cauldronIcon}
            alt="Cauldron"
            className="w-10 h-10"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div>
            <h1 className="text-xl font-cinzel font-bold glow-purple">
              Private Potion Brewing
            </h1>
            <p className="text-xs text-muted-foreground">Master the Arts of FHE</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-primary" />
              <span className="text-sm font-cinzel">Mana Progress</span>
            </div>
            <div className="w-64 h-3 bg-muted rounded-full overflow-hidden border border-primary/30">
              <motion.div
                className="h-full bg-gradient-glow mana-fill"
                initial={{ width: 0 }}
                animate={{ width: `${manaPercentage}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <span className="text-xs text-muted-foreground text-center">
              {Math.round(manaPercentage)}% Complete
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={resetProgress}
            className="gap-2 border-destructive/50 hover:bg-destructive/10 hover:border-destructive"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>
    </header>
  );
};
