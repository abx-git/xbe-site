# Deploy (GitHub Pages)

The PWA needs Supabase at **build time** (Vite embeds `VITE_*` variables).

## Repository secrets (`abx-git/kiva`)

| Secret | Value |
|--------|--------|
| `VITE_SUPABASE_URL` | `https://YOUR_PROJECT.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | anon key from Supabase dashboard |

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

1. **Import workflow** must run again after fixes on `kiva-export` (otherwise `abx-git/kiva` still has old login code with `disabled` fields).
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
