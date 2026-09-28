# Deploy (GitHub Pages)

The PWA needs Supabase at **build time** (Vite embeds `VITE_*` variables).

## Secrets (`abx-git/kiva`)

| Secret | Value |
|--------|--------|
| `VITE_SUPABASE_URL` | `https://YOUR_PROJECT.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | anon key from Supabase dashboard |

**Wichtig:** Der **Build**-Job braucht die Secrets. Wenn du sie nur unter **Environments → github-pages** angelegt hast, muss der **build**-Job ebenfalls `environment: github-pages` haben (siehe Vorlage `kiva-deploy.workflow.yml`). Alternativ: Secrets unter **Settings → Secrets and variables → Actions** (Repository secrets) — dann reicht `${{ secrets.* }}` ohne Environment am Build-Job.

Im Deploy-Log stehen die Variablen oft **leer** (`VITE_SUPABASE_URL:` ohne Wert) → App baut ohne Supabase, Login bleibt deaktiviert.

## Workflow

In `.github/workflows/deploy.yml`, pass secrets to the build step:

```yaml
      - name: Build Kiva PWA
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        run: npm run build
```

Then re-run **Deploy Kiva (GitHub Pages)**.

## Checklist when the app “does nothing”

1. **One-time import** from xbe-site only if `abx-git/kiva` never got the current code; afterwards edit **only** in `kiva`. Do not re-run import routinely — it force-pushes `main`.
2. Secret names must be exactly `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (repository secrets, not only environment secrets).
3. Add a verify step before `npm run build` in `deploy.yml`:

```yaml
      - name: Verify Supabase secrets
        run: |
          test -n "$VITE_SUPABASE_URL" || { echo "::error::VITE_SUPABASE_URL secret is empty"; exit 1; }
          test -n "$VITE_SUPABASE_ANON_KEY" || { echo "::error::VITE_SUPABASE_ANON_KEY secret is empty"; exit 1; }
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

4. After deploy: hard refresh (Ctrl+Shift+R) or clear site data for `github.io` (old service worker cache).
