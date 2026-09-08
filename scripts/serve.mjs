import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const portFlag = args.indexOf("--port");
const port = Number(
  portFlag >= 0 ? args[portFlag + 1] : process.env.PORT || 5175,
);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    const filename = path.resolve(root, relative);
    const extension = path.extname(filename);
    if (
      !filename.startsWith(root) ||
      !types[extension] ||
      relative.startsWith(".") ||
      relative.includes("node_modules") ||
      relative.includes("scripts/")
    ) {
      res.writeHead(404).end("Not found");
      return;
    }
    const body = await readFile(filename);
    res.writeHead(200, {
      "Content-Type": types[extension],
      "Cache-Control": "no-cache",
    });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Portfolio: http://localhost:${port}`),
);
