import { FIGURES } from './figures.mjs';

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Content strings may carry a tiny bit of inline markup (<strong>, <em>) written by us.
const rich = (s) => String(s);

const pick = (v, lang) => (v && typeof v === 'object' && !Array.isArray(v) && ('pt' in v || 'en' in v) ? v[lang] ?? v.pt : v);

const LAYER_NAME = {
  ai: { pt: 'IA & LLM', en: 'AI & LLM' },
  cv: { pt: 'Visão computacional', en: 'Computer vision' },
  platform: { pt: 'Plataforma & backend', en: 'Platform & backend' },
  eng: { pt: 'Engenharia, CAD & geo', en: 'Engineering, CAD & geo' },
  auto: { pt: 'Automação', en: 'Automation' },
};

const brandMark = `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="1" y="1" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 9 L11.5 23 L17 9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="miter"/><path d="M17 23 V9 L21.5 17 L26 9 V23" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="miter"/></svg>`;

const ucs = `<svg class="ucs" viewBox="0 0 42 42" aria-hidden="true"><path d="M6 36 H34 M6 36 V8" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M30 33 L35 36 L30 39 M3 12 L6 7 L9 12" fill="none" stroke="currentColor" stroke-width="1.4"/><rect x="6" y="31" width="5" height="5" fill="none" stroke="currentColor" stroke-width="1.2"/><text x="36" y="31" font-size="8" fill="currentColor" font-family="Overpass Mono, monospace">X</text><text x="10" y="8" font-size="8" fill="currentColor" font-family="Overpass Mono, monospace">Y</text></svg>`;

function header(c, lang, ui) {
  const navItems = ui.nav.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join('');
  return `
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="${lang === 'en' ? '/en/' : '/'}" aria-label="${esc(c.site.name)}">${brandMark}<span>${esc(c.site.name)}</span></a>
    <nav class="nav" id="nav" aria-label="${esc(ui.navLabel)}">${navItems}</nav>
    <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="nav">${esc(ui.menu)}</button>
    <div class="lang" aria-label="${esc(ui.langLabel)}">
      ${lang === 'pt' ? '<span aria-current="true"><b>PT</b></span><a href="/en/" hreflang="en" lang="en">EN</a>' : '<a href="/" hreflang="pt-BR" lang="pt-BR">PT</a><span aria-current="true"><b>EN</b></span>'}
    </div>
  </div>
</header>`;
}

function hero(c, lang, ui) {
  return `
<section class="hero" data-hero aria-labelledby="hero-title">
  <canvas data-terrain="base" aria-hidden="true"></canvas>
  <canvas data-terrain="overlay" aria-hidden="true"></canvas>
  <div class="wrap hero-body">
    <p class="hero-name">${esc(c.site.name)} <span class="crea">${esc(pick(ui.heroTag, lang))}</span></p>
    <h1 id="hero-title">${esc(ui.heroTitle)}</h1>
    <p class="hero-lede">${rich(ui.heroLede)}</p>
    <div class="hero-actions">
      <a class="btn btn-solid" href="#${ui.ids.projects}">${esc(ui.ctaProjects)}</a>
      <a class="btn btn-line" href="#${ui.ids.contact}">${esc(ui.ctaContact)}</a>
    </div>
  </div>
  <div class="statusbar">
    <div class="wrap">
      ${ucs}
      <form class="cmd-wrap" data-cmd data-no-cross autocomplete="off">
        <div class="cmd-log" data-cmd-log aria-live="polite"><div>${esc(ui.cmdBoot1)}</div><div>${esc(ui.cmdBoot2)}</div></div>
        <div class="cmd"><label for="cmd-input">${esc(ui.cmdPrompt)}</label><input id="cmd-input" name="cmd" spellcheck="false" placeholder="${esc(ui.cmdPlaceholder)}" aria-describedby="cmd-hint"><span id="cmd-hint" class="sr-only">${esc(ui.cmdHint)}</span></div>
      </form>
      <p class="coords" aria-hidden="true">E <b data-readout="e">368.420,00</b> &nbsp;N <b data-readout="n">7.877.860,00</b> &nbsp;Z <b data-readout="z">1.112,00</b><br>SIRGAS 2000 / UTM 23S</p>
    </div>
  </div>
</section>`;
}

