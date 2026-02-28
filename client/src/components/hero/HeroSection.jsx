import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Sparkles } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const fullName = "MUHAMMAD KHAN";

export default function HeroSection({ onNavigate, onResumeClick, theme }) {
  const [imageActive, setImageActive] = useState(false);
  const [typedName, setTypedName] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    if (theme !== "light") {
      setTypedName("");
      setPhase("typing");
      return undefined;
    }

    let timeoutId;

    if (phase === "typing") {
      if (typedName.length < fullName.length) {
        timeoutId = setTimeout(() => {
          setTypedName(fullName.slice(0, typedName.length + 1));
        }, 120);
      } else {
        timeoutId = setTimeout(() => setPhase("hold"), 5000);
      }
    } else if (phase === "hold") {
      timeoutId = setTimeout(() => setPhase("deleting"), 80);
    } else if (phase === "deleting") {
      if (typedName.length > 0) {
        timeoutId = setTimeout(() => {
          setTypedName(fullName.slice(0, typedName.length - 1));
        }, 70);
      } else {
        timeoutId = setTimeout(() => setPhase("typing"), 300);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [phase, theme, typedName]);

  return (
    <section id="home" className="scroll-mt-28 py-14">
      <div className="hero-stack grid">
        <motion.div
          initial={false}
          animate={{
            opacity: theme === "light" ? 1 : 0,
            y: theme === "light" ? 0 : 8,
            scale: theme === "light" ? 1 : 0.99,
          }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: theme === "light" ? "auto" : "none" }}
          aria-hidden={theme !== "light"}
          className="hero-panel [grid-area:1/1]"
        >
          <div className="w-full rounded-[2.25rem] border border-sky-200/80 bg-gradient-to-br from-white via-sky-50 to-emerald-50 px-6 py-10 shadow-[0_22px_65px_rgba(14,116,144,0.12)] md:px-10 lg:px-12">
            <div className="grid items-center gap-10 lg:grid-cols-[20rem_1fr]">
              <div className="mx-auto">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-sky-200/60 blur-2xl" />
                  <div className="absolute -inset-8 rounded-full border border-sky-300/50" />
                  <img
                    src="/1.jpg"
                    alt="Muhammad Khan portrait"
                    className="relative z-10 h-64 w-64 rounded-full border-4 border-white object-cover object-top shadow-2xl shadow-sky-300/45"
                  />
                </div>
              </div>

              <div className="space-y-6 text-center lg:text-left">
                <p className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
                  <Sparkles size={14} /> Frontend Developer
                </p>

                <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  <span className="typing-caret">{typedName || "\u00A0"}</span>
                </h1>

                <p className="max-w-3xl text-base leading-relaxed text-slate-700 md:text-lg lg:max-w-2xl">
                  I am Muhammad Khan, working with HTML, CSS, JavaScript, React, Bootstrap,
                  Tailwind CSS, and WordPress for 5+ months, focused on eye-catching,
                  responsive frontend websites.
                </p>

                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                  <button
                    onClick={() => onNavigate("projects")}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-700 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-sky-800"
                  >
                    Explore Projects <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => onNavigate("contact")}
                    className="rounded-full border border-sky-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    Contact Me
                  </button>

                  <button
                    onClick={onResumeClick}
                    className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-100 px-7 py-3.5 text-sm font-semibold text-sky-900 transition-colors hover:bg-sky-200"
                  >
                    Resume <FileText size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            opacity: theme === "dark" ? 1 : 0,
            y: theme === "dark" ? 0 : 8,
            scale: theme === "dark" ? 1 : 0.99,
          }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: theme === "dark" ? "auto" : "none" }}
          aria-hidden={theme !== "dark"}
          className="hero-panel [grid-area:1/1]"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-7">
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"
              >
                <Sparkles size={14} className="text-primary" />
                <span className="text-[#61DAFB]">React</span> + <span className="text-[#38BDF8]">Tailwind</span> + <span className="text-[#F7DF1E]">JavaScript</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-display text-5xl font-extrabold leading-[1.03] text-foreground sm:text-6xl lg:text-7xl"
              >
                Crafting Stunning
                <span className="animated-gradient-text mt-2 block">Digital Experiences.</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                I am Muhammad Khan, working with HTML, CSS, JavaScript, React, Bootstrap,
                Tailwind CSS, and WordPress for 5+ months, focused on eye-catching,
                responsive frontend websites.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate("projects")}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30"
                >
                  Explore Projects <ArrowRight size={16} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate("contact")}
                  className="rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-border/50"
                >
                  Contact Me
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onResumeClick}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  Resume <FileText size={16} />
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-md"
            >
              <motion.div
                whileHover={{ y: -4 }}
                className="bounce-top absolute -left-8 top-14 hidden rounded-2xl border border-border bg-card px-4 py-2 text-xs font-semibold shadow-lg md:block z-10"
              >
                Open for Frontend Work
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bounce-top absolute -right-6 bottom-12 hidden rounded-2xl border border-border bg-card px-4 py-2 text-xs font-semibold shadow-lg md:block z-10"
                style={{ animationDelay: "0.5s" }}
              >
                5+ Months Practice
              </motion.div>

              <motion.button
                type="button"
                onClick={() => setImageActive((prev) => !prev)}
                whileHover={{ scale: 1.03, rotate: 1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative block w-full overflow-hidden rounded-[2rem] border p-3 text-left shadow-[0_20px_70px_rgba(15,23,42,0.35)] ${
                  imageActive ? "border-primary/60 ring-2 ring-primary/40" : "border-white/25"
                } bg-gradient-to-br from-card to-card/70`}
                aria-label="Toggle profile card effect"
              >
                <img
                  src="/1.png"
                  alt="Muhammad Khan portrait"
                  className={`h-[520px] w-full rounded-[1.5rem] object-cover object-top transition-transform duration-500 ${
                    imageActive ? "scale-[1.03]" : "scale-100"
                  }`}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/35 px-5 py-4 text-white backdrop-blur-md transition-all duration-300">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-200">Frontend Developer</p>
                  <p className="mt-1 text-xl font-bold">React | Tailwind | WordPress</p>
                  <p className="mt-1 text-xs text-slate-300">Click image to toggle focus effect</p>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
