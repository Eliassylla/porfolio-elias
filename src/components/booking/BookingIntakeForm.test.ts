import { describe, expect, it } from "vitest";

import { defaultAttribution } from "@/lib/attribution/capture";

import {
  buildBookingRequest,
  toCalIntakeConfig,
} from "./bookingIntake";

const intake = {
  companyContext: "Cabinet comptable, 4 personnes",
  operationalProblem: "Relances de factures manuelles",
  currentTools: "Gmail et Excel",
  desiredOutcome: "Ne plus oublier de relance",
};

describe("toCalIntakeConfig", () => {
  it("projette les quatre réponses vers des slugs Cal.com stables", () => {
    expect(
      toCalIntakeConfig(intake),
    ).toEqual({
      company_context: "Cabinet comptable, 4 personnes",
      operational_problem: "Relances de factures manuelles",
      current_tools: "Gmail et Excel",
      desired_outcome: "Ne plus oublier de relance",
    });
  });

  it("émet une valeur exploitable quand les outils sont omis", () => {
    expect(
      toCalIntakeConfig({
        companyContext: "Consultant indépendant",
        operationalProblem: "Suivi commercial dispersé",
        currentTools: "",
        desiredOutcome: "Centraliser les prochaines actions",
      }).current_tools,
    ).toBe("none");
  });
});

describe("buildBookingRequest", () => {
  it("prépare la réservation Cal.com avec qualification et attribution", () => {
    const request = buildBookingRequest({
      attribution: {
        ...defaultAttribution(),
        utm_source: "linkedin",
        utm_medium: "social",
        utm_campaign: "audit-agentique",
      },
      intake,
      attendee: { name: "Ada Lovelace", email: "ada@example.com" },
      start: "2026-08-12T09:30:00.000Z",
      timeZone: "Africa/Casablanca",
    });

    expect(request).toMatchObject({
      action: "book",
      timeZone: "Africa/Casablanca",
      attendee: { name: "Ada Lovelace", email: "ada@example.com" },
    });
    expect(request.start).toBe("2026-08-12T09:30:00.000Z");
    expect(request.bookingFieldsResponses).toEqual({
      utm_source: "linkedin",
      utm_medium: "social",
      utm_campaign: "audit-agentique",
      utm_content: "none",
      landing_path: "/",
      referrer_host: "none",
      company_context: intake.companyContext,
      operational_problem: intake.operationalProblem,
      current_tools: intake.currentTools,
      desired_outcome: intake.desiredOutcome,
    });
  });

  it("refuse un créneau invalide", () => {
    expect(() =>
      buildBookingRequest({
        attribution: defaultAttribution(),
        intake,
        attendee: { name: "Ada Lovelace", email: "ada@example.com" },
        start: "date-invalide",
        timeZone: "UTC",
      }),
    ).toThrow("Créneau invalide");
  });
});
