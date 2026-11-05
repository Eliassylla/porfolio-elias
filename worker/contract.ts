import { z } from "zod";

export const CAL_EVENT_TYPE_ID = 5_777_679;
export const CAL_EVENT_TYPE_SLUG = "decouverte";
export const CAL_USERNAME = "elias-sylla";
export const CAL_SLOTS_API_VERSION = "2024-09-04";
export const CAL_BOOKINGS_API_VERSION = "2026-02-25";

const isTimeZone = (value: string) => {
  try {
    new Intl.DateTimeFormat("fr-FR", { timeZone: value }).format();
    return true;
  } catch {
    return false;
  }
};

const timeZoneSchema = z
  .string()
  .min(1)
  .max(80)
  .refine(isTimeZone, "Fuseau horaire invalide");

const attributionSchema = z
  .object({
    utm_source: z.string().max(64),
    utm_medium: z.string().max(64),
    utm_campaign: z.string().max(64),
    utm_content: z.string().max(64),
    landing_path: z.string().max(64),
    referrer_host: z.string().max(64),
  })
  .strict();

const intakeSchema = z
  .object({
    company_context: z.string().min(3).max(160),
    operational_problem: z.string().min(10).max(800),
    current_tools: z.string().max(240),
    desired_outcome: z.string().min(10).max(800),
  })
  .strict();

export const availabilityRequestSchema = z
  .object({
    action: z.literal("availability"),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    timeZone: timeZoneSchema,
  })
  .strict()
  .refine(
    ({ startTime, endTime }) => {
      const start = Date.parse(startTime);
      const end = Date.parse(endTime);
      return end > start && end - start <= 31 * 24 * 60 * 60 * 1_000;
    },
    { message: "La période demandée doit couvrir au maximum 31 jours." },
  );

export const bookingRequestSchema = z
  .object({
    action: z.literal("book"),
    start: z.string().datetime(),
    timeZone: timeZoneSchema,
    attendee: z
      .object({
        name: z.string().trim().min(2).max(120),
        email: z.string().trim().email().max(254),
      })
      .strict(),
    bookingFieldsResponses: attributionSchema.merge(intakeSchema).strict(),
  })
  .strict();

export const bookingApiRequestSchema = z.union([
  availabilityRequestSchema,
  bookingRequestSchema,
]);

export type AvailabilityRequest = z.infer<typeof availabilityRequestSchema>;
export type BookingRequest = z.infer<typeof bookingRequestSchema>;
export type BookingApiRequest = z.infer<typeof bookingApiRequestSchema>;

const calSlotsResponseSchema = z.object({
  data: z.record(
    z.string(),
    z.array(
      z
        .object({
          start: z.string().datetime({ offset: true }),
        })
        .passthrough(),
    ),
  ),
});

export interface AvailableDay {
  date: string;
  slots: AvailableSlot[];
}

export interface AvailableSlot {
  start: string;
  time: string;
  label: string;
}

function formatSlot(start: string, timeZone: string) {
  const date = new Date(start);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    date: `${value("year")}-${value("month")}-${value("day")}`,
    time: `${value("hour")}:${value("minute")}`,
  };
}

function formatOffset(start: string, timeZone: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone,
    timeZoneName: "shortOffset",
  })
    .formatToParts(new Date(start))
    .find((part) => part.type === "timeZoneName")?.value;
}

export function parseCalAvailability(
  payload: unknown,
  timeZone: string,
): { days: AvailableDay[]; starts: string[] } {
  const parsed = calSlotsResponseSchema.parse(payload);
  const starts = Object.values(parsed.data)
    .flat()
    .map(({ start }) => new Date(start).toISOString())
    .sort();
  const days = new Map<string, AvailableSlot[]>();

  for (const start of starts) {
    const slot = formatSlot(start, timeZone);
    const daySlots = days.get(slot.date) ?? [];
    daySlots.push({ start, time: slot.time, label: slot.time });
    days.set(slot.date, daySlots);
  }

  return {
    days: Array.from(days, ([date, slots]) => ({
      date,
      slots: slots.map((slot) => {
        const repeated = slots.filter(({ time }) => time === slot.time).length > 1;
        const offset = repeated ? formatOffset(slot.start, timeZone) : null;
        return {
          ...slot,
          label: offset ? `${slot.time} (${offset})` : slot.time,
        };
      }),
    })).sort((left, right) => left.date.localeCompare(right.date)),
    starts,
  };
}

export function buildCalAvailabilityRequest(
  request: AvailabilityRequest,
  apiKey: string,
) {
  const url = new URL("https://api.cal.com/v2/slots");
  url.searchParams.set("start", request.startTime);
  url.searchParams.set("end", request.endTime);
  url.searchParams.set("eventTypeSlug", CAL_EVENT_TYPE_SLUG);
  url.searchParams.set("username", CAL_USERNAME);
  url.searchParams.set("timeZone", request.timeZone);

  return {
    url,
    init: {
      headers: {
        "cal-api-version": CAL_SLOTS_API_VERSION,
        Authorization: `Bearer ${apiKey}`,
      },
    } satisfies RequestInit,
  };
}

export function buildCalBookingRequest(request: BookingRequest, apiKey: string) {
  return {
    url: new URL("https://api.cal.com/v2/bookings"),
    init: {
      method: "POST",
      headers: {
        "cal-api-version": CAL_BOOKINGS_API_VERSION,
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        start: request.start,
        attendee: {
          ...request.attendee,
          timeZone: request.timeZone,
          language: "fr",
        },
        eventTypeId: CAL_EVENT_TYPE_ID,
        eventTypeSlug: CAL_EVENT_TYPE_SLUG,
        username: CAL_USERNAME,
        bookingFieldsResponses: request.bookingFieldsResponses,
      }),
    } satisfies RequestInit,
  };
}

export function availabilityWindowAround(start: string, timeZone: string) {
  const selected = new Date(start);
  const oneHour = 60 * 60 * 1_000;

  return availabilityRequestSchema.parse({
    action: "availability",
    startTime: new Date(selected.getTime() - oneHour).toISOString(),
    endTime: new Date(selected.getTime() + oneHour).toISOString(),
    timeZone,
  });
}
