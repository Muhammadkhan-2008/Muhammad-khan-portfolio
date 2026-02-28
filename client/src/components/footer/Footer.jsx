import { Facebook, Github, Instagram, Linkedin, MessageCircle, Twitter } from "lucide-react";

export default function Footer({ socialLinks, whatsappHref }) {
  return (
    <footer className="border-t border-border/70 pb-24 pt-8">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-5 md:px-8">
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-border bg-card p-3 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-[#0A66C2] hover:text-white hover:shadow-lg hover:shadow-[#0A66C2]/30"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>

        <a
          href={socialLinks.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-border bg-card p-3 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-black/25 dark:hover:bg-white dark:hover:text-black"
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-border bg-card p-3 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-[#25D366] hover:text-white hover:shadow-lg hover:shadow-[#25D366]/30"
          aria-label="WhatsApp"
        >
          <MessageCircle size={18} />
        </a>

        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-border bg-card p-3 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-[#1877F2] hover:text-white hover:shadow-lg hover:shadow-[#1877F2]/30"
          aria-label="Facebook"
        >
          <Facebook size={18} />
        </a>

        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-border bg-card p-3 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-[#E1306C] hover:text-white hover:shadow-lg hover:shadow-[#E1306C]/30"
          aria-label="Instagram"
        >
          <Instagram size={18} />
        </a>

        <a
          href={socialLinks.x}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-border bg-card p-3 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-[#1DA1F2] hover:text-white hover:shadow-lg hover:shadow-[#1DA1F2]/30"
          aria-label="X.com"
        >
          <Twitter size={18} />
        </a>
      </div>
      <p className="pt-5 text-center text-sm text-muted-foreground">
        Built with love <span className="hover:animate-ping">❤️</span>  and a cup of tea <span className="hover:animate-ping">🍵</span> .
      </p>
    </footer>
  );
}