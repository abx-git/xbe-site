export const compose = {
  title: 'Compose',
  description: 'How E2 and AGM might work together — each concept stands on its own; this page is the bridge between them.',
  intro: [
    'Domain context from E2, architecture context from AGM in the repo. I’m exploring what a roundtrip looks like when you use both.',
    'The sequence below is a sketch I’m trying to make reproducible — files, steps, and artifacts spelled out.',
  ],
  steps: [
    {
      n: '1',
      title: 'Specify (E2)',
      detail: 'Workshop / board: model the domain. Export schema-valid `.storm.json`.',
    },
    {
      n: '2',
      title: 'Build (agents + human)',
      detail: 'Attach JSON as extra context in the IDE. Implement, test, review. Human stays the gate.',
    },
    {
      n: '3',
      title: 'Architecture trail (AGM)',
      detail:
        'As-is / to-be, interfaces, decisions in the Markdown graph under docs/architecture/. Verify in a separate chat from the write session.',
    },
    {
      n: '4',
      title: 'Back into the spec (optional)',
      detail:
        'Bounded contexts / events from the graph or code back into the board — or update the board and re-export. Pick a source of truth per project.',
    },
  ],
  open: [
    'On conflict, what wins: board, code, or AGM docs?',
    'Which `.storm.json` fields may agents write — and under what review?',
    'How do we version bridge rules as examples grow?',
  ],
  related: [
    { label: 'Concept: E2', href: '/concepts/e2' },
    { label: 'Concept: AGM', href: '/concepts/agm' },
    { label: 'Example: roundtrip sketch', href: '/examples/roundtrip-sketch' },
  ],
} as const;
