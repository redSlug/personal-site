---
title: "A Tiny AI Model in Your Browser"
description: "Why I added a chat to my site, why it doesn't use a generative LLM, and how I get to see what people ask without paying for anything."
pubDate: "Oct 22 2026"
---

I was hanging out with my friend [Aparna](https://cranberrymuffin.io/#/blog) for dinner last night. We played some chess, and then — because apparently that's what we do for fun — decided to pair program together. We were each building out a chatbot for sites we were working on, and I picked mine for this site: the [Ask page](/ask), where you can ask a question about me and get an answer back.

My first idea was to run an actual LLM in the browser. Partly just because it sounded fun, but also because I'd been hearing a lot about the environmental cost of LLMs, and it seemed like if the model is small enough to run locally on someone's phone or laptop instead of hitting a server, that's a genuinely better footprint than a round trip to a big hosted model.

So I built a RAG setup — a small LLM running client-side, pulling in context from my blog and project pages, generating an answer. It worked. But I didn't love the quality, and more specifically, I didn't trust it. This bot answers questions about *me* on my own site. I asked it where I was from and it told me I was from Texas. I am not a Texan. I was not comfortable with a model confidently making things up about me to a stranger just because retrieval pulled in the wrong paragraph. A wrong guess about code is annoying; a wrong guess about a person is a different kind of bad.

That's what sent me looking for something safer, and that's how I landed on [transformers.js](https://huggingface.co/docs/transformers.js/en/pipelines) — specifically, using it for embeddings instead of generation. Rather than having a model write an answer, I have it just figure out which of my own pre-written answers is the closest match to what someone asked. It can never say anything I didn't vet myself.

## How the matching actually works

The model is `Xenova/all-MiniLM-L6-v2` — a small BERT-style encoder, about 22.7M parameters. It's not generative, it has no decoder, it can't write a sentence. All it does is turn a sentence into a 384-number vector:

```ts
import { pipeline } from "@huggingface/transformers";

const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
const result = await embedder("What has Bradley built?", {
  pooling: "mean",
  normalize: true,
});
const vector = Array.from(result.data); // 384 numbers
```

The actual content — the part I control completely — lives in a plain JSON file, `src/content/faq.json`. Every entry is a group of example phrasings of the same question, mapped to one answer I've vetted myself:

```json
{
  "id": "what-projects",
  "questions": ["What projects have you built?", "What has Bradley built?", "What have you made?"],
  "answer": "A range of things: web games like Tiles...",
  "url": "/projects"
}
```

At build time, I embed every example question in that file and save the vectors to `public/faq-index.json`. When someone types a question into the chat, their question gets embedded the same way, right there in their browser, and I compare it against every precomputed vector with cosine similarity. Closest match above a confidence threshold wins, and they get that entry's answer verbatim — not generated, not paraphrased, exactly what's in the JSON file. Below the threshold, they get a fixed fallback message pointing them to the Projects and Blog pages instead of a guess.

So the model's only job is interpretation — mapping "what have you made?" and "show me your portfolio" to the same answer — not authorship. Nothing comes out of this thing that I haven't personally vetted first.

One nice side effect of using an embedding model instead of a generative one: it's much smaller and runs the same way whether it's precomputing vectors at build time (on my machine, via `node`) or matching in a visitor's browser (via the exact same `pipeline()` call) — transformers.js just picks the right backend automatically depending on where the code runs. No API key, no server cost, no inference bill.

## Finding out what people actually ask

Once this was live, I realized I had no way to know what questions people were typing — including the ones the bot got wrong. That matters a lot to me, because the whole point of the FAQ file is that I can keep expanding it. If someone asks something reasonable that isn't covered, I want to see that and go add it.

I wanted this part free too — I don't want a side project costing me a monthly bill for something this small. So instead of a logging service or a database, I just post each question to a private Discord channel with a webhook, which costs nothing:

```ts
// src/pages/api/log-question.ts
export const prerender = false; // this one route renders on demand; everything else stays static

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export const POST: APIRoute = async ({ request }) => {
  const { question, matched } = await request.json();
  const content = `**Question** (${matched ? "matched" : "no match"}): ${question}`;

  await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  return new Response(null, { status: 204 });
};
```

The one thing I had to be careful about: a Discord webhook URL is a secret — anyone who has it can post to that channel, no login required — so it can never end up in code that ships to the browser. This route runs server-side only; the browser just calls `/api/log-question` on my own site and never sees the actual webhook URL at all.

The result is a running feed in a private channel I check every so often:

```
**Question** (matched): What has Bradley built?
**Question** (no match): do you know go?
```

That second one is exactly the kind of thing I'm hoping to catch — someone asking something real that the FAQ doesn't cover yet, so I can go add a real answer for it.

If you're thinking about adding something like this to your own site: you really don't need a hosted LLM for it. A tiny embedding model, a JSON file of answers you've actually vetted, and a free webhook got me the whole thing.
