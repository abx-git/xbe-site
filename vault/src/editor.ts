/** Hilfsfunktionen für Text- und Markdown-Bearbeitung im Viewer. */

const EDITABLE_EXTENSIONS = new Set([
  'txt', 'md', 'markdown', 'json', 'csv', 'yaml', 'yml', 'xml',
  'html', 'htm', 'css', 'js', 'ts', 'jsx', 'tsx', 'svg',
]);

const EDITABLE_MIME_PREFIXES = ['text/'];
const EDITABLE_MIME_EXACT = new Set(['application/json', 'application/xml']);

export function isEditableFile(mimeType: string, filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  if (EDITABLE_EXTENSIONS.has(ext)) return true;
  if (EDITABLE_MIME_EXACT.has(mimeType)) return true;
  if (EDITABLE_MIME_PREFIXES.some((p) => mimeType.startsWith(p))) return true;
  return false;
}

export function isMarkdownFile(mimeType: string, filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return mimeType === 'text/markdown' || ext === 'md' || ext === 'markdown';
}

/** Markdown → HTML (Vorschau und Rich-Editor). */
export function renderMarkdown(md: string): string {
  return markdownToHtml(md);
}

/** Markdown → HTML für den Rich-Text-Editor. */
export function markdownToHtml(md: string): string {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let inCode = false;
  let codeBuf: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (listType) {
      html.push(listType === 'ul' ? '</ul>' : '</ol>');
      listType = null;
    }
  };

  const inline = (text: string) =>
    escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/~~(.+?)~~/g, '<s>$1</s>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`);
        codeBuf = [];
        inCode = false;
      } else {
        flushList();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      continue;
    }

    if (/^#{1,3} /.test(line)) {
      flushList();
      const level = line.match(/^(#+)/)![1].length;
      html.push(`<h${level}>${inline(line.replace(/^#+\s*/, ''))}</h${level}>`);
      continue;
    }
    if (line.startsWith('> ')) {
      flushList();
      html.push(`<blockquote><p>${inline(line.slice(2))}</p></blockquote>`);
      continue;
    }
    if (/^[-*] /.test(line)) {
      if (listType !== 'ul') {
        flushList();
        html.push('<ul>');
        listType = 'ul';
      }
      html.push(`<li>${inline(line.replace(/^[-*] /, ''))}</li>`);
      continue;
    }
    if (/^\d+\. /.test(line)) {
      if (listType !== 'ol') {
        flushList();
        html.push('<ol>');
        listType = 'ol';
      }
      html.push(`<li>${inline(line.replace(/^\d+\. /, ''))}</li>`);
      continue;
    }
    if (line.trim() === '') {
      flushList();
      continue;
    }
    flushList();
    html.push(`<p>${inline(line)}</p>`);
  }

  flushList();
  if (inCode && codeBuf.length) {
    html.push(`<pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`);
  }
  return html.join('\n');
}

/** HTML aus contenteditable → Markdown (für verschlüsseltes Speichern). */
export function htmlToMarkdown(root: HTMLElement): string {
  const blocks: string[] = [];

  const inlineMd = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? '';
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    const inner = () => Array.from(el.childNodes).map(inlineMd).join('');
    switch (tag) {
      case 'strong':
      case 'b':
        return `**${inner()}**`;
      case 'em':
      case 'i':
        return `*${inner()}*`;
      case 's':
      case 'strike':
        return `~~${inner()}~~`;
      case 'code':
        return `\`${inner()}\``;
      case 'a':
        return `[${inner()}](${el.getAttribute('href') ?? ''})`;
      case 'br':
        return '\n';
      default:
        return inner();
    }
  };

  const blockMd = (el: HTMLElement): string => {
    const tag = el.tagName.toLowerCase();
    const text = () => Array.from(el.childNodes).map((n) =>
      n.nodeType === Node.ELEMENT_NODE && !['STRONG', 'EM', 'B', 'I', 'S', 'CODE', 'A'].includes((n as HTMLElement).tagName)
        ? blockMd(n as HTMLElement)
        : inlineMd(n),
    ).join('').trim();

    switch (tag) {
      case 'h1': return `# ${text()}`;
      case 'h2': return `## ${text()}`;
      case 'h3': return `### ${text()}`;
      case 'blockquote': return `> ${text()}`;
      case 'pre': return `\`\`\`\n${el.textContent ?? ''}\n\`\`\``;
      case 'ul':
        return Array.from(el.querySelectorAll(':scope > li'))
          .map((li) => `- ${inlineMd(li)}`.trim())
          .join('\n');
      case 'ol':
        return Array.from(el.querySelectorAll(':scope > li'))
          .map((li, i) => `${i + 1}. ${inlineMd(li)}`.trim())
          .join('\n');
      case 'p':
      case 'div':
        return text();
      default:
        return text();
    }
  };

  for (const child of Array.from(root.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      const t = child.textContent?.trim();
      if (t) blocks.push(t);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const md = blockMd(child as HTMLElement);
      if (md) blocks.push(md);
    }
  }

  return blocks.join('\n\n');
}

