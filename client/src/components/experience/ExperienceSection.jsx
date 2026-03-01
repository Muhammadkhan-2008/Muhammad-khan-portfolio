import { motion } from "framer-motion";
import { BriefcaseBusiness, Link2 } from "lucide-react";

export default function ExperienceSection({ journey }) {
  const renderCompany = (item) => {
    if (item.companyKey === "internee") {
      return (
        <span className="mt-1 inline-flex items-center rounded-md border border-emerald-400/35 bg-white px-2.5 py-0.5 text-sm font-black tracking-tight shadow-sm font-['Poppins']">
          <span className="text-emerald-500">Internee</span>
          <span className="text-black">.pk</span>
        </span>
      );
    }

    if (item.companyKey === "codealpha") {
      return (
        <span className="mt-1 inline-flex rounded-md bg-white px-2.5 py-0.5 text-xs font-bold text-black shadow-sm">
          CodeAlpha
        </span>
      );
    }

    return <p className="mt-1 text-sm font-semibold text-muted-foreground">{item.company}</p>;
  };

  const getProjectLinkClass = (companyKey) => {
    if (companyKey === "internee") {
      return "text-emerald-600 underline decoration-emerald-500/40 underline-offset-4 transition-colors hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300";
    }

    if (companyKey === "personal") {
      return "text-slate-700 underline decoration-slate-500/45 underline-offset-4 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100";
    }

    return "text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-foreground";
  };

  return (
    <section id="experience" className="scroll-mt-28 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-violet-300/60 bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:border-violet-400/35 dark:bg-violet-500/15 dark:text-violet-300">
          <BriefcaseBusiness size={13} />
          Experience
        </p>
        <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Professional Journey</h2>
      </motion.div>

      <div className="space-y-6">
        {journey.map((item, index) => (
          <motion.article
            key={item.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -6, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
            className="brand-surface transform-gpu rounded-3xl border border-border bg-card p-6"
            style={{
              "--surface-accent":
                item.companyKey === "internee" ? "#22C55E" : item.companyKey === "codealpha" ? "#0EA5E9" : "#64748B",
              "--surface-text": "#FFFFFF",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">{item.duration}</p>
            <h3 className="mt-2 font-display text-2xl font-bold">{item.role}</h3>
            {renderCompany(item)}
            <p className="mt-3 text-muted-foreground">{item.description}</p>
            {Array.isArray(item.projectLinks) && item.projectLinks.length > 0 && (
              <ul className="mt-4 space-y-1.5 text-sm">
                {item.projectLinks.map((project) => (
                  <li key={project.name}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 ${getProjectLinkClass(item.companyKey)}`}
                    >
                      <Link2 size={14} />
                      {project.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
