# Kiva — Entwicklungsfortschritt

Chronologisches Log der Implementierung. Neue Einträge oben.

---

## 2026-09-28 — Phase 3 (Artefakte, MVP)

### Erledigt

- [x] Datei per File Picker registrieren (SHA-256, lokaler Blob in IndexedDB).
- [x] Optional „Für Community freigeben“ (`visibility`).
- [x] Upload nach Storage-Bucket `artifacts` + Insert in `artifacts`.
- [x] Liste „Meine Artefakte“ mit Status (lokal / Upload / veröffentlicht / Fehler).

### Offen

- [ ] Community-Artefakte anderer Nutzer anzeigen & herunterladen.
- [ ] Konfliktbehandlung bei gleicher Datei / Re-Upload.

---

## 2026-09-28 — Phase 2 (Instruktionen)

### Erledigt

- [x] **Remote-Adapter**: Liste veröffentlichter Instruktionen (`instructions`, `published = true`).
- [x] **Storage-Download**: Bucket `instructions`, Pfad aus `storage_path`.
- [x] **Lokale Engine**: Metadaten in IndexedDB (`instructions`), Blobs in `instruction_blobs` (DB-Version 2).
- [x] **Sync**: Katalog aktualisieren; bei neuer Server-Version wird Offline-Kopie invalidiert.
- [x] **UI**: Liste, Herunterladen, „Lokal öffnen“ (Datei-Export aus IndexedDB).
- [x] **Doku**: `supabase/kiva/storage.sql`, `seed.example.sql`.

### Offen

- [ ] Artefakt-Registrierung + Upload (Phase 3).
- [ ] Strengere Storage-Policies (Pfad ↔ DB).
- [ ] Service Worker: optional Cache-Hinweise für große Blobs (derzeit nur IndexedDB).

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

- [ ] Artefakt-Registrierung mit File Picker / FS Access API.
- [ ] Upload-Fortschritt, Fehlerbehandlung, RLS-Tests mit echtem Projekt.
- [ ] Konzept-Eintrag auf der Hauptseite (`src/content/concepts.ts`) — optional.

### Bekannte Limitierungen

- Kein Supabase-Projekt im Repo (nur Schema + Env-Beispiel).
- Instruktions-Dateien liegen offline in IndexedDB, nicht im Service Worker.
