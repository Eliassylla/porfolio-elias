import { z } from "zod";

import {
  type AvailableDay,
  type BookingConfirmation,
  type CustomBookingRequest,
} from "@/components/booking/bookingIntake";

const availabilityResponseSchema = z.object({
  data: z.array(
    z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      slots: z.array(
        z.object({
          start: z.string().datetime({ offset: true }),
          time: z.string().regex(/^\d{2}:\d{2}$/),
          label: z.string().min(5).max(40),
        }),
      ),
    }),
  ),
});

const bookingResponseSchema = z.object({
  data: z.object({
    uid: z.string().nullable(),
    start: z.string().datetime({ offset: true }),
    status: z.string(),
  }),
});

const errorResponseSchema = z.object({ error: z.string() });

async function callBookingApi(
  body: unknown,
  signal?: AbortSignal,
): Promise<unknown> {
  const response = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const parsedError = errorResponseSchema.safeParse(payload);
    throw new Error(
      parsedError.success
        ? parsedError.data.error
        : "Le service de réservation est momentanément indisponible.",
    );
  }

  return payload;
}

export async function fetchAvailability(
  timeZone: string,
  signal?: AbortSignal,
): Promise<AvailableDay[]> {
  const start = new Date();
  start.setMinutes(0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 30);

  const payload = await callBookingApi(
    {
      action: "availability",
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      timeZone,
    },
    signal,
  );

  return availabilityResponseSchema.parse(payload).data.map(({ date, slots }) => ({
    date: date!,
    slots: slots!.map((slot) => ({
      start: slot.start!,
      time: slot.time!,
      label: slot.label!,
    })),
  }));
}

export async function submitBooking(
  request: CustomBookingRequest,
): Promise<BookingConfirmation> {
  const payload = await callBookingApi(request);
  const confirmation = bookingResponseSchema.parse(payload).data;
  return {
    uid: confirmation.uid ?? null,
    start: confirmation.start!,
    status: confirmation.status!,
  };
}
