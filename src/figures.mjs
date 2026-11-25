// Technical-drawing figures for the featured projects.
// Ink = currentColor, discipline color = var(--layer). viewBox 560 x 340.

const L = (lang, pt, en) => (lang === 'en' ? en : pt);

const defs = (id) => `
  <defs>
    <marker id="a-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,1 L9,5 L0,9" fill="none" stroke="currentColor" stroke-width="1.5"/>
    </marker>
    <pattern id="h-${id}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" stroke-width="0.8" opacity=".45"/>
    </pattern>
  </defs>`;

const svg = (id, title, body) =>
  `<svg class="fig" viewBox="0 0 560 340" role="img" aria-labelledby="t-${id}"><title id="t-${id}">${title}</title>${defs(id)}${body}</svg>`;

// CAD-style horizontal dimension line
const dimH = (x1, x2, y, label, ext = 0) => `
  ${ext ? `<line class="ln-thin" x1="${x1}" y1="${y - ext}" x2="${x1}" y2="${y + 4}"/><line class="ln-thin" x1="${x2}" y1="${y - ext}" x2="${x2}" y2="${y + 4}"/>` : ''}
  <line class="ln-thin" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" style="opacity:.8"/>
  <line class="ln" x1="${x1 - 3}" y1="${y + 3}" x2="${x1 + 3}" y2="${y - 3}"/>
  <line class="ln" x1="${x2 - 3}" y1="${y + 3}" x2="${x2 + 3}" y2="${y - 3}"/>
  <text x="${(x1 + x2) / 2}" y="${y - 5}" text-anchor="middle" class="m t-xs dim">${label}</text>`;

// ------------------------------------------------------------------ Manta Hub
export function hub(lang) {
  const names = L(lang,
    ['Balanço', 'Paisagismo', 'Sinalização', 'Orçamento', 'MantaCAD', 'Estrutural',
     'Iluminação', 'Pavimento', 'AskCAD', 'Terraplen.', 'LandXML', 'IFC',
     'Sondagem', 'OAE', 'Conversor', 'Auth', 'MCP'],
    ['Mass haul', 'Landscape', 'Signage', 'Budget', 'MantaCAD', 'Structural',
     'Lighting', 'Paving', 'AskCAD', 'Earthworks', 'LandXML', 'IFC',
     'Boreholes', 'Bridges', 'Converter', 'Auth', 'MCP']);
  const ai = new Set([3, 8, 16]);
  let boxes = '';
  names.forEach((n, i) => {
    const c = i % 6, r = Math.floor(i / 6);
    const x = 40 + c * 81.2, y = 140 + r * 40;
    boxes += `<rect class="${ai.has(i) ? 'tint' : 'box'}" x="${x}" y="${y}" width="74" height="30"/>
      <text x="${x + 37}" y="${y + 19}" text-anchor="middle" class="t-xs" style="font-size:10.5px">${n}</text>`;
    if (r === 0) boxes += `<line class="ln" x1="${x + 37}" y1="130" x2="${x + 37}" y2="${y}"/>`;
  });
  return svg('hub', L(lang, 'Arquitetura do Manta Hub: SPA React, nginx, 17 serviços FastAPI e biblioteca compartilhada', 'Manta Hub architecture: React SPA, nginx, 17 FastAPI services and a shared library'), `
    <rect class="box" x="40" y="20" width="480" height="40"/>
    <text x="56" y="45" class="t-md">SPA React 19, TypeScript, Vite</text>
    <text x="504" y="45" text-anchor="end" class="m t-xs dim">Vercel</text>
    <line class="ln" x1="280" y1="60" x2="280" y2="84" marker-end="url(#a-hub)"/>
    <rect class="box" x="40" y="86" width="480" height="28"/>
    <text x="56" y="105" class="t-sm">${L(lang, 'nginx, proxy reverso, TLS', 'nginx, reverse proxy, TLS')}</text>
    <text x="504" y="105" text-anchor="end" class="m t-xs dim">VPS Linux · systemd</text>
    <line class="ln" x1="280" y1="114" x2="280" y2="130"/>
    <line class="ln" x1="77" y1="130" x2="483" y2="130"/>
    ${boxes}
    <text x="${40 + 5 * 81.2 + 37}" y="${240 + 19}" text-anchor="middle" class="m t-xs dim">${L(lang, '+ IA', '+ AI')}</text>
    <rect class="fill-layer" x="${40 + 5 * 81.2 + 6}" y="${240 + 12}" width="8" height="8"/>
    <line class="ln" x1="280" y1="270" x2="280" y2="278"/>
    <rect class="box" x="40" y="278" width="480" height="26" style="fill:url(#h-hub)"/>
    <rect x="52" y="283" width="250" height="16" class="paperfill"/>
    <text x="58" y="295" class="t-sm"><tspan font-weight="700">manta_shared</tspan> ${L(lang, '(JWT, CAD, custo de LLM)', '(JWT, CAD, LLM pricing)')}</text>
    ${dimH(40, 520, 326, L(lang, '17 serviços FastAPI independentes', '17 independent FastAPI services'), 18)}
  `);
}

