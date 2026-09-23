# Cloud OS — Plan de contenu du site vitrine

**Document de contenu uniquement.** Il décrit *ce qui est dit* sur chaque page : message-clé, information à présenter, preuves, appel à l'action, et ce qu'il ne faut pas dire.

La conception visuelle, la mise en page, le choix des composants, les animations et la hiérarchie typographique sont **entièrement à la discrétion de Claude Code**. Ce document ne contient aucune directive de design, à une exception près, formulée par le client :

> **Sobriété.** Le site actuel en fait trop côté effets. Moins d'animation, moins de démonstrations interactives, plus de substance lisible. Un effet doit gagner sa place en expliquant quelque chose ; sinon il saute.

Version : 26 juillet 2026 · remplace le plan de refonte à 11 pages.

---

## 1. Décisions verrouillées

Ces points sont tranchés. Ils ne se rediscutent pas dans les briefs de sections.

| Sujet | Décision |
|---|---|
| Positionnement | **Horizontal.** Cloud OS = poste de travail cloud avec calcul lourd. Pas de bascule vers une identité « logiciel minier ». |
| Rôle de `/mines` | Page de **soutien à la vente**, pas de conquête SEO. Le visiteur y arrive parce qu'on lui a envoyé le lien. Objectif : prouver en 30 secondes qu'on connaît le métier. |
| Couverture des facettes | 100 % maintenue, mais répartie selon la fonction de la page (convaincre / rassurer / capter), pas étalée sur 11 pages. |
| Nombre de pages | 8 pages de contenu — `/assistance` s'est ajoutée le 2026-09-23, voir §2. |
| Moteur d'IA | **Auto-hébergé.** Aucune donnée client ne transite par une API externe. |
| Hébergement | Matériel possédé, dans un local loué à Amos, Québec. |
| Disponibilité | **Aucune promesse.** Voir §5. |
| Modèle de tarification | **Abonnement, depuis la bascule du 2026-09-23.** Deux forfaits tout inclus en $ CA (Personnel, Entreprise), une jauge d'usage mensuelle, cinq durées d'engagement, un essai de 14 jours sans carte. Les crédits, les packs de recharge, la grille de prix par tâche et les add-ons vendus séparément **n'existent plus** : ni « crédit », ni « recharge », ni « solde », ni « payez ce que vous utilisez » ne doivent réapparaître dans la copie client. Voir §3.6. |
| Langue | FR par défaut, clés prêtes pour EN. Vouvoiement partout. |

---

## 2. Arborescence

| URL | Rôle | Priorité |
|---|---|---|
| `/` | Convaincre. Élargir la perception de « service de calcul » à « poste de travail ». | 1 |
| `/plateforme` | Le plus gros manque comblé : le bureau, les éditeurs, la collaboration. Trois sections ancrées, **une seule page**. | 2 |
| `/calcul` | Les moteurs + l'automatisation (workflows, cédules, rapports). Évolution de l'actuelle `/fonctions`. | 3 |
| `/mines` | Soutien à la vente pour le marché de l'exploration. | 4 |
| `/securite` | Souveraineté, IA déterministe, isolation. Que du texte. | 5 |
| `/assistance` | Le Bureau d'assistance : billetterie, portail client, courriel, clavardage, engagements de service. Ajoutée le 2026-09-23 — le module était en production et totalement absent du site. | 6 |
| `/tarifs` | Les forfaits. | 7 |
| `/fonctions` | **Référence exhaustive.** Une ligne par facette, ancres profondes. Personne ne la lit au complet. | 8 |

Plus l'existant : `/contact`, `/conditions`, `/confidentialite`.

**Navigation principale : Plateforme · Calcul · PME · Fonctions · Tarifs · Blogue.** Pas de menu déroulant. `/mines`, `/securite` et `/assistance` vivent dans le pied de page et dans les liens contextuels en fin de section : la barre est pleine, et une septième entrée y ferait perdre les six autres.

**Pourquoi `/editeurs` et `/collaboration` n'existent pas :** trois pages minces convainquent moins qu'une page forte. On pourra scinder si le trafic le justifie. Jamais l'inverse.

---

## 3. Briefs par page

Format : Message-clé · Information à présenter · Preuves · CTA · Ce qu'on ne dit pas.

### 3.1 `/` — Accueil

