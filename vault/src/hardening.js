/**
 * Frühe Laufzeit-Absicherung – muss vor allen anderen App-Modulen geladen werden.
 * Kapselt native Krypto-APIs und erschwert Manipulation durch Browser-Erweiterungen.
 */

if (window.top !== window.self) {
  try {
    window.top.location = window.self.location;
  } catch {
    document.documentElement.textContent = '';
    const msg = document.createElement('p');
    msg.textContent = 'Frame-Einbettung ist aus Sicherheitsgründen nicht erlaubt.';
    document.body?.appendChild(msg);
    throw new Error('Clickjacking-Schutz: Frame-Einbettung blockiert.');
  }
}

/** Native Web-Crypto-Referenzen vor möglicher Erweiterungs-Manipulation sichern. */
export const secureSubtle = crypto.subtle;
export const secureGetRandomValues = crypto.getRandomValues.bind(crypto);

try {
  Object.freeze(Object.prototype);
  Object.freeze(Array.prototype);
  Object.freeze(Function.prototype);
} catch {
  // Bereits eingefroren oder Umgebung erlaubt es nicht
}
