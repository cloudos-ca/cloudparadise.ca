import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { BlogArticleSummary } from "babylovegrowth-next-js-blog";
import {
  articlesVisibles,
  corpsSansEntete,
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

describe("corpsSansEntete", () => {
  const hero = "https://img.example/hero.jpeg";

  it("retire le h1 et l'image de tête qui doublent ceux de la page", () => {
    const html =
      '<h1 id="x" tabindex="-1">Titre</h1>\n<p><img src="https://img.example/hero.jpeg" alt="Une image"></p>\n<p>Texte.</p>';
    assert.equal(corpsSansEntete(html, hero), "<p>Texte.</p>");
  });

  it("laisse une première image qui n'est pas l'image de tête", () => {
    const html =
      "<h1>Titre</h1><p><img src=\"https://img.example/autre.png\" alt=\"\"></p><p>Texte.</p>";
    assert.equal(
      corpsSansEntete(html, hero),
      '<p><img src="https://img.example/autre.png" alt=""></p><p>Texte.</p>',
    );
  });

  it("ne touche pas un h1 ou une image plus loin dans le corps", () => {
    const html = "<p>Intro.</p><h1>Titre</h1><p><img src=\"" + hero + "\"></p>";
    assert.equal(corpsSansEntete(html, hero), html);
  });

  it("sans image de tête, ne retire que le h1", () => {
    const html = "<h1>Titre</h1><p><img src=\"" + hero + "\"></p><p>Texte.</p>";
    assert.equal(
      corpsSansEntete(html, ""),
      '<p><img src="' + hero + '"></p><p>Texte.</p>',
    );
  });
});

// --- Traductions du dépôt --------------------------------------------------

import type { ArticleTraduit } from "@/content/blogue/en";
import { avecTraductions, enArticle, etatDesTraductions, jumeaux } from "./blogue";

function traduction(
  partiel: Partial<ArticleTraduit> & { slug: string; source: ArticleTraduit["source"] },
): ArticleTraduit {
  return {
    id: 1,
    title: partiel.slug,
    hero_image_url: "",
    meta_description: "",
    excerpt: "",
    created_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-09-01T00:00:00Z",
    keywords: [],
    content_html: "",
    jsonLd: null,
    faqJsonLd: null,
    ...partiel,
  };
}

const SOURCE = { slug: "migration-vers-le-cloud", updated_at: "2026-09-17T17:30:04.518Z" };

describe("enArticle", () => {
  it("donne un article anglais publié, sans le champ source", () => {
    const a = enArticle(traduction({ slug: "migrating", source: SOURCE }));
    assert.equal(a.languageCode, "en");
    assert.equal(a.published, true);
    assert.equal("source" in a, false);
  });
});

describe("avecTraductions", () => {
  it("ajoute les traductions aux articles de l'API, du plus récent au plus ancien", () => {
    const api = [article({ slug: "api-en", languageCode: "en", created_at: "2026-09-10T00:00:00Z" })];
    const t = [traduction({ slug: "migrating", source: SOURCE, created_at: "2026-09-17T00:00:00Z" })];
    assert.deepEqual(avecTraductions(api, t).map((a) => a.slug), ["migrating", "api-en"]);
  });

  it("à slug égal, garde la traduction", () => {
    const api = [article({ slug: "meme", languageCode: "en", title: "API" })];
    const t = [traduction({ slug: "meme", source: SOURCE, title: "Dépôt" })];
    const fusion = avecTraductions(api, t);
    assert.equal(fusion.length, 1);
    assert.equal(fusion[0].title, "Dépôt");
  });
});

describe("jumeaux", () => {
  const t = [traduction({ slug: "migrating-to-the-cloud", source: SOURCE })];

  it("jumelle un article FR à sa traduction, et la traduction à sa source", () => {
    const attendu = { fr: "/blogue/migration-vers-le-cloud", en: "/en/blog/migrating-to-the-cloud" };
    assert.deepEqual(jumeaux("migration-vers-le-cloud", "fr", t), attendu);
    assert.deepEqual(jumeaux("migrating-to-the-cloud", "en", t), attendu);
  });

  it("ne jumelle rien à un article sans traduction, ni à un slug croisé", () => {
    assert.equal(jumeaux("autre", "fr", t), null);
    assert.equal(jumeaux("migration-vers-le-cloud", "en", t), null);
  });
});

describe("etatDesTraductions", () => {
  it("distingue traduit, absente et modifiee", () => {
    const fr = [
      article({ slug: "migration-vers-le-cloud", updated_at: SOURCE.updated_at }),
      article({ slug: "retouche", updated_at: "2026-09-20T00:00:00Z" }),
      article({ slug: "nouveau" }),
    ];
    const t = [
      traduction({ slug: "migrating-to-the-cloud", source: SOURCE }),
      traduction({ slug: "touched-up", source: { slug: "retouche", updated_at: "2026-09-18T00:00:00Z" } }),
    ];
    assert.deepEqual(etatDesTraductions(fr, t), [
      { slug: "migration-vers-le-cloud", etat: "traduit", traduction: "migrating-to-the-cloud" },
      { slug: "retouche", etat: "modifiee", traduction: "touched-up" },
      { slug: "nouveau", etat: "absente" },
    ]);
  });
});
