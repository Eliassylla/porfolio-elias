/**
 * Couche de persistance de l'attribution — implémente la section « Durée de vie »
 * de `specs/attribution/utm-contract.md`.
 *
 * C'est la seule partie non pure du module : elle touche `sessionStorage` et
 * `window`. Elle reçoit son stockage en paramètre pour rester testable, et
 * **ne lève jamais** — une page qui casse parce que la télémétrie a échoué est
 * un défaut plus grave que la télémétrie manquante.
 */

import {
  type Attribution,
  defaultAttribution,
  parseAttribution,
  resolveAttribution,
} from "./capture";

/** Clé de session. Le suffixe de version accompagne `attr_version`. */
export const ATTRIBUTION_STORAGE_KEY = "portfolio.attr.v1";

/** Sous-ensemble de `Storage` réellement utilisé, pour faciliter les tests. */
export type AttributionStorage = Pick<Storage, "getItem" | "setItem">;

export interface CaptureContext {
  search: string;
  referrer: string;
  pathname: string;
  /** `null` si le stockage est indisponible (navigation privée, stockage bloqué). */
  storage: AttributionStorage | null;
}

/**
 * Lit l'attribution stockée. Renvoie `null` si le stockage est inaccessible ou
 * si son contenu n'est pas du JSON — la validation du contrat, elle, est faite
 * par `resolveAttribution`.
 */
function readStored(storage: AttributionStorage | null): unknown {
  if (!storage) return null;

  try {
    const raw = storage.getItem(ATTRIBUTION_STORAGE_KEY);
    return raw === null ? null : JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeStored(storage: AttributionStorage | null, value: Attribution): void {
  if (!storage) return;

  try {
    storage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Quota dépassé ou stockage en lecture seule : l'attribution reste
    // utilisable en mémoire pour cette page.
  }
}

/**
 * Capture l'attribution de la session : premier toucher conservé, nouvelle
 * capture sinon, puis persistance au mieux.
 *
 * Idempotente par construction — rappeler cette fonction sur une session déjà
 * attribuée renvoie la même valeur.
 */
export function captureAttribution(context: CaptureContext): Attribution {
  const incoming = parseAttribution(
    context.search,
    context.referrer,
    context.pathname,
  );
  const resolved = resolveAttribution(readStored(context.storage), incoming);

  writeStored(context.storage, resolved);

  return resolved;
}

/**
 * Variante liée au navigateur, à appeler une fois au montage de l'application.
 *
 * L'accès à `window.sessionStorage` est lui-même protégé : dans certaines
 * configurations de blocage, la simple lecture de la propriété lève.
 */
export function captureAttributionFromWindow(): Attribution {
  if (typeof window === "undefined") return defaultAttribution();

  let storage: AttributionStorage | null = null;
  try {
    storage = window.sessionStorage;
  } catch {
    storage = null;
  }

  return captureAttribution({
    search: window.location.search,
    referrer: document.referrer,
    pathname: window.location.pathname,
    storage,
  });
}
