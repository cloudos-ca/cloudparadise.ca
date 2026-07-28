import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Protections du formulaire de contact — sans tiers.
 *
 * Remplace reCAPTCHA v3, qui transmettait des signaux de navigation à Google
 * depuis la page même où /securite promet qu'aucune donnée ne part chez un
 * fournisseur tiers, et que la politique de confidentialité ne mentionnait
 * nulle part. Trois mécanismes se partagent le travail :
 *
 *  1. un champ piège, rempli par les robots et ignoré des humains (`route.ts`) ;
 *  2. le jeton horodaté signé ci-dessous, qui n'existe que si la page a été
 *     rendue — un script qui poste directement sur /api/contact n'en a pas ;
 *  3. une limite de débit par empreinte d'IP (`route.ts`).
 *
 * Aucun de ces trois ne parle à personne, aucun ne demande quoi que ce soit au
 * visiteur, et aucun ne conserve d'IP en clair.
 */

/**
 * Clé de signature, partagée par l'émission (page) et la vérification (route).
 *
 * Passée par `globalThis` et non par un simple `const` de module : Next place
 * la page et le route handler dans deux bundles serveur distincts, donc le
 * module est instancié deux fois. Sans ce partage, chaque côté tirerait son
 * propre secret aléatoire et aucun jeton ne se vérifierait jamais.
 *
 * `CONTACT_SECRET` est facultatif : sans lui, un secret aléatoire est tiré au
 * démarrage du processus. Conséquence assumée — les jetons émis avant un
 * redéploiement deviennent invalides, et le visiteur qui avait la page ouverte
 * est invité à la recharger. Poser la variable dans Coolify supprime ce cas.
 */
const CLE_PARTAGEE = Symbol.for("cloudparadise.contact.secret");
const portee = globalThis as unknown as Record<symbol, string | undefined>;
portee[CLE_PARTAGEE] ??=
  process.env.CONTACT_SECRET || randomBytes(32).toString("hex");
const SECRET = portee[CLE_PARTAGEE] as string;

/**
 * Délai minimum entre l'affichage de la page et l'envoi.
 *
 * Trois secondes : un robot poste dans la milliseconde, un humain n'a pas fini
 * de lire l'étiquette du premier champ. Rien de ce qu'un visiteur réel fait ne
 * tient sous ce seuil, donc aucun faux positif à craindre.
 */
const DELAI_MINIMUM_MS = 3_000;

/**
 * Durée de validité du jeton. Deux heures : assez large pour l'onglet laissé
 * ouvert le temps d'un appel, assez courte pour qu'un jeton moissonné ne serve
 * pas indéfiniment.
 */
const VALIDITE_MS = 2 * 60 * 60 * 1000;

function signature(charge: string): string {
  return createHmac("sha256", SECRET).update(charge).digest("hex");
}

/** Jeton `<horodatage base 36>.<signature>`, à poser dans la page rendue. */
export function emettreJeton(): string {
  const horodatage = Date.now().toString(36);
  return `${horodatage}.${signature(horodatage)}`;
}

/**
 * Vérifie la signature, puis l'âge.
 *
 * L'horodatage est signé, donc infalsifiable sans le secret : c'est ce qui
 * distingue ce contrôle d'un délai mesuré côté client, qu'un script réécrit
 * librement.
 */
export function jetonValide(jeton: string | undefined): boolean {
  if (!jeton) return false;

  const [horodatage, recue] = jeton.split(".");
  if (!horodatage || !recue) return false;

  const attendue = signature(horodatage);
  // `timingSafeEqual` exige deux tampons de même longueur : la comparaison de
  // taille doit donc passer d'abord, et elle ne révèle rien (la longueur d'une
  // signature SHA-256 est constante et publique).
  if (recue.length !== attendue.length) return false;
  if (!timingSafeEqual(Buffer.from(recue), Buffer.from(attendue))) return false;

  const age = Date.now() - Number.parseInt(horodatage, 36);
  return age >= DELAI_MINIMUM_MS && age <= VALIDITE_MS;
}

/**
 * Empreinte d'une adresse IP, pour la limite de débit.
 *
 * Une adresse IP est un renseignement personnel au sens de la Loi 25 : la
 * conserver en clair pour compter des requêtes reviendrait à remplacer une
 * collecte par une autre. L'empreinte HMAC suffit à reconnaître « la même
 * source » sans jamais stocker l'adresse, et le secret n'étant pas persisté,
 * elle n'est même pas corrélable d'un redémarrage à l'autre.
 *
 * Tronquée à 16 caractères hexadécimaux : 64 bits, très au-delà de ce qu'il
 * faut pour éviter les collisions sur quelques milliers d'entrées éphémères.
 */
export function empreinteIp(ip: string): string {
  return createHmac("sha256", SECRET).update(ip).digest("hex").slice(0, 16);
}
