import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default function ResumeSection({ resumeData }) {
  const downloadResumeDoc = () => {
    const experiencesHtml = resumeData.experience
      .map(
        (item) => `
          <div style="margin-bottom:14px;">
            <div style="font-weight:700; font-size:13pt;">${escapeHtml(item.title)} - ${escapeHtml(item.company)}</div>
            <div style="font-size:10.5pt; color:#555;">${escapeHtml(item.period)}</div>
            <ul style="margin:6px 0 0 18px; padding:0;">
              ${item.points.map((point) => `<li style="margin-bottom:4px;">${escapeHtml(point)}</li>`).join("")}
            </ul>
          </div>
        `,
      )
      .join("");

    const techHtml = resumeData.technologies.map((item) => escapeHtml(item)).join(", ");
    const highlightsHtml = resumeData.highlights.map((item) => `<li style="margin-bottom:4px;">${escapeHtml(item)}</li>`).join("");

    const documentHtml = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>${escapeHtml(resumeData.name)} Resume</title>
          <style>
            body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #111; margin: 34px; line-height: 1.45; }
            h1 { margin: 0; font-size: 24pt; letter-spacing: 0.3px; }
            h2 { margin: 20px 0 8px; font-size: 13pt; text-transform: uppercase; border-bottom: 1px solid #d5d5d5; padding-bottom: 5px; }
            .muted { color: #555; }
            .topline { margin-top: 5px; font-size: 10.5pt; color: #444; }
            p { margin: 8px 0; }
            ul { margin: 6px 0 0 18px; padding: 0; }
            li { margin-bottom: 4px; }
          </style>
        </head>
        <body>
          <h1>${escapeHtml(resumeData.name)}</h1>
          <div class="topline">${escapeHtml(resumeData.role)} | ${escapeHtml(resumeData.location)}</div>
          <div class="topline">${escapeHtml(resumeData.phone)} | ${escapeHtml(resumeData.email)}</div>
          <div class="topline">${escapeHtml(resumeData.github)} | ${escapeHtml(resumeData.linkedin)}</div>

          <h2>Professional Summary</h2>
          <p>${escapeHtml(resumeData.summary)}</p>

          <h2>Technologies</h2>
          <p>${techHtml}</p>

          <h2>Experience</h2>
          ${experiencesHtml}

          <h2>Project Highlights</h2>
          <ul>${highlightsHtml}</ul>
        </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", documentHtml], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Muhammad-Khan-Resume.doc";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="resume" className="scroll-mt-28 py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Resume</p>
          <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Professional Resume</h2>
        </div>

        <button
          onClick={downloadResumeDoc}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110"
        >
          Download Resume <Download size={16} />
        </button>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm md:p-10"
      >
        <div className="mx-auto max-w-4xl rounded-md border border-zinc-200 bg-white p-6 text-zinc-900 shadow-[0_16px_38px_rgba(0,0,0,0.08)] md:p-10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-700">
            <div>
              <h3 className="font-serif text-3xl font-bold tracking-tight">{resumeData.name}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{resumeData.role}</p>
            </div>
            <div className="text-right text-xs text-zinc-600 dark:text-zinc-300">
              <p>{resumeData.phone}</p>
              <p>{resumeData.email}</p>
              <p>{resumeData.github}</p>
              <p>{resumeData.linkedin}</p>
            </div>
          </div>

          <div className="space-y-6 text-sm">
            <section>
              <h4 className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-300">
                <FileText size={14} /> Professional Summary
              </h4>
              <p className="leading-relaxed">{resumeData.summary}</p>
            </section>

            <section>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-300">
                Technologies
              </h4>
              <p className="leading-relaxed">{resumeData.technologies.join(", ")}</p>
            </section>

            <section>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-300">
                Experience
              </h4>
              <div className="space-y-4">
                {resumeData.experience.map((item) => (
                  <article key={`${item.title}-${item.company}`}>
                    <p className="font-semibold">
                      {item.title} - {item.company}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.period}</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-200">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-300">
                Project Highlights
              </h4>
              <ul className="list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-200">
                {resumeData.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </motion.article>
    </section>
  );
}
