export const siteConfig = {
  name: 'X-BE',
  tagline: 'KI-gestützte Softwareentwicklung & Legacy-Modernisierung',
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
  eyebrow: 'Branchenpraxis',
  items: [
    'Logistik',
    'Versicherung',
    'Medien',
    'GIS & Geo-Daten',
    'Telekommunikation',
    'E-Commerce',
    'öffentlicher Sektor',
  ],
  note: 'Schwerpunkterfahrung aus unterschiedlichen Domänen — Beratung branchenübergreifend für jede Industry mit komplexer Softwarelandschaft.',
} as const;

export const home = {
  title: 'KI-gestützte Analyse und Modernisierung komplexer Legacy-Systeme',
  description:
    'Architekturberatung, Migrationsplanung und iterative KI-gestützte Softwareentwicklung — von der belastbaren Ist-Analyse bis zur validierten Umsetzung.',
  cta: 'Erstberatung vereinbaren',
  intro: {
    title: 'Beratung mit Substanz — und KI, wo sie Tempo bringt',
    paragraphs: [
      'Legacy-Systeme tragen geschäftskritische Prozesse, akkumulierte Erweiterungen und oft nur noch implizites Wissen einzelner Entwickler. Fehlende Dokumentation blockiert Modernisierungsentscheidungen — von der Technologie-Wahl bis zur Priorisierung von Inkrementen.',
      'Die Leistung beginnt mit klassischer Architekturberatung: systematische Ist-Analyse, Dokumentation nach Industriestandards und belastbare Migrationsplanung. Darauf aufbauend folgt KI-gestützte Softwareentwicklung — modulweise, rollback-fähig und mit manueller Architekten-Validierung.',
      'Methoden und Werkzeuge (AGM, E2) bleiben im Hintergrund: sie strukturieren Kontext für Agenten und beschleunigen die Arbeit — ersetzen aber weder Beratung noch Qualitätsurteil.',
    ],
  },
  context: {
    title: 'Typische Ausgangssituationen',
    items: [
      {
        title: 'Undokumentierter Monolith',
        description:
          'Ein gewachsenes Kernsystem ohne aktuelle Architekturdokumentation. Teams vermeiden Änderungen an „heiligen" Modulen, Release-Zyklen verlängern sich, und niemand hat den vollständigen Überblick über Abhängigkeiten und Schnittstellen.',
      },
      {
        title: 'Abgebrochene Modernisierung',
        description:
          'Eine Migration wurde begonnen, aber ohne belastbare Ist-Analyse gestoppt oder zurückgerollt. Teilweise migrierte Komponenten koexistieren mit Legacy-Modulen — die Integrationslandschaft ist undurchsichtig geworden.',
      },
      {
        title: 'Technische Schuld als Blocker',
        description:
          'Hohe Kopplung, fehlende Modulgrenzen und undokumentierte Schnittstellen verhindern die Einführung neuer Technologien, die Skalierung einzelner Domänen oder die Einhaltung regulatorischer Anforderungen.',
      },
      {
        title: 'M&A oder Plattform-Konsolidierung',
        description:
          'Nach einer Fusion oder Übernahme müssen heterogene Systemlandschaften bewertet, Schnittstellen harmonisiert und eine konsolidierte Zielarchitektur definiert werden — auf Basis belastbarer Fakten, nicht Annahmen.',
      },
    ],
  },
  values: [
    {
      title: 'Ist-Transparenz',
      description:
        'Strukturierte Architekturaufnahme: Abhängigkeiten, Schnittstellen und Risiken sichtbar — als Entscheidungsgrundlage für Roadmaps, Budgets und Stakeholder, nicht als Blackbox-Empfehlung.',
    },
    {
      title: 'Belastbare Roadmap',
      description:
        'Migrationspfade und Zielarchitektur aus Ist-Analyse, Geschäftsprioritäten und Constraints — inkl. Sequenzierung, Risiken und Rollback-Strategien pro Inkrement.',
    },
    {
      title: 'KI-Inkremente',
      description:
        'Umsetzung mit KI-gestützter Code-Transformation, automatisierten Tests und manuellem Architekten-Review — Tempo ohne Blindflug, validiert nach iSAQB-Standards.',
    },
  ],
  prototyping: {
    eyebrow: 'Fast Prototyping',
    title: 'Online-Systeme als Beleg',
    description:
      'Moderne Architektur und ausgefeilte CX — schnell prototypisiert. Beispiele aus der Praxis, nicht als Produktkatalog.',
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
        'Architekturberatung, Dokumentation, Migrationsplanung und KI-gestützte Softwareentwicklung — modular buchbar.',
    },
    {
      href: '/methodik',
      index: 3,
      title: 'Methodik & Sicherheit',
      description:
        'Hintergrund & Standards: AGM und E2, iSAQB, arc42, C4, Enterprise-KI und Validierung.',
    },
    {
      href: '/vorgehensweise',
      index: 4,
      title: 'Vorgehensweise',
      description:
        'Strukturierter Fünf-Phasen-Prozess vom Assessment über die Roadmap bis zur modulweisen Umsetzung.',
    },
    {
      href: '/referenzen',
      index: 5,
      title: 'Referenzen',
      description:
        'Anonymisierte Projektbeispiele — Optionen, Vorgehen und messbare Ergebnisse aus der Praxis.',
    },
  ],
} as const;

