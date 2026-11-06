# Contrat d'attribution UTM

**Version du contrat : 1** (`attr_version`)

## Pourquoi ce contrat existe

Une fois le visiteur passé sur Cal.com, sa provenance est perdue pour toujours si le Portfolio ne l'a pas transmise. Ni Cal.com ni l'OS ne peuvent la reconstituer après coup. C'est la seule information que le Portfolio est seul à pouvoir produire — d'où un contrat versionné plutôt qu'une convention implicite.

L'attribution voyage **dans la réservation elle-même**, via des questions de réservation cachées sur l'event type Cal.com. Il n'y a donc aucune jointure à maintenir, aucune corrélation à synchroniser : une réservation porte sa propre provenance.

## Champs émis

| Champ | Source | Défaut | Contrainte |
|---|---|---|---|
| `utm_source` | `?utm_source` | `direct` | slug, ≤64 car. |
| `utm_medium` | `?utm_medium` | `none` | slug, ≤64 car. |
| `utm_campaign` | `?utm_campaign` | `none` | slug, ≤64 car. |
| `utm_content` | `?utm_content` | `none` | slug, ≤64 car. |
| `landing_path` | `location.pathname` à l'atterrissage | `/` | chemin seul, ≤64 car. |
| `referrer_host` | `document.referrer` | `none` | hostname seul, ≤64 car. |
| `attr_version` | constante | `1` | entier |

Un « slug » vaut : minuscules, caractères `[a-z0-9._-]` uniquement.

Aucun champ n'est optionnel. Aucun champ ne vaut jamais `null`, `undefined` ni chaîne vide — un champ absent prend son défaut. Un événement sans attribution reste exploitable ; il indique simplement `direct` / `none`.

## Règles de normalisation

### R1 — Premier toucher gagne

La première arrivée de la session fixe l'attribution. Les navigations suivantes, y compris avec de nouveaux UTM, ne l'écrasent pas.

Raison : on veut savoir **ce qui a amené le visiteur**, pas la dernière page qu'il a vue avant de cliquer.

Une valeur stockée n'est retenue que si elle est structurellement valide. Un contenu de `sessionStorage` corrompu ou d'une version antérieure du contrat est ignoré au profit de la nouvelle capture — sans quoi une donnée cassée gagnerait indéfiniment.

### R2 — Jamais vide

`trim` puis, si le résultat est vide, valeur par défaut. Idem si la valeur devient vide après assainissement.

### R3 — Normalisation

Dans cet ordre : `trim` → minuscules → séquences d'espaces remplacées par un tiret unique → suppression des caractères hors liste blanche → troncature à 64 caractères.

La troncature vient en dernier pour qu'une valeur longue ne soit pas coupée au milieu d'une séquence que l'assainissement aurait de toute façon retirée.

### R4 — Liste blanche stricte

Un UTM est un paramètre d'URL public : sa valeur est **contrôlée par un tiers**. Elle est donc traitée comme une entrée hostile, jamais comme une donnée de confiance.

| Champ | Caractères autorisés |
|---|---|
| `utm_*` | `[a-z0-9._-]` |
| `landing_path` | `[a-z0-9._/-]` |
| `referrer_host` | `[a-z0-9.-]` |

Tout le reste est retiré, y compris `<`, `>`, `"`, `'`, `%`, `&`, `=`, `@`, les espaces et les caractères de contrôle.

**Conséquence à connaître au moment de nommer une campagne** : les accents sont retirés, pas transposés. `utm_medium=Réseaux Sociaux` devient `rseaux-sociaux`, pas `reseaux-sociaux`. C'est volontaire et testé — un `utm_*` doit être un slug ASCII, ce qui est la pratique courante — mais il faut donc nommer les campagnes sans accent à la source plutôt que compter sur une transposition.

### R5 — Aucune donnée personnelle

Un champ d'attribution ne transporte que de la provenance de canal. Jamais d'email, de nom ni d'identifiant.

Une valeur contenant `@` est **rejetée vers son défaut**, et non assainie : retirer le `@` de `jean.dupont@exemple.fr` produirait `jean.dupontexemple.fr`, qui passerait la liste blanche tout en restant une donnée personnelle. Le rejet précède donc l'assainissement.

### R6 — Réduction du référent

`referrer_host` conserve le **hostname seul**. Le chemin d'une page référente peut être sensible (un document interne, une recherche, une URL privée) et n'apporte rien à l'attribution.

Un référent non parsable donne `none`.

## Durée de vie

`sessionStorage`, clé `portfolio.attr.v1`.

Per-onglet, effacé à la fermeture. C'est **délibéré** : on mesure l'origine de la session qui a produit la réservation, pas un parcours multi-jours. Une attribution multi-touch exigerait un identifiant persistant et un stockage côté Portfolio — hors périmètre, à ne pas ajouter sans besoin établi.

Si `sessionStorage` est indisponible (navigation privée, quota dépassé, stockage bloqué), l'attribution est calculée en mémoire et reste utilisable. **Aucune erreur ne remonte à l'utilisateur** : une page qui casse parce que la télémétrie a échoué est un défaut plus grave que la télémétrie manquante.

## Point d'émission

Le parcours personnalisé de `CalBookingDialog.tsx` construit la demande avec
`buildBookingRequest` dans `bookingIntake.ts`, puis `bookingApi.ts` la transmet à
`/api/booking`. L'entrée Vercel `api/booking.ts` réutilise la validation et la
projection Cal.com de `worker/`. Aucun composant `<Cal>` ni iframe n'est monté.

La capture reste effectuée à l'atterrissage dans `App.tsx`, avant l'ouverture du
parcours ; R1 et le stockage de session restent inchangés. Le serveur transmet
les champs selon son contrat Cal.com. Leur présence effective dans une réservation
distante se vérifie sur cette réservation ; elle ne se déduit pas d'un appel sans erreur.

Correction documentaire du 5 novembre 2026 : cette section remplace l'ancienne
description du transport par l'embed. Aucune règle de normalisation ni fixture modifiée.

## Ce que ce contrat ne couvre pas

- Les réservations, leurs statuts et les réponses de qualification — ils appartiennent à Cal.com.
- La redistribution vers les départements — elle appartient à l'OS.
- Les événements de parcours (`page_view`, `cta_click`) — spec distincte, phase ultérieure.