// ------------------------------------------------------------------ AskCAD agent
export function agent(lang) {
  const tools = L(lang,
    ['camadas DXF', 'medições', 'textos e blocos', 'busca RAG', 'volumes', 'planilha XLSX'],
    ['DXF layers', 'measurements', 'text & blocks', 'RAG search', 'volumes', 'XLSX export']);
  let tl = '';
  tools.forEach((t, i) => {
    const y = 24 + i * 30;
    tl += `<rect class="box" x="404" y="${y}" width="132" height="24"/><text x="416" y="${y + 16}" class="m t-xs">${t}</text>`;
  });
  return svg('agent', L(lang, 'Loop agêntico do AskCAD com ferramentas, LoopGuard e resposta em streaming', 'AskCAD agent loop with tools, LoopGuard and streamed answer'), `
    <rect class="box" x="20" y="44" width="170" height="78"/>
    <text x="32" y="64" class="m t-xs dim">${L(lang, 'pergunta', 'question')}</text>
    <text x="32" y="84" class="t-sm">${L(lang, '“Qual o volume de aterro', '“What is the fill volume')}</text>
    <text x="32" y="100" class="t-sm">${L(lang, 'entre as estacas 10 e 40?”', 'between stations 10 and 40?”')}</text>
    <line class="ln" x1="190" y1="90" x2="228" y2="104" marker-end="url(#a-agent)"/>
    <circle cx="282" cy="112" r="50" class="tint"/>
    <text x="282" y="108" text-anchor="middle" class="t-md">Claude</text>
    <text x="282" y="126" text-anchor="middle" class="m t-xs">${L(lang, 'tool use', 'tool use')}</text>
    <path class="ln" d="M326 88 C 360 60, 380 52, 400 50" marker-end="url(#a-agent)"/>
    <text x="352" y="58" text-anchor="middle" class="m t-xs dim">tool_call</text>
    <path class="ln" d="M400 170 C 380 168, 360 158, 326 138" marker-end="url(#a-agent)"/>
    <text x="356" y="178" text-anchor="middle" class="m t-xs dim">tool_result</text>
    ${tl}
    <text x="470" y="216" text-anchor="middle" class="m t-xs dim">${L(lang, '+ 9 ferramentas', '+ 9 more tools')}</text>
    <line class="ln-dash" x1="282" y1="162" x2="282" y2="196" marker-end="url(#a-agent)"/>
    <rect class="box" x="168" y="198" width="230" height="72"/>
    <rect class="fill-layer" x="168" y="198" width="230" height="20"/>
    <text x="180" y="212" class="t-xs" style="fill:#fff;font-weight:700">LoopGuard</text>
    <text x="180" y="238" class="m t-xs">${L(lang, '■ turnos máx.', '■ max turns')}</text>
    <text x="282" y="238" class="m t-xs">${L(lang, '■ chamada repetida', '■ repeated call')}</text>
    <text x="180" y="258" class="m t-xs">${L(lang, '■ sem progresso', '■ no progress')}</text>
    <text x="282" y="258" class="m t-xs">${L(lang, '■ teto em US$', '■ USD budget')}</text>
    <line class="ln" x1="176" y1="246" x2="132" y2="282" marker-end="url(#a-agent)"/>
    <rect class="box" x="20" y="284" width="230" height="40"/>
    <text x="32" y="301" class="t-sm" font-weight="700">${L(lang, 'Resposta em streaming (SSE)', 'Streamed answer (SSE)')}</text>
    <text x="32" y="316" class="m t-xs dim">${L(lang, 'ações propostas → usuário confirma', 'proposed actions → user confirms')}</text>
    <text x="404" y="262" class="m t-xs dim">${L(lang, 'memória reflexiva', 'reflexive memory')}</text>
    <text x="404" y="278" class="m t-xs dim">${L(lang, 'personas · RAG local', 'personas · local RAG')}</text>
    <text x="404" y="294" class="m t-xs dim">${L(lang, 'prompt caching', 'prompt caching')}</text>
  `);
}