function about(c, lang, ui) {
  const rows = c.quantities.map((q, i) => `
      <tr>
        <td class="item">${String(i + 1).padStart(2, '0')}</td>
        <td>${esc(pick(q.desc, lang))}</td>
        <td class="unit">${esc(pick(q.unit, lang))}</td>
        <td class="qty">${esc(pick(q.qty, lang))}</td>
        <td class="src">${esc(pick(q.src, lang))}</td>
      </tr>`).join('');
  return `
<section class="section" id="${ui.ids.about}" aria-labelledby="about-title">
  <div class="wrap">
    <div class="section-head"><h2 class="dwg-title" id="about-title">${esc(ui.aboutTitle)}</h2></div>
    <div class="about">
      <figure class="viewport">
        <img src="/assets/vinicius.jpg" width="460" height="460" alt="${esc(ui.photoAlt)}" loading="lazy" decoding="async">
        <figcaption><span>${esc(ui.photoCap1)}</span><span>${esc(ui.photoCap2)}</span></figcaption>
      </figure>
      <div class="about-text">
        ${ui.aboutParas.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${rich(p)}</p>`).join('\n        ')}
      </div>
    </div>
    <div class="boq">
      <h3>${esc(ui.boqTitle)}</h3>
      <p class="boq-note">${esc(ui.boqNote)}</p>
      <table>
        <thead><tr><th scope="col">${esc(ui.boqCols[0])}</th><th scope="col">${esc(ui.boqCols[1])}</th><th scope="col">${esc(ui.boqCols[2])}</th><th scope="col" class="qty">${esc(ui.boqCols[3])}</th><th scope="col" class="src">${esc(ui.boqCols[4])}</th></tr></thead>
        <tbody>${rows}
        </tbody>
      </table>
    </div>
  </div>
</section>`;
}

const stackList = (items) => `<ul class="stack" aria-label="Stack">${items.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`;
const linkList = (links, lang) => (links && links.length
  ? `<p class="links">${links.map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(pick(l.label, lang))}</a>`).join('')}</p>` : '');

function featured(c, lang, ui) {
  const sheets = c.featured.map((p, i) => {
    const fig = FIGURES[p.fig] ? FIGURES[p.fig](lang) : '';
    const facts = pick(p.facts, lang).map((f) => `<li>${rich(f)}</li>`).join('');
    return `
    <article class="sheet" data-layer="${p.layer}" id="p-${p.id}">
      <figure class="sheet-fig" data-layer="${p.layer}">
        ${fig}
        <figcaption><span>${esc(ui.figLabel)} ${String(i + 1).padStart(2, '0')}</span><span>${esc(pick(p.figCaption, lang))}</span></figcaption>
      </figure>
      <div class="sheet-text">
        <p class="sheet-meta"><span class="disc">${esc(LAYER_NAME[p.layer][lang])}</span><span>${esc(pick(p.where, lang))}</span><span class="status${p.live ? ' is-live' : ''}">${esc(pick(p.status, lang))}</span></p>
        <h3>${esc(pick(p.title, lang))}</h3>
        <p class="summary">${rich(pick(p.summary, lang))}</p>
        <ul class="facts">${facts}</ul>
        ${stackList(p.stack)}
        ${linkList(p.links, lang)}
        ${p.note ? `<p class="note">${esc(pick(p.note, lang))}</p>` : ''}
      </div>
    </article>`;
  }).join('');

  const used = [...new Set(c.index.flatMap((p) => p.layers))];
  const order = ['ai', 'cv', 'platform', 'eng', 'auto'].filter((l) => used.includes(l));
  const filters = [`<button type="button" data-value="all" aria-pressed="true">${esc(ui.filterAll)}</button>`]
    .concat(order.map((l) => `<button type="button" data-value="${l}" data-layer="${l}" aria-pressed="false">${esc(LAYER_NAME[l][lang])}</button>`)).join('');
  const rows = c.index.map((p, i) => `
      <li data-discipline="${p.layers.join(' ')}" data-layer="${p.layers[0]}">
        <details>
          <summary>
            <span class="dwg-no">${esc(ui.dwgPrefix)}-${String(i + 1).padStart(2, '0')}</span>
            <span class="dwg-name">${esc(pick(p.title, lang))}<small>${esc(pick(p.sub, lang))}</small></span>
            <span class="dwg-disc disc">${esc(LAYER_NAME[p.layers[0]][lang])}</span>
            <span class="dwg-year">${esc(p.year)}</span>
            <span class="dwg-plus" aria-hidden="true"></span>
          </summary>
          <div class="dwg-body">
            <p>${rich(pick(p.body, lang))}</p>
            ${p.facts ? `<ul class="facts">${pick(p.facts, lang).map((f) => `<li>${rich(f)}</li>`).join('')}</ul>` : ''}
            ${stackList(p.stack)}
            ${linkList(p.links, lang)}
          </div>
        </details>
      </li>`).join('');

  return `
<section class="section" id="${ui.ids.projects}" aria-labelledby="projects-title">
  <div class="wrap">
    <div class="section-head"><h2 class="dwg-title" id="projects-title">${esc(ui.projectsTitle)}</h2><p>${esc(ui.projectsLede)}</p></div>
    <div class="sheets">${sheets}
    </div>
    <div class="index">
      <div class="index-head">
        <h3>${esc(ui.indexTitle)}</h3>
        <div class="filters" data-filter role="group" aria-label="${esc(ui.filterLabel)}">${filters}</div>
      </div>
      <ol class="dwg-list">${rows}
      </ol>
      <p class="index-foot"><span data-filter-count>${c.index.length}</span> ${esc(ui.indexFoot)}</p>
    </div>
  </div>
</section>`;
}

