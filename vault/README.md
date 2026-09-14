# Encrypted Vault

Statische Single-Page-Anwendung für einen lokalen, verschlüsselten Dateimanager. Alle Operationen laufen rein clientseitig im Browser – kein Backend.

**Live-URL (nach Deploy):** `https://www.x-be.de/vault/`

## Voraussetzungen

- Chromium-basierter Browser (Chrome, Edge, Brave) mit [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)
- Firefox und Safari werden **nicht** unterstützt

## Entwicklung

```bash
cd vault
npm install
npm run dev        # http://localhost:5173/vault/
npm run build      # → ../public/vault/
```

## Architektur

| Modul | Datei | Aufgabe |
|-------|-------|---------|
| Krypto | `src/crypto.js` | AES-GCM-256, PBKDF2, Base64URL |
| Dateisystem | `src/fs-adapter.js` | File System Access API, verschlüsselte Namen |
| Editor | `src/editor.ts` | Text/Markdown-Bearbeitung, Toolbar, HTML↔MD |
| UI | `src/main.ts` | Explorer, Viewer, Dropzone |

## Kryptografie

- **Algorithmus:** AES-GCM (256 Bit)
- **Schlüssel:** 32-Byte-Rohdatei oder PBKDF2 (SHA-256, 250.000 Iterationen) aus Passwort
- **Dateinamen:** `IV (12 B) + Ciphertext + Tag` → Base64URL
- **Dateiinhalt:** `IV (12 B) + Ciphertext + Tag`
- Schlüssel verbleiben ausschließlich im flüchtigen RAM

## Deploy

Der Vault wird automatisch mit der Hauptseite gebaut:

```bash
cd vault && npm ci && npm run build
cd .. && npm run build
```

GitHub Actions (`.github/workflows/deploy.yml`) führt beide Schritte bei jedem Push auf `main` aus.