**Message-clé.** « Un bureau à votre image. Décrivez la tâche, on s'occupe du calcul. »
Sous-titre à élargir : votre poste de travail cloud — calcul lourd, éditeurs professionnels, collaboration d'équipe, sans rien installer.

**Information à présenter.**
- Le produit est un bureau en ligne complet, pas un formulaire de dépôt de fichiers. C'est le changement de perception numéro un à opérer.
- Les trois piliers : le calcul en langage humain, l'espace de travail complet, la souveraineté.
- Un aperçu de l'ampleur : les grandes familles d'apps disponibles, avec renvoi vers `/plateforme`.
- Le processus en quatre étapes (Déposez / Décrivez / On exécute / Récupérez) — il fonctionne, on le garde.
- Le modèle en une ligne : un abonnement tout inclus dès 10 $ CA par mois, essai de 14 jours sans carte.
- Un renvoi discret vers `/mines` pour le visiteur du secteur.

**Preuves.** Le différenciateur central, formulé simplement : l'IA choisit la méthode, un moteur déterministe calcule le résultat exact. Le résultat n'est jamais inventé. Cette phrase doit être compréhensible par un non-technicien.

**CTA.** « Commencer gratuitement · 14 jours d’essai, sans carte ».

**Ce qu'on ne dit pas.** Aucun compte chiffré de modes. Aucun chiffre de performance. Aucune promesse de disponibilité.

---

### 3.2 `/plateforme` — Le bureau, les éditeurs, la collaboration

Une page, quatre sections ancrées : `#bureau`, `#editeurs`, `#equipe`, `#jeux` (ajoutée le
2026-08-12 — Studio de jeux et Arcades, absents jusque-là).

**Message-clé.** « Pas un tableau de bord. Un vrai bureau. »

**Section `#bureau` — information à présenter.**
- Fenêtres déplaçables, dock, thème jour/nuit, fond d'écran personnalisable.
- Spotlight : recherche plein-texte à travers vos fichiers.
- Gestion de fichiers : stockage, corbeille, partage, glisser-déposer.
- Connexions Google Drive et OneDrive.
- Assistant intégré, documentation, notifications in-app et par courriel, parcours d'accueil guidé.

**Section `#editeurs` — information à présenter.**
Le point à faire passer : vos fichiers restent dans votre espace, la sauvegarde est directe, il n'y a rien à installer ni à téléverser ailleurs.
- Bureautique : traitement de texte, tableur, présentation, en co-édition.
- Image : retouche rapide, et édition par calques pour le travail sérieux.
- Vidéo et audio : montage et traitement dans le navigateur.
- 3D : Blender réel, streamé, en session éphémère.
- SIG : QGIS Desktop, streamé.

**Section `#equipe` — information à présenter.**
- Équipes avec bureaux multiples, partage de fichiers et de workflows entre plusieurs équipes, invitations et approbation.
- Messagerie : canaux, messages directs, présence.
- Courriel `@cloudos.ca` avec webmail.
- Agenda partagé et rappels.

**Preuves.** Des captures réelles du bureau et de chaque éditeur. C'est la page qui en dépend le plus : sans visuels authentiques, elle ne convainc pas.

**CTA.** « Créez votre bureau gratuitement ».

**Ce qu'on ne dit pas.** Aucune app qui ne serait pas pleinement utilisable en production par un inconnu sans accompagnement.

---

### 3.3 `/calcul` — Les moteurs et l'automatisation

**Message-clé.** « Un seul endroit. Toutes vos tâches lourdes. » Renforcé par : l'IA choisit comment calculer, un moteur déterministe produit le résultat exact.

**Information à présenter.**
- Les modes de calcul actuellement en production. **Ne jamais afficher un compte chiffré** (« nos 10 modes ») — la liste évolue et le chiffre devient faux. Décrire, ne pas compter.
- Pour chaque mode : deux ou trois exemples concrets d'entrée → sortie. C'est ce qui manque le plus aujourd'hui.
- Les capacités sous-vendues à faire remonter : recherche sémantique sur vos documents, publipostage, classification automatique de photos et de documents, intelligence d'affaires financière, diagrammes, archives chiffrées, gestionnaire de téléchargements par URL.
- Section automatisation : workflows visuels enchaînant plusieurs moteurs (par exemple scraping → données → rapport), cédules pour l'exécution récurrente, rapports avec graphiques et export PDF, livraison programmée par courriel.

