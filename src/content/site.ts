export const siteConfig = {
  name: 'X-BE',
  tagline: 'Architekturberatung · Legacy · KI in der Praxis',
  ownerName: 'Andreas Bergmann',
  location: 'Großraum Hamburg',
  linkedin: 'https://www.linkedin.com/in/andreas-bergmann-083b6851/',
  siteUrl: 'https://www.x-be.de',
  hostingProvider: 'Vercel Inc.',
  agmAssistantUrl: 'https://abx-git.github.io/agm.github.io/',
  e2BoardUrl: 'https://abx-git.github.io/E2/',
  e2SchemaUrl: 'https://abx-git.github.io/E2/schemas/board-snapshot-v1.schema.json',
  e2RepoUrl: 'https://github.com/abx-git/E2',
  t2BoardUrl: 'https://abx-git.github.io/T2/',
  waypointsUrl: 'https://www.hac-boberg.de/waypoints/',
} as const;

/** Reversed fragments — assembled client-side via EmailAddress / EmailLink. */
export const emailObfuscated = {
  user: 'tcatnoc',
  domain: 'ed.eb-x',
} as const;

export const navItems = [
  { href: '/', label: 'Start' },
  { href: '/expertenprofil', label: 'Expertenprofil' },
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/methodik', label: 'Methodik' },
  { href: '/vorgehensweise', label: 'Vorgehensweise' },
  { href: '/referenzen', label: 'Referenzen' },
  { href: '/news', label: 'News' },
  { href: '/kontakt', label: 'Kontakt' },
] as const;

/** Einheitliche Seitennummerierung — entspricht der Navigationsreihenfolge (ohne Start). */
export const pageNumbers = {
  '/expertenprofil': 1,
  '/leistungen': 2,
  '/methodik': 3,
  '/vorgehensweise': 4,
  '/referenzen': 5,
  '/news': 6,
  '/kontakt': 7,
} as const;

export type NumberedPagePath = keyof typeof pageNumbers;

export function getPageNumber(href: string): number | undefined {
  return pageNumbers[href as NumberedPagePath];
}

export function formatPageNumber(index: number): string {
  return String(index).padStart(2, '0');
}

export const industries = {
  eyebrow: 'Branchen',
  items: [
    'Logistik',
    'Versicherung',
    'Medien',
    'GIS & Geo-Daten',
    'Telekommunikation',
    'E-Commerce',
    'öffentlicher Sektor',
  ],
  note: 'Erfahrung aus verschiedenen Branchen — der Fokus liegt auf komplexen Softwarelandschaften, nicht auf einer einzelnen Industry.',
} as const;

export const home = {
  title: 'Legacy-Systeme, die niemand mehr richtig kennt',
  description:
    'Architekturberatung, Migrationsplanung und Softwareentwicklung mit KI — erst den Ist-Zustand klären, dann entscheiden und umsetzen.',
  cta: 'Erstgespräch anfragen',
  intro: {
    title: 'Zuerst verstehen, dann modernisieren',
    paragraphs: [
      'In vielen Legacy-Systemen steckt das kritische Geschäftswissen — aber oft nur noch in den Köpfen einzelner Leute. Dokumentation fehlt oder ist veraltet. Dann wird jede Modernisierungsentscheidung zur Wette: welcher Stack, welche Reihenfolge, was zuerst anfassen?',
      'Ich arbeite deshalb klassisch architektonisch: Ist-Analyse, Dokumentation nach Standards, Migrationsplanung, die man vertreten kann. Darauf kann KI-gestützte Entwicklung aufsetzen — modulweise, mit Tests und manuellem Review. Nicht als Blackbox, sondern nachvollziehbar.',
      'Werkzeuge wie AGM und E2 helfen dabei, Kontext für Agenten zu organisieren. Sie ersetzen keine Beratung und kein Qualitätsurteil — sie beschleunigen die Arbeit.',
    ],
  },
  context: {
    title: 'So sieht es oft aus',
    items: [
      {
        title: 'Undokumentierter Monolith',
        description:
          'Ein gewachsenes Kernsystem, an dem niemand gerne rührt. „Heilige" Module, lange Release-Zyklen, und niemand kennt alle Abhängigkeiten und Schnittstellen.',
      },
      {
        title: 'Abgebrochene Modernisierung',
        description:
          'Die Migration ist gestartet — und stecken geblieben. Alte und neue Teile laufen nebeneinander. Die Integration ist unübersichtlich geworden, und der nächste Schritt ist unklar.',
      },
      {
        title: 'Technische Schuld als Blocker',
        description:
          'Alles hängt miteinander. Neue Technologie, Skalierung einzelner Domänen oder regulatorische Anforderungen scheitern an fehlenden Modulgrenzen und undokumentierten Schnittstellen.',
      },
      {
        title: 'M&A oder Plattform-Konsolidierung',
        description:
          'Nach Fusion oder Übernahme: unterschiedliche Systeme bewerten, Schnittstellen angleichen, Zielbild finden — möglichst auf Basis von Code und Fakten, nicht auf Annahmen.',
      },
    ],
  },
  values: [
    {
      title: 'Klarer Ist-Zustand',
      description:
        'Abhängigkeiten, Schnittstellen und Risiken sichtbar machen — damit Roadmaps, Budgets und Stakeholder-Gespräche auf etwas Greifbarem stehen.',
    },
    {
      title: 'Roadmap mit Begründung',
      description:
        'Zielarchitektur und Migrationspfade aus Analyse, Prioritäten und Constraints — inklusive Reihenfolge, Risiken und Rollback pro Schritt.',
    },
    {
      title: 'Umsetzung in Inkrementen',
      description:
        'Code-Transformation mit KI, automatisierte Tests und Review durch den Architekten. Schneller vorankommen, ohne blind zu fliegen.',
    },
  ],
  prototyping: {
    eyebrow: 'Prototypen',
    title: 'Was ich selbst baue',
    description:
      'Kleine Online-Systeme mit moderner Architektur — als Arbeitsnachweis, nicht als Produktkatalog.',
    items: [
      {
        title: 'E2 Board',
        hint: 'Collaborative Domain Modeling',
        href: 'https://abx-git.github.io/E2/',
      },
      {
        title: 'T2 Board',
        hint: 'Hierarchische Tasks & Mindmap',
        href: 'https://abx-git.github.io/T2/',
      },
      {
        title: 'waypoints',
        hint: 'Kartenbasierte Selection & Export',
        href: 'https://www.hac-boberg.de/waypoints/',
      },
    ],
  },
  teasers: [
    {
      href: '/leistungen',
      index: 2,
      title: 'Leistungen',
      description:
        'Analyse, Dokumentation, Migrationsplanung und KI-gestützte Entwicklung — einzeln oder zusammen.',
    },
    {
      href: '/methodik',
      index: 3,
      title: 'Methodik & Sicherheit',
      description:
        'Wie AGM und E2, Standards und Enterprise-KI in der Praxis zusammenspielen.',
    },
    {
      href: '/vorgehensweise',
      index: 4,
      title: 'Vorgehensweise',
      description:
        'Vom ersten Assessment über die Roadmap bis zur modulweisen Umsetzung.',
    },
    {
      href: '/referenzen',
      index: 5,
      title: 'Referenzen',
      description:
        'Anonymisierte Projekte: Ausgangslage, Optionen, Vorgehen und was dabei herausgekommen ist.',
    },
  ],
} as const;

