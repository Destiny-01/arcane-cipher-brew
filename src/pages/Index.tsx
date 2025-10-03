import { useState, useEffect } from "react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { SectionTemplate } from "@/components/SectionTemplate";
import mysticalBackground from "@/assets/mystical-background.jpg";
import { STORAGE_KEY } from "@/contexts/ProgressContext";

const Index = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  const storedSection = storedData
    ? JSON.parse(storedData)?.currentSection
    : null;

  const [currentSection, setCurrentSection] = useState(storedSection ?? 1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSection]);

  return (
    <div className="min-h-screen relative">
      {/* Background image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${mysticalBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.4,
        }}
      />

      {/* Particle effects */}
      <ParticleBackground />

      {/* Gradient overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-mystical opacity-80" />

      {/* Content */}
      <div className="relative z-10">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex">
          <Sidebar
            currentSection={currentSection}
            onSectionClick={setCurrentSection}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="flex-1 md:ml-80 mt-16 p-4 sm:p-6 md:p-8 min-h-screen">
            <SectionTemplate
              sectionId={currentSection}
              onSectionComplete={() => {
                // Move to next section after completing quiz
                if (currentSection < 10) {
                  setCurrentSection((currSection) => currSection + 1);
                }
              }}
            />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
