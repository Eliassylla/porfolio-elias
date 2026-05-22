# Phase 3 — Infrastructure Email : Contexte

## Stack email retenue : Resend

Resend couvre tous les besoins sans outil tiers supplémentaire.

| Besoin | Feature Resend | Limite gratuite |
|---|---|---|
| Email de confirmation (formulaire contact) | Emails transactionnels | 3 000/mois |
| Notification à Elias à chaque lead | Emails transactionnels | 3 000/mois |
| Email de bienvenue newsletter | Automations — déclenché à l'inscription | 10 000 runs/mois |
| Séquences de nurturing (J+3, J+7...) | Automations — délais configurables | 10 000 runs/mois |
| Envoi de newsletter manuelle | Broadcasts — sans code (WYSIWYG) | Illimité |
| Gestion des abonnés | Audiences | 1 000 contacts |

**Pas besoin de Loops.so ou autre outil tiers** — Resend couvre tout depuis avril 2026 (lancement Automations).

## Bloqueur avant de coder

Créer une Audience dans le dashboard Resend → récupérer l'**Audience ID** (requis par `resend.contacts.create()`).

## Décisions techniques

- Domaine email à vérifier dans Resend (anti-spam) avant premier envoi
- Tables Supabase à créer : `contact_submissions`, `subscribers`
- Secrets Edge Functions : `supabase secrets set RESEND_API_KEY=...` (ne jamais hardcoder)
