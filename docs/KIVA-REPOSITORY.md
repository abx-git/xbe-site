# Kiva – eigenes Repository

Kiva (ehemals `vault/` in xbe-site) lebt in **abx-git/kiva**.

**Einmaliger Import:** Branch `kiva-standalone` in xbe-site ist nur ein **Export-Staging** — kein dauerhaftes „Zweit-Home“ für die App. Nach erfolgreichem Import arbeitest du nur noch in `kiva`.

## Import in `abx-git/kiva` (Browser)

1. Workflow-Datei in **kiva** (nicht xbe-site):  
   `.github/workflows/import-from-xbe-site.yml`  
   Inhalt: [Raw-Vorlage auf main](https://github.com/abx-git/xbe-site/raw/main/docs/kiva-import-from-xbe-site.workflow.yml)  
   Wichtig: `permissions` muss **`contents: write`** und **`workflows: write`** enthalten (sonst Fehler beim Pushen von `deploy.yml`).
2. **Settings → Actions → General:** Actions erlauben, Workflow-Berechtigung **Read and write**.
3. Workflow starten:  
   https://github.com/abx-git/kiva/actions/workflows/import-from-xbe-site.yml → **Run workflow**  
   (oder Datei erneut committen — `push`-Trigger auf `main`).
4. **Settings → Pages:** Source **GitHub Actions**, dann **Deploy Kiva (GitHub Pages)** ausführen.

Live: https://abx-git.github.io/kiva/

### Typischer Fehler

`refusing to allow a GitHub App to create or update workflow ... without workflows permission`  
→ In der Import-Workflow-Datei `workflows: write` unter `permissions` ergänzen (siehe Vorlage oben), committen, erneut ausführen.

## xbe-site

- `vault/` ist von `main` entfernt.
- `/vault/` leitet auf Kiva GitHub Pages um (`src/pages/vault/index.astro`).
