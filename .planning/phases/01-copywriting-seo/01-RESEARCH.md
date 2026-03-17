# Phase 1: Copywriting & SEO — Research

**Researched:** 2026-03-17
**Domain:** Conversion copywriting (B2B francophone PME) + technical SEO (React SPA)
**Confidence:** HIGH — all findings verified against live codebase and project files

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Positionnement (CRITIQUE)**
- Elias est freelance qui accepte ses premiers clients — aucun mensonge, aucune fausse prétention
- Le copy doit être honnête sur le fait de débuter, sans pour autant s'excuser ou minimiser les compétences réelles
- Angle retenu : "Expert des outils (n8n, Claude Code), nouveau en consulting" — la technique est réelle, l'expérience client est à construire
- Pas de formulations impliquant des missions passées ou des clients payants qui n'existent pas

**Témoignages — Suppression totale**
- La section `testimonials` dans `business.ts` (Marie D., Thomas R., Sophie L.) est entièrement supprimée
- Aucun placeholder. Zéro témoignage vaut mieux que des témoignages inventés
- La crédibilité passe par : projets réels démontrables, méthodologie claire, transparence

**Stats — Suppression totale**
- Les stats actuelles ("120+ Heures économisées", "15+ Workflows déployés", "100% Clients satisfaits") sont entièrement supprimées
- Remplacer par des indicateurs vrais si besoin visuel : outils maîtrisés, types de missions, temps de réponse
- Si pas d'alternative convaincante : supprimer la section stats du HeroSection sans remplacer

**Image de marque**
- Ton : partenaire de confiance et accessible — parle le langage du dirigeant PME, pas du développeur
- Pas de jargon technique dans le copy visible (n8n, API, webhook → "automatisation", "connexion entre outils", "système")
- Chaleureux et direct. Phrases courtes. Focus sur les problèmes métier, pas sur la technologie

**Services présentés**
- 3 services (structure WhatIBuildSection déjà en place) : Automatisations · Outils internes · Landing Pages
- L'approche est horizontale — pas de niche sectorielle pour l'instant
- Cible : PME de services (conseil, formation, cabinets) — mais le copy ne ferme pas d'autres portes

**Offre**
- Conversion via appel découverte gratuit — pas de tarif affiché sur le site
- CTA principal : "Réserver un appel découverte" (ou formulation courte similaire)
- Le formulaire de contact est le point d'entrée secondaire (pour ceux qui ne veulent pas appeler)

**Formulation des projets dans le copy**
- Le copy des sections (FeaturedProjects, Hero, About) fait référence à des projets réels sans prétendre avoir eu des clients payants
- Formulations à utiliser : "projets construits", "automatisations développées", "exemples concrets"
- Les vrais projets disponibles (pour Phase 2) : 5 workflows n8n + 1 système d'outils internes Claude Code

### Claude's Discretion
- Titre exact de la headline Hero (dans les limites du brief : <10 mots, proposition de valeur claire pour PME)
- Choix exact des formulations pour les descriptions de services (garder dans le ton validé)
- Structure des meta descriptions (format technique SEO)
- Choix du type de structured data schema.org (LocalBusiness vs Person vs ProfessionalService)

