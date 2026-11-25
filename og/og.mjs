// Generates public/assets/og.png and og-en.png (1200x630 share images) by
// rendering a small page with the real terrain engine in headless Chrome/Edge.
// Usage: node og/og.mjs   (needs `node serve.mjs` running on :4321 after a build)
import { writeFile, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const browsers = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
];
const browser = browsers.find((b) => existsSync(b));
if (!browser) throw new Error('Chrome/Edge not found');

const variants = {
  pt: { file: 'og.png', tag: 'Engenharia civil, software e IA', title: 'Construo software e IA para quem projeta estradas, pontes e cidades.', cmd: 'Comando:' },
  en: { file: 'og-en.png', tag: 'Civil engineering, software and AI', title: 'I build software and AI for the people who design roads, bridges and cities.', cmd: 'Command:' },
};

for (const [lang, v] of Object.entries(variants)) {
  const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overpass:wght@300..900&family=Overpass+Mono:wght@400..600&display=block">
<link rel="stylesheet" href="/assets/styles.css">
<style>
  html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#212830}
  .hero{min-height:630px;height:630px}
  .hero-body{padding-top:64px;padding-bottom:0}
  .hero h1{font-size:68px;max-width:13.5ch}
  .hero-name{font-size:24px}
  .statusbar .wrap{grid-template-columns:auto 1fr auto}
</style></head><body>
<section class="hero" data-hero>
  <canvas data-terrain="base"></canvas><canvas data-terrain="overlay"></canvas>
  <div class="wrap hero-body">
    <p class="hero-name">Vinícius Magno <span class="crea">${v.tag}</span></p>
    <h1>${v.title}</h1>
  </div>
  <div class="statusbar"><div class="wrap">
    <svg class="ucs" viewBox="0 0 42 42"><path d="M6 36 H34 M6 36 V8" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
    <div class="cmd" style="margin:0 0 4px">${v.cmd}&nbsp;<span style="color:#36d6e7">_PORTFOLIO</span></div>
    <p class="coords">E <b data-readout="e"></b> &nbsp;N <b data-readout="n"></b> &nbsp;Z <b data-readout="z"></b><br>SIRGAS 2000 / UTM 23S</p>
  </div></div>
</section>
<script type="module">import { initTerrain } from '/assets/terrain.js'; initTerrain(document.querySelector('[data-hero]'));</script>
</body></html>`;
  const page = join(root, 'dist', `_og-${lang}.html`);
  await writeFile(page, html, 'utf8');
  const out = join(root, 'public', 'assets', v.file);
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--window-size=1200,630', '--virtual-time-budget=6000', `--screenshot=${out}`,
    `http://localhost:4321/_og-${lang}.html`,
  ], { stdio: 'inherit' });
  await rm(page);
  console.log('wrote', out);
}
