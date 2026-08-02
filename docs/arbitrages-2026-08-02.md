# Arbitrages ouverts — 2026-08-02

Relevés en corrigeant la grille de tarifs et les promesses d'échelle. **Aucun n'est une
modification** : ce sont des décisions qui appartiennent au propriétaire, au juriste, ou à
l'équipe applicative. Ils sont classés par urgence.

---

## 1. CGU contre code — pour le juriste

Le bloc **« Débit des crédits »** (`app/(marketing)/conditions/page.tsx`, et son miroir
`app/en/terms/page.tsx`) promet trois choses que le produit ne fait pas :

| Le contrat dit | Le code fait |
|---|---|
| les crédits sont débités « à mesure que le Job progresse, **et non à son lancement** » | `chargeForJob` débite au lancement, avant création du job |
| un Job interrompu par une panne « est repris **sans nouveau débit** » | `failJob` ne rembourse rien |
| après une erreur, « vous pouvez corriger puis **relancer sur le même crédit** » | rien ne rembourse ; une relance est un nouveau débit |

**L'écart a changé de sens.** Ces clauses étaient réputées plus dures que le produit ; elles
sont en réalité plus généreuses. Et elles sont en ligne et indexables depuis le 2026-07-31.

Le texte n'a pas été retouché — réécrire un document contractuel n'est pas une décision de la
vitrine. L'écart est marqué en commentaire dans les deux fichiers, à l'endroit exact.

**À noter aussi :** la même relance gratuite figurait sur `/tarifs` et `/en/pricing` en langage
courant. Elle en a été **retirée**, pas adoucie — une promesse de ce genre ne peut pas être
atténuée sans devenir creuse. Si le comportement existe réellement sous une autre forme, la
phrase peut revenir ; elle a besoin d'être confirmée contre le code d'abord.

---

## 2. Tâche au forfait interrompue — pour l'équipe applicative

Confirmé : au forfait, une tâche arrêtée à 75 % est facturée à 100 %, et une tâche qui échoue
aussi. C'est ce qui a fait tomber le titre « Vous ne payez que ce qui est traité », remplacé par
« Un prix par tâche, quel que soit le volume ».

Question ouverte : **est-ce le comportement voulu ?** Une panne d'infrastructure facturée au
client est exactement le genre de chose qui produit une demande de remboursement, et les CGU
promettent déjà le contraire (§1).

---

## 3. Géomatique / SIG dans la grille facturée — pour le propriétaire

Quatre moteurs facturés par l'application n'apparaissent pas dans la grille de la vitrine :
Téléchargement, Géomatique/SIG, Marketplace, Jeux. Trois restent dehors sans hésitation — Jeux
n'a rien à faire sur une vitrine B2B, Téléchargement est trivial, Marketplace est difficile à
expliquer.

**Le SIG est le seul cas à trancher.** Il sert directement le positionnement de `/mines`, et il
apparaît déjà comme fonctionnalité sans prix (`fonctions/page.tsx`, `en/features/page.tsx`).
L'ajouter à `GRILLE` lui donnerait un prix affiché, un exemple chiffré, et une ligne dans le
tableau des CGU.

---

## 4. Plafonds contre promesses — décision d'infrastructure

Limites imposées en dur par les agents :

| Moteur | Plafond |
|---|---|
| Calcul GPU | 2 minutes par tâche, source ≤ 512 Ko |
| Média | 30 minutes, entrée ≤ 200 Mo |
| Rendu 3D | 10 images maximum, 30 minutes |

Le site n'annonce aucune de ces limites, et n'en annonce toujours aucune : les publier
transformerait une page de vente en fiche technique. Ce qui a changé, c'est que les démonstrations
ne montrent plus de volumes que ces plafonds interdisent, et que « la puissance » a cédé la place
à « le calcul exact ».

**Deux voies restent ouvertes**, et elles ne sont pas à la vitrine :

1. **Relever les plafonds**, si l'ambition est le calcul lourd au sens où on l'entend d'habitude.
2. **Assumer le repositionnement** en calcul court, exact, en double précision — ce que le site
   dit maintenant, et qui est vérifiable.

Ce qui n'est pas une option : publier une fiche technique matérielle. Numéros de modèle et
comparaisons chiffrées avec d'autres cartes restent exclus par `PLAN_CONTENU_VITRINE.md:225`.

---

## 5. Capture de la source d'inscription — pour l'équipe applicative

Les liens du site portent maintenant `?src=<page>-<emplacement>` : `topbar`, `accueil-hero`,
`calcul-premier-essai`, `tarifs-closer`… 24 points d'appel, tous passant par `lienInscription()`
dans `lib/site.ts`.

**Rien ne le lit encore.** `recordEvent("signup")` n'enregistre que la méthode et la langue, et
le paramètre est jeté. Le travail restant est côté application — une trentaine de lignes, à
porter à travers l'inscription, confirmation de courriel comprise. Tant que ce n'est pas fait,
la traçabilité des canaux n'existe pas et ne doit pas être présentée comme disponible.

---

## 6. Annoncer les baisses de prix — pour le propriétaire

Trois baisses notables le 2026-08-02 : génération d'images 2,00 → 0,25, rendu 3D 3,00 → 1,00,
calcul GPU 2,00 → 0,50.

Le site affiche les nouveaux prix ; il **n'annonce pas** qu'ils ont baissé. Annoncer une baisse
est une décision commerciale, pas une correction — et elle a un coût : elle apprend au visiteur
que les prix bougent, ce qui invite à attendre la prochaine.

---

## 7. Ciblage — signalé, rien réécrit

Le site met en avant l'exploration minière (GESTIM, NI 43-101, SIGÉOM), en page dédiée et en
section d'accueil. Les inscrits réels sont une **clinique vétérinaire** et une **entreprise de
stucco**. Aucun profil minier.

Deux lectures possibles — le positionnement minier n'atteint pas sa cible, ou l'acquisition
amène des PME généralistes que la page minière ne sert pas — et pas de quoi choisir :
**six inscrits ne sont pas un échantillon.** Rien n'a été réécrit sur cette base. Le
positionnement reste ce que `PLAN_CONTENU_VITRINE.md` a posé : horizontal, avec `/mines` en
soutien de vente.

---

## Ce qui a été corrigé sans arbitrage

Pour mémoire, et parce que ces points-là ne se rediscutent pas — ils étaient faux :

- **L'unité de facturation.** Le site annonçait un débit « fichier par fichier » comme règle
  générale ; c'est le forfait par tâche, sauf traitement d'images et publipostage. L'exemple
  « 200 contrats = 50 crédits » sur-facturait 200 fois.
- **La fourchette de prix.** 0,10 – 3,00 annoncé, 0,10 – 1,00 réel, y compris dans le balisage
  envoyé aux moteurs de recherche.
- **`unitText: "tâche"`** posé sur tous les moteurs dans le JSON-LD, Images comprise.
- **« Répartition en 12 segments »** dans la démo du héros : l'agent média lance un unique
  processus ffmpeg, il n'existe aucune segmentation parallèle.
