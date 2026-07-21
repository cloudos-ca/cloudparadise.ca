# cloudparadise.ca

Site vitrine de Cloud Paradise. Il met en scène le web OS au lieu de le
décrire : le hero **est** un bureau, avec sa barre de menu, ses fenêtres
flottantes et un job qui tourne.

L'application, elle, vit dans un dépôt séparé. Ce projet ne fait que pointer
vers elle.

## Stack

| | |
|---|---|
| Framework | Next 16 (App Router, Turbopack) |
| UI | React 19 |
| Styles | Tailwind v4 — config dans `@theme`, pas de `tailwind.config.js` |
| Animation | framer-motion |
| Couleurs | node-vibrant (extraction depuis les fonds photo) |

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
```

Autres commandes :

```bash
npm run build        # build de production
npm run lint         # eslint
npx tsc --noEmit     # vérification des types
```

## Structure

```
app/
  fonts.ts                    Comfortaa (titrage) + Work Sans (courant)
  globals.css                 charte et tokens Tailwind dans @theme
  (marketing)/                route group de la vitrine, Server Components
components/marketing/
  Hero.tsx                    la section — Client Component
  WindowCard.tsx              châssis de fenêtre réutilisable
  WallpaperPicker.tsx         sélecteur de fond
  wallpapers.ts               données des fonds + applyWallpaper()
public/brand/                 logos
cloud_paradise_assets/        fichiers de marque d'origine
```

Le layout, la page et les wrappers de sections sont des Server Components. Le
hero, le sélecteur de fond et le job animé sont des Client Components : ils ont
besoin d'état local, de framer-motion et de node-vibrant.

## Charte

| Nom | Hex | Usage |
|---|---|---|
| Bleu nuit | `#1b273d` | châssis, fenêtres, barre |
| Bleu | `#2d66ae` | action — boutons, progression |
| Cyan | `#bbecee` | accents clairs — puces, surlignages |
| Jaune | `#edbe54` | **halo de marque uniquement, jamais recoloré** |

Dans le hero, trois tokens CSS pilotent la couleur : `--acc` (accent vif),
`--soft` (accent clair) et `--sky` (le fond). Changer de fond les réécrit et
toute l'interface suit — boutons, progression, badge, avatar, deuxième ligne du
titre.

Le halo, lui, ne bouge jamais : il fait partie du fichier logo, donc aucune
règle CSS ne peut le repeindre.

Au-delà du hero, quelques éléments suivent aussi l'accent : la mention de
copyright du pied de page, le bouton secondaire « Voir la démo » du hero, le
bouton « Refuser » du bandeau Loi 25, et le lien « Voir les tarifs » des
fenêtres CTA. Le reste (navigation de la barre de menu, liens du pied de page,
bouton « Commencer » doré) reste volontairement fixe : la recoloration doit
rester un signal repérable, pas un effet généralisé.

## Fonds adaptatifs

Le set actuel est composé de dégradés de démonstration. Quand une entrée de
`wallpapers.ts` porte un champ `image`, le mécanisme bascule automatiquement :
node-vibrant extrait deux teintes de la photo pour alimenter `--acc` et
`--soft`, et un voile sombre s'active pour garder le texte lisible. Si
l'extraction échoue, les valeurs de la charte reprennent la main.

Les vraies photos restent à fournir.

## Logos — à savoir

Les fichiers de `cloud_paradise_assets/` sont des **JPEG malgré leur extension
`.png`**, donc sans transparence. La variante blanche est blanche sur fond
blanc : inexploitable telle quelle sur un fond sombre.

Les PNG de `public/brand/` sont donc recomposés à partir des deux sources
1204×896, qui sont alignées au pixel près : `Logo_noir` fournit la silhouette
et l'antialiasing, `Logo_blanc_et_jaune` indique quelles zones sont le halo et
le lettrage « paradise ».

**À remplacer par les vrais SVG dès réception** — mêmes noms de fichiers, le
code n'aura qu'à changer d'extension.

## Accessibilité

- `prefers-reduced-motion` respecté : état final statique, aucune boucle armée
- chaque pastille de fond est un `<button>` avec `aria-label` et `aria-pressed`
- icônes décoratives en `aria-hidden`
- pas de scroll horizontal, vérifié de 360px à 3440px
