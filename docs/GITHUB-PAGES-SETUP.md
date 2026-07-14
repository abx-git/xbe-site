# GitHub Pages — X-BE Website

Die Marketing-Site wird aus diesem Repository gebaut und unter **https://www.x-be.de** ausgeliefert.

| Item | Value |
|------|--------|
| **Source repository** | [abx-git/xbe-site](https://github.com/abx-git/xbe-site) |
| **Build** | Astro (`npm run build` → `dist/`) |
| **Deploy** | GitHub Actions → GitHub Pages |
| **Custom domain** | `www.x-be.de` (`public/CNAME`) |

> **Wichtig:** In GitHub Pages muss exakt `www.x-be.de` stehen — nicht `x-be.de`.  
> Sonst schlägt der Deploy mit 404 fehl oder HTTPS passt nicht.

## 1. Repository anlegen (einmalig)

**Automatisch** (nach `gh auth login`):

```bash
./scripts/setup-github-repo.sh
```

Das Skript legt `abx-git/xbe-site` an und pusht `main`.

**Manuell** falls `gh` nicht verfügbar:

```bash
# Auf GitHub: neues Repository abx-git/xbe-site (öffentlich)
git remote add origin https://github.com/abx-git/xbe-site.git
git push -u origin main
```

**GitHub CLI einloggen** (einmalig, analog zu PAT-Setup bei blueprint-pattern):

```bash
brew install gh   # falls noch nicht installiert
gh auth login
```

## 2. GitHub Pages aktivieren

**Settings → Pages → Build and deployment**

| Feld | Wert |
|------|------|
| **Source** | GitHub Actions |

Der Workflow `.github/workflows/deploy.yml` baut bei jedem Push auf `main` und veröffentlicht automatisch.

**Manueller Erstdeploy:** Actions → **Deploy X-BE Site (GitHub Pages)** → **Run workflow**.

## 3. Custom Domain `www.x-be.de`

**Settings → Pages → Custom domain** → `www.x-be.de` eintragen und speichern.

Die Datei `public/CNAME` enthält bereits `www.x-be.de` und wird mit jedem Build mit ausgeliefert.

### DNS beim Domain-Provider

| Typ | Name | Wert |
|-----|------|------|
| **CNAME** | `www` | `abx-git.github.io` |

Optional Apex-Domain `x-be.de` (ohne www) per Weiterleitung auf `https://www.x-be.de` — oder A-Records auf GitHub Pages:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

HTTPS wird von GitHub (Let's Encrypt) bereitgestellt — nach DNS-Propagierung kann das 15–60 Minuten dauern.

## 4. URLs in der Codebasis

Diese Werte müssen zur Live-Domain passen:

| Datei | Feld |
|-------|------|
| `astro.config.mjs` | `site: 'https://www.x-be.de'` |
| `src/content/site.ts` | `siteUrl: 'https://www.x-be.de'` |
| `public/robots.txt` | Sitemap-URL |

## 5. Lokale Entwicklung

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/
npm run preview    # Produktions-Build lokal testen
```

## 6. Zugangsdaten (wie blueprint-pattern)

Für **dieses** Projekt reicht der eingebaute `GITHUB_TOKEN` der Actions — **kein separates Deploy-PAT** nötig, weil Build und Pages im gleichen Repository liegen.

Das unterscheidet sich von [blueprint-pattern](https://github.com/abx-git/blueprint-pattern), wo ein PAT (`AGM_GHIO_DEPLOY`) in ein **separates** Pages-Repository (`agm.github.io`) pusht.

Falls du später ein separates Pages-Repo nutzen willst, analog zu blueprint-pattern:

1. PAT mit **Contents: Read and write** + **Pages: Read and write** auf `abx-git/xbe-site`
2. Repo-Secret `XBE_SITE_DEPLOY` in Actions
3. Workflow auf `peaceiris/actions-gh-pages` oder Cross-Repo-Deploy umstellen

Für `www.x-be.de` ist Same-Repo-Deploy die einfachere und empfohlene Variante.

## Troubleshooting

| Problem | Lösung |
|---------|--------|
| Workflow schlägt fehl mit `Creating Pages deployment failed` / 404 | Settings → Pages → Source: **GitHub Actions** speichern; Custom domain: `www.x-be.de`; Workflow erneut starten |
| Custom domain zeigt `x-be.de` statt `www` | In Pages-Settings auf `www.x-be.de` ändern (muss mit `public/CNAME` übereinstimmen) |
| 404 nach Deploy | Pages Source = **GitHub Actions** (nicht Branch deploy) |
| Custom domain „nicht erreichbar“ | DNS CNAME prüfen; 15–60 min warten |
| Zertifikat-Fehler | Custom domain in Pages-Settings erneut speichern |
| Falsche Canonical-URLs | `site` und `siteUrl` auf `https://www.x-be.de` prüfen |
| CSS/Assets fehlen | Kein `base` in `astro.config.mjs` nötig (Root-Domain mit www) |
