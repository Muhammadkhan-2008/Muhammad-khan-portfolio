import { motion } from "framer-motion";
import { Gauge, Sparkles, TrendingUp } from "lucide-react";

export default function MomentumSection({ momentum }) {
  return (
    <section id="momentum" className="scroll-mt-28 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/60 bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700 dark:border-cyan-400/35 dark:bg-cyan-500/15 dark:text-cyan-300">
          <Sparkles size={13} />
          New Section
        </p>
        <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Skill Momentum</h2>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="brand-surface transform-gpu rounded-3xl border border-border bg-card p-7"
          style={{ "--surface-accent": "#06B6D4", "--surface-text": "#FFFFFF" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Gauge size={13} />
            Current Focus
          </p>
          <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
            Building stronger frontend depth every week.
          </h3>
          <p className="mt-4 text-muted-foreground">
            This section highlights my practical stack progression through consistent
            project-based learning and animation practice.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-background p-4 transition-colors duration-300 dark:hover:border-cyan-300/60 dark:hover:bg-cyan-500/20">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Experience</p>
              <p className="mt-1 font-display text-3xl font-bold text-primary">5+ mo</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4 transition-colors duration-300 dark:hover:border-cyan-300/60 dark:hover:bg-cyan-500/20">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Tools</p>
              <p className="mt-1 font-display text-3xl font-bold text-primary">7+</p>
            </div>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="brand-surface transform-gpu rounded-3xl border border-border bg-card p-7"
          style={{ "--surface-accent": "#3B82F6", "--surface-text": "#FFFFFF" }}
        >
          <div className="space-y-5">
            {momentum.map((item, index) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <TrendingUp size={14} className="text-primary/80" />
                    {item.name}
                  </span>
                  <span className="text-muted-foreground">{item.level}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: item.level / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, delay: index * 0.08 }}
                    style={{ transformOrigin: "left center" }}
                    className="h-full w-full rounded-full bg-gradient-to-r from-primary to-slate-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
