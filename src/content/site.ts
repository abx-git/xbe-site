export const siteConfig = {
  name: 'X-BE',
  tagline: 'Ideas · experiments · demos',
  ownerName: 'Andreas Bergmann',
  location: 'Hamburg area, Germany',
  linkedin: 'https://www.linkedin.com/in/andreas-bergmann-083b6851/',
  siteUrl: 'https://www.x-be.de',
  hostingProvider: 'Vercel Inc.',
  githubOrg: 'https://github.com/abx-git',
  agmAssistantUrl: 'https://abx-git.github.io/agm.github.io/',
  e2BoardUrl: 'https://abx-git.github.io/E2/',
  e2SchemaUrl: 'https://abx-git.github.io/E2/schemas/board-snapshot-v1.schema.json',
  e2RepoUrl: 'https://github.com/abx-git/E2',
} as const;

/** Reversed fragments — assembled client-side via EmailAddress / EmailLink. */
export const emailObfuscated = {
  user: 'tcatnoc',
  domain: 'ed.eb-x',
} as const;

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/concepts', label: 'Concepts' },
  { href: '/compose', label: 'Compose' },
  { href: '/examples', label: 'Examples' },
  { href: '/notes', label: 'Notes' },
  { href: '/about', label: 'About' },
] as const;

export const home = {
  title: 'Figuring out software development when AI does the heavy lifting',
  description:
    'I experiment here with ideas and concepts — trying what changes when development gets massive AI support, and building practices that might help the next generation of developers.',
  mission: [
    'Software development is shifting fast. I use this site to try things in the open: specs agents can read, architecture you can traverse, demos you can click.',
    'The pieces here — E2, AGM, and more as I add them — stand on their own. You can use one without the others. If you want to see how they might work together, that’s under Compose.',
    'If something here resonates — or you see it differently — I’m glad to exchange ideas. Email, GitHub, or LinkedIn.',
  ],
} as const;

export const about = {
  title: 'About',
  description: 'Who runs this site and why it exists.',
  paragraphs: [
    'Andreas Bergmann — enterprise software architect (iSAQB CPSA-A), based near Hamburg.',
    'I’ve spent decades on legacy systems and architecture. Lately I’m focused on what works when agents write code alongside humans: structured context, reviewable artifacts, and human review where it matters.',
    'This site is my lab notebook in public: concepts, demos, and notes. If you want to talk through an idea or push back on something, I’m happy to hear from you.',
  ],
} as const;

export const impressum = {
  title: 'Legal notice',
  sections: [
    {
      heading: 'Information pursuant to § 5 TMG (Germany)',
      content: ['Andreas Bergmann', '[Street and number]', '[Postal code City]'],
    },
    {
      heading: 'Contact',
      content: ['__EMAIL__'],
    },
    {
      heading: 'VAT ID',
      content: ['VAT identification number pursuant to § 27a UStG: [if applicable]'],
    },
    {
      heading: 'Responsible for content pursuant to § 55 Abs. 2 RStV',
      content: ['Andreas Bergmann', '[Address]'],
    },
  ],
} as const;

export const datenschutz = {
  title: 'Privacy policy',
  sections: [
    {
      heading: '1. Controller',
      content: ['Andreas Bergmann', '[Address]', '__EMAIL__'],
    },
    {
      heading: '2. Hosting',
      content: [
        'This website is hosted by Vercel Inc. When you visit the site, technically necessary server log files are processed (IP address, timestamp, requested URL).',
        'Legal basis: Art. 6(1)(f) GDPR (legitimate interest in reliable operation).',
      ],
    },
    {
      heading: '3. Contact by email',
      content: [
        'If you contact me by email, I process your details to handle your message.',
        'Legal basis: Art. 6(1)(f) GDPR (legitimate interest) or Art. 6(1)(b) GDPR where relevant.',
        'Data is deleted once the request is handled, unless statutory retention applies.',
      ],
    },
    {
      heading: '4. Cookies and tracking',
      content: [
        'This site does not use tracking cookies or analytics tools. No cookie banner is required.',
      ],
    },
    {
      heading: '5. External links',
      content: [
        'Links to external sites (e.g. GitHub, LinkedIn, embedded demos) are subject to those providers’ privacy policies.',
      ],
    },
    {
      heading: '6. Your rights',
      content: [
        'You have the right to access, rectification, erasure, restriction of processing, data portability, and objection.',
        'You may lodge a complaint with a data protection supervisory authority.',
      ],
    },
  ],
} as const;

export const pageMeta = {
  home: {
    title: 'Experiments in AI-assisted development',
    description: home.description,
  },
  concepts: {
    title: 'Concepts',
    description: 'Things I’m building and trying — problem, approach, artifact, demo.',
  },
  compose: {
    title: 'Compose',
    description: 'Ways to combine E2 and AGM — each concept works on its own too.',
  },
  examples: {
    title: 'Examples',
    description: 'Walkthroughs and artifact snapshots — sketches marked as such.',
  },
  notes: {
    title: 'Notes',
    description: 'Occasional write-ups — observations and open questions.',
  },
  about: {
    title: 'About',
    description: about.description,
  },
  impressum: {
    title: 'Legal notice',
    description: 'Legal information and mandatory disclosures (Germany).',
  },
  datenschutz: {
    title: 'Privacy',
    description: 'Privacy policy (GDPR).',
  },
} as const;