export const expert = {
  title: 'Expertenprofil',
  description:
    'Andreas Bergmann — Enterprise Software Architect mit über 30 Jahren Praxis in Architekturberatung, Legacy-Analyse und Softwareentwicklung mit KI.',
  headline: 'Enterprise Software Architect',
  subtitle: 'Architekturberatung · AI-Agentic Engineering · Legacy-Modernisierung',
  certification: 'iSAQB CPSA-A (Advanced Level) · Certified ScrumMaster (CSM)',
  languages: ['Deutsch', 'Englisch'],
  points: [
    'Über 30 Jahre Enterprise-Softwarearchitektur — u. a. Logistik, Versicherung, Medien, GIS und Telekommunikation.',
    'Heute: Architekturberatung und Softwareentwicklung mit KI. Von der Ist-Analyse und Roadmap bis zur iterativen Umsetzung mit Review.',
    'AGM für Architekturkontext im Repo, E2 für Domain Modeling in Workshops — wo sie Tempo und Struktur bringen.',
    'Solutions Architecture in internationalen Teams: Java/Spring Boot, Microservices, REST & SOAP, DDD — plus Agile Coaching und Team-Enablement.',
    'GIS & Geodaten: Leitung internationaler Teams für Geoinformationssysteme — Satellitendaten, Adress-Konsolidierung, hochverfügbare Geo-Services.',
    'Kommunikation mit Technik und Fachseite: ADRs, Management-Reports, Requirements und Product-Owner-Arbeit in agilen Projekten.',
  ],
  detail: {
    title: 'Was Architektur hier meint',
    paragraphs: [
      'Softwarearchitektur ist mehr als die Wahl des Frameworks. Es geht um Struktur, Qualitätsziele, Schnittstellen und darum, Systeme so zu schneiden, dass Teams unabhängig arbeiten können — auch über Standorte und Zeitzonen hinweg.',
      'Bei Legacy steht oft eine andere Frage zuerst: Was haben wir eigentlich — und welche Migrationswege sind technisch und wirtschaftlich vertretbar? Das beantworte ich mit Code-Analyse, Abhängigkeitsmodellen und dokumentierten Entscheidungen. Nicht mit generischen Folien.',
    ],
    competencies: [
      'Architekturberatung und Reverse-Engineering komplexer Codebasen',
      'Java-Ökosystem: Spring Boot, Microservices, REST/SOAP, Teststrategien und Kernsystem-Integration',
      'Dokumentation nach arc42 (Kontext, Constraints, Building Blocks, Runtime, Deployment)',
      'C4-Modellierung (Context, Container, Component) für unterschiedliche Stakeholder-Ebenen',
      'GIS & Geodaten: PostGIS, Satelliten-/Radardaten, Adress- und Geodaten-Verarbeitung',
      'Migrationsstrategien: Strangler Fig, Branch by Abstraction, KI-gestützte Stack-Migration',
      'Domain-Driven Design: Bounded Contexts, Context Maps, Anti-Corruption Layers',
      'Collaborative Domain Modeling (E2): Event Storming, BDD/Example Mapping, USM, Event Modeling → schema-konformes .storm.json',
      'Agile Methoden: Scrum Master, Product Owner, Kanban — Prozessberatung und Team-Enablement',
      'KI-gestützte Softwareentwicklung: MCP Context Engineering, agentische Workflows, manuelle Validierung',
      'Architektur-Bewertung nach ATAM-Prinzipien und iSAQB-Qualitätsmodellen',
    ],
    domains: [
      {
        title: 'Logistik & Enterprise',
        description:
          'Kernsysteme für globale Betriebsprozesse: Web-Services, Adress- und Vertragsdaten, Data Mining und Integrationslandschaften, die hochverfügbar bleiben müssen.',
      },
      {
        title: 'Geodaten & GIS',
        description:
          'Geoinformationssysteme für Satelliten- und Radardaten, Schadensanalyse, Klimadaten und operative Adressverarbeitung — vom Systemdesign bis zur Team-Koordination.',
      },
      {
        title: 'Integrationsarchitektur',
        description:
          'Synchrone und asynchrone Schnittstellen: REST, SOAP, Messaging, Batch und File-Integrationen in gewachsenen Enterprise-Landschaften.',
      },
      {
        title: 'Security & Compliance',
        description:
          'Sicherheitsrelevante Komponenten, Auth-Flows und Compliance-Anforderungen als Input für Migrationsplanung und Assessments.',
      },
    ],
  },
} as const;

