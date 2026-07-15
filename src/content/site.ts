export const siteConfig = {
  name: 'X-BE',
  tagline: 'Legacy-Analyse & Modernisierung',
  ownerName: 'Andreas Bergmann',
  location: 'Großraum Hamburg',
  linkedin: 'https://www.linkedin.com/in/andreas-bergmann-083b6851/',
  siteUrl: 'https://www.x-be.de',
  hostingProvider: 'Vercel Inc.',
  agmAssistantUrl: 'https://abx-git.github.io/agm.github.io/',
  agmRepoUrl: 'https://github.com/abx-git/agm',
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
    'Architektur-Transparenz, Migrationsplanung und iterative KI-gestützte Umsetzung — automatisiert, validiert und nach Industriestandards dokumentiert.',
  cta: 'Erstberatung vereinbaren',
  intro: {
    title: 'Warum Architektur-Transparenz der erste Schritt ist',
    paragraphs: [
      'Legacy-Systeme sind selten „nur alt". Sie tragen geschäftskritische Prozesse, haben über Jahre Schichten von Erweiterungen akkumuliert und sind häufig nur noch durch implizites Wissen einzelner Entwickler verständlich. Fehlende oder veraltete Dokumentation erschwert jede Modernisierungsentscheidung — von der Technologie-Wahl bis zur Priorisierung von Migrationsinkrementen.',
      'Eine systematische Architekturanalyse macht Strukturen, Abhängigkeiten und Risiken sichtbar. Sie liefert die objektive Grundlage für Roadmaps, Budgetplanung und technische Entscheidungen — unabhängig davon, ob das Ziel ein Cloud-Migration, eine Service-Zerlegung oder ein Technologie-Wechsel ist.',
      'Durch die Kombination aus automatisierter KI-Analyse und manueller Validierung durch Andreas Bergmann (iSAQB CPSA-A) entstehen Ergebnisse, die reproduzierbar, nachvollziehbar und direkt in bestehende Architekturprozesse integrierbar sind.',
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
      title: 'Zeitersparnis',
      description:
        'Automatisierte Erfassung der Architekturlogik, Abhängigkeitsgraphen und Schnittstellen reduziert manuelle Reverse-Engineering-Aufwände erheblich. Was in klassischen Projekten Wochen dauert, wird in Tagen strukturiert — ohne Qualitätsverlust durch manuelle Validierung.',
    },
    {
      title: 'Risikominimierung',
      description:
        'Strukturierte Ist-Aufnahme als Entscheidungsgrundlage: Welche Module sind migrationskritisch? Wo liegen zyklische Abhängigkeiten? Welche Schnittstellen sind undocumented Breaking Points? Fundierte Antworten statt Migration im Blindflug.',
    },
    {
      title: 'Objektive Bewertung',
      description:
        'KI-gestützte Analyse liefert reproduzierbare, nachvollziehbare Ergebnisse — dokumentiert nach arc42 und C4, validiert nach iSAQB-Standards. Architekturentscheidungen werden begründbar und für Stakeholder kommunizierbar.',
    },
  ],
  teasers: [
    {
      href: '/leistungen',
      index: 2,
      title: 'Leistungen',
      description:
        'Von der automatisierten Ist-Analyse über Standards-Dokumentation bis zur iterativen KI-gestützten Migration — modular buchbar.',
    },
    {
      href: '/methodik',
      index: 3,
      title: 'Methodik & Sicherheit',
      description:
        'iSAQB, arc42, C4 — kombiniert mit Enterprise-KI-Infrastruktur, Datensouveränität und verbindlicher Ergebnisvalidierung.',
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
        'Methodik und anonymisierte Projektbeispiele — Optionen, Vorgehen und messbare Ergebnisse aus der Praxis.',
    },
  ],
} as const;

