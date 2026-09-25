import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { A_ECRIRE, FICHES, SANS_FICHE } from "../content/applications";
import { GROUPES } from "../content/applications/types";
import { TRADUCTIONS } from "../content/blogue/en";
import { ficheParSlug, fichesDeLArticle, fichesParGroupe } from "./applications";

describe("catalogue des applications", () => {
  it("des clés et des slugs uniques, dans chaque langue", () => {
    for (const cle of ["id", "fr", "en"] as const) {
      const valeurs = FICHES.map((f) => (cle === "id" ? f.id : f.slug[cle]));
      assert.equal(new Set(valeurs).size, valeurs.length, `doublon de ${cle}`);
    }
  });

  it("des slugs d'URL propres : minuscules, chiffres et tirets", () => {
    for (const f of FICHES) {
      for (const lang of ["fr", "en"] as const) {
        assert.match(f.slug[lang], /^[a-z0-9]+(-[a-z0-9]+)*$/, `${f.id} (${lang})`);
      }
    }
  });

  it("chaque fiche est complète dans les deux langues", () => {
    for (const f of FICHES) {
      for (const lang of ["fr", "en"] as const) {
        assert.ok(f.nom[lang] && f.titre[lang] && f.accroche[lang], `${f.id} : nom, titre ou accroche vide (${lang})`);
        assert.ok(f.corps[lang].length > 0, `${f.id} : corps vide (${lang})`);
        assert.ok(f.motsCles[lang].length > 0, `${f.id} : aucun mot-clé (${lang})`);
        for (const c of f.captures) assert.ok(c.alt[lang], `${f.id} : capture sans texte alternatif (${lang})`);
      }
      assert.equal(f.corps.fr.length, f.corps.en.length, `${f.id} : pas le même nombre de sections en FR et en EN`);
      assert.equal(f.faq.fr.length, f.faq.en.length, `${f.id} : pas le même nombre de questions en FR et en EN`);
    }
  });

  it("des titres de 45 à 60 caractères, comme le reste du site", () => {
    for (const f of FICHES) {
      for (const lang of ["fr", "en"] as const) {
        const n = f.seo.titre[lang].length;
        assert.ok(n >= 45 && n <= 60, `${f.id} (${lang}) : titre de ${n} caractères — « ${f.seo.titre[lang]} »`);
      }
    }
  });

  it("chaque fiche est rangée dans un groupe connu, et chaque groupe peuplé s'affiche", () => {
    for (const f of FICHES) assert.ok(GROUPES.includes(f.groupe), `${f.id} : groupe ${f.groupe}`);
    const affiches = fichesParGroupe("fr").flatMap((g) => g.fiches.map((f) => f.id));
    assert.deepEqual([...affiches].sort(), FICHES.map((f) => f.id).sort());
  });

  it("les voisines existent, et une fiche ne se cite pas elle-même", () => {
    const ids = new Set(FICHES.map((f) => f.id));
    for (const f of FICHES) {
      for (const v of f.voisines) {
        assert.ok(ids.has(v), `${f.id} : voisine inconnue « ${v} »`);
        assert.notEqual(v, f.id, `${f.id} se cite elle-même`);
      }
    }
  });

  it("un article cité en anglais a sa traduction", () => {
    // En français, le slug n'est pas vérifiable au build (l'article vit chez BabyLoveGrowth).
    // En anglais, un article sans traduction est simplement omis : ce test ne fait que le dire.
    const traduits = new Set(TRADUCTIONS.map((t) => t.source.slug));
    for (const f of FICHES) {
      for (const a of f.articles) {
        assert.ok(a.titre, `${f.id} : article « ${a.slug} » sans titre`);
        if (!traduits.has(a.slug)) console.info(`${f.id} : « ${a.slug} » n'a pas de traduction, omis en anglais`);
      }
    }
  });

  it("ficheParSlug ne confond pas les langues", () => {
    const f = FICHES[0];
    assert.equal(ficheParSlug(f.slug.fr, "fr")?.id, f.id);
    assert.equal(ficheParSlug(f.slug.en, "en")?.id, f.id);
    assert.equal(ficheParSlug("n-existe-pas", "fr"), null);
  });

  it("un article du blogue retrouve les fiches qui le citent, dans les deux langues", () => {
    const traduit = (slug: string) => TRADUCTIONS.find((t) => t.source.slug === slug);
    const fiche = FICHES.find((f) => f.articles.some((a) => traduit(a.slug)));
    assert.ok(fiche, "aucune fiche ne cite un article traduit : le test n'a plus rien à vérifier");
    const slugFr = fiche.articles.find((a) => traduit(a.slug))!.slug;
    const slugEn = traduit(slugFr)!.slug;
    assert.ok(fichesDeLArticle(slugFr, "fr").some((f) => f.id === fiche.id));
    assert.ok(fichesDeLArticle(slugEn, "en").some((f) => f.id === fiche.id));
    assert.deepEqual(fichesDeLArticle("n-existe-pas", "fr"), []);
    // Un slug français n'est pas un slug anglais : pas de fiche par confusion des langues.
    if (slugFr !== slugEn) assert.deepEqual(fichesDeLArticle(slugFr, "en"), []);
  });

  it("une application du produit est dans une seule des trois listes", () => {
    const toutes = [...FICHES.flatMap((f) => f.apps), ...A_ECRIRE, ...SANS_FICHE];
    const vues = new Set<string>();
    for (const id of toutes) {
      assert.ok(!vues.has(id), `« ${id} » figure deux fois (FICHES, A_ECRIRE, SANS_FICHE)`);
      vues.add(id);
    }
  });
});

