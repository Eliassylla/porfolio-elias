# Supabase CLI — Cheatsheet Complète

## Projet & Stack Locale

```bash
supabase init                          # Initialiser (crée config.toml)
supabase init --force                  # Forcer réinit (écrase l'existant)
supabase start                         # Démarrer tous les services Docker
supabase start -x imgproxy,storage     # Démarrer sans certains services
supabase stop                          # Arrêter proprement
supabase stop --backup                 # Arrêter et sauvegarder les données
supabase status                        # Voir les URLs et clés
supabase status -o env                 # Output en format variables d'env
supabase status -o json                # Output JSON
supabase link --project-ref <ref>      # Lier au projet distant
```

## Migrations

```bash
supabase migration new <name>          # Créer une nouvelle migration vide
supabase migration list                # Lister local + distant
supabase migration list --local        # Local seulement
supabase migration list --linked       # Distant seulement
supabase migration up                  # Appliquer les migrations en attente (local)
supabase migration up --linked         # Appliquer sur le projet lié
supabase migration down --last 1       # Annuler la dernière migration
supabase migration squash              # Regrouper en un seul fichier
supabase migration repair <ts> --status applied    # Marquer comme appliquée
supabase migration repair <ts> --status reverted   # Marquer comme annulée
```

## Base de Données

```bash
supabase db diff                       # Voir les changements non-migrés
supabase db diff --file <name>         # Sauvegarder le diff en migration
supabase db diff --linked              # Comparer avec le projet distant
supabase db push                       # Pousser les migrations en prod
supabase db push --dry-run             # Simuler sans appliquer
supabase db push --include-roles       # Inclure les rôles
supabase db pull                       # Récupérer le schéma distant
supabase db reset                      # Réinitialiser la base locale
supabase db reset --no-seed            # Reset sans seed
supabase db dump --file schema.sql     # Exporter le schéma SQL
supabase db dump --data-only           # Exporter les données
supabase db lint                       # Linter le schéma
```

## Edge Functions

```bash
supabase functions new <name>                    # Créer une nouvelle fonction
supabase functions serve                         # Servir localement
supabase functions serve --env-file .env.local   # Avec variables d'env
supabase functions serve --no-verify-jwt         # Sans vérif JWT (dev)
supabase functions serve --inspect               # Avec débogueur Deno
supabase functions list                          # Lister les fonctions déployées
supabase functions deploy <name>                 # Déployer une fonction
supabase functions deploy                        # Déployer toutes
supabase functions deploy --no-verify-jwt        # Déployer sans vérif JWT
supabase functions deploy --use-api              # Bundling côté serveur (rapide)
supabase functions deploy --prune                # Supprimer celles qui n'existent plus
supabase functions delete <name>                 # Supprimer une fonction
supabase functions download <name>               # Télécharger le code source
```

## Secrets (Variables d'Env pour les Functions)

```bash
supabase secrets list                            # Lister les secrets
supabase secrets set KEY=value                   # Ajouter un secret
supabase secrets set KEY1=v1 KEY2=v2             # Ajouter plusieurs
supabase secrets set --env-file .env.production  # Depuis un fichier .env
supabase secrets unset KEY                       # Supprimer un secret
```

## Authentification & Compte

```bash
supabase login                         # Se connecter à Supabase Cloud
supabase logout                        # Se déconnecter
supabase projects list                 # Lister les projets
```

## Génération de Types TypeScript

```bash
supabase gen types typescript --local > src/types/supabase.ts
supabase gen types typescript --linked > src/types/supabase.ts
```

> Utile pour avoir des types TypeScript auto-générés depuis le schéma de la base.

## Flags Globaux Utiles

```bash
--project-ref <ref>    # Spécifier le projet distant (alternative à supabase link)
--workdir <path>       # Répertoire de travail alternatif
--debug                # Mode verbose pour le débogage
```
