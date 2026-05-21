# Workflow : Auth et Row Level Security (RLS)

## Objectif

Configurer l'authentification Supabase et les politiques de sécurité RLS (Row Level Security) pour contrôler l'accès aux données de la base.

## Prérequis

- [ ] Stack locale démarrée (`supabase start`)
- [ ] Au moins une migration avec des tables créées (voir `db-migrations.md`)
- [ ] Projet lié pour appliquer en production

## Concepts Clés

- **Auth** : Géré par GoTrue (service Supabase intégré). Accessible via Studio ou API.
- **RLS** : Système PostgreSQL qui contrôle quelles lignes un utilisateur peut lire/écrire. Sans RLS activé, toutes les lignes sont accessibles (dangereux en prod).
- **Policies** : Règles SQL qui définissent les conditions d'accès par opération (SELECT, INSERT, UPDATE, DELETE).

## Étapes

### 1. Configurer l'Auth locale (config.toml)

Le fichier `supabase/config.toml` contrôle les providers d'auth actifs. Pour le tier gratuit, email/password est suffisant.

Vérifier et ajuster la configuration :
```toml
# supabase/config.toml
[auth]
enabled = true
site_url = "http://localhost:5173"  # URL du frontend Vite en dev
additional_redirect_urls = ["http://localhost:5173/**"]

[auth.email]
enable_signup = true
double_confirm_changes = true
enable_confirmations = false  # false pour le développement local

[auth.sms]
enabled = false  # Désactivé, on n'en a pas besoin sur le tier gratuit
```

Après modification de `config.toml`, redémarrer la stack :
```bash
supabase stop && supabase start
```

---

### 2. Créer une migration avec RLS

Les politiques RLS s'écrivent en SQL dans les migrations. Créer une migration dédiée :

```bash
supabase migration new enable_rls_contacts
```

Exemple de migration complète avec RLS :
```sql
-- supabase/migrations/20240101130000_enable_rls_contacts.sql

-- Activer RLS sur la table
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy : les utilisateurs authentifiés peuvent lire uniquement leurs propres contacts
CREATE POLICY "Users can view own contacts"
  ON contacts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy : les utilisateurs authentifiés peuvent créer des contacts
CREATE POLICY "Users can insert own contacts"
  ON contacts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy : les utilisateurs peuvent modifier leurs propres contacts
CREATE POLICY "Users can update own contacts"
  ON contacts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy : les utilisateurs peuvent supprimer leurs propres contacts
CREATE POLICY "Users can delete own contacts"
  ON contacts
  FOR DELETE
  USING (auth.uid() = user_id);
```

Pour une table **publique en lecture** (ex: portfolio data) :
```sql
-- Tout le monde peut lire, seuls les admins peuvent écrire
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access"
  ON portfolio_items
  FOR SELECT
  USING (true);

CREATE POLICY "Service role only write"
  ON portfolio_items
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');
```

---

### 3. Appliquer les migrations RLS en local

```bash
supabase migration up
```

Ou réinitialiser complètement :
```bash
supabase db reset
```

**Output attendu :**
```
Applying migration 20240101130000_enable_rls_contacts.sql...
```

---

### 4. Tester les policies localement via Studio

Accéder à l'interface locale :
```
http://127.0.0.1:54323
```

Dans Studio → Table Editor → choisir une table → "RLS Policies" pour visualiser et tester les policies actives.

---

### 5. Appliquer les policies en production

```bash
# Dry run d'abord
supabase db push --dry-run

# Appliquer
supabase db push
```

**Output attendu :**
```
Applying migration 20240101130000_enable_rls_contacts.sql...
Finished supabase db push.
```

---

### 6. Vérifier les policies actives

En SQL (via Studio ou `psql`) :
```sql
-- Lister toutes les policies sur une table
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'contacts';

-- Vérifier si RLS est activé
SELECT relname, relrowsecurity
FROM pg_class
WHERE relname = 'contacts';
```

---

### 7. Patterns RLS courants pour ce projet

**Données publiques (lecture seule) :**
```sql
ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON <table> FOR SELECT USING (true);
```

**Données privées par utilisateur :**
```sql
ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_own_data" ON <table>
  USING (auth.uid() = user_id);
```

**Accès service role uniquement (depuis Edge Functions) :**
```sql
ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;
-- Pas de policy publique = accès refusé sauf service_role (bypass automatique)
```

## Erreurs Fréquentes

### `new row violates row-level security policy`
**Cause** : Un INSERT/UPDATE ne satisfait pas la condition `WITH CHECK`.
**Solution** : Vérifier que `user_id` est correctement passé et correspond à `auth.uid()`.

### `permission denied for table xxx`
**Cause** : RLS activé mais aucune policy ne correspond à la requête.
**Solution** : Créer une policy SELECT ou vérifier que l'utilisateur est bien authentifié.

### Les policies ne s'appliquent pas en prod
**Cause** : Migration non poussée en prod.
**Solution** : `supabase migration list --linked` pour vérifier, puis `supabase db push`.

### Auth ne redirige pas correctement
**Cause** : `site_url` ou `additional_redirect_urls` incorrects dans `config.toml`.
**Solution** : Mettre à jour `config.toml`, redémarrer, et également configurer les URLs dans le dashboard Supabase pour la production.

### `auth.uid()` retourne null dans une policy
**Cause** : Requête exécutée sans authentification (avec la clé `anon` sans token JWT utilisateur).
**Solution** : S'assurer que le client Supabase passe bien le token d'accès utilisateur dans les requêtes.

## Erreurs Rencontrées et Corrections

<!-- Documenter ici les erreurs spécifiques rencontrées sur ce projet -->
