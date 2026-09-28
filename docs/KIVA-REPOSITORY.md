# Kiva — eigenes Projekt

**Kiva** lebt nur in **`abx-git/kiva`**. Dieses Repo (**xbe-site**) enthält **Vault** (`vault/`), nicht Kiva.

## Normaler Workflow (ab jetzt)

Alles in **`https://github.com/abx-git/kiva`**:

1. Code ändern → Commit auf `main` in **kiva**
2. **Deploy Kiva (GitHub Pages)** läuft bei Push auf `main` (wenn `deploy.yml` existiert)
3. Lokal: `git clone` → `.env` → `npm run dev`

Kein Import aus xbe-site, kein `kiva-export`-Branch für die tägliche Arbeit.

## Einmalige Migration (nur falls `kiva` noch leer oder veraltet ist)

Wenn das Kiva-Repo noch nie den aktuellen Stand hatte, **einmal** den Import-Workflow in `kiva` nutzen, danach **Import-Workflow in `kiva` löschen** — er überschreibt bei jedem Lauf `main` und gehört nicht in ein eigenständiges Projekt.

Vorlage (nur für diesen einen Schritt): [kiva-import-from-xbe-site.workflow.yml](./kiva-import-from-xbe-site.workflow.yml)  
Quelle: Branch `kiva-export` auf xbe-site (historisch, wird hier nicht weiter gepflegt).

## Deploy & Supabase

- [deploy.yml-Vorlage](./kiva-deploy.workflow.yml) (in **kiva** unter `.github/workflows/`)
- [KIVA-DEPLOY.md](./KIVA-DEPLOY.md) (Secrets, Troubleshooting)

Live: https://abx-git.github.io/kiva/
