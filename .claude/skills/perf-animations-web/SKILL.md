---
name: perf-animations-web
description: Règles de performance pour animations et composants clients React/Next.js. À utiliser dès qu'on écrit, modifie ou révise une animation, une transition, un composant framer-motion, un effet d'apparition au scroll, un carrousel, une barre de progression, un curseur clignotant, un halo ou un dégradé animé — et pour tout diagnostic de lenteur, de scintillement, de saccade au défilement, de remontage de composant ou de poids de bundle.
when_to_use: Déclencher sur « c'est lent », « ça saccade », « le bundle est trop gros », « ajoute une animation », « fais apparaître au scroll », « anime la barre », « pourquoi ça clignote », « optimise la page », « audit de perf », « framer-motion », « Reveal », « useInView ».
paths:
  - "**/*.tsx"
  - "**/*.ts"
  - "**/*.css"
---

# Performance des animations et du JS client

Ces règles sont des invariants. Une violation est un bogue, pas une préférence de style.
Si une exigence visuelle semble exiger une violation, l'annoncer avant d'écrire le code.

## 1. Propriétés animables

**N'animer que `transform` et `opacity`.** Ce sont les seules propriétés composées : elles
tournent sur le compositeur, sans layout ni paint.

Interdit d'animer : `width`, `height`, `left`, `right`, `top`, `bottom`, `margin*`,
`padding*`, `border-width`, `font-size`, `box-shadow`, `filter: blur()`.
Chacune déclenche un layout ou un paint **à chaque frame**.

Conversions :

| Au lieu de | Écrire |
| :-- | :-- |
| `width: 12% → 100%` | `transform: scaleX(0.12) → scaleX(1)` + `transform-origin: left` |
| `left: 0% → 100%` | `transform: translateX(0) → translateX(100%)` |
| `height: 0 → auto` | `grid-template-rows: 0fr → 1fr`, ou `transform: scaleY` |
| `box-shadow` pulsé | un nœud frère en `position:absolute` dont on anime l'`opacity` |
| `filter: blur()` animé | deux couches superposées, croisement d'`opacity` |

Attention avec `scaleX` : le contenu à l'intérieur se déforme. Pour une barre de progression
pleine, c'est sans conséquence. Pour un conteneur avec du texte, mettre le `scaleX` sur un
enfant vide qui sert de fond.

## 2. Ne jamais changer le type d'un composant entre deux rendus

React compare les types. Si un composant rend `<motion.div>` au premier rendu puis `<div>`
au second, React **démonte et remonte tout le sous-arbre** : DOM recréé, repaint complet,
et `useState` des enfants réinitialisé.

Interdit :

```tsx
// ✗ remonte tout l'arbre enfant après le délai
return done ? <div>{children}</div> : <motion.div ...>{children}</motion.div>;
```

Même règle pour les `key` : ne pas incrémenter une `key` dans un `setInterval` ou un
`onAnimationComplete` pour « rejouer » une animation. Utiliser un état CSS ou une
`animation-iteration-count`.

Symptôme à reconnaître dans un profil Chrome DevTools : un pic de scripting + layout à un
délai fixe après le chargement (T+1,5 s, T+3 s…). C'est toujours un remontage.

## 3. Toute boucle infinie doit être gardée

Une animation `repeat: Infinity` garde un `requestAnimationFrame` actif en permanence : le
fil principal n'est jamais au repos, ce qui dégrade le défilement, l'hydratation et la
batterie — y compris hors viewport et onglet en arrière-plan.

Deux gardes, toujours les deux :

```tsx
const ref = useRef(null);
const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
const [visible, setVisible] = useState(true);

useEffect(() => {
  const onChange = () => setVisible(document.visibilityState === "visible");
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}, []);

const anime = inView && visible;
```

En CSS pur, l'équivalent est `animation-play-state: paused` par défaut, `running` via une
classe posée par un `IntersectionObserver`.

Ne jamais poser une boucle infinie dans un composant de bas de page (CTA, pied de page) sans
garde : elle tourne pour tous les visiteurs qui ne descendent jamais jusque-là.

## 4. CSS d'abord, framer-motion en dernier recours

Une bibliothèque d'animation coûte ~40 Ko gzip dans le bundle de **chaque page** qui
l'importe, même indirectement via un composant partagé.

Utiliser du CSS quand l'animation est :
- une apparition/disparition (`opacity` + `translate`)
- une transition d'état au survol ou au focus
- une boucle décorative simple

Réserver framer-motion (ou équivalent) aux cas qui ont besoin de :
- gestes et glisser-déposer
- animation de sortie (`AnimatePresence`)
- orchestration inter-composants avec interruption
- physique de ressort dépendant de la vélocité

Pour une apparition au scroll, le patron correct est **un seul `IntersectionObserver`
partagé au niveau du module**, réutilisé par toutes les instances — pas un observateur par
composant.

