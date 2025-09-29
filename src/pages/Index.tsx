import { useState } from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { SectionTemplate } from '@/components/SectionTemplate';
import mysticalBackground from '@/assets/mystical-background.jpg';

const Index = () => {
  const [currentSection, setCurrentSection] = useState(1);

  return (
    <div className="min-h-screen relative">
      {/* Background image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${mysticalBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.4,
        }}
      />

      {/* Particle effects */}
      <ParticleBackground />

      {/* Gradient overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-mystical opacity-80" />

      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <div className="flex">
          <Sidebar currentSection={currentSection} onSectionClick={setCurrentSection} />
          
          <main className="flex-1 ml-80 mt-16 p-8 min-h-screen">
            <SectionTemplate sectionId={currentSection} />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