// ------------------------------------------------------------------ Road inspection
export function road(lang) {
  const heights = [18, 26, 14, 31, 22, 47, 19, 12, 28, 52, 24, 16, 33, 21, 58, 26, 15, 22, 30, 17];
  const top3 = [...heights].sort((a, b) => b - a).slice(0, 3);
  let bars = '';
  heights.forEach((h, i) => {
    const x = 22 + i * 26;
    const crit = top3.includes(h);
    bars += `<rect x="${x}" y="${316 - h}" width="20" height="${h}" class="${crit ? 'fill-layer' : 'box'}" ${crit ? '' : 'style="stroke-width:.9"'}/>`;
  });
  const tag = (x, y, label) => `<rect x="${x}" y="${y - 14}" width="${label.length * 6.4 + 10}" height="14" class="fill-layer"/>
    <text x="${x + 5}" y="${y - 3.5}" class="m t-xs" style="fill:#fff">${label}</text>`;
  return svg('road', L(lang, 'Quadro de câmera com defeitos detectados e trechos de 100 m ranqueados', 'Camera frame with detected defects and ranked 100 m segments'), `
    <rect x="20" y="14" width="520" height="222" class="box" style="fill:#fff"/>
    <path class="ln" d="M20 30 V14 H36 M524 14 H540 V30 M540 220 V236 H524 M36 236 H20 V220"/>
    <line class="ln-thin" x1="20" y1="84" x2="540" y2="84"/>
    <path class="ln-thin" d="M20 70 Q 120 52 220 76 T 420 64 T 540 72"/>
    <path class="ln-thin" d="M20 58 Q 140 36 250 62 T 540 54"/>
    <path class="ln" d="M70 236 L 286 86 M490 236 L 314 86"/>
    <path class="ln-thin" d="M120 236 L 290 88 M440 236 L 310 88"/>
    <line class="ln" x1="300" y1="236" x2="300" y2="90" stroke-dasharray="14 10"/>
    <ellipse cx="368" cy="206" rx="28" ry="9" style="fill:url(#h-road)" class="ln"/>
    <path class="ln" d="M226 152 l8 7 -5 6 9 6 -4 7 8 9" />
    <path class="ln" d="M308 114 l5 4 -3 4 6 3" />
    <rect x="334" y="188" width="70" height="30" class="ln-layer"/>
    ${tag(334, 188, L(lang, 'buraco 0,91', 'pothole 0.91'))}
    <rect x="214" y="146" width="40" height="48" class="ln-layer"/>
    ${tag(214, 146, L(lang, 'trinca 0,78', 'crack 0.78'))}
    <rect x="302" y="108" width="22" height="18" class="ln-layer"/>
    <circle cx="36" cy="222" r="3.5" class="fill-layer"/>
    <text x="46" y="226" class="m t-xs dim">${L(lang, 'vídeo + GPS · WebSocket → GPU', 'video + GPS · WebSocket → GPU')}</text>
    ${bars}
    <line class="ln" x1="16" y1="316" x2="544" y2="316"/>
    <text x="20" y="334" class="m t-xs dim">${L(lang, 'trechos de 100 m ranqueados por severidade', '100 m segments ranked by severity')}</text>
  `);
}

// ------------------------------------------------------------------ MantaBase
export function dbaas(lang) {
  const cyl = (x, y, label) => `
    <path class="box" d="M${x} ${y + 8} v36 a28 8 0 0 0 56 0 v-36"/>
    <ellipse cx="${x + 28}" cy="${y + 8}" rx="28" ry="8" class="box"/>
    <text x="${x + 28}" y="${y + 34}" text-anchor="middle" class="m t-xs">${label}</text>`;
  const client = (y, t) => `<rect class="box" x="20" y="${y}" width="150" height="36"/><text x="32" y="${y + 22}" class="t-sm">${t}</text>
    <line class="ln" x1="170" y1="${y + 18}" x2="216" y2="${y + 18}" marker-end="url(#a-dbaas)"/>`;
  return svg('dbaas', L(lang, 'MantaBase: clientes, control plane FastAPI e cluster PostgreSQL com um banco e um role por projeto', 'MantaBase: clients, FastAPI control plane and a PostgreSQL cluster with one database and role per project'), `
    <text x="20" y="26" class="m t-xs" style="fill:var(--layer)">OAuth 2.1 · PKCE S256 · DCR (RFC 7591)</text>
    ${client(46, L(lang, 'Painel React', 'React panel'))}
    ${client(100, L(lang, 'Assistente de IA (MCP)', 'AI assistant (MCP)'))}
    ${client(154, L(lang, 'Apps internos', 'Internal apps'))}
    <rect class="tint" x="218" y="40" width="136" height="160"/>
    <text x="230" y="64" class="t-md">Control plane</text>
    <text x="230" y="86" class="m t-xs">FastAPI · asyncpg</text>
    <text x="230" y="104" class="m t-xs">${L(lang, '36 endpoints', '36 endpoints')}</text>
    <text x="230" y="122" class="m t-xs">${L(lang, 'trilha de auditoria', 'audit trail')}</text>
    <text x="230" y="140" class="m t-xs">${L(lang, 'chaves com escopo', 'scoped API keys')}</text>
    <text x="230" y="158" class="m t-xs">${L(lang, 'migrações c/ lock', 'locked migrations')}</text>
    <line class="ln" x1="354" y1="120" x2="384" y2="120" marker-end="url(#a-dbaas)"/>
    <rect class="ln-dash" x="386" y="30" width="154" height="206"/>
    <text x="398" y="50" class="t-md">PostgreSQL 16</text>
    ${cyl(398, 66, 'db_a')}${cyl(472, 66, 'db_b')}
    ${cyl(398, 146, 'db_c')}${cyl(472, 146, 'db_d')}
    <path class="ln" d="M500 196 L 470 262 H 300" />
    <circle cx="500" cy="196" r="2.5" class="fill-layer"/>
    <text x="300" y="256" class="m t-xs">REVOKE CONNECT FROM PUBLIC</text>
    <text x="300" y="278" class="t-xs dim" style="font-size:11px">${L(lang, '1 banco + 1 role dono por projeto', '1 database + 1 owner role per project')}</text>
    <text x="20" y="246" class="t-sm" font-weight="700">${L(lang, '5 containers em produção', '5 containers in production')}</text>
    <text x="20" y="264" class="m t-xs dim">Docker Compose · Caddy · TLS</text>
    <text x="20" y="282" class="m t-xs dim">${L(lang, 'senhas cifradas (Fernet), exibidas 1×', 'Fernet-encrypted secrets, shown once')}</text>
    ${dimH(20, 540, 322, L(lang, 'do MVP à produção com OAuth em ~2 semanas', 'MVP to production with OAuth in ~2 weeks'), 0)}
  `);
}

