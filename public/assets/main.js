import { initTerrain } from './terrain.js';

const hero = document.querySelector('[data-hero]');
if (hero) initTerrain(hero);

// ---------------------------------------------------------------- command line
const LANG = document.documentElement.lang.startsWith('en') ? 'en' : 'pt';
const COMMANDS = {
  pt: {
    SOBRE: '#sobre', PROJETOS: '#projetos', TRAJETORIA: '#trajetoria', 'TRAJETÓRIA': '#trajetoria',
    STACK: '#stack', CAMADAS: '#stack', FORMACAO: '#formacao', 'FORMAÇÃO': '#formacao', CONTATO: '#contato',
    EN: '/en/', ENGLISH: '/en/',
  },
  en: {
    ABOUT: '#about', PROJECTS: '#projects', CAREER: '#career', STACK: '#stack', LAYERS: '#stack',
    EDUCATION: '#education', CONTACT: '#contact', PT: '/', PORTUGUES: '/', 'PORTUGUÊS': '/',
  },
};
const MSG = {
  pt: {
    help: 'Comandos: SOBRE, PROJETOS, TRAJETORIA, STACK, FORMACAO, CONTATO, EN',
    unknown: (c) => `Comando desconhecido "${c}". Digite AJUDA para ver a lista.`,
    go: (c) => `${c}: indo para a seção.`,
    helpWords: ['AJUDA', 'HELP', '?'],
  },
  en: {
    help: 'Commands: ABOUT, PROJECTS, CAREER, STACK, EDUCATION, CONTACT, PT',
    unknown: (c) => `Unknown command "${c}". Type HELP to see the list.`,
    go: (c) => `${c}: jumping to section.`,
    helpWords: ['HELP', 'AJUDA', '?'],
  },
};

const form = document.querySelector('[data-cmd]');
if (form) {
  const input = form.querySelector('input');
  const log = document.querySelector('[data-cmd-log]');
  const say = (text) => {
    if (!log) return;
    const line = document.createElement('div');
    line.textContent = text;
    log.append(line);
    while (log.children.length > 2) log.firstElementChild.remove();
  };
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const raw = input.value.trim();
    if (!raw) return;
    const cmd = raw.replace(/^[_.\-]+/, '').toUpperCase();
    input.value = '';
    if (MSG[LANG].helpWords.includes(cmd)) { say(MSG[LANG].help); return; }
    const target = COMMANDS[LANG][cmd];
    if (!target) { say(MSG[LANG].unknown(raw)); return; }
    if (target.startsWith('/')) { window.location.href = target; return; }
    say(MSG[LANG].go(cmd));
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }
  });
}

// ---------------------------------------------------------------- drawing index filters
const filterBar = document.querySelector('[data-filter]');
if (filterBar) {
  const rows = [...document.querySelectorAll('[data-discipline]')];
  const count = document.querySelector('[data-filter-count]');
  filterBar.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button[data-value]');
    if (!btn) return;
    const value = btn.dataset.value;
    filterBar.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    let shown = 0;
    rows.forEach((row) => {
      const match = value === 'all' || row.dataset.discipline.split(' ').includes(value);
      row.hidden = !match;
      if (match) shown++;
    });
    if (count) count.textContent = String(shown);
  });
}

// ---------------------------------------------------------------- active nav link
const links = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && sections.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = '#' + e.target.id;
      links.forEach((a) => a.toggleAttribute('aria-current', a.getAttribute('href') === id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => io.observe(s));
}

// header turns to paper style once the model-space hero scrolls away
const header = document.querySelector('.site-header');
if (header && hero && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => header.classList.toggle('on-paper', !e.isIntersecting), {
    rootMargin: '-64px 0px 0px 0px',
  }).observe(hero);
}

// career profile: on narrow screens it scrolls sideways; start at the most recent years
const profileFig = document.querySelector('.profile');
if (profileFig && profileFig.scrollWidth > profileFig.clientWidth) profileFig.scrollLeft = profileFig.scrollWidth;

// mobile nav
const toggle = document.querySelector('[data-nav-toggle]');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  });
  document.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }));
}
