import { useMemo, useState } from "react";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

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
  return /(book|appointment|hire|order|project|quote|job|work with|collab)/i.test(text);
}

function formatHistory(messages) {
  return messages
    .slice(-8)
    .map((msg) => `${msg.role === "assistant" ? "Assistant" : "User"}: ${msg.content}`)
    .join("\n");
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
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadMode, setLeadMode] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    details: "",
  });
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello, I am Muhammad Khan's AI assistant. I can help with skills, projects, hiring, or appointments. I can also collect your contact details and prepare your request for WhatsApp. For project follow-up, chat messages may be logged.",
    },
  ]);

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

  const callServerlessChat = async (question, historyText) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        history: historyText,
        knowledgeBase,
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
      "- Be polite, warm, and helpful.",
      "- Always respond in the same language as the user's latest message.",
      "- If user writes in English, respond in English.",
      "- If user writes in Spanish, respond in Spanish.",
      "- If user asks for hiring/appointment/order, ask for name, phone, email, and project details.",
      "- Answer only from provided profile data.",
      "- Never invent any information.",
    ].join("\n");

    const userPrompt = [
      "PROFILE DATA:",
      knowledgeBase,
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

    const message = [
      "Hi Muhammad Khan, I want to discuss a project/appointment.",
      "",
      `Client Name: ${leadForm.name}`,
      `Phone: ${leadForm.phone}`,
      `Email: ${leadForm.email || "Not provided"}`,
      `Project Details: ${leadForm.details}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "I have prepared your request for WhatsApp. Please tap Send in WhatsApp and Muhammad Khan will get your details.",
      },
    ]);

    setLeadMode(false);
    setLeadForm({ name: "", phone: "", email: "", details: "" });
  };

  return (
    <div className="fixed bottom-24 right-4 z-[78] md:bottom-6">
      {open ? (
        <div className="w-[min(92vw,370px)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border bg-background/90 px-4 py-3">
            <p className="text-sm font-semibold">AI Portfolio Chat</p>
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
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground"
                >
                  Send to Muhammad Khan
                  <Send size={14} />
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
