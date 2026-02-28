import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parse as parseUrl } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createApiProxyPlugin() {
  const withJsonBody = async (req) => {
    if (req.method !== "POST" && req.method !== "PUT" && req.method !== "PATCH") {
      return;
    }

    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const raw = Buffer.concat(chunks).toString("utf8").trim();
    if (!raw) {
      req.body = {};
      return;
    }

    try {
      req.body = JSON.parse(raw);
    } catch {
      req.body = raw;
    }
  };

  const runHandler = async (handlerPath, req, res, next) => {
    try {
      await withJsonBody(req);

      const parsedUrl = parseUrl(req.url || "", true);
      req.query = parsedUrl.query || {};

      if (typeof res.status !== "function") {
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
      }

      if (typeof res.json !== "function") {
        res.json = (payload) => {
          if (!res.headersSent) {
            res.setHeader("Content-Type", "application/json; charset=utf-8");
          }
          res.end(JSON.stringify(payload));
        };
      }

      if (typeof res.send !== "function") {
        res.send = (payload) => {
          if (payload == null) {
            res.end("");
            return;
          }

          if (typeof payload === "object" && !Buffer.isBuffer(payload)) {
            if (!res.headersSent) {
              res.setHeader("Content-Type", "application/json; charset=utf-8");
            }
            res.end(JSON.stringify(payload));
            return;
          }

          res.end(payload);
        };
      }

      const module = await import(pathToFileURL(handlerPath).href);
      const handler = module.default;
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };

  return {
    name: "local-api-proxy",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res, next) => {
        await runHandler(path.resolve(__dirname, "api", "chat.js"), req, res, next);
      });

      server.middlewares.use("/api/chat-logs", async (req, res, next) => {
        await runHandler(path.resolve(__dirname, "api", "chat-logs.js"), req, res, next);
      });
    },
  };
}

export default defineConfig({
  // Keep env files in project root even though Vite app root is /client.
  envDir: __dirname,
  plugins: [
    react(),
    tailwindcss(),
    createApiProxyPlugin(),
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
      ? [
          (await import("@replit/vite-plugin-cartographer")).default(),
          (await import("@replit/vite-plugin-dev-banner")).default(),
          (await import("@replit/vite-plugin-runtime-error-modal")).default(),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@assets": path.resolve(__dirname, "client", "public"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
