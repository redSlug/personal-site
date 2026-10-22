import type { APIRoute } from "astro";

// Runs on-demand (not prerendered) so it executes as a real request handler,
// both locally under `astro dev` and once deployed via the Vercel adapter.
export const prerender = false;

// process.env, not import.meta.env: Vite statically inlines import.meta.env.*
// as a literal string at build time, which would bake the actual webhook
// secret into the built server bundle. process.env is a genuine runtime
// lookup instead. Local dev gets DISCORD_WEBHOOK_URL into process.env via
// `--env-file=.env` on the dev script (see package.json), not from Astro.
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const MAX_QUESTION_LENGTH = 500;

// True for local dev and Vercel preview deployments, false only for the
// actual production deployment — lets us tell real visitor questions apart
// from our own testing in the Discord channel.
const IS_DEV_ENV = import.meta.env.DEV || process.env.VERCEL_ENV !== "production";

export const POST: APIRoute = async ({ request }) => {
  if (!DISCORD_WEBHOOK_URL) {
    return new Response("Not configured", { status: 500 });
  }

  let body: { question?: unknown; matched?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const question =
    typeof body.question === "string" ? body.question.trim().slice(0, MAX_QUESTION_LENGTH) : "";
  if (!question) {
    return new Response("Missing question", { status: 400 });
  }

  const matchedLabel = body.matched ? "matched" : "no match";
  const prefix = IS_DEV_ENV ? "[dev] " : "";
  const content = `${prefix}**Question** (${matchedLabel}): ${question}`;

  const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!discordResponse.ok) {
    return new Response("Failed to forward", { status: 502 });
  }

  return new Response(null, { status: 204 });
};
