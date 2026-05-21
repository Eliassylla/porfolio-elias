# Workflow : Initialisation et Démarrage Local

## Objectif

Initialiser un projet Supabase localement et démarrer la stack de développement (PostgreSQL, Auth, Storage, Edge Functions) via Docker.

## Prérequis

- [ ] Docker Desktop installé et **en cours d'exécution**
- [ ] Supabase CLI installé (`brew install supabase/tap/supabase` sur macOS)
- [ ] Être à la racine du projet Portfolio

## Étapes

### 1. Initialiser le projet (si pas encore fait)

```bash
supabase init
```

**Output attendu :**
```
Finished supabase init.
```

Crée `supabase/config.toml` dans le répertoire courant. Ce fichier contient la configuration locale (ports, services activés, etc.).

> Note : Pour ce projet, `config.toml` existe déjà — skip cette étape sauf si on repart de zéro.

Pour forcer la réinitialisation (écrase l'existant) :
```bash
supabase init --force
```

---

### 2. Démarrer la stack locale

```bash
supabase start
```

**Output attendu :**
```
Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
  S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJh...
service_role key: eyJh...
```

> Premier démarrage : télécharge les images Docker (~1-2 min). Les démarrages suivants sont rapides.

Pour exclure des services inutiles (économiser des ressources) :
```bash
supabase start -x imgproxy,storage
```

---

### 3. Configurer les variables d'environnement

Récupérer les valeurs pour `.env.local` :

```bash
supabase status -o env --override-name api.url=VITE_SUPABASE_URL --override-name auth.anon_key=VITE_SUPABASE_ANON_KEY
```

**Output attendu :**
```
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=eyJh...
```

Copier ces valeurs dans `.env.local` :
```env
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=eyJh...
```

---

### 4. Vérifier l'état de la stack

```bash
supabase status
```

**Output attendu :** Liste tous les services avec leurs URLs (voir étape 2).

Pour un output JSON (utile pour scripting) :
```bash
supabase status -o json
```

---

### 5. Lier le projet local au projet Supabase distant

Pour pouvoir pousser en production plus tard :
```bash
supabase link --project-ref <PROJECT_REF>
```

`PROJECT_REF` se trouve dans les Settings du dashboard Supabase (format : `abcdefghijklmnop`).

**Output attendu :**
```
Finished supabase link.
```

---

### 6. Arrêter la stack locale

```bash
supabase stop
```

Pour tout effacer (données locales incluses) :
```bash
supabase stop --backup
```

## Erreurs Fréquentes

### `Cannot connect to the Docker daemon`
**Cause** : Docker Desktop n'est pas lancé.
**Solution** : Ouvrir Docker Desktop et attendre qu'il soit Ready, puis relancer.

### `port is already allocated`
**Cause** : Un autre service utilise le port 54321 ou 54322.
**Solution** :
```bash
supabase stop  # Arrêter proprement
# Modifier config.toml pour changer les ports si conflit persistant
```

### `supabase: command not found`
**Cause** : CLI non installé ou PATH incorrect.
**Solution** : `brew install supabase/tap/supabase` puis `supabase --version`

### `Error: Cannot find project config`
**Cause** : Pas de `config.toml` dans le répertoire courant.
**Solution** : S'assurer d'être à la racine du projet, ou lancer `supabase init`.

## Erreurs Rencontrées et Corrections

<!-- Documenter ici les erreurs spécifiques rencontrées sur ce projet -->
