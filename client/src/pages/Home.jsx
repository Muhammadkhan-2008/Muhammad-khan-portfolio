import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Header from "../components/header/Header.jsx";
import HeroSection from "../components/hero/HeroSection.jsx";
import AboutSection from "../components/about/AboutSection.jsx";
import ShowcaseSection from "../components/showcase/ShowcaseSection.jsx";
import ExperienceSection from "../components/experience/ExperienceSection.jsx";
import ResumeActionModal from "../components/resume/ResumeActionModal.jsx";
import ResumeReader from "../components/resume/ResumeReader.jsx";
import ContactSection from "../components/contact/ContactSection.jsx";
import HireModal from "../components/hire/HireModal.jsx";
import BottomActionBar from "../components/actions/BottomActionBar.jsx";
import Footer from "../components/footer/Footer.jsx";
import ChatAssistant from "../components/chat/ChatAssistant.jsx";
import { downloadResumeFile } from "../lib/resumeDownload.js";

import {
  certificates,
  journey,
  navItems,
  projects,
  resumeData,
  services,
  skills,
  socialLinks,
  stats,
  toolboxCards,
  whatsappNumber,
} from "../data/portfolioData.js";

export function Home() {
  const [theme, setTheme] = useState("light");
  const themeSwitchTimeoutRef = useRef(null);
  const themeApplyTimeoutRef = useRef(null);
  const [themeTransition, setThemeTransition] = useState(null);
  const [hireOpen, setHireOpen] = useState(false);
  const [resumeOptionsOpen, setResumeOptionsOpen] = useState(false);
  const [resumeReaderOpen, setResumeReaderOpen] = useState(false);
  const [resumeDownloadFormat, setResumeDownloadFormat] = useState("docx");
  const [resumeAutoOpenAfterDownload, setResumeAutoOpenAfterDownload] = useState(false);
  const [resumeDownloading, setResumeDownloading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [hireForm, setHireForm] = useState({
    name: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    details: "",
  });

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : "dark";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      if (themeSwitchTimeoutRef.current) {
        clearTimeout(themeSwitchTimeoutRef.current);
      }
      if (themeApplyTimeoutRef.current) {
        clearTimeout(themeApplyTimeoutRef.current);
      }
    };
  }, []);

  const toggleTheme = () => {
    if (themeTransition) {
      return;
    }

    const nextTheme = theme === "dark" ? "light" : "dark";
    const direction = nextTheme === "dark" ? "rtl" : "ltr";
    setThemeTransition({ direction, nextTheme });

    themeApplyTimeoutRef.current = setTimeout(() => {
      setTheme(nextTheme);
    }, 250);

    if (themeSwitchTimeoutRef.current) {
      clearTimeout(themeSwitchTimeoutRef.current);
    }

    themeSwitchTimeoutRef.current = setTimeout(() => {
      setThemeTransition(null);
    }, 380);
  };

  const scrollToSection = (id) => {
    const mappedId = ["skills", "toolbox", "momentum", "projects"].includes(id) ? "showcase" : id;

    if (id === "resume") {
      setResumeOptionsOpen(true);
      return;
    }

    const section = document.getElementById(mappedId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getWhatsAppUrl = (text) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  const onSubmit = (event) => {
    event.preventDefault();
    setSending(true);

    const message = [
      "Hi Muhammad Khan, I am contacting from your portfolio form.",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Message: ${form.message}`,
    ].join("\n");

    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 2200);
  };

  const handleHireSubmit = (event) => {
    event.preventDefault();

    const message = [
      "Hi Muhammad Khan, I want to hire you.",
      "",
      `Client Name: ${hireForm.name}`,
      `Phone: ${hireForm.phone}`,
      `Project Type: ${hireForm.projectType}`,
      `Budget: ${hireForm.budget}`,
      `Timeline: ${hireForm.timeline}`,
      `Project Details: ${hireForm.details}`,
    ].join("\n");

    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setHireOpen(false);
    setHireForm({
      name: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      details: "",
    });
  };

  const openWhatsAppDirect = () => {
    window.open(getWhatsAppUrl("Hi Muhammad Khan, I want to discuss a project."), "_blank", "noopener,noreferrer");
  };

  const handleResumeDownload = async () => {
    if (resumeDownloading) {
      return;
    }

    setResumeDownloading(true);

    try {
      await downloadResumeFile(resumeData, resumeDownloadFormat, {
        autoOpen: resumeAutoOpenAfterDownload,
      });
      setResumeOptionsOpen(false);
    } finally {
      setResumeDownloading(false);
    }
  };

  const openResumeOptions = () => {
    setResumeOptionsOpen(true);
  };

  const handleResumeRead = () => {
    setResumeOptionsOpen(false);
    setResumeReaderOpen(true);
  };

  if (resumeReaderOpen) {
    return (
      <>
        <ResumeReader
          resumeData={resumeData}
          onBack={() => setResumeReaderOpen(false)}
          onDownload={() => setResumeOptionsOpen(true)}
        />

        <AnimatePresence>
          {resumeOptionsOpen && (
            <ResumeActionModal
              onClose={() => setResumeOptionsOpen(false)}
              onRead={() => setResumeOptionsOpen(false)}
              onDownload={handleResumeDownload}
              downloadFormat={resumeDownloadFormat}
              onFormatChange={setResumeDownloadFormat}
              autoOpenAfterDownload={resumeAutoOpenAfterDownload}
              onAutoOpenChange={setResumeAutoOpenAfterDownload}
              downloading={resumeDownloading}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="relative overflow-x-hidden">
      {themeTransition && (
        <div
          className={`theme-tone-overlay ${
            themeTransition.direction === "rtl" ? "theme-tone-rtl" : "theme-tone-ltr"
          } ${themeTransition.nextTheme === "dark" ? "theme-tone-dark" : "theme-tone-light"}`}
          aria-hidden="true"
        />
      )}
      <div className={`pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(125,211,252,0.42),transparent_34%),radial-gradient(circle_at_88%_0%,rgba(167,243,208,0.34),transparent_36%),radial-gradient(circle_at_52%_100%,rgba(191,219,254,0.28),transparent_40%)] transition-opacity duration-300 ${theme === "light" ? "opacity-100" : "opacity-0"}`} />
      <div className={`pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_16%_14%,rgba(148,163,184,0.08),transparent_38%),radial-gradient(circle_at_88%_0%,rgba(30,41,59,0.28),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(100,116,139,0.12),transparent_40%)] transition-opacity duration-300 ${theme === "dark" ? "opacity-100" : "opacity-0"}`} />

      <Header
        navItems={navItems}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={scrollToSection}
      />

      <main
        className="mx-auto flex w-full max-w-none flex-col px-5 pb-28 pt-28 md:px-10 lg:px-14"
      >
        <HeroSection onNavigate={scrollToSection} onResumeClick={openResumeOptions} theme={theme} />
        <AboutSection stats={stats} />
        <ShowcaseSection
          services={services}
          skills={skills}
          toolboxCards={toolboxCards}
          projects={projects}
          certificates={certificates}
        />
        <ExperienceSection journey={journey} />
        <ContactSection
          form={form}
          setForm={setForm}
          onSubmit={onSubmit}
          sending={sending}
          sent={sent}
        />
      </main>

      <ChatAssistant
        resumeData={resumeData}
        skills={skills}
        services={services}
        projects={projects}
        journey={journey}
        socialLinks={socialLinks}
        whatsappNumber={whatsappNumber}
        publicApiKey={import.meta.env.VITE_OPENROUTER_API_KEY}
        allowDirectFallback={import.meta.env.VITE_ALLOW_DIRECT_CHAT_FALLBACK === "true"}
      />

      <AnimatePresence>
        {resumeOptionsOpen && (
          <ResumeActionModal
            onClose={() => setResumeOptionsOpen(false)}
            onRead={handleResumeRead}
            onDownload={handleResumeDownload}
            downloadFormat={resumeDownloadFormat}
            onFormatChange={setResumeDownloadFormat}
            autoOpenAfterDownload={resumeAutoOpenAfterDownload}
            onAutoOpenChange={setResumeAutoOpenAfterDownload}
            downloading={resumeDownloading}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hireOpen && (
          <HireModal
            hireForm={hireForm}
            setHireForm={setHireForm}
            onClose={() => setHireOpen(false)}
            onSubmit={handleHireSubmit}
          />
        )}
      </AnimatePresence>

      <BottomActionBar
        onHireClick={() => setHireOpen(true)}
        onWhatsAppClick={openWhatsAppDirect}
      />

      <Footer
        socialLinks={socialLinks}
        whatsappHref={getWhatsAppUrl("Hi Muhammad Khan, I want to discuss a project.")}
      />
    </div>
  );
}
