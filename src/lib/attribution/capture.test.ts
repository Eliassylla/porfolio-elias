import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  type Attribution,
  ATTRIBUTION_VERSION,
  MAX_FIELD_LENGTH,
  isAttribution,
  parseAttribution,
  resolveAttribution,
  toCalConfig,
} from "./capture";
import {
  ATTRIBUTION_STORAGE_KEY,
  type AttributionStorage,
  captureAttribution,
} from "./session";

/**
 * Les fixtures sont lues depuis le disque plutôt qu'importées : elles décrivent
 * un contrat, elles n'ont rien à faire dans le bundle de production.
 */
const FIXTURES_DIR = path.resolve(__dirname, "../../../specs/fixtures");

interface Fixture {
  name: string;
  description: string;
  stored?: Attribution;
  input: { search: string; referrer: string; pathname: string };
  expected: Attribution;
}

function loadFixture(name: string): Fixture {
  const file = path.join(FIXTURES_DIR, `landing.${name}.json`);
  return JSON.parse(readFileSync(file, "utf8")) as Fixture;
}

const FIXTURE_NAMES = [
  "utm_full",
  "no_utm",
  "partial_utm",
  "second_touch",
  "hostile_input",
  "pii",
] as const;

/** Stockage en mémoire, pour tester la persistance sans navigateur. */
function memoryStorage(initial?: string): AttributionStorage {
  let value = initial ?? null;
  return {
    getItem: () => value,
    setItem: (_key: string, next: string) => {
      value = next;
    },
  };
}

/** Stockage qui échoue à chaque accès — navigation privée, stockage bloqué. */
function hostileStorage(): AttributionStorage {
  return {
    getItem: () => {
      throw new Error("stockage bloqué");
    },
    setItem: () => {
      throw new Error("stockage bloqué");
    },
  };
}

describe("fixtures du contrat d'attribution", () => {
  for (const name of FIXTURE_NAMES) {
    it(`respecte la fixture ${name}`, () => {
      const fixture = loadFixture(name);
      const incoming = parseAttribution(
        fixture.input.search,
        fixture.input.referrer,
        fixture.input.pathname,
      );
      const actual = resolveAttribution(fixture.stored ?? null, incoming);

      expect(actual).toEqual(fixture.expected);
    });
  }
});

describe("garde-fous du contrat", () => {
  it("n'émet jamais de valeur vide ni nulle, quelle que soit la fixture", () => {
    for (const name of FIXTURE_NAMES) {
      const fixture = loadFixture(name);
      const actual = resolveAttribution(
        fixture.stored ?? null,
        parseAttribution(
          fixture.input.search,
          fixture.input.referrer,
          fixture.input.pathname,
        ),
      );

      for (const [field, value] of Object.entries(toCalConfig(actual))) {
        expect(value, `${name}.${field}`).toBeTruthy();
        expect(typeof value, `${name}.${field}`).toBe("string");
      }
    }
  });

  it("n'émet aucun caractère hors liste blanche", () => {
    for (const name of FIXTURE_NAMES) {
      const fixture = loadFixture(name);
      const actual = resolveAttribution(
        fixture.stored ?? null,
        parseAttribution(
          fixture.input.search,
          fixture.input.referrer,
          fixture.input.pathname,
        ),
      );

      for (const [field, value] of Object.entries(toCalConfig(actual))) {
        expect(value, `${name}.${field}`).toMatch(/^[a-z0-9._/-]+$/);
      }
    }
  });

  it("ne laisse passer aucun @, y compris encodé", () => {
    const actual = parseAttribution(
      "?utm_source=a%40b.com&utm_medium=c@d.fr&utm_campaign=ok",
      "",
      "/",
    );

    expect(actual.utm_source).toBe("direct");
    expect(actual.utm_medium).toBe("none");
    expect(actual.utm_campaign).toBe("ok");
    expect(JSON.stringify(actual)).not.toContain("@");
  });

  it("tronque à 64 caractères une valeur de 5000", () => {
    const long = "spam-".repeat(1000);
    const actual = parseAttribution(`?utm_campaign=${long}`, "", "/");

    expect(actual.utm_campaign).toHaveLength(MAX_FIELD_LENGTH);
    expect(long.startsWith(actual.utm_campaign)).toBe(true);
  });

  it("ne laisse jamais la query entrer dans landing_path", () => {
    const actual = parseAttribution("", "", "/services?token=secret#frag");

    expect(actual.landing_path).toBe("/services");
    expect(actual.landing_path).not.toContain("secret");
  });

  it("réduit le référent à son hostname", () => {
    const actual = parseAttribution(
      "",
      "https://mail.google.com/mail/u/0/#inbox/private-thread",
      "/",
    );

    expect(actual.referrer_host).toBe("mail.google.com");
    expect(actual.referrer_host).not.toContain("private-thread");
  });

  it("retombe sur le défaut quand le référent n'est pas une URL", () => {
    expect(parseAttribution("", "pas-une-url", "/").referrer_host).toBe("none");
  });
});