// ------------------------------------------------------------------ MCP servers
export function mcp(lang) {
  const srv = (x, title, l2, l3, sys) => `
    <rect class="box" x="${x}" y="150" width="160" height="78"/>
    <rect class="fill-layer" x="${x}" y="150" width="4" height="78"/>
    <text x="${x + 14}" y="172" class="t-md">${title}</text>
    <text x="${x + 14}" y="192" class="m t-xs">${l2}</text>
    <text x="${x + 14}" y="210" class="m t-xs dim">${l3}</text>
    <line class="ln-dash" x1="${x + 80}" y1="228" x2="${x + 80}" y2="266" marker-end="url(#a-mcp)"/>
    <rect class="ln-thin" x="${x + 10}" y="268" width="140" height="30" style="opacity:1"/>
    <text x="${x + 80}" y="287" text-anchor="middle" class="t-xs" style="font-size:11px">${sys}</text>`;
  return svg('mcp', L(lang, 'Três servidores MCP em produção ligando um assistente de IA ao SharePoint, ao PostgreSQL e à plataforma de engenharia', 'Three production MCP servers connecting an AI assistant to SharePoint, PostgreSQL and the engineering platform'), `
    <rect class="tint" x="180" y="20" width="200" height="48"/>
    <text x="280" y="42" text-anchor="middle" class="t-md">${L(lang, 'Assistente de IA', 'AI assistant')}</text>
    <text x="280" y="58" text-anchor="middle" class="m t-xs">Claude · MCP client</text>
    <path class="ln" d="M230 68 L 100 146" marker-end="url(#a-mcp)"/>
    <path class="ln" d="M280 68 L 280 146" marker-end="url(#a-mcp)"/>
    <path class="ln" d="M330 68 L 460 146" marker-end="url(#a-mcp)"/>
    <text x="120" y="100" class="m t-xs dim" transform="rotate(-31 120 100)">${L(lang, 'Bearer do usuário', "user's Bearer")}</text>
    <text x="288" y="112" class="m t-xs dim">streamable HTTP</text>
    <text x="400" y="92" class="m t-xs dim" transform="rotate(31 400 92)">OAuth 2.1 + PKCE</text>
    ${srv(20, 'SharePoint', L(lang, '18 ferramentas', '18 tools'), 'Graph · Entra ID OBO', 'SharePoint Online')}
    ${srv(200, 'MantaBase', L(lang, '13 ferramentas', '13 tools'), 'asyncpg · RBAC', L(lang, 'bancos por projeto', 'per-project DBs'))}
    ${srv(380, 'Manta Hub', L(lang, 'agente + estudos', 'agent + studies'), 'FastMCP · JWT', L(lang, 'plataforma de eng.', 'eng. platform'))}
    <text x="20" y="318" class="m t-xs dim">${L(lang, 'toda escrita acontece com a identidade e as permissões de quem está logado', 'every write runs under the signed-in user’s identity and permissions')}</text>
    <text x="20" y="334" class="m t-xs" style="fill:var(--layer)">${L(lang, '+ Civil 3D (26 ferramentas) · + gestão Nature (30 ferramentas)', '+ Civil 3D (26 tools) · + Nature office system (30 tools)')}</text>
  `);
}

// ------------------------------------------------------------------ EXE-bot
export function exebot(lang) {
  const steps = L(lang,
    [['Jira', 'card'], ['fila', 'Flask+SQLite'], ['git', 'cherry-pick'], ['.dproj', 'versão'], ['MSBuild', 'compila'], ['rede', 'publica'], ['Teams', 'fecha card']],
    [['Jira', 'ticket'], ['queue', 'Flask+SQLite'], ['git', 'cherry-pick'], ['.dproj', 'version'], ['MSBuild', 'compile'], ['share', 'publish'], ['Teams', 'close ticket']]);
  let nodes = '';
  steps.forEach(([a, b], i) => {
    const x = 44 + i * 79;
    nodes += `<circle cx="${x}" cy="70" r="15" class="box"/>${i === 0 || i === 6 ? `<circle cx="${x}" cy="70" r="15" class="tint"/>` : ''}
      <text x="${x}" y="74.5" text-anchor="middle" class="m t-xs" font-weight="600">${i + 1}</text>
      <text x="${x}" y="110" text-anchor="middle" class="t-sm" font-weight="700">${a}</text>
      <text x="${x}" y="126" text-anchor="middle" class="m t-xs dim">${b}</text>`;
  });
  const big = (x, n, l1, l2) => `<text x="${x}" y="266" class="t-lg" style="font-size:34px">${n}</text>
    <text x="${x}" y="288" class="t-xs" style="font-size:11.5px">${l1}</text><text x="${x}" y="304" class="t-xs dim" style="font-size:11.5px">${l2}</text>`;
  return svg('exebot', L(lang, 'Esteira do EXE-bot: do card do Jira ao executável publicado, com escalonamento para humano', 'EXE-bot pipeline: from Jira ticket to published executable, with human escalation'), `
    <line class="ln-layer" x1="44" y1="70" x2="518" y2="70"/>
    ${nodes}
    <path class="ln-dash" d="M202 134 V 167 H 250" marker-end="url(#a-exebot)"/>
    <rect class="box" x="252" y="150" width="226" height="34"/>
    <text x="264" y="171" class="t-xs" style="font-size:11px">${L(lang, 'caso fora do escopo seguro → humano', 'outside the safe scope → human')}</text>
    <text x="44" y="30" class="m t-xs dim">${L(lang, 'worker 24/7 · idempotente · rollback transacional do repositório', '24/7 worker · idempotent · transactional repo rollback')}</text>
    <line class="ln-thin" x1="20" y1="214" x2="540" y2="214"/>
    ${big(20, '383', L(lang, 'requisitos processados', 'requests processed'), L(lang, 'em 7 semanas', 'in 7 weeks'))}
    ${big(200, '180', L(lang, 'executáveis entregues', 'executables delivered'), L(lang, 'automaticamente', 'automatically'))}
    ${big(380, '~74%', L(lang, 'de ponta a ponta', 'end to end'), L(lang, 'sem intervenção humana', 'with no human touch'))}
  `);
}

