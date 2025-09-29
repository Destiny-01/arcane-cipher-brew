import { useState, useEffect } from 'react';

export interface ProgressData {
  completedSections: number[];
  quizAttempts: { [sectionId: number]: number };
  quizScores: { [sectionId: number]: number };
  currentSection: number;
}

const STORAGE_KEY = 'potion-brewing-progress';

const defaultProgress: ProgressData = {
  completedSections: [],
  quizAttempts: {},
  quizScores: {},
  currentSection: 1,
};

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultProgress;
  });

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
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isSectionUnlocked = (sectionId: number) => {
    return sectionId === 1 || progress.completedSections.includes(sectionId - 1);
  };

  const getManaPercentage = () => {
    return (progress.completedSections.length / 10) * 100;
  };

  return {
    progress,
    completeSection,
    recordQuizAttempt,
    resetProgress,
    isSectionUnlocked,
    getManaPercentage,
  };
};
