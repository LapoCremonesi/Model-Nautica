/**
 * Mare animato dell'hero, disegnato su canvas.
 * Somma di sinusoidi con fasi diverse: nessuna texture, tutto procedurale,
 * così il file resta leggero e si adatta a qualsiasi risoluzione.
 */

const LAYERS = [
  { amp: 14, len: 0.0042, speed: 0.00034, y: 0.28, color: 'rgba(46,166,169,0.55)' },
  { amp: 20, len: 0.0031, speed: -0.00027, y: 0.44, color: 'rgba(23,124,142,0.7)' },
  { amp: 26, len: 0.0022, speed: 0.00019, y: 0.6, color: 'rgba(12,86,106,0.85)' },
  { amp: 32, len: 0.0016, speed: -0.00013, y: 0.78, color: 'rgba(6,48,66,0.95)' },
];

export function initSea(canvas) {
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return () => {};

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0;
  let h = 0;
  let dpr = 1;
  let raf = 0;
  let running = true;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    w = Math.max(rect.width, 1);
    h = Math.max(rect.height, 1);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawLayer(layer, time) {
    const baseY = h * layer.y;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, baseY);
    const step = 8;
    for (let x = 0; x <= w; x += step) {
      const y =
        baseY +
        Math.sin(x * layer.len + time * layer.speed) * layer.amp +
        Math.sin(x * layer.len * 2.3 + time * layer.speed * 1.7) * (layer.amp * 0.35);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = layer.color;
    ctx.fill();
  }

  function drawGlints(time) {
    // Riflessi di luce sulla superficie
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 26; i++) {
      const seed = i * 137.5;
      const x = ((seed * 7.3 + time * 0.012 * ((i % 3) + 1)) % (w + 120)) - 60;
      const layer = LAYERS[i % LAYERS.length];
      const y =
        h * layer.y +
        Math.sin(x * layer.len + time * layer.speed) * layer.amp -
        2;
      const alpha = 0.05 + 0.05 * Math.abs(Math.sin(time * 0.0009 + i));
      ctx.fillStyle = `rgba(190,244,236,${alpha})`;
      ctx.fillRect(x, y, 16 + (i % 5) * 8, 1.4);
    }
    ctx.restore();
  }

  function frame(time) {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    LAYERS.forEach((layer) => drawLayer(layer, time));
    drawGlints(time);
    raf = requestAnimationFrame(frame);
  }

  resize();

  if (reduced) {
    // Un solo fotogramma statico
    LAYERS.forEach((layer) => drawLayer(layer, 0));
  } else {
    raf = requestAnimationFrame(frame);
  }

  const onResize = () => {
    resize();
    if (reduced) {
      ctx.clearRect(0, 0, w, h);
      LAYERS.forEach((layer) => drawLayer(layer, 0));
    }
  };
  window.addEventListener('resize', onResize, { passive: true });

  // Sospende il loop quando l'hero non è visibile: niente CPU sprecata.
  const io = new IntersectionObserver(
    ([entry]) => {
      if (reduced) return;
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    },
    { threshold: 0 }
  );
  io.observe(canvas);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener('resize', onResize);
  };
}