// ------------------------------------------------------------------ Aerial lot vectorization
export function aerial(lang) {
  // city blocks subdivided into lots, under a tile grid
  let lots = '', masks = '';
  const blocks = [
    { x: 30, y: 30, w: 120, h: 92, n: 5 }, { x: 166, y: 30, w: 140, h: 92, n: 6 },
    { x: 30, y: 138, w: 120, h: 112, n: 4 }, { x: 166, y: 138, w: 140, h: 112, n: 6 },
  ];
  const tile = { x: 140, y: 80, s: 60 };
  for (const b of blocks) {
    lots += `<rect class="ln" x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}"/>`;
    const lw = b.w / b.n * 2;
    for (let k = 0; k < b.n; k++) {
      const row = k % 2, col = Math.floor(k / 2);
      const x = b.x + col * lw, y = b.y + row * (b.h / 2);
      lots += `<rect class="ln-thin" x="${x}" y="${y}" width="${lw}" height="${b.h / 2}" style="opacity:.8"/>`;
      // mask predicted inside the highlighted tile
      const ix = Math.max(x, tile.x), iy = Math.max(y, tile.y);
      const ax = Math.min(x + lw, tile.x + tile.s), ay = Math.min(y + b.h / 2, tile.y + tile.s);
      if (ax - ix > 4 && ay - iy > 4) masks += `<rect x="${ix + 2}" y="${iy + 2}" width="${ax - ix - 4}" height="${ay - iy - 4}" class="tint"/>`;
    }
  }
  let grid = '';
  for (let i = 0; i <= 5; i++) grid += `<line class="ln-dash" style="opacity:.4" x1="${20 + i * 60}" y1="20" x2="${20 + i * 60}" y2="260"/>`;
  for (let j = 0; j <= 4; j++) grid += `<line class="ln-dash" style="opacity:.4" x1="20" y1="${20 + j * 60}" x2="320" y2="${20 + j * 60}"/>`;
  const flow = L(lang,
    [['7.466', 'feições do cadastro CAD'], ['7.080', 'polígonos válidos (94,8%)'], ['2.657', 'anotações em 562 tiles'], ['96,5%', 'mAP@50 de máscara']],
    [['7,466', 'CAD cadastre features'], ['7,080', 'valid polygons (94.8%)'], ['2,657', 'labels across 562 tiles'], ['96.5%', 'mask mAP@50']]);
  let f = '';
  flow.forEach(([n, l], i) => {
    const y = 40 + i * 66;
    f += `<text x="362" y="${y}" class="t-lg" ${i === 3 ? 'style="fill:var(--layer)"' : ''}>${n}</text><text x="362" y="${y + 18}" class="t-xs" style="font-size:11.5px">${l}</text>`;
    if (i < 3) f += `<line class="ln" x1="370" y1="${y + 26}" x2="370" y2="${y + 42}" marker-end="url(#a-aerial)"/>`;
  });
  return svg('aerial', L(lang, 'Quadras e lotes sob a grade de tiles, com máscaras previstas em um tile e o funil de rotulagem automática', 'Blocks and lots under the tile grid, predicted masks in one tile and the automatic labeling funnel'), `
    ${lots}${masks}${grid}
    <rect x="${tile.x}" y="${tile.y}" width="${tile.s}" height="${tile.s}" class="ln-layer" style="stroke-width:2"/>
    <text x="20" y="282" class="m t-xs dim">SIRGAS 2000 / UTM 23S · GSD 3,6 cm/px</text>
    <text x="20" y="300" class="m t-xs dim">${L(lang, 'ortomosaico de drone · 276 MP', 'drone orthomosaic · 276 MP')}</text>
    ${f}
    <text x="362" y="318" class="m t-xs dim">YOLOv8m-seg · 35,8 FPS</text>
  `);
}

