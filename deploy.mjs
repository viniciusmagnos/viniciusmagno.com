// Builds the site and uploads it over SSH.
// Destination comes from deploy.config.json (not versioned), e.g.
//   { "host": "my-ssh-alias", "path": "/var/www/example" }
// Only the portfolio files are uploaded; other folders at the destination are left alone.
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';

if (!existsSync('deploy.config.json')) {
  console.error('Missing deploy.config.json. Copy deploy.config.example.json and fill in your SSH host and remote path.');
  process.exit(1);
}
const { host, path: remote, url } = JSON.parse(readFileSync('deploy.config.json', 'utf8'));
const files = 'index.html robots.txt sitemap.xml en assets';

execSync('node build.mjs', { stdio: 'inherit' });
execSync(
  `tar -C dist -cf - ${files} | ssh -o BatchMode=yes ${host} "tar -C ${remote} --no-same-owner -xf - && chmod -R u=rwX,go=rX ${remote}/index.html ${remote}/en ${remote}/assets"`,
  { stdio: 'inherit', shell: true },
);
console.log(`Deployed${url ? ': ' + url : ''}`);
