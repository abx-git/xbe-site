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
  description: 'Occasional technical notes — observations and theses when I have something worth writing down.',
} as const;

export const notes: readonly Note[] = [
  {
    slug: 'domain-context-for-ai-e2',
    date: '2026-07-22',
    title: 'Domain context for AI — E2 beside the architecture graph',
    excerpt:
      'Architecture docs as the API of the AI conversation; the domain model as the business API. How .storm.json and AGM fit together — together or separately.',
    tags: ['E2', 'AGM', 'Context'],
    paragraphs: [
      'Agents in enterprise work rarely fail because the model is “too small.” More often there’s no structured context: what may be built in the business sense, and how the system is cut architecturally. Chat prompts and whiteboard photos leave a gap.',
      'AGM is my take on the architecture side: repo-local Markdown link graph, blueprint.md, graph traversal.',
      'E2 is the domain side: modeling on a board, export as schema-valid `.storm.json`.',
      'They’re complementary. Use one or both. The bridge lives under Compose.',
    ],
  },
  {
    slug: 'architecture-as-graph-not-chat',
    date: '2026-03-14',
    title: 'Architecture knowledge as a link graph',
    excerpt: 'Markdown link graphs for architecture questions — and where AGM fits.',
    tags: ['AGM', 'RAG'],
    paragraphs: [
      'Architecture knowledge is scattered: code, wikis, tickets, people’s heads. Many tools fold it into chat and RAG.',
      'RAG works well for exploration. For answers you need to stand behind, a documentation graph helps: Markdown with explicit links, versioned in Git. Agents traverse edges. Claims stay tied to files (and often code).',
      'That’s what AGM implements. Exploration and decisions can coexist — decisions benefit from stable, reviewable artifacts.',
    ],
  },
  {
    slug: 'two-months-okf-from-projects',
    date: '2026-07-08',
    title: 'Two months with OKF — format and methodology',
    excerpt: 'Open Knowledge Format as interchange — and what still needs a process around it.',
    tags: ['OKF', 'AGM'],
    paragraphs: [
      'OKF (Google Knowledge Catalog) specifies Markdown + YAML frontmatter, index.md, linked concepts. It defines an artifact model.',
      'With a link graph, review, and session orchestration on top, it becomes useful for agents. AGM uses the same building blocks and adds blueprint.md, traversal, and Verify.',
      'In practice: OKF as exchange format; context engineering adds graph discipline.',
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
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate));
}