export const services = {
  title: 'Leistungen',
  description:
    'Fünf Bausteine: Ist-Analyse, Dokumentation, Migrationsplanung, Softwareentwicklung mit KI und optionale Domänen-Workshops. Einzeln oder kombiniert.',
  intro: {
    title: 'Beratung zuerst — Umsetzung, wenn es passt',
    paragraphs: [
      'Jeder Baustein liefert etwas Brauchbares für sich. Analyse und Dokumentation legen das Fundament. Migrationsplanung und KI-gestützte Entwicklung bauen darauf auf — sind aber auch einzeln beauftragbar. Domänen-Workshops helfen, wenn die Fachgrenzen unklar sind. AGM und E2 unterstützen dabei; sie ersetzen keine Beratung.',
    ],
  },
  items: [
    {
      id: 'analyse',
      title: 'Architektur-Analyse',
      description:
        'Die Architekturlogik aus Quellcode und vorhandenen Artefakten herausarbeiten — mit KI-Unterstützung, aber mit dem Ziel eines geprüften Ist-Bilds. Keine oberflächliche Code-Inventur.',
      details: [
        'Statische Abhängigkeitsanalyse auf Modul-, Paket- und Komponentenebene',
        'Identifikation zyklischer Kopplungen, God Classes und fehlender Modulgrenzen',
        'Schnittstellen-Mapping: interne APIs, externe Integrationen, Datenbankzugriffe',
        'Technologie-Stack-Inventar: Frameworks, Libraries, Build-Systeme, Deployment-Artefakte',
        'Bewertung technischer Schuld anhand messbarer Metriken (Kopplung, Komplexität, Duplikation)',
      ],
      deliverables: [
        'Abhängigkeitsgraph und Modul-Landschaftsübersicht',
        'Schnittstellen-Katalog mit Richtung, Protokoll und Kopplungsgrad',
        'Technische-Schuld-Report mit priorisierten Handlungsfeldern',
        'C4 Context- und Container-Diagramme (Ist-Zustand)',
      ],
      standards: ['Abhängigkeitsgraph', 'Modulgrenzen', 'Schnittstellen-Mapping', 'C4 Context'],
    },
    {
      id: 'dokumentation',
      title: 'Architektur-Dokumentation',
      description:
        'Dokumentation nach Industriestandards, die man später noch lesen und pflegen kann — zugeschnitten auf Entwickler, Architekten und Management.',
      details: [
        'arc42-Struktur: Kontext, Constraints, Building Blocks, Runtime View, Deployment View',
        'C4-Modellierung auf Context-, Container- und Component-Ebene',
        'Architektur-Entscheidungsrecords (ADRs) für dokumentierte Trade-offs',
        'Qualitätsziel-Szenarien und deren architektonische Ausprägung',
        'Abstimmung mit bestehenden Unternehmensstandards und Toolchains (Confluence, Structurizr, PlantUML)',
      ],
      deliverables: [
        'Vollständiges arc42-Dokument (Ist-Architektur)',
        'C4-Diagramme in maschinenlesbarem und visuellem Format',
        'ADR-Sammlung für identifizierte Architekturentscheidungen',
        'Kurzfassungen für Management und technischen Deep-Dive',
      ],
      standards: ['arc42', 'C4-Modell', 'ADR', 'Structurizr'],
    },
    {
      id: 'migrationsplanung',
      title: 'Migrationsplanung',
      description:
        'Migrationspfade und Zielarchitektur aus dem analysierten Ist-Zustand, den geschäftlichen Prioritäten und den technischen Constraints. Keine Schablone von der Stange — eine Roadmap für dieses System.',
      details: [
        'Definition von Bounded Contexts und Migrationsinkrementen (DDD Context Map)',
        'Bewertung von Migrationsmustern: Strangler Fig, Branch by Abstraction, Re-Platforming, Re-Factoring',
        'Schnittstellen-Harmonisierung und Anti-Corruption-Layer-Design',
        'Risiko- und Abhängigkeitsmatrix pro Migrationsinkrement',
        'Aufwandsschätzung und Sequenzierung unter Berücksichtigung von Team-Kapazitäten',
      ],
      deliverables: [
        'Zielarchitektur-Dokument mit C4-Diagrammen (Soll-Zustand)',
        'Migrations-Roadmap mit priorisierten Inkrementen und Meilensteinen',
        'Context Map mit Integrationsbeziehungen zwischen Ziel-Domänen',
        'Risikoregister und Rollback-Strategien pro Inkrement',
      ],
      standards: ['Strangler Fig Pattern', 'Domain-Driven Design', 'Event-Driven Architecture', 'Context Map'],
    },
    {
      id: 'ki-migration',
      title: 'KI-gestützte Softwareentwicklung',
      description:
        'Modulweise Umsetzung — Modernisierung, Migration oder Erweiterung — mit KI-unterstützter Code-Transformation. Pro Zyklus: Tests, Rollback-Möglichkeit und manuelles Architekten-Review vor dem Merge.',
      details: [
        'Modulweise Auswahl und Priorisierung gemäß Roadmap oder Backlog',
        'KI-gestützte Code-Transformation unter Einhaltung der Zielarchitektur-Vorgaben',
        'Automatisierte Test-Validierung und Regression-Checks pro Inkrement',
        'Manueller Review durch den Senior Architekten (iSAQB-Standard) vor Merge',
        'Dokumentation der Transformationsentscheidungen als ADRs',
      ],
      deliverables: [
        'Umgesetzte und getestete Module pro Iterationszyklus',
        'Transformations-Log mit Begründungen und Abweichungen',
        'Aktualisierte Architekturdokumentation nach jedem Inkrement',
        'Abschluss-Report mit Metriken (Coverage, Komplexitätsreduktion, Schnittstellen-Status)',
      ],
      standards: ['Iterative Inkremente', 'Automated Testing', 'Continuous Integration', 'ADR'],
    },
    {
      id: 'domain-modeling',
      title: 'Domänen-Workshops',
      description:
        'Optional, wenn die Fachgrenzen unklar sind: moderierte Workshops (Event Storming, DDD, BDD, User Story Mapping, Event Modeling). Ergebnis ist ein strukturiertes Domänenmodell — als Grundlage für Roadmap und KI-Arbeit, unterstützt durch E2.',
      details: [
        'Facilitierte Workshops: Event Storming, Bounded Contexts, Example Mapping, Story Maps, Event Modeling — nach Bedarf und Reifegrad',
        'Capture von Aggregates, Commands, Domain Events, Policies, Actors, Hotspots und Ubiquitous Language',
        'Persistenz als schema-konformes .storm.json — kein Whiteboard-Foto',
        'Brücke in Architekturberatung und Migrationsplanung (Context Map, Events)',
        'Optional: Enablement — Team nutzt das Board selbst; Facilitation-Coaching',
      ],
      deliverables: [
        'Validiertes Domänenmodell (.storm.json / board-snapshot-v1)',
        'Markdown-Reports, Event-Catalog und Glossary',
        'Hotspot-Register mit Status und Priorität',
        'Kurze Integration in Agenten-Workflows (KI-Context Pack)',
      ],
      standards: [
        'Event Storming',
        'Domain-Driven Design',
        'BDD / Example Mapping',
        'User Story Mapping',
        'Event Modeling',
      ],
    },
  ],
} as const;

