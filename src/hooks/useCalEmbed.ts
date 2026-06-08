import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { businessInfo } from "@/data/business";

/**
 * Branche le popup Cal.com sur un bouton.
 *
 * Le calendrier s'ouvre en superposition (sans quitter le site) au clic.
 * Usage :
 *   const cal = useCalEmbed();
 *   <Button {...cal}>Réserver un appel</Button>
 *
 * Le thème du calendrier suit automatiquement le thème du site (clair/sombre).
 */
export function useCalEmbed() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: resolvedTheme === "dark" ? "dark" : "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      // Précharge le calendrier en arrière-plan dès l'ouverture de la page
      // pour que le popup s'affiche quasi instantanément au clic.
      cal("preload", { calLink: businessInfo.booking.calLink });
    })();
  }, [resolvedTheme]);

  return {
    "data-cal-link": businessInfo.booking.calLink,
    "data-cal-config": JSON.stringify({ layout: "month_view" }),
  } as const;
}
