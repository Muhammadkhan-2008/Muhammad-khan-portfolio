import { Github, Linkedin, Mail } from "lucide-react";
import { portfolioData } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="font-display font-bold text-lg">
            M<span className="text-primary">.</span>Khan
          </span>
          <p className="text-sm text-muted-foreground mt-2">
            Building fast, responsive, and user-friendly web experiences.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href={`https://github/${portfolioData.personal.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-accent hover:text-primary transition-colors text-muted-foreground"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={`https://linkedin.com/in/${portfolioData.personal.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-accent hover:text-primary transition-colors text-muted-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="p-2 rounded-full hover:bg-accent hover:text-primary transition-colors text-muted-foreground"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
      <div className="border-t border-border/50 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Muhammad Khan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}