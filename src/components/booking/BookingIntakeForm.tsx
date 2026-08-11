import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Globe2,
  Video,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroPortrait from "@/assets/hero-portrait-real.jpg";
import {
  type AvailableDay,
  type AvailableSlot,
  bookingAttendeeSchema,
  bookingIntakeSchema,
  type BookingAttendee,
  type BookingConfirmation,
  type BookingIntake,
  type CustomBookingRequest,
  EMPTY_INTAKE,
} from "@/components/booking/bookingIntake";

interface BookingEventSummaryProps {
  selectedDate?: string | null;
  selectedTime?: string | null;
}

function formatSelectedDate(date: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${date}T12:00:00`));
}

export function BookingEventSummary({
  selectedDate,
  selectedTime,
}: BookingEventSummaryProps) {
  return (
    <aside className="flex flex-col gap-6 border-b border-border bg-muted/30 p-6 lg:border-b-0 lg:border-r lg:p-8">
      <div className="flex flex-col gap-3">
        <Avatar className="size-10">
          <AvatarImage
            src={heroPortrait}
            alt="Portrait d'Elias"
            className="object-cover object-[50%_15%]"
          />
          <AvatarFallback>ES</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-muted-foreground">Elias</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight">
            Échange découverte
          </h3>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          30 minutes pour comprendre votre blocage et identifier une première
          piste concrète.
        </p>
      </div>

      <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
        <li className="flex items-center gap-3">
          <Clock3 aria-hidden="true" className="size-4 shrink-0" />
          <span>30 minutes</span>
        </li>
        <li className="flex items-center gap-3">
          <Video aria-hidden="true" className="size-4 shrink-0" />
          <span>Google Meet</span>
        </li>
        <li className="flex items-center gap-3">
          <Globe2 aria-hidden="true" className="size-4 shrink-0" />
          <span>Votre fuseau horaire</span>
        </li>
        {selectedDate ? (
          <li className="flex items-start gap-3 text-foreground">
            <CalendarDays aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span className="capitalize">
              {formatSelectedDate(selectedDate)}
              {selectedTime ? ` à ${selectedTime}` : ""}
            </span>
          </li>
        ) : null}
      </ul>
    </aside>
  );
}

interface BookingIntakeFormProps {
  initialValues?: BookingIntake | null;
  onContinue: (intake: BookingIntake) => void;
}

export function BookingIntakeForm({
  initialValues,
  onContinue,
}: BookingIntakeFormProps) {
  const form = useForm<BookingIntake>({
    resolver: zodResolver(bookingIntakeSchema),
    defaultValues: initialValues ?? EMPTY_INTAKE,
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted-foreground">
            Étape 1 sur 3
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">
            Parlez-moi de votre besoin
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Ces réponses servent uniquement à préparer l’audit et seront
            associées à votre réservation.
          </p>
        </header>

        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onContinue)}
          >
              <FormField
                control={form.control}
                name="companyContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votre activité et votre équipe</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="organization"
                        placeholder="Ex. cabinet comptable, équipe de 4 personnes"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="operationalProblem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quel processus vous fait perdre le plus de temps ?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-24 resize-none"
                        placeholder="Ex. les relances de devis sont faites manuellement et certains prospects sont oubliés"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentTools"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quels outils utilisez-vous actuellement ?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex. Gmail, Excel, Notion, logiciel métier"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Facultatif</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desiredOutcome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quel résultat aimeriez-vous obtenir en priorité ?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-24 resize-none"
                        placeholder="Ex. gagner deux heures par semaine et ne plus oublier aucune relance"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-1">
                <Button type="submit" size="lg">
                  Choisir un créneau
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Button>
              </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

const WEEKDAYS = ["DIM.", "LUN.", "MAR.", "MER.", "JEU.", "VEN.", "SAM."];

interface BookingSlotPickerProps {
  availability: AvailableDay[];
  status: "idle" | "loading" | "ready" | "error";
  error: string | null;
  selectedDate: string;
  selectedStart: string | null;
  onSelectDate: (date: string) => void;
  onSelectSlot: (slot: AvailableSlot) => void;
  onBack: () => void;
  onContinue: () => void;
  onRetry: () => void;
}

export function BookingSlotPicker({
  availability,
  status,
  error,
  selectedDate,
  selectedStart,
  onSelectDate,
  onSelectSlot,
  onBack,
  onContinue,
  onRetry,
}: BookingSlotPickerProps) {
  const availableMonths = useMemo(
    () => Array.from(new Set(availability.map(({ date }) => date.slice(0, 7)))),
    [availability],
  );
  const selectedMonth = selectedDate.slice(0, 7);
  const [visibleMonth, setVisibleMonth] = useState(selectedMonth);

  useEffect(() => {
    if (selectedMonth) setVisibleMonth(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    if (!visibleMonth && availableMonths[0]) {
      setVisibleMonth(availableMonths[0]);
    }
  }, [availableMonths, visibleMonth]);

  const activeMonth = visibleMonth || availableMonths[0] || "2026-01";
  const activeDate = new Date(`${activeMonth}-01T12:00:00`);
  const year = activeDate.getFullYear();
  const month = activeDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingDays = new Date(year, month, 1).getDay();
  const availableDates = new Map(availability.map((day) => [day.date, day]));
  const selectedDay = availableDates.get(selectedDate);
  const visibleMonthIndex = availableMonths.indexOf(activeMonth);
  const calendarCells = [
    ...Array.from({ length: leadingDays }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  return (
    <div className="flex min-h-full flex-col gap-6 p-6 lg:p-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Étape 2 sur 3</p>
        <h2 className="text-2xl font-semibold tracking-tight">
          Choisissez votre créneau
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Les horaires sont synchronisés avec l’agenda d’Elias et affichés dans
          votre fuseau horaire.
        </p>
      </header>

      {status === "loading" ? (
        <div
          className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground"
          role="status"
        >
          Chargement des créneaux disponibles…
        </div>
      ) : status === "error" ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="max-w-md text-sm text-muted-foreground">
            {error ?? "Impossible de charger les créneaux disponibles."}
          </p>
          <Button type="button" variant="outline" onClick={onRetry}>
            Réessayer
          </Button>
        </div>
      ) : availability.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Aucun créneau n’est disponible dans les trente prochains jours.
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_14rem]">
        <section aria-label="Choisir une date" className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold capitalize">
              {new Intl.DateTimeFormat("fr-FR", {
                month: "long",
                year: "numeric",
              }).format(activeDate)}
            </h3>
            {availableMonths.length > 1 ? (
              <div className="flex gap-1">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled={visibleMonthIndex <= 0}
                  aria-label="Mois précédent"
                  onClick={() =>
                    setVisibleMonth(availableMonths[visibleMonthIndex - 1])
                  }
                >
                  <ChevronLeft aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled={visibleMonthIndex >= availableMonths.length - 1}
                  aria-label="Mois suivant"
                  onClick={() =>
                    setVisibleMonth(availableMonths[visibleMonthIndex + 1])
                  }
                >
                  <ChevronRight aria-hidden="true" />
                </Button>
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((weekday) => (
              <span
                key={weekday}
                className="py-2 text-xs font-medium text-muted-foreground"
              >
                {weekday}
              </span>
            ))}
            {calendarCells.map((day, index) => {
              if (day === null) {
                return <span key={`empty-${index}`} aria-hidden="true" />;
              }

              const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isAvailable = availableDates.has(date);
              const isSelected = date === selectedDate;

              return (
                <Button
                  key={date}
                  type="button"
                  size="icon"
                  variant={isSelected ? "default" : isAvailable ? "secondary" : "ghost"}
                  disabled={!isAvailable}
                  aria-pressed={isSelected}
                  aria-label={`${day} ${new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(activeDate)}`}
                  onClick={() => onSelectDate(date)}
                >
                  {day}
                </Button>
              );
            })}
          </div>
        </section>

        <section aria-label="Choisir une heure" className="flex flex-col gap-3">
          <h3 className="text-base font-semibold capitalize">
            {selectedDate ? formatSelectedDate(selectedDate) : "Sélectionnez une date"}
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-1">
            {selectedDay?.slots.map((slot) => (
              <Button
                key={slot.start}
                type="button"
                variant={selectedStart === slot.start ? "default" : "outline"}
                aria-pressed={selectedStart === slot.start}
                onClick={() => onSelectSlot(slot)}
              >
                {slot.label}
              </Button>
            ))}
          </div>
        </section>
      </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
        <Button type="button" variant="ghost" onClick={onBack}>
          <ArrowLeft data-icon="inline-start" aria-hidden="true" />
          Votre besoin
        </Button>
        <Button
          type="button"
          disabled={!selectedStart || status !== "ready"}
          onClick={onContinue}
        >
          Continuer
          <ArrowRight data-icon="inline-end" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

interface BookingDetailsFormProps {
  initialValues?: BookingAttendee | null;
  onBack: () => void;
  onConfirm: (attendee: BookingAttendee) => void | Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

const EMPTY_ATTENDEE: BookingAttendee = { name: "", email: "" };

export function BookingDetailsForm({
  initialValues,
  onBack,
  onConfirm,
  isSubmitting,
  error,
}: BookingDetailsFormProps) {
  const form = useForm<BookingAttendee>({
    resolver: zodResolver(bookingAttendeeSchema),
    defaultValues: initialValues ?? EMPTY_ATTENDEE,
  });

  return (
    <div className="flex min-h-full flex-col gap-6 p-6 lg:p-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Étape 3 sur 3</p>
        <h2 className="text-2xl font-semibold tracking-tight">Vos coordonnées</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Elles servent à créer le rendez-vous et à envoyer la confirmation.
        </p>
      </header>

      <Form {...form}>
        <form
          className="flex flex-1 flex-col gap-5"
          onSubmit={form.handleSubmit(onConfirm)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre nom</FormLabel>
                <FormControl>
                  <Input autoComplete="name" placeholder="Prénom et nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre adresse email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="vous@entreprise.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
            <Button
              type="button"
              variant="ghost"
              disabled={isSubmitting}
              onClick={onBack}
            >
              <ArrowLeft data-icon="inline-start" aria-hidden="true" />
              Le créneau
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Confirmation…" : "Confirmer le rendez-vous"}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </Form>
    </div>
  );
}

interface BookingSuccessProps {
  request: CustomBookingRequest;
  confirmation: BookingConfirmation;
  onClose: () => void;
}

export function BookingSuccess({
  request,
  confirmation,
  onClose,
}: BookingSuccessProps) {
  const scheduledAt = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(request.start));

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-6 p-8 text-center">
      <CheckCircle2 aria-hidden="true" className="size-12 text-foreground" />
      <div className="flex max-w-lg flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Votre rendez-vous est confirmé
        </h2>
        <p className="text-muted-foreground first-letter:uppercase">
          {scheduledAt} avec Elias sur Google Meet.
        </p>
      </div>
      <div className="max-w-lg rounded-lg border border-border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
        Une confirmation vient d’être envoyée par Cal.com à l’adresse indiquée.
        {confirmation.uid ? ` Référence : ${confirmation.uid}.` : ""}
      </div>
      <Button type="button" variant="outline" onClick={onClose}>
        Fermer
      </Button>
    </div>
  );
}
