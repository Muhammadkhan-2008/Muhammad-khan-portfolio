function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

async function sendLeadToMakeWebhook({ lead, conversation, ip }) {
  const webhookUrl =
    process.env.MAKE_WEBHOOK_URL ||
    "https://hook.us2.make.com/vjlrl45y9bnytgh1gyhl1h4uwjdyhq2k";

  if (!webhookUrl) {
    return;
  }

  const payload = {
    source: "portfolio-ai-secretary-lead",
    timestamp: new Date().toISOString(),
    ip,
    lead,
    conversation,
    ownerWhatsApp: "923163347485",
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const textBody = await response.text();
    const error = new Error(`Make webhook error: ${textBody.slice(0, 300)}`);
    error.status = response.status;
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const lead = body?.lead || {};
    const conversation = Array.isArray(body?.conversation) ? body.conversation.slice(-12) : [];

    if (!lead.name || !lead.phone || !lead.details) {
      res.status(400).json({ error: "Name, phone, and details are required" });
      return;
    }

    await sendLeadToMakeWebhook({
      lead,
      conversation,
      ip: getClientIp(req),
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    const status = Number(error?.status) || 500;
    res.status(status).json({ error: String(error?.message || "Failed to send lead") });
  }
}
