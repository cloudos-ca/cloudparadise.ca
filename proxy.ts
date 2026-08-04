import { createHash, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

/**
 * Mot de passe d'accès — l'environnement de développement, et lui seul.
 *
 * `cloudparadise.dev` sert le site avant qu'il soit décidé : textes non
 * relus, prix en cours d'arbitrage, pages qui ne sont pas encore d'accord entre
 * elles. Le `noindex`/`Disallow: /` posé par `SITE_ENV` (voir `lib/site.ts`)
 * demande poliment aux moteurs de ne pas regarder ; il n'empêche personne
 * d'ouvrir l'adresse. C'est ce trou-là qu'on ferme ici, et rien d'autre :
 * ce n'est pas une couche d'authentification applicative, il n'y a pas de
 * comptes, et rien de sensible n'est censé vivre sur cette vitrine.
 *
 * En Next 16, `middleware.ts` s'appelle `proxy.ts` — même fonction, nom
 * différent (voir `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`).
 * Le fichier tourne sur le runtime Node par défaut, d'où `node:crypto`
 * directement.
 *
 * ## Ce qui arme la protection
 *
 * **La seule présence de `DEV_MOT_DE_PASSE`.** Variable absente = aucune
 * vérification, pas un octet de changé pour le visiteur. La production ne pose
 * pas la variable, donc la production n'est pas protégée — comme elle ne pose
 * pas `SITE_ENV`, et pour la même raison de sens de panne : ce qui est
 * exceptionnel se déclare, ce qui est normal se tait.
 *
 * Le corollaire est à connaître : poser cette variable en production y
 * mettrait un mot de passe, et les moteurs verraient des 401. C'est visible
 * en une requête et réversible en une variable — l'inverse (un dev ouvert
 * qu'on croit fermé) ne se voit pas du tout.
 *
 * ## Côté Coolify
 *
 * Variable d'**exécution uniquement**, décochée de « Build Variable » : elle
 * est lue à la requête, pas à la génération des pages. Cochée, elle serait
 * inscrite dans l'historique de l'image et imprimée en clair dans le journal
 * de déploiement — c'est exactement ce qui est arrivé au mot de passe SMTP le
 * 2026-07-28 (voir le Dockerfile). Un mot de passe n'a rien à faire au build.
 *
 * ## Un mot de passe sans accent
 *
 * Le code gère l'UTF-8 de bout en bout et un navigateur envoie bien de
 * l'UTF-8 — mais les clients en ligne de commande, eux, n'en font qu'à leur
 * tête : `curl -u` encode dans la page de codes locale du poste (vérifié sous
 * Windows : « É » part en `0xC9` au lieu de `0xC3 0x89`, et le mot de passe
 * correct se fait refuser). Le jour où il faudra tester le dev au `curl` ou
 * depuis un script de surveillance, un mot de passe ASCII épargne une demi-
 * heure de fausse piste. Ce n'est pas une contrainte du code, c'est un
 * conseil.
 */
const MOT_DE_PASSE = process.env.DEV_MOT_DE_PASSE;

/**
 * Le nom d'utilisateur du dialogue du navigateur. Il n'est pas un secret — le
 * mot de passe l'est. Réglable par variable pour ne pas avoir à redéployer une
 * image si le client préfère un autre libellé.
 */
const UTILISATEUR = process.env.DEV_UTILISATEUR || "cloudparadise";

/**
 * Comparaison à temps constant, sur des empreintes plutôt que sur les chaînes.
 *
 * `timingSafeEqual` exige deux tampons de **même longueur** et lève sinon —
 * lui donner les identifiants bruts échouerait donc dès que la saisie n'a pas
 * la bonne taille, et cette exception serait elle-même l'oracle qu'on cherche
 * à éviter. Deux SHA-256 font toujours 32 octets, quelle que soit l'entrée.
 */
function identiques(saisi: string, attendu: string): boolean {
  const empreinte = (v: string) => createHash("sha256").update(v).digest();
  return timingSafeEqual(empreinte(saisi), empreinte(attendu));
}

/** Vrai si l'en-tête `Authorization` porte le bon couple. */
function accesAccorde(entete: string | null): boolean {
  if (!entete?.startsWith("Basic ")) return false;

  // `Buffer` et non `atob` : `atob` rend des octets latin-1, donc un mot de
  // passe contenant un accent ou une espace insécable ne se recompose pas et
  // ne correspond jamais. Le navigateur, lui, envoie de l'UTF-8 (on le lui
  // demande explicitement dans `WWW-Authenticate`).
  const decode = Buffer.from(entete.slice("Basic ".length), "base64").toString(
    "utf8",
  );

  return identiques(decode, `${UTILISATEUR}:${MOT_DE_PASSE}`);
}

/**
 * La sonde de santé de Coolify passe sans mot de passe.
 *
 * Elle interroge le conteneur en direct, sur `localhost:PORT`, sans rien
 * savoir de nos identifiants : un 401 lui suffirait à déclarer le déploiement
 * en échec alors que l'application tourne — le journal ne parlerait que d'un
 * health check expiré, jamais d'authentification (même piège que le port
 * « Ports Exposes », documenté dans le Dockerfile).
 *
 * L'exemption porte sur l'en-tête `Host`, et c'est solide **parce que Traefik
 * route par `Host`** : une requête venue d'Internet en prétendant
 * `Host: localhost` ne correspond à aucune règle de routage et n'atteint
 * jamais ce conteneur. Reste ouvert quiconque est déjà sur le réseau Docker
 * interne — qui a alors bien d'autres portes.
 */
function estSondeInterne(request: NextRequest): boolean {
  const host = request.headers.get("host") ?? "";
  const nom = host.split(":")[0];
  return nom === "localhost" || nom === "127.0.0.1" || nom === "[::1]";
}

export function proxy(request: NextRequest) {
  if (!MOT_DE_PASSE) return;
  if (estSondeInterne(request)) return;
  if (accesAccorde(request.headers.get("authorization"))) return;

  return new Response("Accès réservé.\n", {
    status: 401,
    headers: {
      // Le libellé reste en ASCII pur : un en-tête HTTP est une suite d'octets
      // (`ByteString`), et un seul caractère au-dessus de 255 y fait lever
      // `new Response` — un tiret cadratin ou un « é » dans le nom du royaume
      // ne rend pas un 401 fautif, il rend un **500** sur toutes les pages,
      // mot de passe correct compris. Vérifié : c'est ce que faisait la
      // première version.
      //
      // `charset="UTF-8"` s'adresse au navigateur, pas au libellé : il lui dit
      // dans quel encodage transmettre ce que le visiteur tape, faute de quoi
      // un mot de passe accentué part différemment selon le navigateur.
      "WWW-Authenticate": `Basic realm="Cloud Paradise - espace de developpement", charset="UTF-8"`,
      "Content-Type": "text/plain; charset=utf-8",
      // Un 401 mis en cache par un proxy intermédiaire survivrait au retrait du
      // mot de passe.
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

/**
 * Aucun `matcher`, volontairement : sans lui, le proxy voit **toutes** les
 * requêtes, y compris `/_next/static`, les images optimisées et `public/`.
 *
 * C'est l'inverse du réglage habituel — on exclut d'ordinaire les statiques
 * pour ne pas payer le proxy sur chaque fichier. Ici, laisser passer les
 * statiques laisserait lire les bundles JavaScript de l'espace de dev, donc
 * les textes des pages, sans mot de passe. Une protection qui ne couvre pas
 * les fichiers qu'elle sert n'en est pas une.
 */
