# Personal Site
[Check it out!](https://www.bradleydettmer.me/)

## Blog photos
Hosted on [dash.cloudflare.com](dash.cloudflare.com)

## Gotchas

**Content layer cache:** Astro caches compiled markdown output in `.astro/data-store.json`, keyed by file content. If you change a remark/rehype plugin (e.g. `src/plugins/`) without changing the markdown files themselves, the dev server won't pick it up — not even with a restart. Fix: `rm .astro/data-store.json` then restart `astro dev`.

**Side-by-side images need a blank line between them:** two `![]()` image lines with no blank line between them are parsed as one paragraph with a soft line break, not two separate paragraphs. The `rehype-image-captions` plugin (`src/plugins/`) only turns a paragraph into a captioned, groupable `figure` when it contains exactly one image — a two-image paragraph is left alone as plain, uncaptioned `<img>` tags, which then stack instead of appearing side by side. Always put a blank line between consecutive images you want captioned/grouped.

## Credits
The site was forked from created using a [template](https://github.com/Gage-K/apeiron) from [Gage](https://github.com/Gage-K) that was inspired by [Brittany Chiang](https://brittanychiang.com/) and [Mark Horn](https://markhorn.dev)'s personal websites, which you should definitely check out!