export const methodology = {
  title: 'Methodik & Sicherheit',
  description:
    'Werkzeuge und Standards hinter der Arbeit: AGM und E2 für strukturierten KI-Kontext, verbunden mit iSAQB, arc42, C4 und kontrolliertem Enterprise-KI-Einsatz.',
  intro: {
    title: 'Was hinter den Leistungen steckt',
    paragraphs: [
      'Beratung und Umsetzung stehen im Mittelpunkt. Methoden und Boards helfen, Kontext zu strukturieren und KI-Arbeit zu beschleunigen — sie ersetzen weder Architekturkompetenz noch das eigene Urteil.',
      'Architekturdokumentation kann für Agenten traversierbar werden (AGM). Domänenmodelle aus Workshops liefern Fachkontext (E2). Die Arbeit selbst stützt sich auf iSAQB, arc42 und C4. KI läuft über kommerzielle Enterprise-APIs — nicht über Consumer-Weboberflächen.',
    ],
  },
  items: [
    {
      title: 'Standards',
      description:
        'AGM und E2 als unterstützende Verfahren, OKF für versionierbare Wissensartefakte, iSAQB-CPSA-A als Bewertungsrahmen, arc42 und C4 für Dokumentation. MCP für Tool-Anbindung. ATAM und ADRs für Trade-offs und Entscheidungen.',
    },
    {
      title: 'Context Engineering',
      description:
        'AGM setzt auf Graph-Traversierung statt RAG — Wissen als verlinkter Kontextgraph, an dem Agenten entlanglaufen. Repo-lokal, in Git, lesbar für Mensch und Maschine.',
    },
    {
      title: 'Domain Context',
      description:
        'E2 speichert Workshop-Ergebnisse als schema-konformes .storm.json (Elemente, Relationen, Event-Schemas, Glossary, Hotspots). Kein Whiteboard-Foto — maschinenlesbare Fachwahrheit als zusätzlicher Input für Agenten. Daten bleiben lokal.',
    },
    {
      title: 'Enterprise KI-Sicherheit',
      description:
        'Kommerzielle API-Accounts mit Commercial Terms — u. a. Anthropic Enterprise, AWS Bedrock, Azure OpenAI, Google Vertex AI. Keine Consumer-Weboberflächen. Modellwahl nach Kundenanforderung (Datenresidenz, Compliance, Performance).',
    },
    {
      title: 'Datensouveränität',
      description:
        'Vertraglich: Keine Eingabe- oder Ausgabedaten zum Training oder zur Modellverbesserung. Auf Wunsch DPA für DSGVO. Quellcode und Domäne bleiben beim Kunden.',
    },
    {
      title: 'Validierung',
      description:
        'Jedes KI-Ergebnis prüfe ich manuell: Halluzinationen, fehlende Kontexte, falsche Abhängigkeiten. Erst danach fließt etwas in Dokumentation, Domänenmodell oder Migrationsplanung.',
    },
  ],
  frameworks: [
    'Architecture Graph Method (AGM)',
    'E2 — Collaborative Domain Modeling',
    'Open Knowledge Format (OKF)',
    'Model Context Protocol (MCP)',
    'iSAQB CPSA-A',
    'arc42',
    'C4 Model',
    'Domain-Driven Design',
    'Event Storming',
    'TOGAF (ADM-kompatibel)',
    'ATAM',
    'ISO/IEC/IEEE 42010',
  ],
  dualMethods: {
    eyebrow: 'Werkzeuge',
    title: 'Zwei Verfahren, die die Arbeit tragen',
    description:
      'Versionierbarer Kontext für KI-Agenten: Architekturgraph und Domänenmodell ergänzen die Beratung — ersetzen sie nicht.',
    pillars: [
      {
        id: 'agm',
        title: 'Architecture Graph Method',
        thesis: 'Architekturdokumentation ist die API der KI-Konversation.',
        focus: 'Wie ist das System gebaut?',
        artifact: 'Markdown-Linkgraph unter docs/architecture/',
        role: 'Traversierbarer Architektur-Kontext für Agenten',
      },
      {
        id: 'e2',
        title: 'E2 — Collaborative Domain Modeling',
        thesis: 'Das Domänenmodell ist die Fach-API der KI-Konversation.',
        focus: 'Was passiert fachlich, und was darf gebaut werden?',
        artifact: '.storm.json (board-snapshot-v1)',
        role: 'Strukturierte Domäne: Elemente, Relationen, Event-Schemas',
      },
    ],
    bridge:
      'Workshop entscheidet → E2 speichert → AGM/OKF hält die Architekturspur → Agenten arbeiten mit dem Graph. Die Verfahren sind Capture- und Governance-Schichten hinter Beratung und Umsetzung.',
  },
  knowledgeCatalog: {
    title: 'Einordnung: Google Knowledge Catalog & OKF',
    description:
      'Die Branche geht von passiven Metadaten-Katalogen zu aktiven Kontextgraphen für Agenten. Google hat mit dem Knowledge-Catalog-Repository unter anderem das Open Knowledge Format (OKF) offen gelegt — Markdown mit YAML-Frontmatter, progressive disclosure über index.md, verlinkte Konzepte statt isolierter Dokumente.',
    alignment: [
      'AGM-Artefakte sind OKF-konform: typisierte Frontmatter, index.md + log.md pro Ebene, Markdown-Links als Graph-Kanten',
      'Traversierung über blueprint.md und entry-point.md — kein RAG-Roulette bei Architekturentscheidungen',
      'MCP-fähig: AGM-CLI und MCP-Server geben Graph-Inhalte strukturiert an Agenten (Cursor, Claude, Copilot)',
      'Git-native: Wissenspflege wie Code — Pull Requests, Diffs, Review, CI-Link-Checks',
      'E2 ergänzt den Graph um Domänen-Snapshots: schema-validiertes .storm.json als zusätzlicher Agenten-Input',
    ],
    scope:
      'Knowledge Catalog zielt auf Enterprise-Datenlandschaften (BigQuery, Glossare, Dataprodukte). AGM auf Software-Architektur und Legacy-Code im Repository; E2 auf die fachliche Workshop-Wahrheit. Komplementär, nicht konkurrierend. Wer beides braucht, kann OKF und .storm.json gemeinsam nutzen.',
    links: [
      { label: 'Knowledge Catalog (GitHub)', href: 'https://github.com/GoogleCloudPlatform/knowledge-catalog' },
      { label: 'OKF Spezifikation', href: 'https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md' },
      { label: 'Google Cloud: Knowledge Catalog für Agenten', href: 'https://cloud.google.com/dataplex/docs/ai-overview' },
    ],
  },
  tools: {
    eyebrow: 'Zum Anschauen',
    title: 'AGM und E2 in der Praxis',
    description:
      'Assistant und Poster für den Architecture Graph; Board und One-Pager für Domain Modeling.',
  },
  prototyping: {
    eyebrow: 'Prototypen',
    title: 'Online-Systeme mit moderner Architektur',
    description:
      'Beispiele für schnelles Prototyping — als Nachweis, dass ich baue, was ich berate. Kein Produktkatalog.',
    items: [
      {
        title: 'E2 Board',
        hint: 'Collaborative Domain Modeling',
        description:
          'Browserbasiertes Board für Event Storming, DDD, BDD, USM und Event Modeling — lokale Daten, schema-konformer Export.',
        href: 'https://abx-git.github.io/E2/',
        external: true,
      },
      {
        title: 'T2 Board',
        hint: 'Tasks & Mindmap',
        description:
          'Hierarchische Aufgaben als Board/Mindmap — App im Browser, Daten lokal (ähnlich diagrams.net).',
        href: 'https://abx-git.github.io/T2/',
        external: true,
      },
      {
        title: 'waypoints',
        hint: 'Karten-CX · HAC Boberg',
        description:
          'Kartenbasierte Selection und CUP-Export für Segelflug-Wegepunkte — moderne Map-CX, Spatial-Backend.',
        href: 'https://www.hac-boberg.de/waypoints/',
        external: true,
      },
    ],
  },
  assistant: {
    title: 'AGM Assistant',
    description:
      'Oberfläche für den Golden Path: Install, Adopt, Continue, Maintain und Verify. Erzeugt Session-Prompts zum Kopieren oder MCP-Aufrufe für die IDE.',
    steps: [
      { n: '1', label: 'Install', hint: 'einmal pro Repo' },
      { n: '2', label: 'Adopt', hint: 'erste Docs' },
      { n: '3', label: 'Continue', hint: 'nächstes Kapitel' },
      { n: '4', label: 'Evolve', hint: 'nach Code-Änderungen' },
      { n: '5', label: 'Verify', hint: 'frischer Chat' },
    ],
  },
  e2Board: {
    title: 'E2 Board',
    description:
      'Browserbasiertes Board für Event Storming, DDD, BDD, User Story Mapping und Event Modeling. Domänendaten bleiben lokal in der .storm.json — kein Server für Board-Inhalt. Schema-konformer Export als zusätzlicher Input für KI-Agenten.',
    steps: [
      { n: '1', label: 'Workshop', hint: 'ES · DDD · BDD · USM · EM' },
      { n: '2', label: 'Model', hint: 'Elemente & Relationen' },
      { n: '3', label: 'Export', hint: '.storm.json' },
      { n: '4', label: 'Context', hint: 'KI-Agenten füttern' },
      { n: '5', label: 'Bridge', hint: 'optional → AGM' },
    ],
    schemaNote:
      'Vertragsartefakt: board-snapshot-v1 unter https://abx-git.github.io/E2/schemas/board-snapshot-v1.schema.json',
  },
  confidentiality: {
    title: 'Vertraulichkeit & API-Sicherheit',
    description:
      'Vertraulichkeit stützt sich auf Enterprise-Verträge und die technischen Vorgaben des jeweiligen API-Anbieters. Primär Anthropic Enterprise API — ergänzend oder alternativ AWS Bedrock, Azure OpenAI oder Google Vertex AI.',
    briefing:
      'Die Analyse läuft über eine Enterprise-API. Vertraglich ist zugesichert: keine übermittelten Daten zum Modelltraining oder zur Verbesserung der KI-Services. Keine dauerhafte Speicherung der Quelldaten bei Drittanbietern. Analyseprozesse sind temporär, unter DSGVO, und werden nach Abschluss gelöscht. Die Kontrolle über den Quellcode bleibt beim Kunden.',
    contractual: {
      title: 'Vertraglich',
      items: [
        'Commercial Terms of Service — kein Consumer-Account, keine Weboberfläche für Privatnutzer',
        'Kein Training: Prompts und API-Ausgaben werden vertraglich nicht zum Trainieren der Modelle verwendet',
        'Keine Datenspeicherung: Übermittelte Daten werden nicht zur Modellverbesserung persistiert',
        'Data Processing Agreement (DPA): als Enterprise-Kunde abschließbar — DSGVO und TOMs',
        'Ergänzend: NDA und Auftragsverarbeitungsvertrag (AVV) mit dem Kunden auf Anfrage',
      ],
    },
    technical: {
      title: 'Technisch',
      items: [
        'Daten-Transit ausschließlich über TLS 1.2+ verschlüsselte Kanäle',
        'Temporäre Verarbeitung: Code verbleibt während der Analyse im API-Arbeitsspeicher und wird nach dem Request-Response-Zyklus verworfen',
        'Keine persistenten Logs: In Standard-Konfiguration keine Speicherung von Prompts oder Code-Fragmenten in Anbieter-Datenbanken',
        'Isolation: Jede API-Anfrage ist in sich geschlossen — kein Zugriff auf Kontext anderer Kunden oder vorheriger Sessions',
      ],
    },
    obligations: {
      title: 'Interne Praxis',
      items: [
        'Lokale Festplattenverschlüsselung (BitLocker, FileVault) auf allen Analyse-Arbeitsplätzen',
        'Kein Kundencode in unverschlüsselten Cloud-Notizen, privaten Git-Repos oder ungeschützten IDE-Sync-Diensten',
        'Anonymisierung vor Upload: Secrets, Tokens und kundenspezifische Konfigurationswerte werden entfernt oder durch Platzhalter ersetzt',
        'Kein Prompt-Logging: API-Logging-Features, die Eingaben persistieren, sind deaktiviert',
        'Manuelle Prüfung jedes KI-Ergebnisses vor Freigabe',
      ],
    },
    legalNote:
      'Für die Absicherung im Kundenverhältnis stelle ich auf Anfrage NDA und AVV bereit — abgestimmt auf Scope und eingesetzte API-Anbieter.',
  },
} as const;

