import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PIPELINE_ROOT = resolve(__dirname, "../../../../ndif-citations/output");
const SITE_PUBLIC = resolve(__dirname, "../public");

const SRC_JSON = resolve(PIPELINE_ROOT, "research-papers.json");
const DEST_JSON = resolve(SITE_PUBLIC, "data/research-papers.json");
const SRC_IMAGES = resolve(PIPELINE_ROOT, "images");
const DEST_IMAGES = resolve(SITE_PUBLIC, "images");

if (!existsSync(SRC_JSON)) {
  console.error(`[sync-papers] source JSON not found: ${SRC_JSON}`);
  process.exit(1);
}

const papers = JSON.parse(readFileSync(SRC_JSON, "utf8"));
if (!Array.isArray(papers)) {
  console.error("[sync-papers] expected an array at the root of research-papers.json");
  process.exit(1);
}

writeFileSync(DEST_JSON, JSON.stringify(papers, null, 2) + "\n", "utf8");
console.log(`[sync-papers] wrote ${papers.length} papers -> ${DEST_JSON}`);

if (!existsSync(DEST_IMAGES)) mkdirSync(DEST_IMAGES, { recursive: true });

let copied = 0;
let alreadyPresent = 0;
let pipelineMissing = 0;
for (const p of papers) {
  if (!p.image) continue;
  const filename = p.image.replace(/^\/?images\//, "");
  const src = resolve(SRC_IMAGES, filename);
  const dest = resolve(DEST_IMAGES, filename);
  if (!existsSync(src)) {
    pipelineMissing++;
    console.warn(`[sync-papers] WARN: ${filename} not in pipeline output`);
    continue;
  }
  if (existsSync(dest)) {
    alreadyPresent++;
    continue;
  }
  copyFileSync(src, dest);
  copied++;
}

console.log(`[sync-papers] images: copied ${copied} new, ${alreadyPresent} already present, ${pipelineMissing} missing from pipeline`);