### Deferred Ideas (OUT OF SCOPE)
- Cal.com URL et intégration des 4 CTAs — Phase 2 (Contenu & CTAs), quand Elias créera son compte Cal.com
- Screenshots de workflows n8n dans la Glass Box — Phase 2, quand disponibles
- Documentation des vrais projets dans business.ts — Phase 2
- URLs sociales réelles (LinkedIn, YouTube) — Phase 2, quand les comptes sont prêts
- Stats basées sur de vrais résultats clients — après les premiers clients
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| COPY-01 | Hero section — headline, tagline et CTA copy réécrits pour conversion B2B PME francophone | Copy actuel ("Automatisation pour entreprises de services") est générique — headline <10 mots orienté résultats. Stats et `businessInfo.stats[]` à supprimer. HeroSection ne lit PAS `businessInfo` pour le texte principal — le copy est hardcodé dans le composant |
| COPY-02 | WhatIBuild, CTASection, FeaturedProjects — copy revu avec skills copywriting + marketing-psychology | WhatIBuildSection hardcode son copy. CTASection hardcode son copy. FeaturedProjectsSection lit `businessInfo.projects` — le copy du heading est hardcodé. Appliquer skills `copywriting` + `marketing-psychology` |
| COPY-03 | Formulaire contact — champs et labels en français, copy qualifiant (secteur, problème principal) | Contact.tsx actuel N'A PAS de formulaire — il affiche un bouton Calendly + email direct. COPY-03 demande de créer un vrai formulaire HTML avec champs qualifiants. Ce plan est donc une création, pas une modification |
| SEO-01 | Meta tags (title, description) de toutes les pages — remplacer contenu photographe par contenu automation | `index.html` contient "My App" / "A beautiful web application" / Lovable OG image. About.tsx importe `photographerInfo` directement. SEOHead existe déjà dans ProjectDetail, Contact, Home, Portfolio, Services — mais PAS dans About.tsx (utilise photographerInfo) |
| SEO-02 | OG tags pour partage social optimisés LinkedIn (cible décideurs PME) | SEOHead gère déjà `og:title`, `og:description`, `og:type`, `og:url`, `og:image`. Il manque `og:image` réelle et `og:locale` pour le français. `index.html` contient l'image Lovable en fallback dur |
| SEO-03 | Structured data schema.org (LocalBusiness ou Person) pour consultant automation | Aucun structured data actuellement. SEOHead n'injecte pas de JSON-LD. À créer : injection dans index.html ou nouveau composant. Recommandation : Person + ProfessionalService (voir Architecture Patterns) |
</phase_requirements>

---

## Summary

Cette phase est entièrement du travail sur le texte et les balises — pas de nouveaux composants UI complexes, pas de backend. Elle se découpe en trois domaines : (1) réécriture du copy de conversion dans les sections existantes, (2) création d'un formulaire de contact qualifiant, et (3) implémentation SEO complète (meta, OG, structured data).

Le codebase révèle une divergence critique : **la majorité du copy est hardcodé dans les composants**, pas dans `business.ts`. HeroSection, WhatIBuildSection, CTASection utilisent toutes du texte inline. Seule FeaturedProjectsSection consomme `businessInfo.projects`. Cette phase doit donc modifier à la fois `business.ts` ET les composants — ou choisir de centraliser le copy dans `business.ts` en cohérence avec le pattern établi.

About.tsx est entièrement orpheline — elle importe `photographerInfo` de `photographer.ts` et affiche du contenu photographe ("Photographer & Visual Storyteller"). Elle nécessite une réécriture complète, mais sans créer la vraie bio (déferrée à Phase 2) — une version minimale honnête est suffisante.

**Recommandation principale :** Centraliser tout le copy de page dans `business.ts` (champ par champ), puis modifier les composants pour lire depuis cette source. Cela respecte le pattern déclaré dans CLAUDE.md et facilite la maintenance future.

---

## Standard Stack

### Core (déjà installé — pas d'installations requises)

| Bibliothèque | Version installée | Rôle dans cette phase |
|--------------|-------------------|----------------------|
| React 18 + TypeScript | 18.3.1 / 5.8.3 | Composants et typage |
| react-hook-form | 7.61.1 | Formulaire de contact qualifiant (COPY-03) |
| zod | 3.25.76 | Validation schéma formulaire |
| @hookform/resolvers | 3.10.0 | Connecteur zod ↔ react-hook-form |
| react-router-dom | 6.30.1 | useLocation dans SEOHead |

### Supporting

| Bibliothèque | Version installée | Rôle | Quand l'utiliser |
|--------------|-------------------|------|-----------------|
| sonner | 1.7.4 | Toast feedback formulaire | Feedback submit réussi/erreur |
| lucide-react | 0.462.0 | Icônes formulaire (Mail, Phone, etc.) | Labels et boutons |

### Ce qui n'est PAS à installer

