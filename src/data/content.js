/**
 * Sorgente unica dei contenuti del sito, in italiano e inglese.
 * Le sezioni vengono renderizzate a partire da questi oggetti: per cambiare
 * un testo basta modificarlo qui, senza toccare il markup.
 */

export const BUSINESS = {
  name: 'Model Nautica',
  phone: '+39 338 3185866',
  phoneHref: 'tel:+393383185866',
  whatsapp: 'https://wa.me/393383185866',
  email: 'info@modelnautica.com',
  emailHref: 'mailto:info@modelnautica.com',
  marina: 'Piazzale Silvio Massaccesi — Zona Avamporto Sud',
  city: '60026 Numana (AN)',
  office: 'Via Sorrento 39 — 60026 Numana (AN)',
  maps: 'https://maps.google.com/?q=Piazzale+Silvio+Massaccesi,+60026+Numana+AN',
  vat: [
    { holder: 'Eros Di Franco', piva: '02922960428' },
    { holder: 'Cristina Riva', piva: '02951860424' },
  ],
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
    { label: 'WhatsApp', href: 'https://wa.me/393383185866', icon: 'whatsapp' },
  ],
};

const it = {
  meta: {
    title: 'Model Nautica — Escursioni in barca sulla Riviera del Conero | Numana',
    description:
      'Escursioni in barca nella Riviera del Conero con partenza dal porto di Numana. Tour di 2 o 3 ore con aperitivo, soste bagno alle Due Sorelle, feste in barca. Skipper del posto, massimo 12 persone.',
  },
  nav: {
    items: [
      { id: 'esperienze', label: 'Esperienze' },
      { id: 'flotta', label: 'La flotta' },
      { id: 'coste', label: 'Le calette' },
      { id: 'feste', label: 'Feste in barca' },
      { id: 'equipaggio', label: 'Equipaggio' },
      { id: 'contatti', label: 'Contatti' },
    ],
    book: 'Prenota',
  },
  hero: {
    eyebrow: 'Numana · Riviera del Conero',
    title: ['Il Conero', 'dal mare', 'cambia prospettiva'],
    lead:
      'Falesie bianche a picco sull’acqua, grotte e calette che nessuna strada raggiunge. Si salpa dal porto di Numana con uno skipper che quel tratto di costa lo conosce onda per onda.',
    primary: 'Prenota su WhatsApp',
    secondary: 'Guarda le esperienze',
    scroll: 'Scorri',
    stats: [
      { value: 4.9, suffix: '/5', label: 'Recensioni Google' },
      { value: 12, suffix: '', label: 'Ospiti a bordo' },
      { value: 2, suffix: '', label: 'Barche in flotta' },
      { value: 10, suffix: '+', label: 'Calette raggiunte' },
    ],
  },
  intro: {
    kicker: 'Chi siamo',
    title: 'Una costa che si racconta solo dall’acqua',
    body: [
      'Model Nautica nasce a Numana, in fondo al Conero, dove la montagna finisce dentro il mare e la sabbia lascia il posto alla roccia. Da qui portiamo i nostri ospiti lungo la riviera con due barche moderne, poche persone a bordo e nessuna fretta.',
      'Non facciamo giri a orario fisso su un percorso rigido: l’itinerario si adatta al mare del giorno, alla luce e a quello che avete voglia di vedere. Ci si ferma dove l’acqua è più limpida, si fa il bagno, si brinda al tramonto e si torna in porto con la pelle salata.',
    ],
    highlights: [
      { title: 'Skipper del posto', text: 'Chi guida la barca è cresciuto su questa costa e conosce ogni anfratto.' },
      { title: 'Gruppi piccoli', text: 'Massimo 12 ospiti: mai la sensazione di stare su un traghetto.' },
      { title: 'Itinerario flessibile', text: 'Rotta e soste si decidono insieme, in base a meteo e desideri.' },
      { title: 'Aperitivo incluso', text: 'Vino del territorio, bibite fresche e stuzzichini serviti a bordo.' },
    ],
  },
  tours: {
    kicker: 'Le esperienze',
    title: 'Due ore o tre ore, sempre con aperitivo',
    lead:
      'Ogni uscita si può prenotare in condivisione, dividendo la barca con altri ospiti, oppure in esclusiva: la barca è solo vostra e l’itinerario lo decidete voi.',
    priceNote: 'Prezzi indicativi di partenza. Il costo finale dipende da stagione, orario e formula scelta.',
    items: [
      {
        id: 'tour-2h',
        badge: 'Il classico',
        title: 'Tour 2 ore',
        duration: '≈ 2 ore',
        prices: [
          { label: 'Posto singolo', value: 'da 40 €', note: 'a persona, barca condivisa' },
          { label: 'Barca in esclusiva', value: 'da 300 €', note: 'fino a 12 ospiti' },
        ],
        text:
          'La navigata essenziale: si costeggiano le spiagge di Numana e Sirolo e si arriva davanti alle Due Sorelle, i due faraglioni che sono il simbolo del Conero. Una o due soste bagno in acqua smeraldo, aperitivo a bordo e rientro.',
        includes: ['Soste bagno', 'Aperitivo con vino locale', 'Snack e bibite', 'Racconto della costa'],
        stops: ['Numana', 'Sirolo', 'Due Sorelle'],
      },
      {
        id: 'tour-3h',
        badge: 'Il più richiesto',
        title: 'Tour 3 ore',
        duration: '≈ 3 ore',
        prices: [
          { label: 'Posto singolo', value: 'da 40 €', note: 'a persona, barca condivisa' },
          { label: 'Barca in esclusiva', value: 'da 300 €', note: 'fino a 12 ospiti' },
        ],
        text:
          'La riviera per intero: dallo Scoglio del Frate a San Michele, poi le Due Sorelle, la baia di Portonovo e lo Scoglio del Trave. Più tempo significa più soste bagno, più calette e il tempo di ascoltare le storie di chi qui ci naviga da sempre.',
        includes: ['Più soste bagno', 'Aperitivo con vino locale', 'Piscina galleggiante in esclusiva', 'Snorkeling al Trave'],
        stops: ['Scoglio del Frate', 'San Michele', 'Due Sorelle', 'Portonovo', 'Scoglio del Trave'],
      },
    ],
    slots: {
      title: 'Quando si parte',
      text: 'Tre finestre al giorno, ognuna con la sua luce.',
      list: [
        { time: 'Mattina', text: 'Mare piatto, acqua fredda e trasparente, poche barche in giro.' },
        { time: 'Pomeriggio', text: 'Il momento migliore per fare il bagno e restare in acqua a lungo.' },
        { time: 'Tramonto', text: 'La falesia diventa arancione e l’aperitivo si beve controluce.' },
      ],
    },
    cta: 'Chiedi disponibilità',
  },
  fleet: {
    kicker: 'La flotta',
    title: 'Stella Maris 1 e Stella Maris 2',
    lead:
      'Due motobarche gemelle, entrambe del 2019, pensate per stare comodi tutto il tempo: sedute imbottite, tendalino per l’ombra e doccia per sciacquarsi dopo il bagno.',
    boats: [
      { id: 'sm1', name: 'Stella Maris 1' },
      { id: 'sm2', name: 'Stella Maris 2' },
    ],
    specs: [
      { label: 'Modello', value: 'Stella Maris 700' },
      { label: 'Anno', value: '2019' },
      { label: 'Motore', value: 'Honda 200 CV' },
      { label: 'Capienza', value: '12 ospiti + skipper' },
    ],
    features: [
      { title: 'Doccia di bordo', text: 'Acqua dolce per togliere il sale appena risaliti.' },
      { title: 'Tendalino parasole', text: 'Zona d’ombra sempre disponibile anche a mezzogiorno.' },
      { title: 'Sedute imbottite', text: 'Prendisole e cuscineria su tutta la coperta.' },
      { title: 'Gavone coperto', text: 'Borse, zaini e telefoni restano all’asciutto.' },
    ],
  },
  beaches: {
    kicker: 'La costa',
    title: 'Le calette del Conero',
    lead:
      'Alcune di queste spiagge si raggiungono solo dal mare. Tocca un punto della costa per scoprirle una a una.',
    hint: 'Seleziona una caletta',
    items: [
      {
        id: 'portonovo',
        name: 'Baia di Portonovo',
        text: 'Ciottoli bianchi e macchia mediterranea che arriva fino alla riva: la baia più celebre del promontorio, chiusa tra il verde del monte e l’azzurro dell’Adriatico.',
        tag: 'Baia',
      },
      {
        id: 'trave',
        name: 'Scoglio del Trave',
        text: 'Una lingua di roccia che entra in mare per centinaia di metri come un molo naturale. Punto di riferimento per chi ama snorkeling e immersioni.',
        tag: 'Snorkeling',
      },
      {
        id: 'mezzavalle',
        name: 'Mezzavalle',
        text: 'Lunga e selvaggia, a nord del promontorio. Poche strutture, molto silenzio e un paesaggio rimasto pressoché intatto.',
        tag: 'Selvaggia',
      },
      {
        id: 'gabbiani',
        name: 'Spiaggia dei Gabbiani',
        text: 'Ghiaia e ciottoli sotto la falesia, raggiungibile soltanto via mare. Una delle soste più riservate di tutto l’itinerario.',
        tag: 'Solo via mare',
      },
      {
        id: 'due-sorelle',
        name: 'Spiaggia delle Due Sorelle',
        text: 'I due faraglioni gemelli e l’acqua trasparente che li circonda: l’immagine simbolo del Conero, premiata nel 2020 dalla guida Lonely Planet.',
        tag: 'Icona',
      },
      {
        id: 'libri',
        name: 'Spiaggia dei Libri',
        text: 'Il nome viene dalla roccia, disposta in strati inclinati che sembrano volumi impilati uno sull’altro.',
        tag: 'Geologia',
      },
      {
        id: 'frate',
        name: 'Spiaggia del Frate',
        text: 'Acqua bassa e limpida, con il masso chiamato “Sasso del bo’” che emerge poco al largo. Sosta comoda anche per le famiglie.',
        tag: 'Famiglie',
      },
      {
        id: 'vela',
        name: 'Scoglio della Vela',
        text: 'Un grande scoglio dal profilo che ricorda una vela spiegata, ciottoli levigati e fondale trasparente.',
        tag: 'Panorama',
      },
      {
        id: 'san-michele',
        name: 'San Michele e Sassi Neri',
        text: 'Due tratti contigui e opposti: San Michele attrezzata e frequentata, Sassi Neri riconoscibile dalle rocce scure sulla battigia.',
        tag: 'Sirolo',
      },
      {
        id: 'urbani',
        name: 'Spiaggia Urbani',
        text: 'Una piccola insenatura riparata sotto il paese di Sirolo, delimitata da una grotta e da un pontile.',
        tag: 'Riparata',
      },
    ],
  },
  parties: {
    kicker: 'Eventi',
    title: 'Feste in barca',
    lead:
      'Addio al nubilato e al celibato, compleanni, lauree, anniversari. La barca diventa il posto della festa e la costa il fondale: nessun vicino di tavolo, nessun orario di chiusura.',
    items: [
      { title: 'Addio al nubilato / celibato', text: 'Musica, brindisi e bagno al largo con il gruppo tutto per sé.' },
      { title: 'Compleanni', text: 'Un pomeriggio in mare al posto della solita cena, torta compresa se la portate.' },
      { title: 'Lauree', text: 'Si festeggia navigando, con l’aperitivo servito davanti alle Due Sorelle.' },
      { title: 'Occasioni speciali', text: 'Anniversari, proposte, rimpatriate: l’allestimento si concorda insieme.' },
    ],
    note: 'Barca in esclusiva fino a 12 ospiti. Raccontaci che festa hai in mente e costruiamo l’uscita su misura.',
    cta: 'Organizza la tua festa',
  },
  crew: {
    kicker: 'A bordo',
    title: 'L’equipaggio',
    lead: 'Poche persone, sempre le stesse. È anche per questo che il tour non sembra mai un servizio a catalogo.',
    people: [
      { name: 'Giuseppe', role: 'Skipper', text: 'Anni di miglia su questa costa e un racconto pronto per ogni scoglio.' },
      { name: 'Eros', role: 'Skipper', text: 'Sceglie le soste in base al vento del giorno e sa dove l’acqua è più limpida.' },
      { name: 'Cristina', role: 'Accoglienza e prenotazioni', text: 'Risponde ai messaggi, organizza i gruppi e vi accoglie in banchina.' },
    ],
  },
  practical: {
    kicker: 'Prima di salire',
    title: 'Informazioni utili',
    items: [
      { title: 'Prenotazione', text: 'Si prenota su WhatsApp o al telefono. Confermiamo disponibilità e orario in giornata.' },
      { title: 'Ritrovo', text: 'Zona avamporto sud del porto di Numana, in Piazzale Silvio Massaccesi. Meglio arrivare 15 minuti prima.' },
      { title: 'Cosa portare', text: 'Costume, telo, crema solare, cappello e scarpe comode. A bordo c’è la doccia.' },
      { title: 'Meteo e mare', text: 'Se le condizioni non permettono di navigare in sicurezza, l’uscita viene riprogrammata insieme.' },
    ],
  },
  contact: {
    kicker: 'Contatti',
    title: 'Saliamo a bordo?',
    lead: 'Scrivici su WhatsApp con data, numero di persone e fascia oraria: ti rispondiamo con la disponibilità.',
    labels: {
      phone: 'Telefono',
      whatsapp: 'WhatsApp',
      email: 'Email',
      marina: 'Punto d’imbarco',
      office: 'Sede amministrativa',
      hours: 'Stagione',
    },
    hours: 'Escursioni nella stagione estiva, tutti i giorni compatibilmente con il meteo.',
    form: {
      title: 'Richiesta di prenotazione',
      name: 'Nome e cognome',
      email: 'Email',
      phone: 'Telefono',
      date: 'Data desiderata',
      people: 'Numero di persone',
      tour: 'Esperienza',
      tourOptions: ['Tour 2 ore', 'Tour 3 ore', 'Festa in barca', 'Non so ancora'],
      message: 'Messaggio',
      messagePlaceholder: 'Fascia oraria preferita, occasione, richieste particolari…',
      submit: 'Invia su WhatsApp',
      privacy: 'Il modulo apre WhatsApp con il messaggio già compilato: nessun dato viene salvato su questo sito.',
      required: 'Compila i campi obbligatori.',
    },
  },
  footer: {
    tagline: 'Escursioni in barca sulla Riviera del Conero, dal porto di Numana.',
    nav: 'Naviga',
    legal: 'Informazioni',
    rights: 'Tutti i diritti riservati.',
    network: 'Rete d’imprese',
    credits: 'Sito realizzato con Node.js e Anime.js.',
  },
  ui: {
    lang: 'Lingua',
    close: 'Chiudi',
    menu: 'Menu',
    loading: 'Mollo gli ormeggi…',
  },
};