export function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export type ToolbarAction =
  | 'bold' | 'italic' | 'strike' | 'h1' | 'h2' | 'h3'
  | 'ul' | 'ol' | 'quote' | 'code' | 'link';

export const MARKDOWN_TOOLBAR: { action: ToolbarAction; label: string; title: string }[] = [
  { action: 'bold', label: 'B', title: 'Fett' },
  { action: 'italic', label: 'I', title: 'Kursiv' },
  { action: 'strike', label: 'S', title: 'Durchgestrichen' },
  { action: 'h1', label: 'H1', title: 'Überschrift 1' },
  { action: 'h2', label: 'H2', title: 'Überschrift 2' },
  { action: 'h3', label: 'H3', title: 'Überschrift 3' },
  { action: 'ul', label: '•', title: 'Aufzählung' },
  { action: 'ol', label: '1.', title: 'Nummerierte Liste' },
  { action: 'quote', label: '❝', title: 'Zitat' },
  { action: 'code', label: '</>', title: 'Code' },
  { action: 'link', label: '🔗', title: 'Link' },
];

/** Toolbar-Aktion auf contenteditable anwenden. */
export function applyRichAction(action: ToolbarAction, editor: HTMLElement): void {
  editor.focus();
  switch (action) {
    case 'bold':
      document.execCommand('bold');
      break;
    case 'italic':
      document.execCommand('italic');
      break;
    case 'strike':
      document.execCommand('strikeThrough');
      break;
    case 'h1':
      document.execCommand('formatBlock', false, 'h1');
      break;
    case 'h2':
      document.execCommand('formatBlock', false, 'h2');
      break;
    case 'h3':
      document.execCommand('formatBlock', false, 'h3');
      break;
    case 'ul':
      document.execCommand('insertUnorderedList');
      break;
    case 'ol':
      document.execCommand('insertOrderedList');
      break;
    case 'quote':
      document.execCommand('formatBlock', false, 'blockquote');
      break;
    case 'code': {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
        const range = sel.getRangeAt(0);
        const code = document.createElement('code');
        code.appendChild(range.extractContents());
        range.insertNode(code);
      } else {
        document.execCommand('insertHTML', false, '<code></code>');
      }
      break;
    }
    case 'link': {
      const url = window.prompt('URL eingeben:');
      if (url) document.execCommand('createLink', false, url);
      break;
    }
  }
}

/** Markdown-Syntax um die Textarea-Auswahl legen (Quelltext-Modus). */
export function applySourceAction(
  action: ToolbarAction,
  textarea: HTMLTextAreaElement,
): void {
  const { selectionStart: start, selectionEnd: end, value } = textarea;
  const selected = value.slice(start, end);
  const wrappers: Record<string, [string, string]> = {
    bold: ['**', '**'],
    italic: ['*', '*'],
    strike: ['~~', '~~'],
    code: ['`', '`'],
    h1: ['# ', ''],
    h2: ['## ', ''],
    h3: ['### ', ''],
    ul: ['- ', ''],
    ol: ['1. ', ''],
    quote: ['> ', ''],
    link: ['[', '](url)'],
  };
  const [before, after] = wrappers[action] ?? ['', ''];
  const insert = before + (selected || 'Text') + after;
  textarea.value = value.slice(0, start) + insert + value.slice(end);
  textarea.focus();
  const cursor = start + insert.length;
  textarea.setSelectionRange(cursor, cursor);
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
}