function career(c, lang, ui) {
  // Longitudinal profile: x = time (2018 → 2026.9), y = "elevation" (career level)
  const x0 = 70, x1 = 1010, y0 = 300, yTop = 50;
  const tx = (year) => x0 + ((year - 2018) / (2027 - 2018)) * (x1 - x0);
  const pts = c.profile.map((p) => ({ ...p, x: tx(p.t), y: y0 - p.level * (y0 - yTop) }));
  let grade = `M ${pts[0].x} ${pts[0].y}`;
  for (let k = 1; k < pts.length; k++) {
    const a = pts[k - 1], b = pts[k];
    const mx = (a.x + b.x) / 2;
    grade += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
  }
  const years = [];
  for (let y = 2018; y <= 2027; y++) {
    const x = tx(y);
    years.push(`<line class="ln-thin" x1="${x}" y1="${y0}" x2="${x}" y2="${y0 + 8}"/><text x="${x}" y="${y0 + 24}" text-anchor="middle" class="m t-xs dim">${y}</text>`);
    if (y < 2027) years.push(`<line class="ln-thin" x1="${x}" y1="${yTop - 10}" x2="${x}" y2="${y0}" style="opacity:.18"/>`);
  }
  const marks = pts.map((p, i) => {
    const up = i % 2 === 0;
    const ly = up ? p.y - 34 : p.y + 40;
    const anchor = p.x > 900 ? 'end' : p.x < 140 ? 'start' : 'middle';
    return `
      <line class="ln-thin" x1="${p.x}" y1="${p.y}" x2="${p.x}" y2="${y0}" style="opacity:.5" stroke-dasharray="2 3"/>
      <circle cx="${p.x}" cy="${p.y}" r="5" class="box" style="stroke:var(--l-ai);stroke-width:2"/>
      <line class="ln-thin" x1="${p.x}" y1="${p.y + (up ? -7 : 7)}" x2="${p.x}" y2="${ly + (up ? 6 : -14)}"/>
      <text x="${p.x}" y="${ly}" text-anchor="${anchor}" class="t-sm" font-weight="700">${esc(pick(p.label, lang))}</text>
      <text x="${p.x}" y="${ly + 15}" text-anchor="${anchor}" class="m t-xs dim">${esc(pick(p.sub, lang))}</text>`;
  }).join('');
  // natural ground line (where the work started: field engineering)
  const ground = `M ${x0} ${y0 - 34} C 260 ${y0 - 20}, 420 ${y0 - 48}, 600 ${y0 - 30} S 900 ${y0 - 40}, ${x1} ${y0 - 26}`;
  const roles = c.roles.map((r) => `
      <article class="role">
        <p class="role-when"><b>${esc(pick(r.when, lang))}</b>${esc(pick(r.where, lang))}</p>
        <div>
          <h3>${esc(pick(r.title, lang))}</h3>
          <p class="role-org">${esc(pick(r.org, lang))}</p>
          <ul class="facts" data-layer="${r.layer}">${pick(r.facts, lang).map((f) => `<li>${rich(f)}</li>`).join('')}</ul>
          ${r.stack ? `<div class="role-tags">${stackList(r.stack)}</div>` : ''}
        </div>
      </article>`).join('');
  return `
<section class="section" id="${ui.ids.career}" aria-labelledby="career-title">
  <div class="wrap">
    <div class="section-head"><h2 class="dwg-title" id="career-title">${esc(ui.careerTitle)}</h2><p>${esc(ui.careerLede)}</p></div>
    <figure class="profile">
      <svg class="fig" viewBox="0 0 1040 340" role="img" aria-labelledby="t-profile">
        <title id="t-profile">${esc(ui.profileAlt)}</title>
        <line class="ln" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}"/>
        <line class="ln" x1="${x0}" y1="${yTop - 10}" x2="${x0}" y2="${y0}"/>
        <text x="${x0 - 10}" y="${yTop}" text-anchor="end" class="m t-xs dim">${esc(ui.profileAxisY)}</text>
        ${years.join('')}
        <path d="${ground}" class="ln-dash" style="opacity:.55"/>
        <text x="${x1}" y="${y0 - 34}" text-anchor="end" class="m t-xs dim">${esc(ui.profileGround)}</text>
        <path d="${grade}" fill="none" stroke="var(--l-ai)" stroke-width="2.4"/>
        ${marks}
      </svg>
      <figcaption>${esc(ui.profileCaption)}</figcaption>
    </figure>
    <div class="roles">${roles}
    </div>
  </div>
</section>`;
}

