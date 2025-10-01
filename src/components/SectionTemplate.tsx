import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Scroll } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/content/SectionHeader';
import { LearningObjectives } from '@/components/content/LearningObjectives';
import { SubHeader } from '@/components/content/SubHeader';
import { ContentBlock } from '@/components/content/ContentBlock';
import { CodeBlock } from '@/components/content/CodeBlock';
import { NoteBlock } from '@/components/content/NoteBlock';
import { TipBlock } from '@/components/content/TipBlock';
import { ResourceList } from '@/components/content/ResourceList';
import { QuizModal } from '@/components/quiz/QuizModal';
import sectionsData from '@/data/sections.json';

interface SectionTemplateProps {
  sectionId: number;
  onSectionComplete?: () => void;
}

export const SectionTemplate = ({ sectionId, onSectionComplete }: SectionTemplateProps) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  
  const section = sectionsData.sections.find((s) => s.id === sectionId);
  const quiz = sectionsData.quizzes.find((q) => q.sectionId === sectionId);

  if (!section) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">Section not found</p>
      </div>
    );
  }

  const hasContent = section.content && section.content.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-6 md:space-y-8"
    >
      <SectionHeader
        title={section.title}
        subtitle={section.subtitle}
        icon={<FlaskConical className="w-12 h-12 text-primary" />}
      />

      <ContentBlock content={section.description} className="text-lg mb-8" />

      {section.learningObjectives.length > 0 && (
        <LearningObjectives objectives={section.learningObjectives} />
      )}

      {hasContent && (
        <div className="space-y-6 my-8">
          {section.content.map((item, index) => {
            switch (item.type) {
              case 'subheader':
                return <SubHeader key={index} text={item.text} />;
              
              case 'text':
                return <ContentBlock key={index} content={item.content} />;
              
              case 'list':
                return (
                  <ContentBlock key={index} content={
                    <ul className="space-y-2 ml-6">
                      {item.items.map((listItem: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-accent mt-1">✦</span>
                          <span dangerouslySetInnerHTML={{ __html: listItem }} />
                        </li>
                      ))}
                    </ul>
                  } />
                );
              
              case 'code':
                return (
                  <CodeBlock
                    key={index}
                    code={item.code}
                    language={item.language}
                    title={item.title}
                  />
                );
              
              case 'note':
                return (
                  <NoteBlock
                    key={index}
                    title={item.title}
                    content={item.content}
                    icon={item.icon as any}
                  />
                );
              
              case 'tip':
                return (
                  <TipBlock
                    key={index}
                    title={item.title}
                    content={item.content}
                    icon={item.icon as any}
                  />
                );
              
              default:
                return null;
            }
          })}
        </div>
      )}

      {!hasContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 parchment-scroll"
        >
          <Scroll className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">
            This ancient scroll awaits its magical inscription...
          </p>
        </motion.div>
      )}

      {quiz && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="my-12 p-8 rounded-xl bg-gradient-portal relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10 text-center">
            <h3 className="text-2xl font-cinzel font-bold glow-purple mb-4">
              Enter the Portal of Trials
            </h3>
            <p className="text-muted-foreground mb-6">
              Test your newfound knowledge and unlock the next mystical scroll
            </p>
            <Button
              onClick={() => setIsQuizOpen(true)}
              size="lg"
              className="btn-enchanted text-lg px-8 py-6"
            >
              Begin Challenge ✨
            </Button>
          </div>
        </motion.div>
      )}

      {section.resources && section.resources.length > 0 && (
        <ResourceList resources={section.resources} />
      )}

      {quiz && (
        <QuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          sectionId={sectionId}
          questions={quiz.questions as any}
          onComplete={() => {
            setIsQuizOpen(false);
            onSectionComplete?.();
          }}
        />
      )}
    </motion.div>
  );
};
