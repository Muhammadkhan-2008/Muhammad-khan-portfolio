import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";

export default function Header({ navItems, theme, onToggleTheme, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (id) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5 md:px-8">
          <button
            onClick={() => handleNavigate("home")}
            className="font-display text-2xl font-extrabold tracking-tight"
          >
            M<span className="text-primary">.</span>Khan
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={onToggleTheme}
              className="rounded-xl border border-border bg-card p-2.5 text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onToggleTheme}
              className="rounded-xl border border-border bg-card p-2.5 text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="rounded-xl border border-border bg-card p-2.5"
              aria-label="Toggle mobile menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            className="fixed inset-0 z-40 bg-background/95 px-8 pb-10 pt-28 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="text-left font-display text-3xl font-bold"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