**Preuves.** Des exemples chiffrés et vérifiables plutôt que des adjectifs. « Traduire 200 contrats » vaut mieux que « traitement par lots performant ».

**CTA.** « Lancez votre première tâche ».

**Ce qu'on ne dit pas.** Pas de comparaison de vitesse avec un concurrent ou avec « votre machine » sur des chiffres inventés.

---

### 3.4 `/mines` — Exploration minière

**Rappel de cadrage.** Cette page ne cherche pas de trafic. Elle sert de preuve de compétence dans une conversation de vente déjà entamée. Elle doit être crédible, pas volumineuse.

**Message-clé.** « Le poste de travail de l'exploration minière au Québec. Conçu en Abitibi. »

**Information à présenter.** Le vocabulaire métier est ici l'argument principal — un géologue reconnaît en quelques secondes si l'auteur connaît le domaine.
- Titres miniers : suivi des claims, alertes d'échéance par courriel et notification, superpositions GESTIM.
- Forages : visionneuse 3D interactive des traces desurvey.
- Rapport d'exploration : brouillon assisté de rapport de travaux statutaires MRNF et de sections NI 43-101, export PDF.
- Données ouvertes : import des couches SIGÉOM et MERN par district minier.
- SIG : reprojection NAD83 UTM 17/18N et MTM, desurvey, anomalies géochimiques, ombrage et courbes de niveau, export GPX pour Garmin sur le terrain, éditeur QGIS en ligne.
- Ancrage local assumé : Amos, Val-d'Or, Rouyn-Noranda. Les serveurs sont dans la même ville que le client — c'est un argument, pas une excuse.

**CTA.** « Réservez une démo » vers un formulaire ciblé. Le second CTA d'essai gratuit est secondaire ici.

**Ce qu'on ne dit pas.** Aucune référence client nommée sans autorisation écrite. Le milieu est petit et interconnecté.

---

### 3.5 `/securite` — Souveraineté et confiance

**Message-clé.** « Vos données, notre matériel, au Québec. »

**Information à présenter — les quatre affirmations défendables.**
1. Hébergement au Québec sur du matériel possédé. Pas de cloud tiers loué.
2. Le modèle de langage tourne sur nos machines. Aucune donnée client ne transite par une API externe.
3. L'IA route et planifie ; un moteur déterministe calcule. L'IA n'exécute jamais de commande arbitraire, les accès SQL sont en lecture seule, et le résultat n'est jamais généré par le modèle.
4. Isolation par utilisateur et par équipe, authentification à deux facteurs par courriel, jetons de session hachés, clés API à portée limitée avec expiration.

**Preuves.** Le point 3 est le meilleur argument du produit et le moins coûteux à démontrer : il suffit de l'expliquer clairement.

**CTA.** « Parlez à un humain ».

**Ce qu'on ne dit pas — important.** Aucune mention de disponibilité garantie, d'engagement de service chiffré, de redondance, de reprise après sinistre, ni de certification. Un local loué n'est pas une colocation : pas de génératrice, pas de refroidissement redondant, un seul lien réseau. Le silence sur ces sujets est la posture correcte tant que l'infrastructure n'est pas en colocation. Aucune référence non plus au modèle précis des processeurs, de la mémoire ou des cartes graphiques.

---

### 3.6 `/assistance` — Le Bureau d'assistance

**Ajoutée le 2026-09-23.** Le module `desk` était livré en production depuis des semaines — billetterie multi-locataire, six vagues — et le site n'en disait pas un mot, dans aucune des deux langues. Cette page comble le trou ; `/fonctions#assistance` et `/pme#assistance` y renvoient.

**Message-clé.** « Le service à la clientèle, dans votre bureau. »

**Structure.** Héros, puis cinq sections ancrées : `#canaux`, `#billets`, `#engagements`, `#mesure`, `#souverainete`.

**Information à présenter.**
- Les quatre canaux d'arrivée : portail client par lien magique, boîte courriel du client, clavardage embarquable, base de connaissances avec déflexion.
- Ce qui se passe dans un billet : classement et brouillon de réponse à l'arrivée, macros qui agissent sur le billet, fil public et notes internes, répertoire de clients partagé avec l'ERP.
- Les engagements de service : deux échéances, comptées en heures ouvrables, **en pause pendant l'attente du client**, avec alerte et escalade. C'est l'argument qui distingue du concurrent déjà en place.
- Ce qui est mesuré, sans promesse chiffrée de résultat.
- La souveraineté appliquée aux conversations clients : elles restent au Québec, le modèle qui les classe tourne sur le même matériel, et nous ne lisons pas les billets.
- Inclus dans les deux forfaits, dès le prix d'entrée.

