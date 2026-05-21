# Erreurs Courantes — Supabase CLI

Référence centralisée des erreurs rencontrées avec le Supabase CLI, organisées par domaine.

---

## Stack Locale (supabase start/stop)

### `Cannot connect to the Docker daemon`
**Symptôme** : `supabase start` échoue immédiatement.
**Cause** : Docker Desktop n'est pas lancé ou le socket Docker est inaccessible.
**Solution** :
```bash
# Vérifier que Docker est actif
docker info
# Si erreur → Ouvrir Docker Desktop et attendre "Running"
```

### `bind: address already in use` / `port is already allocated`
**Symptôme** : Conflit de port au démarrage.
**Cause** : Un service utilise déjà le port 54321, 54322, ou 54323.
**Solution** :
```bash
# Option 1 : Arrêter proprement les services Supabase
supabase stop

# Option 2 : Trouver et tuer le processus qui occupe le port
lsof -i :54321
kill -9 <PID>

# Option 3 : Modifier les ports dans config.toml
```

### `Error: Cannot find project config`
**Symptôme** : Commande supabase échoue avec cette erreur.
**Cause** : Pas de `supabase/config.toml` dans le répertoire courant.
**Solution** :
```bash
# S'assurer d'être à la racine du projet
ls supabase/config.toml
# Si absent → supabase init
```

### `health check failed` au démarrage
**Symptôme** : Services qui ne deviennent pas healthy.
**Cause** : Ressources insuffisantes (RAM/CPU) ou images corrompues.
**Solution** :
```bash
# Ignorer le health check (temporaire)
supabase start --ignore-health-check

# Ou nettoyer et recommencer
supabase stop --backup
docker system prune -f
supabase start
```

---

## Migrations

### `ERROR: relation "xxx" already exists`
**Symptôme** : Migration échoue avec erreur PostgreSQL.
**Cause** : Tentative de créer une table/index déjà existant.
**Solution** : Utiliser `IF NOT EXISTS` dans le SQL :
```sql
CREATE TABLE IF NOT EXISTS contacts (...);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
```

### `Migration version xxx already exists`
**Symptôme** : `migration new` ou `migration up` échoue.
**Cause** : Timestamp dupliqué (deux migrations créées la même seconde).
**Solution** : Renommer manuellement le fichier conflictuel avec un timestamp différent.

### `Migrations not applied in remote`
**Symptôme** : `migration list` montre des migrations locales non appliquées en prod.
**Cause** : `db push` non exécuté depuis la dernière migration.
**Solution** :
```bash
supabase db push --dry-run  # Vérifier d'abord
supabase db push
```

### `ERROR: syntax error at or near "xxx"`
**Symptôme** : Migration SQL invalide.
**Cause** : Erreur de syntaxe SQL dans le fichier migration.
**Solution** : Tester le SQL dans Studio (`http://127.0.0.1:54323` → SQL Editor) avant de l'écrire dans la migration.

---

## Edge Functions

### `401 Unauthorized`
**Symptôme** : Appel à une function retourne 401.
**Cause** : JWT manquant ou invalide dans la requête.
**Solution** :
```bash
# En développement, désactiver la vérification JWT
supabase functions serve --no-verify-jwt

# En production, toujours passer le header :
curl -H "Authorization: Bearer <anon_key_or_user_jwt>" ...
```

### `Function not found` (404)
**Symptôme** : Appel à `functions/v1/<nom>` retourne 404.
**Cause** : Fonction non déployée ou nom incorrect.
**Solution** :
```bash
supabase functions list  # Vérifier les fonctions déployées
supabase functions deploy <nom>
```

### Import Deno échoue (timeout)
**Symptôme** : `functions serve` échoue lors de l'import de modules Deno.
**Cause** : Timeout réseau pour les imports distants (`https://deno.land/...`).
**Solution** :
```bash
# Option 1 : Relancer (souvent résolu)
supabase functions serve

# Option 2 : Utiliser un import_map.json local
# Option 3 : Mettre à jour les imports vers esm.sh ou jsr.io
```

### `Error: missing secret`
**Symptôme** : Function échoue en production avec erreur liée à une variable d'env.
**Cause** : Secret non configuré en prod.
**Solution** :
```bash
supabase secrets list  # Vérifier les secrets existants
supabase secrets set MY_SECRET=valeur
```

### `Bundle too large` (>10MB)
**Symptôme** : Déploiement échoue avec erreur de taille.
**Cause** : Trop de dépendances ou imports volumineux.
**Solution** :
```bash
# Utiliser le bundling côté serveur (gère mieux les dépendances)
supabase functions deploy --use-api

# Ou réduire les imports dans le code
```

---

## Auth & RLS

### `new row violates row-level security policy for table "xxx"`
**Symptôme** : INSERT/UPDATE échoue malgré un utilisateur authentifié.
**Cause** : La policy `WITH CHECK` n'est pas satisfaite.
**Solution** : Vérifier que `user_id` est bien passé dans la requête et correspond à `auth.uid()`.

### `permission denied for table xxx`
**Symptôme** : SELECT retourne une erreur de permission.
**Cause** : RLS activé mais aucune policy SELECT ne correspond.
**Solution** :
```sql
-- Vérifier les policies existantes
SELECT * FROM pg_policies WHERE tablename = 'xxx';
-- Ajouter une policy si nécessaire
```

### Les redirections OAuth ne fonctionnent pas
**Symptôme** : Retour OAuth redirige vers une URL incorrecte.
**Cause** : `site_url` ou `additional_redirect_urls` non configurés.
**Solution** :
1. Mettre à jour `config.toml` pour le local
2. Configurer dans Dashboard Supabase → Authentication → URL Configuration pour la prod

### `Email not confirmed`
**Symptôme** : Login bloqué après inscription.
**Cause** : Confirmation email activée (`enable_confirmations = true`).
**Solution** : Pour le développement, désactiver dans `config.toml` :
```toml
[auth.email]
enable_confirmations = false
```

---

## Connexion & Authentification CLI

### `supabase: command not found`
**Solution** :
```bash
brew install supabase/tap/supabase
# Vérifier :
supabase --version
```

### `Error: Not logged in`
**Solution** :
```bash
supabase login
# Ouvre le navigateur pour l'authentification
```

### `Error: Project not linked`
**Symptôme** : `db push` ou `functions deploy` échoue.
**Solution** :
```bash
# Récupérer le project-ref dans le dashboard Supabase → Settings → General
supabase link --project-ref <votre-project-ref>
```

---

## Erreurs Rencontrées sur ce Projet

<!-- Documenter ici les erreurs spécifiques rencontrées sur le Portfolio -->
