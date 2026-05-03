// packages/ndif.us/scripts/sync-github-repos.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "../../../../ndif-citations/output/github-repos.json");
const DEST = resolve(__dirname, "../public/data/github-repos.json");

if (!existsSync(SRC)) {
  console.error(`[sync-github-repos] source not found: ${SRC}`);
  process.exit(1);
}

const repos = JSON.parse(readFileSync(SRC, "utf8"));
if (!Array.isArray(repos)) {
  console.error("[sync-github-repos] expected an array at the root of the JSON");
  process.exit(1);
}

writeFileSync(DEST, JSON.stringify(repos, null, 2) + "\n", "utf8");
console.log(`[sync-github-repos] wrote ${repos.length} repos -> ${DEST}`);
