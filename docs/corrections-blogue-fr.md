# Passages à corriger dans les articles français (BabyLoveGrowth)

Relevé refait le 2026-09-23 en fin de journée, **après** la correction de la liste
« Services et tarifs » chez BabyLoveGrowth. Cette correction a réglé la source des futurs
articles, mais elle n'a pas touché le corps des textes déjà publiés : six des sept articles
français annoncent encore l'ancien modèle.

Le premier relevé (commit `9f2db81`) ne listait que trois articles et sept passages. Il était
incomplet : le balayage qui l'avait produit manquait les passages séparés par des espaces
insécables. L'inventaire ci-dessous est exhaustif — seize passages, vérifiés sur les pages
publiées.

**Complété le 2026-09-28** avec les trois articles publiés depuis (`meilleur-cloud-securise`,
`iaas-vs-paas`, `blender-dans-le-cloud`), relevés au moment de leur traduction anglaise : six
passages de plus, dont un en FAQ. Ils sont déjà corrigés dans les versions anglaises
(`content/blogue/en/`) ; seul le français reste à reprendre chez BabyLoveGrowth.

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

## meilleur-cloud-securise — 4 passages

**Remplacer :**

> Cloud OS garde vos données et vos traitements sur des serveurs détenus au Québec, avec un moteur
> déterministe qui produit des résultats reproductibles plutôt qu'approximatifs, à un tarif
> transparent, facturé à la tâche ou par abonnement.

**Par :**

> Cloud OS garde vos données et vos traitements sur des serveurs détenus au Québec, avec un moteur
> déterministe qui produit des résultats reproductibles plutôt qu'approximatifs, dans un abonnement
> tout compris et transparent, en dollars canadiens.

**Remplacer :**

> Consultez la page tarifs pour comparer le plan Découverte à 10 CAD par mois et le plan Entreprise
> à 60 CAD par mois.

**Par :**

> Consultez la page tarifs pour comparer les deux forfaits tout compris : Personnel à 10 $ CA par
> mois et Entreprise à 60 $ CA par mois, chacun avec une enveloppe d'usage mensuelle suivie par une
> jauge.

**Remplacer :**

> Lancez un essai sur votre propre cas métier, puis vérifiez la reproductibilité des résultats
> obtenus.

**Par :**

> Lancez l'essai de 14 jours, sans carte, sur votre propre cas métier, puis vérifiez la
> reproductibilité des résultats obtenus.

*(Pas faux tel quel : c'est la précision qui manque.)*

**Remplacer (réponse de la FAQ « Combien coûte… » — elle alimente aussi les données
structurées) :**

> Cloud OS propose le plan Découverte à 10 CAD par mois, le plan Entreprise à 60 CAD par mois, et
> l'Hébergement Web à 9 CAD par mois, selon la page tarifaire du fournisseur. Le modèle repose sur
> un abonnement ou des crédits prépayés facturés à la tâche.

**Par :**

> Cloud OS propose deux forfaits tout compris, en dollars canadiens : Personnel à 10 $ CA par mois
> et Entreprise à 60 $ CA par mois, ainsi que l'Hébergement Web à partir de 9 $ CA par mois. Chaque
> forfait comprend une enveloppe d'usage mensuelle, suivie par une jauge plutôt que facturée à la
> tâche, et un essai de 14 jours sans carte permet de commencer.

*(Ce passage apparaît deux fois dans l'article, avec des apostrophes différentes — corriger les
deux occurrences.)*

La phrase « Décomposez le coût total : abonnement ou crédits, transferts de données… » reste : c'est
un conseil général sur les fournisseurs, pas une description de notre offre.

## iaas-vs-paas — 2 passages

**Remplacer (liste « Pourquoi Cloud OS ») :**

> Une tarification basée sur la consommation réelle, plutôt qu'un investissement fixe dans du
> matériel serveur.

**Par :**

> Un abonnement mensuel tout compris, avec une jauge d'usage, plutôt qu'un investissement fixe dans
> du matériel serveur.

**Remplacer :**

> Le plan Découverte de Cloud OS, à 10 CAD par mois, permet justement de tester cette approche sans
> engagement lourd, avant de considérer le plan Entreprise si les besoins grandissent.

**Par :**

> Cloud OS propose deux forfaits tout compris, Personnel à 10 $ CA par mois et Entreprise à 60 $ CA
> par mois, chacun avec une enveloppe d'usage mensuelle. L'essai de 14 jours, sans carte, permet
> justement de tester cette approche sans engagement lourd, et le forfait Entreprise, qui comprend
> aussi le Bac à sable, prend le relais si les besoins grandissent.

*(Le lien « plan Découverte de Cloud OS » pointe vers /tarifs : garder le lien sur « deux forfaits
tout compris ».)*

## blender-dans-le-cloud — rien de faux, deux précisions facultatives

L'article ne nomme aucun forfait mort, mais reste vague là où la version anglaise est précise :

**Remplacer :**

> Cloud OS regroupe ses services dans deux formules principales sur sa page tarifs : un plan de base
> accessible et un plan plus complet pour les besoins d'entreprise.

**Par :**

> Cloud OS regroupe ses services dans deux forfaits tout compris sur sa page tarifs : Personnel, à
> 10 $ CA par mois, et Entreprise, à 60 $ CA par mois. Chacun comprend une enveloppe d'usage
> mensuelle avec une jauge : le rendu 3D et le calcul GPU y sont puisés, sans facture à part.

**Remplacer :**

> …et les conditions tarifaires applicables à votre volume d'usage.

**Par :**

> …et l'enveloppe mensuelle du forfait qui convient à votre volume d'usage.

*(La formule d'origine laisse entendre une facturation au volume.)*

---

## Vérifier après coup

```bash
for s in calendrier-partage-entreprise crm-pour-pme migration-vers-le-cloud \
         onlyoffice-vs-libreoffice partage-de-fichiers-securise \
         premiere-pro-vs-davinci-resolve sso-open-source \
         meilleur-cloud-securise iaas-vs-paas blender-dans-le-cloud; do
  curl -s -L "https://cloudparadise.ca/blogue/$s" \
    | sed -E 's/<[^>]+>/ /g' | sed 's/\xc2\xa0/ /g' | tr -s ' ' | tr '.' '\n' \
    | grep -iE "à la tâche|par tâche|à l.unité|plan Découverte|plan Pro|Bac à sable à|grille de crédits|crédits prépayés|consommation réelle|\\\$ ?US" \
    | sed "s|^|$s : |"
done
```

Sortie vide = tous les articles sont à jour. Le balayage normalise les espaces insécables :
c'est ce qui manquait au premier relevé. Il réduit aussi les espaces multiples, que le retrait des
balises laisse quand un lien coupe une expression (« plan  Découverte » dans `iaas-vs-paas`).

Deux familles de faux positifs à ignorer dans cette sortie : les prix en $US de
`premiere-pro-vs-davinci-resolve` qui sont ceux d'Adobe et de Blackmagic, et le mot
« Découverte » de `migration-vers-le-cloud`, qui y désigne la phase de *discovery* d'un projet de
migration et non l'ancien forfait.
