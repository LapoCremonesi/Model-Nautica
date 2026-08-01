/**
 * Server di produzione: serve la build statica di Vite (cartella dist/).
 * Avvio:  npm run build && npm start
 */
import express from 'express';
import compression from 'compression';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;

if (!fs.existsSync(dist)) {
  console.error('\n  Cartella dist/ non trovata. Esegui prima:  npm run build\n');
  process.exit(1);
}

const app = express();
app.disable('x-powered-by');
app.use(compression());

app.use(
  express.static(dist, {
    index: 'index.html',
    setHeaders(res, filePath) {
      // Gli asset hanno l'hash nel nome: cache lunga. L'HTML no.
      if (/\.(js|css|woff2?|svg|webp|avif|png|jpe?g)$/.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  })
);

// Il sito è una single page: qualsiasi rotta ricade su index.html.
app.use((req, res) => {
  res.status(200).sendFile(path.join(dist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  Model Nautica  →  http://localhost:${PORT}\n`);
});
