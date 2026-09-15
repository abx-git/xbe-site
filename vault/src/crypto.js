/**
 * Kryptografie-Modul: AES-GCM-256, PBKDF2-Schlüsselableitung, Base64URL-Serialisierung.
 * Schlüssel verbleiben ausschließlich im flüchtigen RAM.
 */

import { secureGetRandomValues, secureSubtle } from './hardening.js';

const IV_LENGTH = 12;
const KEY_LENGTH = 32;
const PBKDF2_ITERATIONS = 250_000;
const PBKDF2_SALT = new TextEncoder().encode('encrypted-vault-v1-salt');

/** URL-sichere Base64-Kodierung (ohne Padding). */
export function toBase64Url(bytes) {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Base64URL-Dekodierung. */
export function fromBase64Url(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4;
  if (pad) base64 += '='.repeat(4 - pad);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/** Zufälligen 12-Byte-IV erzeugen. */
export function generateIv() {
  return secureGetRandomValues(new Uint8Array(IV_LENGTH));
}

/** Rohbytes (32 Byte) als AES-GCM-Schlüssel importieren. */
export async function importRawKey(rawBytes) {
  if (rawBytes.byteLength !== KEY_LENGTH) {
    throw new Error(`Schlüsseldatei muss exakt ${KEY_LENGTH} Bytes lang sein (erhalten: ${rawBytes.byteLength}).`);
  }
  return secureSubtle.importKey('raw', rawBytes, { name: 'AES-GCM', length: 256 }, false, [
    'encrypt',
    'decrypt',
  ]);
}

/** Passwort via PBKDF2 in AES-GCM-256-Schlüssel ableiten. */
export async function deriveKeyFromPassword(password) {
  const keyMaterial = await secureSubtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );

  const derivedBits = await secureSubtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: PBKDF2_SALT,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    KEY_LENGTH * 8,
  );

  return secureSubtle.importKey('raw', derivedBits, { name: 'AES-GCM', length: 256 }, false, [
    'encrypt',
    'decrypt',
  ]);
}

/**
 * Klartext verschlüsseln.
 * Rückgabe: IV (12 Byte) + Ciphertext + Auth-Tag.
 */
export async function encrypt(key, plaintext) {
  const iv = generateIv();
  const ciphertext = await secureSubtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  const result = new Uint8Array(IV_LENGTH + ciphertext.byteLength);
  result.set(iv, 0);
  result.set(new Uint8Array(ciphertext), IV_LENGTH);
  return result;
}

/**
 * Verschlüsselte Daten entschlüsseln.
 * Eingabe: IV (12 Byte) + Ciphertext + Auth-Tag.
 */
export async function decrypt(key, data) {
  if (data.byteLength < IV_LENGTH + 16) {
    throw new Error('Verschlüsselte Daten zu kurz.');
  }
  const iv = data.slice(0, IV_LENGTH);
  const ciphertext = data.slice(IV_LENGTH);
  const plaintext = await secureSubtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
  return new Uint8Array(plaintext);
}

/** Dateinamen verschlüsseln → Base64URL-String für das Dateisystem. */
export async function encryptName(key, name) {
  const plaintext = new TextEncoder().encode(name);
  const encrypted = await encrypt(key, plaintext);
  return toBase64Url(encrypted);
}

/** Base64URL-Dateiname entschlüsseln → Klartext. */
export async function decryptName(key, encryptedName) {
  const data = fromBase64Url(encryptedName);
  const plaintext = await decrypt(key, data);
  return new TextDecoder().decode(plaintext);
}

/** Dateiinhalt verschlüsseln (IV vorangestellt). */
export async function encryptContent(key, content) {
  return encrypt(key, new Uint8Array(content));
}

/** Dateiinhalt entschlüsseln (IV am Anfang). */
export async function decryptContent(key, data) {
  return decrypt(key, new Uint8Array(data));
}
