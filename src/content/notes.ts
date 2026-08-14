export interface Note {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tags: readonly string[];
  paragraphs: readonly string[];
}

export const notesIndex = {
  title: 'Notes',
  description:
    'Gelegentliche technische Notizen. Kein Publishing-Takt. Thesen und Beobachtungen — zum Widersprechen und Erweitern.',
} as const;

export const notes: readonly Note[] = [
  {
    slug: 'domain-context-fuer-ki-e2',
    date: '2026-07-22',
    title: 'Domain Context für KI — E2 neben dem Architecture Graph',
    excerpt:
      'Architekturdokumentation ist die API der KI-Konversation. Das Domänenmodell ist die Fach-API. Warum .storm.json und AGM zusammengehören können — und nicht müssen.',
    tags: ['E2', 'AGM', 'Context'],
    paragraphs: [
      'KI-Agenten scheitern in Enterprise-Projekten selten am Modell allein. Meist fehlt strukturierter Kontext: Was darf fachlich gebaut werden, und wie ist das System geschnitten? Chat-Prompts und Whiteboard-Fotos reichen dafür nicht.',
      'AGM adressiert die Architekturseite: repo-lokaler Markdown-Linkgraph, orchestriert über blueprint.md, traversierbar statt RAG.',
      'E2 adressiert die Fachseite: Domain Modeling auf einem Board, Ergebnis schema-konforme `.storm.json` — kein Screenshot.',
      'Komplementär, nicht zwingend gekoppelt. Wer nur eines braucht, nimmt eines. Die Bridge steht unter Zusammenspiel.',
    ],
  },
  {
    slug: 'architekturwissen-als-graph-nicht-als-chat',
    date: '2026-03-14',
    title: 'Architekturwissen als Graph statt Chat-Kontext',
    excerpt:
      'RAG vs. Markdown-Linkgraph für Architekturfragen — und wo AGM einsetzt.',
    tags: ['AGM', 'RAG'],
    paragraphs: [
      'Architekturwissen liegt verteilt: Code, Wikis, Tickets, Köpfe. Viele Tools fassen das über Chat und RAG zusammen.',
      'RAG eignet sich für Exploration. Für reproduzierbare Architekturaussagen ist Retrieval schwach: probabilistisch, schwer an Artefakte gebunden.',
      'Alternative: repo-lokaler Dokumentationsgraph — Markdown mit expliziten Links, versioniert in Git. Agenten traversieren Kanten. Aussagen bleiben an Dateien (und oft Code) gebunden.',
      'AGM setzt das um. Chat/RAG bleibt für Exploration sinnvoll; verbindliche Entscheidungsgrundlagen brauchen stabile Artefakte.',
    ],
  },
  {
    slug: 'zwei-monate-okf-einordnung-aus-projekten',
    date: '2026-07-08',
    title: 'Zwei Monate OKF — Format ≠ Methodik',
    excerpt:
      'Open Knowledge Format als Interchange ja, als Methodikersatz nein.',
    tags: ['OKF', 'AGM'],
    paragraphs: [
      'OKF (Google Knowledge Catalog) spezifiziert Markdown + YAML-Frontmatter, index.md, verlinkte Konzepte. Das ist ein Artefaktmodell, kein Prozess.',
      'Ohne Linkgraph, Review und Session-Orchestrierung bleibt es Markdown mit Metadaten. AGM nutzt denselben Grundaufbau und ergänzt blueprint.md, Traversierung und Verify.',
      'Praktisch: OKF als Exchange-Format; Context Engineering braucht darüber hinaus Graph-Disziplin.',
    ],
  },
];

export function getSortedNotes(): Note[] {
  return [...notes].sort((a, b) => b.date.localeCompare(a.date));
}

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}

export function formatNoteDate(isoDate: string): string {
  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate));
}
