/**
 * reCAPTCHA v2 (« Je ne suis pas un robot ») — la vérification côté serveur.
 *
 * Le formulaire de contact est une écriture publique non authentifiée : il
 * envoie un courriel réel. Il était déjà protégé par un champ piège, un jeton
 * de page horodaté et une limite de débit par empreinte d'IP
 * (`lib/jetonContact.ts`) ; le reCAPTCHA s'ajoute à ces trois-là, il ne les
 * remplace pas. Un robot qui résout le défi reste soumis à la limite de débit.
 *
 * **La clé de site est publique par construction** — elle part dans le HTML de
 * chaque page qui affiche le widget — mais elle est **propre à chaque
 * environnement** : Google lie une paire de clés à une liste de domaines, donc
 * `cloudos.ca` et le site de développement en ont chacun la leur. Elle est donc
 * lue à l'exécution, côté serveur, et descendue en propriété jusqu'au widget.
 *
 * Surtout pas de `NEXT_PUBLIC_*` ni d'`ARG` : la valeur serait cuite dans
 * l'image, et le Dockerfile s'interdit explicitement tout `ARG` supplémentaire
 * (une valeur passée ainsi reste inscrite dans l'historique de l'image).
 *
 * **La clé secrète, elle, ne doit jamais entrer dans le dépôt.** Elle est lue à
 * l'exécution dans `RECAPTCHA_SECRET_KEY`, depuis le `.env` de l'hôte. Ne pas
 * l'écrire ici, ni dans un fichier d'exemple, ni dans un commentaire.
 */

/** Clé publique du widget de CET environnement, ou `null` si aucune n'est configurée. */
export function cleSiteRecaptcha(): string | null {
  return process.env.RECAPTCHA_SITE_KEY?.trim() || null;
}

const URL_VERIFICATION = "https://www.google.com/recaptcha/api/siteverify";

/** Au-delà, on considère Google injoignable plutôt que d'attendre indéfiniment. */
const DELAI_MS = 5000;

/**
 * Vrai quand le défi est validé par Google.
 *
 * **Sans clé secrète configurée, la fonction refuse** — elle ne laisse pas
 * passer. Un garde-fou qui s'efface tout seul quand sa configuration manque ne
 * protège rien : c'est précisément le jour d'un déploiement incomplet qu'on
 * croirait protégé sans l'être. En développement (`NODE_ENV !== "production"`),
 * l'absence de clé laisse passer, pour qu'un formulaire reste testable en local
 * sans secret.
 *
 * Une panne de Google, elle, refuse aussi : le formulaire de contact n'est pas
 * un service critique, et laisser passer pendant une indisponibilité du
 * vérificateur, c'est ouvrir la porte exactement au moment où on ne peut plus
 * la surveiller. Le visiteur voit un message qui lui dit de réessayer.
 */
export async function verifierRecaptcha(
  jeton: string | undefined,
  ip?: string,
): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "RECAPTCHA_SECRET_KEY absente : le formulaire refuse tout envoi.",
      );
      return false;
    }
    return true;
  }

  if (!jeton) return false;

  const corps = new URLSearchParams({ secret, response: jeton });
  // L'IP du visiteur est facultative pour Google ; elle affine son analyse.
  if (ip && ip !== "inconnue") corps.set("remoteip", ip);

  try {
    const reponse = await fetch(URL_VERIFICATION, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: corps,
      signal: AbortSignal.timeout(DELAI_MS),
    });
    if (!reponse.ok) return false;
    const resultat = (await reponse.json()) as { success?: boolean };
    return resultat.success === true;
  } catch (error_) {
    // Le message seul : la réponse de Google peut porter l'IP du visiteur, et
    // les journaux ne sont pas l'endroit où la conserver.
    console.error(
      "Vérification reCAPTCHA impossible :",
      error_ instanceof Error ? error_.message : "cause inconnue",
    );
    return false;
  }
}
