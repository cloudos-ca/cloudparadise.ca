import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { BlogArticleSummary } from "babylovegrowth-next-js-blog";
import {
  articlesVisibles,
  estDansLangue,
  lirePage,
  paginer,
} from "./blogue";

function article(
  partiel: Partial<BlogArticleSummary> & { slug: string },
): BlogArticleSummary {
  return {
    id: 1,
    title: partiel.slug,
    hero_image_url: "",
    languageCode: "fr",
    meta_description: "",
    excerpt: "",
    orgWebsite: "",
    created_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-09-01T00:00:00Z",
    published: true,
    seedKeyword: null,
    keywords: [],
    ...partiel,
  };
}

describe("estDansLangue", () => {
  it("accepte le code exact et ses variantes régionales, sans égard à la casse", () => {
    assert.equal(estDansLangue("fr", "fr"), true);
    assert.equal(estDansLangue("fr-CA", "fr"), true);
    assert.equal(estDansLangue("FR", "fr"), true);
    assert.equal(estDansLangue("en-US", "en"), true);
  });

  it("refuse une autre langue et un code vide", () => {
    assert.equal(estDansLangue("en", "fr"), false);
    assert.equal(estDansLangue("", "fr"), false);
    // « fra » n'est pas « fr-… » : pas de préfixe accidentel.
    assert.equal(estDansLangue("frx", "fr"), false);
  });
});

describe("articlesVisibles", () => {
  it("ne garde que les articles publiés dans la langue demandée, dans l'ordre reçu", () => {
    const liste = [
      article({ slug: "a", languageCode: "fr" }),
      article({ slug: "b", languageCode: "en" }),
      article({ slug: "c", languageCode: "fr-CA", published: false }),
      article({ slug: "d", languageCode: "fr-CA" }),
    ];
    assert.deepEqual(
      articlesVisibles(liste, "fr").map((a) => a.slug),
      ["a", "d"],
    );
    assert.deepEqual(
      articlesVisibles(liste, "en").map((a) => a.slug),
      ["b"],
    );
  });
});

describe("lirePage", () => {
  it("vaut 1 par défaut et pour toute valeur invalide", () => {
    assert.equal(lirePage(undefined), 1);
    assert.equal(lirePage(""), 1);
    assert.equal(lirePage("0"), 1);
    assert.equal(lirePage("-3"), 1);
    assert.equal(lirePage("abc"), 1);
    assert.equal(lirePage("2.5"), 1);
  });

  it("lit un entier positif", () => {
    assert.equal(lirePage("3"), 3);
  });
});

describe("paginer", () => {
  const items = ["a", "b", "c", "d", "e"];

  it("découpe par taille de page et compte les pages", () => {
    assert.deepEqual(paginer(items, 1, 2), {
      elements: ["a", "b"],
      page: 1,
      pages: 3,
    });
    assert.deepEqual(paginer(items, 3, 2), {
      elements: ["e"],
      page: 3,
      pages: 3,
    });
  });

  it("ramène une page hors bornes à la dernière page", () => {
    assert.deepEqual(paginer(items, 9, 2), {
      elements: ["e"],
      page: 3,
      pages: 3,
    });
  });

  it("une liste vide donne une seule page vide", () => {
    assert.deepEqual(paginer([], 1, 2), { elements: [], page: 1, pages: 1 });
  });
});
