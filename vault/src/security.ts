/** Sicherheits-Hilfsfunktionen: Sitzungssperre, Sandbox-Vorschau, PWA-Registrierung. */

const IDLE_LOCK_MS = 10 * 60 * 1000;

let idleTimer: ReturnType<typeof setTimeout> | null = null;
let sessionArmed = false;
let lockCallback: (() => void) | null = null;

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const SANDBOX_STYLES = `
  body{margin:0;padding:1rem;font-family:system-ui,sans-serif;background:#0f1419;color:#e8edf4;line-height:1.6}
  a{color:#38bdf8;pointer-events:none}
  pre,code{font-family:ui-monospace,monospace;background:#1a2332;border-radius:4px}
  pre{padding:.75rem 1rem;overflow:auto}
  code{padding:.125rem .375rem}
  blockquote{border-left:3px solid #38bdf8;padding-left:1rem;color:#8b9cb3;margin:.75rem 0}
  h1,h2,h3{margin:.75rem 0 .5rem}
  ul,ol{margin:.5rem 0 .75rem 1.5rem}
  img,video,audio{max-width:100%}
`;

/** HTML in isoliertem iframe ohne Skripte rendern. */
export function sandboxPreviewIframe(contentHtml: string, extraClass = ''): string {
  const doc = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${SANDBOX_STYLES}</style></head><body class="${extraClass}">${contentHtml}</body></html>`;
  return `<iframe class="sandbox-preview" sandbox="" referrerpolicy="no-referrer" title="Vorschau" srcdoc="${escapeAttr(doc)}"></iframe>`;
}

/**
 * PDF über <embed> – Chrome blockiert PDFs in sandboxed iframes.
 * Skripte im PDF-Kontext werden vom Browser-Viewer isoliert; object-src blob: in CSP nötig.
 */
export function blobPdfEmbed(blobUrl: string, title: string): string {
  return `<embed class="blob-preview pdf-preview" type="application/pdf" src="${escapeAttr(blobUrl)}" title="${escapeAttr(title)}" />`;
}

function clearIdleTimer(): void {
  if (idleTimer !== null) {
    clearTimeout(idleTimer);
    idleTimer = null;
  }
}

function resetIdleTimer(): void {
  if (!sessionArmed || !lockCallback) return;
  clearIdleTimer();
  idleTimer = setTimeout(() => lockCallback?.(), IDLE_LOCK_MS);
}

function onVisibilityChange(): void {
  if (document.visibilityState === 'hidden') {
    lockCallback?.();
  }
}

function onPageHide(): void {
  lockCallback?.();
}

/** Automatische Sperre nach Inaktivität und beim Verlassen des Tabs. */
export function armSessionSecurity(onLock: () => void): void {
  disarmSessionSecurity();
  sessionArmed = true;
  lockCallback = onLock;

  const activity = ['mousedown', 'keydown', 'touchstart', 'pointerdown'] as const;
  for (const event of activity) {
    document.addEventListener(event, resetIdleTimer, { passive: true });
  }
  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('pagehide', onPageHide);

  resetIdleTimer();
}

export function disarmSessionSecurity(): void {
  sessionArmed = false;
  lockCallback = null;
  clearIdleTimer();

  const activity = ['mousedown', 'keydown', 'touchstart', 'pointerdown'] as const;
  for (const event of activity) {
    document.removeEventListener(event, resetIdleTimer);
  }
  document.removeEventListener('visibilitychange', onVisibilityChange);
  window.removeEventListener('pagehide', onPageHide);
}

/** Uint8Array mit Nullen überschreiben (bestmöglich im Browser). */
export function zeroBytes(buf: Uint8Array): void {
  buf.fill(0);
}

/** Service Worker für Cache-First-Offline-Betrieb registrieren. */
export function registerServiceWorker(): void {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  const swUrl = `${import.meta.env.BASE_URL}sw.js`;
  navigator.serviceWorker.register(swUrl).catch(() => {
    // SW-Registrierung ist optional (z. B. unsicherer Kontext)
  });
}
