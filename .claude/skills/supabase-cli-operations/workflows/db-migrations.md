# Workflow : Migrations de Base de Données

## Objectif

Créer, versionner et appliquer des changements de schéma SQL de manière contrôlée, en local et en production.

## Prérequis

- [ ] Stack locale démarrée (`supabase start`) pour les opérations locales
- [ ] Projet lié (`supabase link`) pour les opérations en production
- [ ] Être à la racine du projet Portfolio

## Concepts Clés

Les migrations sont des fichiers SQL versionnés dans `supabase/migrations/`. Chaque fichier est nommé avec un timestamp : `20240101000000_add_users_table.sql`. La CLI gère un historique d'application pour savoir quelles migrations ont déjà été exécutées.

## Étapes

### 1. Créer une nouvelle migration

```bash
supabase migration new <nom_descriptif>
```

Exemple :
```bash
supabase migration new add_contacts_table
supabase migration new add_rls_to_posts
```

**Output attendu :**
```
Created new migration at supabase/migrations/20240101120000_add_contacts_table.sql
```

Ouvrir le fichier créé et écrire le SQL :
```sql
-- supabase/migrations/20240101120000_add_contacts_table.sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 2. Appliquer les migrations en local

```bash
supabase migration up
```

**Output attendu :**
```
Applying migration 20240101120000_add_contacts_table.sql...
```

Pour appliquer une migration spécifique uniquement :
```bash
supabase migration up --include-all
```

---

### 3. Générer une migration depuis des changements locaux (db diff)

Si vous avez modifié le schéma via Studio (http://127.0.0.1:54323) et voulez capturer les changements :

```bash
supabase db diff --file <nom_migration>
```

Exemple :
```bash
supabase db diff --file add_contacts_table
```

**Output attendu :** Crée `supabase/migrations/<timestamp>_add_contacts_table.sql` avec le diff SQL.

Pour voir le diff sans créer le fichier :
```bash
supabase db diff
```

Pour comparer avec le projet lié (distant) :
```bash
supabase db diff --linked
```

---

### 4. Pousser les migrations en production

> ⚠️ **Toujours faire un dry-run d'abord !**

```bash
# Vérifier ce qui va être appliqué (sans modifier)
supabase db push --dry-run

# Appliquer en production
supabase db push
```

**Output attendu :**
```
Connecting to remote database...
Applying migration 20240101120000_add_contacts_table.sql...
Finished supabase db push.
```

Pour inclure les rôles et données de seed :
```bash
supabase db push --include-roles --include-seed
```

---

### 5. Lister les migrations

```bash
# Voir l'état local et distant
supabase migration list

# Local uniquement
supabase migration list --local

# Distant uniquement
supabase migration list --linked
```

**Output attendu :**
```
        LOCAL      │     REMOTE     │     TIME (UTC)
  ─────────────────┼────────────────┼──────────────────────
    20240101120000 │ 20240101120000 │ 2024-01-01 12:00:00
```

---

### 6. Réinitialiser la base locale (reset)

Recrée la base locale proprement et applique toutes les migrations depuis zéro :

```bash
supabase db reset
```

**Output attendu :**
```
Resetting local database...
Restarting containers...
Applying migration 20240101120000_add_contacts_table.sql...
Seeding data supabase/seed.sql...
Finished supabase db reset.
```

Sans le seed :
```bash
supabase db reset --no-seed
```

---

### 7. Récupérer le schéma distant (pull)

Pour synchroniser le schéma distant vers une nouvelle migration locale :

```bash
supabase db pull
```

**Output attendu :**
```
Dumping schemas from remote database...
Creating migration at supabase/migrations/<timestamp>_remote_schema.sql
```

## Erreurs Fréquentes

### `ERROR: relation "xxx" already exists`
**Cause** : Migration déjà appliquée partiellement, ou tentative de recréer une table existante.
**Solution** : Utiliser `CREATE TABLE IF NOT EXISTS` ou vérifier l'historique avec `migration list`.

### `ERROR: cannot connect to database`
**Cause** : Stack locale pas démarrée (pour opérations locales) ou projet non lié (pour production).
**Solution** : `supabase start` ou `supabase link --project-ref <ref>`.

### `Migration already exists`
**Cause** : Deux migrations avec le même timestamp (rare, possible si créées très rapidement).
**Solution** : Renommer manuellement l'un des fichiers avec un timestamp légèrement différent.

### `supabase db push` échoue en production
**Cause** : Migration contient des changements destructifs ou incompatibles.
**Solution** : `supabase db push --dry-run` pour identifier le problème, puis corriger la migration.

### Désynchronisation local/prod
**Cause** : Changements faits directement en prod sans migration.
**Solution** : `supabase db pull` pour récupérer l'état prod comme migration, puis réappliquer proprement.

## Erreurs Rencontrées et Corrections

<!-- Documenter ici les erreurs spécifiques rencontrées sur ce projet -->