export const process = {
  title: 'Vorgehensweise',
  description:
    'Fünf Phasen — von der Bestandsaufnahme bis zur optionalen Umsetzung mit KI. Jede Phase liefert etwas, das für sich stehen kann.',
  intro: {
    title: 'Wie die Arbeit typischerweise läuft',
    paragraphs: [
      'Innerhalb einer Phase wird iteriert; zwischen den Phasen geht es der Reihe nach. Domänen-Workshops und Architektur-Analyse können bei unklaren Fachgrenzen vorgezogen oder parallel laufen. Analyse und Dokumentation lassen sich auch als abgeschlossenes Beratungsprojekt beauftragen; Migrationsplanung und KI-gestützte Entwicklung bauen optional darauf auf. Den Umfang jeder Phase klären wir im ersten Assessment.',
    ],
  },
  steps: [
    {
      number: '01',
      title: 'Initiales Assessment',
      description:
        'Bestandsaufnahme: Codebasis, Stack, vorhandene Dokumentation, Team und geschäftliche Prioritäten. Bei unklaren Bounded Contexts oder fehlender Ubiquitous Language: Domain Discovery mit E2 einplanen. Scope und Qualitätsziele festlegen.',
      deliverables: [
        'Assessment-Report mit Scope und Erfolgskriterien',
        'Zugriffs- und Infrastruktur-Checkliste (Repository, CI/CD, Deployment)',
        'Stakeholder-Map und Kommunikationsplan',
        'Optional: Entscheidung Domain Discovery (E2) — ja/nein und Methoden-Mix',
      ],
    },
    {
      number: '02',
      title: 'Extraktion',
      description:
        'KI-gestützte Analyse von Architektur, Abhängigkeiten, Schnittstellen und Technologie. Parallel oder vorgelagert: fachliche Modellierung mit E2. Diagramme, Graphen und Metriken entstehen als Rohmaterial — noch nicht als fertige Wahrheit.',
      deliverables: [
        'Rohe Abhängigkeitsgraphen und Modulinventar',
        'Automatisch generierte C4-Diagramme (Entwurf)',
        'Technologie- und Schnittstellen-Inventar',
        'Metriken-Report (Komplexität, Kopplung, Duplikation)',
        'Optional: .storm.json und Event-Catalog aus Domain Discovery',
      ],
    },
    {
      number: '03',
      title: 'Review & Validierung',
      description:
        'Manuelle Prüfung aller KI-Ergebnisse nach iSAQB. Korrektur, Ergänzung, fachliche Einordnung. Abgleich mit dem Domänenwissen der Kundenteams.',
      deliverables: [
        'Geprüfte Architektur-Dokumentation (Ist-Zustand)',
        'Review-Protokoll mit Korrekturen',
        'Architektur-Bewertung: Stärken, Risiken, Handlungsfelder',
      ],
    },
    {
      number: '04',
      title: 'Planung',
      description:
        'Migrations-Roadmap: Zielarchitektur, Inkremente, Reihenfolge, Risiken. Abstimmung mit Stakeholdern und Einbindung in bestehende Planungsprozesse.',
      deliverables: [
        'Zielarchitektur-Dokument (Soll-Zustand)',
        'Migrations-Roadmap mit priorisierten Inkrementen',
        'Risikoregister und Aufwandsschätzung',
        'Management Summary für Entscheidungsträger',
      ],
    },
    {
      number: '05',
      title: 'KI-gestützte Umsetzung',
      description:
        'Modulweise Entwicklung gemäß Roadmap mit KI-gestützter Code-Transformation. Pro Zyklus: Modulwahl → Transformation → Test → Architekten-Review → Merge. Rollback möglich pro Inkrement.',
      deliverables: [
        'Umgesetzte Module pro Iterationszyklus',
        'Transformations- und Review-Protokolle',
        'Fortlaufend aktualisierte Architekturdokumentation',
        'Abschluss-Report mit Umsetzungsmetriken',
      ],
    },
  ],
} as const;

