export function buildEmailAddress(user: string, domain: string): string {
  const local = user.split('').reverse().join('');
  const host = domain.split('').reverse().join('');
  return `${local}@${host}`;
}

function mailtoUrl(email: string, subject?: string): string {
  return `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
}

export function initEmailElements(): void {
  document.querySelectorAll<HTMLElement>('.js-email').forEach((el) => {
    const user = el.dataset.u;
    const domain = el.dataset.d;
    if (!user || !domain) return;
    const email = buildEmailAddress(user, domain);
    el.textContent = email;
    el.setAttribute('aria-label', `E-Mail: ${email}`);
  });

  document.querySelectorAll<HTMLElement>('.js-email-link').forEach((el) => {
    const user = el.dataset.u;
    const domain = el.dataset.d;
    if (!user || !domain) return;
    const email = buildEmailAddress(user, domain);
    const url = mailtoUrl(email, el.dataset.subject);

    if (el instanceof HTMLAnchorElement) {
      el.href = url;
      return;
    }

    el.addEventListener('click', () => {
      window.location.href = url;
    });
  });
}
