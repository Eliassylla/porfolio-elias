export const businessInfo = {
  name: 'Elias',
  title: 'Systèmes opérationnels pour PME de services',
  tagline: 'Je construis des systèmes simples qui fiabilisent vos relances, votre suivi client et votre administratif.',
  heroDescription:
    'Factures oubliées, devis sans suite, informations dispersées… Chaque semaine, votre entreprise perd du temps sur des tâches qui devraient être cadrées. Je transforme ces points de friction en systèmes clairs, suivis et utilisables.',
  heroCta: 'Demander un audit',
  email: 'contact@elias-automation.com',
  location: 'France',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/elias',
    youtube: 'https://youtube.com/@elias',
  },

  // Stats / social proof
  stats: [
    { value: '120+', label: 'Heures économisées pour mes clients' },
    { value: '15+', label: 'Systèmes mis en place' },
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
      description: 'Je définis la solution : les étapes à cadrer, les responsabilités, et le gain attendu.',
    },
    {
      id: 'build',
      number: '03',
      title: 'Mise en place',
      description: 'Je construis, teste et ajuste vos systèmes jusqu\'à ce qu\'ils soient fiables au quotidien.',
    },
  ],

  // Services / offres
  services: [
    {
      id: 'automatisations',
      title: 'Automatisations',
      description:
        'Relances de factures, onboarding client, rapports hebdo. Je configure l\'automation et elle s\'enclenche au bon moment.',
      icon: 'receipt' as const,
    },
    {
      id: 'skills',
      title: 'Skills',
      description:
        'Votre IA sait rédiger mais pas à votre façon. Je lui crée les compétences qui manquent : vos modèles, vos procédures, votre vocabulaire métier — utilisables dans chacune de vos sessions.',
      icon: 'users' as const,
    },
    {
      id: 'agents-ia',
      title: 'Agents IA',
      description:
        'Un agent se connecte à vos outils, gère les étapes d\'une tâche de bout en bout et atteint l\'objectif que vous lui avez fixé. Je les construis sur mesure : qualification de leads, traitement de demandes, production de rapports.',
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
      solution: 'Un système suit les échéances, prépare les relances et garde une trace claire de chaque paiement en attente.',
      result: 'Gain estimé : 1–2h/semaine, moins d\'impayés.',
      serviceId: 'automatisations',
      tags: ['Finance', 'Relances', 'Suivi'],
      image: null, // placeholder
      demoUrl: null,
    },
    {
      id: 'onboarding-client',
      title: 'Onboarding client automatisé',
      context: 'Cabinet de conseil RH — 3 salariés',
      problem: 'Chaque nouveau client nécessite 45 minutes de setup manuel : email de bienvenue, accès outils, questionnaire, agenda.',
      solution: 'Un parcours d\'accueil envoie les bons documents, prépare les accès et rappelle les étapes à suivre.',
      result: 'Gain estimé : 45 min par client, zéro oubli.',
      serviceId: 'automatisations',
      tags: ['Accueil client', 'Documents'],
      image: null,
      demoUrl: null,
    },
    {
      id: 'suivi-devis',
      title: 'Suivi et relance des devis',
      context: 'Organisme de formation — 8 personnes',
      problem: 'Les devis envoyés tombent dans l\'oubli. Aucun suivi systématique, des prospects perdus.',
      solution: 'Un suivi commercial rappelle les bons prospects au bon moment et signale les dossiers qui nécessitent une réponse humaine.',
      result: 'Taux de conversion devis estimé : +20%.',
      serviceId: 'automatisations',
      tags: ['Commercial', 'Devis', 'Relances'],
      image: null,
      demoUrl: null,
    },
    {
      id: 'reporting-hebdo',
      title: 'Reporting hebdomadaire automatique',
      context: 'Cabinet comptable — projet interne',
      problem: 'Le dirigeant passe 2h chaque lundi à compiler les chiffres de la semaine depuis 4 outils différents.',
      solution: 'Un tableau de bord hebdomadaire rassemble les chiffres utiles et les transforme en résumé clair chaque lundi matin.',
      result: 'Gain estimé : 2h/semaine, vision claire dès le lundi matin.',
      serviceId: 'skills',
      tags: ['Reporting', 'Pilotage'],
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