export const references = {
  title: 'Referenzen',
  description:
    'Anonymisierte Projekte aus Architekturberatung, Analyse und Softwareentwicklung mit KI — mit Optionen, Vorgehen und Ergebnissen, die nachvollziehbar bleiben.',
  intro: {
    title: 'Was in Projekten herausgekommen ist',
    paragraphs: [
      'Die Beispiele zeigen Beratung und Umsetzung: Ist-Zustand klären, Security- und Migrationsentscheidungen treffen, Stacks migrieren, Funktionen erweitern. Was hier steht, lässt sich auf Code, Konfiguration oder dokumentierte Artefakte zurückführen.',
      'AGM und E2 kommen vor — aber zuerst die Outcomes und Entscheidungsgrundlagen, danach optional das Verfahren.',
    ],
  },
  method: {
    title: 'Architecture Graph Method (AGM)',
    subtitle: 'Verfahren · Architecture Graph',
    description:
      'Repo-lokaler Markdown-Linkgraph unter `docs/architecture/`, orchestriert über `blueprint.md`, gepflegt durch KI-Agenten mit menschlicher Prüfung. OKF-konforme Artefakte, Graph-Traversierung statt RAG. Anschlussfähig an Googles Knowledge Catalog und Open Knowledge Format.',
    options: [
      'Dokumentations-Template: arc42 (Standard), lean-service, c4-light, adr-first oder custom',
      'Artefaktformat: Open Knowledge Format (OKF) — Markdown + YAML-Frontmatter, index.md, log.md',
      'Fokus-Bereiche wählbar: Implementation, Schnittstellen, Persistenz, Security, Deployment, Domain',
      'Golden Path: Install → Adopt → Continue → Maintain → Review (Verify in frischem Chat)',
      'Fünf Tracks: Build, Evolve, Architect, Domain, Verify — kombinierbar',
      'Werkzeugwahl: Copy-Paste-Prompts, MCP/CLI (`agm`) oder IDE-Regeln (Cursor, Claude, Copilot)',
    ],
    procedure: [
      'Install: Scaffold mit Prompts, Rollen und Template-Stubs im Ziel-Repository',
      'Adopt: Erstsession erzeugt blueprint.md, entry-point.md, always-on.md und erste belegte Sektion',
      'Continue: Kapitelweise Befüllung des gewählten Templates (arc42, C4, ADRs)',
      'Architect Work: Gezielte Analysen (Security, Modernisierung, Domain Map, Tech Debt) als work/WRK-Items',
      'Maintain: Dokumentation synchron zu git diff — nur betroffene Abschnitte',
      'Review: Report-only-Verifikation in separatem Chat — Link-Integrität, Vollständigkeit, Evidenz',
    ],
    outcomes: [
      'Traversierbarer Architektur-Graph mit 30–40+ verlinkten Dokumenten pro Projekt',
      'blueprint.md als persistenter Fortschritts- und WRK-Register über Sessions hinweg',
      'Strukturierte work/-Reports (Security, Migration, Domain, Debt) mit Evidenz-Links',
      'Risiko- und Schuldregister als priorisierte Entscheidungsgrundlage',
      'CI-fähige Link-Integritätsprüfung — broken links blockieren PRs',
    ],
  },
  methodE2: {
    title: 'E2 — Collaborative Domain Modeling',
    subtitle: 'Verfahren · Domain Model Snapshot',
    description:
      'Browserbasiertes Board für Event Storming, DDD, BDD, User Story Mapping und Event Modeling. Workshop-Ergebnisse landen als schema-konformes `.storm.json` — Elemente, Attribute, Relationen und optionale Event-Schemas als Fachkontext für Agenten. Das ist die menschliche Capture-Schicht; kein Ersatz für Domain-Arbeit im Team.',
    options: [
      'Methoden-Mix: Event Storming, DDD, BDD/Example Mapping, USM, Event Modeling — einzeln oder kombiniert',
      'Deliverable-Format: board-snapshot-v1 (.storm.json) inkl. Schema-Verweis',
      'Facilitation durch Senior Architect oder Enablement für das Kundenteam',
      'Bundle mit AGM: Domain Discovery → Context Map/Events → Architekturgraph → KI-Inkremente',
      'Datensouveränität: Board-Inhalt lokal beim Nutzer — kein Server für Domänendaten',
    ],
    procedure: [
      'Workshop: Facilitierte Domain Discovery mit dem passenden Methoden-Modus',
      'Model: Elemente, Relationen, Glossary und Hotspots auf dem Board erfassen',
      'Export: Validierte .storm.json plus Markdown-Reports / Event-Catalog',
      'Context: KI-Context Pack — JSON als zusätzlichen Agenten-Input einhängen',
      'Bridge (optional): Bounded Contexts und Events in AGM/OKF und Migrationsplanung übernehmen',
    ],
    outcomes: [
      'Schema-konformes Domänenmodell als vertragliches Artefakt',
      'Gemeinsame Ubiquitous Language und priorisiertes Hotspot-Register',
      'Maschinenlesbarer Input für Cursor, Claude, Copilot und vergleichbare Agenten',
      'Klarere Bounded Contexts und Migrationsinkremente bei Legacy-Ablösung',
    ],
  },
  cases: [
    {
      id: 'headless-commerce',
      title: 'Headless E-Commerce Monolith',
      subtitle: 'Java · Spring Boot · Reverse Engineering & Security Assessment',
      context: [
        'Ein gewachsener Java-Monolith (5 Maven-Module, 64 REST-Controller, ~186 JPA-Entities) als Headless-Commerce-API — ohne brauchbare Architekturdokumentation. Ob das Ding produktionsreif war, war unklar. Die Frage: modernisieren oder neu schreiben?',
        'Auslöser: niemand kannte den Ist-Zustand wirklich, parallele API-Versionen (v0/v1/v2), doppelte Facades und ein unklarer Security-Status vor dem geplanten Go-Live.',
      ],
      options: [
        'Option A: Evolutionärer Java-Pfad — Spring Boot 2.5 → 3.x, Jakarta-Migration, Facade-Konsolidierung',
        'Option B: Python-Greenfield — modularer Monolith mit funktionaler API-Äquivalenz, Greenfield-Datenbank',
        'Dokumentation: arc42 via AGM, 7 Analyse-Workstreams (WRK-001 bis WRK-007)',
        'Scope bewusst ohne Code-Remediation — Entscheidungsgrundlage, nicht Implementierung',
      ],
      procedure: [
        'Bootstrap + 14 arc42-Phasen in ~15 Sessions (2 Tage) — 35+ verlinkte Architektur-Dokumente',
        'WRK-001: Refactoring-Analyse — 10 priorisierte Kandidaten (RF-01 bis RF-10)',
        'WRK-002: Security-Analyse — Spring Security, JWT-Lifecycle, URL-Matcher, Default-Configs',
        'WRK-003/004: Modernisierungs-Roadmap und Python-Greenfield-Bewertung (Stakeholder-Interview)',
        'WRK-005/006/007: Cross-Layer-Analyse, DDD Context Map (13 Bounded Contexts), Tech-Debt-Register (30 Items)',
        'Milestone Review: PASS WITH NOTES — 339/341 Links valide',
      ],
      results: [
        '3 kritische + 7 high-severity Security-Findings — u.a. Default-JWT-Secret, Auth-Bypass via URL-Matcher, unauthentifizierte DELETE-Endpunkte',
        '18 Risiken (R-01–R-17) und 30 Tech-Debt-Items (TD-01–TD-30) mit Paydown-Sequenz',
        '13 Bounded Contexts mit Integrationsmustern dokumentiert',
        'Zwei strategische Roadmaps: 6-Phasen-Java-Modernisierung und konditionierter Python-Pfad',
        'Klare Go/No-Go-Aussage: Default-Config nicht produktionsreif — P0-Security vor Strukturarbeit',
      ],
      highlight:
        'Die Security-Analyse (WRK-002) fand 3 kritische Lücken, die ohne Reverse Engineering im Graph schlicht unsichtbar geblieben wären — Default-JWT-Secret, kaputte Token-Refresh-Logik und Auth-Bypass über URL-Matcher.',
      tags: ['Java', 'Spring Boot', 'Security', 'arc42', 'Tech Debt', 'DDD'],
    },
    {
      id: 'cms-platform',
      title: 'Open-Source CMS-Kernplattform',
      subtitle: 'PHP · Joomla CMS 5.x · Architektur-Dokumentation & Event-System-Analyse',
      context: [
        'Eine große, extensionsgetriebene PHP-CMS-Kernplattform (PHP 8.1+, Multi-App: Site, Admin, JSON:API, CLI) mit ~76 Datenbanktabellen und komplexem Plugin-/Event-System. Ziel: System verständlich, wartbar und governierbar dokumentieren — nicht Neudesign.',
        'Schwerpunkt: Plattform-Evolution (Factory→DI, legacy triggerEvent→typed Events), Extension-Governance und technische Schuld vor dem nächsten Major-Release.',
      ],
      options: [
        'Dokumentations-Template: arc42 (gewählt) — alternativ c4-light, adr-first, lean-service',
        'Charakterisierung: Monolith + Extension-Modell als bewusste Plattform-Architektur (nicht neu entschieden)',
        'Domain-Tiefe: 18 Subdomains klassifiziert — 3 Core, 11 Supporting, 4 Generic',
        'Follow-on: WRK-001 Plugin/Event-Deep-Dive, Data-Model-Refinement — Milestone Review ausstehend',
      ],
      procedure: [
        'AGM-Bootstrap: 20 Sessions — Phasen 0–17 (vollständiges arc42 + Domain Layer + Ops-Runbooks)',
        'Domain Layer: Context Map (10 Bounded Contexts), Event Catalog, Core-Context-Modelle',
        'WRK-001: Plugin- & Event-System-Analyse — 7 Findings, 6 priorisierte Empfehlungen',
        'Data Model: ~76 Tabellen aus Installer-SQL, 8 DB-Performance-Patterns dokumentiert',
        '3 ADRs formalisiert: JSON:API, DI-Container, Extension-Boot via services/provider.php',
        'Qualitätsrahmen: 13 messbare Szenarien (QS-01–QS-13) auf CI-Jobs gemappt',
      ],
      results: [
        '~40 Architektur-Dokumente: C4, Runtime-Pipelines, Building Blocks, ER-Diagramme, Runbooks',
        '12 Risiken (R-01–R-12): Factory→DI unvollständig, API-Paritätslücken, Plugin-Ordering, ACL-Wachstum',
        '8+ Tech-Debt-Items: ~1.838 PHPStan-Suppressions, dual Factory/DI, ~50 legacy triggerEvent-Call-Sites',
        'Event-System: 3 koexistierende Dispatch-Stile identifiziert — REC-02 burn-down für Joomla 7.0',
        'Single Source of Truth für Teams — ersetzt implizites Wissen, Resume-Prompts für Folge-Sessions',
      ],
      highlight:
        'Beim Plugin-/Event-System (WRK-001) tauchten drei parallele Dispatch-Stile und ~50 Legacy-Call-Sites auf — mit konkreter Empfehlung für Registry-Erweiterung und triggerEvent-Abbau vor Joomla 7.0.',
      tags: ['PHP', 'CMS', 'arc42', 'DDD', 'Plugin-Architektur', 'Tech Debt'],
    },
    {
      id: 'enterprise-core-system',
      title: 'Landeskritisches Line-of-Business-System',
      subtitle: '.NET · SQL Server · Business-Capability-Mapping & Ablösungsanalyse',
      context: [
        'Eine über ~20 Jahre gewachsene .NET-Anwendung als operatives Kernsystem einer nationalen Business Unit — ohne echte Übersicht, welche Geschäftsfälle das System überhaupt abdeckt. Ablösung war geplant, Scope und Risiken aber unklar.',
        'Technischer Ist-Zustand: mehrere Module mit quer verlaufenden Aufrufen untereinander, ~150 Datenbanktabellen und ~12.000 Stored Procedures — davon rund die Hälfte ohne nachweisbare Referenz in der Codebasis. Hardcodierte Zugangsdaten, auskommentierte Sicherheitsmechanismen, kein automatisierter Testbestand, keine Testumgebungen. Deployment über Pack-Skripte und manuellen Transport auf Produktionsserver — kein definierter Release-Prozess.',
      ],
      options: [
        'Option A: Greenfield-Ablösung — nur vertretbar nach sauberer Business-Capability-Map und Scope-Freeze',
        'Option B: Strangler-Pattern entlang identifizierter Fachdomänen — schrittweise Entkopplung statt Big Bang',
        'Option C: Analyse-first — Ist-Zustand, SP-Traceability und Security-Assessment vor jeder Migrationsentscheidung',
        'Dokumentation: arc42 via AGM; Schwerpunkte DB-Orphans, Modulkopplung, Security, Deployment-Prozess',
      ],
      procedure: [
        'Bootstrap + Ist-Aufnahme: Modul-Landschaft, Technologie-Stack und Betriebsmodell dokumentieren',
        'WRK-001: Stored-Procedure-Inventar — Abgleich DB-Objekte ↔ Code-Referenzen, Orphan-Klassifikation',
        'WRK-002: Modul- und Abhängigkeitsanalyse — Queraufrufe, Zyklen und Kopplungscluster',
        'WRK-003: Security-Assessment — hardcodierte Credentials, deaktivierte Schutzmechanismen, Angriffsflächen',
        'WRK-004: Business-Capability-Mapping — Evidenz aus Code, DB-Objekten und Fachinterviews',
        'WRK-005: Betriebs- und Deployment-Analyse — Pack-/Transport-Prozess, fehlende Stages, Release-Risiken',
      ],
      results: [
        'Quantifizierte DB-Transparenz: ~12.000 Stored Procedures inventarisiert, ~50 % ohne Code-Referenz — hohes Ablösungs- und Migrationsrisiko',
        'Modul-Kopplungsgraph mit Queraufrufen — keine isolierbare Fachdomäne ohne Vorarbeit identifizierbar',
        'Security-Findings: hardcodierte Credentials, auskommentierte Schutzmechanismen — P0 vor jeder Produktionsänderung',
        'Business-Capability-Register: dokumentierte vs. angenommene Abdeckung — Grundlage für Scope und Ablösungsreihenfolge',
        'Betriebsbefund: fehlende Teststages und manuelles Deployment als strukturelle Blocker für sichere Evolution',
      ],
      highlight:
        'Rund die Hälfte aller Stored Procedures hatte keine Referenz in der Codebasis — bei ~12.000 DB-Objekten ein zentrales Ablösungsrisiko, das ohne Inventar und Capability-Mapping unsichtbar geblieben wäre. Erst die Zahlen machen eine Migrations- oder Ablösungsentscheidung überhaupt vertretbar.',
      tags: ['.NET', 'SQL Server', 'Legacy', 'Business Capabilities', 'Security', 'Stored Procedures'],
    },
    {
      id: 'global-address-gis',
      title: 'Globales Lieferadressen-GIS',
      subtitle: 'Java · PostgreSQL/PostGIS → Python · KI-gestützte Stack-Migration',
      context: [
        'Eine Java-Anwendung mit PostgreSQL und PostGIS zur Verwaltung und Verarbeitung weltweiter Lieferadressen über Geodaten-Funktionen. Räumliche Abfragen und Adressvalidierungen liefen im Batch — mit Verarbeitungszeiten im Stundenbereich. Schnittstellen und Fehlerbehandlung entsprachen nicht mehr den Anforderungen an Betriebssicherheit und Weiterentwicklung.',
        'Ziel: Technologie-Wechsel und Performance-Hebung ohne manuelles Neuschreiben im klassischen Projektumfang — Migration vollständig KI-gestützt, mit Validierung der funktionalen Äquivalenz und Datenqualität.',
      ],
      options: [
        'Option A: Optimierung im Ist-Stack — Java/PostGIS-Tuning, Indexing, Query-Refactoring (begrenzter Performance-Spielraum)',
        'Option B: Python-Greenfield mit eingebetteter GIS-Library statt DB-seitiger PostGIS-Logik (gewählt)',
        'Option C: Hybrid — PostGIS als System of Record, neue Verarbeitungsschicht in Python',
        'Umsetzung: KI-gestützte Migration End-to-End — Architektur, Code, Schnittstellen, Fehlerpfade',
      ],
      procedure: [
        'Ist-Aufnahme: Java-Domain-Logik, PostGIS-Abfragen, Schnittstellenverträge und Batch-Abläufe dokumentieren',
        'Zielarchitektur: Python-Service mit interner GIS-Library — Entkopplung von DB-gebundener Raumlogik',
        'KI-gestützte Transformation: Modulweise Migration mit funktionaler Paritätsprüfung je Inkrement',
        'Schnittstellen-Härtung: API-Verträge modernisiert, Eingabevalidierung und Autorisierung nachgezogen',
        'Fehlerbehandlung: strukturierte Fehlerpfade, Retry-Logik und Nacharbeit-Prozesse für fehlerhafte Adressdaten',
        'Abnahme: Performance-Benchmarks und Datenqualitäts-Checks gegen Referenzläufe',
      ],
      results: [
        'Verarbeitungszeit von Stunden auf Sekunden reduziert — räumliche Adressoperationen produktionsfähig skaliert',
        'Vollständige Stack-Migration Java/PostgreSQL/PostGIS → Python mit interner GIS-Library',
        'Schnittstellen abgesichert und modernisiert — klare Verträge für angebundene Systeme',
        'Fehlerhandling mit Nacharbeit der Daten — fehlerhafte Datensätze werden erfasst, klassifiziert und bereinigt',
        'Gezeigt: KI-gestützte Migration als durchgängiger Pfad — nicht nur Analyse, sondern Umsetzung',
      ],
      highlight:
        'Die Migration von Java/PostGIS auf Python mit interner GIS-Library hat die Verarbeitungszeit von Stunden auf Sekunden gebracht — inklusive gehärteter Schnittstellen und Fehlerhandling mit systematischer Daten-Nacharbeit.',
      tags: ['Java', 'Python', 'PostgreSQL', 'PostGIS', 'GIS', 'KI-Migration'],
    },
    {
      id: 'community-platform',
      title: 'Online-Community-Plattform',
      subtitle: 'Dynamische Erweiterungen · Dienstplan & Ressourcenmanagement',
      context: [
        'Eine bestehende Online-Community-Plattform sollte um dynamische Funktionen erweitert werden — zur Organisation von Dienstplänen, Verfügbarkeiten und Ressourcen innerhalb verteilter Community-Strukturen. Die Ausgangslage: gewachsene Plattform mit festen Kernfunktionen, aber ohne modulare Bausteine für operative Planungsprozesse.',
        'Anforderung: unterschiedlichste, miteinander verzahnte Komponenten — von Schichtplanung und Einsatzkoordination bis zu Ressourcenbelegung und Berechtigungslogik — nahtlos in die bestehende Community-Umgebung integriert, ohne die Stabilität des Kernsystems zu gefährden.',
      ],
      options: [
        'Option A: Monolithische Erweiterung im Plattform-Kern — schnell, aber erhöhte Kopplung und Wartungsrisiko',
        'Option B: Modulare Plugin-/Extension-Architektur mit klar abgegrenzten Domänen (gewählt)',
        'Option C: Ausgelagerte Planungs-Services mit API-Anbindung an die Community-Plattform',
        'Scope: Dienstplan-Komponenten, Ressourcenmanagement, dynamische Konfiguration je Community-Kontext',
      ],
      procedure: [
        'Ist-Aufnahme: Extension Points, Datenmodell und Berechtigungskonzept der bestehenden Plattform',
        'Domänenmodell: Dienstplan, Verfügbarkeit, Ressource, Einsatz — als Bounded Contexts abgegrenzt',
        'Komponenten-Design: wiederverwendbare Bausteine für Planungs-, Zuweisungs- und Konfliktlogik',
        'KI-gestützte Implementierung: dynamische Funktionen iterativ entwickelt und in die Plattform integriert',
        'Schnittstellen: Einbettung in Community-UI, Rollen-/Rechtemodell und Benachrichtigungskanäle',
        'Abnahme: Szenarien für Mehrfach-Communities, parallele Einsätze und Ressourcenkonflikte',
      ],
      results: [
        'Dynamische Funktionsbausteine produktiv in der bestehenden Community-Plattform — ohne Kern-Refactoring',
        'Dienstplan-Komponenten: Schichtplanung, Verfügbarkeiten und Einsatzzuweisung je Community-Kontext',
        'Ressourcenmanagement: Belegung, Kapazitäten und Konfliktauflösung über vereinheitlichte Logik',
        'Modulare Architektur — Erweiterungen isoliert wartbar, Kernplattform bleibt upgrade-fähig',
        'Operative Entlastung: Planungsprozesse digitalisiert statt manuell über Inseltools koordiniert',
      ],
      highlight:
        'Statt die Community-Plattform zu ersetzen, kamen Dienstplan und Ressourcenmanagement als modular eingebettete Funktionen dazu — mit klaren Domänengrenzen und ohne Eingriff in den Kern.',
      tags: ['Community', 'Dienstplan', 'Ressourcenmanagement', 'Erweiterung', 'Modular', 'KI-gestützt'],
    },
  ],
} as const;

