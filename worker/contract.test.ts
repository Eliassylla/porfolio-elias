import { describe, expect, it } from "vitest";

import {
  availabilityRequestSchema,
  bookingApiRequestSchema,
  buildCalAvailabilityRequest,
  buildCalBookingRequest,
  CAL_BOOKINGS_API_VERSION,
  CAL_EVENT_TYPE_ID,
  CAL_SLOTS_API_VERSION,
  parseCalAvailability,
} from "./contract";

const bookingFieldsResponses = {
  utm_source: "linkedin",
  utm_medium: "social",
  utm_campaign: "audit-agentique",
  utm_content: "hero",
  landing_path: "/",
  referrer_host: "linkedin.com",
  company_context: "Cabinet comptable, 4 personnes",
  operational_problem: "Les relances sont encore manuelles.",
  current_tools: "Gmail et Excel",
  desired_outcome: "Ne plus oublier aucune relance.",
};

describe("contrat Cloudflare → Cal.com", () => {
  it("fixe l’événement public lors de la lecture des créneaux", () => {
    const request = availabilityRequestSchema.parse({
      action: "availability",
      startTime: "2026-08-11T00:00:00.000Z",
      endTime: "2026-08-21T23:59:59.000Z",
      timeZone: "Africa/Casablanca",
    });
    const calRequest = buildCalAvailabilityRequest(request, "cal_test");

    expect(calRequest.url.origin + calRequest.url.pathname).toBe(
      "https://api.cal.com/v2/slots",
    );
    expect(calRequest.url.searchParams.get("eventTypeSlug")).toBe("decouverte");
    expect(calRequest.url.searchParams.get("username")).toBe("elias-sylla");
    expect(calRequest.init.headers).toEqual({
      "cal-api-version": CAL_SLOTS_API_VERSION,
      Authorization: "Bearer cal_test",
    });
  });

  it("projette une réservation vers le payload natif Cal.com", () => {
    const request = bookingApiRequestSchema.parse({
      action: "book",
      start: "2026-08-12T09:30:00.000Z",
      timeZone: "Africa/Casablanca",
      attendee: { name: "Ada Lovelace", email: "ada@example.com" },
      bookingFieldsResponses,
    });

    if (request.action !== "book") throw new Error("Action inattendue");
    const calRequest = buildCalBookingRequest(request, "cal_test");
    const body = JSON.parse(String(calRequest.init.body));

    expect(calRequest.url.toString()).toBe("https://api.cal.com/v2/bookings");
    expect(calRequest.init.headers).toMatchObject({
      "cal-api-version": CAL_BOOKINGS_API_VERSION,
    });
    expect(body).toMatchObject({
      eventTypeId: CAL_EVENT_TYPE_ID,
      eventTypeSlug: "decouverte",
      username: "elias-sylla",
      attendee: {
        name: "Ada Lovelace",
        email: "ada@example.com",
        timeZone: "Africa/Casablanca",
        language: "fr",
      },
      bookingFieldsResponses,
    });
  });

  it("normalise les créneaux UTC dans le fuseau du visiteur", () => {
    const availability = parseCalAvailability(
      {
        data: {
          "2026-08-12": [
            { start: "2026-08-12T08:00:00.000Z" },
            { start: "2026-08-12T08:30:00.000Z" },
          ],
        },
      },
      "Africa/Casablanca",
    );

    expect(availability.days).toEqual([
      {
        date: "2026-08-12",
        slots: [
          { start: "2026-08-12T08:00:00.000Z", time: "09:00", label: "09:00" },
          { start: "2026-08-12T08:30:00.000Z", time: "09:30", label: "09:30" },
        ],
      },
    ]);
    expect(availability.starts).toEqual([
      "2026-08-12T08:00:00.000Z",
      "2026-08-12T08:30:00.000Z",
    ]);
  });

  it("accepte les décalages horaires renvoyés par Cal.com", () => {
    const availability = parseCalAvailability(
      {
        data: {
          "2026-08-12": [{ start: "2026-08-12T09:00:00.000+01:00" }],
        },
      },
      "Africa/Casablanca",
    );

    expect(availability.days).toEqual([
      {
        date: "2026-08-12",
        slots: [
          { start: "2026-08-12T08:00:00.000Z", time: "09:00", label: "09:00" },
        ],
      },
    ]);
    expect(availability.starts).toEqual(["2026-08-12T08:00:00.000Z"]);
  });

  it("conserve deux instants distincts pendant une heure répétée", () => {
    const availability = parseCalAvailability(
      {
        data: {
          "2026-11-01": [
            { start: "2026-11-01T05:30:00.000Z" },
            { start: "2026-11-01T06:30:00.000Z" },
          ],
        },
      },
      "America/New_York",
    );

    const slots = availability.days[0]?.slots ?? [];
    expect(slots.map(({ start }) => start)).toEqual([
      "2026-11-01T05:30:00.000Z",
      "2026-11-01T06:30:00.000Z",
    ]);
    expect(new Set(slots.map(({ label }) => label)).size).toBe(2);
  });

  it("refuse les champs et périodes hors contrat", () => {
    expect(() =>
      availabilityRequestSchema.parse({
        action: "availability",
        startTime: "2026-08-01T00:00:00.000Z",
        endTime: "2026-10-01T00:00:00.000Z",
        timeZone: "Africa/Casablanca",
        eventTypeSlug: "autre-evenement",
      }),
    ).toThrow();
  });
});
