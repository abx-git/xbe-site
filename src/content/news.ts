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
    'Technische Notizen zu Softwarearchitektur, Context Engineering und KI-gestützter Analyse — ohne Hype.',
  intro: {
    title: 'Technische Einordnungen',
    paragraphs: [
      'Gelegentliche Beiträge zu Formaten, Agenten-Workflows und Dokumentationsmodellen, die in Architektur- und Modernisierungsprojekten vorkommen.',
      'Kein regelmäßiges Publishing. Jeder Text beschreibt eine Technik oder ein Artefaktmodell und — wo sinnvoll — die Entsprechung in der Architecture Graph Method (AGM).',
    ],
  },
} as const;

/**
 * Neue Beiträge oben einfügen — slug wird zur URL: /news/{slug}
 * Datum im Format YYYY-MM-DD
 */
export const newsArticles: readonly NewsArticle[] = [
  {
    slug: 'zwei-monate-okf-einordnung-aus-projekten',
    date: '2026-07-08',
    title: 'Zwei Monate OKF — Beobachtungen am Artefaktmodell',
    excerpt:
      'Was sich zwei Monate nach Veröffentlichung des Open Knowledge Format in der Praxis zeigt: Interchange-Format ja, Methodikersatz nein.',
    tags: ['OKF', 'AGM', 'Context Engineering'],
    paragraphs: [
      'Mitte Mai 2026 hat Google im Repository GoogleCloudPlatform/knowledge-catalog das Open Knowledge Format (OKF) veröffentlicht: Markdown mit YAML-Frontmatter, index.md als Einstieg, verlinkte Konzepte statt monolithischer Dokumente.',
      'Technisch ist OKF ein Artefaktmodell, kein Prozess. Es spezifiziert Dateitypen und Frontmatter-Felder, nicht wie Teams Wissen kuratieren, reviewen oder an Agenten anbinden. Ohne Linkgraph und Validierung bleibt es Markdown mit Metadaten.',
      'In Architekturprojekten zeigt sich der Unterschied klar: OKF-Frontmatter allein verbessert die Kontextqualität von Agenten kaum. Stabilität entsteht, wenn Konzepte als Graph vorliegen — typisierte Dateien, relative Links, Review-Gates und ein Session-Orchestrator.',
      'Vergleich zu AGM: AGM nutzt denselben Grundaufbau (Markdown, index.md, log.md, Linkgraph) und ergänzt Orchestrierung über blueprint.md, Traversierung ab entry-point.md und MCP-Anbindung. OKF beschreibt Formatkonformität; AGM beschreibt, wie der Graph in Sessions gepflegt und geprüft wird.',
      'Praktische Einordnung nach zwei Monaten: OKF eignet sich als Exchange- und Exportformat zwischen Katalogen und Repos. Wer Context Engineering braucht, braucht darüber hinaus Graph-Disziplin, Work-Register und Verify-Schritte — unabhängig davon, ob die Dateien OKF-konform sind.',
    ],
  },
  {
    slug: '13-prinzipien-agentic-engineering',
    date: '2026-07-02',
    title: '13 Prinzipien für agentisches Engineering',
    excerpt:
      'Technisches Gerüst für wiederholbare Agenten-Arbeit: Spezifikation, Isolation, Guardrails, Verification und CI — unabhängig vom konkreten Tool.',
    tags: ['Agentic AI', 'Context Engineering', 'Methodik'],
    paragraphs: [
      'Agenten-Workflows in Architekturprojekten scheitern selten am Sprachmodell allein. Häufig fehlt Struktur: Spezifikation, Isolation, Exit-Kriterien und Nachprüfung. Die folgenden 13 Punkte beschreiben übliche Bausteine eines agentischen Engineering-Stacks.',
      '1 — CLAUDE.md / AGENTS.md: Persistente Projektinstruktionen im Repository statt im Chat-Verlauf. Konventionen, Pfade und Verbote werden versioniert. Entsprechung in AGM: context/always-on.md und die Rollenprompts als fester Session-Startkontext; Fortschritt und Backlog in blueprint.md.',
      '2 — Specification First: Scope, Nicht-Ziele und zulässige Evidenz vor der Ausführung definieren. In AGM: work/WRK-Items mit Auftrag und Track, bevor Analyse- oder Designdateien entstehen.',
      '3 — Subagents · Skills · Hooks: Aufgaben zerlegen. Subagents für Teilbereiche (z. B. Dependency-Map), Skills für wiederkehrendes Wissen, Hooks für Pre-/Post-Tool-Logik. Monolithische „erledige alles“-Prompts skalieren schlecht.',
      '4 — Plan & Task Breakdown: Mehrstufige Pläne mit eigenständigen Deliverables (Inventar → Bewertung → Empfehlung). AGM mappt das auf Phasen und work/-Reports mit klarer Typhasierung (analysis, design, question).',
      '5 — Exit Criteria & Gates: Abschlusskriterien pro Phase — z. B. Link-Integrität, verlinkte Evidenz, Review-Status. „Fertig“ ist ein Gate, kein Timing-Ereignis im Agentenlauf.',
      '6 — Context Management: Kontextfenster sind begrenzt. Kuratierte Artefakte laden statt vollständigen Repo-Dumps. In AGM: always-on.md, entry-point.md und gezielt verlinkte Kapitel statt Similarity-Search über alles.',
      '7 — Sandboxing & Isolation: Branch, Worktree oder Container; keine Produktionszugriffe, kontrollierte Netzwerke. Voraussetzung für Freigabe in Enterprise-Umgebungen.',
      '8 — Trajectory Review: Nicht nur Ergebnis, sondern Tool-Pfad und Annahmen prüfen. Vergleichbar mit CI-Post-Mortems: Abweichen vom Plan wird sichtbar.',
      '9 — Guardrails: Harte Policies (Schreiben/Löschen, Secrets, externe APIs) als Policy as Code, nicht nur als Prompt-Hinweis. AGM-Guardrail-Findings und CI-Link-Checks sind eine Teilmenge dieser Kategorie.',
      '10 — Verification Loops: Automatische Checks (Links, Lint, Tests) plus manuelle Review. In AGM: Verify-Workflows in einem frischen Chat, report-only, ohne Schreibauftrag.',
      '11 — Retrieval Stack: RAG als Ergänzungsschicht für Exploration; deterministische Graph-Traversierung für strukturelle Architekturfragen. Beides kann koexistieren — mit klarer Priorität, welches Wissen verbindlich ist.',
      '12 — Agentic CI/CD: Agenten-Artefakte laufen über PR, Review und Merge. Broken Links und Doc-Drift blockieren den Build. In AGM: agm-integrity bzw. Link-Checks im App-Repo.',
      '13 — Feedback & Iteration Loop: Session-Logs und Lessons Learned fließen zurück in Instruktionsdateien. In AGM: Session-Log und Statuszeilen in blueprint.md über mehrere Chats hinweg.',
      'Zusammenfassung: Die Prinzipien sind tooling-neutral. AGM deckt einen Teil davon konkret ab (Graph, blueprint.md, Verify, CI); Sandboxing, Trajectory Review und Policy-Hooks bleiben außerhalb der Methode und gehören zum umgebenden Agenten-Setup.',
    ],
  },
  {
    slug: 'okf-knowledge-catalog-und-agm',
    date: '2026-05-14',
    title: 'Open Knowledge Format (OKF) — Format für Agenten-Kontext',
    excerpt:
      'Google veröffentlicht OKF v0.1: Markdown-Artefakte mit Frontmatter, index.md und log.md. Technischer Überblick und Abgleich mit AGM-Dateimodellen.',
    tags: ['OKF', 'MCP', 'Knowledge Catalog'],
    paragraphs: [
      'Google hat das Repository GoogleCloudPlatform/knowledge-catalog veröffentlicht und damit das Open Knowledge Format (OKF) in Version 0.1 beschrieben — ein Artefaktformat für Wissen, das Menschen und Agenten lesen können.',
      'OKF ist minimal spezifiziert: Verzeichnis aus Markdown-Dateien mit YAML-Frontmatter. Pflichtfeld type; weitere Felder optional. Reservierte Namen index.md und log.md strukturieren Hierarchie und Änderungsverlauf. Es gibt kein verpflichtendes SDK und keinen zentralen Schema-Registry.',
      'Der Knowledge Catalog soll Inhalte nativ in OKF halten und über MCP an Agenten ausliefern. Das verschiebt Kataloge von passiven Metadaten-Stores zu versionierbaren, maschinenlesbaren Kontextgraphen — zunächst im Data-/Catalog-Umfeld (Glossare, Lineage, Dataprodukte).',
      'Für Architektur-Dokumentation ist die strukturelle Parallele: typisierte Markdown-Dateien, Index pro Ebene, Links als Kanten. AGM arbeitet mit demselben Muster unter docs/architecture/ — ergänzt um blueprint.md (Bauplan/WRK), entry-point.md (Agent-Navigation) und Workflows für Adopt, Continue, Maintain und Review.',
      'OKF und AGM adressieren unterschiedliche Ebenen: OKF das Austauschformat, AGM den Graph-Lebenszyklus im Anwendungs-Repo. Konformität ist komplementär — AGM-Artefakte können OKF-Frontmatter tragen, ohne dass OKF die Methode vorgibt.',
    ],
  },
  {
    slug: 'architekturwissen-als-graph-nicht-als-chat',
    date: '2026-03-14',
    title: 'Architekturwissen als Graph statt Chat-Kontext',
    excerpt:
      'Unterschied zwischen RAG-basierten Chat-Kontexten und deterministischen Markdown-Linkgraphen für Architekturfragen — und wo AGM einsetzt.',
    tags: ['AGM', 'RAG', 'Dokumentation'],
    paragraphs: [
      'Architekturwissen liegt typischerweise verteilt: Quellcode, Wikis, Tickets, implizites Teamwissen. Viele KI-Tools fassen das über Chat und Retrieval-Augmented Generation (RAG) zusammen.',
      'RAG eignet sich für explorative Fragen (Ähnlichkeitssuche über Chunks). Für reproduzierbare Architekturaussagen ist das schwächer: Retrieval ist probabilistisch, Kontextfenster begrenzen den Überblick, und Antworten sind schwer an konkrete Artefakte zurückzubinden.',
      'Eine Alternative ist ein repo-lokaler Dokumentationsgraph: Markdown-Dateien mit expliziten Links, versioniert in Git. Agenten traversieren die Kanten deterministisch statt per Embedding-Ähnlichkeit. Jede Aussage bleibt an eine Datei und oft an Code-Evidenz gebunden.',
      'AGM setzt genau dieses Modell um: Graph unter docs/architecture/, Orchestrierung über blueprint.md, Navigation ab entry-point.md, Vertiefung in work/-Reports. KI füllt und aktualisiert den Graph; Menschen validieren. Review-Workflows laufen report-only in separaten Chats.',
      'Abgrenzung: Chat/RAG bleibt sinnvoll für Exploration. Verbindliche Entscheidungsgrundlagen (Migration Scope, Security Findings, Capability Map) brauchen aber stabile, reviewbare Artefakte — nicht nur die zuletzt plausibelste Modellantwort.',
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
