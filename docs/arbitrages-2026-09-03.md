# Arbitrages — 2026-09-03

Delta appliqué contre le prompt du 2026-09-03 (transmis en message, pas commité en tant que
fichier). Point de départ : vérification du dépôt avant tout changement, comme demandé —
`docs/arbitrages-2026-08-02.md` montrait la géomatique déjà faite, l'ERP déjà entré sur `/pme` et
`/fonctions`, les abonnements déjà en ligne, Studio de jeux/Arcades déjà couverts. Rien de tout ça
n'a été refait.

## Fait

1. **Rendu 3D : 1,00 → 0,10 $** (`components/marketing/offre.ts`). Séquence d'animation facturée
   à la frame plutôt qu'au forfait plafonné à 10 images — `uniteException` porte la mention.
   `Estimateur.tsx` avait Rendu 3D comme vedette « la plus chère » : devenu la moins chère des
   trois, remplacé par IA dans la liste des vedettes.
2. **Mémo vocal (0,50 $) et Source de données (0,10 $/appel)** ajoutés à `GRILLE`, à la grille
   détaillée de `/tarifs`, et à `/fonctions` (FR/EN) dans la section calcul.
3. **ERP enrichi** vers « comptabilité en partie double complète » sur `/pme`, `/en/small-business`
   et `/fonctions` (FR/EN) : grand livre, comptes fournisseurs, états financiers à toute date,
   rapprochement bancaire, rôles ERP granulaires. Export PDF des états financiers et écritures de
   clôture d'exercice **non promis** — hors scope, signalé en commentaire à l'endroit du contenu.
4. **Hébergement Web** — nouvelle section sur `/fonctions` et `/en/features` uniquement
   (`components/marketing/hebergement.ts`, 9 $ US/mois). Pas de page dédiée ni de section sur
   `/pme` : le produit est neuf sur la vitrine, `/fonctions` en assure la couverture minimale
   pendant que le reste (screenshots, section propre) reste à faire.
5. **App mobile, Bac à sable, Agent de code** : recherche dans le dépôt, aucune mention existante à
   corriger ou retirer. Rien ajouté — conforme au brief (pas de lien de téléchargement tant que la
   publication n'est pas confirmée ; Agent de code jamais vérifié comme fonctionnalité publique).

## Non fait, et pourquoi

- **Pas de page `/hebergement` dédiée.** Le brief la juge « à considérer », pas requise ; une page
  neuve engage plus (visuels, SEO, arborescence à 7 pages verrouillée par
  `PLAN_CONTENU_VITRINE.md §2`) que ce que cette passe pouvait vérifier sans accès au dépôt
  applicatif. La section `/fonctions` couvre la règle « zéro facette orpheline » en attendant.
- **Pas de mise à jour de `docs/conditions-utilisation.md`** ni des plafonds CGU (2 minutes / 512 Ko
  / 200 Mo / 10 images) : le brief du 2026-09-03 ne les mentionne pas comme ayant changé, et
  `arbitrages-2026-08-02.md` les listait déjà comme un chantier ouvert côté texte contractuel.
- **Identifiants internes non vérifiés.** `type: "Mémo vocal"` et `type: "Source de données"` dans
  `offre.ts` sont choisis sans accès au dépôt applicatif (`cloudparadise_hpc`), comme
  `"Géomatique"` l'avait été le 2026-08-02 — à confronter à `pricing.ts` au prochain accès.
- **Rendu 3D à 0,10 $** : relevé sur la foi du brief transmis, pas vérifié directement dans le code
  applicatif (contrairement à la correction du 2026-08-02, qui avait un clone local). Signalé en
  commentaire dans `offre.ts`.
