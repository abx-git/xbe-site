# Kiva — Entwicklungsfortschritt

Chronologisches Log der Implementierung. Neue Einträge oben.

---

## 2026-09-28 — Phase 0 & 1 (Initial)

### Erledigt

- [x] **Konzept** dokumentiert (`docs/kiva/KONZEPT.md`): E2/ET2-Architektur, Domäne, Phasenplan, Supabase-Setup.
- [x] **Projekt `kiva/`** angelegt (Vite + TypeScript), Build-Ziel `public/kiva/` (wie Vault).
- [x] **PWA**: Web App Manifest, Service Worker (App-Shell-Cache), Theme/Meta.
- [x] **Supabase-Client** mit Env-Konfiguration; Demo-Modus ohne Keys.
- [x] **Login-UI**: E-Mail/Passwort, Session-Anzeige, Abmelden.
- [x] **Lokale Engine (Stub)**: IndexedDB-Wrapper `kiva-local` für spätere Instruktions-/Artefakt-Metadaten.
- [x] **Referenz-Schema** `supabase/kiva/schema.sql` (Tabellen + RLS-Skizze).
- [x] **CI**: GitHub Actions baut Kiva vor dem Astro-Site-Build.

### Offen (nächste Schritte)

- [ ] Instruktionsliste aus `instructions` + Storage-Download.
- [ ] Offline-Sync-Strategie (welche Felder in IndexedDB).
- [ ] Artefakt-Registrierung mit File Picker / FS Access API.
- [ ] Upload-Fortschritt, Fehlerbehandlung, RLS-Tests mit echtem Projekt.
- [ ] Konzept-Eintrag auf der Hauptseite (`src/content/concepts.ts`) — optional.

### Bekannte Limitierungen

- Kein Supabase-Projekt im Repo (nur Schema + Env-Beispiel).
- Service Worker cached nur die App-Shell, keine Instruktions-Blobs (bewusst, bis Storage-Anbindung steht).
