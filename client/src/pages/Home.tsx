import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Code2, MonitorSmartphone, Rocket } from "lucide-react";
import { portfolioData } from "@/lib/data";
import { PerformancePanel } from "@/components/PerformancePanel";

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
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <motion.section 
        className="min-h-[70vh] flex flex-col justify-center items-start"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          {portfolioData.personal.location} based Developer
        </motion.div>
        
        <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-display font-extrabold leading-tight mb-6">
          Crafting Digital <br className="hidden md:block"/>
          <span className="gradient-text">Experiences That Matter</span>
        </motion.h1>
        
        <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          I'm <strong className="text-foreground">{portfolioData.personal.name}</strong>, a {portfolioData.personal.headline} passionate about building fast, responsive, and user-friendly web applications.
        </motion.p>
        
        <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
          <Link href="/projects">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all flex items-center gap-2 glow-effect" data-testid="button-view-work">
              View My Work <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-8 py-4 bg-card border border-border text-foreground rounded-full font-medium hover:bg-accent transition-all" data-testid="button-contact">
              Get in Touch
            </button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Expertise Section */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <MonitorSmartphone size={32} />, title: "Responsive Design", desc: "Mobile-first approach ensuring flawless experiences across all devices." },
            { icon: <Code2 size={32} />, title: "Clean Code", desc: "Writing semantic, accessible, and maintainable HTML, CSS, and modern JS." },
            { icon: <Rocket size={32} />, title: "Performance Optimized", desc: "Focused on Core Web Vitals and lightning-fast rendering." },
          ].map((item, index) => (
            <div key={index} className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
              <div className="text-primary mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold font-display mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Featured Projects Preview */}
      <section className="py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Work</h2>
            <p className="text-muted-foreground max-w-lg">A selection of my recent front-end projects and WordPress implementations.</p>
          </div>
          <Link href="/projects">
            <span className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline cursor-pointer">
              View All Projects <ArrowRight size={16} />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.projects.slice(0, 2).map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <div className="group cursor-pointer rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 glow-effect h-full flex flex-col" data-testid={`card-project-${project.slug}`}>
                <div className="p-8 flex flex-col h-full">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.categories.map(cat => (
                      <span key={cat} className="text-xs px-3 py-1 bg-accent text-accent-foreground rounded-full font-medium">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground mb-8 flex-grow">{project.hook}</p>
                  
                  <div className="flex items-center text-sm font-medium text-primary mt-auto">
                    Read Case Study <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <Link href="/projects">
          <button className="w-full mt-8 md:hidden py-4 border border-border rounded-xl font-medium hover:bg-accent transition-colors">
            View All Projects
          </button>
        </Link>
      </section>

      {/* Performance Panel */}
      <PerformancePanel />

    </div>
  );
}