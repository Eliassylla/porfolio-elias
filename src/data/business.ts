export const businessInfo = {
  name: 'Elias',
  title: 'Automatisation n8n pour PME de services',
  tagline: 'Vos tâches répétitives vous coûtent du temps et des clients.',
  heroDescription:
    'Factures oubliées, relances jamais envoyées, devis sans suivi… Chaque jour, votre entreprise perd du temps et de l\'argent sur des tâches qui pourraient tourner toutes seules.',
  heroCta: 'Réserver un appel découverte',
  calendlyUrl: '#calendly', // placeholder
  email: 'contact@elias-automation.com',
  location: 'France',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/elias',
    youtube: 'https://youtube.com/@elias',
  },
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
