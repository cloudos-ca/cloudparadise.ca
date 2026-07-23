/**
 * Coordonnées réelles de Cloud Paradise — source de vérité unique.
 *
 * Le formulaire de contact et le bloc de coordonnées lisent tous les deux
 * d'ici : une adresse qui change ne doit se corriger qu'à un seul endroit.
 */
export const COURRIEL = "info@cloudparadise.ca";

/** Affichage local ; `TELEPHONE_LIEN` porte la forme E.164 pour `tel:`. */
export const TELEPHONE = "873 730-3236";
export const TELEPHONE_LIEN = "+18737303236";

/**
 * Champs séparés — nécessaires pour le schema.org `PostalAddress` (JSON-LD,
 * voir RootDocument.tsx). `ADRESSE`, l'affichage sur deux lignes utilisé par
 * les pages légales et /contact, en dérive pour ne jamais diverger.
 */
export const RUE = "238 1re Avenue Ouest";
export const VILLE = "Amos";
export const PROVINCE = "QC";
export const CODE_POSTAL = "J9T 1V2";
/** Code pays ISO 3166-1 alpha-2, tel qu'attendu par `addressCountry`. */
export const PAYS = "CA";

/** Sur deux lignes : la rue, puis ville / province / code postal. */
export const ADRESSE = [RUE, `${VILLE} (Québec) ${CODE_POSTAL}`];
