import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { parse } from "parse5";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const root = process.argv.includes("--dist") ? path.join(projectRoot, "dist") : projectRoot;
const pages = readdirSync(root).filter((file) => file.endsWith(".html"));
assert.equal(pages.length, 7, "Build contains all seven pages");
if (process.argv.includes("--dist")) {
  const config = JSON.parse(readFileSync(path.join(projectRoot, "vercel.json"), "utf8"));
  assert.equal(config.outputDirectory, "dist");
  assert.equal(config.framework, null);
  for (const privatePath of ["node_modules", "scripts", ".git", ".preview", "package.json"])
    assert(!existsSync(path.join(root, privatePath)), `Deployment excludes ${privatePath}`);
}
const walk = (node) => [node, ...(node.childNodes || []).flatMap(walk)];
const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
const text = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes || []).map(text).join(" ");
const documents = new Map(
  pages.map((file) => [
    file,
    walk(parse(readFileSync(path.join(root, file), "utf8"))),
  ]),
);
let references = 0;
for (const [file, nodes] of documents) {
  assert.equal(
    nodes.filter((n) => n.tagName === "h1").length,
    1,
    `${file}: one primary heading`,
  );
  assert.equal(
    nodes.filter((n) => n.tagName === "main").length,
    1,
    `${file}: one main landmark`,
  );
  const ids = nodes.map((n) => attr(n, "id")).filter(Boolean);
  assert.equal(new Set(ids).size, ids.length, `${file}: unique IDs`);
  for (const node of nodes) {
    if (node.tagName === "img")
      assert.notEqual(attr(node, "alt"), undefined, `${file}: image needs alt`);
    for (const name of ["href", "src"]) {
      const ref = attr(node, name);
      if (!ref || /^(https?:|mailto:|tel:)/.test(ref)) continue;
      const [target, hash] = ref.split("#");
      const targetFile = target || file;
      assert(
        existsSync(path.join(root, targetFile)),
        `${file}: missing ${targetFile}`,
      );
      if (hash && documents.has(targetFile))
        assert(
          documents.get(targetFile).some((n) => attr(n, "id") === hash),
          `${file}: missing anchor ${ref}`,
        );
      references++;
    }
    if (node.tagName === "input" || node.tagName === "textarea")
      assert(
        nodes.some(
          (n) => n.tagName === "label" && attr(n, "for") === attr(node, "id"),
        ),
        `${file}: input needs label`,
      );
  }
}
const home = documents.get("index.html");
const featured = home.filter((n) =>
  (attr(n, "class") || "").split(" ").includes("project-row"),
);
assert.equal(featured.length, 2, "Home features exactly two highlights");
assert(text(featured[0]).includes("TaskPlanet"));
assert(text(featured[1]).includes("ModeMesh AI"));
for (const name of [
  "index.html",
  "experience.html",
  "about.html",
  "taskplanet.html",
]) {
  const body = readFileSync(path.join(root, name), "utf8");
  assert(body.includes("100K"), `${name}: updated platform reach`);
  assert(!body.includes("1,000+"), `${name}: stale platform reach`);
}
assert(
  readFileSync(path.join(root, "experience.html"), "utf8").includes(
    "Mar 2026 - Jul 2026",
  ),
);
assert(
  readFileSync(path.join(root, "index.html"), "utf8").includes(
    "Approx. 12 months of experience",
  ),
);
console.log(
  `PASS: ${pages.length} pages, ${references} local links/assets, headings, labels, and featured-work content.`,
);
