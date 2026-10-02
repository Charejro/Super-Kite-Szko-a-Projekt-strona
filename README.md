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
├── informacje.html   # kontakt + godziny pracy + formularz + mapa
├── css/style.css     # wspólny styl
├── js/i18n.js        # słowniki tłumaczeń PL / EN
├── js/main.js        # język, menu mobilne, lightbox, formularz, rok w stopce
├── robots.txt        # reguły dla robotów wyszukiwarek
├── sitemap.xml       # mapa strony dla Google
└── assets/
    ├── favicon.svg   # ikona strony
    └── img/
        ├── kite-01…09.jpg  # oryginały zdjęć (pełna rozdzielczość)
        └── opt/            # zoptymalizowane wersje 640 px i 1280 px
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
- **Informacje** — telefon `123 455 6789`, e-mail `superszkola@gmail.com`,
  formularz kontaktowy (Formspree) i mapa Google z lokalizacją
  (Przystań Swarzewo, Polska).

## Formularz kontaktowy (Formspree)

Formularz na `informacje.html` (`#formularz`) wysyła wiadomości przez darmową
usługę **Formspree** — bez własnego backendu. Aby podłączyć skrzynkę:

1. Załóż darmowe konto na <https://formspree.io> i utwórz nowy formularz.
2. Skopiuj identyfikator z adresu endpointu, np. `https://formspree.io/f/abcdwxyz`
   → identyfikatorem jest `abcdwxyz`.
3. W `informacje.html` podmień `YOUR_FORM_ID`:

   ```html
   <form class="form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

4. Wyślij testową wiadomość — pierwsze zgłoszenie trzeba zatwierdzić w panelu
   Formspree. Odpowiedzi trafiają na e-mail przypisany do konta.

Jak to działa:

- `js/main.js` przechwytuje wysyłkę i robi `fetch` do Formspree, więc użytkownik
  nie opuszcza strony — widzi komunikat powodzenia/błędu (`aria-live`).
- Bez JavaScriptu formularz działa klasycznie (zwykły POST do Formspree).
- Dodane są: pole `_subject` (temat e-maila), `_language` oraz ukryty honeypot
  `_gotcha` na boty.
- Walidacja: wymagane imię, e-mail i wiadomość + checkbox zgody (RODO);
  komunikaty i etykiety są dwujęzyczne (`info.form*` w `js/i18n.js`).

Dopóki `YOUR_FORM_ID` nie zostanie podmieniony, formularz pokaże komunikat
„formularz nie jest skonfigurowany” zamiast wysyłać wiadomość.

## Zdjęcia

Zdjęcia w `assets/img/` pochodzą z **Wikimedia Commons** (licencje CC BY,
CC BY-SA i CC0 — lista autorów jest na dole strony galerii). To materiały
poglądowe — najlepiej podmienić je na własne zdjęcia z zajęć w Swarzewie.
Wystarczy nadpisać pliki `kite-01…kite-09` (te same nazwy) lub zmienić ścieżki
w `galeria.html`. Opisy i teksty alternatywne (`alt`) są dwujęzyczne —
klucze `gallery.cap*` i `gallery.alt*` w `js/i18n.js`.

**Wydajność obrazów.** Oryginały mają 1920 px i łącznie ok. 4,4 MB — to za dużo
na telefon. W `assets/img/opt/` leżą więc zoptymalizowane wersje:

- `…-640.jpg` — do siatki galerii (miniatury, ~25–80 KB),
- `…-1280.jpg` — do lightboxa i podglądu (~90–340 KB).

W HTML są podłączone przez `srcset`/`sizes`, więc przeglądarka pobiera mniejszy
plik. Oryginały zostają w `assets/img/` jako źródło. Jeśli podmienisz zdjęcia,
wygeneruj nowe wersje (np. w [Squoosh](https://squoosh.app/) lub ImageMagick:
`magick kite-01.jpg -resize 640x -quality 82 opt/kite-01-640.jpg`).

## SEO i wydajność

Każda podstrona ma: `<link rel="canonical">`, `robots` meta, Open Graph i Twitter
Card (ze zdjęciem `opt/kite-03-jump-1280.jpg`), favicon SVG oraz **dane
strukturalne JSON-LD** dla Google:

- `index.html` — `SportsActivityLocation` (adres, geo, telefon, godziny, oferta),
- `cennik.html` — `OfferCatalog` z cenami + `BreadcrumbList`,
- `galeria.html` — `ImageGallery` + `BreadcrumbList`,
- `informacje.html` — `ContactPage` + `BreadcrumbList`.

Dodatkowo: `robots.txt` i `sitemap.xml`, lokalizacja (`geo.region`,
`geo.position`) oraz `preconnect` do Google Maps.

**Ważne:** w `canonical`, Open Graph, JSON-LD i `sitemap.xml` użyto zastępczej
domeny `https://twojadomena.pl`. Przed publikacją podmień ją na własną
(znajdziesz ją m.in. w `<head>` każdej strony, w `sitemap.xml` i `robots.txt`).

Dostępność i szybkość: link „przejdź do treści” (`skip-link`), `aria-current`
w menu, poprawna kolejność nagłówków, kontrast zgodny z WCAG AA, `loading="lazy"`
i `decoding="async"` na zdjęciach oraz `loading="lazy"` na mapach.

## Responsywność / urządzenia

Strona jest przystosowana do telefonów i tabletów (Android, iOS/iPadOS, Windows)
oraz komputerów:

- Płynne łamanie kolumn (siatki `auto-fit`), a poniżej 980 px menu zamienia się
  w hamburgera z blokadą przewijania tła.
- Bezpieczne obszary (`env(safe-area-inset-*)`) — treść nie wchodzi pod notch
  i pasek gestów iPhone'a; dodano też `viewport-fit=cover` i `theme-color`.
- Przyciski mają min. 44 px wysokości (wygodne dla palca), a efekty `:hover`
  są wyłączone na ekranach dotykowych.
- Obsługa `prefers-reduced-motion`, skalowanie tekstu w Safari (`text-size-adjust`)
  i brak poziomego przewijania.
- Lightbox galerii zamyka się dotknięciem tła, krzyżykiem, klawiszem Esc
  lub przesunięciem palca.

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
- Identyfikator Formspree: podmień `YOUR_FORM_ID` w `informacje.html`
- Domena: podmień `https://twojadomena.pl` w `<head>` stron, `sitemap.xml`
  i `robots.txt` na własny adres
