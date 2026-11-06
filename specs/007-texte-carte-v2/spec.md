# Contrat de réception

Source de vérité : [ticket #7](https://github.com/Eliassylla/porfolio-elias/issues/7),
[notice importée](../../src/integrations/section01/v2/LISEZ-MOI.md) et
[procédure générale](../../docs/methode/reception-composants.md).

- Remplacer uniquement le composant monté dans `Home.tsx`, en gardant son emplacement.
- Importer les fichiers d’exécution et les quatre assets sans les modifier, contrôler
  leurs empreintes et préserver manifeste, notices et version.
- Fournir GSAP/ScrollTrigger 3.13.0 du site, sans vendor ni page d’aperçu autonome.
- Monter après insertion du HTML ; transmettre le thème sans recréer l’instance ; détruire
  l’instance avant retrait. Ne jamais réécrire ses enfants pendant son activité.
- Conserver seuils 640/768/1024 px, carte téléphone entière et recadrage ordinateur,
  entrées indépendantes et délai convenu. Révélation unique par montage, sans reverse.
- Conserver le contenu statique et la préférence de réduction des animations gérés par l’export.
- Préserver l’ancien composant et ses assets comme retour possible jusqu’à validation.
- Ne pas corriger un mouvement ou asset intrinsèque ici : relever la reproduction et
  demander une livraison corrective au Studio suivant le circuit des tickets liés.

Réception : comparaison dans la vraie page, variantes, scroll, navigation, clavier,
retrait/remontage, console et mesures avant/après suivant le ticket. Les contrôles de
compilation ne remplacent aucun de ces essais. Le navigateur est désactivé dans Work ;
Elias prend les essais visuels. Les droits des marques/icônes ne sont pas attestés par
les notices : limite conservée avant toute diffusion, aucune publication autorisée.