- Pas de bibliothèque SEO externe (react-helmet, react-helmet-async) — SEOHead existant utilise le DOM directement et fonctionne
- Pas de librairie de schéma JSON-LD — écrire le JSON-LD à la main dans index.html (statique) ou dans un composant React (dynamique)
- Pas de formulaire tiers (Formspree, etc.) — décision architecturale dans CLAUDE.md

---

## Architecture Patterns

### Pattern 1 : business.ts comme source de vérité unique

**Principe établi (CLAUDE.md) :** Tout le contenu textuel passe par `business.ts`. Les composants lisent depuis `businessInfo`.

**État actuel vs. état cible :**

| Fichier | État actuel | Cible Phase 1 |
|---------|-------------|---------------|
| `HeroSection.tsx` | Copy hardcodé inline | Lire `businessInfo.headline`, `.tagline`, `.heroDescription` |
| `WhatIBuildSection.tsx` | Items FocusRail hardcodés | Lire `businessInfo.services` (ou nouveau champ `whatIBuild`) |
| `CTASection.tsx` | Copy hardcodé inline | Lire `businessInfo.ctaSection` |
| `FeaturedProjectsSection.tsx` | Heading hardcodé, items depuis `businessInfo.projects` | Heading dans `businessInfo`, items déjà OK |
| `business.ts` | `stats[]` et `testimonials[]` présents | Supprimer les deux tableaux |

**Nouveaux champs à ajouter dans `businessInfo` :**

```typescript
// Ajouter dans business.ts
export const businessInfo = {
  // ... existant ...

  // Hero
  headline: '...', // <10 mots, proposition de valeur PME
  tagline: '...',
  heroDescription: '...',
  heroCta: 'Réserver un appel découverte',
  availabilityBadge: 'Disponible pour nouveaux projets',

  // WhatIBuild section
  whatIBuild: {
    sectionTitle: 'Ce que je construis',
    sectionDescription: '...',
    items: [
      { id: 'automatisations', title: '...', description: '...', meta: '...', imageSrc: '...', href: '/contact' },
      { id: 'micro-outils', title: '...', description: '...', meta: '...', imageSrc: '...', href: '/contact' },
      { id: 'landing-page', title: '...', description: '...', meta: '...', imageSrc: '...', href: '/contact' },
    ],
  },

  // CTA section
  ctaSection: {
    heading: '...',
    description: '...',
    cta: 'Réserver mon appel découverte',
  },

  // Featured projects section
  featuredProjects: {
    badge: '...',
    heading: '...',
    headingHighlight: '...',
    description: '...',
  },

  // SEO par page
  seo: {
    home: { title: '...', description: '...' },
    about: { title: '...', description: '...' },
    services: { title: '...', description: '...' },
    portfolio: { title: '...', description: '...' },
    contact: { title: '...', description: '...' },
    ogImage: '/images/og-image.png', // à créer ou utiliser photo Elias
  },

  // stats[] et testimonials[] : SUPPRIMER
};
```

### Pattern 2 : Formulaire de contact qualifiant (COPY-03)

**Ce qui existe :** Contact.tsx affiche un bouton Calendly + lien email. Pas de formulaire HTML.

**Ce qui est demandé :** Un formulaire avec champs qualifiants (secteur, problème principal).

**Contrainte REQUIREMENTS.md :** "Formulaire > 5 champs" est explicitement dans la liste "Out of Scope" avec la justification "Réduit le taux de completion de 50%+ en B2B SME". Le formulaire doit donc avoir 4-5 champs maximum.

**Structure recommandée :**

```typescript
// Schéma zod
const contactSchema = z.object({
  name: z.string().min(2, 'Votre prénom est requis'),
  email: z.string().email('Email invalide'),
  sector: z.enum(['conseil', 'formation', 'services-pro', 'autre'], {
    required_error: 'Sélectionnez votre secteur',
  }),
  problem: z.string().min(20, 'Décrivez votre problème principal (20 caractères minimum)'),
  // 4 champs — reste sous la limite de 5
});
```