function stack(c, lang, ui) {
  const rows = c.layers.map((g) => `
        <tr data-layer="${g.layer}">
          <td class="lname"><span>${esc(pick(g.name, lang))}</span></td>
          <td><ul class="chips">${g.items.map(([name, st]) => `<li class="${st}"><i class="dot ${st}" aria-hidden="true"></i>${esc(pick(name, lang))}<span class="sr-only"> (${esc(ui.stateNames[st])})</span></li>`).join('')}</ul></td>
        </tr>`).join('');
  return `
<section class="section" id="${ui.ids.stack}" aria-labelledby="stack-title">
  <div class="wrap">
    <div class="section-head"><h2 class="dwg-title" id="stack-title">${esc(ui.stackTitle)}</h2><p>${esc(ui.stackLede)}</p></div>
    <div class="layers">
      <div class="layers-bar"><strong>${esc(ui.layersBar)}</strong>
        <span class="state"><i class="dot prod" aria-hidden="true"></i>${esc(ui.stateNames.prod)}</span>
        <span class="state"><i class="dot proj" aria-hidden="true"></i>${esc(ui.stateNames.proj)}</span>
        <span class="state"><i class="dot study" aria-hidden="true"></i>${esc(ui.stateNames.study)}</span>
      </div>
      <table>
        <thead><tr><th scope="col">${esc(ui.layersCols[0])}</th><th scope="col">${esc(ui.layersCols[1])}</th></tr></thead>
        <tbody>${rows}
        </tbody>
      </table>
    </div>
  </div>
</section>`;
}

function education(c, lang, ui) {
  const col = (title, items) => `
      <div>
        <h3>${esc(title)}</h3>
        <ul>${items.map((it) => `<li><b>${esc(pick(it.name, lang))}</b><span>${esc(pick(it.org, lang))}</span>${it.when ? `<em>${esc(pick(it.when, lang))}</em>` : ''}</li>`).join('')}</ul>
      </div>`;
  return `
<section class="section" id="${ui.ids.education}" aria-labelledby="edu-title">
  <div class="wrap">
    <div class="section-head"><h2 class="dwg-title" id="edu-title">${esc(ui.eduTitle)}</h2></div>
    <div class="edu">
      ${col(ui.eduCols[0], c.education.degrees)}
      ${col(ui.eduCols[1], c.education.courses)}
      ${col(ui.eduCols[2], c.education.other)}
    </div>
  </div>
</section>`;
}

