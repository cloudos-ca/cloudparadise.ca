import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DUREES, GARANTIE_DUREE_MIN, PALIERS, prixDuree } from "@/components/marketing/offre";
import { etatCartes } from "./forfaits";

describe("etatCartes", () => {
  it("un état par palier, dans l'ordre de PALIERS, pour chacune des cinq durées", () => {
    for (const duree of DUREES) {
      const etats = etatCartes(duree.mois);
      assert.deepEqual(etats.map((e) => e.id), PALIERS.map((p) => p.id));
    }
  });

  it("le mensuel et le total reprennent prixDuree, sans le recalculer autrement", () => {
    for (const duree of DUREES) {
      const etats = etatCartes(duree.mois);
      for (const palier of PALIERS) {
        const attendu = prixDuree(palier, duree.mois);
        const etat = etats.find((e) => e.id === palier.id);
        assert.ok(etat);
        assert.equal(etat.mensuel, attendu.mensuel);
        assert.equal(etat.total, attendu.total);
      }
    }
  });

  it("la garantie ne s'affiche qu'à partir de GARANTIE_DUREE_MIN, jamais avant", () => {
    for (const duree of DUREES) {
      const attendu = duree.mois >= GARANTIE_DUREE_MIN;
      for (const etat of etatCartes(duree.mois)) {
        assert.equal(etat.afficheGarantie, attendu, `durée ${duree.mois} mois`);
      }
    }
    // Les deux bornes précises de la spec : garantie absente à 6 mois, présente à 12.
    assert.equal(etatCartes(6).every((e) => !e.afficheGarantie), true);
    assert.equal(etatCartes(12).every((e) => e.afficheGarantie), true);
  });

  it("les deux paliers lisent la même durée : même mois, même garantie pour les deux", () => {
    for (const duree of DUREES) {
      const etats = etatCartes(duree.mois);
      const garanties = new Set(etats.map((e) => e.afficheGarantie));
      assert.equal(garanties.size, 1);
    }
  });
});
