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
    'Occasional technical notes — no publishing schedule. Observations and theses you can disagree with.',
} as const;

export const notes: readonly Note[] = [
  {
    slug: 'domain-context-for-ai-e2',
    date: '2026-07-22',
    title: 'Domain context for AI — E2 beside the architecture graph',
    excerpt:
      'Architecture docs as the API of the AI conversation; the domain model as the business API. Why .storm.json and AGM can fit together — and don’t have to.',
    tags: ['E2', 'AGM', 'Context'],
    paragraphs: [
      'Agents in enterprise work rarely fail because the model is “too small.” More often there’s no structured context: what may be built in the business sense, and how the system is cut architecturally. Chat prompts and whiteboard photos don’t fix that.',
      'AGM is my take on the architecture side: repo-local Markdown link graph, blueprint.md, traversal instead of RAG.',
      'E2 is the domain side: modeling on a board, schema-valid `.storm.json` — not a screenshot.',
      'They’re complementary, not mandatory as a pair. Use one or both. The bridge lives under Compose.',
    ],
  },
  {
    slug: 'architecture-as-graph-not-chat',
    date: '2026-03-14',
    title: 'Architecture knowledge as a graph, not chat context',
    excerpt: 'RAG vs. Markdown link graphs for architecture questions — and where AGM fits.',
    tags: ['AGM', 'RAG'],
    paragraphs: [
      'Architecture knowledge is scattered: code, wikis, tickets, people’s heads. Many tools fold it into chat and RAG.',
      'RAG is fine for exploration. For answers you need to stand behind, retrieval is shaky: probabilistic, hard to anchor to artifacts.',
      'Alternative: a repo-local documentation graph — Markdown with explicit links, versioned in Git. Agents traverse edges. Claims stay tied to files (and often code).',
      'That’s what AGM implements. Chat/RAG still helps for exploration; decisions need stable, reviewable artifacts.',
    ],
  },
  {
    slug: 'two-months-okf-from-projects',
    date: '2026-07-08',
    title: 'Two months with OKF — format ≠ methodology',
    excerpt: 'Open Knowledge Format as interchange yes, as methodology replacement no.',
    tags: ['OKF', 'AGM'],
    paragraphs: [
      'OKF (Google Knowledge Catalog) specifies Markdown + YAML frontmatter, index.md, linked concepts. It’s an artifact model, not a process.',
      'Without a link graph, review, and session orchestration, it’s still markdown with metadata. AGM uses the same building blocks and adds blueprint.md, traversal, and Verify.',
      'In practice: OKF as exchange format; context engineering still needs graph discipline on top.',
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
