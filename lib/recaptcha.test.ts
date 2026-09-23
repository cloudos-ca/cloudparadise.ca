import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { verifierRecaptcha } from "./recaptcha";

/**
 * Le comportement qui compte ici n'est pas « Google dit oui » — c'est ce que
 * fait la fonction quand quelque chose manque. Un garde-fou mal câblé qui
 * laisse passer en silence est pire que pas de garde-fou : on le croit en
 * place.
 *
 * Aucun appel réseau : tous les cas testés se décident avant le `fetch`.
 */
const SECRET = process.env.RECAPTCHA_SECRET_KEY;
const NODE_ENV = process.env.NODE_ENV;

function poser(secret: string | undefined, env: string) {
  if (secret === undefined) delete process.env.RECAPTCHA_SECRET_KEY;
  else process.env.RECAPTCHA_SECRET_KEY = secret;
  // `NODE_ENV` est typé en lecture seule par Node ; le test a besoin de le
  // forcer, d'où la conversion. `Object.defineProperty` ne convient pas ici :
  // `process.env` n'accepte que des descripteurs énumérables.
  (process.env as Record<string, string>).NODE_ENV = env;
}

afterEach(() => poser(SECRET, NODE_ENV ?? "test"));

describe("verifierRecaptcha", () => {
  it("refuse en production quand la clé secrète n'est pas configurée", async () => {
    poser(undefined, "production");
    assert.equal(await verifierRecaptcha("un-jeton"), false);
  });

  it("laisse passer hors production sans clé, pour rester testable en local", async () => {
    poser(undefined, "development");
    assert.equal(await verifierRecaptcha(undefined), true);
  });

  it("refuse un envoi sans jeton, même avec la clé configurée", async () => {
    poser("secret-de-test", "production");
    assert.equal(await verifierRecaptcha(undefined), false);
    assert.equal(await verifierRecaptcha(""), false);
  });
});