## 5. Invariant d'accessibilité : le texte doit toujours être lisible

**Aucun texte ne doit jamais rester bloqué à `opacity: 0`.** C'est la règle la plus
importante du fichier.

Écrire le CSS de façon à ce que l'état par défaut soit *visible*, et que le JS ajoute
l'état initial masqué. Si le JS ne part jamais (erreur, bloqueur, hydratation échouée), le
texte reste lisible.

```css
/* ✓ visible par défaut ; c'est l'observateur qui pose .reveal-init */
.reveal { opacity: 1; transform: none; transition: opacity .5s ease, transform .5s ease; }
.reveal-init { opacity: 0; transform: translateY(12px); }
.reveal-in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-init, .reveal-in { opacity: 1; transform: none; transition: none; }
}
```

Jamais l'inverse (`opacity: 0` par défaut, le JS révèle) : c'est une page blanche si le JS
échoue.

Respecter `prefers-reduced-motion: reduce` sur **toute** animation, sans exception.
Vérifier le rendu avec le réglage activé avant de considérer une tâche terminée.

## 6. Couches de composition

Chaque élément `position: fixed; inset: 0` avec un fond est une couche que le compositeur
gère à chaque frame de défilement. Deux maximum sur une page.

- Empiler plusieurs `radial-gradient` dans **une seule** propriété `background` plutôt que
  dans plusieurs éléments superposés.
- Ne pas poser `will-change` « au cas où » : il force la création d'une couche permanente.
  Le poser juste avant l'animation, le retirer après, ou pas du tout.
- Vérifier dans l'onglet **Layers** de Chrome DevTools avant/après.

## 7. Écouteurs et minuteries

- Un handler `scroll` doit être `{ passive: true }` **et** limité. Mieux : le remplacer par
  un `IntersectionObserver` avec une sentinelle — zéro travail JS pendant le défilement.
- Tout `setInterval` (horloge, rotation, sondage) se suspend sur `visibilitychange`.
- Tout `addEventListener`, `setInterval`, `setTimeout` et observateur est nettoyé dans le
  retour du `useEffect`. Sans exception.

## 8. Poids du bundle

- Un composant client sous la ligne de flottaison (estimateur, FAQ, CTA de bas de page) se
  charge avec `next/dynamic`.
- Piège documenté : quand un composant **serveur** importe dynamiquement un composant
  client, le découpage automatique du code ne s'applique pas. Le `dynamic()` doit être posé
  dans un composant client, ou le parent converti. Toujours vérifier le nombre de fichiers
  JS chargés avant/après — ne pas supposer que le gain est là.
- Une page de texte pur (mentions légales, politique de confidentialité) ne doit importer
  aucune bibliothèque d'animation. Si elle en importe une, c'est via un composant partagé :
  corriger le composant partagé, pas la page.

## Checklist avant de livrer une animation

1. Seulement `transform` / `opacity` ?
2. Aucun changement de type de composant entre rendus ? Aucune `key` incrémentée par une minuterie ?
3. Toute boucle infinie gardée par `useInView` **et** `visibilitychange` ?
4. `prefers-reduced-motion` respecté ?
5. Le texte reste lisible si le JS ne part pas ?
6. Tous les écouteurs et minuteries nettoyés ?
7. Aucune bibliothèque d'animation ajoutée au bundle d'une page qui n'en a pas besoin ?

## Vérification

```bash
# poids réel par page après build
npm run build

# une bibliothèque d'animation s'est-elle glissée sur une page de texte ?
grep -rl "framer-motion" .next/server/app/<page>.html   # attendu : aucun résultat

# propriétés non composées animées, dans tout le dépôt
grep -rnE "animate=\{\{[^}]*(width|height|left|top|right|bottom|margin|padding):" \
  --include="*.tsx" .

# boucles infinies non gardées
grep -rn "repeat: Infinity" --include="*.tsx" .   # chacune doit être près d'un useInView
```

Dans Chrome DevTools, profil **Performance** avec `4× CPU slowdown` :

1. Charger la page — aucun pic de scripting/layout à un délai fixe après le chargement.
2. Laisser la page au repos 10 s sans interagir — l'activité du fil principal doit tomber
   à zéro une fois les animations d'entrée terminées. Si elle ne redescend jamais, une
   boucle n'est pas gardée.
3. Onglet **Layers** — compter les couches plein écran.
4. Refaire le parcours avec `prefers-reduced-motion: reduce` activé — tout le texte reste
   lisible et visible.

## En cas de doute

Si une exigence visuelle semble exiger d'animer une propriété interdite, ou de laisser une
boucle tourner en permanence : **le signaler et proposer l'alternative composée** plutôt
que d'écrire la version coûteuse. Ne jamais introduire une régression de perf
silencieusement pour satisfaire une demande esthétique.
