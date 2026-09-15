import { defineConfig } from 'vite';

const CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' blob:",
  "media-src 'self' blob:",
  "font-src 'self'",
  "connect-src 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-src 'self' blob:",
  "manifest-src 'self'",
].join('; ');

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
  ],
});
