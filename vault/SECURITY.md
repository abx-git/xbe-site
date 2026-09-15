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
| `img-src` | `'self' blob:` | Vorschaubilder aus Blob-URLs |
| `media-src` | `'self' blob:` | Audio/Video-Vorschau |
| `font-src` | `'self'` | Systemfonts |
| `connect-src` | `'none'` | **Keine** Netzwerkverbindungen |
| `object-src` | `'none'` | Keine Plugins/Embeds |
| `base-uri` | `'none'` | Keine Base-Tag-Injection |
| `form-action` | `'none'` | Keine Formular-Exfiltration |
| `frame-src` | `'self' blob:` | Sandboxed Vorschau-Frames |
| `manifest-src` | `'self'` | PWA-Manifest |

> **Hinweis:** `connect-src 'none'` verhindert bewusst das Nachladen von Web-Bildern per URL. Lokale Dateien und vom Browser bereitgestellte File-Blobs beim Drag-and-Drop funktionieren weiterhin.

### PWA mit Service Worker (Cache-First)

- `manifest.webmanifest` ermöglicht Installation als PWA
- Service Worker (`sw.js`) bedient statische Assets nach dem ersten Besuch aus dem Cache
- Schützt vor temporär manipulierten Server-Antworten **nach** erfolgreichem Erstbesuch
- Kein Ersatz für signierte Desktop-Apps oder Isolated Web Apps

### DOM-XSS-Schutz

- **DOMPurify** bereinigt gerendertes Markdown/HTML vor der Anzeige
- Markdown-Links nur mit `http:`, `https:` und `mailto:` erlaubt
- Markdown-, HTML- und PDF-Vorschau in **sandboxed iframes** ohne `allow-scripts` / `allow-same-origin`
- SVG-Dateien werden ebenfalls in sandboxed iframes angezeigt

### Sitzungssperre

- Automatische Sperre nach **10 Minuten** Inaktivität
- Sperre bei Tab-Wechsel (`visibilitychange → hidden`) und beim Verlassen (`pagehide`)
- Schlüssel und Vorschau-Daten werden beim Sperren entladen

### Eingabefelder

- Passwortfeld: `autocomplete="off"`, `autocapitalize="off"`, `spellcheck="false"`
- Passwort wird nach erfolgreichem Entsperren aus dem DOM-Feld entfernt

## Bewusst nicht umgesetzt

### WebAssembly-Kryptografie

Ein Wechsel auf Wasm (Argon2id, deterministisches Zeroing) wäre ein grundlegender Umbau des Krypto-Formats und der Schlüsselableitung. Die Web Crypto API bleibt vorerst bestehen; `zeroBytes()` überschreibt sensible Byte-Arrays bestmöglich beim Sperren.

### Größenverschleierung (Padding)

Padding vor der Verschlüsselung würde das Dateiformat ändern und bestehende Vaults inkompatibel machen. Ohne Versionsmigration ist das ein Eingriff in die Abwärtskompatibilität.

### Isolated Web Apps / Tauri / Electron

Liegen außerhalb des GitHub-Pages-Deployments. Die PWA mit Service Worker ist der maximal praktikable Schritt für diese Auslieferungsform.
