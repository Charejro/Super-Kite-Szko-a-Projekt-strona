# Super Kite — strona szkoły kitesurfingu

Statyczna, responsywna i **dwujęzyczna (PL / EN)** strona dla szkółki
kitesurfingowej **Super Kite** z przystani w Swarzewie nad Zatoką Pucką.
HTML + CSS + JavaScript, bez zależności i bez procesu budowania.

## Struktura

```
super-kite/
├── index.html        # strona główna: hero, „O szkole”, „Dlaczego my”, mapa, CTA
├── cennik.html       # cennik kursów
├── galeria.html      # galeria zdjęć (z lightboxem)
├── informacje.html   # kontakt + godziny pracy + mapa
├── css/style.css     # wspólny styl
├── js/i18n.js        # słowniki tłumaczeń PL / EN
├── js/main.js        # język, menu mobilne, lightbox, rok w stopce
└── assets/img/       # zdjęcia do galerii
```

## Dwujęzyczność (PL / EN)

- Przełącznik **PL | EN** znajduje się w prawym górnym rogu, obok menu.
- Wybór języka zapisuje się w `localStorage` i obowiązuje na wszystkich podstronach.
- Przy pierwszej wizycie język jest dobierany na podstawie języka przeglądarki.
- Tłumaczenia są w jednym miejscu: `js/i18n.js`. W HTML teksty oznaczone są atrybutami:
  - `data-i18n="klucz"` — zwykły tekst,
  - `data-i18n-html="klucz"` — tekst z linkami / `<br>` / `<strong>`,
  - `data-i18n-attr="atrybut:klucz"` — np. `alt`, `content` (meta), `aria-label`.
- Aby dodać nowy tekst: dopisz klucz w sekcji `pl` oraz `en` w `js/i18n.js`
  i oznacz nim element w HTML.

## Podstrony

- **Strona główna** — opis szkółki (5 lat na rynku, świetne opinie), sekcja
  „Dlaczego Super Kite jest dla Ciebie?” oraz mapa Google z lokalizacją.
- **Cennik** — 70 EUR / 1 h, 120 EUR / 2 h, 320 EUR / 6 h, 400 EUR / 8 h.
- **Galeria** — 9 zdjęć z lightboxem (klik = powiększenie, Esc = zamknięcie).
- **Informacje** — telefon `123 455 6789`, e-mail `superszkola@gmail.com`
  i mapa Google z lokalizacją (Przystań Swarzewo, Polska).

## Zdjęcia

Zdjęcia w `assets/img/` pochodzą z **Wikimedia Commons** (licencje CC BY,
CC BY-SA i CC0 — lista autorów jest na dole strony galerii). To materiały
poglądowe — najlepiej podmienić je na własne zdjęcia z zajęć w Swarzewie.
Wystarczy nadpisać pliki `kite-01…kite-09` (te same nazwy) lub zmienić ścieżki
w `galeria.html`. Opisy i teksty alternatywne (`alt`) są dwujęzyczne —
klucze `gallery.cap*` i `gallery.alt*` w `js/i18n.js`.

## Uruchomienie

Wystarczy otworzyć `index.html` w przeglądarce. Jeśli masz zainstalowany
Python, możesz też uruchomić lokalny serwer:

```powershell
cd super-kite
python -m http.server 8000
```

i wejść na http://localhost:8000

## Mapa Google

Mapy są wstawione przez publiczny, bezkluczowy embed
(`maps.google.com/maps?...&output=embed`). Aby zmienić lokalizację, podmień
parametr `q=` w adresie `src` elementu `<iframe>` w `index.html`
i `informacje.html`.

## Do podmiany przed publikacją

- Zdjęcia w galerii (obecne są poglądowe, z Wikimedia Commons)
- Godziny pracy i sezon w `informacje.html`
- Adres e-mail: przyjęto `superszkola@gmail.com`
