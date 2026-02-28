import { ArrowLeft, Download } from "lucide-react";

export default function ResumeReader({ resumeData, onBack, onDownload }) {
  return (
    <div className="min-h-screen bg-[#e9edf3] px-4 py-6 text-[#111] md:px-7 md:py-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-400 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </button>

          <button
            onClick={onDownload}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Download Resume <Download size={16} />
          </button>
        </div>

        <article className="mx-auto w-full max-w-4xl rounded-sm border border-zinc-300 bg-white px-6 py-8 shadow-[0_20px_46px_rgba(0,0,0,0.12)] md:px-10 md:py-10">
          <header className="border-b border-zinc-300 pb-4">
            <h1 className="font-serif text-4xl font-bold tracking-tight">{resumeData.name}</h1>
            <p className="mt-1 text-sm text-zinc-700">{resumeData.role}</p>
            <p className="mt-2 text-xs text-zinc-600">
              {resumeData.phone} | {resumeData.email}
            </p>
            <p className="mt-1 text-xs text-zinc-700">
              <a
                href={resumeData.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-zinc-900 underline underline-offset-2"
              >
                GitHub
              </a>{" "}
              |{" "}
              <a
                href={resumeData.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-zinc-900 underline underline-offset-2"
              >
                LinkedIn
              </a>
            </p>
          </header>

          <div className="mt-6 space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="mb-2 border-b border-zinc-300 pb-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 bg-amber-400 text-black">
                Professional Summary
              </h2>
              <p>{resumeData.summary}</p>
            </section>

            <section>
              <h2 className="mb-2 border-b border-zinc-300 pb-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 bg-amber-400 text-black">
                Technologies
              </h2>
              <p>{resumeData.technologies.join(", ")}</p>
            </section>

            <section>
              <h2 className="mb-2 border-b border-zinc-300 pb-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 bg-amber-400 text-black">
                Experience
              </h2>
              <div className="space-y-4">
                {resumeData.experience.map((item) => (
                  <article key={`${item.title}-${item.company}`}>
                    <p className="font-semibold">
                      {item.title} - {item.company}
                    </p>
                    <p className="text-xs text-zinc-500">{item.period}</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-2 border-b border-zinc-300 pb-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 bg-amber-400 text-black">
                Education
              </h2>
              <div className="space-y-3">
                {resumeData.education.map((item) => (
                  <article key={`${item.degree}-${item.institute}`}>
                    <p className="font-semibold">{item.degree}</p>
                    <p>{item.institute}</p>
                    <p className="text-xs text-zinc-500">{item.timeline}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-2 border-b border-zinc-300 pb-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 bg-amber-400 text-black">
                Project Highlights
              </h2>
              <ul className="list-disc space-y-1 pl-5">
                {resumeData.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
