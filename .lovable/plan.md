# Correction d’affichage du dialog Cal.com (desktop / tablette)

## Objectif
Faire en sorte que l’embed Cal.com s’affiche entièrement et proprement dans la modale de réservation sur ordinateur et tablette, sans être coupé en hauteur.

## Diagnostic
- Le composant `<Cal>` de `@calcom/embed-react` injecte un wrapper intermédiaire ; `className="h-full w-full"` ne s’applique pas directement à l’iframe réelle.
- Le conteneur interne du dialog utilise `h-[min(720px,calc(100vh-6rem))]` sans layout flex, donc la hauteur ne se propage pas bien jusqu’à l’iframe.
- `overflow-hidden` sur `DialogContent` peut masquer le bas de l’iframe si elle dépasse.

## Changements prévus

### 1. Forcer la taille de l’iframe Cal (`src/index.css`)
Ajouter une règle ciblant l’iframe réelle générée par Cal :

```css
.cal-embed iframe,
[data-cal-namespace] iframe {
  height: 100% !important;
  width: 100% !important;
  border: 0;
}
```

### 2. Rendre le conteneur du dialog flexible (`src/components/booking/CalBookingDialog.tsx`)
- Remplacer le `<div className="h-[min(720px,calc(100vh-6rem))] bg-background">` par un conteneur flex avec hauteur explicite et `min-h-0`.
- Conserver la hauteur max `min(720px, calc(100vh - 6rem))` via une classe équivalente.
- Permettre au wrapper `<Cal>` de remplir l’espace disponible avec `flex-1`.

### 3. Gérer l’overflow
- Passer `overflow-hidden` à `overflow-auto` sur le conteneur interne du dialog pour éviter que le bas soit tronqué.
- Conserver `overflow-hidden` sur `DialogContent` si nécessaire pour les coins arrondis.

### 4. Conserver l’animation GSAP
- L’animation d’entrée reste inchangée ; le `clearProps` final ne doit pas impacter la hauteur de l’iframe.

## Fichiers concernés
- `src/components/booking/CalBookingDialog.tsx`
- `src/index.css`

## Vérification
- Build TypeScript : `npm run typecheck`
- Build production : `npm run build`
- Tests : `npm test`
- Aperçu visuel sur desktop (1440px) et tablette (768–1024px) en ouvrant le dialog de réservation.
