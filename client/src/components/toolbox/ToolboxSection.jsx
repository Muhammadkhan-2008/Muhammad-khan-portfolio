import { motion } from "framer-motion";
import { Boxes, BrainCircuit, Sparkles, Wrench } from "lucide-react";

const cardIcons = [Boxes, BrainCircuit, Wrench];
const cardAccents = ["#14B8A6", "#8B5CF6", "#0EA5E9"];

const itemMeta = {
  HTML5: { slug: "html5", color: "#E34F26", text: "#FFFFFF" },
  CSS3: { slug: "css3", color: "#1572B6", text: "#FFFFFF" },
  JavaScript: { slug: "javascript", color: "#F7DF1E", text: "#111827" },
  React: { slug: "react", color: "#61DAFB", text: "#0F172A" },
  Bootstrap: { slug: "bootstrap", color: "#7952B3", text: "#FFFFFF" },
  "Tailwind CSS": { slug: "tailwindcss", color: "#06B6D4", text: "#0F172A" },
  "Responsive Layouts": { slug: "googlechrome", color: "#0EA5E9", text: "#FFFFFF" },
  "UI Animation": { slug: "framer", color: "#0055FF", text: "#FFFFFF" },
  "Component Reusability": { slug: "react", color: "#61DAFB", text: "#0F172A" },
  "Clean Semantic Markup": { slug: "html5", color: "#E34F26", text: "#FFFFFF" },
  "Performance-minded Styling": { slug: "css3", color: "#1572B6", text: "#FFFFFF" },
  "Cross-device Testing": { slug: "googlechrome", color: "#4285F4", text: "#FFFFFF" },
  WordPress: { slug: "wordpress", color: "#21759B", text: "#FFFFFF" },
  GitHub: { slug: "github", color: "#181717", text: "#FFFFFF" },
  "VS Code": { slug: "visualstudiocode", color: "#007ACC", text: "#FFFFFF" },
  "Framer Motion": { slug: "framer", color: "#0055FF", text: "#FFFFFF" },
  Figma: { slug: "figma", color: "#A259FF", text: "#FFFFFF" },
  "Chrome DevTools": { slug: "googlechrome", color: "#4285F4", text: "#FFFFFF" },
};

function iconUrl(slug, color) {
  return `https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`;
}

function fallbackIconUrl(item) {
  if (item === "VS Code") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg";
  }
  if (item === "GitHub") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg";
  }
  if (item === "WordPress") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg";
  }
  if (item === "React" || item === "Component Reusability") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
  }
  if (item === "JavaScript" || item === "UI Animation") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
  }
  if (item === "Tailwind CSS") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg";
  }
  if (item === "HTML5" || item === "Clean Semantic Markup") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
  }
  if (item === "CSS3" || item === "Performance-minded Styling") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
  }
  if (item === "Bootstrap") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg";
  }
  if (item === "Chrome DevTools" || item === "Cross-device Testing") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg";
  }
  if (item === "Figma") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg";
  }
  if (item === "Framer Motion") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg";
  }

  return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codepen/codepen-plain.svg";
}

export default function ToolboxSection({ toolboxCards }) {
  return (
    <section id="toolbox" className="scroll-mt-28 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300">
          <Sparkles size={13} />
          My Stack Overview
        </p>
        <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Technologies, Skills, CMS & Tools</h2>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-3">
        {toolboxCards.map((card, index) => {
          const Icon = cardIcons[index] ?? Boxes;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="brand-surface hover-glass transform-gpu rounded-3xl border border-border bg-card p-6"
              style={{
                "--surface-accent": cardAccents[index] ?? "#0EA5E9",
                "--surface-text": "#ffffff",
              }}
            >
              <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-2xl font-bold">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {card.items.map((item) => {
                  const meta = itemMeta[item] ?? { slug: "codefactor", color: "#64748B", text: "#FFFFFF" };
                  return (
                    <span
                      key={item}
                      className="brand-chip inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground/90"
                      style={{
                        "--brand-bg": meta.color,
                        "--brand-fg": meta.text,
                        "--brand-icon-filter": meta.text === "#FFFFFF" ? "brightness(0) invert(1)" : "brightness(0) saturate(100%)",
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
                        className="brand-icon h-3.5 w-3.5 transition-transform duration-300"
                      />
                      <span>{item}</span>
                    </span>
                  );
                })}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
