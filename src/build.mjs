// Generator statycznej strony: node src/build.mjs   (BASE=/primeverk dla GitHub Pages, puste dla lokalnego podglądu)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGS, homePage, servicesPage, servicePage, pricesPage, faqPage, contactPage, privacyPage } from './pages.mjs';
import { SERVICES } from './data/prices.mjs';
import { PHOTO_SLOTS, SITE, BASE } from './ui.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(SRC, '..', 'docs');

fs.mkdirSync(OUT, { recursive: true });
// czyścimy pliki (nie foldery): na Windows folder serwowany przez serwer podglądu bywa zablokowany
const clear = d => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { clear(p); try { fs.rmdirSync(p); } catch { /* zablokowany – zostaje pusty */ } }
    else fs.rmSync(p, { force: true });
  }
};
clear(OUT);
const write = (rel, content) => {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
};
const copyDir = (from, to) => {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name), b = path.join(to, e.name);
    e.isDirectory() ? copyDir(a, b) : fs.copyFileSync(a, b);
  }
};

let count = 0;
const urls = []; // {path, alt:{lang: path}}
for (const code of LANGS) {
  const L = (await import(`./content/${code}.mjs`)).default;
  const dir = code === 'is' ? '' : code + '/';
  const pages = [
    ['', homePage(L)], ['services/', servicesPage(L)], ['prices/', pricesPage(L)],
    ['faq/', faqPage(L)], ['contact/', contactPage(L)], ['privacy/', privacyPage(L)],
    ...SERVICES.map(s => [`services/${s}/`, servicePage(L, s)])
  ];
  for (const [p, html] of pages) { write(`${dir}${p}index.html`, html); count++; urls.push({ lang: code, p }); }
}

copyDir(path.join(SRC, 'assets'), path.join(OUT, 'assets'));
copyDir(path.join(SRC, 'img'), path.join(OUT, 'assets', 'img'));
fs.copyFileSync(path.join(SRC, 'css', 'style.css'), path.join(OUT, 'assets', 'style.css'));
fs.copyFileSync(path.join(SRC, 'js', 'site.js'), path.join(OUT, 'assets', 'site.js'));
write('.nojekyll', '');

// 404 + lista slotów na zdjęcia
write('404.html', fs.readFileSync(path.join(OUT, 'index.html'), 'utf8')
  .replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex">')
  .replace(/<link rel="canonical"[^>]*>/, ''));

// sitemap.xml z wersjami językowymi + robots.txt
const loc = (lang, p) => SITE + BASE + (lang === 'is' ? '' : '/' + lang) + '/' + p;
const today = new Date().toISOString().slice(0, 10);
const pagesSet = [...new Set(urls.map(u => u.p))];
const xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'];
for (const p of pagesSet) for (const lang of LANGS) {
  xml.push('<url><loc>' + loc(lang, p) + '</loc><lastmod>' + today + '</lastmod><changefreq>' + (p === '' ? 'weekly' : 'monthly') + '</changefreq><priority>' + (p === '' ? '1.0' : p.startsWith('services/') ? '0.8' : '0.6') + '</priority>' +
    LANGS.map(l => '<xhtml:link rel="alternate" hreflang="' + l + '" href="' + loc(l, p) + '"/>').join('') +
    '<xhtml:link rel="alternate" hreflang="x-default" href="' + loc('is', p) + '"/></url>');
}
xml.push('</urlset>');
write('sitemap.xml', xml.join('\n'));
write('robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + SITE + BASE + '/sitemap.xml\n');
const md = ['# Sloty na zdjęcia stockowe', '',
  'Wrzuć plik do `src/img/<slot>.jpg` (lub .webp/.png), uruchom `node src/build.mjs` – placeholder zniknie.', '',
  '| Slot (nazwa pliku) | Proporcje | Co ma być na zdjęciu (PL) |', '|---|---|---|',
  ...[...PHOTO_SLOTS].map(([s, v]) => `| \`${s}\` | ${v.ratio.replace('x', ':')} | ${String(v.label).replace(/<[^>]+>/g, '')} |`)].join('\n');
fs.writeFileSync(path.join(SRC, '..', 'PHOTOS.md'), md + '\n');
console.log(`OK: ${count} stron, ${PHOTO_SLOTS.size} slotów na zdjęcia -> docs/`);
