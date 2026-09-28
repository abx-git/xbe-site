# Kiva — separates Projekt (`abx-git/kiva`)

**Kiva** ist die PWA für Arbeitsanweisungen (Supabase, IndexedDB) — **nicht** [Vault](../vault/README.md) auf www.x-be.de.

Quell-Export auf xbe-site: Branch **`kiva-export`** (aus `cursor/kiva-project-f468`).

## Repo `abx-git/kiva` füllen (Browser)

1. In **kiva**: `.github/workflows/import-from-xbe-site.yml`  
   Inhalt: [Raw-Vorlage](https://github.com/abx-git/xbe-site/raw/main/docs/kiva-import-from-xbe-site.workflow.yml)  
   (Importiert Branch **`kiva-export`**, keine Workflow-Dateien im Export → Push funktioniert mit `GITHUB_TOKEN`.)

2. **Actions** → **Import from xbe-site (kiva-export)** → **Run workflow**  
   https://github.com/abx-git/kiva/actions/workflows/import-from-xbe-site.yml

3. Nach grünem Lauf: **Add file** → `.github/workflows/deploy.yml`  
   [Deploy-Vorlage](https://github.com/abx-git/xbe-site/raw/main/docs/kiva-deploy.workflow.yml) (einmal per GitHub-UI, nicht per Import).

4. **Settings → Pages → GitHub Actions**, dann **Deploy Kiva (GitHub Pages)**.

Live: https://abx-git.github.io/kiva/

## Entwicklung

```bash
git clone https://github.com/abx-git/kiva.git
cd kiva
cp .env.example .env
npm install && npm run dev
```

Supabase-Schema: `supabase/kiva/schema.sql` im Kiva-Repo.
