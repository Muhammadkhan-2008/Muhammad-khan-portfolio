import { useEffect, useMemo, useState } from "react";
import { CalendarClock, Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

function normalizeProjects(projects = []) {
  return projects
    .map((project) => `${project.title} | Tech: ${(project.tech || []).join(", ")}`)
    .join("\n");
}

function normalizeJourney(journey = []) {
  return journey
    .map((item) => `${item.duration} - ${item.role} at ${item.company}. ${item.description}`)
    .join("\n");
}

function detectLeadIntent(text) {
  return /(book|appointment|hire|order|quote|job|work with|collab|meeting|call|discuss.*project|project.*discuss|want.*project|need.*website|need.*app)/i.test(text);
}

function formatHistory(messages) {
  return messages
    .slice(-8)
    .map((msg) => `${msg.role === "assistant" ? "Assistant" : "User"}: ${msg.content}`)
    .join("\n");
}

function getStoredJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export default function ChatAssistant({
  resumeData,
  skills,
  services,
  projects,
  journey,
  socialLinks,
  whatsappNumber,
  publicApiKey,
  allowDirectFallback = false,
}) {
  const [open, setOpen] = useState(false);
  const [secretaryPromptVisible, setSecretaryPromptVisible] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadSending, setLeadSending] = useState(false);
  const [leadMode, setLeadMode] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferredTime: "",
    details: "",
  });
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Assalam o Alaikum, I am Muhammad Khan's AI secretary. I can explain his projects, skills, services, and portfolio details. For appointments or project work, I can collect your details and prepare a WhatsApp message for Muhammad Khan.",
    },
  ]);

  useEffect(() => {
    const storedMessages = getStoredJson("portfolioAiSecretaryMessages", null);
    const storedLead = getStoredJson("portfolioAiSecretaryLead", null);

    if (Array.isArray(storedMessages) && storedMessages.length > 0) {
      setMessages(storedMessages.slice(-16));
    }

    if (storedLead && typeof storedLead === "object") {
      setLeadForm((prev) => ({
        ...prev,
        name: storedLead.name || "",
        phone: storedLead.phone || "",
        email: storedLead.email || "",
        preferredTime: storedLead.preferredTime || "",
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolioAiSecretaryMessages", JSON.stringify(messages.slice(-16)));
  }, [messages]);

  useEffect(() => {
    if (open) {
      setSecretaryPromptVisible(false);
      return undefined;
    }

    const alreadyShown = sessionStorage.getItem("aiSecretaryPromptShown") === "true";
    if (alreadyShown) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setSecretaryPromptVisible(true);
      sessionStorage.setItem("aiSecretaryPromptShown", "true");
    }, 20000);

    return () => clearTimeout(timeoutId);
  }, [open]);

  const knowledgeBase = useMemo(() => {
    return [
      `Name: ${resumeData.name}`,
      `Role: ${resumeData.role}`,
      `Location: ${resumeData.location}`,
      `Email: ${resumeData.email}`,
      `Phone: ${resumeData.phone}`,
      `WhatsApp: +${whatsappNumber}`,
      `GitHub: ${socialLinks.github}`,
      `LinkedIn: ${socialLinks.linkedin}`,
      "",
      `Summary: ${resumeData.summary}`,
      "",
      `Skills: ${(skills || []).join(", ")}`,
      "",
      "Services:",
      ...(services || []).map((item) => `- ${item.title}: ${item.description}`),
      "",
      "Experience:",
      normalizeJourney(journey),
      "",
      "Projects:",
      normalizeProjects(projects),
      "",
      "Education:",
      ...(resumeData.education || []).map((item) => `- ${item.degree}, ${item.institute} (${item.timeline})`),
    ].join("\n");
  }, [journey, projects, resumeData, services, skills, socialLinks, whatsappNumber]);

  const visitorMemory = useMemo(() => {
    const storedLead = getStoredJson("portfolioAiSecretaryLead", {});
    const parts = [
      storedLead?.name ? `Visitor name: ${storedLead.name}` : "",
      storedLead?.phone ? `Visitor phone: ${storedLead.phone}` : "",
      storedLead?.email ? `Visitor email: ${storedLead.email}` : "",
      storedLead?.preferredTime ? `Preferred meeting time: ${storedLead.preferredTime}` : "",
      storedLead?.details ? `Last project/appointment details: ${storedLead.details}` : "",
    ].filter(Boolean);

    return parts.length > 0 ? parts.join("\n") : "No saved visitor memory yet.";
  }, [messages]);

  const callServerlessChat = async (question, historyText) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        history: historyText,
        knowledgeBase,
        visitorMemory,
      }),
    });

    if (!response.ok) {
      throw new Error(`serverless_status_${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("serverless_non_json_response");
    }

    const data = await response.json();
    if (!data?.answer) {
      throw new Error("serverless_empty_answer");
    }

    return data.answer;
  };

  const callDirectOpenRouter = async (question, historyText) => {
    if (!publicApiKey) {
      throw new Error("missing_public_key");
    }

    const systemPrompt = [
      "You are Muhammad Khan's portfolio assistant.",
      "Behavior rules:",
      "- Act like a smart portfolio secretary for Muhammad Khan.",
      "- Be polite, warm, helpful, and concise.",
      "- Always respond in the same language as the user's latest message.",
      "- If user writes in English, respond in English.",
      "- If user writes in Roman Urdu/Hinglish, respond in Roman Urdu/Hinglish.",
      "- Explain Muhammad Khan's projects, skills, services, experience, and contact details from the provided profile.",
      "- If user asks for hiring/appointment/order, ask for name, phone, email, and project details.",
      "- Answer only from provided profile data.",
      "- Never invent any information.",
    ].join("\n");

    const userPrompt = [
      "PROFILE DATA:",
      knowledgeBase,
      "",
      "VISITOR MEMORY:",
      visitorMemory,
      "",
      "RECENT CHAT:",
      historyText,
      "",
      `USER QUESTION: ${question}`,
    ].join("\n");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicApiKey}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Muhammad Khan Portfolio Assistant",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        temperature: 0.25,
        max_tokens: 420,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`direct_status_${response.status}:${errText.slice(0, 120)}`);
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content?.toString().trim();
    if (!answer) {
      throw new Error("direct_empty_answer");
    }

    return answer;
  };

  const handleSend = async () => {
    const question = input.trim();
    if (!question || loading) {
      return;
    }

    const userMessage = { role: "user", content: question };
    const nextMessages = [...messages, userMessage];
    const historyText = formatHistory(nextMessages);
    setMessages(nextMessages);
    setInput("");

    if (detectLeadIntent(question)) {
      setLeadMode(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Excellent. Please share your Name, WhatsApp/Phone, Email, and project details below. Main aap ka message Muhammad Khan tak pohancha dunga.",
        },
      ]);
      return;
    }

    setLoading(true);

    try {
      let answer;

      try {
        answer = await callServerlessChat(question, historyText);
      } catch (serverError) {
        if (!publicApiKey || !allowDirectFallback) {
          throw serverError;
        }
        answer = await callDirectOpenRouter(question, historyText);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (error) {
      const message = String(error?.message || "");
      const setupMessage =
        "Chat server is not configured yet. Set OPENROUTER_API_KEY in env and restart. Local dev now supports /api/chat directly via Vite server.";

      const unavailableMessage =
        "Chat is temporarily unavailable. Please try again in a moment or use WhatsApp.";

      const quotaMessage =
        "AI chat quota is currently exceeded (OpenRouter rate limit). Please try again later or use WhatsApp contact now.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: message.includes("direct_status_429") || message.includes("serverless_status_429")
            ? quotaMessage
            : message.includes("missing_public_key") ||
            message.includes("serverless_status_404") ||
            message.includes("serverless_status_405") ||
            message.includes("serverless_status_500") ||
            message.includes("serverless_non_json_response")
            ? setupMessage
            : unavailableMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompt = (text) => {
    setInput(text);
  };

  const submitLead = () => {
    if (leadSending) {
      return;
    }

    if (!leadForm.name.trim() || !leadForm.phone.trim() || !leadForm.details.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Please fill at least Name, Phone, and Project Details before sending.",
        },
      ]);
      return;
    }

    const lead = {
      name: leadForm.name.trim(),
      phone: leadForm.phone.trim(),
      email: leadForm.email.trim(),
      preferredTime: leadForm.preferredTime.trim(),
      details: leadForm.details.trim(),
    };

    setLeadSending(true);

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lead,
        conversation: messages,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`lead_status_${response.status}`);
        }

        localStorage.setItem("portfolioAiSecretaryLead", JSON.stringify(lead));
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Done. Main ne aapki details Muhammad Khan ko background me forward kar di hain. Aap isi tab me reh sakte hain; Muhammad Khan aap se WhatsApp/phone par contact kar lega.",
          },
        ]);
        setLeadMode(false);
        setLeadForm((prev) => ({ ...prev, details: "" }));
      })
      .catch(() => {
        const fallbackMessage = [
          "Hi Muhammad Khan, I want to discuss a project/appointment.",
          "",
          `Client Name: ${lead.name}`,
          `Phone: ${lead.phone}`,
          `Email: ${lead.email || "Not provided"}`,
          `Preferred Meeting Time: ${lead.preferredTime || "Not provided"}`,
          `Project Details: ${lead.details}`,
        ].join("\n");

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fallbackMessage)}`;
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Background forwarding is unavailable right now. Please use the backup WhatsApp button to send your request.",
          },
          {
            role: "assistant",
            content: whatsappUrl,
          },
        ]);
      })
      .finally(() => {
        setLeadSending(false);
      });
  };

  return (
    <div className="fixed bottom-24 right-4 z-[78] md:bottom-6">
      {!open && secretaryPromptVisible && (
        <div className="mb-3 w-[min(88vw,340px)] rounded-2xl border border-primary/25 bg-card p-3 shadow-2xl">
          <div className="mb-2 flex items-start justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              <Sparkles size={13} />
              AI Secretary
            </div>
            <button
              type="button"
              onClick={() => setSecretaryPromptVisible(false)}
              className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Dismiss AI secretary prompt"
            >
              <X size={14} />
            </button>
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            Kuch poochna hai? Main projects, skills, pricing discussion, ya appointment ke liye details le kar WhatsApp par bhej sakta hoon.
          </p>
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setSecretaryPromptVisible(false);
            }}
            className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground"
          >
            Start Chat
            <MessageCircle size={14} />
          </button>
        </div>
      )}

      {open ? (
        <div className="w-[min(92vw,370px)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border bg-background/90 px-4 py-3">
            <p className="inline-flex items-center gap-2 text-sm font-semibold">
              <CalendarClock size={15} />
              AI Secretary
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-border bg-background p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close AI chat"
            >
              <X size={15} />
            </button>
          </div>

          <div className="max-h-[360px] space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`max-w-[88%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "assistant"
                    ? "bg-muted text-foreground"
                    : "ml-auto bg-primary text-primary-foreground"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="inline-flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-sm text-muted-foreground">
                <Loader2 size={14} className="animate-spin" />
                Thinking...
              </div>
            )}
          </div>

          <div className="border-t border-border p-3">
            {!leadMode && (
              <div className="mb-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => quickPrompt("I want to hire Muhammad Khan for a project.")}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium"
                >
                  Hire / Order
                </button>
                <button
                  type="button"
                  onClick={() => quickPrompt("Book an appointment for project discussion.")}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium"
                >
                  Appointment
                </button>
                <button
                  type="button"
                  onClick={() => quickPrompt("Tell me top frontend projects and skills.")}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium"
                >
                  Skills & Projects
                </button>
              </div>
            )}

            {leadMode ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={leadForm.name}
                  onChange={(event) => setLeadForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Your name"
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 focus:ring"
                />
                <input
                  type="text"
                  value={leadForm.phone}
                  onChange={(event) => setLeadForm((prev) => ({ ...prev, phone: event.target.value }))}
                  placeholder="WhatsApp / phone"
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 focus:ring"
                />
                <input
                  type="email"
                  value={leadForm.email}
                  onChange={(event) => setLeadForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="Email (optional)"
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 focus:ring"
                />
                <input
                  type="text"
                  value={leadForm.preferredTime}
                  onChange={(event) => setLeadForm((prev) => ({ ...prev, preferredTime: event.target.value }))}
                  placeholder="Preferred appointment day/time (optional)"
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 focus:ring"
                />
                <textarea
                  rows={3}
                  value={leadForm.details}
                  onChange={(event) => setLeadForm((prev) => ({ ...prev, details: event.target.value }))}
                  placeholder="Project details / requirement"
                  className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/30 focus:ring"
                />
                <button
                  type="button"
                  onClick={submitLead}
                  disabled={leadSending}
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                >
                  {leadSending ? "Forwarding..." : "Send to Muhammad Khan"}
                  {leadSending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSend();
                    }
                  }}
                  placeholder="Ask anything about portfolio..."
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 focus:ring"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-60"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle size={17} />
          Ask AI
        </button>
      )}
    </div>
  );
}
