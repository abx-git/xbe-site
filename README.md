# X-BE — Website

Deutsche Marketing-Site für KI-gestützte Legacy-Analyse und Modernisierung.

**Stack:** Astro 7 · Tailwind CSS 4 · TypeScript · statischer Export

**Live (nach Deploy):** https://www.x-be.de

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # Ausgabe: dist/
npm run preview    # Build lokal prüfen
```

## Deployment

GitHub Pages über GitHub Actions — siehe [docs/GITHUB-PAGES-SETUP.md](./docs/GITHUB-PAGES-SETUP.md).

Kurzablauf:

1. Push auf `main` in [abx-git/xbe-site](https://github.com/abx-git/xbe-site)
2. Workflow baut Astro-Site und veröffentlicht auf GitHub Pages
3. Custom Domain `www.x-be.de` in GitHub Pages + DNS (CNAME → `abx-git.github.io`)

## Struktur

```text
src/
  content/     # site.ts, news.ts — zentraler deutscher Copy
  components/  # Layout, Grafiken, Sektionen
  pages/       # Routen (/leistungen, /methodik, …)
public/        # favicon, robots.txt, CNAME
```

## Inhalte pflegen

- Seitentexte: `src/content/site.ts`
- News: `src/content/news.ts` (neue Artikel oben einfügen)
- Navigation & Seitennummern: `src/content/site.ts` → `navItems`, `pageNumbers`
