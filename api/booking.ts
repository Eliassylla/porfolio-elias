import { createBookingApiHandler } from "../worker/index.js";

// Test : la même API de réservation que le Worker Cloudflare, servie par une fonction Vercel pour que la
// réservation marche aussi sur les aperçus Vercel. Cloudflare reste l'hébergement prévu (CLAUDE.md).
// La clé se règle dans Vercel → Project → Settings → Environment Variables, sous le nom CAL_API_KEY.
export default {
  fetch(request: Request) {
    return createBookingApiHandler(fetch, process.env.CAL_API_KEY ?? "")(request);
  },
};
