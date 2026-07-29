# syntax=docker/dockerfile:1

FROM node:22-alpine AS base

# ---- deps -------------------------------------------------------------
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder ------------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Rien d'autre que SITE_ENV ne doit être déclaré ici.
#
# Une variable reprise en `ARG` est inscrite dans l'historique de l'image et
# imprimée en clair dans le journal de déploiement de Coolify — `docker history`
# la ressort ensuite à qui a l'image. Les identifiants SMTP n'ont donc rien à
# faire au build : l'application ne les lit qu'à l'exécution, dans le route
# handler de /api/contact. Côté Coolify, ils doivent rester décochés de
# « Build Variable ». (Le mot de passe s'est retrouvé en clair dans un journal
# le 2026-07-28 pour cette raison.)
#
# Même chose pour CONTACT_SECRET, lu à l'exécution par lib/jetonContact.ts.

# Indexation. Non défini = production : le déploiement de production n'a rien
# à poser et garde `index, follow`. Tout autre environnement (dev, aperçu) doit
# poser SITE_ENV à autre chose que « production » — n'importe quelle valeur,
# « dev » par convention — pour basculer les pages en `noindex, nofollow` et le
# robots.txt en `Disallow: /` (voir lib/site.ts, qui lit la variable ; les
# directives elles-mêmes vivent dans lib/seo.ts et app/robots.ts).
#
# Lu à la génération des pages statiques, donc build-time : côté Coolify la
# variable doit être cochée « Build Variable ». Posée seulement à l'exécution,
# elle n'aurait aucun effet sur le HTML servi.
ARG SITE_ENV
ENV SITE_ENV=${SITE_ENV}

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- runner ---------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copié sans --chown, donc propriété de root : l'application tourne en `nextjs`
# et ne peut pas réécrire son propre code. Avec --chown, `server.js`,
# `node_modules` et les assets appartenaient à l'utilisateur applicatif — une
# écriture de fichier arbitraire obtenue dans l'app devenait une persistance
# sur l'image, ce qui n'est plus possible ici.
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Seule exception, et seul répertoire que l'application doit pouvoir écrire :
# le cache de l'optimiseur d'images. `next/image` sert les JPEG de /plateforme
# sans `unoptimized`, donc l'optimiseur travaille à l'exécution et écrit dans
# `.next/cache/images`. Créé ici explicitement : sans lui, `.next` appartient à
# root et l'app ne peut plus créer son cache — les images passent en 500.
RUN mkdir -p .next/cache/images && chown -R nextjs:nodejs .next/cache

USER nextjs

# 3025 est le défaut, donc le port de la production, qui ne définit aucune
# variable `PORT`. L'environnement de développement écoute sur 3030 : le
# `server.js` de Next standalone lit `process.env.PORT` au démarrage, donc un
# simple `PORT=3030` en variable d'exécution suffit — rien à changer ici.
#
# Le piège, côté Coolify : le champ « Ports Exposes » doit valoir exactement le
# port sur lequel le conteneur écoute (3025 en prod, 3030 en dev). S'ils
# divergent, la sonde n'atteint jamais l'application et le déploiement est
# déclaré en échec alors qu'elle tourne — le log ne parle que d'un health check
# expiré, jamais du port.
#
# `EXPOSE` n'est que de la documentation : il n'ouvre ni ne restreint rien, et
# n'a pas besoin de suivre `PORT`.
EXPOSE 3025
ENV PORT=3025
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
