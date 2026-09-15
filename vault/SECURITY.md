# Sicherheitskonzept – Encrypted Vault

Dieses Dokument beschreibt umgesetzte und bewusst nicht umgesetzte Sicherheitsmaßnahmen für die GitHub-Pages-Auslieferung.

## Umgesetzt

### Content Security Policy (CSP)

In Produktions-Builds wird eine restriktive CSP per Meta-Tag gesetzt:

| Direktive | Wert | Zweck |
|-----------|------|-------|
| `default-src` | `'none'` | Standardmäßig alles blockiert |
| `script-src` | `'self'` | Nur gebündeltes App-Skript |
| `style-src` | `'self'` | Nur lokale Stylesheets |
| `img-src` | `blob: data:` | Nur lokale Blob-/Data-URLs (kein HTTP-Exfil) |
| `media-src` | `blob:` | Audio/Video nur aus Blob-URLs |
| `font-src` | `'self'` | Systemfonts |
| `connect-src` | `'none'` | **Keine** Netzwerkverbindungen |
| `object-src` | `'none'` | Keine Plugins/Embeds |
| `base-uri` | `'none'` | Keine Base-Tag-Injection |
| `form-action` | `'none'` | Keine Formular-Exfiltration |
| `frame-src` | `blob:` | Sandboxed Vorschau-Frames |
| `manifest-src` | `'self'` | PWA-Manifest |
| `require-sri-for` | `script style` | SRI für alle Bundles erzwingen |

**Meta-CSP-Limitationen:** `frame-ancestors` ist per Meta-Tag nicht durchsetzbar. Zusätzlich prüft `hardening.js` beim Start `window.top === window.self` (Frame-Busting / Clickjacking-Schutz).

**DNS-Prefetch:** `<meta http-equiv="x-dns-prefetch-control" content="off">` deaktiviert DNS-Prefetching als potenziellen Exfiltrationskanal.

### Subresource Integrity (SRI)

Der Vite-Build berechnet **SHA-384-Hashes** für alle JS- und CSS-Bundles und fügt `integrity`-Attribute in `index.html` ein. Kombiniert mit `require-sri-for` blockiert der Browser manipulierte Bundles sofort.

### Origin-Isolation (COOP / COEP)

Da GitHub Pages keine benutzerdefinierten HTTP-Header erlaubt, setzt der **Service Worker** diese Header synthetisch auf alle Antworten:

| Header | Wert |
|--------|------|
| `Cross-Origin-Opener-Policy` | `same-origin` (nur HTML) |
| `Cross-Origin-Embedder-Policy` | `require-corp` (nur HTML) |
| `Cross-Origin-Resource-Policy` | `same-origin` (alle Assets) |

### Permissions Policy

Per Meta-Tag und Service Worker deaktiviert:

`camera=(), microphone=(), geolocation=(), payment=(), usb=(), screen-wake-lock=()`

### PWA mit Service Worker (Cache-First)

- `manifest.webmanifest` ermöglicht Installation als PWA
- Service Worker bedient statische Assets nach dem ersten Besuch aus dem Cache
- Schützt vor temporär manipulierten Server-Antworten **nach** erfolgreichem Erstbesuch

### DOM-XSS-Schutz

- **DOMPurify** bereinigt gerendertes Markdown/HTML vor der Anzeige
- Markdown-Links nur mit `http:`, `https:` und `mailto:` erlaubt
- Markdown-, HTML-, PDF- und SVG-Vorschau in **sandboxed iframes** ohne `allow-scripts` / `allow-same-origin`

### Laufzeit-Absicherung (`hardening.js`)

- **Frame-Busting** gegen Clickjacking
- **Prototyp-Einfrierung** (`Object.prototype`, `Array.prototype`, `Function.prototype`) gegen Prototype Pollution durch Erweiterungen
- **Frühe Kapselung** von `crypto.subtle` und `crypto.getRandomValues` vor möglicher Manipulation

> **Empfehlung:** Für maximale Sicherheit ein separates Browser-Profil **ohne aktive Erweiterungen** verwenden. Erweiterungen können den DOM und globalen Kontext manipulieren – unabhängig von der CSP.

### Sitzungssperre & Handle-Verwaltung

- Automatische Sperre nach **10 Minuten** Inaktivität
- Sperre bei Tab-Wechsel (`visibilitychange → hidden`) und beim Verlassen (`pagehide`)
- Beim Sperren werden **alle Schlüssel**, Vorschau-Daten und **FileSystemDirectoryHandle/-FileHandle-Referenzen** im App-Speicher verworfen
- Nach einer Sperre ist erneut Passwort/Schlüsseldatei **und** Verzeichnisauswahl nötig

> Hinweis: Der Browser kann Verzeichnis-Berechtigungen in IndexedDB persistieren. Die App nutzt nach einer Sperre keine gespeicherten Handles mehr – der Nutzer muss den Ordner erneut auswählen.

### Eingabefelder

- Passwortfeld: `autocomplete="off"`, `autocapitalize="off"`, `spellcheck="false"`
- Passwort wird nach erfolgreichem Entsperren aus dem DOM-Feld entfernt

## Bewusst nicht umgesetzt

### WebAssembly-Kryptografie

Ein Wechsel auf Wasm (Argon2id, deterministisches Zeroing) wäre ein grundlegender Umbau des Krypto-Formats und der Schlüsselableitung.

### Größenverschleierung (Padding)

Padding vor der Verschlüsselung würde das Dateiformat ändern und bestehende Vaults inkompatibel machen.

### Isolated Web Apps / Tauri / Electron

Liegen außerhalb des GitHub-Pages-Deployments.
