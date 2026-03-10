# Pitfalls Research

**Domain:** Portfolio B2B — Supabase Edge Functions + Resend + Cal.com + React SPA
**Researched:** 2026-03-10
**Confidence:** HIGH (codebase audit direct + patterns connus stack Supabase/Resend)

## Pitfalls Critiques

### 1. CORS manquants sur les Edge Functions

**Symptôme :** Le navigateur bloque silencieusement tous les appels à l'Edge Function. Console : `CORS policy: No 'Access-Control-Allow-Origin' header`.

**Cause :** Les Edge Functions Supabase n'ajoutent pas les headers CORS automatiquement.

**Prévention :**
```typescript
// Obligatoire dans CHAQUE Edge Function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Gérer les preflight OPTIONS
if (req.method === "OPTIONS") {
  return new Response("ok", { headers: corsHeaders });
}
```

**Phase concernée :** Phase Edge Functions — vérifier en premier avant tout test.

---

### 2. Clé API Resend exposée via préfixe VITE_

**Symptôme :** La clé API Resend est visible dans le bundle JavaScript du navigateur (DevTools → Sources).

**Cause :** Toute variable `VITE_` est intégrée dans le bundle frontend au build.

**Prévention :**
- `RESEND_API_KEY` va dans `supabase secrets set`, jamais dans `.env`
- Seules les Edge Functions (Deno) accèdent à `Deno.env.get("RESEND_API_KEY")`
- Le client React appelle `supabase.functions.invoke()` — jamais Resend directement

**Phase concernée :** Phase Edge Functions — checklist de sécurité avant deploy.

---

### 3. Secrets manquants en dev local

**Symptôme :** `supabase functions serve` crash avec `undefined` ou erreur d'auth Resend.

**Cause :** `supabase secrets set` configure les secrets en production Supabase. En local, ils ne sont pas disponibles automatiquement.

**Prévention :**
```bash
# Créer un fichier .env.local pour supabase functions serve
# (ce fichier NE doit PAS être commité)
echo "RESEND_API_KEY=re_xxxx" > supabase/functions/.env
```

```bash
supabase functions serve --env-file supabase/functions/.env
```

**Phase concernée :** Setup initial Edge Functions.

---

### 4. Clé Service Role dans le code client

**Symptôme :** L'app fonctionne mais n'importe qui peut lire/écrire toutes les tables en bypassant RLS.

**Cause :** `SUPABASE_SERVICE_ROLE_KEY` exposée côté client désactive RLS.

**Prévention :**
- Client React : utiliser uniquement `VITE_SUPABASE_ANON_KEY`
- Edge Functions : `SUPABASE_SERVICE_ROLE_KEY` est auto-injectée par Supabase — ne pas la stocker ailleurs
- RLS : activer sur toutes les tables, même si les policies semblent restrictives

**Phase concernée :** Phase DB + Edge Functions.

---

### 5. Email dupliqué newsletter sans gestion d'erreur

**Symptôme :** Un visiteur qui s'inscrit deux fois voit une erreur générique ou un crash silencieux.

**Cause :** La contrainte `UNIQUE` sur `subscribers.email` lève une exception Postgres non gérée.

**Prévention :**
```typescript
// Dans le hook useNewsletter
const { error } = await supabase
  .from("subscribers")
  .insert({ email })
  .single();

if (error?.code === "23505") {
  // Duplicate — afficher message "déjà inscrit" au lieu d'une erreur
  return { success: true, alreadySubscribed: true };
}
```

**Phase concernée :** Phase Newsletter UI + hook.

---

### 6. Violation Replace-Before-Delete (brownfield)

**Symptôme :** Erreur TypeScript cascade après suppression de fichiers photographe legacy — des imports cassés dans des fichiers non identifiés.

**Cause :** Le codebase a des imports croisés imprévus. Supprimer avant de remplacer casse la build.

**Prévention :**
1. D'abord créer les nouveaux fichiers (business.ts complet, nouveaux types)
2. Migrer les imports fichier par fichier
3. Vérifier que la build passe
4. Seulement ensuite supprimer les anciens fichiers

**Phase concernée :** Phase Contenu + Nettoyage — ordre strict.

---

### 7. URL Cal.com incorrecte ou manquante

**Symptôme :** Le CTA principal "Réserver un appel" mène à une 404 ou reste `#calendly`.

**Cause :** L'URL Cal.com d'Elias n'est pas encore dans le codebase.

**Prévention :**
- Obtenir l'URL exacte : `https://cal.com/[username]/[event-slug]`
- La mettre dans `business.ts` avant tout test de conversion
- Tester le lien manuellement dans le navigateur avant de déployer

