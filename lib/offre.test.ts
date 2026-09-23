import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DUREES, ESSAI_JOURS, GARANTIE_DUREE_MIN, GARANTIE_JOURS, GRILLE, PALIERS, prixDuree } from "../components/marketing/offre";

describe("offre", () => {
  it("deux paliers, aux prix et enveloppes de la spec", () => {
    assert.deepEqual(PALIERS.map((p) => [p.id, p.prixMensuel, p.enveloppe]), [
      ["personnel", 10, 30],
      ["entreprise", 60, 200],
    ]);
  });

  it("cinq durées, remise croissante, 1 mois sans remise", () => {
    assert.deepEqual(DUREES.map((d) => d.mois), [1, 3, 6, 12, 24]);
    assert.equal(DUREES[0].remisePct, 0);
    for (let i = 1; i < DUREES.length; i++) assert.ok(DUREES[i].remisePct > DUREES[i - 1].remisePct);
  });

  it("le prix d'une durée donne le mensuel équivalent et le total", () => {
    const personnel = PALIERS[0];
    const douze = prixDuree(personnel, 12);
    assert.equal(douze.mensuel, 8);
    assert.equal(douze.total, 96);
    assert.equal(prixDuree(personnel, 24).mensuel, 7);
  });

  it("essai et garantie sont des valeurs, pas des phrases", () => {
    assert.equal(ESSAI_JOURS, 14);
    assert.equal(GARANTIE_JOURS, 30);
    assert.equal(GARANTIE_DUREE_MIN, 12);
  });

  it("les inclusions machine disent ce que disent les phrases d'inclusion", () => {
    const [personnel, entreprise] = PALIERS;
    assert.deepEqual(personnel.inclus, { desktop: false, hosting: false, teams: false, maxTeamSize: 25 });
    assert.deepEqual(entreprise.inclus, { desktop: true, hosting: true, teams: true, maxTeamSize: 25 });
    // La taille d'équipe affichée vient du même champ que celui qu'on compare à la production :
    // elle ne peut pas diverger de la phrase sans faire échouer la comparaison distante.
    for (const lang of ["fr", "en"] as const) {
      const phraseEquipe = entreprise.inclusions[lang].find((i) => i.includes(String(entreprise.inclus.maxTeamSize)));
      assert.ok(phraseEquipe, `la phrase d'équipe d'Entreprise ne cite pas maxTeamSize (${lang})`);
    }
  });

  it("la grille des types de tâches ne porte plus aucun prix", () => {
    for (const ligne of GRILLE) assert.equal("cout" in ligne, false);
  });
});

/** Une durée d'engagement telle que rendue par `/api/v1/pricing`. */
type TermeDistant = { months: number; discountPct: number; monthly: number; total: number };
/** Les inclusions d'un forfait telles que rendues par `/api/v1/pricing`. */
type InclusDistant = { desktop: boolean; hosting: boolean; teams: boolean; maxTeamSize: number };
/** Un forfait tel que rendu par `/api/v1/pricing`. */
type PalierDistant = {
  key: string;
  price: number;
  envelope: number;
  currency: string;
  approxTasks: number;
  includes: InclusDistant;
  terms: TermeDistant[];
};
/** La forme complète de la réponse, une fois sa présence validée. */
type Catalogue = {
  billingModel: "CREDITS" | "PLANS";
  currency: string;
  trialDays: number;
  guaranteeDays: number;
  guaranteeMinMonths: number;
  plans: PalierDistant[];
};

/** Tri numérique croissant, pour comparer deux listes de durées sans dépendre de leur ordre. */
const parOrdreCroissant = (a: number, b: number) => a - b;

/** L'application est la source de vérité des prix : un administrateur les change sans déploiement.
 * Ce test compare ce que promet la vitrine à ce que la production facture vraiment, DANS LES DEUX
 * SENS : un forfait ou une durée qui existe ici mais pas là-bas, ou l'inverse, est un écart. Il ne
 * fait rien tant que la production n'est pas passée aux forfaits (avant le jour J elle répond
 * encore `billingModel: "CREDITS"`), et il ne masque JAMAIS un écart : seule une erreur de
 * transport (réseau absent, délai dépassé) donne un test ignoré — un statut HTTP différent de 200,
 * un corps qui n'est pas la forme attendue, ou une composition qui diverge font ÉCHOUER le test. */
