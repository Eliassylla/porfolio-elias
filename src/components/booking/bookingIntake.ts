import { z } from "zod";

import {
  type Attribution,
  toCalBookingFields,
} from "@/lib/attribution/capture";

export const bookingIntakeSchema = z.object({
  companyContext: z
    .string()
    .trim()
    .min(3, "Précisez brièvement votre activité.")
    .max(160, "Restez sous 160 caractères."),
  operationalProblem: z
    .string()
    .trim()
    .min(10, "Décrivez le processus en quelques mots.")
    .max(800, "Restez sous 800 caractères."),
  currentTools: z.string().trim().max(240, "Restez sous 240 caractères."),
  desiredOutcome: z
    .string()
    .trim()
    .min(10, "Précisez le résultat que vous recherchez.")
    .max(800, "Restez sous 800 caractères."),
});

export type BookingIntake = z.infer<typeof bookingIntakeSchema>;

export const EMPTY_INTAKE: BookingIntake = {
  companyContext: "",
  operationalProblem: "",
  currentTools: "",
  desiredOutcome: "",
};

export function toCalIntakeConfig(intake: BookingIntake): Record<string, string> {
  return {
    company_context: intake.companyContext,
    operational_problem: intake.operationalProblem,
    current_tools: intake.currentTools || "none",
    desired_outcome: intake.desiredOutcome,
  };
}

export const bookingAttendeeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom.")
    .max(120, "Restez sous 120 caractères."),
  email: z.string().trim().email("Saisissez une adresse email valide."),
});

export type BookingAttendee = z.infer<typeof bookingAttendeeSchema>;

export interface AvailableDay {
  date: string;
  slots: AvailableSlot[];
}

export interface AvailableSlot {
  start: string;
  time: string;
  label: string;
}

export interface CustomBookingRequest {
  action: "book";
  start: string;
  timeZone: string;
  attendee: BookingAttendee;
  bookingFieldsResponses: Record<string, string>;
}

export interface BookingConfirmation {
  uid: string | null;
  start: string;
  status: string;
}

interface BuildBookingRequestInput {
  attribution: Attribution;
  intake: BookingIntake;
  attendee: BookingAttendee;
  start: string;
  timeZone: string;
}

export function buildBookingRequest({
  attribution,
  intake,
  attendee,
  start,
  timeZone,
}: BuildBookingRequestInput): CustomBookingRequest {
  const selectedStart = new Date(start);

  if (Number.isNaN(selectedStart.getTime())) {
    throw new Error("Créneau invalide");
  }

  return {
    action: "book",
    start: selectedStart.toISOString(),
    timeZone,
    attendee,
    bookingFieldsResponses: {
      ...toCalBookingFields(attribution),
      ...toCalIntakeConfig(intake),
    },
  };
}