const en = {
  meta: {
    title: 'Model Nautica — Boat tours along the Conero Riviera | Numana, Italy',
    description:
      'Boat excursions along the Conero Riviera departing from Numana harbour. Two or three hour tours with aperitivo, swim stops at Due Sorelle, private parties on board. Local skippers, up to 12 guests.',
  },
  nav: {
    items: [
      { id: 'esperienze', label: 'Experiences' },
      { id: 'flotta', label: 'The fleet' },
      { id: 'coste', label: 'The coves' },
      { id: 'feste', label: 'Parties' },
      { id: 'equipaggio', label: 'Crew' },
      { id: 'contatti', label: 'Contact' },
    ],
    book: 'Book',
  },
  hero: {
    eyebrow: 'Numana · Conero Riviera',
    title: ['The Conero', 'from the sea', 'looks different'],
    lead:
      'White cliffs dropping straight into the water, caves and coves no road will ever reach. We cast off from Numana harbour with a skipper who knows this stretch of coast wave by wave.',
    primary: 'Book on WhatsApp',
    secondary: 'See the experiences',
    scroll: 'Scroll',
    stats: [
      { value: 4.9, suffix: '/5', label: 'Google reviews' },
      { value: 12, suffix: '', label: 'Guests on board' },
      { value: 2, suffix: '', label: 'Boats in the fleet' },
      { value: 10, suffix: '+', label: 'Coves reached' },
    ],
  },
  intro: {
    kicker: 'About us',
    title: 'A coastline that only opens up from the water',
    body: [
      'Model Nautica is based in Numana, at the foot of Monte Conero, where the mountain ends inside the sea and sand gives way to rock. From here we take our guests along the riviera on two modern boats, with few people on board and no rush at all.',
      'These are not fixed-route tours on a stopwatch: the itinerary follows the sea of the day, the light and whatever you feel like seeing. We stop where the water is clearest, swim, toast the sunset and head back with salt on our skin.',
    ],
    highlights: [
      { title: 'Local skippers', text: 'The person at the helm grew up on this coast and knows every inlet.' },
      { title: 'Small groups', text: 'Twelve guests maximum — never the feeling of being on a ferry.' },
      { title: 'Flexible route', text: 'Course and stops are decided together, based on weather and wishes.' },
      { title: 'Aperitivo included', text: 'Local wine, cold drinks and snacks served on board.' },
    ],
  },
  tours: {
    kicker: 'Experiences',
    title: 'Two hours or three, aperitivo either way',
    lead:
      'Every trip can be booked as a shared ride, sharing the boat with other guests, or as a private charter: the boat is yours and so is the route.',
    priceNote: 'Indicative starting prices. The final rate depends on season, time slot and the option you choose.',
    items: [
      {
        id: 'tour-2h',
        badge: 'The classic',
        title: '2 hour tour',
        duration: '≈ 2 hours',
        prices: [
          { label: 'Single seat', value: 'from €40', note: 'per person, shared boat' },
          { label: 'Private charter', value: 'from €300', note: 'up to 12 guests' },
        ],
        text:
          'The essential run: we follow the beaches of Numana and Sirolo and reach Due Sorelle, the twin sea stacks that stand for the whole Conero. One or two swim stops in emerald water, aperitivo on board and back to port.',
        includes: ['Swim stops', 'Aperitivo with local wine', 'Snacks and drinks', 'Stories of the coast'],
        stops: ['Numana', 'Sirolo', 'Due Sorelle'],
      },
      {
        id: 'tour-3h',
        badge: 'Most booked',
        title: '3 hour tour',
        duration: '≈ 3 hours',
        prices: [
          { label: 'Single seat', value: 'from €40', note: 'per person, shared boat' },
          { label: 'Private charter', value: 'from €300', note: 'up to 12 guests' },
        ],
        text:
          'The whole riviera: from Scoglio del Frate to San Michele, then Due Sorelle, Portonovo bay and Scoglio del Trave. More time means more swim stops, more coves and room for the stories of people who have sailed here forever.',
        includes: ['More swim stops', 'Aperitivo with local wine', 'Floating pool on private charter', 'Snorkelling at Trave'],
        stops: ['Scoglio del Frate', 'San Michele', 'Due Sorelle', 'Portonovo', 'Scoglio del Trave'],
      },
    ],
    slots: {
      title: 'Departure times',
      text: 'Three slots a day, each with its own light.',
      list: [
        { time: 'Morning', text: 'Flat sea, cold clear water and very few boats around.' },
        { time: 'Afternoon', text: 'The best window for swimming and staying in the water.' },
        { time: 'Sunset', text: 'The cliff turns orange and the aperitivo is drunk against the light.' },
      ],
    },
    cta: 'Check availability',
  },
  fleet: {
    kicker: 'The fleet',
    title: 'Stella Maris 1 and Stella Maris 2',
    lead:
      'Two identical motorboats, both built in 2019 and set up for comfort: padded seating, a canopy for shade and a shower to rinse off after a swim.',
    boats: [
      { id: 'sm1', name: 'Stella Maris 1' },
      { id: 'sm2', name: 'Stella Maris 2' },
    ],
    specs: [
      { label: 'Model', value: 'Stella Maris 700' },
      { label: 'Year', value: '2019' },
      { label: 'Engine', value: 'Honda 200 hp' },
      { label: 'Capacity', value: '12 guests + skipper' },
    ],
    features: [
      { title: 'On-board shower', text: 'Fresh water to wash off the salt as soon as you climb back in.' },
      { title: 'Sun canopy', text: 'Shade available at any hour, midday included.' },
      { title: 'Padded seating', text: 'Sun pads and cushions across the whole deck.' },
      { title: 'Covered locker', text: 'Bags, backpacks and phones stay dry.' },
    ],
  },
  beaches: {
    kicker: 'The coast',
    title: 'The coves of the Conero',
    lead: 'Some of these beaches can only be reached from the sea. Tap a point on the coast to discover them one by one.',
    hint: 'Select a cove',
    items: [
      { id: 'portonovo', name: 'Portonovo Bay', text: 'White pebbles and Mediterranean scrub running down to the shore: the most famous bay of the headland, held between the green of the mountain and the blue of the Adriatic.', tag: 'Bay' },
      { id: 'trave', name: 'Scoglio del Trave', text: 'A tongue of rock reaching hundreds of metres out to sea like a natural pier. A landmark for snorkellers and divers.', tag: 'Snorkelling' },
      { id: 'mezzavalle', name: 'Mezzavalle', text: 'Long and wild, north of the headland. Few facilities, a lot of silence and a landscape left almost untouched.', tag: 'Wild' },
      { id: 'gabbiani', name: 'Spiaggia dei Gabbiani', text: 'Gravel and pebbles under the cliff, reachable only by sea. One of the most secluded stops of the whole route.', tag: 'Sea access only' },
      { id: 'due-sorelle', name: 'Due Sorelle', text: 'The twin stacks and the clear water around them: the defining image of the Conero, singled out in 2020 by the Lonely Planet guide.', tag: 'Icon' },
      { id: 'libri', name: 'Spiaggia dei Libri', text: 'The name comes from the rock itself, layered at an angle like books stacked on a shelf.', tag: 'Geology' },
      { id: 'frate', name: 'Spiaggia del Frate', text: 'Shallow, clear water with the boulder known as “Sasso del bo’” emerging just offshore. An easy stop for families too.', tag: 'Families' },
      { id: 'vela', name: 'Scoglio della Vela', text: 'A large rock shaped like an open sail, smooth pebbles and transparent shallows.', tag: 'Views' },
      { id: 'san-michele', name: 'San Michele and Sassi Neri', text: 'Two neighbouring stretches with opposite characters: San Michele serviced and busy, Sassi Neri marked by dark rocks along the shoreline.', tag: 'Sirolo' },
      { id: 'urbani', name: 'Spiaggia Urbani', text: 'A small sheltered inlet below the village of Sirolo, closed off by a cave and a small pier.', tag: 'Sheltered' },
    ],
  },
  parties: {
    kicker: 'Events',
    title: 'Parties on board',
    lead:
      'Hen and stag parties, birthdays, graduations, anniversaries. The boat becomes the venue and the coast the backdrop: no table neighbours, no closing time.',
    items: [
      { title: 'Hen & stag parties', text: 'Music, toasts and a swim offshore with the group all to yourselves.' },
      { title: 'Birthdays', text: 'An afternoon at sea instead of the usual dinner — cake included, if you bring it.' },
      { title: 'Graduations', text: 'Celebrate under way, with the aperitivo served in front of Due Sorelle.' },
      { title: 'Special occasions', text: 'Anniversaries, proposals, reunions: we agree on the setup together.' },
    ],
    note: 'Private charter for up to 12 guests. Tell us what you have in mind and we build the trip around it.',
    cta: 'Plan your party',
  },
  crew: {
    kicker: 'On board',
    title: 'The crew',
    lead: 'A handful of people, always the same ones. That is part of why the tour never feels off the shelf.',
    people: [
      { name: 'Giuseppe', role: 'Skipper', text: 'Years of miles along this coast and a story ready for every rock.' },
      { name: 'Eros', role: 'Skipper', text: 'Picks the stops by the wind of the day and knows where the water runs clearest.' },
      { name: 'Cristina', role: 'Guest services & bookings', text: 'Answers the messages, arranges the groups and welcomes you on the quay.' },
    ],
  },
  practical: {
    kicker: 'Before you board',
    title: 'Useful information',
    items: [
      { title: 'Booking', text: 'Book on WhatsApp or by phone. We confirm availability and time slot the same day.' },
      { title: 'Meeting point', text: 'South outer-harbour area of Numana port, Piazzale Silvio Massaccesi. Best to arrive 15 minutes early.' },
      { title: 'What to bring', text: 'Swimsuit, towel, sunscreen, hat and comfortable shoes. There is a shower on board.' },
      { title: 'Weather and sea', text: 'If conditions do not allow safe navigation, we reschedule the trip together.' },
    ],
  },
  contact: {
    kicker: 'Contact',
    title: 'Shall we cast off?',
    lead: 'Message us on WhatsApp with the date, number of people and preferred time slot — we reply with availability.',
    labels: {
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      email: 'Email',
      marina: 'Departure point',
      office: 'Registered office',
      hours: 'Season',
    },
    hours: 'Excursions run through the summer season, daily, weather permitting.',
    form: {
      title: 'Booking request',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      date: 'Preferred date',
      people: 'Number of guests',
      tour: 'Experience',
      tourOptions: ['2 hour tour', '3 hour tour', 'Party on board', 'Not sure yet'],
      message: 'Message',
      messagePlaceholder: 'Preferred time slot, occasion, special requests…',
      submit: 'Send on WhatsApp',
      privacy: 'The form opens WhatsApp with the message already written: no data is stored on this site.',
      required: 'Please fill in the required fields.',
    },
  },
  footer: {
    tagline: 'Boat excursions along the Conero Riviera, from Numana harbour.',
    nav: 'Navigate',
    legal: 'Information',
    rights: 'All rights reserved.',
    network: 'Business network',
    credits: 'Built with Node.js and Anime.js.',
  },
  ui: {
    lang: 'Language',
    close: 'Close',
    menu: 'Menu',
    loading: 'Casting off…',
  },
};

export const CONTENT = { it, en };
export const LANGS = ['it', 'en'];
