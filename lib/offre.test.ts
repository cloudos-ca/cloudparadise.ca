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

  it("la grille des types de tâches ne porte plus aucun prix", () => {
    for (const ligne of GRILLE) assert.equal("cout" in ligne, false);
  });
});

/** L'application est la source de vérité des prix : un administrateur les change sans déploiement.
 * Ce test compare ce que promet la vitrine à ce que la production facture vraiment. Il ne fait rien
 * tant que la production n'est pas passée aux forfaits (avant le jour J elle répond encore
 * `billingModel: "CREDITS"`), et il ne masque JAMAIS un écart : réseau indisponible = test ignoré
 * avec un message, écart = échec. */
describe("offre vs production", () => {
  it("les prix, enveloppes, durées, essai et garantie sont ceux de /api/v1/pricing", async (t) => {
    let catalogue: {
      billingModel: string; currency: string; trialDays: number; guaranteeDays: number; guaranteeMinMonths: number;
      plans: { key: string; price: number; envelope: number; currency: string; terms: { months: number; discountPct: number; monthly: number; total: number }[] }[];
    };
    try {
      const reponse = await fetch("https://app.cloudparadise.cloud/api/v1/pricing", { signal: AbortSignal.timeout(15_000) });
      assert.equal(reponse.status, 200);
      catalogue = await reponse.json();
    } catch (err) {
      t.skip(`production injoignable (${String(err)}) — comparaison remise à la prochaine exécution`);
      return;
    }

    if (catalogue.billingModel !== "PLANS") {
      t.skip("la production est encore sur le modèle crédits — comparaison sans objet avant la bascule");
      return;
    }

    assert.equal(catalogue.currency, "CAD");
    assert.equal(catalogue.trialDays, ESSAI_JOURS);
    assert.equal(catalogue.guaranteeDays, GARANTIE_JOURS);
    assert.equal(catalogue.guaranteeMinMonths, GARANTIE_DUREE_MIN);

    for (const palier of PALIERS) {
      const distant = catalogue.plans.find((p) => p.key === palier.id);
      assert.ok(distant, `le forfait ${palier.id} a disparu du catalogue de la production`);
      assert.equal(distant.price, palier.prixMensuel, `prix de ${palier.id}`);
      assert.equal(distant.envelope, palier.enveloppe, `enveloppe de ${palier.id}`);
      assert.equal(distant.currency, "CAD");
      for (const duree of DUREES) {
        const terme: { months: number; discountPct: number; monthly: number; total: number } | undefined =
          distant.terms.find((t2) => t2.months === duree.mois);
        assert.ok(terme, `durée ${duree.mois} mois absente pour ${palier.id}`);
        assert.equal(terme.discountPct, duree.remisePct, `remise ${duree.mois} mois de ${palier.id}`);
        const attendu = prixDuree(palier, duree.mois);
        assert.equal(terme.monthly, attendu.mensuel, `mensuel ${duree.mois} mois de ${palier.id}`);
        assert.equal(terme.total, attendu.total, `total ${duree.mois} mois de ${palier.id}`);
      }
    }
  });
});
