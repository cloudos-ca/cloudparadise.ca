# Arbitrages — 2026-09-03

Delta appliqué contre le prompt du 2026-09-03 (transmis en message, pas commité en tant que
fichier), en deux passes. Point de départ : vérification du dépôt avant tout changement, comme
demandé — `docs/arbitrages-2026-08-02.md` montrait la géomatique déjà faite, l'ERP déjà entré sur
`/pme` et `/fonctions`, les abonnements déjà en ligne, Studio de jeux/Arcades déjà couverts. Rien de
tout ça n'a été refait.

**Deuxième passe** : le client a renvoyé le même prompt complété par des faits vérifiés
directement dans `cloudparadise_hpc` (identifiants `JobKind.VOICE`/`JobKind.API` confirmés dans
`src/lib/billing/pricing.ts`, prix Rendu 3D confirmé, Agent de code confirmé public via
`app-registry.tsx`, Bac à sable confirmé comme renommage de « Bureau persistant »). Ajouté à cette
passe : Agent de code (`/fonctions`, `/en/features`), Bac à sable
(`components/marketing/bacASable.ts`), et retrait des réserves « à confronter » devenues sans objet
dans les commentaires de `offre.ts`.

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
5. **Agent de code** ajouté à `/fonctions` et `/en/features`, section applications — confirmé public
   par le client (`app-registry.tsx`, pas de flag `adminOnly`).
6. **Bac à sable** ajouté à `/fonctions` et `/en/features`, section bureau — 15 $ US/mois, toujours
   présenté avec sa condition « en supplément d'un abonnement Crédits actif » accolée au prix, jamais
   comme option autonome (`components/marketing/bacASable.ts`).
7. **App mobile** : recherche dans le dépôt, aucune mention existante. Rien ajouté — conforme au
   brief, la publication n'est pas confirmée.

## Non fait, et pourquoi

- **Pas de page `/hebergement` dédiée.** Le brief la juge « à considérer », pas requise ; une page
  neuve engage plus (visuels, SEO, arborescence à 7 pages verrouillée par
  `PLAN_CONTENU_VITRINE.md §2`) que ce que cette passe pouvait vérifier sans accès au dépôt
  applicatif. La section `/fonctions` couvre la règle « zéro facette orpheline » en attendant.
- **Pas de mise à jour de `docs/conditions-utilisation.md`** ni des plafonds CGU (2 minutes / 512 Ko
  / 200 Mo / 10 images) : le brief du 2026-09-03 ne les mentionne pas comme ayant changé, et
  `arbitrages-2026-08-02.md` les listait déjà comme un chantier ouvert côté texte contractuel.
- **Identifiants Mémo vocal et Source de données : confirmés en deuxième passe.** `JobKind.VOICE`
  et `JobKind.API` viennent directement de `src/lib/billing/pricing.ts` (cité par le client) ; le
  commentaire d'`offre.ts` le note maintenant sans réserve. Seul `"Géomatique"` reste à confronter
  au vrai identifiant — jamais confirmé depuis le 2026-08-02.
- **Rendu 3D à 0,10 $ : confirmé en deuxième passe**, même fichier, même commentaire daté
  2026-08-26.
- **Bac à sable et Agent de code n'ont qu'une entrée sur `/fonctions`**, pas de section dédiée sur
  `/plateforme` (là où vivent le bureau et les éditeurs) — même arbitrage que pour Hébergement Web :
  produit neuf sur la vitrine, couverture minimale d'abord.
