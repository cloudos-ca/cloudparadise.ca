# Arbitrages — 2026-08-02

Relevés en corrigeant la grille de tarifs et les promesses d'échelle, puis tranchés le jour même
contre le code applicatif. Ce fichier garde la trace de **ce qui a été décidé et pourquoi**, et
de ce qui reste à faire — côté vitrine comme côté application.

---

## 1. Les CGU en ligne — ce n'était pas un arbitrage

Le bloc « Débit des crédits » publié décrit un débit à l'avancement que le code ne fait pas.
Mais **le bon texte existe déjà** : `docs/conditions-utilisation.md` §6.4 (brouillon du
22 juillet, jamais commité, dans le dépôt applicatif) décrit exactement le comportement réel —
traitement unitaire débité à la soumission, traitement par lot débité à la pièce au fur et à
mesure, reprise au dernier point de contrôle sans double facturation. Vérifié ligne par ligne :
`chargeForItem` (`src/lib/billing/credits.ts:109`), la garde `@unique([jobId, itemKey])`, et
`resumable-batch.ts`.

**Le travail n'est donc pas de réécrire un contrat, c'est de publier le brouillon existant à la
place du texte en ligne.** Une correction, pas une décision.

> ⏳ **Bloqué côté vitrine.** Le brouillon vit dans le dépôt applicatif, absent de la machine où
> tourne le site. Le §6.4 complet est nécessaire — l'extrait connu porte une élision, et on ne
> publie pas un texte contractuel reconstitué de mémoire. Une fois le fichier fourni, le
> remplacement dans `app/(marketing)/conditions/page.tsx` et `app/en/terms/page.tsx` est
> mécanique.

### Le vrai défaut, lui, survit — et il est en production

§6.4 promet un ajustement « en cas de défaillance avérée de notre infrastructure », et renvoie à
la Politique de remboursement. Or son §2 (`src/lib/legal/content.ts:149`) refuse explicitement
les crédits d'un traitement « qu'il ait échoué, ou qu'il ait été annulé ».

**Le contrat renvoie à une politique qui refuse ce que le contrat offre.**

Décision : **ouvrir une exception au §2 pour la défaillance d'infrastructure**, plutôt que de
retirer la promesse du §6.4. La promesse est déjà étroite — défaillance avérée, sans résultat
exploitable, sur demande, traitée manuellement — et à six inscrits, l'honorer ne coûte rien.
C'est aussi la clause qui désamorce le point 2.

---

## 2. Forfait interrompu — rembourser la faute, pas le prorata ✅ tranché

Le prorata est impossible pour les moteurs au forfait : un calcul GPU est indivisible, il n'y a
pas de « 75 % » à facturer. La machinerie à la pièce existe déjà et couvre les seuls cas où
« progression » veut dire quelque chose.

**La distinction qui compte n'est pas combien, mais à qui la faute** — et le §6.4 la pose déjà
correctement : contenu invalide → facturable ; notre infrastructure tombe → remboursé.

Côté code, c'est petit : `failJob` reçoit déjà `errorMessage` et `executionKind`, le ledger a
déjà le genre `REFUND` et une colonne `jobId`. Il manque une classification de l'erreur et une
ligne compensatoire.

**Deux pièges :**
- Pour un lot, ne rembourser que les `billedUnits` réellement débités.
- Rendre l'opération **idempotente sur `(jobId, REFUND)`** — sinon un rejeu double le
  remboursement.

**Ne pas rembourser l'annulation manuelle.** Lancer, regarder le journal, annuler si ça se
présente mal : c'est du calcul gratuit.

*→ Chantier applicatif. Spec arrêtée le 2026-08-02, à exécuter dans `cloudparadise_hpc`.*

### Spec — classification de l'erreur

Trois classes, pas deux. La distinction manquante est celle qui décide du reste :

| Classe | Exemples | Débit |
|---|---|---|
| `LIMIT` | timeout à 2 min sur le plafond GPU, source > 512 Ko, média > 30 min ou 200 Mo, rendu > 10 images | **facturé** |
| `USER` | contenu invalide, instructions erronées, fichier source illisible | **facturé** (§6.4) |
| `INFRA` | hôte à court de mémoire, agent injoignable, pilote qui tombe, conteneur tué, base indisponible | **remboursé** |

**`LIMIT` n'est pas une défaillance.** C'est le produit qui fonctionne comme annoncé — d'autant
plus une fois les plafonds publiés (point 4). Si le classement met un timeout de plafond et une
panne d'hôte dans le même seau, on rembourse ce qu'on a le droit de facturer, et le plafond
publié ne veut plus rien dire.

**Cas non classé : rembourser, et journaliser pour relecture.** Un remboursement injustifié
coûte 0,50 $ ; un débit injustifié coûte un client. À six inscrits, l'asymétrie est écrasante.
*Ce défaut de sécurité est une recommandation, pas une évidence — à confirmer.*

### Spec — le remboursement

- **Montant** : uniquement les `billedUnits` réellement débités. Au forfait, le débit unique de
  la tâche ; à la pièce, la somme des seules pièces facturées.
- **Idempotence** : contrainte d'unicité en base sur `(jobId, kind = REFUND)`, pas une
  vérification applicative — un rejeu ne doit pas pouvoir doubler la ligne. Si un jour un job
  peut être remboursé en plusieurs fois, la clé devient `(jobId, itemKey, kind)`.
