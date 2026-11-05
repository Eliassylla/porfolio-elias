import { describe, expect, it, vi } from "vitest";

import { createBookingApiHandler } from "./index";

const fields = {
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

function apiRequest(body: unknown) {
  return new Request("https://portfolio.example/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("Worker de réservation", () => {
  it("retourne les disponibilités normalisées", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      Response.json({
        data: {
          "2026-08-12": [{ start: "2026-08-12T08:00:00.000Z" }],
        },
      }),
    );
    const handler = createBookingApiHandler(fetcher, "cal_test");
    const response = await handler(
      apiRequest({
        action: "availability",
        startTime: "2026-08-11T00:00:00.000Z",
        endTime: "2026-08-21T23:59:59.000Z",
        timeZone: "Africa/Casablanca",
      }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      data: [
        {
          date: "2026-08-12",
          slots: [
            {
              start: "2026-08-12T08:00:00.000Z",
              time: "09:00",
              label: "09:00",
            },
          ],
        },
      ],
    });
  });

  it("revérifie le créneau avant de créer la réservation", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json({
          data: {
            "2026-08-12": [{ start: "2026-08-12T09:30:00.000Z" }],
          },
        }),
      )
      .mockResolvedValueOnce(
        Response.json({
          status: "success",
          data: {
            uid: "test-booking-uid",
            start: "2026-08-12T09:30:00.000Z",
            status: "accepted",
          },
        }),
      );
    const handler = createBookingApiHandler(fetcher, "cal_test");
    const response = await handler(
      apiRequest({
        action: "book",
        start: "2026-08-12T09:30:00.000Z",
        timeZone: "UTC",
        attendee: { name: "Ada Lovelace", email: "ada@example.com" },
        bookingFieldsResponses: fields,
      }),
    );

    expect(response.status).toBe(200);
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(await response.json()).toEqual({
      data: {
        uid: "test-booking-uid",
        start: "2026-08-12T09:30:00.000Z",
        status: "accepted",
      },
    });
  });

  it("ne crée rien si le créneau vient de disparaître", async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ data: {} }));
    const handler = createBookingApiHandler(fetcher, "cal_test");
    const response = await handler(
      apiRequest({
        action: "book",
        start: "2026-08-12T09:30:00.000Z",
        timeZone: "UTC",
        attendee: { name: "Ada Lovelace", email: "ada@example.com" },
        bookingFieldsResponses: fields,
      }),
    );

    expect(response.status).toBe(409);
    expect(fetcher).toHaveBeenCalledOnce();
  });

  it("refuse une origine tierce et un payload incomplet", async () => {
    const handler = createBookingApiHandler(vi.fn(), "cal_test");
    const foreignRequest = apiRequest({ action: "availability" });
    foreignRequest.headers.set("Origin", "https://attacker.example");

    expect((await handler(foreignRequest)).status).toBe(403);
    expect((await handler(apiRequest({ action: "availability" }))).status).toBe(
      400,
    );
  });

  it("refuse de confirmer une réponse Cal.com incomplète", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json({
          data: {
            "2026-08-12": [{ start: "2026-08-12T09:30:00.000Z" }],
          },
        }),
      )
      .mockResolvedValueOnce(Response.json({ status: "success", data: {} }));
    const handler = createBookingApiHandler(fetcher, "cal_test");
    const response = await handler(
      apiRequest({
        action: "book",
        start: "2026-08-12T09:30:00.000Z",
        timeZone: "UTC",
        attendee: { name: "Ada Lovelace", email: "ada@example.com" },
        bookingFieldsResponses: fields,
      }),
    );

    expect(response.status).toBe(502);
  });

  it("mesure le corps même sans Content-Length", async () => {
    const handler = createBookingApiHandler(vi.fn(), "cal_test");
    const request = new Request("https://portfolio.example/api/booking", {
      method: "POST",
      body: JSON.stringify({ payload: "x".repeat(17_000) }),
    });
    request.headers.delete("Content-Length");

    expect((await handler(request)).status).toBe(413);
  });
});
