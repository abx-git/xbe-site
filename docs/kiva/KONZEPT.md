# Kiva — Konzept

**Stand:** 2026-09-28  
**Status:** Konzept + MVP-Skelett (Login, PWA, Adapter-Schicht)

## Vision

Kiva ist eine **installierbare Webanwendung (PWA)**, mit der autorisierte Nutzer **Arbeitsanweisungen (Instruktionen)** von einer zentralen Plattform beziehen, die **Ergebnisse lokal** mit beliebiger Desktop-Software erzeugen, diese Ergebnisse **in Kiva registrieren** und **wieder hochladen**, damit andere Kiva-Nutzer sie nutzen können.

## Architekturprinzip (E2 / ET2)

Im Umfeld von [E2](https://github.com/abx-git/E2) und dem lokalen **Encrypted Vault** (`vault/`) bezeichnet **ET2** hier dieselbe Technik:

| Schicht | Rolle |
|--------|--------|
| **Browser-App (Thin Client)** | UI, Session, Orchestrierung — keine Geschäftslogik auf dem Server |
| **Lokale Engine** | IndexedDB, Cache, optional File System Access API — Daten und Zwischenstände bleiben unter Nutzerkontrolle |
| **Remote-Adapter (optional)** | Supabase: Auth, Metadaten (Postgres), Dateien (Storage) — nur bei Online + gültiger Session |

```text
┌─────────────────────────────────────────────────────────┐
│                    Kiva PWA (Browser)                    │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │ UI / Router │  │ Lokale Engine │  │ Remote-Adapter  │ │
│  │ Login, …    │  │ IndexedDB     │  │ Supabase Auth   │ │
│  │             │  │ SW-Cache      │  │ DB + Storage    │ │
│  └──────┬──────┘  └───────┬──────┘  └────────┬────────┘ │
│         └─────────────────┴──────────────────┘          │
└─────────────────────────────────────────────────────────┘
          │                              │
          ▼                              ▼
   Lokale Dateien (OS)            Supabase (zentral)
   DAW, CAD, Office, …           Instruktionen, Artefakte
```

**Offline-first für Lesen:** Bereits heruntergeladene Instruktionen und registrierte Metadaten sind lokal verfügbar. **Schreiben in die Gemeinschaft** erfordert Netz und Authentifizierung.

## Domänenmodell (Zielbild)

| Entität | Beschreibung |
|---------|----------------|
| **Nutzer** | Identität über Supabase Auth (`auth.users`) |
| **Instruktion** | Versioniertes Paket: Metadaten + Dateien (PDF, ZIP, …) in Storage |
| **Artefakt-Registrierung** | Lokaler Eintrag: welche Datei gehört zu welcher Instruktion, Hash, Status |
| **Veröffentlichung** | Upload eines Artefakts in Storage + Freigabe-Metadaten für andere Nutzer |

### Nutzerfluss (Golden Path)

1. **Login** — E-Mail/Passwort (oder Magic Link) gegen Supabase.
2. **Instruktionen** — Liste aus DB, Download in lokalen Cache / optional auf Festplatte.
3. **Lokal arbeiten** — Externe Software; Kiva hält nur Referenzen und Metadaten.
4. **Registrieren** — Nutzer wählt Datei(en), verknüpft mit Instruktion, berechnet Prüfsumme.
5. **Hochladen** — Blob nach Storage, Zeile in `artifacts`, Sichtbarkeit für Organisation/Community.
6. **Teilen** — Andere Nutzer sehen veröffentlichte Artefakte und können herunterladen.

## Sicherheit & Datenschutz

- **Auth:** JWT über Supabase; Refresh im Browser; keine eigenen Passwort-Hashes in Kiva.
- **RLS:** Row Level Security auf allen Tabellen — nur eigene Drafts schreiben, veröffentlichte Artefakte lesen gemäß Policy.
- **Storage:** Buckets mit policies; Pfade enthalten `user_id` / `artifact_id`.
- **CSP:** Strikte Policy in Produktion; `connect-src` nur Supabase-Projekt-URL (+ optional Realtime).

## Technologie-Stack

| Bereich | Wahl | Begründung |
|---------|------|------------|
| Build | Vite 7 + TypeScript | Gleiches Muster wie `vault/` |
| Hosting | Statisch unter `/kiva/` auf x-be.de | GitHub Pages |
| Auth & Backend | Supabase | Zentrale DB, Storage, Auth out of the box |
| PWA | `manifest.webmanifest` + Service Worker | Installierbar, App-Shell offline |
| Lokaler Zustand | IndexedDB (`idb` oder native) | Strukturierte Cache-Metadaten |

## Projektstruktur

```text
kiva/                 # SPA-Quellcode
docs/kiva/            # Konzept & Fortschritt
supabase/kiva/        # SQL-Schema (Referenz für Backend-Setup)
```

## Phasenplan

| Phase | Inhalt | Status |
|-------|--------|--------|
| **0** | Konzept, Docs, Repo-Skelett, PWA-Shell | In Arbeit |
| **1** | Login + Session + geschützte Startseite | MVP implementiert |
| **2** | Instruktionen: Liste, Download, Offline-Cache | Erledigt (MVP) |
| **3** | Artefakt registrieren (lokal) + Upload | Erledigt (MVP) |
| **4** | Freigabe, Suche, Organisationen | Geplant |

## Supabase-Einrichtung (Betreiber)

1. Neues Supabase-Projekt anlegen.
2. `supabase/kiva/schema.sql` im SQL-Editor ausführen.
3. Storage-Buckets `instructions` und `artifacts` anlegen (Policies siehe Schema-Kommentare).
4. In `kiva/.env` (lokal) bzw. CI-Secrets: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.

Ohne diese Variablen startet Kiva im **Demo-Modus** (Hinweis in der UI, kein echter Login).

## Abgrenzung zu E2 Board

- **E2** liefert **Domänenmodell-Kontext** (`.storm.json`) für Agenten.
- **Kiva** liefert **operative Arbeitsabläufe** (Instruktionen ↔ Artefakte) mit zentraler Freigabe.

Eine spätere Integration (Instruktion referenziert E2-Snapshot) ist möglich, aber nicht Teil von Phase 0–1.
