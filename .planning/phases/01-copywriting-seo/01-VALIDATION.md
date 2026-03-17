---
phase: 1
slug: copywriting-seo
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-17
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Aucun installé — TypeScript check + build |
| **Config file** | `tsconfig.json` (TypeScript), `vite.config.ts` (build) |
| **Quick run command** | `npx tsc --noEmit` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + inspection manuelle navigateur
- **Before `/gsd:verify-work`:** Build vert + checklist SEO manuelle (LinkedIn debugger + Google Rich Results Test)
- **Max feedback latency:** ~10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | COPY-01, COPY-02 | TypeScript build | `npm run build` | ✅ | ⬜ pending |
| 1-01-02 | 02 | 1 | COPY-03 | Build + manuel UI | `npm run build` | ✅ | ⬜ pending |
| 1-01-03 | 03 | 2 | SEO-01, SEO-02, SEO-03 | Build + grep + manuel | `grep "og:locale" index.html && grep "application/ld+json" index.html` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Aucun framework de test requis pour cette phase — acceptable (copywriting + SEO = vérification principalement manuelle)
- Le build TypeScript (`npm run build`) est la vérification automatisée principale

*Existing infrastructure covers all phase requirements — Wave 0 not needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Meta title/description corrects par page | SEO-01 | Rendu dynamique JS — grep insuffisant | Naviguer sur chaque page, inspecter `<title>` et `<meta name="description">` dans DevTools |
| OG tags corrects pour LinkedIn | SEO-02 | Nécessite LinkedIn Post Inspector | Coller URL dans https://www.linkedin.com/post-inspector/ — vérifier titre, description, image |
| Structured data valide | SEO-03 | Nécessite Google Rich Results Test | Coller URL dans https://search.google.com/test/rich-results — vérifier Person + ProfessionalService |
| Formulaire contact — validation champs | COPY-03 | Interaction UI — pas de tests automatisés | Tester chaque champ avec valeurs invalides, vérifier messages d'erreur en français |
| Toast confirmation soumission formulaire | COPY-03 | UX comportemental | Soumettre formulaire valide, vérifier toast sonner visible |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
