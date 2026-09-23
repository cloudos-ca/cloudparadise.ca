# Passages à corriger dans les articles français (BabyLoveGrowth)

Relevé refait le 2026-09-23 en fin de journée, **après** la correction de la liste
« Services et tarifs » chez BabyLoveGrowth. Cette correction a réglé la source des futurs
articles, mais elle n'a pas touché le corps des textes déjà publiés : six des sept articles
français annoncent encore l'ancien modèle.

Le premier relevé (commit `9f2db81`) ne listait que trois articles et sept passages. Il était
incomplet : le balayage qui l'avait produit manquait les passages séparés par des espaces
insécables. L'inventaire ci-dessous est exhaustif — seize passages, vérifiés sur les pages
publiées.

## Les faits morts

| Ce qui est écrit | Ce qui est vrai |
| --- | --- |
| Plan Découverte, plan Pro | Deux forfaits : **Personnel** (10 $ CA/mois) et **Entreprise** (60 $ CA/mois) |
| Prix en $US / USD | Tout est en **dollars canadiens** |
| Facturation à la tâche, à l'unité, à l'usage, 0,25 $ par tâche | **Abonnement tout inclus**, avec une jauge d'usage mensuelle (enveloppe 30 ou 200) |
| Grille de crédits | Le modèle « crédits » a disparu à la bascule |
| Bac à sable vendu 15 $/mois | **Inclus dans Entreprise**, plus vendu seul |
| Rendu 3D facturé selon la quantité d'images | Consommé dans l'enveloppe du forfait |

Rappels utiles pour les remplacements : essai de **14 jours sans carte**, **satisfait ou
remboursé 30 jours** sur les engagements de 12 mois et plus, cinq durées (1, 3, 6, 12, 24 mois)
avec remise croissante jusqu'à 30 %.

---

## crm-pour-pme — 4 passages

**Remplacer :**

> Chez Cloud OS, l'accès à l'environnement de travail démarre à 10 $US par mois pour le plan
> Découverte, avec une facturation complémentaire à la tâche pour les traitements spécifiques.

**Par :**

> Chez Cloud OS, l'accès à l'environnement de travail démarre à 10 $ CA par mois avec le forfait
> Personnel, et les traitements sont compris dedans : pas de facture complémentaire à la tâche.

*(Ce passage apparaît deux fois dans l'article, avec des apostrophes différentes — corriger les
deux occurrences.)*

**Remplacer :**

> Les traitements spécifiques (documents, données, extraction web) se facturent ensuite à la tâche,
> à partir de 0,25 $CA.

**Par :**

> Les traitements spécifiques (documents, données, extraction web) sont compris dans l'enveloppe
> mensuelle du forfait — une jauge vous dit où vous en êtes, sans facture à la tâche.

**Remplacer :**

> consultez le détail des tarifs et de la grille de crédits

**Par :**

> consultez le détail des forfaits et tarifs

**Remplacer :**

> Un Bac à sable à 15 $US par mois permet de tester en conditions réelles avant tout engagement
> plus large

**Par :**

> Un essai de 14 jours, sans carte, permet de tester en conditions réelles avant tout engagement

## migration-vers-le-cloud — 2 passages

**Remplacer :**

> Les tâches spécifiques comme le calcul GPU, le rendu 3D, l'extraction web, ou le traitement
> d'images sont facturées à l'unité, évitant un paiement pour des capacités non utilisées.

**Par :**

> Les tâches spécifiques comme le calcul GPU, le rendu 3D, l'extraction web ou le traitement
> d'images sont comprises dans l'enveloppe mensuelle du forfait, sans facture à l'unité.

**Remplacer :**

> Pour des besoins ponctuels de calcul ou de traitement, les tarifs à l'usage de Cloud OS commencent
> autour de 0,25 $ CA par tâche, avec des plans mensuels affichés sur la page tarifs.

**Par :**

> Pour des besoins ponctuels de calcul ou de traitement, le forfait Personnel de Cloud OS commence
> à 10 $ CA par mois, tout compris, avec les durées d'engagement affichées sur la page tarifs.

## onlyoffice-vs-libreoffice — 1 passage

**Remplacer :**

> La tarification suit votre consommation réelle. Le service Documents se facture à la tâche, ou
> vous pouvez choisir un abonnement mensuel pour un accès régulier. Consultez la page tarifs pour
> les détails.

**Par :**

> La tarification est un abonnement, et tout est dedans : deux forfaits, une jauge mensuelle qui
> vous dit où vous en êtes plutôt qu'une facture à la tâche, et un essai de 14 jours sans carte.

## partage-de-fichiers-securise — 1 passage

**Remplacer :**