**Phase concernée :** Phase Contenu (priorité 1 — débloque 4 CTAs simultanément).

---

### 8. Resend Audience ID manquant pour les Contacts

**Symptôme :** `resend.contacts.create()` échoue avec erreur `audience not found`.

**Cause :** Resend Contacts nécessite un `audienceId` créé préalablement dans le dashboard Resend.

**Prévention :**
1. Créer l'audience dans le dashboard Resend avant tout code
2. Stocker l'`audienceId` dans les secrets Edge Function : `supabase secrets set RESEND_AUDIENCE_ID=xxxx`
3. Dans l'Edge Function : `Deno.env.get("RESEND_AUDIENCE_ID")`

**Phase concernée :** Phase Setup Resend — prerequis avant Edge Function newsletter.

---

## Technical Debt Patterns

| Raccourci | Acceptable ? | Risque | Alternative |
|-----------|-------------|--------|-------------|
| Single opt-in newsletter | Acceptable pour v1 | GDPR si audience EU | Double opt-in via email confirmation |
| Pas de rate limiting formulaire contact | Acceptable pour v1 | Spam | Ajouter honeypot field ou Cloudflare Turnstile |
| Pas de retry sur Edge Function email | Acceptable | Email perdu si Resend down | Supabase queue (futur) |
| `confirmed = false` toujours | Acceptable pour v1 | Métriques engagement faussées | Email confirmation link |
| Pas de `contact_submissions` table | Acceptable si pas d'archivage requis | Perte des soumissions | Ajouter table et insert dans Edge Function |

## Sécurité — Checklist

| Check | Status | Action si manquant |
|-------|--------|-------------------|
| `RESEND_API_KEY` en secret Supabase uniquement | ○ À faire | `supabase secrets set RESEND_API_KEY=...` |
| `RESEND_AUDIENCE_ID` en secret Supabase | ○ À faire | Créer audience Resend d'abord |
| RLS activé sur `subscribers` | ○ À faire | `ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY` |
| RLS activé sur `contact_submissions` | ○ À faire | idem |
| CORS headers dans chaque Edge Function | ○ À faire | Voir pitfall #1 |
| Aucune clé service role dans le client React | ✓ À vérifier | Vérifier `.env` et code client |
| Validation email côté Edge Function | ○ À faire | Regex ou librairie Zod côté Deno |
| Honeypot anti-spam formulaire contact | ○ Optionnel v1 | Champ caché `website` dans le form |

## "Looks Done But Isn't" — Checklist de vérification

Avant de considérer une feature terminée, vérifier :

- [ ] CTA Cal.com testé manuellement dans le navigateur (pas seulement le lien)
- [ ] Email de bienvenue reçu dans une vraie boîte mail (pas juste logs Edge Function)
- [ ] Email de contact reçu chez Elias (pas juste "success" dans la UI)
- [ ] Subscriber visible dans dashboard Supabase ET dans Resend Contacts
- [ ] Erreur duplicate email affiche message friendly (pas crash)
- [ ] Formulaire contact réinitialisé après soumission réussie
- [ ] Build TypeScript sans erreurs après nettoyage code mort
- [ ] Dark mode et light mode testés sur chaque section modifiée
- [ ] Strings de validation du form en français (actuellement en anglais dans ContactForm.tsx)
- [ ] Domaine email Resend vérifié (sinon emails finissent en spam)

## Mapping Pitfall → Phase

| Pitfall | Phase recommandée | Vérification |
|---------|------------------|-------------|
| URL Cal.com manquante | Phase 1 — Contenu | Cliquer le CTA, vérifier redirection |
| Fichiers legacy — ordre suppression | Phase 1 — Contenu/Nettoyage | Build TypeScript propre |
| Audience Resend manquante | Phase 2 — Setup Resend | `RESEND_AUDIENCE_ID` en secrets |
| CORS manquants | Phase 2 — Edge Functions | Test `curl` depuis le navigateur |
| Secrets manquants en dev local | Phase 2 — Edge Functions | `supabase functions serve` sans crash |
| Clé service role dans client | Phase 2 — Edge Functions | Audit `.env` et client code |
| Email dupliqué newsletter | Phase 3 — Newsletter UI | Test inscription même email 2x |
| Validation email côté Deno | Phase 2 — Edge Functions | Test avec email invalide |

---
*Pitfalls research for: Portfolio B2B — Supabase Edge Functions + Resend + Cal.com*
*Researched: 2026-03-10*
