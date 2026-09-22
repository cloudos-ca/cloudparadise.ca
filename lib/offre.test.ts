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