export const contact = {
  title: 'Kontakt',
  description:
    'Unverbindliches Erstgespräch mit Andreas Bergmann — typischerweise 30 Minuten, per Video oder Telefon. Wir klären Ausgangslage, Scope und was sinnvoll als Nächstes wäre.',
  cta: 'E-Mail senden',
  linkedinLabel: 'LinkedIn-Profil',
  formNote:
    'Ein Kontaktformular kommt demnächst. Bis dahin einfach per E-Mail melden.',
  formFields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'E-Mail', type: 'email' },
    { name: 'company', label: 'Unternehmen', type: 'text' },
    { name: 'message', label: 'Nachricht', type: 'textarea' },
  ],
  hints: [
    'Kurze Beschreibung der Systemlandschaft (Technologie, Größe, Ausgangslage)',
    'Was Sie brauchen könnten (Analyse, Dokumentation, Migrationsplanung, Entwicklung mit KI)',
    'Zeitlicher Rahmen und vorhandene Dokumentation',
  ],
} as const;

export const impressum = {
  title: 'Impressum',
  sections: [
    {
      heading: 'Angaben gemäß § 5 TMG',
      content: [
        'Andreas Bergmann',
        '[Straße und Hausnummer]',
        '[PLZ Ort]',
      ],
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
      content: [
        'Andreas Bergmann',
        '[Adresse]',
        '__EMAIL__',
      ],
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
        'Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage.',
        'Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. lit. f DSGVO (berechtigtes Interesse).',
        'Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
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
        'Links zu externen Websites (z. B. LinkedIn) unterliegen der Datenschutzerklärung des jeweiligen Anbieters.',
      ],
    },
    {
      heading: '6. KI-gestützte Analyse im Projektauftrag',
      content: [
        'Im Rahmen eines Analyse- oder Beratungsauftrags kann Quellcode über kommerzielle Enterprise-KI-APIs (z. B. Anthropic) verarbeitet werden. Dabei gelten die Commercial Terms of Service des Anbieters: keine Verwendung der Daten zum Modelltraining, keine dauerhafte Speicherung zu Verbesserungszwecken.',
        'Die Übertragung erfolgt verschlüsselt (TLS 1.2+). Vor der Übermittlung werden sensible Daten anonymisiert. Verarbeitung erfolgt temporär; nach Abschluss der Analyse werden Projekt-Artefakte gelöscht, sofern nicht anders vereinbart.',
        'Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) bzw. lit. f DSGVO (berechtigtes Interesse an der Auftragsdurchführung). Ein Auftragsverarbeitungsvertrag (AVV) wird im Projekt auf Wunsch abgeschlossen.',
      ],
    },
    {
      heading: '7. Ihre Rechte',
      content: [
        'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.',
        'Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde.',
      ],
    },
  ],
} as const;

