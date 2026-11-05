import { createBookingApiHandler } from "../worker/index.js";

// Point d'entrée Vercel : réutilise la logique serveur conservée dans worker/.
// La clé doit être configurée dans l'environnement Vercel concerné (Preview ou Production).
// La clé se règle dans Vercel → Project → Settings → Environment Variables, sous le nom CAL_API_KEY.
export default {
  fetch(request: Request) {
    return createBookingApiHandler(fetch, process.env.CAL_API_KEY ?? "")(request);
  },
};
