import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export interface ProgressData {
  completedSections: number[];
  quizAttempts: { [sectionId: number]: number };
  quizScores: { [sectionId: number]: number };
  currentSection: number;
}

export const STORAGE_KEY = "potion-brewing-progress";

const defaultProgress: ProgressData = {
  completedSections: [],
  quizAttempts: {},
  quizScores: {},
  currentSection: 1,
};

interface ProgressContextType {
  progress: ProgressData;
  completeSection: (sectionId: number) => void;
  recordQuizAttempt: (sectionId: number, score: number) => void;
  resetProgress: () => void;
  isSectionUnlocked: (sectionId: number) => boolean;
  getManaPercentage: () => number;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<ProgressData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultProgress;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeSection = (sectionId: number) => {
    setProgress((prev) => ({
      ...prev,
      completedSections: [...new Set([...prev.completedSections, sectionId])],
      currentSection: Math.max(prev.currentSection, sectionId + 1),
    }));
  };

  const recordQuizAttempt = (sectionId: number, score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizAttempts: {
        ...prev.quizAttempts,
        [sectionId]: (prev.quizAttempts[sectionId] || 0) + 1,
      },
      quizScores: {
        ...prev.quizScores,
        [sectionId]: Math.max(prev.quizScores[sectionId] || 0, score),
      },
      completedSections:
        score === 100
          ? [...new Set([...prev.completedSections, sectionId])]
          : prev.completedSections,
      currentSection:
        score === 100
          ? Math.max(prev.currentSection, sectionId + 1)
          : prev.currentSection,
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isSectionUnlocked = useCallback(
    (sectionId: number) =>
      sectionId === 1 || progress.completedSections.includes(sectionId - 1),
    [progress]
  );

  const getManaPercentage = useCallback(() => {
    return (progress.completedSections.length / 10) * 100;
  }, [progress]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        completeSection,
        recordQuizAttempt,
        resetProgress,
        isSectionUnlocked,
        getManaPercentage,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
