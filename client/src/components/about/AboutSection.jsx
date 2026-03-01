import { motion } from "framer-motion";

export default function AboutSection({ stats }) {
  return (
    <section id="about" className="scroll-mt-28 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-[2rem] border border-border/70 bg-card/80 p-8 shadow-sm md:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">About Me</p>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              I design and build polished frontend experiences with practical real-world stacks.
            </h2>
            <p className="mt-5 max-w-3xl text-muted-foreground">
              My core focus is responsive layout, performance, and intentional motion. I currently
              work on HTML, CSS, JavaScript, React, Bootstrap, Tailwind CSS, and WordPress projects.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((item) => (
              <div key={item.label} className="hover-glass rounded-2xl border border-border bg-background/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10">
                <p className="font-display text-3xl font-extrabold text-primary">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
