import type { MouseEvent } from "react";

export const OPEN_BOOKING_DIALOG_EVENT = "portfolio:open-booking";

export function useBookingDialog() {
  return {
    onClick: (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      window.dispatchEvent(new Event(OPEN_BOOKING_DIALOG_EVENT));
    },
  } as const;
}
