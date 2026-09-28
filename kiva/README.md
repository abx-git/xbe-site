# Kiva

PWA für geteilte Arbeitsanweisungen: **Login (Supabase)**, lokale Engine (IndexedDB), optional Remote (DB + Storage).

**Konzept:** [docs/kiva/KONZEPT.md](../docs/kiva/KONZEPT.md)  
**Fortschritt:** [docs/kiva/FORTSCHRITT.md](../docs/kiva/FORTSCHRITT.md)

**Live (nach Deploy):** `https://www.x-be.de/kiva/`

## Entwicklung

```bash
cd kiva
cp .env.example .env   # Supabase-URL und Anon-Key eintragen
npm install
npm run dev            # http://localhost:5173/kiva/
npm run build          # → ../public/kiva/
```

## Supabase

SQL-Referenz: [supabase/kiva/schema.sql](../supabase/kiva/schema.sql)

## Architektur (kurz)

- **E2/ET2:** Browser-App + lokale Engine + optionaler Remote-Adapter (kein eigenes Backend).
- **Phase 1:** Login und Session.
- **Phase 2:** Instruktionskatalog, Download, Offline-Speicher (IndexedDB).
- **Phase 3:** Artefakte registrieren und hochladen (geplant).
