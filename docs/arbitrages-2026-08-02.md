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

### ✅ Contradiction refermée le 2026-08-02

§6.4 promettait un ajustement en cas de défaillance, et la Politique de remboursement §2
refusait les crédits d'un traitement ayant échoué. **Les deux textes du 2 août concordent
maintenant** : la Politique porte l'exception, et elle est plus forte que ce qui avait été
envisagé — remise **automatique**, sans demande ni approbation, articles 3 à 5 écartés.

### ⚠️ Mais ces documents ne se publient pas tels quels

Les trois fichiers sont maintenant dans `docs/`. Ils ne sont pas uniformément en avance sur ce
qui est en ligne : **section par section, tantôt meilleurs, tantôt en retard.** Un remplacement
en bloc ferait donc des régressions. Le détail est plus bas, section « Les trois documents ».

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

> **Corrigé le 2026-08-03.** J'avais recommandé de facturer le dépassement de plafond : les
> textes du 2 août tranchent l'inverse, et ce sont eux qui font foi. CGU §6.4 et Politique de
> remboursement §2 rangent explicitement le **« dépassement du délai d'exécution que nous
> imposons »** parmi les causes qui nous sont imputables. Un timeout à 2 minutes se rembourse
> donc. La classification ci-dessous suit les textes.

| Classe | Exemples | Débit |
|---|---|---|
| `USER` | contenu invalide, instructions erronées, fichier source illisible, annulation volontaire, résultat jugé insatisfaisant | **facturé** (§6.4, al. 3) |
| `INFRA` | hôte à court de mémoire, agent injoignable, pilote qui tombe, conteneur tué, base indisponible, **et dépassement du délai que nous imposons** | **remis automatiquement** |

Les autres limites — source > 512 Ko, média > 200 Mo, rendu > 10 images — ne relèvent d'aucune
des deux classes : ce sont des **refus à l'entrée**, avant exécution. Rien n'est débité, donc
rien n'est à rembourser. À vérifier : si un de ces contrôles laisse aujourd'hui partir la tâche
avant d'échouer, il débite, et il faut le remonter avant le lancement plutôt que le classer.

**« Automatiquement remis » est une contrainte technique, pas une tournure.** Les deux textes
disent « aucune démarche n'est requise », « la remise apparaît dans votre relevé de crédits, à
la ligne du Traitement concerné », et la Politique écarte explicitement les articles 3 à 5 —
donc pas de courriel à `support@`, pas d'approbation manuelle, pas de retour vers PayPal. C'est
une ligne de crédit posée par `failJob`, ou la promesse n'est pas tenue.

**Cas non classé : rembourser, et journaliser pour relecture.** Un remboursement injustifié
coûte 0,50 $ ; un débit injustifié coûte un client. À six inscrits, l'asymétrie est écrasante.
*Ce défaut de sécurité est une recommandation, pas une évidence — à confirmer.*

**Conséquence à surveiller, pas à traiter maintenant :** rembourser tout dépassement de délai
rend le plafond GPU gratuit à atteindre. À six inscrits c'est sans objet ; à l'échelle, c'est
une voie d'abus — soumettre délibérément des tâches trop longues donne deux minutes de GPU
gratuites à chaque fois, sans approbation. Une limite de récidive par compte suffira le moment
venu.

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

## Les trois documents — relecture du 2026-08-03

`docs/conditions-utilisation.md`, `docs/politique-confidentialite.md`,
`docs/politique-remboursement.md`. Verdict : **publier par section, jamais en bloc.**

### Ce qui est en avance sur le site, à publier

| Où | Quoi |
|---|---|
| CGU §6.4 | Décrit le comportement réel — débit à la soumission pour l'unitaire, à la pièce pour le lot, reprise au point de contrôle sans double facturation, remise automatique sur défaillance. C'est le texte qui remplace le bloc « Débit des crédits » actuellement en ligne, faux depuis le 2026-07-31. |
| Politique de remboursement | **N'existe pas sur le site.** Aucune page, aucun lien au pied de page. Un service prépayé qui encaisse par PayPal sans politique de remboursement publiée, c'est une lacune commerciale autant que juridique. À créer, FR et EN, avec son entrée sous « Légal ». |
| CGU §6.3 | Table de prix **complète** — les quinze moteurs, avec Géomatique/SIG à 0,50 confirmé. Elle valide la grille corrigée hier, valeur par valeur. |

