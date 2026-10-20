# Prime Verk – strona www

Statyczna strona (IS / EN / PL) generowana prostym skryptem Node (bez zależności).

## Struktura
- `src/content/{is,en,pl}.mjs` – wszystkie teksty (w tym FAQ każdej usługi)
- `src/data/prices.mjs` – cennik (kr, bez VAT) – jedno źródło dla cennika, kalkulatora i kart usług
- `src/pages.mjs`, `src/ui.mjs` – szablony; `src/css/style.css`, `src/js/site.js`
- `src/img/<slot>.jpg` – zdjęcia (lista slotów: `PHOTOS.md`); bez pliku wyświetla się placeholder
- `docs/` – wynik buildu, serwowany przez GitHub Pages

## Budowanie
```
node src/build.mjs                  # lokalnie (podgląd w katalogu głównym, np. npx http-server docs)
MSYS_NO_PATHCONV=1 BASE=/primeverk node src/build.mjs  # wersja pod GitHub Pages (https://nataliajagus.github.io/primeverk/)
BASE= node src/build.mjs            # po podpięciu własnej domeny
```
Dane kontaktowe i link do Facebooka: `src/ui.mjs` (obiekt `CONTACT`).