describe("offre vs production", () => {
  it("les prix, enveloppes, durées, essai et garantie sont ceux de /api/v1/pricing", async (t) => {
    let reponse: Response;
    try {
      reponse = await fetch("https://app.cloudparadise.cloud/api/v1/pricing", { signal: AbortSignal.timeout(15_000) });
    } catch (err) {
      // Seule une erreur de transport (réseau absent, délai dépassé) est ignorée : elle ne dit
      // rien de l'état de la production, seulement de la joignabilité depuis ici.
      t.skip(`production injoignable (${String(err)}) — comparaison remise à la prochaine exécution`);
      return;
    }

    // Un statut différent de 200 (route renommée, API cassée) est une divergence, pas une panne
    // réseau : il fait échouer le test, hors du try/catch ci-dessus.
    assert.equal(reponse.status, 200, `statut HTTP inattendu pour /api/v1/pricing : ${reponse.status}`);

    const brut: unknown = await reponse.json();
    assert.ok(brut !== null && typeof brut === "object", "réponse de /api/v1/pricing sans corps JSON exploitable");
    const obj = brut as Record<string, unknown>;
    assert.ok("billingModel" in obj, "champ billingModel absent de /api/v1/pricing");
    assert.ok("plans" in obj && Array.isArray(obj.plans), "champ plans absent ou non-tableau dans /api/v1/pricing");
    assert.ok(
      obj.billingModel === "CREDITS" || obj.billingModel === "PLANS",
      `billingModel inattendu : ${JSON.stringify(obj.billingModel)} (ni "CREDITS" ni "PLANS")`,
    );

    if (obj.billingModel === "CREDITS") {
      t.skip("la production est encore sur le modèle crédits — comparaison sans objet avant la bascule");
      return;
    }

    const catalogue = obj as unknown as Catalogue;

    assert.equal(catalogue.currency, "CAD");
    assert.equal(catalogue.trialDays, ESSAI_JOURS);
    assert.equal(catalogue.guaranteeDays, GARANTIE_JOURS);
    assert.equal(catalogue.guaranteeMinMonths, GARANTIE_DUREE_MIN);

    // Composition des forfaits, dans les deux sens : un forfait en trop ou en moins côté
    // production doit se voir, pas seulement un forfait manquant.
    const clesDistantes = catalogue.plans.map((p) => p.key).sort();
    const clesLocales = PALIERS.map((p) => p.id).sort();
    assert.deepEqual(
      clesDistantes,
      clesLocales,
      `forfaits de la production (${clesDistantes.join(", ")}) ≠ forfaits de la vitrine (${clesLocales.join(", ")})`,
    );

    for (const palier of PALIERS) {
      const distant = catalogue.plans.find((p) => p.key === palier.id);
      assert.ok(distant, `le forfait ${palier.id} a disparu du catalogue de la production`);
      assert.equal(distant.price, palier.prixMensuel, `prix de ${palier.id}`);
      assert.equal(distant.envelope, palier.enveloppe, `enveloppe de ${palier.id}`);
      assert.equal(distant.currency, "CAD");

      // Inclusions, comparées CHAMP PAR CHAMP : ce sont elles que les cartes promettent en toutes
      // lettres (« Bac à sable », « 1 site Hébergement Web », « jusqu'à 25 membres ») et qu'un
      // administrateur peut retirer d'un clic, sans déploiement et sans que rien ne rougisse.
      assert.deepEqual(
        distant.includes,
        palier.inclus,
        `inclusions de ${palier.id} en production (${JSON.stringify(distant.includes)}) ≠ inclusions de la vitrine (${JSON.stringify(palier.inclus)})`,
      );

      // « ≈ N tâches par mois » : la vitrine publie un nombre figé, l'application le RECALCULE sur
      // l'usage réel des 90 derniers jours (`approxTasks`, src/lib/billing/plans.ts) — il bouge donc
      // tout seul. On ne peut pas exiger l'égalité ; on exige que l'écart ne dépasse pas le pas
      // d'arrondi de l'application (10 sous 200, 50 au-delà), c'est-à-dire que les deux nombres
      // soient au pire deux crans voisins. Au-delà, la promesse affichée n'est plus celle de
      // l'application et il faut remettre `tachesParMois` à jour.
      const pas = distant.approxTasks < 200 ? 10 : 50;
      const ecart = Math.abs(distant.approxTasks - palier.tachesParMois);
      assert.ok(
        ecart <= pas,
        `« ≈ tâches » de ${palier.id} : la production calcule ${distant.approxTasks}, la vitrine promet ${palier.tachesParMois} (écart ${ecart} > pas d'arrondi ${pas})`,
      );

      // Composition des durées, dans les deux sens : une durée en trop ou en moins pour ce
      // forfait doit se voir.
      const moisDistants = distant.terms.map((t2) => t2.months).sort(parOrdreCroissant);
      const moisLocaux = DUREES.map((d) => d.mois).sort(parOrdreCroissant);
      assert.deepEqual(
        moisDistants,
        moisLocaux,
        `durées de ${palier.id} en production (${moisDistants.join(", ")}) ≠ durées de la vitrine (${moisLocaux.join(", ")})`,
      );

      for (const duree of DUREES) {
        const terme: TermeDistant | undefined = distant.terms.find((t2) => t2.months === duree.mois);
        assert.ok(terme, `durée ${duree.mois} mois absente pour ${palier.id}`);
        assert.equal(terme.discountPct, duree.remisePct, `remise ${duree.mois} mois de ${palier.id}`);
        const attendu = prixDuree(palier, duree.mois);
        assert.equal(terme.monthly, attendu.mensuel, `mensuel ${duree.mois} mois de ${palier.id}`);
        assert.equal(terme.total, attendu.total, `total ${duree.mois} mois de ${palier.id}`);
      }
    }
  });
});
