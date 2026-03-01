import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Code2, ExternalLink, Sparkles, Wrench } from "lucide-react";

const serviceIcons = [Code2, Sparkles, BriefcaseBusiness, Wrench, Code2, Sparkles, BriefcaseBusiness];
const serviceAccents = ["#38BDF8", "#14B8A6", "#3B82F6", "#0EA5E9", "#06B6D4", "#22C55E", "#8B5CF6"];

const serviceShowcaseCards = [
  {
    title: "Frontend React Websites",
    description: "Fast, structured frontend websites with reusable React components.",
    deliverables: ["React App UI", "Reusable Components", "Clean Code Structure"],
  },
  {
    title: "WordPress Development",
    description: "Business and portfolio websites in WordPress with practical admin flow.",
    deliverables: ["Custom Pages", "Theme Setup", "Content Management"],
  },
  {
    title: "Responsive UI/UX",
    description: "Layouts that look balanced and clean on mobile, tablet, and desktop.",
    deliverables: ["Mobile First", "Responsive Breakpoints", "Readable UX"],
  },
  {
    title: "Landing Page Design",
    description: "Modern high-conversion landing sections with clear structure.",
    deliverables: ["Hero Sections", "CTA Blocks", "Brand Visual Language"],
  },
  {
    title: "Animation & Interactions",
    description: "Smooth hover and scroll transitions for premium frontend feel.",
    deliverables: ["Hover Effects", "Scroll Reveal", "Smooth Motion"],
  },
  {
    title: "Portfolio & Personal Brand",
    description: "Personal portfolio designs tailored to profile, projects, and contact flow.",
    deliverables: ["Case Study Layout", "Resume Integration", "Contact Experience"],
  },
  {
    title: "Maintenance & UI Improvements",
    description: "Existing website polish, bug fixing, and visual refinement.",
    deliverables: ["UI Cleanup", "Performance Tweaks", "Design Refresh"],
  },
];

const tabs = [
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "stack", label: "Tech Stack" },
];

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

const techMeta = {
  HTML5: { slug: "html5", color: "#E34F26", text: "#FFFFFF" },
  HTML: { slug: "html5", color: "#E34F26", text: "#FFFFFF" },
  CSS3: { slug: "css3", color: "#1572B6", text: "#FFFFFF" },
  CSS: { slug: "css3", color: "#1572B6", text: "#FFFFFF" },
  JavaScript: { slug: "javascript", color: "#F7DF1E", text: "#111827" },
  React: { slug: "react", color: "#61DAFB", text: "#0F172A" },
  Bootstrap: { slug: "bootstrap", color: "#7952B3", text: "#FFFFFF" },
  "Tailwind CSS": { slug: "tailwindcss", color: "#06B6D4", text: "#0F172A" },
  WordPress: { slug: "wordpress", color: "#21759B", text: "#FFFFFF" },
  GitHub: { slug: "github", color: "#111827", text: "#FFFFFF" },
  "VS Code": { slug: "visualstudiocode", color: "#007ACC", text: "#FFFFFF" },
  Figma: { slug: "figma", color: "#A259FF", text: "#FFFFFF" },
  "Framer Motion": { slug: "framer", color: "#0055FF", text: "#FFFFFF" },
  "Responsive Design": { slug: "googlechrome", color: "#0EA5E9", text: "#FFFFFF" },
  "Responsive Layouts": { slug: "googlechrome", color: "#0EA5E9", text: "#FFFFFF" },
  "UI Animation": { slug: "framer", color: "#0055FF", text: "#FFFFFF" },
  "Component Reusability": { slug: "react", color: "#61DAFB", text: "#0F172A" },
  "Clean Semantic Markup": { slug: "html5", color: "#E34F26", text: "#FFFFFF" },
  "Performance-minded Styling": { slug: "css3", color: "#1572B6", text: "#FFFFFF" },
  "Cross-device Testing": { slug: "googlechrome", color: "#4285F4", text: "#FFFFFF" },
  "Chrome DevTools": { slug: "googlechrome", color: "#4285F4", text: "#FFFFFF" },
};

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