### Ce qui est en retard sur le site, à ne surtout pas publier

| Où | Quoi |
|---|---|
| **Politique de confidentialité §6** | Dit : « Nous n'utilisons pas, à ce jour, de témoins publicitaires **ni de traceurs de tiers à des fins de mesure d'audience** ». C'est exact **pour l'application**, qui n'a pas de Matomo — mais le document déclare à sa ligne 5 s'appliquer « au site, à l'application et à toute fonctionnalité qui y est rattachée », et le site vitrine, lui, fait tourner Matomo sous bandeau Loi 25 (`PopupLoi25` dans les deux layouts, CSP ouverte sur `matomo.cloudparadise.cloud`). **Publier ce brouillon ferait dire au site qu'il ne mesure rien pendant qu'il mesure.** Le document est daté du 30 juillet : il précède la mise en place. La page en ligne est déjà meilleure et vient d'être précisée (voir ci-dessous). |
| **CGU §4** | Conserve « GPU, CPU à **haute capacité**, mémoire vive **massive** » — exactement les deux superlatifs non quantifiés retirés du site le 2026-08-02. À aligner sur « GPU, CPU et mémoire réservés au calcul » avant publication, sinon la correction se défait. |

### ✅ Ce que la remarque « il n'y a pas de Matomo sur l'app » a corrigé

Une seule politique couvre les deux propriétés — la page en ligne parle bien des fichiers
téléversés et des journaux de tâches, qui sont de l'application. Elle disait donc « nous
utilisons Matomo » **sans portée**, ce qu'un utilisateur de l'application lit comme « je suis
mesuré ». C'était faux, et l'omission affaiblissait sans raison l'argument de souveraineté.

Corrigé aux sections 4 et 6, FR et EN : **la mesure ne porte que sur le site vitrine ;
l'application n'en comporte aucune.** C'est plus exact et c'est plus fort.

### Défauts internes aux documents

- **Trois adresses pour une même fonction.** Les CGU écrivent `info@` six fois et `support@` une
  fois ; la Politique de remboursement écrit `support@` trois fois ; la Politique de
  confidentialité désigne `maxime@` comme responsable. Le cas qui gêne : CGU §6.6 envoie les
  demandes de remboursement à `info@`, la Politique de remboursement §3 à `support@` — deux
  documents contractuels qui donnent deux guichets pour la même démarche.
- **Politique de remboursement §6**, note laissée dans le texte : *« À confirmer : le sort des
  crédits non consommés au moment de la suspension. »* Une question ouverte ne se publie pas
  dans un document contractuel ; à trancher ou à retirer.
- **Les plafonds ne sont nulle part.** La décision du point 4 était de les publier dans les CGU.
  Aucune des 365 lignes ne mentionne 2 minutes, 512 Ko, 200 Mo ni 10 images. À écrire — d'autant
  que §6.4 rembourse maintenant leur dépassement, ce qui rend la limite d'autant plus légitime à
  annoncer.

### Une conséquence pour la grille du site

La table §6.3 est **contractuelle**, donc complète : quinze moteurs, Téléchargement, Marketplace
et Jeux compris. La grille du site en affiche douze — c'est un choix éditorial assumé (point 3).
Mais la page `/conditions` **rend sa table depuis `GRILLE`** (`GrilleTarifaireLegale.tsx`) : le
contrat publié annoncerait donc douze prix là où le document en fixe quinze.

Une grille de vente peut être sélective ; une grille contractuelle, non. À régler avant de
publier §6.3 — le plus propre est un drapeau dans `offre.ts` marquant les moteurs hors vitrine,
lu par `GrilleTarifaireLegale` seul.

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
