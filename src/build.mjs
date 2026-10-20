// Generator statycznej strony: node src/build.mjs   (BASE=/primeverk dla GitHub Pages, puste dla lokalnego podglądu)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGS, homePage, servicesPage, servicePage, pricesPage, projectsPage, faqPage, contactPage } from './pages.mjs';
import { SERVICES } from './data/prices.mjs';
import { PHOTO_SLOTS } from './ui.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(SRC, '..', 'docs');

fs.mkdirSync(OUT, { recursive: true });
for (const e of fs.readdirSync(OUT)) fs.rmSync(path.join(OUT, e), { recursive: true, force: true }); // zawartość, nie sam folder (może być serwowany)
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
for (const code of LANGS) {
  const L = (await import(`./content/${code}.mjs`)).default;
  const dir = code === 'is' ? '' : code + '/';
  const pages = [
    ['', homePage(L)], ['services/', servicesPage(L)], ['prices/', pricesPage(L)],
    ['projects/', projectsPage(L)], ['faq/', faqPage(L)], ['contact/', contactPage(L)],
    ...SERVICES.map(s => [`services/${s}/`, servicePage(L, s)])
  ];
  for (const [p, html] of pages) { write(`${dir}${p}index.html`, html); count++; }
}

copyDir(path.join(SRC, 'assets'), path.join(OUT, 'assets'));
copyDir(path.join(SRC, 'img'), path.join(OUT, 'assets', 'img'));
fs.copyFileSync(path.join(SRC, 'css', 'style.css'), path.join(OUT, 'assets', 'style.css'));
fs.copyFileSync(path.join(SRC, 'js', 'site.js'), path.join(OUT, 'assets', 'site.js'));
write('.nojekyll', '');

// 404 + lista slotów na zdjęcia
write('404.html', fs.readFileSync(path.join(OUT, 'index.html'), 'utf8'));
const md = ['# Sloty na zdjęcia stockowe', '',
  'Wrzuć plik do `src/img/<slot>.jpg` (lub .webp/.png), uruchom `node src/build.mjs` – placeholder zniknie.', '',
  '| Slot (nazwa pliku) | Proporcje | Co ma być na zdjęciu (PL) |', '|---|---|---|',
  ...[...PHOTO_SLOTS].map(([s, v]) => `| \`${s}\` | ${v.ratio.replace('x', ':')} | ${String(v.label).replace(/<[^>]+>/g, '')} |`)].join('\n');
fs.writeFileSync(path.join(SRC, '..', 'PHOTOS.md'), md + '\n');
console.log(`OK: ${count} stron, ${PHOTO_SLOTS.size} slotów na zdjęcia -> docs/`);
