// Courbes et repères repris des vidéos du studio (Video Animation/productions/chatgpt-video/Commun).
// Les durées sont en images à 30 i/s, comme dans After Effects : 9 * F = 9 images.

export const F = 1 / 30;

// Courbe de Bézier comme dans l'éditeur de vitesse d'After Effects (même calcul que la vidéo).
export function bz(a: number, b: number, c: number, d: number) {
  const f = (t: number, x: number, y: number) => 3 * (1 - t) ** 2 * t * x + 3 * (1 - t) * t * t * y + t * t * t;
  return (p: number) => {
    if (p <= 0) return 0;
    if (p >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = p;
    for (let i = 0; i < 32; i++) {
      if (f(t, a, c) < p) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return f(t, b, d);
  };
}

export const ARRIVE = bz(0.333, 0, 0, 0.64);
export const OPEN = bz(0.82, 0, 0.18, 1);
export const MID = bz(0.65, 0, 0.35, 1);
export const OUT = bz(0.3, 0, 0.25, 1);

// Préfixe les id d'un SVG importé pour qu'ils ne se mélangent pas à ceux de la page.
export function prefixSvgIds(svg: string, prefix: string) {
  return svg
    .replace(/<\?xml[^>]*>/, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\sid="([^"]+)"/g, ` id="${prefix}$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${prefix}$1"`);
}
