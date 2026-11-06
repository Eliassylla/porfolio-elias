// Courbes des sections du Portfolio. Même contenu que src/lib/motion-curves.ts dans le Portfolio :
// changer l'un, c'est changer l'autre. Durées en images à 30 i/s (9 * F = 9 images).
const F = 1 / 30;
function bz(a, b, c, d) {
  const f = (t, x, y) => 3 * (1 - t) ** 2 * t * x + 3 * (1 - t) * t * t * y + t * t * t;
  return p => { if (p <= 0) return 0; if (p >= 1) return 1; let lo = 0, hi = 1, t = p;
    for (let i = 0; i < 32; i++) { if (f(t, a, c) < p) lo = t; else hi = t; t = (lo + hi) / 2; } return f(t, b, d); };
}
const ARRIVE = bz(.333, 0, 0, .64), OPEN = bz(.82, 0, .18, 1), MID = bz(.65, 0, .35, 1), OUT = bz(.3, 0, .25, 1);

export { F, bz, ARRIVE };
