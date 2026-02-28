import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, FolderKanban, Github } from "lucide-react";

const projectThemes = [
  { match: "Image/AI Gallery", color: "#E0F2FE", text: "#0C4A6E", slug: "googlephotos" },
  { match: "Netflix", color: "#E50914", text: "#FFFFFF", slug: "netflix" },
  { match: "Prime Video", color: "#00A8E1", text: "#FFFFFF", slug: "primevideo" },
  { match: "Microsoft", color: "#5E5E5E", text: "#FFFFFF", slug: "microsoft" },
  { match: "Spotify", color: "#1DB954", text: "#04130A", slug: "spotify" },
  { match: "YouTube", color: "#FF0000", text: "#FFFFFF", slug: "youtubemusic" },
  { match: "WordPress", color: "#21759B", text: "#FFFFFF", slug: "wordpress" },
  { match: "CodeAlpha", color: "#0284C7", text: "#FFFFFF", slug: "github" },
];

function iconUrl(slug, color) {
  return `https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`;
}

function getProjectTheme(title) {
  return projectThemes.find((item) => title.includes(item.match)) ?? {
    color: "#38BDF8",
    text: "#FFFFFF",
    slug: "react",
  };
}

const techMeta = {
  HTML: { slug: "html5", color: "#E34F26", text: "#FFFFFF" },
  CSS: { slug: "css3", color: "#1572B6", text: "#FFFFFF" },
  JavaScript: { slug: "javascript", color: "#F7DF1E", text: "#111827" },
  React: { slug: "react", color: "#61DAFB", text: "#0F172A" },
  Bootstrap: { slug: "bootstrap", color: "#7952B3", text: "#FFFFFF" },
  "Tailwind CSS": { slug: "tailwindcss", color: "#06B6D4", text: "#0F172A" },
  WordPress: { slug: "wordpress", color: "#21759B", text: "#FFFFFF" },
};

function fallbackTechIcon(label) {
  if (label === "HTML") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
  }
  if (label === "CSS") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
  }
  if (label === "JavaScript") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
  }
  if (label === "React") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
  }
  if (label === "Bootstrap") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg";
  }
  if (label === "Tailwind CSS") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg";
  }
  if (label === "WordPress") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg";
  }

  return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codepen/codepen-plain.svg";
}

export default function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="scroll-mt-28 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"
      >
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-rose-300/60 bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-rose-700 dark:border-rose-400/35 dark:bg-rose-500/15 dark:text-rose-300">
            <FolderKanban size={13} />
            Portfolio Work
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Featured Builds</h2>
        </div>
        <a
          href="https://github.com/Muhammadkhan-2008"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          See GitHub <Github size={16} />
        </a>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => {
          const theme = getProjectTheme(project.title);
          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.01 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
              className="project-brand-card transform-gpu group relative overflow-hidden rounded-3xl border border-border bg-card p-6"
              style={{
                "--project-bg": theme.color,
                "--project-fg": theme.text,
                "--project-icon-filter": theme.text === "#FFFFFF" ? "brightness(0) invert(1)" : "none",
              }}
            >
              <div className="project-on-hover mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary transition-colors duration-300 dark:group-hover:bg-white/20">
                <CheckCircle2 size={14} /> Case Study
              </div>

              <div className="flex items-start justify-between gap-3">
                <h3 className="project-on-hover font-display text-2xl font-bold transition-colors duration-300 group-hover:text-primary">
                  {project.title}
                </h3>
                <span className="project-on-hover inline-flex rounded-lg border border-border bg-background/80 p-2 transition-colors duration-300 dark:group-hover:border-white/35 dark:group-hover:bg-black/20">
                  <img
                    src={iconUrl(theme.slug, theme.color)}
                    alt={`${project.title} icon`}
                    loading="lazy"
                    className="project-brand-icon h-4 w-4 transition-all duration-300"
                  />
                </span>
              </div>

              <p className="project-on-hover mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300">
                {project.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((item) => {
                  const tech = techMeta[item] ?? { slug: "codefactor", color: "#64748B", text: "#FFFFFF" };
                  return (
                  <span
                    key={item}
                    className="brand-chip inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium transition-colors duration-300"
                    style={{
                      "--brand-bg": tech.color,
                      "--brand-fg": tech.text,
                      "--brand-icon-filter": tech.text === "#FFFFFF" ? "brightness(0) invert(1)" : "brightness(0) saturate(100%)",
                    }}
                  >
                    <img
                      src={iconUrl(tech.slug, tech.color)}
                      alt={`${item} icon`}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.src = fallbackTechIcon(item);
                      }}
                      className="brand-icon h-3.5 w-3.5"
                    />
                    {item}
                  </span>
                );
                })}
              </div>

              <div className="mt-6 flex items-center gap-4 text-sm font-semibold">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-on-hover inline-flex items-center gap-1.5 text-primary transition-transform duration-300 hover:scale-105"
                >
                  Code <Github size={14} />
                </a>
                <a
                  href={project.demo}
                  className="project-on-hover inline-flex items-center gap-1.5 text-foreground transition-transform duration-300 hover:scale-105"
                >
                  Live <ExternalLink size={14} />
                </a>
              </div>

              <div
                className="project-glow-orb pointer-events-none absolute -right-12 -top-14 h-32 w-32 rounded-full blur-lg transition-opacity duration-300 group-hover:opacity-100"
                style={{ backgroundColor: `${theme.color}66` }}
              />
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
