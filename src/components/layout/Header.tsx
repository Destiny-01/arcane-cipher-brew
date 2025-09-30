import { motion } from 'framer-motion';
import { FlaskConical, RotateCcw, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/hooks/useProgress';
import cauldronIcon from '@/assets/cauldron-icon.png';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { getManaPercentage, resetProgress } = useProgress();
  const manaPercentage = getManaPercentage();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card/90 backdrop-blur-md border-b border-primary/20 z-50 shadow-mystical">
      <div className="h-full px-3 md:px-6 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden flex-shrink-0 text-primary hover:bg-primary/10"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <motion.img
            src={cauldronIcon}
            alt="Cauldron"
            className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="min-w-0">
            <h1 className="text-sm md:text-xl font-cinzel font-bold glow-purple truncate">
              Private Potion Brewing
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Master the Arts of FHE</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm font-cinzel hidden sm:inline">Mana Progress</span>
            </div>
            <div className="w-20 sm:w-32 md:w-64 h-2 md:h-3 bg-muted rounded-full overflow-hidden border border-primary/30">
              <motion.div
                className="h-full bg-gradient-glow mana-fill"
                initial={{ width: 0 }}
                animate={{ width: `${manaPercentage}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <span className="text-xs text-muted-foreground text-center">
              {Math.round(manaPercentage)}%
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={resetProgress}
            className="gap-2 border-destructive/50 hover:bg-destructive/10 hover:border-destructive hidden sm:flex"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden md:inline">Reset</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={resetProgress}
            className="border-destructive/50 hover:bg-destructive/10 hover:border-destructive sm:hidden flex-shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
