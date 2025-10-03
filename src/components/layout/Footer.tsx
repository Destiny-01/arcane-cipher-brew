import { ExternalLink, Github, BookOpen } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-primary/20 bg-card/80 backdrop-blur-md mt-12 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-cinzel">
              An enchanted journey into Fully Homomorphic Encryption
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Created by{" "}
              <a
                href="https://github.com/Destiny-01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-glow transition-colors"
              >
                @Destiny-01
              </a>{" "}
              •{" "}
              <a
                href="aigbedestinyic@gmail.com"
                className="text-primary hover:text-primary-glow transition-colors"
              >
                Get in touch
              </a>
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://docs.zama.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Zama Docs
            </a>
            <a
              href="https://github.com/zama-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
