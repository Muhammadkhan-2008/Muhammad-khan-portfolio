import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import { portfolioData } from "@/lib/data";

export function Projects() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(portfolioData.projects.flatMap(p => p.categories)))];

  useEffect(() => {
    // Simulate network load for skeleton demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = portfolioData.projects.filter(project => {
    const matchesFilter = filter === "All" || project.categories.includes(filter);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.hook.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Case Studies</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A deep dive into my development process, architectural decisions, and how I approach complex front-end problems.
        </p>
      </motion.div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-card border border-border hover:bg-accent"
              }`}
              data-testid={`filter-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 bg-card border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            data-testid="input-search-projects"
          />
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            // Skeleton Loaders
            Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-border bg-card p-8 h-80 flex flex-col"
              >
                <div className="flex gap-2 mb-6">
                  <div className="w-16 h-6 bg-muted rounded-full animate-pulse"></div>
                  <div className="w-20 h-6 bg-muted rounded-full animate-pulse"></div>
                </div>
                <div className="w-3/4 h-8 bg-muted rounded animate-pulse mb-4"></div>
                <div className="w-full h-4 bg-muted rounded animate-pulse mb-2"></div>
                <div className="w-full h-4 bg-muted rounded animate-pulse mb-2"></div>
                <div className="w-2/3 h-4 bg-muted rounded animate-pulse mb-auto"></div>
                <div className="w-32 h-4 bg-muted rounded animate-pulse"></div>
              </motion.div>
            ))
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="group cursor-pointer rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 glow-effect h-full flex flex-col" data-testid={`project-card-${project.slug}`}>
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
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 py-20 text-center text-muted-foreground">
              No projects found matching your criteria.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}