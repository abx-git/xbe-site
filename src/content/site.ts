export const siteConfig = {
  name: 'X-BE',
  tagline: 'Konzepte · Specs · Demos',
  ownerName: 'Andreas Bergmann',
  location: 'Großraum Hamburg',
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
  { href: '/', label: 'Index' },
  { href: '/concepts', label: 'Konzepte' },
  { href: '/compose', label: 'Zusammenspiel' },
  { href: '/examples', label: 'Beispiele' },
  { href: '/notes', label: 'Notes' },
  { href: '/about', label: 'Über' },
] as const;

export const home = {
  title: 'Konzepte für strukturierten Kontext in agentischer Softwarearbeit',
  description:
    'X-BE dokumentiert und demonstriert unabhängige Konzepte — Specs, Artefakte, Demos. Kein Produktverkauf, keine buchbaren Angebote.',
  mission: [
    'Hier liegen Konzepte, die ich ausbaue und öffentlich halte: jeweils für sich verständlich, mit Artefaktvertrag und Grenzen.',
    'Die Bausteine (z. B. E2, AGM) sind unabhängig. Ob und wie man sie kombiniert, steht unter Zusammenspiel — als Option, nicht als Pflicht.',
    'Neue Ideen kommen als weitere Concept-Seiten und Notes dazu. Kritik und Patches sind willkommen; es gibt nichts zu buchen.',
  ],
} as const;

export const about = {
  title: 'Über',
  description: 'Wer hinter X-BE steht — ohne Angebotstext.',
  paragraphs: [
    'Andreas Bergmann, Großraum Hamburg. Enterprise Software Architect (iSAQB CPSA-A).',
    'Diese Site ist eine öffentliche Arbeitsfläche: Konzepte erklären, Specs und Demos zeigen, Beobachtungen in Notes festhalten.',
    'Es gibt keine buchbaren Gespräche und keinen Verkauf über diese Seite. Wer etwas klären oder beitragen will, kann sich per E-Mail, GitHub oder LinkedIn melden.',
  ],
} as const;

export const impressum = {
  title: 'Impressum',
  sections: [
    {
      heading: 'Angaben gemäß § 5 TMG',
      content: ['Andreas Bergmann', '[Straße und Hausnummer]', '[PLZ Ort]'],
    },
    {
      heading: 'Kontakt',
      content: ['__EMAIL__'],
    },
    {
      heading: 'Umsatzsteuer-ID',
      content: ['Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [falls vorhanden]'],
    },
    {
      heading: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
      content: ['Andreas Bergmann', '[Adresse]'],
    },
  ],
} as const;

export const datenschutz = {
  title: 'Datenschutzerklärung',
  sections: [
    {
      heading: '1. Verantwortlicher',
      content: ['Andreas Bergmann', '[Adresse]', '__EMAIL__'],
    },
    {
      heading: '2. Hosting',
      content: [
        'Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf der Seite werden technisch notwendige Server-Logfiles (IP-Adresse, Zeitstempel, angeforderte URL) verarbeitet.',
        'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an stabilem Betrieb).',
      ],
    },
    {
      heading: '3. Kontaktaufnahme per E-Mail',
      content: [
        'Wenn Sie per E-Mail Kontakt aufnehmen, werden die Angaben zur Bearbeitung der Nachricht verarbeitet.',
        'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) bzw. lit. b DSGVO, sofern eine Anbahnung vorliegt.',
        'Die Daten werden gelöscht, sobald die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
      ],
    },
    {
      heading: '4. Cookies und Tracking',
      content: [
        'Diese Website setzt keine Tracking-Cookies und verwendet keine Analyse-Tools. Es ist kein Cookie-Banner erforderlich.',
      ],
    },
    {
      heading: '5. Externe Links',
      content: [
        'Links zu externen Websites (z. B. GitHub, LinkedIn, eingebettete Demos) unterliegen der Datenschutzerklärung des jeweiligen Anbieters.',
      ],
    },
    {
      heading: '6. Ihre Rechte',
      content: [
        'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.',
        'Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde.',
      ],
    },
  ],
} as const;

export const pageMeta = {
  home: {
    title: 'Konzepte · Specs · Demos',
    description: home.description,
  },
  concepts: {
    title: 'Konzepte',
    description: 'Unabhängige Konzepte mit Problem, Artefakt, Demo und Grenzen.',
  },
  compose: {
    title: 'Zusammenspiel',
    description: 'Optionale Kombination unabhängiger Konzepte — kein Pflichtprodukt.',
  },
  examples: {
    title: 'Beispiele',
    description: 'Reproduzierbare Walkthroughs und Artefaktstände.',
  },
  notes: {
    title: 'Notes',
    description: 'Technische Notizen und offene Fragen — ohne Hype.',
  },
  about: {
    title: 'Über',
    description: about.description,
  },
  impressum: {
    title: 'Impressum',
    description: 'Impressum und Pflichtangaben.',
  },
  datenschutz: {
    title: 'Datenschutz',
    description: 'Datenschutzerklärung gemäß DSGVO.',
  },
} as const;
