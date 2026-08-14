export interface Example {
  slug: string;
  title: string;
  status: 'sketch' | 'reproducible';
  summary: string;
  paragraphs: readonly string[];
  links: readonly { label: string; href: string; external?: boolean }[];
}

export const examplesIndex = {
  title: 'Examples',
  description:
    'Walkthroughs and artifact snapshots. Sketches are labeled — I’m still working toward fully reproducible cases.',
} as const;

export const examples: readonly Example[] = [
  {
    slug: 'roundtrip-sketch',
    title: 'Roundtrip E2 → agent → AGM (sketch)',
    status: 'sketch',
    summary:
      'A numbered path with concrete artifacts. I’m working toward a public sample repo — for now, the sequence itself.',
    paragraphs: [
      'What I mean by “compose”: which files, which steps, in what order.',
      'Step A — Domain: model a small bounded context on the E2 board (e.g. order/payment). Export `.storm.json` and validate against board-snapshot-v1.',
      'Step B — Implementation: attach the JSON snapshot in the IDE. Agent implements an aggregate/API per the board. I review the diff and tests.',
      'Step C — Architecture: install/adopt AGM in the repo. Derive context/container (C4) and a short arc42 section from code + board. Verify in a fresh chat (report-only).',
      'Step D — Feedback: drift (hotspots, missing events) back into the board or as a WRK item in the graph. Decide per project which artifact wins on conflict.',
      'Next up: a public minimal repo with board snapshot, app stub, and `docs/architecture/` as reference. For now, this stays a sketch.',
    ],
    links: [
      { label: 'Compose', href: '/compose' },
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
