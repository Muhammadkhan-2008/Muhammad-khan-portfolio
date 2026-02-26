import { motion } from "framer-motion";
import { ArrowRight, Code2, MonitorSmartphone, Rocket, Github, ExternalLink, Mail, Phone, MapPin, CheckCircle2, Zap } from "lucide-react";
import { portfolioData } from "@/lib/data";
import { PerformancePanel } from "@/components/PerformancePanel";
import { useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-6 min-h-[90vh] flex flex-col justify-center items-start pt-20">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl"
        >
          <motion.div variants={fadeIn} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            {portfolioData.personal.location} based Developer
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="text-5xl md:text-8xl font-display font-extrabold leading-tight mb-6">
            Crafting Digital <br className="hidden md:block"/>
            <span className="gradient-text">Experiences That Matter</span>
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            I'm <strong className="text-foreground">{portfolioData.personal.name}</strong>, a {portfolioData.personal.headline} passionate about building fast, responsive, and user-friendly web applications and WordPress solutions.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all flex items-center gap-2 glow-effect shadow-lg shadow-primary/20"
            >
              View My Work <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-card border border-border text-foreground rounded-full font-medium hover:bg-accent transition-all"
            >
              Get in Touch
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 bg-accent/30">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Core Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Specializing in modern web development and high-performance WordPress architecture.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <MonitorSmartphone size={32} />, title: "Responsive Design", desc: "Mobile-first approach ensuring flawless experiences across all devices." },
              { icon: <Code2 size={32} />, title: "Clean Code", desc: "Writing semantic, accessible, and maintainable HTML, CSS, and modern JS." },
              { icon: <Rocket size={32} />, title: "Performance Optimized", desc: "Focused on Core Web Vitals and lightning-fast rendering." },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-xl group"
              >
                <div className="text-primary mb-6 transition-transform group-hover:scale-110 duration-300">{item.icon}</div>
                <h3 className="text-2xl font-bold font-display mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-xl text-lg">A deep dive into high-performance WordPress implementations and front-end solutions.</p>
            </div>
            <a 
              href={`https://github.com/${portfolioData.personal.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary font-bold text-lg hover:underline decoration-2 underline-offset-8"
            >
              Explore All on GitHub <Github size={20} />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {portfolioData.projects.map((project, index) => (
              <motion.div 
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-3xl border border-border bg-card overflow-hidden transition-all hover:border-primary/40 hover:shadow-2xl flex flex-col"
              >
                <div className="p-10 flex flex-col h-full">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.categories.map(cat => (
                      <span key={cat} className="text-xs px-4 py-1.5 bg-primary/10 text-primary rounded-full font-bold uppercase tracking-wider">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground mb-8 flex-grow text-lg leading-relaxed">{project.hook}</p>
                  
                  <div className="space-y-6 mb-10 p-6 bg-accent/20 rounded-2xl border border-border/50">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Tech Choice</h4>
                      <p className="text-sm text-muted-foreground">{project.techChoice}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Performance Win</h4>
                      <p className="text-sm text-muted-foreground">{project.performanceWins}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold bg-background border border-border px-6 py-3 rounded-xl hover:bg-accent transition-all">
                      <Github size={16} /> Repository
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Skills Section */}
      <section id="resume" className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-display font-bold mb-12">Professional Journey</h2>
              <div className="space-y-12">
                {portfolioData.experience.map((exp, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-10 border-l-2 border-primary/20 hover:border-primary transition-colors"
                  >
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1.5 shadow-lg shadow-primary/40"></div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">{exp.duration}</span>
                    <h4 className="text-2xl font-bold mb-1">{exp.role}</h4>
                    <p className="text-lg font-medium text-muted-foreground mb-4">{exp.company}</p>
                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-display font-bold mb-12">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.map((skill, i) => (
                  <motion.span 
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="px-6 py-3 bg-background border border-border rounded-2xl text-sm font-bold hover:border-primary/50 hover:text-primary transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              <div className="mt-16 p-8 bg-primary rounded-3xl text-primary-foreground relative overflow-hidden group shadow-2xl shadow-primary/30">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Looking for a collaborator?</h3>
                  <p className="mb-8 opacity-90 text-lg">I'm currently available for freelance projects and full-time opportunities.</p>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-4 bg-white text-primary rounded-full font-bold hover:scale-105 transition-transform"
                  >
                    Start a Conversation
                  </button>
                </div>
                <Rocket className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Get in Touch</h2>
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                  Have a specific inquiry or just want to say hi? Fill out the form or reach out through social channels.
                </p>
                
                <div className="space-y-8">
                  <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-6 group">
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                      <p className="font-bold break-all">{portfolioData.personal.email}</p>
                    </div>
                  </a>
                  <a href={`tel:${portfolioData.personal.phone}`} className="flex items-center gap-6 group">
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Phone</p>
                      <p className="font-bold">{portfolioData.personal.phone}</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-6 group">
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Location</p>
                      <p className="font-bold">{portfolioData.personal.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-card border border-border p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                  {isSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 z-10 bg-card flex flex-col items-center justify-center p-8 text-center border border-green-500/30 rounded-[2.5rem] glow-effect"
                    >
                      <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-3xl font-display font-bold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground text-lg">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest opacity-70 ml-1">Your Name</label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-6 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest opacity-70 ml-1">Your Email</label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-6 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest opacity-70 ml-1">How can I help?</label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        placeholder="Tell me about your project or inquiry..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-6 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-lg"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-bold flex justify-center items-center gap-3 hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed glow-effect text-xl shadow-xl shadow-primary/20"
                    >
                      {isSubmitting ? (
                        <span className="w-6 h-6 border-3 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <>Send Message <Rocket size={24} /></>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 mb-24">
        <PerformancePanel />
      </div>
    </div>
  );
}