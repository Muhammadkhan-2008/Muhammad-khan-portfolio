import { motion } from "framer-motion";
import { Download, Eye, FileText, FileType2, X } from "lucide-react";

export default function ResumeActionModal({
  onClose,
  onRead,
  onDownload,
  downloadFormat,
  onFormatChange,
  autoOpenAfterDownload,
  onAutoOpenChange,
  downloading,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold">Resume Options</h3>
          <button
            onClick={onClose}
            className="rounded-lg border border-border bg-background p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close resume options"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid gap-3">
          <button
            onClick={onRead}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110"
          >
            Read Resume <Eye size={16} />
          </button>

          <div className="rounded-xl border border-border bg-background p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Download Format
            </p>
            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => onFormatChange("pdf")}
                className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  downloadFormat === "pdf"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card hover:bg-muted"
                }`}
              >
                PDF <FileType2 size={16} />
              </button>
              <button
                type="button"
                onClick={() => onFormatChange("docx")}
                className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  downloadFormat === "docx"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card hover:bg-muted"
                }`}
              >
                DOCX <FileText size={16} />
              </button>
            </div>

            <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={autoOpenAfterDownload}
                onChange={(event) => onAutoOpenChange(event.target.checked)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              Auto open after download
            </label>
          </div>

          <button
            onClick={onDownload}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-70"
          >
            {downloading ? "Preparing file..." : `Download as ${downloadFormat.toUpperCase()}`}
            <Download size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
