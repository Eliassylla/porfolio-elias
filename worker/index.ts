import {
  availabilityWindowAround,
  bookingApiRequestSchema,
  buildCalAvailabilityRequest,
  buildCalBookingRequest,
  parseCalAvailability,
  type AvailabilityRequest,
  type BookingRequest,
} from "./contract.js";
import { z } from "zod";

interface Env {
  ASSETS: Fetcher;
  CAL_API_KEY: string;
}

type FetchImplementation = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

const responseHeaders = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};

const calBookingResponseSchema = z.object({
  status: z.literal("success"),
  data: z.object({
    uid: z.string().min(1),
    start: z.string().datetime({ offset: true }),
    status: z.string().min(1),
  }),
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders,
  });
}

async function readLimitedBody(request: Request, maxBytes: number) {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytesRead = 0;
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) return text + decoder.decode();

    bytesRead += value.byteLength;
    if (bytesRead > maxBytes) {
      await reader.cancel("body_too_large");
      return null;
    }
    text += decoder.decode(value, { stream: true });
  }
}

async function readCalJson(response: Response) {
  if (!response.ok) {
    // Le message d'erreur de Cal.com dit quel champ il refuse ; tronqué pour ne pas recopier toute la demande.
    const detail = (await response.text().catch(() => "")).slice(0, 600);
    console.error("Cal.com request failed", {
      status: response.status,
      statusText: response.statusText,
      detail,
    });
    throw new Error(`CAL_${response.status}`);
  }

  return response.json() as Promise<unknown>;
}

async function requestAvailability(
  request: AvailabilityRequest,
  fetcher: FetchImplementation,
  apiKey: string,
) {
  const calRequest = buildCalAvailabilityRequest(request, apiKey);
  const response = await fetcher(calRequest.url, calRequest.init);
  const payload = await readCalJson(response);
  return parseCalAvailability(payload, request.timeZone);
}

async function createBooking(
  request: BookingRequest,
  fetcher: FetchImplementation,
  apiKey: string,
) {
  const availability = await requestAvailability(
    availabilityWindowAround(request.start, request.timeZone),
    fetcher,
    apiKey,
  );

  if (!availability.starts.includes(request.start)) {
    return json(
      { error: "Ce créneau n’est plus disponible. Choisissez-en un autre." },
      409,
    );
  }

  const calRequest = buildCalBookingRequest(request, apiKey);
  const response = await fetcher(calRequest.url, calRequest.init);
  const payload = calBookingResponseSchema.parse(await readCalJson(response));

  return json({
    data: {
      uid: payload.data.uid,
      start: payload.data.start,
      status: payload.data.status,
    },
  });
}

export function createBookingApiHandler(
  fetcher: FetchImplementation = fetch,
  apiKey = "",
) {
  return async function handleBookingApi(request: Request): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: { Allow: "POST, OPTIONS" },
      });
    }

    if (request.method !== "POST") {
      return json({ error: "Méthode non autorisée" }, 405);
    }

    if (!apiKey) {
      return json({ error: "Service de réservation non configuré" }, 503);
    }

    const origin = request.headers.get("Origin");
    if (origin && origin !== new URL(request.url).origin) {
      return json({ error: "Origine non autorisée" }, 403);
    }

    const contentLength = Number(request.headers.get("Content-Length") ?? 0);
    if (contentLength > 16_384) {
      return json({ error: "Requête trop volumineuse" }, 413);
    }

    let rawBody: unknown;
    try {
      const body = await readLimitedBody(request, 16_384);
      if (body === null) {
        return json({ error: "Requête trop volumineuse" }, 413);
      }
      rawBody = JSON.parse(body);
    } catch {
      return json({ error: "Corps JSON invalide" }, 400);
    }

    const parsed = bookingApiRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      return json({ error: "Données de réservation invalides" }, 400);
    }

    try {
      if (parsed.data.action === "availability") {
        const availability = await requestAvailability(
          parsed.data,
          fetcher,
          apiKey,
        );
        return json({ data: availability.days });
      }

      return await createBooking(parsed.data, fetcher, apiKey);
    } catch (error) {
      console.error("Booking API error", error);
      return json(
        { error: "Le service de réservation est momentanément indisponible." },
        502,
      );
    }
  };
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/booking") {
      return createBookingApiHandler(fetch, env.CAL_API_KEY)(request);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