// ------------------------------------------------------------------ Document extractor
export function docs(lang) {
  const kp = [[62, 74], [86, 70], [120, 66], [150, 63], [176, 60], [70, 168], [198, 150], [204, 96], [58, 120], [110, 64]];
  const zones = L(lang,
    [['nome', 330, 92, 150], ['CPF', 330, 122, 92], ['nascimento', 430, 122, 92], ['registro', 330, 152, 110], ['cat.', 450, 152, 40]],
    [['name', 330, 92, 150], ['CPF', 330, 122, 92], ['birth date', 430, 122, 92], ['reg. no.', 330, 152, 110], ['cat.', 450, 152, 40]]);
  let z = '';
  for (const [label, x, y, w] of zones) z += `<rect x="${x}" y="${y}" width="${w}" height="20" class="ln-layer" stroke-dasharray="4 3"/><text x="${x + 4}" y="${y - 3}" class="m t-xs" style="fill:var(--layer)">${label}</text>`;
  const checks = L(lang,
    ['CPF · dígito verificador', 'CNH · módulo 11 + DSC', 'município · 5.571 do IBGE'],
    ['CPF · check digit', 'CNH · modulo 11 + DSC', 'city · 5,571 IBGE names']);
  let c = '';
  checks.forEach((t, i) => { const x = 20 + i * 180; c += `<path class="ln-layer" d="M${x} ${296} l5 5 10 -11"/><text x="${x + 22}" y="${300}" class="t-xs" style="font-size:11.5px">${t}</text>`; });
  return svg('docs', L(lang, 'Foto de documento alinhada por homografia e lida por zonas, com validações oficiais', 'Document photo aligned by homography and read by zones, with official validations'), `
    <polygon class="box" points="44,58 214,44 230,190 52,206" style="fill:#fff"/>
    <polygon class="ln-thin" points="54,80 196,68 200,92 58,104"/>
    <rect x="66" y="120" width="40" height="52" class="ln-thin" transform="rotate(-5 86 146)"/>
    <path class="ln-thin" d="M118 126 L 204 118 M120 144 L 206 136 M122 162 L 208 154"/>
    ${kp.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" class="ln-layer" style="stroke-width:1.2"/>`).join('')}
    <text x="44" y="232" class="m t-xs dim">${L(lang, 'foto de campo · ORB nos pontos do layout', 'field photo · ORB on layout keypoints')}</text>
    <path class="ln" d="M236 124 C 260 112, 284 112, 306 124" marker-end="url(#a-docs)"/>
    <text x="270" y="104" text-anchor="middle" class="m t-xs dim">RANSAC</text>
    <rect class="box" x="316" y="56" width="224" height="134" style="fill:#fff"/>
    <rect x="328" y="66" width="200" height="12" class="hatch" style="fill:url(#h-docs)"/>
    ${z}
    <text x="316" y="210" class="m t-xs dim">${L(lang, 'OCR zonal campo a campo · Tesseract 5', 'zonal OCR, field by field · Tesseract 5')}</text>
    <line class="ln-thin" x1="20" y1="262" x2="540" y2="262"/>
    ${c}
    <text x="20" y="328" class="m t-xs dim">${L(lang, '93–100% nos campos críticos · benchmark sobre o dataset público BID', '93–100% on critical fields · benchmark on the public BID dataset')}</text>
  `);
}

// ------------------------------------------------------------------ PDF → DWG
export function pdf2dwg(lang) {
  // left: flattened PDF linework (all grey); right: rebuilt DXF with layers + UTM grid
  const lines = [
    'M40 70 L 190 58', 'M40 92 L 196 82', 'M58 58 L 74 196', 'M150 52 L 168 190',
    'M40 150 Q 110 120 196 150', 'M44 172 Q 120 146 200 176', 'M90 100 L 130 100 L 130 130 L 90 130 Z',
  ];
  const pdf = lines.map((d) => `<path d="${d}" class="ln" style="opacity:.55"/>`).join('');
  const layerCols = ['var(--l-ai)', 'var(--l-auto)', 'var(--l-platform)', 'var(--l-cv)', 'var(--l-eng)', 'var(--l-ai)', 'var(--l-auto)'];
  const dxf = lines.map((d, i) => `<path d="${d}" transform="translate(300 0)" fill="${i === 6 ? 'url(#h-pdf2dwg)' : 'none'}" stroke="${layerCols[i]}" stroke-width="1.6"/>`).join('');
  const rows = [
    [L(lang, 'drenagem · recall', 'drainage · recall'), 0.871, 0.803],
    [L(lang, 'drenagem · precisão', 'drainage · precision'), 0.835, 0.813],
    [L(lang, 'ponte · recall', 'bridge · recall'), 0.944, 0.940],
    [L(lang, 'ponte · precisão', 'bridge · precision'), 0.923, 0.918],
  ];
  const x0 = 170, x1 = 500, lo = 0.75, hi = 1.0;
  const sx = (v) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
  const fmt = (v) => (lang === 'en' ? v.toFixed(3) : v.toFixed(3).replace('.', ','));
  let bars = '';
  rows.forEach(([label, ours, ref], i) => {
    const y = 244 + i * 20;
    bars += `<text x="${x0 - 8}" y="${y + 9}" text-anchor="end" class="m t-xs">${label}</text>
      <rect x="${x0}" y="${y}" width="${sx(ours) - x0}" height="7" class="fill-layer"/>
      <rect x="${x0}" y="${y + 8}" width="${sx(ref) - x0}" height="5" class="box" style="stroke-width:.8"/>
      <text x="${sx(ours) + 5}" y="${y + 7}" class="m t-xs">${fmt(ours)}</text>`;
  });
  return svg('pdf2dwg', L(lang, 'PDF vetorial sem camadas reconstruído como DXF com camadas e coordenadas UTM, e comparação com o PDFIMPORT do AutoCAD', 'Layerless vector PDF rebuilt as a layered DXF with UTM coordinates, compared with AutoCAD PDFIMPORT'), `
    <rect class="box" x="24" y="40" width="190" height="168" style="fill:#fff"/>
    <text x="24" y="30" class="m t-xs dim">${L(lang, 'PDF: tudo num bloco, sem escala', 'PDF: one block, no scale')}</text>
    ${pdf}
    <path class="ln" d="M226 124 C 250 112, 268 112, 290 124" marker-end="url(#a-pdf2dwg)"/>
    <text x="258" y="104" text-anchor="middle" class="m t-xs dim">pdf2dwg</text>
    <rect class="box" x="324" y="40" width="190" height="168" style="fill:#fff"/>
    <line class="ln-thin" x1="324" y1="100" x2="514" y2="100" stroke-dasharray="2 3"/>
    <line class="ln-thin" x1="420" y1="40" x2="420" y2="208" stroke-dasharray="2 3"/>
    ${dxf}
    <text x="324" y="30" class="m t-xs dim">${L(lang, 'DXF: camadas, hachuras, UTM real', 'DXF: layers, hatches, real UTM')}</text>
    <text x="518" y="103" class="m t-xs dim" style="font-size:8.5px">N</text>
    <text x="414" y="220" class="m t-xs dim" style="font-size:8.5px">E</text>
    <rect x="${x0}" y="228" width="10" height="6" class="fill-layer"/><text x="${x0 + 14}" y="234" class="m t-xs">pdf2dwg</text>
    <rect x="${x0 + 80}" y="228" width="10" height="5" class="box" style="stroke-width:.8"/><text x="${x0 + 94}" y="234" class="m t-xs">AutoCAD 2026 PDFIMPORT</text>
    ${bars}
    <line class="ln-thin" x1="${x0}" y1="240" x2="${x0}" y2="324"/>
    <text x="${x0}" y="336" class="m t-xs dim" style="font-size:9px">${L(lang, 'eixo começa em 0,75', 'axis starts at 0.75')}</text>
  `);
}

// ------------------------------------------------------------------ Topovia Civil (Claude inside Civil 3D)
export function civil3d(lang) {
  const steps = L(lang, ['propor', 'aprovar', 'executar', 'desfazer (U)'], ['propose', 'approve', 'apply', 'undo (U)']);
  let s = '';
  steps.forEach((label, i) => {
    const x = 40 + i * 130;
    s += `<rect x="${x}" y="176" width="110" height="34" class="${i === 1 ? 'tint' : 'box'}"/>
      <text x="${x + 12}" y="197" class="m t-xs" font-weight="600">${i + 1}</text>
      <text x="${x + 28}" y="197" class="t-sm" font-weight="700">${label}</text>`;
    if (i < 3) s += `<line class="ln" x1="${x + 110}" y1="193" x2="${x + 128}" y2="193" marker-end="url(#a-civil3d)"/>`;
  });
  return svg('civil3d', L(lang, 'Claude conectado ao Civil 3D por um servidor MCP em C# e um plugin .NET, com o protocolo propor, aprovar, executar e desfazer', 'Claude connected to Civil 3D through a C# MCP server and a .NET plugin, with the propose, approve, apply and undo protocol'), `
    <rect class="tint" x="24" y="30" width="130" height="64"/>
    <text x="89" y="58" text-anchor="middle" class="t-md">Claude</text>
    <text x="89" y="76" text-anchor="middle" class="m t-xs">MCP client</text>
    <line class="ln" x1="154" y1="62" x2="206" y2="62" marker-end="url(#a-civil3d)" marker-start="url(#a-civil3d)"/>
    <rect class="box" x="208" y="30" width="150" height="64"/>
    <text x="283" y="54" text-anchor="middle" class="t-md">${L(lang, 'Servidor MCP', 'MCP server')}</text>
    <text x="283" y="72" text-anchor="middle" class="m t-xs">C# · .NET 8</text>
    <text x="283" y="86" text-anchor="middle" class="m t-xs dim">${L(lang, '26 ferramentas', '26 tools')}</text>
    <line class="ln" x1="358" y1="62" x2="402" y2="62" marker-end="url(#a-civil3d)" marker-start="url(#a-civil3d)"/>
    <text x="380" y="50" text-anchor="middle" class="m t-xs dim" style="font-size:8.5px">named</text>
    <text x="380" y="80" text-anchor="middle" class="m t-xs dim" style="font-size:8.5px">pipe</text>
    <rect class="box" x="404" y="30" width="136" height="64"/>
    <text x="472" y="54" text-anchor="middle" class="t-md">Civil 3D 2026</text>
    <text x="472" y="72" text-anchor="middle" class="m t-xs">${L(lang, 'plugin .NET', '.NET plugin')}</text>
    <text x="472" y="86" text-anchor="middle" class="m t-xs dim">${L(lang, '47 tipos de ação', '47 action types')}</text>
    <text x="40" y="150" class="m t-xs dim">${L(lang, 'nada muda no desenho sem o OK de quem está projetando', 'nothing changes in the drawing without the designer’s OK')}</text>
    <line class="ln-thin" x1="40" y1="160" x2="520" y2="160"/>
    ${s}
    <line class="ln-thin" x1="24" y1="238" x2="540" y2="238"/>
    <text x="24" y="258" class="t-sm" font-weight="700">${L(lang, 'Motor próprio validado contra o Civil 3D', 'Own engine validated against Civil 3D')}</text>
    <text x="24" y="280" class="m t-xs">${L(lang, '228 métricas de superfície · 220 seções · 6.772 pontos de corredor', '228 surface metrics · 220 sections · 6,772 corridor points')}</text>
    <text x="24" y="298" class="m t-xs">${L(lang, 'LandXML de 559 MB (5,2 mi de triângulos) em ~75 s', '559 MB LandXML (5.2M triangles) in ~75 s')}</text>
    <text x="24" y="324" class="m t-xs dim">${L(lang, 'instalador próprio · licença assinada com ECDSA P-256', 'own installer · ECDSA P-256 signed licenses')}</text>
  `);
}

// ------------------------------------------------------------------ Nature: upstream water-permit analysis
export function nature(lang) {
  // drainage tree; the query point sits on the trunk, everything upstream is traversed
  const segs = [
    // [x1,y1,x2,y2, upstream?]
    [250, 300, 250, 236, 0], [250, 236, 214, 190, 1], [214, 190, 170, 150, 1], [170, 150, 120, 120, 1], [170, 150, 176, 96, 1],
    [214, 190, 262, 150, 1], [262, 150, 252, 96, 1], [262, 150, 316, 124, 1], [250, 236, 320, 214, 0], [320, 214, 374, 180, 0],
    [374, 180, 420, 150, 0], [374, 180, 380, 120, 0], [120, 120, 80, 96, 1], [120, 120, 112, 70, 1], [252, 96, 230, 56, 1], [252, 96, 290, 62, 1],
  ];
  const tree = segs.map(([a, b, c, d, up]) => `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="${up ? 'ln-layer' : 'ln'}" ${up ? 'style="stroke-width:2"' : 'style="opacity:.5"'}/>`).join('');
  const permits = [[160, 132, 1], [200, 172, 1], [128, 104, 1], [240, 120, 1], [292, 140, 1], [184, 110, 1], [244, 78, 1], [100, 92, 1], [356, 196, 0], [392, 140, 0], [336, 206, 0]];
  const p = permits.map(([x, y, up]) => `<rect x="${x - 3.5}" y="${y - 3.5}" width="7" height="7" class="${up ? 'fill-layer' : 'box'}" ${up ? '' : 'style="opacity:.6"'}/>`).join('');
  return svg('nature', L(lang, 'Rede de drenagem percorrida para montante a partir do ponto de captação, somando as outorgas encontradas', 'Drainage network traversed upstream from the intake point, adding up the permits found'), `
    <path class="ln-dash" d="M60 110 C 70 50, 170 28, 250 36 C 330 40, 350 90, 340 150 C 330 220, 290 250, 252 244 C 200 236, 150 210, 110 180 C 76 156, 56 140, 60 110 Z" style="opacity:.6"/>
    <text x="24" y="22" class="m t-xs dim">${L(lang, 'ottobacia de contribuição', 'contributing catchment')}</text>
    ${tree}
    ${p}
    <circle cx="250" cy="236" r="7" class="box" style="stroke-width:2"/>
    <circle cx="250" cy="236" r="2.5" class="on-layer"/>
    <path class="ln" d="M256 242 L 300 290 H 400"/>
    <text x="304" y="284" class="t-sm" font-weight="700">${L(lang, 'ponto de captação', 'intake point')}</text>
    <text x="304" y="304" class="m t-xs dim">${L(lang, 'Q7,10 do trecho + outorgas a montante', 'reach Q7,10 + upstream permits')}</text>
    <rect class="box" x="430" y="30" width="110" height="196" style="fill:#fff"/>
    <text x="442" y="52" class="t-xs" style="font-size:11px;font-weight:700">${L(lang, 'comprometimento', 'commitment')}</text>
    ${[0.12, 0.2, 0.35, 0.28, 0.42, 0.61, 0.7, 0.66, 0.48, 0.3, 0.18, 0.1].map((v, i) => `<rect x="${444 + i * 7.6}" y="${206 - v * 130}" width="5.6" height="${v * 130}" class="${v > 0.5 ? 'fill-layer' : 'box'}" style="stroke-width:.6"/>`).join('')}
    <line class="ln-thin" x1="440" y1="206" x2="534" y2="206"/>
    <text x="442" y="220" class="m t-xs dim" style="font-size:8.5px">${L(lang, 'jan … dez', 'Jan … Dec')}</text>
    <text x="24" y="326" class="m t-xs dim">${L(lang, '292.386 outorgas de 6 fontes · busca em largura na rede de drenagem', '292,386 permits from 6 sources · breadth-first search on the drainage network')}</text>
  `);
}

export const FIGURES = { hub, agent, road, dbaas, mcp, exebot, aerial, docs, pdf2dwg, civil3d, nature };
