// Precomputes an embedding for every example question in src/content/faq.json,
// so the /ask page can match a visitor's question against them client-side
// without downloading an embedding model for most visitors.
//
// Rerun this (npm run faq:build) whenever you edit faq.json — it also runs
// automatically before `npm run dev` / `npm run build` via predev/prebuild.
// Output is gitignored and regenerated each time, not committed.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "@huggingface/transformers";

// all-MiniLM-L6-v2: a 384-dim sentence embedding model — small enough
// to load quickly in a browser tab while still giving strong semantic
// similarity for short FAQ-style questions.
const EMBEDDING_MODEL = "Xenova/all-MiniLM-L6-v2";
const ROOT = new URL("..", import.meta.url).pathname;

type FaqEntry = {
  id: string;
  questions: string[];
  answer: string;
  url?: string;
};

type FaqIndexRow = {
  id: string;
  question: string;
  answer: string;
  url: string;
  embedding: number[];
};

async function loadFaqEntries(): Promise<FaqEntry[]> {
  const raw = await readFile(path.join(ROOT, "src/content/faq.json"), "utf-8");
  return JSON.parse(raw) as FaqEntry[];
}

async function main() {
  const entries = await loadFaqEntries();
  const rows = entries.flatMap((entry) =>
    entry.questions.map((question) => ({
      id: entry.id,
      question,
      answer: entry.answer,
      url: entry.url ?? "",
    }))
  );

  console.log(`[faq-index] embedding ${rows.length} example questions (from ${entries.length} FAQ entries) with ${EMBEDDING_MODEL}...`);

  const embedder = await pipeline("feature-extraction", EMBEDDING_MODEL);
  const indexed: FaqIndexRow[] = [];
  for (const row of rows) {
    const output = await embedder(row.question, { pooling: "mean", normalize: true });
    indexed.push({ ...row, embedding: Array.from(output.data) as number[] });
  }

  const outPath = path.join(ROOT, "public/faq-index.json");
  await writeFile(outPath, JSON.stringify(indexed));
  console.log(`[faq-index] wrote ${indexed.length} rows to public/faq-index.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