export const pageMeta = {
  home: {
    title: 'Architekturberatung · Legacy · KI in der Praxis',
    description: home.description,
  },
  expert: {
    title: 'Andreas Bergmann — Expertenprofil',
    description: expert.description,
  },
  services: {
    title: 'Leistungen',
    description: services.description,
  },
  methodology: {
    title: 'Methodik & Sicherheit',
    description: methodology.description,
  },
  agmPoster: {
    title: 'AGM — Auf einer Seite',
    description:
      'Architecture Graph Method kompakt: Golden Path, Tracks, OKF, Prinzipien und Workflows.',
  },
  agmAssistant: {
    title: 'AGM Assistant',
    description:
      'Install, Adopt, Continue, Maintain und Verify — Session-Prompts und MCP für die IDE.',
  },
  e2Board: {
    title: 'E2 Board',
    description:
      'Event Storming, DDD, BDD, USM und Event Modeling — .storm.json als Fachkontext für Agenten.',
  },
  e2Poster: {
    title: 'E2 — Auf einer Seite',
    description:
      'Domain Modeling kompakt: Workshop-Flow, Export, KI-Nutzung und Brücke zu AGM.',
  },
  process: {
    title: 'Vorgehensweise',
    description: process.description,
  },
  references: {
    title: 'Referenzen',
    description: references.description,
  },
  news: {
    title: 'News',
    description:
      'Notizen zu Softwarearchitektur, Context Engineering und Legacy-Modernisierung — ohne Hype.',
  },
  contact: {
    title: 'Kontakt',
    description: contact.description,
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