describe("premier toucher", () => {
  it("conserve une attribution stockée valide", () => {
    const stored = loadFixture("second_touch").stored!;
    const incoming = parseAttribution("?utm_source=twitter", "", "/services");

    expect(resolveAttribution(stored, incoming)).toEqual(stored);
  });

  it("ignore un stockage corrompu au profit de la nouvelle capture", () => {
    const incoming = parseAttribution("?utm_source=twitter", "", "/");

    for (const corrupted of [
      null,
      "pas un objet",
      {},
      { utm_source: "linkedin" },
      { ...incoming, attr_version: 99 },
      { ...incoming, utm_source: "" },
    ]) {
      expect(resolveAttribution(corrupted, incoming)).toEqual(incoming);
    }
  });

  it("reconnaît une attribution valide de la version courante", () => {
    const valid = parseAttribution("?utm_source=linkedin", "", "/");

    expect(isAttribution(valid)).toBe(true);
    expect(valid.attr_version).toBe(ATTRIBUTION_VERSION);
  });
});

describe("persistance de session", () => {
  it("écrit l'attribution sous la clé du contrat", () => {
    const storage = memoryStorage();
    const captured = captureAttribution({
      search: "?utm_source=linkedin",
      referrer: "",
      pathname: "/",
      storage,
    });

    expect(captured.utm_source).toBe("linkedin");
    expect(JSON.parse(storage.getItem(ATTRIBUTION_STORAGE_KEY)!)).toEqual(captured);
  });

  it("est idempotente : le second appel ne change rien", () => {
    const storage = memoryStorage();
    const first = captureAttribution({
      search: "?utm_source=linkedin&utm_medium=post",
      referrer: "",
      pathname: "/",
      storage,
    });
    const second = captureAttribution({
      search: "?utm_source=twitter&utm_medium=bio",
      referrer: "",
      pathname: "/services",
      storage,
    });

    expect(second).toEqual(first);
  });

  it("dégrade sans lever quand le stockage est indisponible", () => {
    const captured = captureAttribution({
      search: "?utm_source=linkedin",
      referrer: "",
      pathname: "/",
      storage: hostileStorage(),
    });

    expect(captured.utm_source).toBe("linkedin");
  });

  it("dégrade sans lever quand il n'y a aucun stockage", () => {
    const captured = captureAttribution({
      search: "?utm_source=linkedin",
      referrer: "",
      pathname: "/",
      storage: null,
    });

    expect(captured.utm_source).toBe("linkedin");
  });

  it("ignore un contenu stocké qui n'est pas du JSON", () => {
    const captured = captureAttribution({
      search: "?utm_source=linkedin",
      referrer: "",
      pathname: "/",
      storage: memoryStorage("{ceci n'est pas du json"),
    });

    expect(captured.utm_source).toBe("linkedin");
  });
});