**Note :** Ce formulaire ne soumet PAS encore à un backend (Phase 3 = Edge Functions). En Phase 1, le `onSubmit` affiche un toast de confirmation ou fait un simple `mailto:`. La logique d'envoi réel arrive en Phase 3.

### Pattern 3 : SEO dans une SPA React

**Problème structurel :** `index.html` contient les meta tags statiques "My App" / "A beautiful web application" (Lovable template). Ces valeurs sont visibles aux crawlers qui ne rendent pas le JS.

**Approche recommandée — deux couches :**

1. **`index.html`** : meta tags statiques corrects (fallback crawlers non-JS) + structured data JSON-LD statique
2. **`SEOHead` composant** : met à jour dynamiquement via `document.querySelector` (déjà fonctionnel, pattern établi)

**index.html cible :**

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Elias — Consultant Automatisation PME | n8n & Claude Code</title>
    <meta name="description" content="Je construis des automatisations sur mesure pour libérer du temps aux PME de services. Relances, onboarding, reporting — vos tâches répétitives tournent sans vous." />
    <meta name="author" content="Elias" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://[domaine]/" />

    <!-- OG / LinkedIn -->
    <meta property="og:title" content="Elias — Consultant Automatisation PME" />
    <meta property="og:description" content="Je construis des automatisations sur mesure pour libérer du temps aux PME de services." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://[domaine]/images/og-image.png" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:site_name" content="Elias Automatisation" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Elias — Consultant Automatisation PME" />
    <meta name="twitter:description" content="..." />
    <meta name="twitter:image" content="https://[domaine]/images/og-image.png" />

    <!-- Structured Data JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": ["Person", "ProfessionalService"],
      "name": "Elias",
      "jobTitle": "Consultant Automatisation PME",
      "description": "Je construis des automatisations avec n8n et Claude Code pour les PME de services.",
      "url": "https://[domaine]/",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR"
      },
      "areaServed": {
        "@type": "Country",
        "name": "France"
      },
      "knowsAbout": ["automatisation", "n8n", "Claude Code", "PME", "workflows"],
      "offers": {
        "@type": "Offer",
        "description": "Appel découverte gratuit de 20 minutes"
      }
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Pattern 4 : About.tsx — migration hors de photographerInfo

**Problème :** About.tsx importe `photographerInfo` de `photographer.ts` et affiche du contenu photographe.

**Approche Phase 1 :** Réécrire About.tsx avec le contenu consultant minimal issu de `businessInfo` (pas de vrai bio — Phase 2). La structure peut rester similaire mais le contenu change.

