import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { OPEN_BOOKING_DIALOG_EVENT } from "@/hooks/useBookingDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { type Attribution } from "@/lib/attribution/capture";
import {
  BookingDetailsForm,
  BookingEventSummary,
  BookingIntakeForm,
  BookingSlotPicker,
  BookingSuccess,
} from "@/components/booking/BookingIntakeForm";
import {
  type AvailableDay,
  type AvailableSlot,
  type BookingAttendee,
  type BookingConfirmation,
  type BookingIntake,
  buildBookingRequest,
  type CustomBookingRequest,
} from "@/components/booking/bookingIntake";
import {
  fetchAvailability,
  submitBooking,
} from "@/components/booking/bookingApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

gsap.registerPlugin(useGSAP);

interface CalBookingDialogProps {
  attribution: Attribution;
}

export function CalBookingDialog({ attribution }: CalBookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"intake" | "slot" | "details" | "success">(
    "intake",
  );
  const [intake, setIntake] = useState<BookingIntake | null>(null);
  const [availability, setAvailability] = useState<AvailableDay[]>([]);
  const [availabilityStatus, setAvailabilityStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [availabilityAttempt, setAvailabilityAttempt] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [attendee, setAttendee] = useState<BookingAttendee | null>(null);
  const [bookingRequest, setBookingRequest] = useState<CustomBookingRequest | null>(
    null,
  );
  const [bookingConfirmation, setBookingConfirmation] =
    useState<BookingConfirmation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const continueToSlots = (values: BookingIntake) => {
    setIntake(values);
    setStep("slot");
  };

  const selectDate = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedStart(null);
  };

  const selectSlot = (slot: AvailableSlot) => {
    setSelectedTime(slot.time);
    setSelectedStart(slot.start);
  };

  const confirmBooking = async (values: BookingAttendee) => {
    if (!intake || !selectedStart) return;

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    const request = buildBookingRequest({
      attribution,
      intake,
      attendee: values,
      start: selectedStart,
      timeZone,
    });

    setAttendee(values);
    setBookingRequest(request);
    setBookingError(null);
    setIsSubmitting(true);

    try {
      const confirmation = await submitBooking(request);
      setBookingConfirmation(confirmation);
      setStep("success");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Impossible de confirmer la réservation.";
      setBookingError(message);
      if (message.includes("n’est plus disponible")) {
        setSelectedTime(null);
        setSelectedStart(null);
        setStep("slot");
        retryAvailability();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const retryAvailability = useCallback(() => {
    setAvailabilityAttempt((attempt) => attempt + 1);
  }, []);

  useEffect(() => {
    const openDialog = () => setOpen(true);

    window.addEventListener(OPEN_BOOKING_DIALOG_EVENT, openDialog);
    return () => window.removeEventListener(OPEN_BOOKING_DIALOG_EVENT, openDialog);
  }, []);

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    setAvailabilityStatus("loading");
    setAvailabilityError(null);

    fetchAvailability(timeZone, controller.signal)
      .then((days) => {
        setAvailability(days);
        setAvailabilityStatus("ready");
        setSelectedDate((currentDate) => {
          const currentStillExists = days.some(
            ({ date }) => date === currentDate,
          );
          return currentStillExists ? currentDate : (days[0]?.date ?? "");
        });
        setSelectedTime(null);
        setSelectedStart(null);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        setAvailabilityStatus("error");
        setAvailabilityError(
          error instanceof Error
            ? error.message
            : "Impossible de charger les créneaux.",
        );
      });

    return () => controller.abort();
  }, [open, availabilityAttempt]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && isSubmitting) return;

    setOpen(nextOpen);
    if (nextOpen) return;

    setStep("intake");
    setIntake(null);
    setSelectedDate("");
    setSelectedTime(null);
    setSelectedStart(null);
    setAttendee(null);
    setBookingRequest(null);
    setBookingConfirmation(null);
    setBookingError(null);
    setIsSubmitting(false);
  };

  useGSAP(
    () => {
      if (!open || isMobile || !dialogContentRef.current) return;

      gsap.fromTo(
        dialogContentRef.current,
        {
          autoAlpha: 0,
          y: 18,
          scale: 0.97,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          ease: "power3.out",
          clearProps: "opacity,visibility,transform",
        },
      );
    },
    { dependencies: [open, isMobile] },
  );

  let activeStep;

  if (step === "slot") {
    activeStep = (
      <BookingSlotPicker
        availability={availability}
        status={availabilityStatus}
        error={availabilityError}
        selectedDate={selectedDate}
        selectedStart={selectedStart}
        onSelectDate={selectDate}
        onSelectSlot={selectSlot}
        onBack={() => setStep("intake")}
        onContinue={() => setStep("details")}
        onRetry={retryAvailability}
      />
    );
  } else if (step === "details") {
    activeStep = (
      <BookingDetailsForm
        initialValues={attendee}
        onBack={() => setStep("slot")}
        onConfirm={confirmBooking}
        isSubmitting={isSubmitting}
        error={bookingError}
      />
    );
  } else if (step === "success" && bookingRequest && bookingConfirmation) {
    activeStep = (
      <BookingSuccess
        request={bookingRequest}
        confirmation={bookingConfirmation}
        onClose={() => handleOpenChange(false)}
      />
    );
  } else {
    activeStep = (
      <BookingIntakeForm initialValues={intake} onContinue={continueToSlots} />
    );
  }

  const bookingContent = (
    <div className="grid min-h-full lg:grid-cols-[19rem_minmax(0,1fr)]">
      <BookingEventSummary
        selectedDate={step === "intake" ? null : selectedDate}
        selectedTime={selectedTime}
      />
      <div className="min-h-0">{activeStep}</div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[92svh] overflow-hidden rounded-t-lg border-border bg-background p-0 [&>button]:right-4 [&>button]:top-4 [&>button]:z-20 [&>button]:rounded-full [&>button]:bg-background/90 [&>button]:p-2 [&>button]:shadow-sm"
        >
          <SheetTitle className="sr-only">Réserver un audit</SheetTitle>
          <SheetDescription className="sr-only">
            Choisissez un créneau pour un audit avec Elias.
          </SheetDescription>
          <div className="h-full overflow-y-auto bg-background pt-3">
            {bookingContent}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        ref={dialogContentRef}
        className="cal-gsap-dialog w-[calc(100vw-2rem)] max-w-6xl overflow-hidden rounded-lg border-border bg-background p-0 shadow-2xl"
      >
        <DialogTitle className="sr-only">Réserver un audit</DialogTitle>
        <DialogDescription className="sr-only">
          Choisissez un créneau pour un audit avec Elias.
        </DialogDescription>
        <div className="h-[min(760px,calc(100vh-4rem))] overflow-y-auto bg-background">
          {bookingContent}
        </div>
      </DialogContent>
    </Dialog>
  );
}
