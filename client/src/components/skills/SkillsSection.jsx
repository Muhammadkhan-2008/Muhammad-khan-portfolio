import { motion } from "framer-motion";
import { Briefcase, Code2, Rocket, Sparkles } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const serviceIcons = [Code2, Rocket, Briefcase];
const serviceAccents = ["#38BDF8", "#14B8A6", "#8B5CF6"];

const skillMeta = {
  HTML5: { slug: "html5", color: "#E34F26", text: "#FFFFFF" },
  CSS3: { slug: "css3", color: "#1572B6", text: "#FFFFFF" },
  JavaScript: { slug: "javascript", color: "#F7DF1E", text: "#111827" },
  React: { slug: "react", color: "#61DAFB", text: "#0F172A" },
  Bootstrap: { slug: "bootstrap", color: "#7952B3", text: "#FFFFFF" },
  "Tailwind CSS": { slug: "tailwindcss", color: "#06B6D4", text: "#0F172A" },
  WordPress: { slug: "wordpress", color: "#21759B", text: "#FFFFFF" },
  "Framer Motion": { slug: "framer", color: "#0055FF", text: "#FFFFFF" },
  "Responsive Design": { slug: "googlechrome", color: "#0EA5E9", text: "#FFFFFF" },
  GitHub: { slug: "github", color: "#181717", text: "#FFFFFF" },
};

function iconUrl(slug, color) {
  return `https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`;
}

function fallbackIconUrl(skill) {
  if (skill === "React") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
  }
  if (skill === "JavaScript") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
  }
  if (skill === "HTML5") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
  }
  if (skill === "CSS3") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
  }
  if (skill === "Bootstrap") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg";
  }
  if (skill === "Tailwind CSS") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg";
  }
  if (skill === "WordPress") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg";
  }
  if (skill === "GitHub") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg";
  }

  return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codepen/codepen-plain.svg";
}

export default function SkillsSection({ services, skills }) {
  return (
    <section id="skills" className="scroll-mt-28 py-16">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mb-8"
      >
        <motion.p
          variants={fadeInUp}
          className="inline-flex items-center gap-2 rounded-full border border-sky-300/60 bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:border-sky-400/30 dark:bg-sky-500/15 dark:text-sky-300"
        >
          <Sparkles size={13} />
          What I Do
        </motion.p>
        <motion.h2 variants={fadeInUp} className="mt-2 font-display text-4xl font-bold md:text-5xl">
          Services and Skill Stack
        </motion.h2>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-3">
        {services.map((service, index) => {
          const Icon = serviceIcons[index] ?? Code2;
          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.01 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="brand-surface hover-glass transform-gpu rounded-3xl border border-border bg-card p-7"
              style={{
                "--surface-accent": serviceAccents[index] ?? "#38BDF8",
                "--surface-text": "#ffffff",
              }}
            >
              <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                <Icon size={24} />
              </div>
              <h3 className="font-display text-2xl font-bold">{service.title}</h3>
              <p className="mt-3 text-muted-foreground">{service.description}</p>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        viewport={{ once: true }}
        className="mt-8 transform-gpu rounded-3xl border border-border bg-card p-6"
      >
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => {
            const meta = skillMeta[skill] ?? { slug: "codefactor", color: "#64748B", text: "#FFFFFF" };
            return (
              <span
                key={skill}
                className="brand-chip inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold transition-all duration-300"
                style={{
                  "--brand-bg": meta.color,
                  "--brand-fg": meta.text,
                  "--brand-icon-filter": meta.text === "#FFFFFF" ? "brightness(0) invert(1)" : "brightness(0) saturate(100%)",
                }}
              >
                <img
                  src={iconUrl(meta.slug, meta.color)}
                  alt={`${skill} icon`}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.src = fallbackIconUrl(skill);
                  }}
                  className="brand-icon h-4 w-4 transition-transform duration-300"
                />
                <span>{skill}</span>
              </span>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
