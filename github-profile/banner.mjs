// Renders github-profile/assets/banner.png (1280x400) with the portfolio's terrain engine,
// so the GitHub profile matches viniciusmagno.com.
// Usage: node github-profile/banner.mjs   (with `node serve.mjs` running on :4321 after a build)
import { writeFile, rm, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const browser = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
if (!browser) throw new Error('Chrome/Edge not found');

const W = 1280, H = 400;
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overpass:wght@300..900&family=Overpass+Mono:wght@400..600&display=block">
<link rel="stylesheet" href="/assets/styles.css">
<style>
  html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#212830}
  .hero{min-height:${H}px;height:${H}px}
  .hero::before{background:linear-gradient(90deg,rgba(33,40,48,.95) 0%,rgba(33,40,48,.85) 40%,rgba(33,40,48,0) 66%)}
  .hero-body{padding:34px 0 0;align-self:start}
  .wrap{padding-inline:56px;max-width:none}
  .hero-name{font-size:22px;margin-bottom:12px}
  .hero h1{font-size:50px;max-width:15ch;line-height:1}
  .statusbar .wrap{grid-template-columns:auto 1fr auto;padding-block:8px 10px}
  .ucs{width:34px;height:34px}
</style></head><body>
<section class="hero" data-hero>
  <canvas data-terrain="base"></canvas><canvas data-terrain="overlay"></canvas>
  <div class="wrap hero-body">
    <p class="hero-name">Vinícius Magno <span class="crea">civil engineering · software · AI</span></p>
    <h1>I build software and AI for the people who design roads, bridges and cities.</h1>
  </div>
  <div class="statusbar"><div class="wrap">
    <svg class="ucs" viewBox="0 0 42 42"><path d="M6 36 H34 M6 36 V8" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M30 33 L35 36 L30 39 M3 12 L6 7 L9 12" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
    <div class="cmd" style="margin:0 0 4px">Command:&nbsp;<span style="color:#36d6e7">_OPEN viniciusmagno.com</span></div>
    <p class="coords">E <b data-readout="e"></b> &nbsp;N <b data-readout="n"></b> &nbsp;Z <b data-readout="z"></b><br>SIRGAS 2000 / UTM 23S</p>
  </div></div>
</section>
<script type="module">import { initTerrain } from '/assets/terrain.js'; initTerrain(document.querySelector('[data-hero]'));</script>
</body></html>`;

const page = join(root, 'dist', '_gh-banner.html');
await writeFile(page, html, 'utf8');
await mkdir(join(here, 'assets'), { recursive: true });
const out = join(here, 'assets', 'banner.png');
execFileSync(browser, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  `--window-size=${W},${H}`, '--virtual-time-budget=6000', `--screenshot=${out}`,
  'http://localhost:4321/_gh-banner.html',
], { stdio: 'ignore' });
await rm(page);
console.log('wrote', out);