**Version minimale honnête :**
- Titre : "À propos"
- Sous-titre : "Consultant en automatisation pour PME de services"
- Texte : paragraphe court honnête sur l'expertise technique (n8n, Claude Code) et l'approche (comprendre les problèmes métier avant de parler d'outils)
- Supprimer : vidéo Pexels, import photographerInfo, mentions "Photographer & Visual Storyteller", liens Behance
- Garder : structure de page, SEOHead, liens sociaux (LinkedIn au minimum)

### Pattern 5 : Choix du type structured data (SEO-03)

**Recommandation : combiner `Person` + `ProfessionalService`**

Justification :
- `Person` : approprié pour un consultant indépendant avec un portfolio
- `ProfessionalService` : signale à Google que c'est une offre de service commerciale
- `LocalBusiness` : moins adapté car Elias n'a pas d'adresse physique et opère en remote France
- Schema.org permet les types multiples via tableau `@type`

---

## Don't Hand-Roll

| Problème | Ne pas construire | Utiliser à la place | Pourquoi |
|----------|-------------------|---------------------|---------|
| Validation formulaire | Validation manuelle avec `useState` | `react-hook-form` + `zod` — déjà installés | Gestion erreurs, a11y, touched states — complexité masquée |
| Meta tags dynamiques | Nouveau système de meta | `SEOHead` existant — déjà fonctionnel dans toutes les pages | Réinventer la roue, risque de régression |
| Structured data | Librairie JSON-LD tierce | JSON-LD inline dans `index.html` (statique) ou `<script>` dans SEOHead | Pas de dépendance supplémentaire pour 30 lignes de JSON |
| Sélect secteur formulaire | `<select>` natif custom | `@radix-ui/react-select` (shadcn/ui) — déjà installé | Accessibilité, cohérence design system |

---

## Common Pitfalls

### Pitfall 1 : Hardcoder le copy dans les composants plutôt que dans business.ts

**Ce qui va mal :** Le planner modifie directement HeroSection.tsx avec le nouveau texte inline, sans passer par `business.ts`.
**Pourquoi ça arrive :** C'est plus rapide à écrire, et le copy actuel n'est pas centralisé.
**Comment éviter :** Les plans doivent systématiquement modifier `business.ts` en premier, puis mettre à jour le composant pour lire la nouvelle clé.
**Signe d'alerte :** Un plan qui modifie un composant `.tsx` avec une string de copy sans toucher `business.ts`.

### Pitfall 2 : Formulaire Contact sans placeholder de soumission

**Ce qui va mal :** Le formulaire est créé mais `onSubmit` ne fait rien (pas de backend en Phase 1).
**Pourquoi ça arrive :** La logique backend arrive en Phase 3.
**Comment éviter :** `onSubmit` doit afficher un toast `sonner` avec un message de confirmation ("Message reçu, je vous réponds sous 24h") et/ou ouvrir le lien `mailto:`. Pas de `console.log()` visible en production.

### Pitfall 3 : About.tsx brise le build si photographerInfo est supprimé sans migration

**Ce qui va mal :** Supprimer `photographer.ts` ou retirer `photographerInfo` avant de modifier About.tsx.
**Pourquoi ça arrive :** La tentation de supprimer le code mort (Phase 4 normalement).
**Comment éviter :** Brownfield rule de CLAUDE.md — remplacer avant de supprimer. About.tsx doit être migré vers `businessInfo` avant que `photographer.ts` soit touché.

### Pitfall 4 : SEOHead ne met pas à jour les tags dupliqués dans index.html

**Ce qui va mal :** `index.html` garde les tags Lovable (`og:image` pointant vers Lovable), et SEOHead ne les écrase pas si la propriété existe déjà avec un attribut différent.
**Pourquoi ça arrive :** `SEOHead` utilise `document.querySelector('meta[property="og:image"]')` — si le tag n'existe pas en property mais en name (ou vice versa), il ne le trouve pas.
**Comment éviter :** Nettoyer `index.html` des meta tags existants pour éviter les doublons. Vérifier avec l'inspecteur que chaque meta apparaît une seule fois.

### Pitfall 5 : `og:locale` manquant — LinkedIn affiche en anglais

**Ce qui va mal :** Partage LinkedIn affiche le contenu correctement mais la langue est signalée comme anglaise.
**Pourquoi ça arrive :** `og:locale` est absent de SEOHead et de index.html.
**Comment éviter :** Ajouter `og:locale` = `fr_FR` dans index.html ET dans SEOHead (ou au moins dans index.html comme fallback statique).

### Pitfall 6 : Formulaire > 5 champs

**Ce qui va mal :** Ajouter des champs "entreprise", "téléphone", "budget", "urgence" en plus des 4 requis.
**Pourquoi ça arrive :** Instinct B2B de vouloir qualifier au maximum.
**Comment éviter :** REQUIREMENTS.md liste explicitement "Formulaire > 5 champs" dans Out of Scope. Respecter la limite de 4 champs (nom, email, secteur, problème).

---

## Code Examples

### Formulaire contact qualifiant (COPY-03)

```typescript
// Source : react-hook-form + zod, pattern shadcn/ui
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, 'Votre prénom est requis'),
  email: z.string().email('Adresse email invalide'),
  sector: z.enum(['conseil', 'formation', 'services-pro', 'autre'], {
    required_error: 'Sélectionnez votre secteur d\'activité',
  }),
  problem: z.string().min(20, 'Décrivez votre situation en quelques mots (min. 20 caractères)'),
});

type ContactFormData = z.infer<typeof contactSchema>;

function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Phase 1 : placeholder — Phase 3 appellera l'Edge Function
    window.location.href = `mailto:${businessInfo.email}?subject=Demande de contact — ${data.sector}&body=${encodeURIComponent(data.problem)}`;
    toast.success('Merci ! Je vous réponds sous 24h.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* champs ici */}
    </form>
  );
}
```

### SEOHead — ajout og:locale

```typescript
// Dans SEOHead.tsx, ajouter dans le useEffect :
updateMetaTag('og:locale', 'fr_FR', true);
```

### Structured data JSON-LD dans index.html

```html
<!-- Insérer dans <head> de index.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["Person", "ProfessionalService"],
  "name": "Elias",
  "jobTitle": "Consultant Automatisation PME",
  "description": "Automatisations sur mesure pour PME de services avec n8n et Claude Code.",
  "url": "https://elias-automation.com",
  "email": "contact@elias-automation.com",
  "address": { "@type": "PostalAddress", "addressCountry": "FR" },
  "areaServed": { "@type": "Country", "name": "France" }
}
</script>
```

### Suppression stats dans HeroSection.tsx

La section stats actuelle (lignes de `businessInfo.stats.map(...)`) doit être supprimée. Le composant HeroSection.tsx ne référence pas `businessInfo` pour le texte principal — il n'y a donc pas de mapping à retirer, juste le JSX de la section stats si elle existe (à vérifier : le HeroSection actuel ne montre pas de stats dans le JSX — la suppression se fait dans `business.ts` uniquement, en retirant le tableau `stats`).

---

## State of the Art

| Ancienne approche | Approche actuelle | Impact |
|-------------------|-------------------|--------|
| react-helmet pour les meta tags SPA | Manipulation DOM directe (`document.querySelector`) | SEOHead existant est suffisant — pas besoin de react-helmet |
| Structured data via plugin CMS | JSON-LD inline dans `<head>` | Approche standard pour SPA statique — aucun plugin requis |
| Formulaire HTML natif | react-hook-form + zod | Déjà dans la stack, validation et a11y de série |

---

## Open Questions

1. **URL du domaine final**
   - Ce qu'on sait : l'email est `contact@elias-automation.com` — le domaine est probablement `elias-automation.com`
   - Ce qui est flou : pas confirmé dans les fichiers du projet
   - Recommandation : utiliser un placeholder `[DOMAINE]` dans index.html et dans les canonical URLs — à remplacer quand le domaine est confirmé. Ne pas bloquer la phase pour ça.

2. **Image OG**
   - Ce qu'on sait : `heroPortrait` existe (`src/assets/hero-portrait-real.jpg`). C'est la photo réelle d'Elias.
   - Ce qui est flou : les dimensions idéales LinkedIn sont 1200×627px. On ne connaît pas les dimensions actuelles du fichier.
   - Recommandation : utiliser la photo portrait existante comme OG image temporaire, copiée dans `public/images/og-image.jpg`. Si les dimensions ne sont pas bonnes, LinkedIn la recadre — acceptable pour Phase 1.

3. **About.tsx — profondeur de la réécriture**
   - Ce qu'on sait : la phase indique "nettoyer les mentions photographe". La vraie bio est déferrée à Phase 2.
   - Ce qui est flou : faut-il garder la structure split-layout avec photo, ou simplifier radicalement ?
   - Recommandation : garder une page simple avec `SEOHead`, titre "À propos", 1-2 paragraphes honnêtes depuis `businessInfo`, et lien LinkedIn. Supprimer la vidéo Pexels et tous les imports de `photographerInfo`.

---

## Validation Architecture

`nyquist_validation` est activé dans `.planning/config.json`.

### Test Framework

Ce projet est un frontend React/Vite pur. Il n'y a **aucune infrastructure de test installée** — ni Vitest, ni Jest, ni Playwright, ni Cypress. Aucun fichier `*.test.*`, `*.spec.*`, `tests/`, ni `__tests__/` n'existe.

| Propriété | Valeur |
|-----------|--------|
| Framework | Aucun — Wave 0 doit l'installer |
| Fichier config | Aucun — Wave 0 |
| Commande rapide | `npx tsc --noEmit` (TypeScript check) |
| Suite complète | `npm run build` (build TypeScript complet) |

**Note :** Pour une phase de copywriting et SEO, les tests automatisés pertinents sont : (a) le build TypeScript passe, (b) le HTML final contient les meta tags attendus. Les tests e2e complets (Playwright) seraient disproportionnés pour cette phase.

### Phase Requirements → Test Map

| Req ID | Comportement | Type de test | Commande automatisée | Fichier existe ? |
|--------|-------------|--------------|----------------------|-----------------|
| COPY-01 | Hero n'affiche plus de stats | TypeScript build | `npm run build` | ✅ (build script) |
| COPY-02 | Sections lisent depuis businessInfo | TypeScript (types) | `npx tsc --noEmit` | ✅ |
| COPY-03 | Formulaire contact se valide | Manuel — interaction UI | n/a | ❌ Wave 0 si Vitest |
| SEO-01 | Meta title/description corrects par page | Manuel ou build check | `npm run build` | ✅ |
| SEO-02 | og:image, og:locale présents dans index.html | Inspection manuelle | `grep -r "og:locale" index.html` | ✅ (fichier existe) |
| SEO-03 | JSON-LD présent dans index.html | Inspection manuelle + Rich Results Test | `grep -r "application/ld+json" index.html` | ✅ (fichier existe) |

### Sampling Rate

- **Par commit de tâche :** `npm run build` — s'assurer que le TypeScript compile
- **Par merge de wave :** `npm run build` + inspection manuelle dans le navigateur (LinkedIn debugger pour OG tags, Google Rich Results Test pour structured data)
- **Phase gate :** Build vert + checklist manuelle SEO avant `/gsd:verify-work`

### Wave 0 Gaps

- [ ] Aucun framework de test — acceptable pour cette phase (copywriting + SEO = vérification principalement manuelle)
- [ ] Si Vitest est souhaité pour Phase 1 : `npm install -D vitest @testing-library/react @testing-library/user-event jsdom`

*(Pour cette phase spécifique, l'absence de Vitest n'est pas bloquante — la validation se fait via build TypeScript + inspection navigateur)*

---

## Sources

### Primary (HIGH confidence)

- Inspection directe du code source — `src/data/business.ts`, `src/components/seo/SEOHead.tsx`, `src/sections/*.tsx`, `src/pages/*.tsx`, `index.html`
- `.planning/phases/01-copywriting-seo/01-CONTEXT.md` — décisions verrouillées
- `.planning/REQUIREMENTS.md` — critères de succès et contraintes Out of Scope
- `CLAUDE.md` — règles absolues (brownfield, pas de stack change, contenu dans business.ts)
- `.claude/skills/copywriting/SKILL.md` — principes copywriting à appliquer
- `.claude/skills/seo-audit/SKILL.md` — framework SEO et critères meta tags
- `.claude/skills/marketing-psychology/SKILL.md` — principes psychologie (Pratfall Effect, Authority Bias, BJ Fogg)

### Secondary (MEDIUM confidence)

- Schema.org documentation — types Person et ProfessionalService pour consultant indépendant
- LinkedIn OG tag requirements — `og:locale` fr_FR, image 1200×627px recommandée

### Tertiary (LOW confidence)

- Aucune

---

## Metadata

**Confidence breakdown :**
- Standard stack : HIGH — tout est déjà installé, vérifié dans package.json
- Architecture : HIGH — patterns dérivés directement du code source existant
- Copy recommendations : MEDIUM — principes issus des skills copywriting/marketing-psychology, formulations spécifiques à la discrétion de Claude lors de l'exécution
- SEO implementation : HIGH — SEOHead fonctionnel, index.html inspecté, JSON-LD pattern standard

**Research date :** 2026-03-17
**Valid until :** 2026-04-17 (stack stable, pas de dépendances externes volatiles)
