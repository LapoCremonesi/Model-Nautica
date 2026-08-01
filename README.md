# Model Nautica

Sito web di **Model Nautica** — escursioni in barca sulla Riviera del Conero, con partenza dal porto di Numana (AN).

Ricostruito da zero: single page in italiano e inglese, animazioni con [Anime.js v4](https://animejs.com/), build con [Vite](https://vite.dev/) e server di produzione [Express](https://expressjs.com/) su Node.js.

---

## Avvio rapido

```bash
npm install       # installa le dipendenze
npm run dev       # sviluppo con hot reload  → http://localhost:5173
npm run serve     # build + server di produzione → http://localhost:3000
```

Script disponibili:

| Comando           | Cosa fa                                            |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Server di sviluppo Vite con hot module replacement |
| `npm run build`   | Genera la build ottimizzata in `dist/`             |
| `npm run preview` | Anteprima locale della build Vite                  |
| `npm start`       | Avvia il server Express su `dist/` (porta `PORT`, default 3000) |
| `npm run serve`   | `build` + `start` in un colpo solo                 |

---

## Struttura

```
index.html               markup di base, meta tag, JSON-LD, preloader
server.js                server Express per la produzione (compressione + cache)
vite.config.js           configurazione della build
public/                  favicon, immagine Open Graph, robots.txt
src/
├── main.js              punto d'ingresso: monta le sezioni e avvia le animazioni
├── data/content.js      TUTTI i testi del sito (it / en) e i dati aziendali
├── modules/
│   ├── dom.js           utility DOM, escaping, icone social
│   ├── i18n.js          stato della lingua, persistenza, notifiche di cambio
│   ├── preloader.js     schermata d'apertura + ingresso dell'hero
│   ├── reveal.js        rivelazioni allo scroll e contatori animati
│   ├── scroll.js        scroll fluido (Lenis), parallasse, scrollspy, progress bar
│   └── sea.js           mare animato dell'hero su canvas
├── sections/
│   ├── chrome.js        header, menu, drawer mobile, selettore lingua, hero, footer
│   ├── story.js         chi siamo, feste in barca, equipaggio, info pratiche
│   ├── tours.js         le due escursioni e le fasce orarie
│   ├── fleet.js         schede barca con illustrazione vettoriale animata
│   ├── coast.js         mappa interattiva delle calette del Conero
│   └── contact.js       recapiti e modulo di richiesta prenotazione
└── styles/
    ├── tokens.css       colori, tipografia, spaziature, ombre
    ├── base.css         reset e stili di base
    ├── components.css   bottoni, header, drawer, card, preloader
    └── sections.css     stili specifici di ogni sezione
```

---

## Modificare i contenuti

Tutti i testi visibili stanno in **`src/data/content.js`**, divisi nei due oggetti `it` ed `en`.
I recapiti (telefono, WhatsApp, email, indirizzi, partite IVA, social) stanno nella costante `BUSINESS` in cima allo stesso file. Non serve toccare l'HTML: le sezioni vengono generate a partire da questi dati.

Per aggiungere una caletta alla mappa servono due passaggi:

1. aggiungere la voce in `beaches.items` (in entrambe le lingue);
2. aggiungere le coordinate nella costante `POINTS` di `src/sections/coast.js`.

---

## Funzionalità

- **Bilingue IT/EN** con rilevamento automatico dalla lingua del browser e scelta salvata in `localStorage`.
- **Mare procedurale** su canvas nell'hero, sospeso automaticamente quando esce dal viewport.
- **Mappa interattiva** delle dieci calette: punti cliccabili, navigabili anche da tastiera, con barchetta che percorre la rotta (`createMotionPath` di Anime.js).
- **Illustrazione della barca** che si disegna allo scroll (`createDrawable`) e ondeggia in loop.
- **Modulo di prenotazione** che compone un messaggio WhatsApp già pronto: nessun backend, nessun dato memorizzato.
- **Accessibilità**: skip link, focus visibile, `aria-*` su tab e drawer, e supporto completo di `prefers-reduced-motion` (animazioni disattivate, contenuti sempre visibili).
- **SEO**: meta tag Open Graph, dati strutturati JSON-LD `TouristAttraction`, `robots.txt`.

---

## Deploy

### GitHub Pages (automatico)

Il workflow `.github/workflows/deploy.yml` costruisce il sito e lo pubblica su GitHub Pages a ogni push su `main`.

Perché funzioni, su GitHub va impostato **Settings → Pages → Source: GitHub Actions** (il workflow prova a farlo da solo tramite `actions/configure-pages`, ma se il repository non ha ancora Pages attivo può servire una conferma manuale).

Il sito viene servito da una sottocartella (`/Model-Nautica/`): per questo `vite.config.js` usa `base: './'`, che genera percorsi relativi validi sia dalla radice di un dominio sia da una sottocartella. Se in futuro il sito viene messo su `modelnautica.com`, non serve cambiare nulla.

### Altri hosting

La build è statica: la cartella `dist/` può essere pubblicata su qualsiasi hosting (Netlify, Vercel, Cloudflare Pages, un bucket S3, un Apache/Nginx).
In alternativa si può usare il server Node incluso:

```bash
npm ci --omit=dev && npm run build && PORT=8080 npm start
```
