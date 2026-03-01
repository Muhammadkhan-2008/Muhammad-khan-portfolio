import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Github, Linkedin, Mail, Phone } from "lucide-react";

export default function ContactSection({ form, setForm, onSubmit, sending, sent }) {
  return (
    <section id="contact" className="scroll-mt-28 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-[2rem] border border-border bg-card p-6 md:p-10"
      >
        <div className="grid gap-9 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contact</p>
            <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Let us build something sharp</h2>
            <p className="mt-4 text-muted-foreground">
              Available for frontend projects, portfolio websites, and WordPress-based business pages.
            </p>

            <div className="mt-7 space-y-4 text-sm font-medium">
              <a href="mailto:khanmuhammadkolachi390@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                <Mail size={17} /> khanmuhammadkolachi390@gmail.com
              </a>
              <a href="tel:+923163347485" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                <Phone size={17} /> +92 316 3347485
              </a>
              <a
                href="https://github.com/Muhammadkhan-2008"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
              >
                <Github size={17} /> github.com/Muhammadkhan-2008
              </a>
              <a
                href="https://linkedin.com/in/muhammad-khan-82677439b"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
              >
                <Linkedin size={17} /> LinkedIn Profile
              </a>
            </div>
          </div>

          <div className="relative">
            {sent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl border border-emerald-500/30 bg-background/90 text-center backdrop-blur"
              >
                <CheckCircle2 className="mb-3 text-emerald-500" size={42} />
                <p className="font-display text-2xl font-bold">Opening WhatsApp</p>
                <p className="mt-2 text-sm text-muted-foreground">Your details are ready. Tap Send in WhatsApp.</p>
              </motion.div>
            )}

            <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 md:p-6">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-muted-foreground">Name</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 outline-none ring-primary/40 transition-all duration-300 focus:border-primary/40 focus:ring"
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium text-muted-foreground">Email</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 outline-none ring-primary/40 transition-all duration-300 focus:border-primary/40 focus:ring"
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium text-muted-foreground">Message</span>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 outline-none ring-primary/40 transition-all duration-300 focus:border-primary/40 focus:ring"
                />
              </label>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-75"
              >
                {sending ? "Sending..." : "Send Message"}
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
