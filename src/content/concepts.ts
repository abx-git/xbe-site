export type ConceptStatus = 'stabil' | 'experimentell' | 'entwurf';

export interface ConceptLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Concept {
  slug: string;
  title: string;
  shortTitle: string;
  status: ConceptStatus;
  oneLiner: string;
  problem: string;
  approach: string;
  artifact: {
    name: string;
    detail: string;
  };
  demo: ConceptLink[];
  not: readonly string[];
  related: readonly string[];
  paragraphs?: readonly string[];
}

export const conceptsIndex = {
  title: 'Konzepte',
  description:
    'Jeder Eintrag steht für sich: Problem, Ansatz, Artefaktvertrag, Demo, Grenzen. Zusammenspiel ist optional und separat beschrieben.',
} as const;

export const concepts: readonly Concept[] = [
  {
    slug: 'e2',
    title: 'E2 — Collaborative Domain Modeling',
    shortTitle: 'E2',
    status: 'experimentell',
    oneLiner:
      'Grafische Domänen-Spezifikation (Event Storming, DDD, BDD, USM, Event Modeling) → schema-konformes JSON als Input für Agenten.',
    problem:
      'Workshop-Ergebnisse landen oft als Whiteboard-Foto oder loses Markdown. Agenten bekommen daraus keinen verbindlichen Fachvertrag — nur Text.',
    approach:
      'Ein Board für Domain Modeling. Ergebnis ist kein Screenshot, sondern eine schema-konforme `.storm.json` (board-snapshot-v1): Elemente, Relationen, Glossary, Hotspots, optionale Event-Schemas. Domänendaten bleiben lokal im Browser.',
    artifact: {
      name: 'board-snapshot-v1 (.storm.json)',
      detail:
        'JSON Schema: https://abx-git.github.io/E2/schemas/board-snapshot-v1.schema.json — Maschinenlesbare Fachwahrheit als zusätzlicher Agenten-Input.',
    },
    demo: [
      { label: 'E2 Board (Live)', href: 'https://abx-git.github.io/E2/', external: true },
      { label: 'Board eingebettet', href: '/concepts/e2/board' },
      { label: 'Repository', href: 'https://github.com/abx-git/E2', external: true },
      { label: 'JSON Schema', href: 'https://abx-git.github.io/E2/schemas/board-snapshot-v1.schema.json', external: true },
    ],
    not: [
      'Kein Ersatz für Facilitation oder Domänenarbeit im Team',
      'Keine vollständige Softwarearchitektur-Dokumentation (das ist AGM)',
      'Kein Server für Board-Inhalt — Daten lokal',
    ],
    related: ['agm'],
    paragraphs: [
      'Methoden-Mix nach Bedarf: Event Storming, DDD, BDD/Example Mapping, User Story Mapping, Event Modeling — einzeln oder kombiniert auf einem Board.',
      'Praktischer Pfad: Workshop → modellieren → `.storm.json` exportieren → in der IDE als Agenten-Kontext referenzieren (z. B. „Implementiere Aggregate X gemäß Board“).',
    ],
  },
  {
    slug: 'agm',
    title: 'AGM — Architecture Graph Method',
    shortTitle: 'AGM',
    status: 'experimentell',
    oneLiner:
      'Repo-lokaler Markdown-Linkgraph unter docs/architecture/ — traversierbar für Agenten, gepflegt mit menschlicher Prüfung.',
    problem:
      'Architekturwissen steckt in Code, Wikis und Chat-Verläufen. RAG über Chunks ist für reproduzierbare Architekturaussagen schwach: probabilistisch, schwer an Artefakte gebunden.',
    approach:
      'Dokumentation als Graph im Repository: Markdown mit expliziten Links, orchestriert über `blueprint.md`, Navigation ab `entry-point.md`. Agenten traversieren Kanten statt Similarity-Search. Menschen prüfen Ergebnisse (Verify in frischem Chat).',
    artifact: {
      name: 'docs/architecture/ (Markdown-Linkgraph)',
      detail:
        'OKF-nahe Struktur (Frontmatter, index.md, log.md). Tracks: Build, Evolve, Architect, Domain, Verify. Optional MCP/CLI.',
    },
    demo: [
      { label: 'AGM Assistant (Live)', href: 'https://abx-git.github.io/agm.github.io/', external: true },
      { label: 'Assistant eingebettet', href: '/concepts/agm/assistant' },
    ],
    not: [
      'Kein Ersatz für Architektururteil',
      'Kein Domänen-Workshop-Board (das ist E2)',
      'Kein RAG-Produkt — Graph-Traversierung ist der Punkt',
    ],
    related: ['e2'],
    paragraphs: [
      'These: Architekturdokumentation ist die API der KI-Konversation — wenn sie versioniert, verlinkt und prüfbar vorliegt.',
      'Golden Path grob: Install → Adopt → Continue → Maintain → Verify. Details im Assistant und in den Workflow-Prompts.',
    ],
  },
];

export function getConcept(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug);
}

export function getSortedConcepts(): Concept[] {
  return [...concepts];
}