> Cloud OS, par exemple, permet de centraliser le partage de documents avec une tarification à
> l'usage dès 10 USD par mois via le plan Découverte, sans installation locale requise.

**Par :**

> Cloud OS, par exemple, permet de centraliser le partage de documents avec un abonnement tout
> inclus dès 10 $ CA par mois avec le forfait Personnel, sans installation locale requise.

## premiere-pro-vs-davinci-resolve — 5 passages

**Remplacer :**

> Cloud OS vous donne accès à du calcul GPU et à du rendu 3D à la demande, facturé à la tâche, sans
> qu'il faille immobiliser un budget dans une carte graphique haut de gamme

**Par :**

> Cloud OS vous donne accès à du calcul GPU et à du rendu 3D à la demande, compris dans votre
> forfait, sans qu'il faille immobiliser un budget dans une carte graphique haut de gamme

**Remplacer (réponse de la FAQ — elle alimente aussi les données structurées, donc les résultats
enrichis Google) :**

> Cloud OS propose du calcul GPU et du rendu 3D à la demande, facturés à la tâche, une option utile
> pour absorber un rendu ponctuel sans acheter de matériel dédié.

**Par :**

> Cloud OS propose du calcul GPU et du rendu 3D à la demande, compris dans l'abonnement, une option
> utile pour absorber un rendu ponctuel sans acheter de matériel dédié.

**Remplacer :**

> Le plan Bac à sable permet de tester ces capacités avant d'engager un abonnement plus large comme
> le plan Pro.

**Par :**

> Le Bac à sable, un bureau Linux persistant, est compris dans le forfait Entreprise ; un essai de
> 14 jours sans carte permet de tester ces capacités avant de vous engager.

**Remplacer :**

> Le service de rendu 3D se facture selon la quantité d'images traitées, ce qui permet d'estimer le
> coût d'une séquence animée avant de vous lancer.

**Par :**

> Le rendu 3D consomme votre enveloppe mensuelle selon la quantité d'images traitées, ce qui permet
> de situer une séquence animée dans votre forfait avant de vous lancer.

**Remplacer :**

> Les tarifs détaillés, incluant le plan Bac à sable à 15 $ par mois, sont listés sur la page tarifs
> de Cloud OS.

**Par :**

> Les tarifs détaillés, dont le forfait Entreprise qui comprend le Bac à sable, sont listés sur la
> page tarifs de Cloud OS.

## sso-open-source — 3 passages

**Remplacer :**

> La facturation suit votre consommation réelle : les forfaits incluent plusieurs niveaux et chaque
> tâche exécutée est facturée à l'unité plutôt qu'en abonnement fixe.

**Par :**

> La facturation est un abonnement tout inclus : deux forfaits, une jauge d'usage mensuelle plutôt
> qu'une facture par tâche.

**Remplacer :**

> Cloud OS propose cette approche avec un hébergement local et une tarification à la tâche ou par
> abonnement, sans installation ni serveur d'identité à maintenir en interne.

**Par :**

> Cloud OS propose cette approche avec un hébergement local et un abonnement tout inclus, sans
> installation ni serveur d'identité à maintenir en interne.

*(Ce passage apparaît deux fois, avec des apostrophes différentes.)*

**Remplacer :**

> dont le Bac à sable à 15 CAD par mois pour tester l'environnement avant de vous engager

**Par :**

> dont le Bac à sable, un bureau Linux persistant, compris dans le forfait Entreprise

## calendrier-partage-entreprise

Rien à corriger.

---

## Vérifier après coup

```bash
for s in calendrier-partage-entreprise crm-pour-pme migration-vers-le-cloud \
         onlyoffice-vs-libreoffice partage-de-fichiers-securise \
         premiere-pro-vs-davinci-resolve sso-open-source; do
  curl -s -L "https://cloudparadise.ca/blogue/$s" \
    | sed -E 's/<[^>]+>/ /g' | sed 's/\xc2\xa0/ /g' | tr '.' '\n' \
    | grep -iE "à la tâche|par tâche|à l.unité|plan Découverte|plan Pro|Bac à sable à|grille de crédits|\\\$ ?US" \
    | sed "s|^|$s : |"
done
```

Sortie vide = tous les articles sont à jour. Le balayage normalise les espaces insécables :
c'est ce qui manquait au premier relevé.

Deux familles de faux positifs à ignorer dans cette sortie : les prix en $US de
`premiere-pro-vs-davinci-resolve` qui sont ceux d'Adobe et de Blackmagic, et le mot
« Découverte » de `migration-vers-le-cloud`, qui y désigne la phase de *discovery* d'un projet de
migration et non l'ancien forfait.
