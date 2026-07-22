export const e2Poster = {
  title: 'E2 — Collaborative Domain Modeling',
  subtitle: 'Auf einer Seite',
  thesis: 'Das Domänenmodell ist die Fach-API der KI-Konversation.',
  tagline:
    'Workshop → Board → schema-konformes .storm.json → KI-Agenten. Domänendaten lokal beim Nutzer; komplementär zum AGM-Architekturgraph.',
  demoPath: [
    { step: 'Workshop', action: 'ES · DDD · BDD · USM · EM facilitieren', hint: 'Fach-Stakeholder + Architect' },
    { step: 'Model', action: 'Elemente, Relationen, Glossary, Hotspots', hint: 'ein Board, Methoden mischbar' },
    { step: 'Export', action: 'board-snapshot-v1 (.storm.json)', hint: 'Schema-validiert' },
    { step: 'Context', action: 'JSON in Agent-Session einhängen', hint: 'Cursor · Claude · Copilot' },
    { step: 'Bridge', action: 'Optional: Contexts/Events → AGM', hint: 'Migrationsplanung & Guardrails' },
  ],
  methods: [
    { id: 'ES', name: 'Event Storming', purpose: 'Domain Events, Commands, Aggregates, Policies' },
    { id: 'DDD', name: 'Domain-Driven Design', purpose: 'Subdomains, Entities, Value Objects, Repositories' },
    { id: 'BDD', name: 'BDD / Example Mapping', purpose: 'Rules, Examples, Questions' },
    { id: 'USM', name: 'User Story Mapping', purpose: 'Aktivitäten, Steps, Stories' },
    { id: 'EM', name: 'Event Modeling', purpose: 'Timeline, Swimlanes, Read Models, UI' },
  ],
  schema: {
    id: 'board-snapshot-v1',
    url: 'https://abx-git.github.io/E2/schemas/board-snapshot-v1.schema.json',
    fields: [
      'elements — Typ, Label, Attribute, optionale Event-/Aggregate-Schemas',
      'relations — typisierte Verbindungen inkl. Auto-Vorschlag',
      'glossary — Ubiquitous Language',
      'hotspots — offene Fragen mit Status/Priorität',
      'swimlanes · bounded contexts · workshop-Metadaten',
    ],
  },
  compare: {
    whiteboard: [
      'Foto / Miro-Export',
      'Nicht schema-gebunden',
      'Schwer versionierbar',
      'Kaum maschinenlesbar für Agenten',
    ],
    e2: [
      'Lokale .storm.json',
      'Fixiertes JSON Schema',
      'Git-fähig, diffbar',
      'Direkter KI-Context Input',
    ],
  },
  offers: [
    { title: 'Workshop', text: 'Facilitierte Domain Discovery + validiertes Deliverable' },
    { title: 'Bundle AGM', text: 'Fachliche Wahrheit → Architekturgraph → KI-Inkremente' },
    { title: 'Enablement', text: 'Team nutzt E2; Schema-Review + AGM-Brücke' },
  ],
  principles: [
    { n: 1, title: 'Maschinenlesbarkeit', text: 'Kein Whiteboard-Foto als Vertragsartefakt — Schema statt Screenshot' },
    { n: 2, title: 'Methoden-Kontinuum', text: 'Discovery bis Specs ohne Medienbruch auf einem Board' },
    { n: 3, title: 'Komplement zu AGM', text: 'Capture-Schicht menschlich; Governance repo-lokal im Graph' },
    { n: 4, title: 'Datensouveränität', text: 'Board-Inhalt lokal — analog zur AGM-Repo-Lokalität' },
    { n: 5, title: 'Mensch validiert', text: 'Facilitation und Qualitätsfilter vor dem KI-Input' },
  ],
  promptDemo: [
    '1. Board exportieren → datei.storm.json',
    '2. Schema-ID prüfen ($schema / board-snapshot-v1)',
    '3. Agent: „Implementiere Aggregate X gemäß Board; nutze Event-Schemas und Relationen.“',
    '4. Optional: Bounded Contexts in AGM Domain-Track / Migrationsplanung übernehmen',
  ],
  limits: [
    'Tool allein ersetzt keine Facilitation',
    'JSON ist Kontext — kein Ersatz für Tests und Review',
    'Ersetzt nicht AGM Domain-Workflows im Repo',
  ],
  footer: 'X-BE · E2 Collaborative Domain Modeling',
  sourceUrl: 'https://github.com/abx-git/E2',
  liveUrl: 'https://abx-git.github.io/E2/',
} as const;
