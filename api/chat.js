import fs from "node:fs/promises";
import path from "node:path";

async function appendChatLog(entry) {
  const logDir = path.join(process.cwd(), "logs");
  const logFile = path.join(logDir, "chat-conversations.jsonl");
  await fs.mkdir(logDir, { recursive: true });
  await fs.appendFile(logFile, `${JSON.stringify(entry)}\n`, "utf8");
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function getOpenRouterKeys() {
  const rawValues = [
    process.env.OPENROUTER_API_KEY,
    process.env.OPENROUTER_API_KEY_FALLBACK,
    process.env.OPENROUTER_API_KEYS,
  ]
    .filter(Boolean)
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean);

  return [...new Set(rawValues)];
}

async function callOpenRouterWithFailover({ keys, model, systemPrompt, userPrompt }) {
  const retriableStatuses = new Set([401, 402, 429, 500, 502, 503, 504]);
  let lastError = null;

  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://portfolio.local",
        "X-Title": "Muhammad Khan Portfolio Assistant",
      },
      body: JSON.stringify({
        model,
        temperature: 0.25,
        max_tokens: 420,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const answer =
        data?.choices?.[0]?.message?.content?.toString().trim() ||
        "I could not generate a response right now.";
      return { answer, keyIndex: index };
    }

    const errorText = await response.text();
    lastError = {
      status: response.status,
      errorText,
      keyIndex: index,
    };

    if (!retriableStatuses.has(response.status) || index === keys.length - 1) {
      break;
    }
  }

  const finalStatus = lastError?.status || 500;
  const finalText = (lastError?.errorText || "OpenRouter request failed").slice(0, 600);
  const error = new Error(finalText);
  error.status = finalStatus;
  throw error;
}

async function sendChatAlertEmail({ question, answer, ip }) {
  const resendKey = process.env.RESEND_API_KEY;
  const alertEmail = process.env.CHAT_ALERT_TO_EMAIL;
  const fromEmail = process.env.CHAT_ALERT_FROM_EMAIL || "onboarding@resend.dev";

  if (!resendKey || !alertEmail) {
    return;
  }

  const subject = `Portfolio Chat Lead | ${question.slice(0, 70) || "New message"}`;
  const text = [
    "New chat conversation from portfolio assistant.",
    "",
    `Time: ${new Date().toISOString()}`,
    `IP: ${ip}`,
    "",
    `User: ${question}`,
    "",
    `Assistant: ${answer}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [alertEmail],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const textBody = await response.text();
    const error = new Error(`Resend email error: ${textBody.slice(0, 300)}`);
    error.status = response.status;
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const openRouterKeys = getOpenRouterKeys();
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

  if (openRouterKeys.length === 0) {
    res.status(500).json({ error: "Server OpenRouter key is not configured" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const question = (body?.question || "").toString().trim();
    const history = (body?.history || "").toString();
    const knowledgeBase = (body?.knowledgeBase || "").toString();

    if (!question) {
      res.status(400).json({ error: "Question is required" });
      return;
    }

    const systemPrompt = [
      "You are Muhammad Khan's portfolio assistant.",
      "Behavior rules:",
      "- Be polite, warm, and helpful.",
      "- Always answer in the same language as the user's latest message.",
      "- If the user writes in English, respond in English.",
      "- If the user writes in Spanish, respond in Spanish.",
      "- If this is the first query, greet and offer project/hiring help.",
      "- For hiring/appointment/order requests, ask for name, phone, email, and project details.",
      "- Answer only from provided profile data.",
      "- Never invent achievements, companies, or contact details.",
    ].join("\n");

    const userPrompt = [
      "PROFILE DATA:",
      knowledgeBase,
      "",
      "RECENT CHAT:",
      history,
      "",
      `USER QUESTION: ${question}`,
    ].join("\n");

    const { answer, keyIndex } = await callOpenRouterWithFailover({
      keys: openRouterKeys,
      model,
      systemPrompt,
      userPrompt,
    });

    const ip = getClientIp(req);

    try {
      await appendChatLog({
        timestamp: new Date().toISOString(),
        ip,
        keyIndexUsed: keyIndex,
        question,
        answer,
      });
    } catch {
      // Logging failure should not break chat response.
    }

    // Optional: email alert for each chat message (requires RESEND_API_KEY + CHAT_ALERT_TO_EMAIL).
    try {
      await sendChatAlertEmail({ question, answer, ip });
    } catch {
      // Email failure should not break chat response.
    }

    res.status(200).json({ answer });
  } catch (error) {
    const status = Number(error?.status) || 500;
    if (status >= 400 && status < 600) {
      res.status(status).json({ error: `OpenRouter error: ${String(error.message || "Unknown error")}` });
      return;
    }
    res.status(500).json({ error: "Failed to process chat request" });
  }
}