export const expert = {
  title: 'Expertenprofil',
  description:
    'Andreas Bergmann — Enterprise Software Architect mit über 30 Jahren Praxis: Architekturberatung, Legacy-Analyse, KI-gestützte Softwareentwicklung und Enablement globaler Tech-Teams.',
  headline: 'Enterprise Software Architect',
  subtitle: 'Architekturberatung · AI-Agentic Engineering · Legacy-Modernisierung',
  certification: 'iSAQB CPSA-A (Advanced Level) · Certified ScrumMaster (CSM)',
  languages: ['Deutsch', 'Englisch'],
  points: [
    'Über 30 Jahre Enterprise-Softwarearchitektur — branchenübergreifend, mit tiefer Praxis in Logistik, Versicherung, Medien, GIS und Telekommunikation.',
    'Aktueller Schwerpunkt: Architekturberatung und KI-gestützte Softwareentwicklung — von Ist-Analyse und Roadmap bis zur iterativen, validierten Umsetzung.',
    'Methoden im Hintergrund: Architecture Graph Method (AGM) für repo-lokalen Architekturkontext; E2 für Collaborative Domain Modeling — wo sie Tempo und Struktur bringen.',
    'Solutions Architecture in globalen Umgebungen: Java/Spring Boot, Microservices, REST & SOAP, Domain-Driven Design — inklusive Agile Coaching (Scrum, Kanban) und Team-Enablement.',
    'GIS & Geodaten: Leitung internationaler Entwicklungsteams für Geoinformationssysteme — Satellitendaten-Auswertung, Adress-Konsolidierung und hochverfügbare Online-Geo-Services.',
    'Kommunikation mit technischen und fachlichen Stakeholdern: ADRs, Management-Reports, Requirements Engineering und Product-Owner-Rolle in agilen Projekten.',
  ],
  detail: {
    title: 'Architekturkompetenz im Kontext',
    paragraphs: [
      'Softwarearchitektur ist mehr als Technologieauswahl. Sie umfasst Strukturprinzipien, Qualitätszieldefinition, Schnittstellen-Governance und die Fähigkeit, komplexe Systeme so zu zerlegen, dass Teams autonom arbeiten können — auch über Standorte und Zeitzonen hinweg.',
      'In Legacy-Kontexten steht die Beratungsarbeit vor der eigentlichen Frage: Was ist der Ist-Zustand, und welche Migrationsoptionen sind technisch und wirtschaftlich vertretbar? Diese Fragen werden auf Basis konkreter Code-Analyse, Abhängigkeitsmodelle und dokumentierter Architekturentscheidungen beantwortet — nicht als abstrakte Empfehlung.',
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
          'Kernsysteme für globale Betriebsprozesse: Web-Service-Architekturen, Adress- und Vertragsdaten-Konsolidierung, Data Mining und hochverfügbare Integrationslandschaften.',
      },
      {
        title: 'Geodaten & GIS',
        description:
          'Geoinformationssysteme für Satelliten- und Radardaten, Schadensanalyse, Klimadatenbanken und operative Adressverarbeitung — von Systemdesign bis Team-Koordination.',
      },
      {
        title: 'Integrationsarchitektur',
        description:
          'Synchrone und asynchrone Schnittstellen: REST, SOAP, Messaging, Batch und File-basierte Integrationen in gewachsenen Enterprise-Landschaften.',
      },
      {
        title: 'Security & Compliance',
        description:
          'Identifikation sicherheitsrelevanter Komponenten, Auth-Flows und Compliance-Anforderungen als Input für Migrationsplanung und Security-Assessments.',
      },
    ],
  },
} as const;

