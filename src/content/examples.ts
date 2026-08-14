export interface Example {
  slug: string;
  title: string;
  status: 'skizze' | 'reproduzierbar';
  summary: string;
  paragraphs: readonly string[];
  links: readonly { label: string; href: string; external?: boolean }[];
}

export const examplesIndex = {
  title: 'Beispiele',
  description:
    'Walkthroughs und Artefaktstände. Skizzen sind als solche markiert — noch kein vollständiger reproduzierbarer Case.',
} as const;

export const examples: readonly Example[] = [
  {
    slug: 'roundtrip-skizze',
    title: 'Roundtrip E2 → Agent → AGM (Skizze)',
    status: 'skizze',
    summary:
      'Nummerierter Pfad mit Artefakten. Noch kein öffentliches Sample-Repo mit Code- und Doc-Stand — die Sequenz soll nachbaubar werden.',
    paragraphs: [
      'Ziel: zeigen, welche Dateien und Schritte gemeint sind, wenn von „Zusammenspiel“ die Rede ist — ohne Marketing-Claim.',
      'Schritt A — Domäne: Im E2 Board ein kleines Bounded Context modellieren (z. B. Order/Payment). Export als `.storm.json` gegen board-snapshot-v1 validieren.',
      'Schritt B — Implementierung: In einer IDE den JSON-Snapshot als Kontext anhängen. Agent implementiert ein Aggregate/API gemäß Board. Mensch reviewed Diff und Tests.',
      'Schritt C — Architektur: AGM im Repo installieren/adoptieren. Context/Container (C4) und eine kurze arc42-Sektion aus Code + Board ableiten. Verify in frischem Chat (report-only).',
      'Schritt D — Feedback: Abweichungen (Hotspots, fehlende Events) zurück ins Board oder als WRK-Item im Graph. Pro Projekt festlegen, welches Artefakt bei Konflikt führt.',
      'Fehlt noch: öffentliches Minimal-Repo mit Board-Snapshot, App-Stub und `docs/architecture/` als Referenzstand. Bis dahin bleibt dieser Eintrag eine Skizze.',
    ],
    links: [
      { label: 'Zusammenspiel', href: '/compose' },
      { label: 'E2 Board', href: 'https://abx-git.github.io/E2/', external: true },
      { label: 'AGM Assistant', href: 'https://abx-git.github.io/agm.github.io/', external: true },
      { label: 'E2 Schema', href: 'https://abx-git.github.io/E2/schemas/board-snapshot-v1.schema.json', external: true },
    ],
  },
];

export function getExample(slug: string): Example | undefined {
  return examples.find((e) => e.slug === slug);
}

export function getSortedExamples(): Example[] {
  return [...examples];
}