**Ce qu'on ne dit pas.** Aucune promesse de gain chiffré (« réduisez vos délais de 40 % ») : on n'a pas la mesure pour la soutenir. Aucun nom de concurrent dans la copie. Pas de compte de fonctionnalités. Le CAPTCHA du portail est un manque assumé côté produit — ne pas laisser entendre le contraire.

---

### 3.7 `/tarifs`

**Refaite le 2026-09-23** — vague 4 de la spec applicative `docs/superpowers/specs/2026-09-17-facturation-forfaits-jauge-design.md`, §8.2. Ce qui suit remplace intégralement le brief « crédits » antérieur, qui décrivait une offre qui n'est plus vendue.

**Message-clé.** « Un abonnement. Tout est inclus. »

**Structure livrée.** Héros avec `BandeauConfiance` (prix en $ CA et taxes affichées · données au Québec · Loi 25), puis cinq sections ancrées : `#forfaits`, `#durees`, `#moteurs`, `#garanties`, `#questions`.

**Information à présenter.**
- Deux forfaits, Personnel et Entreprise, en dollars canadiens et hors taxes.
- Cinq durées d'engagement à remise croissante ; **même prix au renouvellement** ; la durée la plus longue est un paiement unique, sans reconduction tacite.
- « ≈ N tâches par mois », toujours accompagné de « selon le type de tâche ». Jamais présenté comme un quota.
- Tous les moteurs sont dans le forfait : la section `#moteurs` les nomme, sans aucun prix.
- Les règles de la jauge : renouvellement mensuel, report une fois plafonné à un mois, avis à 80 %, choix à 100 % (attendre ou ajouter un mois d'enveloppe), sursis d'une tâche par lots déjà lancée, pause de 1 à 3 mois.
- Essai de 14 jours sans carte et garantie satisfait ou remboursé de 30 jours sur les engagements longs.
- L'équipe : Entreprise est le titulaire, les collègues rejoignent en Personnel, pool d'enveloppes — **pas de sièges à acheter**. Traité dans la FAQ, pas en section propre.

**Ce qu'on ne dit pas.** Pas de grille de prix par type de tâche : elle n'est plus publique. Pas d'estimateur de budget, pas de solde, pas de recharge, pas de quota chiffré et ferme. L'équivalent en $ US reste une note discrète qui glose le prix de liste, jamais un second prix.

**Garde-fou.** Les prix sont modifiables en admin **sans déploiement**, et la vitrine a déjà divergé deux fois. `lib/offre.test.ts` compare `components/marketing/offre.ts` à `GET /api/v1/pricing` de la production, et `.github/workflows/ci.yml` l'exécute à chaque poussée. Un prix qui bouge côté plateforme sans bouger ici fait rougir la CI : ne pas contourner ce test, le corriger.

---

### 3.8 `/fonctions` — Référence exhaustive

**Rôle.** Cette page absorbe toute la couverture résiduelle. Elle sert deux publics : l'évaluateur qui cherche « est-ce qu'ils ont X ? », et l'indexation. Elle n'est pas conçue pour être lue en entier.

**Information à présenter.** Une entrée courte par facette — nom, phrase de description, lien vers la page qui la développe si elle existe. Y compris tout ce qui n'a pas trouvé place ailleurs : agenda, webmail, gestionnaire de téléchargements, notifications, parrainage, facturation et factures, clés API, publipostage, classification automatique, recherche sémantique, documentation intégrée, assistant.

**Règle.** Chaque ligne de la matrice §4 doit se retrouver ici ou sur une page dédiée. Zéro facette orpheline.

---

## 4. Matrice de couverture

| Facette | Page d'accueil de la facette |
|---|---|
| Bureau, dock, Spotlight, thème, fond d'écran | `/plateforme#bureau` |
| Fichiers, stockage, corbeille, partage, glisser-déposer | `/plateforme#bureau` |
| Connexions Google Drive / OneDrive | `/plateforme#bureau` |
| Assistant, documentation, notifications, accueil guidé | `/plateforme#bureau` + `/fonctions` |
| Bureautique en ligne (texte, tableur, présentation) | `/plateforme#editeurs` |
| Éditeurs image, vidéo, audio | `/plateforme#editeurs` |
| Blender streamé | `/plateforme#editeurs` |
| QGIS streamé | `/plateforme#editeurs` + `/mines` |
| Équipes, partage multi-équipes, invitations | `/plateforme#equipe` |
| Messagerie, courriel, agenda | `/plateforme#equipe` |
| Modes de calcul | `/calcul` |
| Recherche sémantique, publipostage, classification, BI, diagrammes, archives | `/calcul` + `/fonctions` |
| Workflows, cédules, rapports | `/calcul` |
| Gestionnaire de téléchargements | `/fonctions` |
| Titres miniers, forages 3D, rapport d'exploration, données ouvertes, SIG, GPX | `/mines` |
| Infra possédée, LLM auto-hébergé, IA déterministe, 2FA, isolation, clés API | `/securite` |
| Forfaits, jauge, facturation, parrainage | `/tarifs` |
| ERP (CRM, devis/factures, inventaire, tableau de bord) | `/pme#erp` + `/fonctions` |
| Bureau d'assistance (billets, portail, courriel, clavardage, base de connaissances, SLA, macros, rapports, satisfaction) | `/assistance` + `/pme#assistance` + `/fonctions#assistance` |
| Marché de conteneurs (piles décrites en langage naturel) | `/fonctions#applications` |
| Studio de jeux, Arcades | `/plateforme#jeux` + `/fonctions` + carte homepage |
| Commandes vocales (navigation seulement) | `/plateforme#bureau` (carte Spotlight) + `/fonctions` |
| Courriel/agenda/contacts externes (IMAP, OAuth, CalDAV/CardDAV) | `/plateforme#equipe` + `/fonctions` + `/pme#equipe` |

---

## 5. Règles de contenu transversales

À appliquer sur toutes les pages, sans exception.

1. **Vouvoiement** partout.
2. **Jamais de compte chiffré** de modes, d'apps ou de fonctionnalités. La liste évolue ; le chiffre devient faux et il faut alors le corriger à sept endroits.
3. **L'abonnement est le modèle, et le seul.** Depuis le 2026-09-23, aucune surface client ne parle de crédits, de solde, de recharge ni de prix par tâche. Aucune négation de l'abonnement non plus (« sans abonnement », « sans abonnement requis ») : ce serait faux. L'enveloppe mensuelle se dit « jauge » et s'affiche en pourcentage.
4. **Aucune promesse de disponibilité** : pas d'engagement de service, pas de pourcentage d'uptime, pas de redondance, pas de certification.
5. **Aucune fiche technique matérielle.** On vend le principe de souveraineté, jamais les numéros de modèle.
6. **Ne montrer que ce qui est live** et utilisable par un inconnu sans accompagnement.
7. **Prix : source unique.** Toute valeur monétaire vient du fichier de tarification centralisé. Aucun prix écrit en dur dans une page.
8. **Sobriété des effets** — instruction client. Un effet visuel doit expliquer quelque chose pour mériter sa place.
9. **Structure bilingue** : FR par défaut, clés prêtes pour EN, sans refonte ultérieure.

---

## 6. Points ouverts

À régler avant ou pendant la construction.

1. **Vérification des appels externes résiduels.** Confirmer dans le code qu'aucun appel n'atteint une API externe — pas seulement pour le routage, mais aussi pour la génération d'images, l'assistant, la recherche sémantique et la classification automatique. Ce sont les endroits où une intégration reste souvent branchée après la migration du moteur principal. L'affirmation « aucune donnée chez un tiers » ne peut être publiée avant cette vérification.
2. **Politique de confidentialité à refaire.** Le brouillon existant était structuré autour d'un sous-traitant externe et de l'obligation d'évaluation des facteurs relatifs à la vie privée qui en découlait. Avec un modèle auto-hébergé, cette section disparaît et la politique devient plus simple et plus forte. À reprendre, puis à faire valider par un juriste.
3. **Captures d'écran.** `/plateforme` et `/mines` ne fonctionnent pas sans visuels réels du bureau et des apps. À produire avant la rédaction finale de ces deux pages.
4. **Liste des facettes.** Établir une liste figée, relue à chaque version, plutôt que d'importer le registre d'apps de l'application — les deux dépôts sont séparés.
