import { useState } from "react";
import { motion } from "framer-motion";
import { Printer, Briefcase, Code, User, GraduationCap, Download } from "lucide-react";
import { portfolioData } from "@/lib/data";

export function Resume() {
  const [searchTerm, setSearchTerm] = useState("");

  const handlePrint = () => {
    window.print();
  };

  const filteredSkills = portfolioData.skills.filter(skill => 
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 print:hidden">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">Interactive Resume</h1>
          <p className="text-muted-foreground">Search skills or print a copy for your records.</p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-sm glow-effect"
          data-testid="button-print-resume"
        >
          <Printer size={18} /> Print Resume
        </motion.button>
      </div>

      {/* Resume Content Wrapper (Targeted for Print) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm max-w-4xl mx-auto print:shadow-none print:border-none print:p-0"
      >
        {/* Header */}
        <header className="border-b border-border pb-8 mb-8 text-center md:text-left">
          <h2 className="text-4xl font-display font-extrabold text-foreground mb-2">{portfolioData.personal.name}</h2>
          <p className="text-xl text-primary font-medium mb-4">{portfolioData.personal.headline}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
            <span>{portfolioData.personal.location}</span> • 
            <span>{portfolioData.personal.phone}</span> • 
            <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-primary transition-colors">{portfolioData.personal.email}</a>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2 border-b border-border pb-2">
                <User size={20} className="text-primary" /> Professional Summary
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {portfolioData.personal.summary}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2 border-b border-border pb-2">
                <Briefcase size={20} className="text-primary" /> Experience
              </h3>
              <div className="space-y-8">
                {portfolioData.experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-primary/20 hover:border-primary transition-colors">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                    <h4 className="text-lg font-bold text-foreground">{exp.role}</h4>
                    <div className="flex justify-between items-center text-sm font-medium mb-3">
                      <span className="text-primary">{exp.company}</span>
                      <span className="text-muted-foreground bg-accent px-2 py-0.5 rounded-md">{exp.duration}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            <section>
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2 border-b border-border pb-2">
                <Code size={20} className="text-primary" /> Skills
              </h3>
              
              <div className="mb-4 print:hidden">
                <input
                  type="text"
                  placeholder="Filter skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {filteredSkills.length > 0 ? filteredSkills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 bg-accent text-accent-foreground border border-border/50 rounded-md text-sm font-medium print:border-gray-300 print:bg-transparent"
                  >
                    {skill}
                  </span>
                )) : (
                  <span className="text-sm text-muted-foreground">No skills match your search.</span>
                )}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2 border-b border-border pb-2">
                <GraduationCap size={20} className="text-primary" /> Profiles
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="block text-muted-foreground text-xs uppercase tracking-wider mb-1">GitHub</span>
                  <a href={`https://github.com/${portfolioData.personal.github}`} className="font-medium hover:text-primary transition-colors">
                    github.com/{portfolioData.personal.github}
                  </a>
                </li>
                <li>
                  <span className="block text-muted-foreground text-xs uppercase tracking-wider mb-1">LinkedIn</span>
                  <a href={`https://linkedin.com/in/${portfolioData.personal.linkedin}`} className="font-medium hover:text-primary transition-colors break-all">
                    linkedin.com/in/{portfolioData.personal.linkedin}
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}