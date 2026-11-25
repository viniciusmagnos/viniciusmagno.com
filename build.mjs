// Static build: renders dist/index.html (PT) and dist/en/index.html (EN)
// from src/content.mjs, and copies public/ into dist/.
import { mkdir, writeFile, cp, rm, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import content from './src/content.mjs';
import { renderPage } from './src/render.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');

// Empty dist/ instead of deleting it: on Windows a folder in use (e.g. a shell's cwd) can't be removed.
await mkdir(dist, { recursive: true });
for (const entry of await readdir(dist)) await rm(join(dist, entry), { recursive: true, force: true });
await mkdir(join(dist, 'en'), { recursive: true });
await cp(join(root, 'public'), dist, { recursive: true });

await writeFile(join(dist, 'index.html'), renderPage(content, 'pt'), 'utf8');
await writeFile(join(dist, 'en', 'index.html'), renderPage(content, 'en'), 'utf8');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>${content.site.url}/</loc><xhtml:link rel="alternate" hreflang="en" href="${content.site.url}/en/"/></url>
  <url><loc>${content.site.url}/en/</loc><xhtml:link rel="alternate" hreflang="pt-BR" href="${content.site.url}/"/></url>
</urlset>
`;
await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${content.site.url}/sitemap.xml\n`, 'utf8');

console.log('Built dist/index.html, dist/en/index.html');
