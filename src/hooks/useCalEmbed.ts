import type { MouseEvent } from "react";

export const OPEN_CAL_BOOKING_EVENT = "portfolio:open-cal-booking";

export function useCalEmbed() {
  return {
    onClick: (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      window.dispatchEvent(new Event(OPEN_CAL_BOOKING_EVENT));
    },
  } as const;
}
