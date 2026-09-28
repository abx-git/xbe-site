# Kiva – eigenes Repository

Der verschlüsselte Dateimanager **Kiva** (früher Unterordner `vault/` in diesem Repo) lebt in einem separaten Repository.

## Quellcode exportieren

Auf Branch `kiva-standalone` liegt der vollständige Kiva-Projektbaum (Vite-SPA, CI, Dokumentation) als Repository-Root – ohne Astro-Site.

```bash
git fetch origin kiva-standalone
```

## Neues Repository `abx-git/kiva` anlegen

1. Auf GitHub: **New repository** → `abx-git/kiva` (öffentlich), ohne README/Lizenz (Inhalt kommt per Push).
2. **Nur Browser (ohne PC):** Inhalt von `xbe-site` nach `kiva` über GitHub Actions:

   1. [Fine-grained PAT](https://github.com/settings/personal-access-tokens/new) erstellen:
      - Repository access: nur **abx-git/kiva**
      - Permissions: **Contents** → Read and write
   2. In **abx-git/xbe-site** → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
      - Name: `KIVA_REPO_PUSH_TOKEN`
      - Value: der PAT
   3. **abx-git/xbe-site** → **Actions** → **Sync Kiva to abx-git/kiva** → **Run workflow**

   Falls der Push mit `Permission denied to github-actions[bot]` fehlschlägt: Workflow auf dem neuesten `main` ausführen (Fix: Checkout ohne `GITHUB_TOKEN`-Credentials). Der PAT muss trotzdem **Contents: Write** auf `abx-git/kiva` haben.
   4. In **abx-git/kiva** → **Settings** → **Pages** → Source: **GitHub Actions**
   5. In **abx-git/kiva** → **Actions** → **Deploy Kiva (GitHub Pages)** → **Run workflow** (oder nach Push auf `main` automatisch)

3. **Optional mit Git lokal:**

```bash
git clone https://github.com/abx-git/kiva.git
cd kiva
git fetch https://github.com/abx-git/xbe-site.git kiva-standalone
git checkout -b main FETCH_HEAD
git push -u origin main
```

Ergebnis: https://abx-git.github.io/kiva/

## xbe-site

- Der Ordner `vault/` wurde entfernt.
- `/vault/` auf www.x-be.de leitet per statischer Seite auf die Kiva-GitHub-Pages-URL um (anpassbar in `src/pages/vault/index.astro`).
