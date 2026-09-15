# cloudparadise.ca

Site vitrine de Cloud OS. Il met en scène le web OS au lieu de le
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
  fonts.ts                    Archivo (titrage) + Manrope (courant)
  globals.css                 charte et tokens Tailwind dans @theme
  (marketing)/                route group de la vitrine, Server Components
components/marketing/
  Hero.tsx                    la section — Client Component
  WindowCard.tsx              châssis de fenêtre réutilisable
  WallpaperPicker.tsx         sélecteur de fond
  wallpapers.ts               données des fonds + applyWallpaper()
public/brand/                 logos
cloud_os_assets/              fichiers de marque d'origine (charte, SVG, PNG)
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
| Jaune | `#edbe54` | **tuile de marque et CTA uniquement, jamais recoloré** |

Dans le hero, trois tokens CSS pilotent la couleur : `--acc` (accent vif),
`--soft` (accent clair) et `--sky` (le fond). Changer de fond les réécrit et
toute l'interface suit — boutons, progression, badge, avatar, deuxième ligne du
titre.

La tuile jaune du logo, elle, ne bouge jamais : elle fait partie du fichier
SVG, donc aucune règle CSS ne peut la repeindre.

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

Les fichiers de marque Cloud OS vivent dans `cloud_os_assets/` : la charte
graphique (`charte-cloud-os-2026.pdf`), les SVG et PNG d'origine — avec leurs
métadonnées de provenance C2PA — et le `LISEZMOI.txt` qui résume les règles
d'usage. Les copies servies par le site sont dans `public/brand/` : SVG
allégés (bloc `<metadata>` retiré, 0,7 Ko au lieu de 8) et PNG
redimensionnés. Toute nouvelle variante se tire des SVG de
`cloud_os_assets/svg/`, jamais des PNG.

Le mot-symbole « CLOUD OS » de la barre et du pied de page n'est pas dans ces
fichiers : c'est du texte en Archivo, rendu par le site lui-même (voir
`TopBar.tsx`).

## Accessibilité

- `prefers-reduced-motion` respecté : état final statique, aucune boucle armée
- chaque pastille de fond est un `<button>` avec `aria-label` et `aria-pressed`
- icônes décoratives en `aria-hidden`
- pas de scroll horizontal, vérifié de 360px à 3440px
