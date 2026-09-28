# Kiva – eigenes Repository

Der verschlüsselte Dateimanager **Kiva** (früher Unterordner `vault/` in diesem Repo) lebt in einem separaten Repository.

## Quellcode exportieren

Auf Branch `kiva-standalone` liegt der vollständige Kiva-Projektbaum (Vite-SPA, CI, Dokumentation) als Repository-Root – ohne Astro-Site.

```bash
git fetch origin kiva-standalone
```

## Neues Repository `abx-git/kiva` anlegen

1. Auf GitHub: **New repository** → `abx-git/kiva` (öffentlich), ohne README/Lizenz (Inhalt kommt per Push).
2. Lokal:

```bash
git clone https://github.com/abx-git/kiva.git
cd kiva
git fetch https://github.com/abx-git/xbe-site.git kiva-standalone
git checkout -b main FETCH_HEAD
git push -u origin main
```

3. **Settings → Pages → Build and deployment → Source:** GitHub Actions.
4. Workflow **Deploy Kiva (GitHub Pages)** einmal ausführen oder auf `main` pushen.

Ergebnis: https://abx-git.github.io/kiva/

## xbe-site

- Der Ordner `vault/` wurde entfernt.
- `/vault/` auf www.x-be.de leitet per statischer Seite auf die Kiva-GitHub-Pages-URL um (anpassbar in `src/pages/vault/index.astro`).