export const expert = {
  title: 'Expertenprofil',
  description:
    'Andreas Bergmann — Enterprise Software Architect mit über 30 Jahren Praxis: Legacy-Analyse, KI-gestützte Modernisierung, Architektur-Governance und Enablement globaler Tech-Teams.',
  headline: 'Enterprise Software Architect',
  subtitle: 'AI-Agentic Engineering · Architecture Governance · MCP Context Engineering',
  certification: 'iSAQB CPSA-A (Advanced Level) · Certified ScrumMaster (CSM)',
  languages: ['Deutsch', 'Englisch'],
  points: [
    'Über 30 Jahre Enterprise-Softwarearchitektur — branchenübergreifend, mit tiefer Praxis in Logistik, Versicherung, Medien, GIS und Telekommunikation.',
    'Aktueller Schwerpunkt: KI-gestützte Code-Analyse und Umsetzung mit der Architecture Graph Method (AGM) — repo-lokaler Dokumentationsgraph, deterministische Traversierung, evidenzbasierte work/-Reports.',
    'Solutions Architecture in globalen Umgebungen: Java/Spring Boot, Microservices, REST & SOAP, Domain-Driven Design — inklusive Agile Coaching (Scrum, Kanban) und Team-Enablement.',
    'GIS & Geodaten: Leitung internationaler Entwicklungsteams für Geoinformationssysteme — Satellitendaten-Auswertung, Adress-Konsolidierung und hochverfügbare Online-Geo-Services.',
    'Kommunikation mit technischen und fachlichen Stakeholdern: ADRs, Management-Reports, Requirements Engineering und Product-Owner-Rolle in agilen Projekten.',
  ],
  detail: {
    title: 'Architekturkompetenz im Kontext',
    paragraphs: [
      'Softwarearchitektur ist mehr als Technologieauswahl. Sie umfasst Strukturprinzipien, Qualitätszieldefinition, Schnittstellen-Governance und die Fähigkeit, komplexe Systeme so zu zerlegen, dass Teams autonom arbeiten können — auch über Standorte und Zeitzonen hinweg.',
      'In Legacy-Kontexten steht die Architekturarbeit vor der eigentlichen Frage: Was ist der Ist-Zustand, und welche Migrationsoptionen sind technisch und wirtschaftlich vertretbar? Diese Fragen werden auf Basis konkreter Code-Analyse, Abhängigkeitsmodelle und dokumentierter Architekturentscheidungen beantwortet — nicht als abstrakte Empfehlung.',
    ],
    competencies: [
      'Architektur-Reverse-Engineering und Abhängigkeitsanalyse komplexer Codebasen',
      'Java-Ökosystem: Spring Boot, Microservices, REST/SOAP, Teststrategien und Kernsystem-Integration',
      'Dokumentation nach arc42 (Kontext, Constraints, Building Blocks, Runtime, Deployment)',
      'C4-Modellierung (Context, Container, Component) für unterschiedliche Stakeholder-Ebenen',
      'GIS & Geodaten: PostGIS, Satelliten-/Radardaten, Adress- und Geodaten-Verarbeitung',
      'Migrationsstrategien: Strangler Fig, Branch by Abstraction, KI-gestützte Stack-Migration',
      'Domain-Driven Design: Bounded Contexts, Context Maps, Anti-Corruption Layers',
      'Agile Methoden: Scrum Master, Product Owner, Kanban — Prozessberatung und Team-Enablement',
      'KI-gestützte Entwicklung: MCP Context Engineering, OKF-Artefakte, agentische Workflows, manuelle Validierung',
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
    'Vier aufeinander aufbauende Leistungsbausteine — von der automatisierten Ist-Analyse über Standards-Dokumentation und Migrationsplanung bis zur optionalen iterativen Umsetzung.',
  intro: {
    title: 'Modularer Leistungsaufbau',
    paragraphs: [
      'Jeder Baustein liefert eigenständige, verwertbare Ergebnisse. Analyse und Dokumentation bilden die Grundlage für jede Modernisierungsentscheidung. Migrationsplanung und KI-gestützte Umsetzung setzen darauf auf — sind aber auch einzeln oder in Kombination beauftragbar.',
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
      title: 'KI-gestützte Migration',
      description:
        'Iterative, modulweise Umsetzung der definierten Migrations-Roadmap mit KI-unterstützter Code-Transformation. Jeder Zyklus folgt einem festen Qualitätssicherungsprozess — mit Rollback-Fähigkeit und manueller Architekten-Validierung.',
      details: [
        'Modulweise Auswahl und Priorisierung gemäß Migrations-Roadmap',
        'KI-gestützte Code-Transformation unter Einhaltung der Zielarchitektur-Vorgaben',
        'Automatisierte Test-Validierung und Regression-Checks pro Inkrement',
        'Manueller Review durch den Senior Architekten (iSAQB-Standard) vor Merge',
        'Dokumentation der Transformationsentscheidungen als ADRs',
      ],
      deliverables: [
        'Migrierte und getestete Module pro Iterationszyklus',
        'Transformations-Log mit Begründungen und Abweichungen',
        'Aktualisierte Architekturdokumentation nach jedem Inkrement',
        'Abschluss-Report mit Metriken (Coverage, Komplexitätsreduktion, Schnittstellen-Status)',
      ],
      standards: ['Iterative Inkremente', 'Automated Testing', 'Continuous Integration', 'ADR'],
    },
  ],
} as const;

export const methodology = {
  title: 'Methodik & Sicherheit',
  description:
    'Die Methodik verbindet etablierte Architekturstandards mit kontrolliertem KI-Einsatz. Qualität entsteht durch den Prozess — nicht trotz ihm.',
  intro: {
    title: 'Architekturstandards als Qualitätsrahmen',
    paragraphs: [
      'KI-gestützte Analyse ersetzt keine Architekturkompetenz — sie beschleunigt und strukturiert sie. Deshalb basiert jede Leistung auf anerkannten Methoden des iSAQB, der arc42-Dokumentation und des C4-Modells. Architekturartefakte folgen dem Open Knowledge Format (OKF) — im Einklang mit Googles Knowledge-Catalog-Initiative für agentengestütztes Context Engineering.',
      'Der KI-Einsatz erfolgt über kommerzielle Enterprise-API-Schnittstellen (z. B. Anthropic, AWS Bedrock, Azure OpenAI, Google Vertex AI) — nicht über Consumer-Oberflächen. Vertraglich und technisch ist sichergestellt, dass keine Kundendaten zum Modelltraining verwendet oder dauerhaft bei Drittanbietern gespeichert werden.',
    ],
  },
  items: [
    {
      title: 'Standards',
      description:
        'Architecture Graph Method (AGM) als operatives Verfahren, Open Knowledge Format (OKF) für versionierbare Wissensartefakte, iSAQB-CPSA-A als Bewertungsrahmen, arc42 und C4 für Dokumentation. MCP für agentische Tool-Anbindung. ATAM und ADRs für Trade-offs und Entscheidungen.',
    },
    {
      title: 'Context Engineering',
      description:
        'AGM setzt auf deterministische Graph-Traversierung statt probabilistischem RAG — analog zur Vision von Googles Knowledge Catalog: Wissen als verlinkter Kontextgraph, der KI-Agenten grounded. Repo-lokal, git-versioniert, menschen- und maschinenlesbar.',
    },
    {
      title: 'Enterprise KI-Sicherheit',
      description:
        'Kommerzielle API-Accounts mit Commercial Terms of Service — u.a. Anthropic Enterprise API, AWS Bedrock, Azure OpenAI, Google Vertex AI. Keine Consumer-Weboberflächen. Modellauswahl nach Kundenanforderung (Datenresidenz, Compliance, Performance).',
    },
    {
      title: 'Datensouveränität',
      description:
        'Vertraglich zugesichert: Keine Eingabe- oder Ausgabedaten werden zum Training von KI-Modellen verwendet oder zur Modellverbesserung persistiert. Auf Wunsch DPA (Data Processing Agreement) für DSGVO-Konformität. Quellcode-Kontrolle verbleibt beim Kunden.',
    },
    {
      title: 'Prozess',
      description:
        'TLS 1.2+-Verschlüsselung, temporäre Verarbeitung im API-Arbeitsspeicher, Anonymisierung von Secrets vor Upload, lokale Festplattenverschlüsselung, Löschung nach Projektabschluss. Keine Prompt-Logs in Standard-Konfiguration.',
    },
    {
      title: 'Validierung',
      description:
        'Jedes KI-Ergebnis wird manuell durch den Senior Architekten geprüft: Halluzinationen, fehlende Kontexte, falsche Abhängigkeiten. Erst validierte Ergebnisse fließen in Dokumentation und Migrationsplanung ein.',
    },
  ],
  frameworks: [
    'Architecture Graph Method (AGM)',
    'Open Knowledge Format (OKF)',
    'Model Context Protocol (MCP)',
    'iSAQB CPSA-A',
    'arc42',
    'C4 Model',
    'Domain-Driven Design',
    'TOGAF (ADM-kompatibel)',
    'ATAM',
    'ISO/IEC/IEEE 42010',
  ],
  knowledgeCatalog: {
    title: 'Einordnung: Google Knowledge Catalog & OKF',
    description:
      'Die Branche bewegt sich von passiven Metadaten-Katalogen zu aktiven Kontextgraphen für KI-Agenten. Google open-sourced mit dem Knowledge-Catalog-Repository unter anderem das Open Knowledge Format (OKF) — Markdown mit YAML-Frontmatter, progressive disclosure über index.md, verlinkte Konzepte statt isolierter Dokumente.',
    alignment: [
      'AGM-Artefakte sind OKF-konform: typisierte Frontmatter, index.md + log.md pro Ebene, Markdown-Links als Graph-Kanten',
      'Deterministische Traversierung über blueprint.md und entry-point.md — kein RAG-Roulette bei Architekturentscheidungen',
      'MCP-fähig: AGM-CLI und MCP-Server exponieren Graph-Inhalte strukturiert an Agenten (Cursor, Claude, Copilot)',
      'Git-native: Wissenscuration wie Code — Pull Requests, Diffs, Review, CI-Link-Checks',
    ],
    scope:
      'Knowledge Catalog fokussiert Enterprise-Datenlandschaften (BigQuery, Glossare, Dataprodukte). AGM fokussiert Software-Architektur und Legacy-Code im Repository — komplementär, nicht konkurrierend. Wer beides braucht, kann OKF als gemeinsames Artefaktformat nutzen.',
    links: [
      { label: 'Knowledge Catalog (GitHub)', href: 'https://github.com/GoogleCloudPlatform/knowledge-catalog' },
      { label: 'OKF Spezifikation', href: 'https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md' },
      { label: 'Google Cloud: Knowledge Catalog für Agenten', href: 'https://cloud.google.com/dataplex/docs/ai-overview' },
    ],
  },
  assistant: {
    title: 'AGM Assistant',
    description:
      'Interaktive Oberfläche für den Golden Path: Install, Adopt, Continue, Maintain und Verify. Erzeugt Session-Prompts (Copy-Paste) oder MCP-Aufrufe für die IDE.',
    paragraphs: [
      'Die UI liegt außerhalb dieser Marketing-Site und wird aus dem AGM-Repository nach GitHub Pages deployt. Hier eingebettet: derselbe Stand wie unter der öffentlichen Assistant-URL.',
      'Ein Chat = eine Session = ein Workflow. Verify immer in einem frischen Chat (report-only).',
    ],
    steps: [
      { n: '1', label: 'Install', hint: 'einmal pro Repo' },
      { n: '2', label: 'Adopt', hint: 'erste Docs' },
      { n: '3', label: 'Continue', hint: 'nächstes Kapitel' },
      { n: '4', label: 'Evolve', hint: 'nach Code-Änderungen' },
      { n: '5', label: 'Verify', hint: 'frischer Chat' },
    ],
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
    'Ein strukturierter Fünf-Phasen-Prozess — von der initialen Bestandsaufnahme bis zur optionalen iterativen Migration. Jede Phase liefert eigenständige, verwertbare Ergebnisse.',
  intro: {
    title: 'Phasenmodell',
    paragraphs: [
      'Der Prozess ist iterativ innerhalb jeder Phase, aber sequenziell zwischen den Phasen. Analyse und Dokumentation können als abgeschlossenes Projekt beauftragt werden; Migrationsplanung und Umsetzung bauen optional darauf auf. Der Umfang jeder Phase wird im initialen Assessment definiert.',
    ],
  },
  steps: [
    {
      number: '01',
      title: 'Initiales Assessment',
      description:
        'Strukturierte Bestandsaufnahme: Codebasis, Technologie-Stack, vorhandene Dokumentation, Team-Struktur und geschäftliche Prioritäten. Definition des Analyse-Scopes und der Qualitätsziele.',
      deliverables: [
        'Assessment-Report mit Scope-Definition und Erfolgskriterien',
        'Zugriffs- und Infrastruktur-Checkliste (Repository, CI/CD, Deployment)',
        'Stakeholder-Map und Kommunikationsplan',
      ],
    },
    {
      number: '02',
      title: 'Extraktion',
      description:
        'KI-gestützte Analyse der Architektur, Abhängigkeiten, Schnittstellen und Technologie-Landschaft. Automatisierte Generierung von Diagrammen, Graphen und Metriken — als Rohmaterial für die Validierung.',
      deliverables: [
        'Rohe Abhängigkeitsgraphen und Modulinventar',
        'Automatisch generierte C4-Diagramme (Entwurf)',
        'Technologie- und Schnittstellen-Inventar',
        'Metriken-Report (Komplexität, Kopplung, Duplikation)',
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
      title: 'Iterative Migration',
      description:
        'Modulweise Umsetzung gemäß Roadmap mit KI-gestützter Code-Transformation. Jeder Zyklus: Modulauswahl → Transformation → automatisierter Test → Architekten-Review → Merge. Rollback-fähig pro Inkrement.',
      deliverables: [
        'Migrierte Module pro Iterationszyklus',
        'Transformations- und Review-Protokolle',
        'Fortlaufend aktualisierte Architekturdokumentation',
        'Abschluss-Report mit Migrationsmetriken',
      ],
    },
  ],
} as const;

export const references = {
  title: 'Referenzen',
  description:
    'Die Architecture Graph Method (AGM) in der Praxis — Methodik, Optionen und anonymisierte Ergebnisse aus konkreten Analyseprojekten.',
  intro: {
    title: 'Vom Verfahren zur belastbaren Entscheidungsgrundlage',
    paragraphs: [
      'Die referenzierten Projekte folgen demselben Grundprinzip: Architekturwissen wird aus dem Quellcode extrahiert, in einem traversierbaren Dokumentationsgraphen strukturiert und durch gezielte Analyse-Arbeiten vertieft. Jede Aussage ist auf Code, Konfiguration oder dokumentierte Evidenz zurückführbar.',
      'Die Beispiele reichen von Analyse- und Migrationsprojekten bis zu KI-gestützter Umsetzung und funktionaler Erweiterung bestehender Plattformen — jeweils mit Bootstrap, vertiefender Architektur-Arbeit und belastbarer Ergebnisdokumentation.',
    ],
  },
  method: {
    title: 'Architecture Graph Method (AGM)',
    subtitle: 'Verfahren · Architecture Graph',
    description:
      'Repo-lokaler Markdown-Linkgraph unter `docs/architecture/`, orchestriert über `blueprint.md` und gepflegt durch KI-Agenten mit menschlicher Validierung. OKF-konforme Artefakte, deterministische Graph-Traversierung statt RAG — Architekturdokumentation als API für strukturierte KI-Konversation. Anschlussfähig an Googles Knowledge Catalog und Open Knowledge Format.',
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
    'Gewünschter Leistungsumfang (Analyse, Dokumentation, Migration)',
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
    title: 'Legacy-Analyse & Modernisierung',
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
      'Kuratierte Einordnungen zu Softwarearchitektur, KI-gestützter Analyse und Legacy-Modernisierung.',
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
