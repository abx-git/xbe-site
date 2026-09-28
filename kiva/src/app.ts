import type { Session } from '@supabase/supabase-js';
import { signInWithPassword, signOut } from './auth/login';
import type { KivaConfig } from './config';
import { isSupabaseConfigured } from './config';
import type { AppView } from './types';

export interface AppState {
  view: AppView;
  session: Session | null;
  error: string | null;
  loading: boolean;
}

export function createInitialState(session: Session | null): AppState {
  return {
    view: session ? 'home' : 'login',
    session,
    error: null,
    loading: false,
  };
}

export function renderApp(root: HTMLElement, config: KivaConfig, state: AppState): void {
  const configured = isSupabaseConfigured(config);

  root.innerHTML = `
    <header class="brand">
      <img src="${import.meta.env.BASE_URL}icon.svg" width="40" height="40" alt="" />
      <div>
        <h1>Kiva</h1>
        <p class="tagline">Lokal arbeiten · zentral teilen</p>
      </div>
    </header>
    ${!configured ? `<div class="alert warn" role="status">Demo-Modus: Supabase-Keys fehlen (<code>kiva/.env</code>). Login ist deaktiviert.</div>` : ''}
    ${state.error ? `<div class="alert error" role="alert">${escapeHtml(state.error)}</div>` : ''}
    ${state.view === 'login' ? renderLogin(configured, state.loading) : renderHome(state.session)}
  `;

  if (state.view === 'login' && configured) {
    const form = root.querySelector<HTMLFormElement>('#login-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const email = String(fd.get('email') ?? '').trim();
      const password = String(fd.get('password') ?? '');
      void onLogin(config, email, password);
    });
  }

  const logoutBtn = root.querySelector<HTMLButtonElement>('#logout');
  logoutBtn?.addEventListener('click', () => void onLogout(config));
}

function renderLogin(configured: boolean, loading: boolean): string {
  return `
    <section class="card" aria-labelledby="login-title">
      <h2 id="login-title">Anmelden</h2>
      <p>Zugang zur zentralen Kiva-Datenbank (Supabase). Nach dem Login folgen Instruktionen und Uploads.</p>
      <form id="login-form">
        <label for="email">E-Mail</label>
        <input id="email" name="email" type="email" autocomplete="username" required ${configured ? '' : 'disabled'} />
        <label for="password">Passwort</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required ${configured ? '' : 'disabled'} />
        <button type="submit" ${configured && !loading ? '' : 'disabled'}>${loading ? 'Wird angemeldet…' : 'Anmelden'}</button>
      </form>
    </section>
    <div class="roadmap">
      <strong>Geplant (E2/ET2-Architektur)</strong>
      <ul>
        <li>Instruktionen herunterladen & offline lesen</li>
        <li>Artefakte lokal registrieren</li>
        <li>Ergebnisse hochladen & für andere Nutzer freigeben</li>
      </ul>
    </div>
  `;
}

function renderHome(session: Session | null): string {
  const email = session?.user.email ?? 'Unbekannt';
  return `
    <section class="card" aria-labelledby="home-title">
      <h2 id="home-title">Willkommen</h2>
      <p>Sie sind angemeldet als <span class="session-email">${escapeHtml(email)}</span>.</p>
      <p>Die nächsten Module (Instruktionen, Registrierung, Upload) werden an die lokale IndexedDB-Engine und Supabase Storage angebunden.</p>
      <button type="button" class="secondary" id="logout">Abmelden</button>
    </section>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

type AppController = {
  config: KivaConfig;
  root: HTMLElement;
  setState: (patch: Partial<AppState>) => void;
  getState: () => AppState;
};

let controller: AppController | null = null;

export function bindAppController(c: AppController): void {
  controller = c;
}

async function onLogin(config: KivaConfig, email: string, password: string): Promise<void> {
  if (!controller) return;
  controller.setState({ loading: true, error: null });
  const result = await signInWithPassword(config, email, password);
  if (!result.ok) {
    controller.setState({ loading: false, error: result.message });
    renderApp(controller.root, controller.config, controller.getState());
    return;
  }
  controller.setState({ loading: false, error: null });
}

async function onLogout(config: KivaConfig): Promise<void> {
  await signOut(config);
}

export function applySession(session: Session | null): void {
  if (!controller) return;
  controller.setState({
    session,
    view: session ? 'home' : 'login',
    loading: false,
    error: null,
  });
  renderApp(controller.root, controller.config, controller.getState());
}
