# Kiva (separates Projekt)

**Kiva** (`abx-git/kiva`) ist **nicht** dasselbe wie **Vault** auf www.x-be.de.

- **Vault** — verschlüsselter Dateimanager unter `vault/` in **xbe-site**, live unter `/vault/` (GitHub Pages der Site).
- **Kiva** — eigenes Repository und eigenes Produkt; Migration/Import nur in `abx-git/kiva`, ohne Änderungen an Vault in xbe-site.

Vorlagen für einen einmaligen Kiva-Import (falls noch nötig):

- [kiva-import-from-xbe-site.workflow.yml](./kiva-import-from-xbe-site.workflow.yml) (in Repo `kiva` anlegen)
- [kiva-deploy.workflow.yml](./kiva-deploy.workflow.yml) (Deploy in `kiva` per GitHub-UI)

Branch `kiva-standalone` in xbe-site war ein fehlerhafter Export-Klon des Vault-Codes und ist **nicht** die Quelle für Vault auf der Site.
