# Kiva – eigenes Repository

Kiva lebt in **abx-git/kiva**. Branch `kiva-standalone` in xbe-site ist nur ein **einmaliger Export**.

## Schritt 1: App importieren (Workflow in `kiva`)

Datei **in `abx-git/kiva`** (nicht xbe-site):  
`.github/workflows/import-from-xbe-site.yml`

Inhalt: [Raw-Vorlage](https://github.com/abx-git/xbe-site/raw/main/docs/kiva-import-from-xbe-site.workflow.yml)

- **Kein** `workflows:` unter `permissions` — das ist in Workflow-YAML ungültig.
- **Run workflow** auf: https://github.com/abx-git/kiva/actions/workflows/import-from-xbe-site.yml

Der Import pusht nur App-Code (ohne `.github/workflows/`), weil der `GITHUB_TOKEN` keine Workflow-Dateien per Git anlegen darf.

## Schritt 2: Deploy-Workflow (einmal, GitHub-UI)

Nach grünem Import: **Add file** in `kiva` →  
`.github/workflows/deploy.yml`  
Inhalt: [kiva-deploy.workflow.yml](https://github.com/abx-git/xbe-site/raw/main/docs/kiva-deploy.workflow.yml)

Dann: **Settings → Pages → GitHub Actions**, Workflow **Deploy Kiva (GitHub Pages)** ausführen.

Live: https://abx-git.github.io/kiva/

## xbe-site

- `vault/` ist von `main` entfernt.
- `/vault/` leitet auf Kiva GitHub Pages um.
