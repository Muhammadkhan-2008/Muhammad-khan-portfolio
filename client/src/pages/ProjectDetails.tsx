import { useRoute, Link } from "wouter";
import { portfolioData } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Code, Bug, Zap } from "lucide-react";
import NotFound from "./not-found";

export function ProjectDetails() {
  const [match, params] = useRoute("/projects/:slug");
  
  if (!match || !params?.slug) return <NotFound />;
  
  const project = portfolioData.projects.find(p => p.slug === params.slug);
  
  if (!project) return <NotFound />;

  return (
    <article className="container mx-auto px-6 py-12 max-w-4xl min-h-screen">
      <Link href="/projects">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-10 cursor-pointer">
          <ArrowLeft size={16} /> Back to Projects
        </span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <header>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.categories.map(cat => (
              <span key={cat} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium border border-primary/20">
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">{project.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {project.hook}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-y border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-card rounded-full border border-border">
              <Github size={20} className="text-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Repository</p>
              <p className="font-mono text-sm font-medium truncate max-w-[200px]" title={project.repo}>{project.repo}</p>
            </div>
          </div>
        </div>

        <section className="space-y-12">
          {/* Tech Choice */}
          <div className="bg-card rounded-2xl p-8 border border-border relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Code size={20} />
              </div>
              <h2 className="text-2xl font-display font-bold">Tech Choice</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{project.techChoice}</p>
          </div>

          {/* Hardest Bug */}
          <div className="bg-destructive/5 rounded-2xl p-8 border border-destructive/20 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-destructive/10 rounded-lg text-destructive">
                <Bug size={20} />
              </div>
              <h2 className="text-2xl font-display font-bold text-destructive">Hardest Bug</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{project.hardestBug}</p>
          </div>

          {/* Performance Wins */}
          <div className="bg-green-500/5 rounded-2xl p-8 border border-green-500/20 relative overflow-hidden">
             <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                <Zap size={20} />
              </div>
              <h2 className="text-2xl font-display font-bold text-green-500">Performance Wins</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{project.performanceWins}</p>
          </div>
        </section>

      </motion.div>
    </article>
  );
}