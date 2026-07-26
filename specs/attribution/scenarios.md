# Scénarios — attribution UTM

Contrat de référence : [`utm-contract.md`](./utm-contract.md).

Chaque scénario a une fixture correspondante dans `specs/fixtures/`, consommée par `src/lib/attribution/capture.test.ts`. Les fixtures sont la définition exécutable de ces scénarios : si l'un des deux change, l'autre doit changer dans la même tâche.

```gherkin
Scénario : Arrivée avec attribution complète
  Étant donné une arrivée sur /?utm_source=LinkedIn&utm_medium=Post&utm_campaign=Agents
  Quand l'attribution est capturée
  Alors source=linkedin, medium=post, campaign=agents
  Et l'embed Cal reçoit ces valeurs dans son config

Scénario : Arrivée directe
  Étant donné une arrivée sur / sans aucun paramètre
  Quand l'attribution est capturée
  Alors source=direct et medium=none
  Et aucun champ ne vaut null ni chaîne vide

Scénario : Attribution partielle
  Étant donné une arrivée avec utm_source seul
  Quand l'attribution est capturée
  Alors utm_source est normalisé
  Et les champs absents prennent leur défaut

Scénario : Premier toucher gagne
  Étant donné une session déjà attribuée à source=linkedin
  Quand le visiteur navigue vers /?utm_source=twitter
  Alors l'attribution reste source=linkedin

Scénario : Attribution stockée corrompue
  Étant donné un contenu de sessionStorage qui n'est pas une attribution valide
  Quand l'attribution est résolue
  Alors la nouvelle capture gagne
  Et aucune erreur n'est levée

Scénario : Entrée hostile
  Étant donné utm_source="<script>alert(1)</script>" et un utm_campaign de 5000 caractères
  Quand l'attribution est capturée
  Alors utm_source ne contient que [a-z0-9._-]
  Et utm_campaign fait au plus 64 caractères
  Et aucune valeur n'est interprétée comme du HTML

Scénario : Aucune PII ne franchit la frontière
  Étant donné utm_source="jean.dupont@exemple.fr"
  Quand l'attribution est capturée
  Alors utm_source vaut direct
  Et aucun champ d'attribution ne contient de caractère @

Scénario : sessionStorage indisponible
  Étant donné un contexte où l'accès à sessionStorage lève une exception
  Quand l'attribution est capturée
  Alors l'attribution est calculée et utilisable
  Et aucune erreur ne remonte à l'utilisateur
```

## Critères d'acceptation

1. Une arrivée sans UTM reste exploitable (`direct` / `none`), jamais `null`.
2. Le premier toucher gagne, y compris après rechargement de la page.
3. Aucune donnée personnelle n'entre dans un champ d'attribution — vérifié par test, pas par relecture.
4. Une entrée hostile ne produit ni crash, ni valeur non assainie, ni dépassement de longueur.
5. `sessionStorage` indisponible dégrade sans casser la page.
6. L'embed Cal reçoit l'attribution dans son `config` au montage.
7. Aucun appel réseau, aucun secret, aucune action externe, aucune automatisation ajoutés.

Les critères 1 à 5 sont couverts par `npm test`. Le critère 6 relève du câblage (tâche séparée). Le critère 7 se vérifie par revue du diff.