function contact(c, lang, ui) {
  const tb = ui.titleblock;
  return `
<section class="contact" id="${ui.ids.contact}" aria-labelledby="contact-title">
  <div class="contact-grid" aria-hidden="true"></div>
  <div class="wrap">
    <h2 id="contact-title">${esc(ui.contactTitle)}</h2>
    <p class="lede">${esc(ui.contactLede)}</p>
    <div class="contact-links">
      <a href="mailto:${esc(c.site.email)}"><span>${esc(ui.contactEmail)}</span><b>${esc(c.site.email)}</b></a>
      <a href="${esc(c.site.linkedin)}" target="_blank" rel="noopener"><span>LinkedIn</span><b>in/vinicius-magno</b></a>
      <a href="${esc(c.site.github)}" target="_blank" rel="noopener"><span>GitHub</span><b>viniciusmagnos</b></a>
    </div>
    <div class="titleblock" role="group" aria-label="${esc(tb.label)}">
      <div><span>${esc(tb.project[0])}</span><b>${esc(tb.project[1])}</b></div>
      <div><span>${esc(tb.author[0])}</span><b>${esc(c.site.name)}</b></div>
      <div><span>${esc(tb.scale[0])}</span><b>${esc(tb.scale[1])}</b></div>
      <div><span>${esc(tb.date[0])}</span><b>${esc(tb.date[1])}</b></div>
      <div><span>${esc(tb.rev[0])}</span><b>${esc(tb.rev[1])}</b></div>
    </div>
    <p class="footer-line"><span>© ${new Date().getFullYear()} ${esc(c.site.name)}</span><span>${esc(ui.footerNote)} <a href="${esc(c.site.source)}" target="_blank" rel="noopener">${esc(ui.sourceLink)}</a></span></p>
  </div>
</section>`;
}

export function renderPage(c, lang) {
  const ui = c.ui[lang];
  const canonical = c.site.url + (lang === 'en' ? '/en/' : '/');
  const person = {
    '@context': 'https://schema.org', '@type': 'Person', name: c.site.name, jobTitle: ui.jobTitle,
    url: canonical, image: c.site.url + '/assets/vinicius.jpg', email: 'mailto:' + c.site.email,
    sameAs: [c.site.linkedin, c.site.github],
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidade Federal de Viçosa' },
    worksFor: { '@type': 'Organization', name: 'Manta Associados' },
    knowsAbout: ['AI engineering', 'LLM agents', 'RAG', 'Model Context Protocol', 'Computer vision', 'FastAPI', 'React', 'Civil engineering', 'CAD/BIM'],
  };
  return `<!doctype html>
<html lang="${lang === 'en' ? 'en' : 'pt-BR'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(ui.metaTitle)}</title>
<meta name="description" content="${esc(ui.metaDescription)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="pt-BR" href="${c.site.url}/">
<link rel="alternate" hreflang="en" href="${c.site.url}/en/">
<link rel="alternate" hreflang="x-default" href="${c.site.url}/">
<meta property="og:type" content="profile">
<meta property="og:title" content="${esc(ui.metaTitle)}">
<meta property="og:description" content="${esc(ui.metaDescription)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${c.site.url}/assets/${lang === 'en' ? 'og-en.png' : 'og.png'}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'pt_BR'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#212830">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,300..900;1,400&family=Overpass+Mono:wght@400..600&display=swap">
<link rel="stylesheet" href="/assets/styles.css">
<script type="application/ld+json">${JSON.stringify(person)}</script>
</head>
<body>
<a class="skip" href="#main">${esc(ui.skip)}</a>
${header(c, lang, ui)}
<main id="main">
${hero(c, lang, ui)}
${about(c, lang, ui)}
${featured(c, lang, ui)}
${career(c, lang, ui)}
${stack(c, lang, ui)}
${education(c, lang, ui)}
</main>
<footer>
${contact(c, lang, ui)}
</footer>
<script type="module" src="/assets/main.js"></script>
</body>
</html>
`;
}
