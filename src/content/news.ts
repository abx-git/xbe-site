export interface NewsArticle {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tags: readonly string[];
  paragraphs: readonly string[];
}

export const newsSection = {
  title: 'News & Einblicke',
  description:
    'Kuratierte Einordnungen zu Softwarearchitektur, KI-gestützter Analyse und Legacy-Modernisierung — sachlich, praxisnah, ohne Hype.',
  intro: {
    title: 'Architektur und KI — eingeordnet, nicht hyped',
    paragraphs: [
      'Hier erscheinen gelegentlich Beiträge zu Themen, die in Analyse- und Modernisierungsprojekten relevant sind: Architekturdokumentation, Enterprise-KI, Methodik, Sicherheit und Entscheidungsgrundlagen für Legacy-Systeme.',
      'Kein tägliches Publishing — lieber wenige Texte mit Substanz. Wenn ein Thema für Ihre Ausgangslage interessant ist, sprechen wir im Erstgespräch darüber.',
    ],
  },
} as const;

/**
 * Neue Beiträge oben einfügen — slug wird zur URL: /news/{slug}
 * Datum im Format YYYY-MM-DD
 */
export const newsArticles: readonly NewsArticle[] = [
  {
    slug: '13-prinzipien-agentic-engineering',
    date: '2026-07-02',
    title: '13 Prinzipien für agentisches Engineering',
    excerpt:
      'Vom ad-hoc-Prompt zum wiederholbaren Agenten-Stack: Spezifikation, Guardrails, Verification Loops und agentic CI/CD — ein Gerüst für KI-Arbeit, die in Architekturprojekten bestehen muss.',
    tags: ['Agentic AI', 'Context Engineering', 'Architektur', 'Methodik'],
    paragraphs: [
      'KI-Agenten in produktionsnahen Architekturprojekten scheitern selten am Modell — sondern an fehlender Struktur. Wer Legacy-Code analysieren, Dokumentation pflegen oder Migrationspläne erarbeiten lässt, braucht kein weiteres Chat-Fenster, sondern ein Engineering-Framework: wiederholbar, prüfbar, isoliert. Die folgenden 13 Prinzipien bilden ein solches Gerüst — unabhängig vom konkreten Tooling.',
      '1 — CLAUDE.md / AGENTS.md: Persistente Projektinstruktionen im Repository, nicht im Chat-Verlauf. Was der Agent immer wissen muss — Konventionen, Pfade, Verbote — steht in versionierten Markdown-Dateien. Das ist das Agenten-Äquivalent zu blueprint.md in der AGM: der Orchestrator, der jede Session startet.',
      '2 — Specification First: Bevor Code oder Dokumentation entsteht, steht die Spezifikation. Was ist Scope? Was sind Nicht-Ziele? Welche Evidenz gilt? In Architekturarbeiten bedeutet das: work/WRK-Items mit klarem Auftrag, bevor der Agent loslegt — nicht umgekehrt.',
      '3 — Subagents · Skills · Hooks: Komplexe Aufgaben werden zerlegt. Subagents übernehmen fokussierte Teilaufgaben (Security-Scan, Dependency-Map). Skills kapseln wiederverwendbares Wissen. Hooks steuern den Lebenszyklus — vor und nach Tool-Aufrufen. Monolithische „Mache alles"-Prompts sind Anti-Pattern.',
      '4 — Plan & Task Breakdown: Mehrstufige Pläne mit expliziten Tasks, nicht ein Schritt ins Blaue. Für Modernisierungsprojekte: erst Inventar, dann Bewertung, dann Empfehlung — jede Stufe als abgeschlossene Einheit mit eigenem Deliverable.',
      '5 — Exit Criteria & Gates: Jede Phase endet mit definierten Abbruchkriterien. „Fertig" heißt: Link-Integrität geprüft, Evidenz verlinkt, Review bestanden — nicht: der Agent hat aufgehört zu schreiben. Gates verhindern, dass unsichere Zwischenstände als Ergebnis durchgereicht werden.',
      '6 — Context Management: Kontext ist endlich und teuer. Was landet im Fenster, muss kuratiert sein — Graph-Traversierung statt Volltext- dump. In AGM-Projekten: entry-point.md, always-on.md und gezielte Kapitel laden, nicht das gesamte Repo.',
      '7 — Sandboxing & Isolation: Agenten arbeiten in abgegrenzten Umgebungen — Branch, Worktree, Container. Kein direkter Zugriff auf Produktion, keine unkontrollierten Netzwerkpfade. In Enterprise-Kontexten nicht optional, sondern Voraussetzung für Freigabe.',
      '8 — Trajectory Review: Nicht nur Ergebnis prüfen, sondern den Weg. Welche Tools wurden aufgerufen? Welche Annahmen getroffen? Wo wich der Agent vom Plan ab? Trajectory Review ist die Wurzelursachen-Analyse für Agenten-Fehler — vergleichbar mit Post-Mortems in CI/CD.',
      '9 — Guardrails: Harte Grenzen für das, was ein Agent nicht tun darf — Dateien löschen, Secrets committen, externe APIs ohne Freigabe. Guardrails sind Policy as Code, nicht Höflichkeitsbitte im Prompt.',
      '10 — Verification Loops: Ergebnisse werden automatisch und manuell verifiziert — Link-Checks, Lint, Tests, frischer Chat für Review-only. Die AGM-Review-Phase (Verify in separatem Chat) ist genau das: Report-only, ohne Schreibzugriff.',
      '11 — Retrieval Stack: RAG hat seinen Platz — aber als Schicht, nicht als Fundament. Deterministischer Graph zuerst, Retrieval für Lücken und Exploration. Wer nur vektorisiert, verliert Struktur; wer nur linkt, verpasst semantische Nähe. Beides kombinieren — mit klarer Priorität.',
      '12 — Agentic CI/CD: Agenten-Artefakte durchlaufen dieselbe Pipeline wie Code — PR, Review, Merge. Dokumentations-Updates bei git diff, broken links blockieren den Build. Architekturwissen ist kein Nebenprodukt, sondern ein versioniertes Deliverable.',
      '13 — Feedback & Iteration Loop: Jeder Lauf verbessert den nächsten — Session-Logs, blueprint.md-Fortschritt, Lessons Learned in AGENTS.md. Agentisches Engineering ist kein One-Shot, sondern ein kontinuierlicher Kreislauf aus Plan, Execute, Verify, Learn.',
      'Für technische Leitung lässt sich daraus ableiten: Agenten in Architekturprojekten sind kein Feature-Toggle, sondern ein Prozess-Design-Problem. Wer die 13 Bausteine ignoriert, bekommt schnelle Demos — wer sie ernst nimmt, bekommt Ergebnisse, die in Roadmaps, Audits und Migrationsentscheidungen standhalten.',
    ],
  },
  {
    slug: 'zwei-monate-okf-einordnung-aus-projekten',
    date: '2026-07-08',
    title: 'Zwei Monate OKF — was sich in Architekturprojekten zeigt',
    excerpt:
      'Seit der Veröffentlichung des Open Knowledge Format hat sich viel diskutiert, wenig sauber umgesetzt. Ein kurzer Zwischenstand: wo OKF in Legacy-Analysen wirklich hilft — und wo es ohne Graph-Disziplin wirkungslos bleibt.',
    tags: ['OKF', 'AGM', 'Legacy', 'Context Engineering'],
    paragraphs: [
      'Mitte Mai hat Google mit dem Knowledge-Catalog-Repository das Open Knowledge Format (OKF) vorgestellt — Markdown mit YAML-Frontmatter, index.md als Einstieg, verlinkte Konzepte statt monolithischer Docs. Zwei Monate später ist das Bild klar: Das Format löst kein Organisationsproblem per se. Es liefert aber erstmals ein vendor-neutrales Artefaktmodell, das Menschen, Git und Agenten gleichermaßen lesen können.',
      'In Modernisierungsprojekten zeigt sich ein Muster: Teams, die OKF nur als „neues Confluence“ behandeln, gewinnen wenig. Teams, die Wissen als Graph kuratieren — mit blueprint.md, klaren Concept-Types und Review-Workflows — berichten von stabileren KI-Analysen und weniger Halluzinationen bei Architekturfragen.',
      'AGM hatte diese Struktur bereits vor OKF: repo-lokaler Linkgraph, deterministische Traversierung, MCP-Anbindung. OKF formalisiert Teile davon und macht Artefakte austauschbar — etwa wenn Architekturwissen aus dem Anwendungs-Repo mit Data-Catalog-Kontext aus einer Datenplattform zusammenfließen soll.',
      'Praktische Empfehlung nach zwei Monaten Feldbeobachtung: OKF als Export- und Interchange-Format nutzen, nicht als Ersatz für Methodik. Wer nur Frontmatter ergänzt, ohne Linkgraph und Validierung, hat Markdown mit Metadaten — kein Context Engineering.',
      'Für technische Leitung lohnt sich jetzt die Einordnung: Passt OKF zu Ihrer Dokumentationskultur? Gibt es einen Graph-Orchestrator (blueprint.md o. Ä.)? Sind Agenten über MCP an strukturierte Artefakte angebunden? Wenn drei Mal ja — dann ist OKF kein Hype, sondern Infrastruktur.',
    ],
  },
  {
    slug: 'okf-knowledge-catalog-und-agm',
    date: '2026-05-14',
    title: 'Google stellt OKF vor — offenes Format für Agenten-Kontext',
    excerpt:
      'Mit dem Knowledge-Catalog-Repository veröffentlicht Google das Open Knowledge Format (OKF): Wissen als verlinkte Markdown-Artefakte statt isolierter Metadaten. Für Softwarearchitektur und Legacy-Analyse ist das ein relevanter Richtungswechsel.',
    tags: ['OKF', 'MCP', 'Knowledge Catalog', 'Context Engineering'],
    paragraphs: [
      'Google hat heute das Repository GoogleCloudPlatform/knowledge-catalog veröffentlicht — und damit nicht nur einen Enterprise-Datenkatalog für KI-Agenten, sondern vor allem ein offenes Artefaktformat: das Open Knowledge Format (OKF), Version 0.1.',
      'OKF ist bewusst minimal: ein Verzeichnis aus Markdown-Dateien mit YAML-Frontmatter. Pflichtfeld ist type — alles Weitere optional. Reservierte Dateinamen index.md und log.md strukturieren Hierarchie und Änderungsverlauf. Kein SDK, kein zentraler Schema-Registry-Zwang: Wer ein Repository klonen kann, kann OKF lesen und schreiben.',
      'Parallel kündigt Google an, den Knowledge Catalog nativ für OKF zu öffnen und Inhalte über MCP an Agenten auszuliefern. Das Muster ist klar: passive Kataloge werden zu aktiven Kontextgraphen — grounded, versionierbar, maschinenlesbar. Für Data-Teams ist das der nächste Schritt nach Glossaren und Lineage-Tools.',
      'Für Softwarearchitektur ist die Parallele offensichtlich: Legacy-Systeme brauchen dasselbe — nur mit Fokus auf Code, Schnittstellen, Domänen und Migrationsentscheidungen statt Tabellen und Dataprodukten. Die Architecture Graph Method (AGM), die X-BE in Projekten einsetzt, arbeitet bereits in diesem Paradigma: blueprint.md als Orchestrator, index.md pro Ebene, Markdown-Links als Kanten, MCP für Agenten.',
      'Ob OKF zum De-facto-Standard wird, hängt von Adoption ab — nicht vom Autor. Für Architekturverantwortliche lohnt sich ab heute ein Blick auf die SPEC und die Beispiel-Bundles im Repository. Nicht weil Google es sagt, sondern weil Context Engineering ohne austauschbare Artefakte zum Prompt-Engineering verkommt.',
    ],
  },
  {
    slug: 'architekturwissen-als-graph-nicht-als-chat',
    date: '2026-03-14',
    title: 'Architekturwissen als Graph — nicht als Chat',
    excerpt:
      'Warum deterministische Dokumentationsgraphen für Legacy-Analysen belastbarer sind als reine RAG-Ansätze — und wo KI trotzdem den größten Hebel hat.',
    tags: ['AGM', 'Architektur', 'Enterprise-KI'],
    paragraphs: [
      'In vielen Modernisierungsprojekten liegt Architekturwissen verteilt: im Code, in Confluence-Seiten, in Köpfen, in Tickets. KI-gestützte Tools versprechen, diese Lücke schnell zu schließen — oft über Chat-Oberflächen mit Retrieval-Augmented Generation (RAG).',
      'RAG ist nützlich für explorative Fragen. Für belastbare Entscheidungen reicht es selten: Retrieval ist probabilistisch, Kontextfenster begrenzen den Überblick, und Antworten sind schwer reproduzierbar. Wer Migration budgetieren, Security-Findings priorisieren oder Scope für eine Ablösung definieren muss, braucht nachvollziehbare Evidenz — nicht die plausibelste Antwort.',
      'Die Architecture Graph Method (AGM) geht einen anderen Weg: Architekturwissen wird als verlinkter Markdown-Graph im Repository geführt — orchestriert über blueprint.md, traversierbar wie eine API. KI-Agenten befüllen und vertiefen den Graph; Menschen validieren. Jede Aussage bleibt auf Code, Konfiguration oder dokumentierte Artefakte zurückführbar.',
      'Der Hebel der KI liegt dann nicht im freien Chat, sondern in strukturierten work/-Analysen: Security-Assessments, Dependency-Maps, Capability-Mappings, Tech-Debt-Register. Deterministische Traversierung liefert den Rahmen; KI liefert Geschwindigkeit und Tiefe — mit menschlicher Prüfung als Qualitätstor.',
      'Für CTOs und technische Leitung bedeutet das: weniger „Was meint das Modell?" — mehr „Was steht im Graph, und wer hat es validiert?" Genau diese Transparenz ist Voraussetzung für sichere Modernisierungsentscheidungen.',
    ],
  },
];

export function getSortedNews(): NewsArticle[] {
  return [...newsArticles].sort((a, b) => b.date.localeCompare(a.date));
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function formatNewsDate(isoDate: string): string {
  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate));
}

export function getLatestNews(limit = 2): NewsArticle[] {
  return getSortedNews().slice(0, limit);
}