/** Une application telle que rendue par `/api/v1/apps/catalog`. */
type AppDistante = { id: string; kind: "native" | "desktop"; group: string; plan: "personnel" | "entreprise" };

/**
 * Le produit dit ce qui existe ; ce test compare le catalogue à sa réponse,
 * DANS LES DEUX SENS, sur le modèle de « offre vs production » (offre.test.ts) :
 * une application du produit qui n'est dans aucune liste, une liste qui cite
 * une application disparue, ou un forfait qui diffère, font échouer le test.
 * Seule une erreur de transport le fait sauter.
 *
 * `CATALOGUE_APPS_URL` pointe ailleurs que la production — le dev, par
 * exemple, avant que la route n'y soit déployée.
 */
const URL_CATALOGUE =
  process.env.CATALOGUE_APPS_URL ?? "https://app.cloudparadise.cloud/api/v1/apps/catalog";

describe("catalogue vs produit", () => {
  it("les applications et leurs forfaits sont ceux de /api/v1/apps/catalog", async (t) => {
    let reponse: Response;
    try {
      reponse = await fetch(URL_CATALOGUE, { signal: AbortSignal.timeout(15_000) });
    } catch (err) {
      t.skip(`produit injoignable (${String(err)}) — comparaison remise à la prochaine exécution`);
      return;
    }
    assert.equal(reponse.status, 200, `statut HTTP inattendu pour ${URL_CATALOGUE} : ${reponse.status}`);

    const brut: unknown = await reponse.json();
    assert.ok(
      brut !== null && typeof brut === "object" && Array.isArray((brut as { apps?: unknown }).apps),
      "réponse sans tableau `apps`",
    );
    const distantes = (brut as { apps: AppDistante[] }).apps;
    const parId = new Map(distantes.map((a) => [a.id, a]));

    const locales = [...FICHES.flatMap((f) => f.apps), ...A_ECRIRE, ...SANS_FICHE];
    const manquantes = distantes.map((a) => a.id).filter((id) => !locales.includes(id));
    const disparues = locales.filter((id) => !parId.has(id));
    assert.deepEqual(manquantes, [], "applications du produit absentes de FICHES, A_ECRIRE et SANS_FICHE");
    assert.deepEqual(disparues, [], "applications citées ici mais absentes du produit");

    for (const f of FICHES) {
      for (const id of f.apps) {
        assert.equal(parId.get(id)?.plan, f.forfait, `${f.id} : forfait « ${f.forfait} », le produit dit « ${parId.get(id)?.plan} » pour ${id}`);
      }
    }
  });
});
