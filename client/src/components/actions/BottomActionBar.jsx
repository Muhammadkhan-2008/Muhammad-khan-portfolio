import { motion } from "framer-motion";
import { MessageCircle, Rocket } from "lucide-react";

export default function BottomActionBar({ onHireClick, onWhatsAppClick }) {
  return (
    <div className="fixed bottom-4 left-1/2 z-[70] w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded-2xl border border-border/80 bg-background/90 p-2 shadow-xl backdrop-blur-md">
      <div className="grid grid-cols-2 gap-2">
        <motion.button
          onClick={onHireClick}
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="action-glow inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
        >
          Hire Me <Rocket size={16} />
        </motion.button>
        <motion.button
          onClick={onWhatsAppClick}
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold"
        >
          WhatsApp <MessageCircle size={16} />
        </motion.button>
      </div>
    </div>
  );
}
