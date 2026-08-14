export type ConceptStatus = 'stable' | 'experimental' | 'draft';

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
  title: 'Concepts',
  description:
    'Each entry is something I’m actively trying. Problem, approach, artifact contract, demo, and what it is not. Combining them is optional — see Compose.',
} as const;

export const concepts: readonly Concept[] = [
  {
    slug: 'e2',
    title: 'E2 — Collaborative Domain Modeling',
    shortTitle: 'E2',
    status: 'experimental',
    oneLiner:
      'Model the domain on a board (Event Storming, DDD, BDD, USM, Event Modeling) and export schema-valid JSON for agents.',
    problem:
      'Workshop output usually ends up as a whiteboard photo or loose markdown. Agents get prose, not a domain contract they can rely on.',
    approach:
      'A browser board for domain modeling. The deliverable is not a screenshot but a schema-valid `.storm.json` (board-snapshot-v1): elements, relations, glossary, hotspots, optional event schemas. Data stays local in the browser.',
    artifact: {
      name: 'board-snapshot-v1 (.storm.json)',
      detail:
        'JSON Schema: https://abx-git.github.io/E2/schemas/board-snapshot-v1.schema.json — machine-readable domain context as agent input.',
    },
    demo: [
      { label: 'E2 Board (live)', href: 'https://abx-git.github.io/E2/', external: true },
      { label: 'Embedded board', href: '/concepts/e2/board' },
      { label: 'Repository', href: 'https://github.com/abx-git/E2', external: true },
      { label: 'JSON Schema', href: 'https://abx-git.github.io/E2/schemas/board-snapshot-v1.schema.json', external: true },
    ],
    not: [
      'Not a replacement for facilitation or real domain work with the team',
      'Not full architecture documentation (that’s AGM)',
      'Not a server for board content — data stays local',
    ],
    related: ['agm'],
    paragraphs: [
      'Mix methods as needed: Event Storming, DDD, BDD/Example Mapping, User Story Mapping, Event Modeling — on one board.',
      'Typical path: workshop → model → export `.storm.json` → attach in the IDE as agent context (“implement aggregate X per the board”).',
    ],
  },
  {
    slug: 'agm',
    title: 'AGM — Architecture Graph Method',
    shortTitle: 'AGM',
    status: 'experimental',
    oneLiner:
      'A repo-local Markdown link graph under docs/architecture/ — traversable for agents, maintained with human review.',
    problem:
      'Architecture knowledge lives in code, wikis, and chat logs. RAG over chunks is weak for reproducible architecture answers: probabilistic, hard to tie back to artifacts.',
    approach:
      'Documentation as a graph in the repo: Markdown with explicit links, orchestrated via `blueprint.md`, navigation from `entry-point.md`. Agents follow edges instead of similarity search. Humans review outputs (Verify in a fresh chat).',
    artifact: {
      name: 'docs/architecture/ (Markdown link graph)',
      detail:
        'OKF-like structure (frontmatter, index.md, log.md). Tracks: Build, Evolve, Architect, Domain, Verify. Optional MCP/CLI.',
    },
    demo: [
      { label: 'AGM Assistant (live)', href: 'https://abx-git.github.io/agm.github.io/', external: true },
      { label: 'Embedded assistant', href: '/concepts/agm/assistant' },
    ],
    not: [
      'Not a substitute for architectural judgment',
      'Not a domain workshop board (that’s E2)',
      'Not a RAG product — graph traversal is the point',
    ],
    related: ['e2'],
    paragraphs: [
      'Working thesis: architecture documentation is the API of the AI conversation — when it’s versioned, linked, and reviewable.',
      'Golden path in short: Install → Adopt → Continue → Maintain → Verify. Details in the Assistant and workflow prompts.',
    ],
  },
];

export function getConcept(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug);
}

export function getSortedConcepts(): Concept[] {
  return [...concepts];
}
