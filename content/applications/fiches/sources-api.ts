import type { FicheApplication } from "../types";

/**
 * Sources de données (id produit `api-sources`) — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Libellé réel : « Sources de données » / « Data sources » (app-registry.tsx, messages apiSources
 *   de fr.json / en.json).
 * - Quatre fournisseurs, un adaptateur écrit à la main pour chacun (src/lib/api-sources/providers.ts) :
 *   OpenWeatherMap (météo actuelle par ville), Alpha Vantage (cotation boursière par symbole), Google
 *   Geocoding (adresse → latitude/longitude), Microsoft Translator (Azure) (traduction VERS le français
 *   seulement, `to=fr`).
 * - La clé est sondée auprès du vrai service AVANT d'être enregistrée ; refusée, elle n'est pas gardée
 *   (createApiSourceConnectionAction → adapter.validate). Réactiver revalide la clé.
 * - La clé est chiffrée au repos (AES-256-GCM, src/lib/api-sources/crypto.ts) et jamais journalisée.
 * - Une connexion active devient une source dans un Plan (famille API : new-plan/step3-config.tsx,
 *   plans/create-flows.ts) ou un nœud « Appeler une source API » d'un Workflow
 *   (workflows/node-catalog.ts).
 * - Appel EN DIRECT à chaque exécution, jamais de cache, relance comprise ; le résultat est déposé
 *   dans Fichiers en JSON, nommé « <fournisseur> — <requête>.json » (jobs/api-source-executor.ts).
 * - Activer, désactiver, réactiver, supprimer (api-sources-app.tsx).
 * - Forfait : `personnel` (GET /api/v1/apps/catalog).
 *
 * À vérifier à la relecture :
 * - Chaque appel est un travail facturé en crédits (JobKind « API », pricing.ts) : la fiche ne dit
 *   rien de gratuit. La clé et l'abonnement chez le fournisseur restent à la charge du client : dit.
 * - Noms de tiers cités (OpenWeatherMap, Alpha Vantage, Google, Microsoft) : usage purement descriptif,
 *   sans logo. À confirmer que Maxime est à l'aise avec cette liste nominative.
 */
