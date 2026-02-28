import fs from "node:fs/promises";
import path from "node:path";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const expectedToken = process.env.CHAT_LOG_TOKEN;
  const token = req.query?.token;

  if (!expectedToken || token !== expectedToken) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const logFile = path.join(process.cwd(), "logs", "chat-conversations.jsonl");
    const content = await fs.readFile(logFile, "utf8");
    const filename = `chat-conversations-${new Date().toISOString().slice(0, 10)}.jsonl`;

    res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.status(200).send(content);
  } catch {
    res.status(404).json({ error: "No chat logs found yet" });
  }
}
