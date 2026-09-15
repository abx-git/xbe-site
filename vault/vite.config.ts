import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../public/vault');

const CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src blob: data:",
  "media-src blob:",
  "font-src 'self'",
  "connect-src 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-src blob:",
  "manifest-src 'self'",
  "require-sri-for script style",
].join('; ');

function computeSri(filePath: string): string {
  const data = readFileSync(filePath);
  const hash = createHash('sha384').update(data).digest('base64');
  return `sha384-${hash}`;
}

function resolveAssetPath(src: string): string {
  const rel = src.replace(/^\/vault\//, '');
  return join(OUT_DIR, rel);
}

function stripCrossorigin(attrs: string): string {
  return attrs.replace(/\s*crossorigin(?:="[^"]*")?/gi, '').trim();
}

function addSriToHtml(html: string): string {
  html = html.replace(
    /<script\b([^>]*?)\ssrc="([^"]+)"([^>]*)>/gi,
    (match, before, src, after) => {
      if (src.startsWith('data:') || match.includes('integrity=')) return match;
      const integrity = computeSri(resolveAssetPath(src));
      const attrs = stripCrossorigin(`${before} ${after}`.trim());
      return `<script ${attrs} src="${src}" integrity="${integrity}" crossorigin="anonymous">`;
    },
  );

  html = html.replace(
    /<link\b([^>]*?)\shref="([^"]+)"([^>]*)>/gi,
    (match, before, href, after) => {
      if (!/rel="stylesheet"/i.test(match)) return match;
      if (href.startsWith('data:') || match.includes('integrity=')) return match;
      const integrity = computeSri(resolveAssetPath(href));
      const attrs = stripCrossorigin(`${before} ${after}`.trim());
      return `<link ${attrs} href="${href}" integrity="${integrity}" crossorigin="anonymous">`;
    },
  );

  return html;
}

function vaultSriPlugin() {
  return {
    name: 'vault-sri',
    closeBundle() {
      const htmlPath = join(OUT_DIR, 'index.html');
      writeFileSync(htmlPath, addSriToHtml(readFileSync(htmlPath, 'utf-8')));
    },
  };
}

export default defineConfig({
  base: '/vault/',
  build: {
    outDir: '../public/vault',
    emptyOutDir: true,
  },
  plugins: [
    {
      name: 'vault-csp-prod',
      transformIndexHtml(html, ctx) {
        if (ctx.server) return html;
        const tag = `<meta http-equiv="Content-Security-Policy" content="${CSP}" />`;
        return html.replace('</head>', `    ${tag}\n  </head>`);
      },
    },
    vaultSriPlugin(),
  ],
});
