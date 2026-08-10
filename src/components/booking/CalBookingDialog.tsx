import Cal from "@calcom/embed-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { businessInfo } from "@/data/business";
import { OPEN_CAL_BOOKING_EVENT } from "@/hooks/useCalEmbed";
import { useIsMobile } from "@/hooks/use-mobile";
import { type Attribution, toCalConfig } from "@/lib/attribution/capture";
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
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { resolvedTheme } = useTheme();
  const calTheme = resolvedTheme === "dark" ? "dark" : "light";
  const surface = isMobile ? "sheet" : "dialog";
  const namespace = `booking-${surface}-${calTheme}`;

  useEffect(() => {
    const openDialog = () => setOpen(true);

    window.addEventListener(OPEN_CAL_BOOKING_EVENT, openDialog);
    return () => window.removeEventListener(OPEN_CAL_BOOKING_EVENT, openDialog);
  }, []);

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

  const calEmbed = open ? (
    <div className="flex min-h-0 flex-1 flex-col">
      <Cal
        key={`${surface}-${calTheme}`}
        namespace={namespace}
        calLink={businessInfo.booking.calLink}
        config={{
          layout: "month_view",
          theme: calTheme,
          ...toCalConfig(attribution),
        }}
        className="h-full w-full flex-1"
      />
    </div>
  ) : null;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="h-[92svh] overflow-hidden rounded-t-lg border-border bg-background p-0 [&>button]:right-4 [&>button]:top-4 [&>button]:z-20 [&>button]:rounded-full [&>button]:bg-background/90 [&>button]:p-2 [&>button]:shadow-sm"
        >
          <SheetTitle className="sr-only">Réserver un audit</SheetTitle>
          <SheetDescription className="sr-only">
            Choisissez un créneau pour un audit avec Elias.
          </SheetDescription>
          <div className="cal-mobile-sheet-embed h-full bg-background pt-3">
            {calEmbed}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        ref={dialogContentRef}
        className="cal-gsap-dialog w-[calc(100vw-2rem)] max-w-6xl overflow-hidden rounded-lg border-border bg-background p-0 shadow-2xl"
      >
        <DialogTitle className="sr-only">Réserver un audit</DialogTitle>
        <DialogDescription className="sr-only">
          Choisissez un créneau pour un audit avec Elias.
        </DialogDescription>
        <div className="flex h-[min(720px,calc(100vh-6rem))] flex-col overflow-auto bg-background">
          {calEmbed}
        </div>
      </DialogContent>
    </Dialog>
  );
}
