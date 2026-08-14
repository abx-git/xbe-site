export const compose = {
  title: 'Zusammenspiel',
  description:
    'E2 und AGM sind unabhängig. Hier steht nur die optionale Bridge — kein Bundle-Verkauf, keine Pflicht.',
  intro: [
    'Wer nur Domänenkontext braucht, nutzt E2. Wer nur Architekturkontext im Repo braucht, nutzt AGM. Beides zusammen ist möglich, aber nicht vorausgesetzt.',
    'Die folgende Sequenz beschreibt einen möglichen Roundtrip. Sie ist eine Spezifikation-Skizze, kein fertiges Produktversprechen.',
  ],
  steps: [
    {
      n: '1',
      title: 'Spezifizieren (E2)',
      detail:
        'Workshop / Board: Domäne modellieren. Export: schema-konformes `.storm.json`.',
    },
    {
      n: '2',
      title: 'Bauen (Agenten + Mensch)',
      detail:
        'JSON als zusätzlichen Kontext in die IDE. Implementierung, Tests, Review. Mensch bleibt Gate.',
    },
    {
      n: '3',
      title: 'Architekturspur (AGM)',
      detail:
        'Ist/Soll, Schnittstellen, Entscheidungen im Markdown-Graph unter docs/architecture/. Verify getrennt vom Schreib-Chat.',
    },
    {
      n: '4',
      title: 'Zurück in die Spec (optional)',
      detail:
        'Bounded Contexts / Events aus dem Graph oder aus Code zurück ins Board — oder Board anpassen und erneut exportieren. Source of Truth muss pro Projekt festgelegt werden.',
    },
  ],
  open: [
    'Wer gewinnt bei Konflikt: Board, Code oder AGM-Docs?',
    'Welche Felder der `.storm.json` dürfen Agenten schreiben — und unter welchem Review?',
    'Wie versioniert man Bridge-Regeln, ohne bestehende Examples zu brechen?',
  ],
  related: [
    { label: 'Konzept E2', href: '/concepts/e2' },
    { label: 'Konzept AGM', href: '/concepts/agm' },
    { label: 'Beispiel Roundtrip-Skizze', href: '/examples/roundtrip-skizze' },
  ],
} as const;
