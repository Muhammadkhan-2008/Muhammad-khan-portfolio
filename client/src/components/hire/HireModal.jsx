import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function HireModal({
  hireForm,
  setHireForm,
  onClose,
  onSubmit,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 22, scale: 0.96 }}
        className="w-full max-w-xl rounded-3xl border border-border bg-background p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Hire Me</p>
            <h3 className="mt-1 font-display text-3xl font-bold">Project Details Form</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill this form and it will open WhatsApp with all details to send.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-border bg-card p-2"
            aria-label="Close hire form"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              type="text"
              required
              placeholder="Your Name"
              value={hireForm.name}
              onChange={(event) => setHireForm({ ...hireForm, name: event.target.value })}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none ring-primary/40 transition focus:ring"
            />
            <input
              type="text"
              required
              placeholder="Phone Number"
              value={hireForm.phone}
              onChange={(event) => setHireForm({ ...hireForm, phone: event.target.value })}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none ring-primary/40 transition focus:ring"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              type="text"
              required
              placeholder="Project Type (Website, Landing Page...)"
              value={hireForm.projectType}
              onChange={(event) => setHireForm({ ...hireForm, projectType: event.target.value })}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none ring-primary/40 transition focus:ring"
            />
            <input
              type="text"
              required
              placeholder="Budget (USD/PKR)"
              value={hireForm.budget}
              onChange={(event) => setHireForm({ ...hireForm, budget: event.target.value })}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none ring-primary/40 transition focus:ring"
            />
          </div>
          <input
            type="text"
            required
            placeholder="Timeline (e.g. 2 weeks)"
            value={hireForm.timeline}
            onChange={(event) => setHireForm({ ...hireForm, timeline: event.target.value })}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none ring-primary/40 transition focus:ring"
          />
          <textarea
            required
            rows={4}
            placeholder="Write complete project details..."
            value={hireForm.details}
            onChange={(event) => setHireForm({ ...hireForm, details: event.target.value })}
            className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none ring-primary/40 transition focus:ring"
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:brightness-105"
          >
            Send to WhatsApp <MessageCircle size={17} />
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