function fallbackIconUrl(item) {
  if (item.includes("React")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
  if (item.includes("JavaScript")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
  if (item.includes("HTML")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
  if (item.includes("CSS")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
  if (item.includes("Tailwind")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg";
  if (item.includes("Bootstrap")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg";
  if (item.includes("WordPress")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg";
  if (item.includes("GitHub")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg";
  if (item.includes("VS Code")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg";
  if (item.includes("Figma")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg";
  if (item.includes("Framer")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg";
  return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codepen/codepen-plain.svg";
}

export default function ShowcaseSection({
  skills,
  toolboxCards,
  projects,
  certificates,
}) {
  const [activeTab, setActiveTab] = useState("projects");
  const [tabsVisible, setTabsVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY.current;

      if (Math.abs(delta) > 8) {
        if (delta < 0 && currentY > 420) {
          setTabsVisible(false);
        } else {
          setTabsVisible(true);
        }
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stackSections = useMemo(() => {
    const technologies = toolboxCards.find((card) => card.title === "Technologies")?.items || [];
    const frontendSkills = toolboxCards.find((card) => card.title === "Frontend Skills")?.items || [];
    const cmsTools = toolboxCards.find((card) => card.title === "CMS & Tools")?.items || [];

    return [
      { title: "Technologies", items: [...new Set([...(skills || []), ...technologies])] },
      { title: "Skills", items: [...new Set(frontendSkills)] },
      { title: "CMS & Tools", items: [...new Set(cmsTools)] },
    ];
  }, [skills, toolboxCards]);

  return (
    <section id="showcase" className="scroll-mt-28 py-16">
      <div id="skills" className="scroll-mt-28" />
      <div id="toolbox" className="scroll-mt-28" />
      <div id="momentum" className="scroll-mt-28" />
      <div id="projects" className="scroll-mt-28" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mb-8 text-center"
      >
        <h2 className="font-display text-4xl font-bold md:text-5xl">My Services</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          Solution-crafted services for modern websites: React frontend, WordPress builds,
          responsive UI/UX, clean animations, and practical delivery for real client projects.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {serviceShowcaseCards.map((service, index) => {
          const Icon = serviceIcons[index] ?? Wrench;
          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.01 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6"
              style={{ "--surface-accent": serviceAccents[index] ?? "#38BDF8" }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, color-mix(in srgb, var(--surface-accent) 26%, transparent), transparent 60%)",
                }}
              />
              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-2xl border border-border bg-background/70 p-3 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={24} />
                </div>
                <h3 className="font-display text-xl font-bold md:text-2xl">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {service.deliverables.map((item) => (
                    <span
                      key={`${service.title}-${item}`}
                      className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-14 text-center"
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          <Sparkles size={13} />
          Portfolio Showcase
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold md:text-4xl">Projects, Certificates & Tech Stack</h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`sticky top-24 z-30 mx-auto mt-8 w-full max-w-xl rounded-2xl border border-border bg-background/85 p-2 backdrop-blur-xl transition-all duration-300 ${
          tabsVisible
            ? "translate-y-0 scale-100 rotate-0 opacity-100 blur-0"
            : "-translate-y-14 scale-95 rotate-1 opacity-0 blur-[2px]"
        }`}
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-w-[118px] rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                  selected
                    ? "bg-primary text-primary-foreground shadow-[0_10px_22px_rgba(14,165,233,0.28)]"
                    : "bg-card text-muted-foreground hover:-translate-y-0.5 hover:bg-primary/15 hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="panel-projects"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="grid gap-5 lg:grid-cols-2"
            >
              {projects.map((project, index) => {
                const theme = getProjectTheme(project.title);
                return (
                  <motion.article
                    key={project.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -9, scale: 1.01 }}
                    transition={{ delay: index * 0.06, duration: 0.32, ease: "easeOut" }}
                    className="project-brand-card transform-gpu group relative overflow-hidden rounded-3xl border border-border bg-card p-6"
                    style={{
                      "--project-bg": theme.color,
                      "--project-fg": theme.text,
                      "--project-icon-filter": theme.text === "#FFFFFF" ? "brightness(0) invert(1)" : "none",
                    }}
                  >
                    <div className="project-on-hover mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary transition-colors duration-300">
                      Case Study
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="project-on-hover font-display text-2xl font-bold transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="project-on-hover inline-flex rounded-lg border border-border bg-background/80 p-2 transition-colors duration-300">
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

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((item) => {
                        const tech = techMeta[item] ?? { slug: "codefactor", color: "#64748B", text: "#FFFFFF" };
                        return (
                          <span
                            key={`${project.title}-${item}`}
                            className="brand-chip inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium"
                            style={{
                              "--brand-bg": tech.color,
                              "--brand-fg": tech.text,
                              "--brand-icon-filter": tech.text === "#FFFFFF" ? "brightness(0) invert(1)" : "none",
                            }}
                          >
                            <img
                              src={iconUrl(tech.slug, tech.color)}
                              alt={`${item} icon`}
                              loading="lazy"
                              decoding="async"
                              onError={(event) => {
                                event.currentTarget.src = fallbackIconUrl(item);
                              }}
                              className="brand-icon h-3.5 w-3.5"
                            />
                            {item}
                          </span>
                        );
                      })}
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-on-hover mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform duration-300 hover:scale-105"
                    >
                      View Project <ExternalLink size={14} />
                    </a>

                    <div
                      className="project-glow-orb pointer-events-none absolute -right-12 -top-14 h-32 w-32 rounded-full blur-lg transition-opacity duration-300 group-hover:opacity-100"
                      style={{ backgroundColor: `${theme.color}66` }}
                    />
                  </motion.article>
                );
              })}
            </motion.div>
          )}

          {activeTab === "certificates" && (
            <motion.div
              key="panel-certificates"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="grid gap-6 md:grid-cols-2"
            >
              {certificates.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-3xl border border-border bg-card">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={`${item.title} certificate`}
                      loading="lazy"
                      className="h-56 w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.src = "/certificates/internee-certificate.svg";
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <p className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {item.issuer} | {item.period}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                    <a
                      href={item.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                    >
                      View / Verify <ExternalLink size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </motion.div>
          )}

          {activeTab === "stack" && (
            <motion.div
              key="panel-stack"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="space-y-4"
            >
              {stackSections.map((section, index) => (
                <motion.article
                  key={section.title}
                  initial={{ opacity: 0, y: 18, rotateX: -84 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                  className="rounded-3xl border border-border bg-card p-5 [transform-style:preserve-3d]"
                >
                  <h3 className="mb-4 font-display text-2xl font-bold">{section.title}</h3>
                  <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {section.items.map((item) => {
                      const meta = techMeta[item] ?? { slug: "codefactor", color: "#64748B", text: "#FFFFFF" };
                      return (
                        <motion.article
                          key={`${section.title}-${item}`}
                          whileHover={{ y: -4, scale: 1.03 }}
                          className="brand-chip flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-background p-3 text-center"
                          style={{
                            "--brand-bg": meta.color,
                            "--brand-fg": meta.text,
                            "--brand-icon-filter": meta.text === "#FFFFFF" ? "brightness(0) invert(1)" : "none",
                          }}
                        >
                          <img
                            src={iconUrl(meta.slug, meta.color)}
                            alt={`${item} icon`}
                            loading="lazy"
                            decoding="async"
                            onError={(event) => {
                              event.currentTarget.src = fallbackIconUrl(item);
                            }}
                            className="brand-icon h-10 w-10"
                          />
                          <span className="text-xs font-semibold leading-tight">{item}</span>
                        </motion.article>
                      );
                    })}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
