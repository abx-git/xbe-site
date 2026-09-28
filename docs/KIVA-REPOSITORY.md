# Kiva – eigenes Repository

Der verschlüsselte Dateimanager **Kiva** (früher Unterordner `vault/` in diesem Repo) lebt in einem separaten Repository.

## Quellcode exportieren

Auf Branch `kiva-standalone` liegt der vollständige Kiva-Projektbaum (Vite-SPA, CI, Dokumentation) als Repository-Root – ohne Astro-Site.

```bash
git fetch origin kiva-standalone
```

## Neues Repository `abx-git/kiva` anlegen

1. Auf GitHub: **New repository** → `abx-git/kiva` (öffentlich), ohne README/Lizenz (Inhalt kommt per Push).

### Nur Browser (empfohlen, kein PAT)

Der Import läuft **in `abx-git/kiva`** und nutzt nur den eingebauten `GITHUB_TOKEN` (Schreibrechte auf `kiva`). `xbe-site` ist öffentlich lesbar.

1. **abx-git/kiva** → **Add file** → **Create new file**
2. Dateipfad: `.github/workflows/import-from-xbe-site.yml`
3. Inhalt aus [`docs/kiva-import-from-xbe-site.workflow.yml`](./kiva-import-from-xbe-site.workflow.yml) in diesem Repo kopieren (Raw-Ansicht auf GitHub: `abx-git/xbe-site` → gleicher Pfad).
4. **Commit changes** (erstellt `main` mit nur dieser Workflow-Datei).
5. **Actions** → **Import from xbe-site (kiva-standalone)** → **Run workflow**
6. **Settings** → **Pages** → Source: **GitHub Actions**
7. **Actions** → **Deploy Kiva (GitHub Pages)** → **Run workflow**

Ergebnis: https://abx-git.github.io/kiva/

### Alternative: Sync aus xbe-site (benötigt PAT)

Workflow **Sync Kiva to abx-git/kiva** in **xbe-site** — nur wenn ein **persönlicher** PAT (nicht Organisations-Token) mit **Contents: Write** auf `abx-git/kiva` existiert und die Organisation PAT-Zugriff erlaubt. Bei `Permission denied to abx-git` diese Alternative meist unbrauchbar; dann den Import in `kiva` oben nutzen.

Secret in **xbe-site**: `KIVA_REPO_PUSH_TOKEN`

### Optional mit Git lokal

```bash
git clone https://github.com/abx-git/kiva.git
cd kiva
git fetch https://github.com/abx-git/xbe-site.git kiva-standalone
git checkout -b main FETCH_HEAD
git push -u origin main
```

## xbe-site

- Der Ordner `vault/` wurde entfernt.
- `/vault/` auf www.x-be.de leitet per statischer Seite auf die Kiva-GitHub-Pages-URL um (anpassbar in `src/pages/vault/index.astro`).