export const sourcesApi: FicheApplication = {
  id: "sources-api",
  apps: ["api-sources"],
  slug: { fr: "sources-de-donnees-api", en: "api-data-sources" },
  nom: { fr: "Sources de données", en: "Data sources" },
  titre: {
    fr: "Sources de données : branchez une API externe à vos plans et workflows",
    en: "Data sources: connect an external API to your plans and workflows",
  },
  groupe: "developpement",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Brancher une API externe à vos workflows — Cloud OS",
      en: "Connect external APIs to your workflows — Cloud OS",
    },
    description: {
      fr: "Météo, bourse, géocodage, traduction : activez un fournisseur avec votre propre clé API et appelez-le en direct depuis vos plans et workflows.",
      en: "Weather, stock quotes, geocoding, translation: activate a provider with your own API key, then call it live from your plans and your workflows.",
    },
  },
  accroche: {
    fr: "Votre clé API, un fournisseur externe, et ses données dans vos automatisations.",
    en: "Your API key, an external provider, and its data in your automations.",
  },
  motsCles: {
    fr: ["connecter une api sans coder", "intégration api workflow", "api météo automatisation", "source de données externe", "clé api"],
    en: ["connect an api without code", "api workflow integration", "weather api automation", "external data source", "api key"],
  },
  corps: {
    fr: [
      {
        titre: "Des données externes, sans écrire d'intégration",
        paragraphes: [
          "Sources de données relie Cloud OS à des services externes. Vous choisissez un fournisseur, collez votre clé API, et il devient une source que vos Plans et vos Workflows peuvent interroger. Chaque fournisseur a son propre connecteur, écrit pour lui : pas de formulaire générique à configurer.",
        ],
        points: [
          "OpenWeatherMap : la météo actuelle d'une ville.",
          "Alpha Vantage : la cotation boursière d'un symbole.",
          "Google Geocoding : les coordonnées géographiques d'une adresse.",
          "Microsoft Translator (Azure) : la traduction d'un texte vers le français.",
        ],
      },
      {
        titre: "Des données fraîches à chaque exécution",
        paragraphes: [
          "Dans un Plan, ou comme étape « Appeler une source API » d'un Workflow, vous indiquez la requête : une ville, un symbole, une adresse, un texte. Le fournisseur est appelé en direct à chaque exécution, jamais depuis un cache, et la réponse est déposée dans Fichiers sous forme de fichier JSON.",
        ],
      },
      {
        titre: "Votre clé, protégée",
        paragraphes: [
          "La clé est d'abord essayée auprès du fournisseur : si elle est refusée, elle n'est pas enregistrée. Acceptée, elle est conservée chiffrée et n'apparaît jamais dans les journaux. Vous pouvez désactiver une source, la réactiver (la clé est alors vérifiée de nouveau) ou la supprimer.",
          "Le compte chez le fournisseur et ses éventuels frais restent les vôtres : Cloud OS utilise votre clé, pas la sienne.",
        ],
      },
    ],
    en: [
      {
        titre: "External data, without writing an integration",
        paragraphes: [
          "Data sources connects Cloud OS to external services. You pick a provider, paste your API key, and it becomes a source your Plans and Workflows can query. Each provider has its own connector, written for it: no generic form to configure.",
        ],
        points: [
          "OpenWeatherMap: current weather for a city.",
          "Alpha Vantage: the stock quote for a symbol.",
          "Google Geocoding: the geographic coordinates of an address.",
          "Microsoft Translator (Azure): a text translated into French.",
        ],
      },
      {
        titre: "Fresh data on every run",
        paragraphes: [
          "In a Plan, or as a “Call a data source” step in a Workflow, you enter the query: a city, a symbol, an address, a text. The provider is called live on every run, never from a cache, and the response is saved to Files as a JSON file.",
        ],
      },
      {
        titre: "Your key, protected",
        paragraphes: [
          "The key is first tried against the provider: if it is refused, it is not saved. Once accepted, it is stored encrypted and never appears in the logs. You can deactivate a source, reactivate it (the key is then checked again) or delete it.",
          "The account with the provider and any fees it charges remain yours: Cloud OS uses your key, not its own.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il savoir programmer ?",
        reponse: "Non. Vous collez votre clé API une fois, puis vous choisissez la source dans un Plan ou un Workflow et tapez la requête : une ville, un symbole, une adresse ou un texte.",
      },
      {
        question: "Où obtenir une clé API ?",
        reponse: "Auprès du fournisseur lui-même : chaque source a un lien vers la documentation de son fournisseur. Le compte et ses éventuels frais sont chez lui, pas chez Cloud OS.",
      },
      {
        question: "Les données sont-elles mises en cache ?",
        reponse: "Non. Le fournisseur est appelé en direct à chaque exécution, y compris quand vous relancez un travail : le résultat reflète l'état du service au moment de l'appel.",
      },
      {
        question: "Puis-je ajouter un autre fournisseur ?",
        reponse: "Pas vous-même : chaque fournisseur demande un connecteur écrit pour lui. Écrivez-nous si un service vous manque.",
      },
    ],
    en: [
      {
        question: "Do I need to know how to code?",
        reponse: "No. You paste your API key once, then pick the source in a Plan or Workflow and type the query: a city, a symbol, an address or a text.",
      },
      {
        question: "Where do I get an API key?",
        reponse: "From the provider itself: each source links to its provider's documentation. The account and any fees are with the provider, not with Cloud OS.",
      },
      {
        question: "Is the data cached?",
        reponse: "No. The provider is called live on every run, including when you rerun a job: the result reflects the state of the service at the time of the call.",
      },
      {
        question: "Can I add another provider?",
        reponse: "Not yourself: each provider needs a connector written for it. Let us know if a service is missing.",
      },
    ],
  },
  captures: [],
  voisines: ["workflows", "plans", "rapports"],
  articles: [],
};
