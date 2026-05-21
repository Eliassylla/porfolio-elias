# Workflow : Edge Functions

## Objectif

Créer, tester localement et déployer des Edge Functions Deno/TypeScript comme backend serverless du projet Portfolio.

## Prérequis

- [ ] Stack locale démarrée (`supabase start`) pour le développement local
- [ ] Projet lié (`supabase link`) pour le déploiement en production
- [ ] Deno installé (optionnel, la CLI gère son propre runtime)

## Concepts Clés

Les Edge Functions sont des fonctions TypeScript qui tournent sur Deno. Elles sont stockées dans `supabase/functions/<nom-fonction>/index.ts`. Pour ce projet Portfolio, elles constituent l'unique couche backend (pas de serveur dédié).

## Étapes

### 1. Créer une nouvelle Edge Function

```bash
supabase functions new <nom-fonction>
```

Exemple :
```bash
supabase functions new send-contact-email
supabase functions new get-portfolio-data
```

**Output attendu :**
```
Created new Function at supabase/functions/send-contact-email/index.ts
```

Le fichier généré contient un boilerplate TypeScript :
```typescript
// supabase/functions/send-contact-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { name } = await req.json()
  const data = { message: `Hello ${name}!` }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})
```

---

### 2. Tester localement

Servir toutes les fonctions localement :
```bash
supabase functions serve
```

Servir avec un fichier d'environnement :
```bash
supabase functions serve --env-file .env.local
```

**Output attendu :**
```
Setting up Edge Functions runtime...
Serving functions on http://127.0.0.1:54321/functions/v1/
```

Tester avec curl :
```bash
curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-contact-email' \
  --header 'Authorization: Bearer <ANON_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{"name":"Portfolio Visitor"}'
```

Pour désactiver la vérification JWT en développement :
```bash
supabase functions serve --no-verify-jwt
```

Pour activer le débogage (inspecteur Deno) :
```bash
supabase functions serve --inspect
```

---

### 3. Gérer les secrets (variables d'environnement)

Les secrets sont des variables d'environnement disponibles dans les Edge Functions en production.

Lister les secrets existants :
```bash
supabase secrets list
```

Ajouter un secret :
```bash
supabase secrets set MY_API_KEY=valeur_secrete
supabase secrets set RESEND_API_KEY=re_xxx EMAIL_FROM=contact@domain.com
```

Importer depuis un fichier `.env` :
```bash
supabase secrets set --env-file .env.production
```

**Output attendu :**
```
Finished supabase secrets set.
```

> ⚠️ Les secrets ne sont PAS disponibles en local via `functions serve`. Utiliser `.env.local` pour le développement local.

---

### 4. Déployer une fonction en production

Déployer une fonction spécifique :
```bash
supabase functions deploy send-contact-email
```

Déployer toutes les fonctions :
```bash
supabase functions deploy
```

**Output attendu :**
```
Bundling send-contact-email
Deploying Function send-contact-email (script size: 1.23 kB)
Upload successful! Function send-contact-email is deployed.
```

Déploiement avec options :
```bash
# Sans vérification JWT (fonctions publiques)
supabase functions deploy send-contact-email --no-verify-jwt

# Avec import map personnalisé
supabase functions deploy --import-map ./import_map.json

# Bundling côté serveur (plus rapide, recommandé)
supabase functions deploy --use-api

# Supprimer les fonctions en prod qui n'existent plus en local
supabase functions deploy --prune
```

---

### 5. Lister et gérer les fonctions déployées

```bash
supabase functions list
```

**Output attendu :**
```
  SLUG                    │  VERSION  │  STATUS
  ────────────────────────┼───────────┼──────────
  send-contact-email      │    1      │  ACTIVE
```

Télécharger le code source d'une fonction déployée :
```bash
supabase functions download send-contact-email
```

Supprimer une fonction :
```bash
supabase functions delete send-contact-email
```

---

### 6. URL d'invocation en production

Les fonctions déployées sont accessibles à :
```
https://<PROJECT_REF>.supabase.co/functions/v1/<nom-fonction>
```

En local :
```
http://127.0.0.1:54321/functions/v1/<nom-fonction>
```

## Erreurs Fréquentes

### `Error: Missing function name`
**Cause** : Oubli du nom de la fonction dans la commande.
**Solution** : `supabase functions deploy <nom-fonction>`

### `401 Unauthorized` lors du test local
**Cause** : JWT non fourni ou invalide.
**Solution** : Ajouter le header `Authorization: Bearer <ANON_KEY>` ou lancer avec `--no-verify-jwt`.

### `Error: Cannot read file index.ts`
**Cause** : La fonction n'a pas été créée ou le chemin est incorrect.
**Solution** : Vérifier que `supabase/functions/<nom>/index.ts` existe.

### Import Deno échoue (timeout/réseau)
**Cause** : Première exécution avec imports distants, latence réseau.
**Solution** : Relancer, ou utiliser un `import_map.json` pour des imports locaux.

### La fonction déployée ne voit pas les secrets
**Cause** : Secrets non définis en production.
**Solution** : `supabase secrets list` pour vérifier, puis `supabase secrets set`.

### `Bundle too large`
**Cause** : Dépendances trop volumineuses.
**Solution** : Utiliser `--use-api` pour le bundling côté serveur, ou réduire les imports.

## Erreurs Rencontrées et Corrections

<!-- Documenter ici les erreurs spécifiques rencontrées sur ce projet -->
