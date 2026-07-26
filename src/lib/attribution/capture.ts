/**
 * Capture du contexte d'acquisition — implémente `specs/attribution/utm-contract.md`.
 *
 * Ces fonctions sont pures : elles reçoivent leurs entrées en paramètres et ne
 * touchent ni au DOM, ni au réseau, ni à l'horloge. C'est ce qui les rend
 * testables hors navigateur. La lecture de `window` et de `sessionStorage` vit
 * dans `session.ts`.
 */

/** Version du contrat. À incrémenter si la forme des champs change. */
export const ATTRIBUTION_VERSION = 1;

/** Longueur maximale de chaque champ, troncature comprise (contrat R3). */
export const MAX_FIELD_LENGTH = 64;

export interface Attribution {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  landing_path: string;
  referrer_host: string;
  attr_version: number;
}

const DEFAULTS: Attribution = {
  utm_source: "direct",
  utm_medium: "none",
  utm_campaign: "none",
  utm_content: "none",
  landing_path: "/",
  referrer_host: "none",
  attr_version: ATTRIBUTION_VERSION,
};

/** Champs texte du contrat, dans l'ordre. Sert aussi de garde de validation. */
const TEXT_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "landing_path",
  "referrer_host",
] as const;

export function defaultAttribution(): Attribution {
  return { ...DEFAULTS };
}

/**
 * Assainit une valeur selon le contrat (R2 à R5).
 *
 * L'ordre compte. Le rejet des données personnelles précède l'assainissement :
 * retirer le `@` de `jean.dupont@exemple.fr` donnerait `jean.dupontexemple.fr`,
 * qui passerait la liste blanche tout en restant une donnée personnelle.
 * La troncature vient en dernier, pour ne pas couper au milieu d'une séquence
 * que l'assainissement aurait de toute façon retirée.
 *
 * @param disallowed Négation de la liste blanche du champ : ce qui matche est retiré.
 * @returns La valeur assainie, ou `null` si elle doit prendre son défaut.
 */
function sanitize(raw: unknown, disallowed: RegExp): string | null {
  if (typeof raw !== "string") return null;

  const trimmed = raw.trim();
  if (trimmed === "") return null;

  // R5 — rejet, pas assainissement.
  if (trimmed.includes("@")) return null;

  const cleaned = trimmed
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(disallowed, "")
    .slice(0, MAX_FIELD_LENGTH);

  return cleaned === "" ? null : cleaned;
}

// Négations des listes blanches du contrat R4 : ce qui matche est retiré.
const NOT_SLUG = /[^a-z0-9._-]/g;
const NOT_PATH = /[^a-z0-9._/-]/g;
const NOT_HOST = /[^a-z0-9.-]/g;

function sanitizeSlug(raw: unknown, fallback: string): string {
  return sanitize(raw, NOT_SLUG) ?? fallback;
}

/**
 * Réduit un pathname à un chemin seul (contrat : jamais la query).
 *
 * Une query ou un fragment glissés dans le pathname sont coupés avant
 * assainissement — sinon leurs valeurs se retrouveraient concaténées au chemin.
 */
function sanitizePath(raw: unknown): string {
  if (typeof raw !== "string") return DEFAULTS.landing_path;

  const pathOnly = raw.split(/[?#]/)[0];
  const cleaned = sanitize(pathOnly, NOT_PATH);
  if (cleaned === null) return DEFAULTS.landing_path;

  return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
}

/**
 * Extrait le hostname d'un référent (contrat R6).
 *
 * Le chemin d'une page référente peut être sensible — un document interne, une
 * recherche, une URL privée — et n'apporte rien à l'attribution. Seul le
 * hostname est conservé. Un référent non parsable donne le défaut.
 */
function sanitizeReferrerHost(raw: unknown): string {
  if (typeof raw !== "string" || raw.trim() === "") return DEFAULTS.referrer_host;

  let host: string;
  try {
    host = new URL(raw).hostname;
  } catch {
    return DEFAULTS.referrer_host;
  }

  return sanitize(host, NOT_HOST) ?? DEFAULTS.referrer_host;
}

/**
 * Construit une attribution normalisée à partir des entrées d'atterrissage.
 *
 * Toutes les entrées sont considérées comme hostiles : `search` et `referrer`
 * sont contrôlés par un tiers.
 */
export function parseAttribution(
  search: string,
  referrer: string,
  pathname: string,
): Attribution {
  const params = new URLSearchParams(search ?? "");

  return {
    utm_source: sanitizeSlug(params.get("utm_source"), DEFAULTS.utm_source),
    utm_medium: sanitizeSlug(params.get("utm_medium"), DEFAULTS.utm_medium),
    utm_campaign: sanitizeSlug(params.get("utm_campaign"), DEFAULTS.utm_campaign),
    utm_content: sanitizeSlug(params.get("utm_content"), DEFAULTS.utm_content),
    landing_path: sanitizePath(pathname),
    referrer_host: sanitizeReferrerHost(referrer),
    attr_version: ATTRIBUTION_VERSION,
  };
}

/**
 * Vérifie qu'une valeur inconnue — typiquement lue depuis `sessionStorage` —
 * est bien une attribution de la version courante du contrat.
 *
 * Sans cette garde, un stockage corrompu ou écrit par une version antérieure
 * gagnerait indéfiniment sur toute nouvelle capture (contrat R1).
 */
export function isAttribution(value: unknown): value is Attribution {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Record<string, unknown>;
  if (candidate.attr_version !== ATTRIBUTION_VERSION) return false;

  return TEXT_FIELDS.every(
    (field) => typeof candidate[field] === "string" && candidate[field] !== "",
  );
}

/**
 * Applique la règle du premier toucher (contrat R1).
 *
 * Une attribution déjà stockée et valide l'emporte sur toute nouvelle capture :
 * on veut savoir ce qui a amené le visiteur, pas la dernière page qu'il a vue.
 */
export function resolveAttribution(
  stored: unknown,
  incoming: Attribution,
): Attribution {
  return isAttribution(stored) ? stored : incoming;
}

/**
 * Projette une attribution vers les clés attendues par le `config` de l'embed
 * Cal.com, qui les transmet aux questions de réservation cachées.
 *
 * Si ces questions n'existent pas encore côté Cal.com, les clés sont ignorées
 * sans erreur — le câblage est donc sûr à déployer avant la configuration.
 */
export function toCalConfig(attribution: Attribution): Record<string, string> {
  return {
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_content: attribution.utm_content,
    landing_path: attribution.landing_path,
    referrer_host: attribution.referrer_host,
  };
}
