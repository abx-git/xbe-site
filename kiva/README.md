# Kiva

PWA for shared work instructions: **sign-in (Supabase)**, local engine (IndexedDB), optional remote (DB + Storage).

**Concept:** [docs/kiva/CONCEPT.md](../docs/kiva/CONCEPT.md)  
**Progress:** [docs/kiva/PROGRESS.md](../docs/kiva/PROGRESS.md)

**Live (after deploy):** `https://www.x-be.de/kiva/`

## Development

```bash
cd kiva
cp .env.example .env   # set Supabase URL and anon key
npm install
npm run dev            # http://localhost:5173/kiva/
npm run build          # → ../public/kiva/
```

## Supabase

SQL reference: [supabase/kiva/schema.sql](../supabase/kiva/schema.sql)

## Architecture (short)

- **E2/ET2:** browser app + local engine + optional remote adapter (no custom backend).
- **Phase 1:** sign-in and session.
- **Phase 2:** instruction catalog, download, offline storage (IndexedDB).
- **Phase 3:** register artifacts and upload (MVP).