- **Annulation** : `cancelJob` ne rembourse pas. Mais la distinction porte sur **qui** annule,
  pas sur la fonction appelée : une annulation déclenchée par le système à la suite d'un
  incident est un `INFRA`, pas un renoncement du client. Si les deux passent aujourd'hui par le
  même chemin, il faut les séparer avant de brancher le remboursement.

### Ce que ce code engage

La fonction de classification **devient la définition opérationnelle** de « défaillance avérée
de notre infrastructure » au §6.4. Ce n'est plus seulement du code : c'est un terme contractuel.
Un commentaire doit le dire à l'endroit du classement, et toute modification ultérieure du
classifieur change le sens du contrat.

**Ordre de livraison :** l'exception au §2 de la Politique de remboursement passe **avant ou
avec** ce code. Sinon le produit devient plus généreux que la politique publiée — moins grave
que l'inverse, mais toujours incohérent, et c'est cette incohérence-là qu'on est en train de
refermer.

---

## 3. Géomatique / SIG dans la grille ✅ fait

Ajouté à `GRILLE` à 0,50, avec sa ligne dans le tableau détaillé et son libellé désormais lu
depuis `offre.ts` sur `/fonctions` et `/en/features`.

La raison : il était déjà annoncé comme fonctionnalité **sans prix**, et une fonctionnalité
annoncée sans prix se lit comme gratuite ou comme un devis. Les deux étaient faux. Il porte en
plus le positionnement de `/mines`.

Les trois autres moteurs facturés par l'application et absents d'ici — Téléchargement,
Marketplace, Jeux — restent dehors : Jeux n'a rien à faire sur une vitrine B2B, Téléchargement
est trivial, Marketplace est difficile à expliquer.

> ⚠️ L'identifiant interne `"Géomatique"` a été choisi sans accès au dépôt du produit. À
> confronter au nom réel du mode dans `pricing.ts`.

---

## 4. Plafonds et prix — une seule décision, deux variables ✅ tranché

Le couplage n'était pas visible dans la première version de cette note : `pricing.ts:29-33`
justifie explicitement les 0,50 $ du calcul GPU **par** le plafond de 2 minutes. Relever le
plafond invalide le prix. Ce ne sont donc pas deux voies ouvertes, mais une décision unique.

**Retenu : assumer le repositionnement.** Calcul court, exact, en double précision — ce que le
site dit maintenant, et qui est vérifiable.

**Et publier les plafonds** dans la documentation technique et les CGU — **jamais sur les pages
de vente**. Un plafond non publié n'empêche personne d'acheter des crédits puis de buter dessus,
et ce client-là produit exactement la demande de remboursement du point 2.

| Moteur | Plafond |
|---|---|
| Calcul GPU | 2 minutes par tâche, source ≤ 512 Ko |
| Média | 30 minutes, entrée ≤ 200 Mo |
| Rendu 3D | 10 images maximum, 30 minutes |

> ⏳ **Côté vitrine, à faire avec le point 1** : les plafonds entrent dans les CGU, dans le même
> passage que le §6.4. Les deux modifications touchent le même bloc — les faire ensemble évite
> de rouvrir un texte contractuel deux fois.

Ce qui reste exclu : numéros de modèle, fiches techniques, comparaisons chiffrées avec d'autres
cartes (`PLAN_CONTENU_VITRINE.md:225`). Les plafonds sont des limites d'usage, pas du matériel.

---

## 5 + 7. Traçabilité et ciblage — un seul chantier ✅ tranché

Les deux points n'en font qu'un : le point 7 restera indécidable tant que le point 5 n'est pas
instrumenté.

Le site pose maintenant `?src=<page>-<emplacement>` sur ses 24 liens d'inscription
(`lienInscription()` dans `lib/site.ts`). **Mais le paramètre ne suffit pas** : il est perdu au
retour de confirmation de courriel, et perdu d'emblée sur le chemin OAuth, où la redirection ne
le conserve pas. Ce sont ces deux cas qui font le travail, pas la lecture du query string.

**Retenu : une colonne `signupSource String?` sur `User`**, posée à l'inscription, lue une fois
par `recordEvent("signup")`.

*→ Chantier applicatif.*

Sur le ciblage (ex-point 7) : le site met en avant l'exploration minière, les inscrits réels
sont une clinique vétérinaire et une entreprise de stucco. **Six inscrits ne sont pas un
échantillon** — rien n'a été réécrit, et rien ne le sera avant que `signupSource` produise de
quoi trancher. Le positionnement reste horizontal, avec `/mines` en soutien de vente.

---

## 6. Le prix, pas la baisse ✅ tranché

Annoncer une baisse apprend au visiteur que les prix bougent, donc à attendre la suivante. Le
gain commercial s'obtient sans ce coût en énonçant le prix **comme une affirmation** plutôt que
comme un mouvement — « 0,25 $ l'image générée », et non « deux fois moins cher qu'avant ».

> ⏳ **À faire côté vitrine.** La formulation non comparative peut s'écrire tout de suite. Une
> comparaison au marché, elle, aurait besoin d'une source vérifiable sur les prix des
> concurrents : rien ici ne permet de l'affirmer.

**Une chose à faire tout de suite, et qui n'est pas sur le site :** les crédits sont des
dollars, donc les six inscrits ont un solde qui vaut maintenant quatre fois plus en images
générées et quatre fois plus en calcul GPU. C'est une bonne nouvelle que personne ne voit. Un
courriel à six personnes — **sans le mot « baisse »**.

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
- **Les clauses de reprise et de relance gratuite** retirées de `/tarifs` et `/en/pricing` en
  attendant le point 1 — elles reviendront avec le texte du §6.4, qui les décrit correctement.
