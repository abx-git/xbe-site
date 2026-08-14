# X-BE

Public lab for experiments in AI-assisted software development — concepts, specs, demos, and notes.

**Stack:** Astro 7 · Tailwind CSS 4 · TypeScript · static export

**Live:** https://www.x-be.de

## Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # output: dist/
npm run preview
```

## Structure

```text
src/
  content/     # site, concepts, compose, examples, notes
  components/  # layout chrome, embeds, legal
  pages/       # routes
public/        # favicon, robots.txt, CNAME
```

## Content

| What | Where |
|---|---|
| Site config, about, legal | `src/content/site.ts` |
| Concepts (E2, AGM, …) | `src/content/concepts.ts` |
| Optional compose flow | `src/content/compose.ts` |
| Examples | `src/content/examples.ts` |
| Notes | `src/content/notes.ts` |

New concept: add an entry to `concepts.ts` — `/concepts/[slug]` is generated automatically.
