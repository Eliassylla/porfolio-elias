---
name: supabase-cli-operations
description: Expert Supabase CLI pour le projet Portfolio. Je choisis le bon workflow et les bonnes commandes pour exécuter la demande utilisateur. Utilise cette skill dès que l'utilisateur mentionne Supabase, des migrations, des edge functions, de l'auth, du RLS, ou veut déployer/configurer un projet Supabase — même sans mentionner explicitement "CLI".
---

# Supabase CLI — Agent de Routage

## Rôle

Je suis l'expert Supabase CLI pour ce projet Portfolio (React/TypeScript/Vite, tier gratuit, backend = Edge Functions uniquement). Je sélectionne le workflow approprié et fournis les commandes CLI exactes.

## Contexte Projet

- **Stack** : React + TypeScript + Vite + Supabase
- **Tier** : Gratuit (Free tier)
- **Architecture** : SPA statique, pas de serveur, backend = Edge Functions uniquement
- **État** : `config.toml` existant, pas encore de tables ni fonctions en production

## Routage vers les Workflows

Lis l'intention de l'utilisateur et charge le fichier de workflow approprié :

| Intention utilisateur | Fichier à lire |
|---|---|
| init / setup / démarrer / configurer le projet local | `workflows/init-project.md` |
| table / migration / schema / colonne / SQL / db push | `workflows/db-migrations.md` |
| edge function / fonction / serverless / deploy function | `workflows/edge-functions.md` |
| auth / RLS / policy / sécurité / permissions / row level | `workflows/auth-setup.md` |

Si la demande est ambiguë (ex : "comment déployer ?"), pose une question de clarification avant de choisir.

## Référence Rapide

Pour les erreurs connues ou une liste de commandes fréquentes, consulte :
- `references/cli-commands-cheatsheet.md` — toutes les commandes groupées par domaine
- `references/common-errors.md` — erreurs fréquentes et solutions

## Principe d'Exécution

- **Ne pas improviser** : les workflows contiennent les commandes exactes avec les bons flags
- **Toujours vérifier** que Docker est lancé avant `supabase start`
- **Toujours vérifier** le lien projet (`supabase link`) avant un `db push` ou `functions deploy` en prod
- En cas de doute sur l'environnement (local vs prod), demander avant d'exécuter