export const services = {
  title: 'Leistungsprofil',
  description:
    'Fünf modular buchbare Leistungsbausteine — von Ist-Analyse und Dokumentation über Migrationsplanung bis zur KI-gestützten Softwareentwicklung. Domänen-Workshops optional. Einzeln oder kombiniert beauftragbar.',
  intro: {
    title: 'Beratung zuerst — Umsetzung mit KI',
    paragraphs: [
      'Jeder Baustein liefert eigenständige, verwertbare Ergebnisse. Architektur-Analyse und Dokumentation schaffen die Grundlage. Migrationsplanung und KI-gestützte Softwareentwicklung setzen darauf auf — sind aber auch einzeln buchbar. Domänen-Discovery ergänzt bei unklaren Fachgrenzen. Methoden und Boards (AGM, E2) unterstützen im Hintergrund, ersetzen aber keine Beratungsleistung.',
    ],
  },
  items: [
    {
      id: 'analyse',
      title: 'Architektur-Analyse',
      description:
        'Systematische, KI-gestützte Erfassung der Architekturlogik aus dem Quellcode und der vorhandenen Artefakte. Ziel ist ein vollständiges, validiertes Bild der Ist-Architektur — nicht eine oberflächliche Code-Inventur.',
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
        'Erstellung präziser, wartbarer Architekturdokumentation nach Industriestandards. Die Dokumentation ist auf unterschiedliche Zielgruppen zugeschnitten — vom Entwicklerteam über Architekten bis zum Management.',
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
        'Stakeholder-spezifische Kurzfassungen (Management Summary, Technischer Deep-Dive)',
      ],
      standards: ['arc42', 'C4-Modell', 'ADR', 'Structurizr'],
    },
    {
      id: 'migrationsplanung',
      title: 'Migrationsplanung',
      description:
        'Erarbeitung belastbarer Migrationspfade und Zielarchitekturen — abgeleitet aus der analysierten Ist-Architektur, den geschäftlichen Prioritäten und den technischen Constraints. Keine generischen Schablonen, sondern kontextspezifische Roadmaps.',
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
        'Iterative, modulweise Umsetzung — Modernisierung, Migration oder funktionale Erweiterung — mit KI-unterstützter Code-Transformation. Jeder Zyklus folgt einem festen Qualitätssicherungsprozess: automatisierte Tests, Rollback-Fähigkeit und manuelle Architekten-Validierung.',
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
        'Optionale Discovery bei unklaren Fachgrenzen: moderierte Domain Modeling-Workshops (Event Storming, DDD, BDD, User Story Mapping, Event Modeling). Ergebnis ist ein strukturiertes Domänenmodell — als Grundlage für Roadmap und KI-gestützte Entwicklung, unterstützt durch E2 im Hintergrund.',
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
    'Werkzeuge und Standards hinter den Leistungen — AGM und E2 für strukturierten KI-Kontext, verbunden mit iSAQB, arc42, C4 und kontrolliertem Enterprise-KI-Einsatz.',
  intro: {
    title: 'Hintergrund der Leistungen',
    paragraphs: [
      'Die Beratungs- und Umsetzungsleistung steht im Vordergrund. Methoden und Boards strukturieren Kontext und beschleunigen KI-gestützte Arbeit — sie ersetzen weder Architekturkompetenz noch Qualitätsurteil.',
      'Architekturdokumentation kann als traversierbarer Kontext für Agenten dienen (AGM). Domänenmodelle aus Workshops als Fach-Kontext (E2). Jede Leistung basiert auf anerkannten Standards: iSAQB, arc42, C4. Der KI-Einsatz erfolgt über kommerzielle Enterprise-APIs — nicht über Consumer-Oberflächen.',
    ],
  },
  items: [
    {
      title: 'Standards',
      description:
        'Architecture Graph Method (AGM) und Collaborative Domain Modeling (E2) als unterstützende Verfahren, Open Knowledge Format (OKF) für versionierbare Wissensartefakte, iSAQB-CPSA-A als Bewertungsrahmen, arc42 und C4 für Dokumentation. MCP für agentische Tool-Anbindung. ATAM und ADRs für Trade-offs und Entscheidungen.',
    },
    {
      title: 'Context Engineering',
      description:
        'AGM setzt auf deterministische Graph-Traversierung statt probabilistischem RAG — analog zur Vision von Googles Knowledge Catalog: Wissen als verlinkter Kontextgraph, der KI-Agenten grounded. Repo-lokal, git-versioniert, menschen- und maschinenlesbar.',
    },
    {
      title: 'Domain Context',
      description:
        'E2 persistiert Workshop-Ergebnisse als schema-konformes .storm.json (Elemente, Relationen, Event-Schemas, Glossary, Hotspots). Kein Whiteboard-Foto — maschinenlesbare Fachwahrheit als zusätzlicher Input für Agenten. Domänendaten liegen lokal beim Nutzer; komplementär zur AGM-Repo-Lokalität.',
    },
    {
      title: 'Enterprise KI-Sicherheit',
      description:
        'Kommerzielle API-Accounts mit Commercial Terms of Service — u.a. Anthropic Enterprise API, AWS Bedrock, Azure OpenAI, Google Vertex AI. Keine Consumer-Weboberflächen. Modellauswahl nach Kundenanforderung (Datenresidenz, Compliance, Performance).',
    },
    {
      title: 'Datensouveränität',
      description:
        'Vertraglich zugesichert: Keine Eingabe- oder Ausgabedaten werden zum Training von KI-Modellen verwendet oder zur Modellverbesserung persistiert. Auf Wunsch DPA (Data Processing Agreement) für DSGVO-Konformität. Quellcode- und Domänenkontrolle verbleiben beim Kunden.',
    },
    {
      title: 'Validierung',
      description:
        'Jedes KI-Ergebnis wird manuell durch den Senior Architekten geprüft: Halluzinationen, fehlende Kontexte, falsche Abhängigkeiten. Erst validierte Ergebnisse fließen in Dokumentation, Domänenmodell und Migrationsplanung ein.',
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
    eyebrow: 'Im Hintergrund',
    title: 'Zwei Verfahren, die die Arbeit stützen',
    description:
      'Deterministischer, versionierbarer Kontext für KI-Agenten — Architekturgraph und Domänenmodell ergänzen die Beratungsleistung, ersetzen sie nicht.',
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
      'Workshop entscheidet → E2 persistiert → AGM/OKF übernimmt die Architekturspur → Agenten arbeiten grounded. Die Verfahren sind Capture- und Governance-Schichten hinter Beratung und Umsetzung.',
  },
  knowledgeCatalog: {
    title: 'Einordnung: Google Knowledge Catalog & OKF',
    description:
      'Die Branche bewegt sich von passiven Metadaten-Katalogen zu aktiven Kontextgraphen für KI-Agenten. Google open-sourced mit dem Knowledge-Catalog-Repository unter anderem das Open Knowledge Format (OKF) — Markdown mit YAML-Frontmatter, progressive disclosure über index.md, verlinkte Konzepte statt isolierter Dokumente.',
    alignment: [
      'AGM-Artefakte sind OKF-konform: typisierte Frontmatter, index.md + log.md pro Ebene, Markdown-Links als Graph-Kanten',
      'Deterministische Traversierung über blueprint.md und entry-point.md — kein RAG-Roulette bei Architekturentscheidungen',
      'MCP-fähig: AGM-CLI und MCP-Server exponieren Graph-Inhalte strukturiert an Agenten (Cursor, Claude, Copilot)',
      'Git-native: Wissenscuration wie Code — Pull Requests, Diffs, Review, CI-Link-Checks',
      'E2 ergänzt den Graph um Domänen-Snapshots: schema-fixiertes .storm.json als zusätzlicher Agenten-Input',
    ],
    scope:
      'Knowledge Catalog fokussiert Enterprise-Datenlandschaften (BigQuery, Glossare, Dataprodukte). AGM fokussiert Software-Architektur und Legacy-Code im Repository; E2 die fachliche Workshop-Wahrheit — komplementär, nicht konkurrierend. Wer beides braucht, kann OKF und .storm.json als gemeinsame Artefaktformate nutzen.',
    links: [
      { label: 'Knowledge Catalog (GitHub)', href: 'https://github.com/GoogleCloudPlatform/knowledge-catalog' },
      { label: 'OKF Spezifikation', href: 'https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md' },
      { label: 'Google Cloud: Knowledge Catalog für Agenten', href: 'https://cloud.google.com/dataplex/docs/ai-overview' },
    ],
  },
  tools: {
    eyebrow: 'Werkzeuge zur Methode',
    title: 'AGM und E2 in der Praxis',
    description:
      'Assistant und Poster für den Architecture Graph; Board und One-Pager für Collaborative Domain Modeling — im Hintergrund der Leistungen.',
  },
  prototyping: {
    eyebrow: 'Fast Prototyping — Belege',
    title: 'Online-Systeme mit moderner Architektur und CX',
    description:
      'Beispiele für hochwertiges, schnelles Prototyping — Nachweis der Entwicklungsfähigkeit, kein Produktkatalog.',
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
      'Interaktive Oberfläche für den Golden Path: Install, Adopt, Continue, Maintain und Verify. Erzeugt Session-Prompts (Copy-Paste) oder MCP-Aufrufe für die IDE.',
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
      'Die Garantie der Vertraulichkeit stützt sich auf vertragliche Vereinbarungen für Enterprise-Kunden und die technischen Architekturvorgaben des jeweiligen API-Anbieters. Für die Analyse wird primär die Anthropic Enterprise API genutzt — ergänzend oder alternativ AWS Bedrock, Azure OpenAI oder Google Vertex AI.',
    briefing:
      'Die Analyse erfolgt über eine Enterprise-API-Schnittstelle. Vertraglich ist zugesichert, dass keine übermittelten Daten zum Training der Modelle oder zur Verbesserung der KI-Services verwendet werden. Es findet keine dauerhafte Speicherung der Quelldaten auf Servern von Drittanbietern statt. Alle Analyseprozesse sind in sich geschlossene, temporäre Vorgänge, die unter Einhaltung strenger Datenschutzvorgaben (DSGVO) und nach Abschluss der Analyse gelöscht werden. Die volle Kontrolle über den Quellcode bleibt zu jeder Zeit beim Kunden.',
    contractual: {
      title: 'Vertragliche Sicherheit',
      items: [
        'Commercial Terms of Service — kein Consumer-Account, keine Weboberfläche für Privatnutzer',
        'Kein Training: Prompts und API-Ausgaben werden vertraglich nicht zum Trainieren der Modelle verwendet',
        'Keine Datenspeicherung: Übermittelte Daten werden nicht zur Modellverbesserung persistiert',
        'Data Processing Agreement (DPA): als Enterprise-Kunde abschließbar — DSGVO-Konformität und TOMs',
        'Ergänzend: NDA und Auftragsverarbeitungsvertrag (AVV) mit dem Kunden auf Anfrage',
      ],
    },
    technical: {
      title: 'Technische Sicherheit',
      items: [
        'Daten-Transit ausschließlich über TLS 1.2+ verschlüsselte Kanäle',
        'Temporäre Verarbeitung: Code verbleibt während der Analyse im API-Arbeitsspeicher und wird nach dem Request-Response-Zyklus verworfen',
        'Keine persistenten Logs: In Standard-Konfiguration keine Speicherung von Prompts oder Code-Fragmenten in Anbieter-Datenbanken',
        'Isolation: Jede API-Anfrage ist in sich geschlossen — kein Zugriff auf Kontext anderer Kunden oder vorheriger Sessions',
      ],
    },
    obligations: {
      title: 'Interne Prozesse (Sicherheitsanker)',
      items: [
        'Lokale Festplattenverschlüsselung (BitLocker, FileVault) auf allen Analyse-Arbeitsplätzen',
        'Keine Speicherung von Kundencode in unverschlüsselten Cloud-Notizen, privaten Git-Repos oder ungeschützten IDE-Sync-Diensten',
        'Anonymisierung vor Upload: Secrets, Tokens und kundenspezifische Konfigurationswerte werden entfernt oder durch Platzhalter ersetzt',
        'Kein Prompt-Logging: API-Logging-Features, die Eingaben persistieren, sind deaktiviert (Standard-Konfiguration)',
        'Manuelle Validierung jedes KI-Ergebnisses durch den Senior Architekten vor Freigabe',
      ],
    },
    legalNote:
      'Für die vertragliche Absicherung im Kundenverhältnis stellen wir auf Anfrage eine Vertraulichkeitsvereinbarung (NDA) und einen Auftragsverarbeitungsvertrag (AVV) bereit — abgestimmt auf den konkreten Analyse-Scope und die eingesetzten API-Anbieter.',
  },
} as const;

export const process = {
  title: 'Vorgehensweise',
  description:
    'Ein strukturierter Fünf-Phasen-Prozess — von der initialen Bestandsaufnahme bis zur optionalen KI-gestützten Umsetzung. Jede Phase liefert eigenständige, verwertbare Ergebnisse.',
  intro: {
    title: 'Phasenmodell',
    paragraphs: [
      'Der Prozess ist iterativ innerhalb jeder Phase, aber sequenziell zwischen den Phasen. Domänen-Workshops und Architektur-Analyse können bei unklaren Fachgrenzen vorgezogen oder parallel laufen. Analyse und Dokumentation können als abgeschlossenes Beratungsprojekt beauftragt werden; Migrationsplanung und KI-gestützte Softwareentwicklung bauen optional darauf auf. Der Umfang jeder Phase wird im initialen Assessment definiert.',
    ],
  },
  steps: [
    {
      number: '01',
      title: 'Initiales Assessment',
      description:
        'Strukturierte Bestandsaufnahme: Codebasis, Technologie-Stack, vorhandene Dokumentation, Team-Struktur und geschäftliche Prioritäten. Bei unklaren Bounded Contexts oder fehlender Ubiquitous Language: Domain Discovery mit E2 einplanen. Definition des Analyse-Scopes und der Qualitätsziele.',
      deliverables: [
        'Assessment-Report mit Scope-Definition und Erfolgskriterien',
        'Zugriffs- und Infrastruktur-Checkliste (Repository, CI/CD, Deployment)',
        'Stakeholder-Map und Kommunikationsplan',
        'Optional: Entscheidung Domain Discovery (E2) — ja/nein und Methoden-Mix',
      ],
    },
    {
      number: '02',
      title: 'Extraktion',
      description:
        'KI-gestützte Analyse der Architektur, Abhängigkeiten, Schnittstellen und Technologie-Landschaft. Parallel oder vorgelagert: fachliche Modellierung mit E2 (Events, Aggregates, Contexts). Automatisierte Generierung von Diagrammen, Graphen und Metriken — als Rohmaterial für die Validierung.',
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
        'Manuelle Prüfung aller KI-Ergebnisse durch den Senior Architekten nach iSAQB-Standard. Korrektur, Ergänzung und fachliche Einordnung. Abgleich mit vorhandenem Domänenwissen der Kundenteams.',
      deliverables: [
        'Validierte Architektur-Dokumentation (Ist-Zustand)',
        'Review-Protokoll mit identifizierten Korrekturen',
        'Architektur-Bewertung: Stärken, Risiken, Handlungsfelder',
      ],
    },
    {
      number: '04',
      title: 'Planung',
      description:
        'Erarbeitung der Migrations-Roadmap: Zielarchitektur, Inkremente, Sequenzierung, Risikobewertung. Abstimmung mit Stakeholdern und Integration in bestehende Planungsprozesse.',
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
        'Modulweise Softwareentwicklung gemäß Roadmap mit KI-gestützter Code-Transformation. Jeder Zyklus: Modulauswahl → Transformation → automatisierter Test → Architekten-Review → Merge. Rollback-fähig pro Inkrement.',
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
    'Anonymisierte Projektbeispiele aus Architekturberatung, Analyse und KI-gestützter Softwareentwicklung — mit nachvollziehbaren Optionen, Vorgehen und Ergebnissen.',
  intro: {
    title: 'Ergebnisse aus der Praxis',
    paragraphs: [
      'Die referenzierten Projekte zeigen Beratungs- und Umsetzungsleistung: Ist-Transparenz, Security- und Migrationsentscheidungen, KI-gestützte Stack-Migration und funktionale Erweiterungen. Jede Aussage ist auf Code, Konfiguration oder dokumentierte Evidenz zurückführbar.',
      'Methoden und Boards (AGM, E2) unterstützen im Hintergrund — die Referenzen belichten zuerst Outcomes und Entscheidungsgrundlagen, danach optional das Verfahren.',
    ],
  },
  method: {
    title: 'Architecture Graph Method (AGM)',
    subtitle: 'Verfahren im Hintergrund · Architecture Graph',
    description:
      'Repo-lokaler Markdown-Linkgraph unter `docs/architecture/`, orchestriert über `blueprint.md` und gepflegt durch KI-Agenten mit menschlicher Validierung. OKF-konforme Artefakte, deterministische Graph-Traversierung statt RAG — unterstützend für strukturierte KI-Konversation. Anschlussfähig an Googles Knowledge Catalog und Open Knowledge Format.',
    options: [
      'Dokumentations-Template: arc42 (Standard), lean-service, c4-light, adr-first oder custom',
      'Artefaktformat: Open Knowledge Format (OKF) — Markdown + YAML-Frontmatter, index.md, log.md',
      'Fokus-Bereiche wählbar: Implementation, Schnittstellen, Persistenz, Security, Deployment, Domain',
      'Golden Path: Install → Adopt → Continue → Maintain → Review (Verify in frischem Chat)',
      'Fünf Tracks: Build, Evolve, Architect, Domain, Verify — modular kombinierbar',
      'Werkzeugwahl: Copy-Paste-Prompts, MCP/CLI (`agm`) oder IDE-Regeln (Cursor, Claude, Copilot)',
    ],
    procedure: [
      'Install: Scaffold mit Prompts, Rollen und Template-Stubs im Ziel-Repository',
      'Adopt: Erstsession erzeugt blueprint.md, entry-point.md, always-on.md und erste evidenzbasierte Sektion',
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
    subtitle: 'Verfahren im Hintergrund · Domain Model Snapshot',
    description:
      'Browserbasiertes Board für Event Storming, DDD, BDD, User Story Mapping und Event Modeling. Workshop-Ergebnisse werden als schema-konformes `.storm.json` persistiert — Elemente, Attribute, Relationen und optionale Event-Schemas als Fach-Kontext für KI-Agenten. Unterstützend zur Beratung: menschliche Capture-Schicht, nicht Ersatz der Domain-Workflows.',
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
        'Ein gewachsener Java-Monolith (5 Maven-Module, 64 REST-Controller, ~186 JPA-Entities) als Headless-Commerce-API ohne verlässliche Architekturdokumentation. Produktionsreife unklar — strategische Entscheidung zwischen Modernisierung und Neuschreibung stand an.',
        'Auslöser: Fehlende Ist-Transparenz, parallele API-Versionen (v0/v1/v2), duplizierte Facade-Implementierungen und unbekannter Security-Status vor einem geplanten Go-Live.',
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
        'Die Risikoanalyse (WRK-002) deckte 3 kritische Sicherheitslücken auf, die ohne Reverse Engineering und gezielte Security-Arbeit im Architektur-Graph unsichtbar geblieben wären — darunter ein Default-JWT-Secret, fehlerhafte Token-Refresh-Logik und Auth-Bypass über URL-Matcher-Lücken.',
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
        'Die Deep-Dive-Analyse des Plugin-/Event-Systems (WRK-001) identifizierte drei koexistierende Dispatch-Stile und ~50 Legacy-Call-Sites — mit konkreter Empfehlung für Registry-Erweiterung und triggerEvent-Abbau vor dem Joomla-7.0-Release.',
      tags: ['PHP', 'CMS', 'arc42', 'DDD', 'Plugin-Architektur', 'Tech Debt'],
    },
    {
      id: 'enterprise-core-system',
      title: 'Landeskritisches Line-of-Business-System',
      subtitle: '.NET · SQL Server · Business-Capability-Mapping & Ablösungsanalyse',
      context: [
        'Eine über ~20 Jahre gewachsene .NET-Anwendung als operatives Kernsystem einer nationalen Business Unit eines multinationalen Konzerns — ohne belastbare Übersicht, welche Geschäftsfälle tatsächlich abgedeckt sind. Geplante Ablösung, aber unklare Scope- und Risikobasis.',
        'Technischer Ist-Zustand: mehrere Module mit quer verlaufenden Aufrufen untereinander, ~150 Datenbanktabellen und ~12.000 Stored Procedures — davon rund die Hälfte ohne nachweisbare Referenz in der Codebasis. Hardcodierte Zugangsdaten, auskommentierte Sicherheitsmechanismen, kein automatisierter Testbestand, keine Testumgebungen. Deployment über Pack-Skripte und manuellen Transport auf Produktionsserver — kein definierter Release-Prozess.',
      ],
      options: [
        'Option A: Greenfield-Ablösung — nur vertretbar nach belastbarer Business-Capability-Map und Scope-Freeze',
        'Option B: Strangler-Pattern entlang identifizierter Fachdomänen — schrittweise Entkopplung statt Big Bang',
        'Option C: Analyse-first — Ist-Transparenz, SP-Traceability und Security-Assessment vor jeder Migrationsentscheidung',
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
        'Rund die Hälfte aller Stored Procedures wies keine Referenz in der Codebasis auf — bei ~12.000 DB-Objekten ein zentrales Ablösungsrisiko, das ohne systematisches Inventar und Capability-Mapping unsichtbar geblieben wäre. Erst die Evidenz schafft die Basis für eine belastbare Migrations- oder Ablösungsentscheidung.',
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
        'Schnittstellen abgesichert und modernisiert — belastbare Verträge für angebundene Systeme',
        'Fehlerhandling mit Nacharbeit der Daten — fehlerhafte Datensätze werden erfasst, klassifiziert und bereinigt',
        'Nachweis: KI-gestützte Migration als durchgängiger Modernisierungspfad — nicht nur Analyse, sondern Umsetzung',
      ],
      highlight:
        'Die KI-gestützte Migration von Java/PostGIS auf Python mit interner GIS-Library verkürzte die Verarbeitungszeit von Stunden auf Sekunden — inklusive gehärteter Schnittstellen und einem Fehlerhandling mit systematischer Daten-Nacharbeit.',
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
        'Statt die gewachsene Community-Plattform zu ersetzen, wurden Dienstplan- und Ressourcenmanagement als dynamische, modular eingebettete Funktionen realisiert — mit klar abgegrenzten Domänen und ohne Eingriff in den Plattform-Kern.',
      tags: ['Community', 'Dienstplan', 'Ressourcenmanagement', 'Erweiterung', 'Modular', 'KI-gestützt'],
    },
  ],
} as const;

export const contact = {
  title: 'Kontakt',
  description:
    'Vereinbaren Sie eine unverbindliche Erstberatung mit Andreas Bergmann. Im Erstgespräch klären wir Ausgangssituation, Scope und passende Leistungsbausteine — typischerweise 30 Minuten, per Video oder Telefon.',
  cta: 'E-Mail senden',
  linkedinLabel: 'LinkedIn-Profil',
  formNote:
    'Ein Kontaktformular wird in Kürze verfügbar sein. Bis dahin erreichen Sie Andreas Bergmann per E-Mail.',
  formFields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'E-Mail', type: 'email' },
    { name: 'company', label: 'Unternehmen', type: 'text' },
    { name: 'message', label: 'Nachricht', type: 'textarea' },
  ],
  hints: [
    'Kurze Beschreibung Ihrer Systemlandschaft (Technologie, Größe, Ausgangssituation)',
    'Gewünschter Leistungsumfang (Analyse, Dokumentation, Migrationsplanung, KI-gestützte Softwareentwicklung)',
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
    title: 'KI-gestützte Softwareentwicklung & Legacy-Modernisierung',
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
      'Architecture Graph Method als One-Page-Poster: Golden Path, Tracks, OKF, Prinzipien und Workflows aus dem AGM-Repository.',
  },
  agmAssistant: {
    title: 'AGM Assistant',
    description:
      'Interaktive Oberfläche für Install, Adopt, Continue, Maintain und Verify — Session-Prompts und MCP für Agenten-Workflows.',
  },
  e2Board: {
    title: 'E2 Board',
    description:
      'Collaborative Domain Modeling: Event Storming, DDD, BDD, USM und Event Modeling — .storm.json als Fach-API für KI-Agenten.',
  },
  e2Poster: {
    title: 'E2 — Auf einer Seite',
    description:
      'Collaborative Domain Modeling als One-Page-Poster: Workshop-Flow, Export, KI-Nutzung und Brücke zur Architecture Graph Method.',
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
    title: 'News & Einblicke',
    description:
      'Kuratierte Einordnungen zu Softwarearchitektur, KI-gestützter Softwareentwicklung und Legacy-Modernisierung.',
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
