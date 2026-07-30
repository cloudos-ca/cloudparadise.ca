<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# On travaille sur `dev`, et sur `dev` seulement

Ce dépôt n'a que deux branches : `main` (production) et `dev` (travail).

- **Commite directement sur `dev`.** Pas de branche thématique — ni `chore/lot-*`, ni `claude/*`, ni « juste pour ce lot-ci ». Elles finissent en travail orphelin que personne ne fusionne.
- **Si tu te retrouves ailleurs en début de session, bascule sur `dev` avant de committer.** Vérifie au passage que ton travail en cours ne dépend pas des commits de la branche que tu quittes.
- **Jamais de push sur `main`.** Le passage `dev` → production est une décision du client, pas un effet de bord.
- Plusieurs sessions peuvent travailler dans ce dossier en même temps. Avant une opération qui réécrit le répertoire de travail (fusion, `checkout`, `reset`), relis `git status` : l'état que tu as lu il y a cinq minutes peut ne plus être vrai.
