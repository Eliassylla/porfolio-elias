export const businessInfo = {
  name: 'Elias',
  title: 'Automatisations & Solutions IA pour PME de services',
  tagline: 'Je construis des automatisations et des solutions avec Claude Code + n8n pour les petites entreprises de services.',
  heroDescription:
    'Factures oubliées, relances jamais envoyées, devis sans suivi… Chaque jour, votre entreprise perd du temps et de l\'argent sur des tâches qui pourraient tourner toutes seules. Je les automatise pour vous.',
  heroCta: 'Réserver un appel découverte',
  calendlyUrl: '#calendly', // placeholder
  email: 'contact@elias-automation.com',
  location: 'France',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/elias',
    youtube: 'https://youtube.com/@elias',
  },

  // Stats / social proof
  stats: [
    { value: '120+', label: 'Heures économisées pour mes clients' },
    { value: '15+', label: 'Workflows déployés' },
    { value: '100%', label: 'Clients satisfaits' },
  ],

  // Process steps (Services & Méthode page)
  process: [
    {
      id: 'audit',
      number: '01',
      title: 'Audit & Cartographie',
      description: 'Je cartographie vos processus actuels, identifie les goulots d\'étranglement et les tâches chronophages.',
    },
    {
      id: 'strategie',
      number: '02',
      title: 'Stratégie',
      description: 'Je conçois l\'architecture de la solution : quels outils, quels flux, quel ROI attendu.',
    },
    {
      id: 'build',
      number: '03',
      title: 'Build n8n / Claude Code',
      description: 'Je construis, teste et itère sur vos automatisations jusqu\'à ce qu\'elles tournent parfaitement.',
    },
    {
      id: 'formation',
      number: '04',
      title: 'Formation & Passation',
      description: 'Je vous forme sur vos nouveaux outils et reste disponible pour le support.',
    },
  ],

  // Services / offres
  services: [
    {
      id: 'finance',
      title: 'Finance & Administration',
      description:
        'Relances de factures automatiques, suivi des paiements, rappels d\'échéances. Plus jamais un impayé oublié.',
      icon: 'receipt' as const,
    },
    {
      id: 'commercial',
      title: 'Commercial & Clients',
      description:
        'Suivi des devis, onboarding client automatisé, relances commerciales. Chaque prospect reçoit le bon message au bon moment.',
      icon: 'users' as const,
    },
    {
      id: 'rh',
      title: 'RH & Organisation',
      description:
        'Onboarding collaborateurs, rappels de documents, suivi des congés. Le minimum administratif, sans effort.',
      icon: 'clipboard' as const,
    },
  ],

  // Projects / portfolio
  projects: [
    {
      id: 'relances-factures',
      title: 'Automatisation des relances de factures',
      context: 'Solo / projet perso, pensé pour une petite agence de conseil',
      problem: 'Le dirigeant oublie de relancer les factures impayées. Résultat : trésorerie tendue et temps perdu à courir après les paiements.',
      solution: 'Workflow n8n + Notion + Gmail. Claude Code pour rédiger les mails de relance personnalisés.',
      result: 'Gain estimé : 1–2h/semaine, moins d\'impayés.',
      tags: ['n8n', 'Claude Code', 'Notion'],
      image: null, // placeholder
      demoUrl: null,
    },
    {
      id: 'onboarding-client',
      title: 'Onboarding client automatisé',
      context: 'Cabinet de conseil RH — 3 salariés',
      problem: 'Chaque nouveau client nécessite 45 minutes de setup manuel : email de bienvenue, accès outils, questionnaire, agenda.',
      solution: 'Workflow n8n déclenché à la signature du devis. Envoi automatique de tous les documents + création des accès.',
      result: 'Gain estimé : 45 min par client, zéro oubli.',
      tags: ['n8n', 'CRM'],
      image: null,
      demoUrl: null,
    },
    {
      id: 'suivi-devis',
      title: 'Suivi et relance des devis',
      context: 'Organisme de formation — 8 personnes',
      problem: 'Les devis envoyés tombent dans l\'oubli. Aucun suivi systématique, des prospects perdus.',
      solution: 'Pipeline automatisé : notification à J+3, relance à J+7, alerte au commercial à J+14. Claude Code génère des relances contextuelles.',
      result: 'Taux de conversion devis estimé : +20%.',
      tags: ['n8n', 'Claude Code', 'CRM'],
      image: null,
      demoUrl: null,
    },
    {
      id: 'reporting-hebdo',
      title: 'Reporting hebdomadaire automatique',
      context: 'Cabinet comptable — projet interne',
      problem: 'Le dirigeant passe 2h chaque lundi à compiler les chiffres de la semaine depuis 4 outils différents.',
      solution: 'n8n récupère les données de chaque outil, Claude Code génère un résumé structuré envoyé par email chaque lundi à 8h.',
      result: 'Gain estimé : 2h/semaine, vision claire dès le lundi matin.',
      tags: ['n8n', 'Claude Code'],
      image: null,
      demoUrl: null,
    },
  ],

  // Target clients
  targets: [
    {
      id: 'conseil',
      title: 'Conseil & Accompagnement',
      description:
        'Consultants indépendants et cabinets de conseil qui passent plus de temps sur l\'admin que sur leurs clients.',
      pain: 'Vous jonglez entre Excel, emails et factures au lieu de conseiller vos clients.',
    },
    {
      id: 'formation',
      title: 'Organismes de Formation',
      description:
        'Centres de formation submergés par les inscriptions, convocations et suivis post-formation.',
      pain: 'Chaque session génère des dizaines d\'emails manuels et de documents à envoyer.',
    },
    {
      id: 'services-pro',
      title: 'Cabinets de Services Professionnels',
      description:
        'Comptables, avocats, experts qui gèrent des dizaines de dossiers clients avec des process manuels.',
      pain: 'Les relances clients et le suivi de dossiers vous prennent des heures chaque semaine.',
    },
  ],

  testimonials: [
    {
      id: '1',
      quote:
        'Depuis qu\'Elias a automatisé nos relances de factures, on a récupéré 15 heures par mois. Et nos clients paient plus vite.',
      author: 'Marie D.',
      role: 'Directrice, Cabinet de conseil RH',
    },
    {
      id: '2',
      quote:
        'L\'onboarding de nos stagiaires était un cauchemar administratif. Maintenant tout part automatiquement dès l\'inscription validée.',
      author: 'Thomas R.',
      role: 'Responsable formation, Organisme certifié Qualiopi',
    },
    {
      id: '3',
      quote:
        'Simple, efficace, pas de jargon technique. Elias comprend nos problèmes métier avant de parler d\'outils.',
      author: 'Sophie L.',
      role: 'Gérante, Cabinet comptable',
    },
  ],
};
