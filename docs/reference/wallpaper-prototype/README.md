# Prototype de recoloration — fond d'écran

Référence pour la fiche « Fond d'écran » du Cloud OS (dépôt app) — retiré de la vitrine au lot 0.

Les deux fichiers portent l'extension `.txt` : `tsconfig.json` inclut `**/*.ts` et `**/*.tsx`
depuis la racine et n'exclut que `node_modules`, donc des copies en `.ts`/`.tsx` seraient
compilées avec le reste du site.

Le prototype importe `node-vibrant/browser` (`wallpapers.ts.txt`), dépendance retirée de la
vitrine au commit 13 du lot 0 — à réinstaller dans le dépôt app pour le réutiliser.
