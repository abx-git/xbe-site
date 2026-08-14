# X-BE

Öffentliche Arbeitsfläche für Konzepte, Specs und Demos rund um strukturierten Kontext in agentischer Softwarearbeit.

**Stack:** Astro 7 · Tailwind CSS 4 · TypeScript · statischer Export

**Live:** https://www.x-be.de

Kein Verkauf, keine buchbaren Angebote — Dokumentation und Demonstration.

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # Ausgabe: dist/
npm run preview
```

## Struktur

```text
src/
  content/     # site, concepts, compose, examples, notes
  components/  # Layout-Chrome, Embeds, Legal
  pages/       # Index, concepts, compose, examples, notes, about
```

## Inhalte pflegen

| Was | Wo |
|---|---|
| Site-Config, About, Legal | `src/content/site.ts` |
| Konzepte (E2, AGM, …) | `src/content/concepts.ts` |
| Optionales Zusammenspiel | `src/content/compose.ts` |
| Beispiele | `src/content/examples.ts` |
| Notes | `src/content/notes.ts` |

Neues Konzept: Eintrag in `concepts.ts` — die Route `/concepts/[slug]` entsteht automatisch.
