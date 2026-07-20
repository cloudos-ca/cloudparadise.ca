import type { Metadata } from "next";
import { PageEntete } from "@/components/marketing/PageEntete";
import { Reveal } from "@/components/marketing/Reveal";
import {
  BandeauJuridique,
  SectionsLegales,
  type SectionLegale,
} from "@/components/marketing/legal";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";

export const metadata: Metadata = {
  title: "Conditions d’utilisation — Cloud Paradise",
  description:
    "Conditions d’utilisation de Cloud Paradise. Document de structure en cours de rédaction, à faire valider juridiquement.",
  // Une coquille non validée n'a rien à faire dans un index de recherche.
  robots: { index: false, follow: true },
};

/**
 * Sections types de conditions d'utilisation SaaS.
 *
 * Ce sont des intitulés et des pistes de rédaction, pas du texte opposable.
 * Chaque note dit ce que la section devra couvrir, pour que le juriste parte
 * d'un plan plutôt que d'une page blanche.
 */
const SECTIONS: readonly SectionLegale[] = [
  {
    titre: "Objet",
    note: "Décrire ce que ce document encadre : l’accès et l’utilisation de la plateforme Cloud Paradise.",
  },
  {
    titre: "Acceptation des conditions",
    note: "Préciser à quel moment l’utilisateur est réputé accepter (création de compte, première utilisation) et le sort des mineurs.",
  },
  {
    titre: "Description du service",
    note: "Résumer le service : exécution de tâches de calcul dans le cloud, sans engagement de disponibilité chiffré tant qu’aucun SLA n’est signé.",
  },
  {
    titre: "Compte et crédits",
    note: "Conditions de création de compte, exactitude des informations, nature des crédits (non transférables ? expirent-ils ?), responsabilité des identifiants.",
  },
  {
    titre: "Tarification et paiement",
    note: "Renvoyer à la grille tarifaire en vigueur, préciser la devise, les taxes applicables au Québec, les modalités de recharge et la politique de remboursement.",
  },
  {
    titre: "Utilisation acceptable",
    note: "Interdictions : contenus illicites, atteinte aux droits de tiers, contournement des limites techniques, revente non autorisée de la capacité de calcul.",
  },
  {
    titre: "Propriété intellectuelle",
    note: "Distinguer ce qui appartient à Cloud Paradise (plateforme, marque) de ce qui reste à l’utilisateur (fichiers déposés, résultats produits).",
  },
  {
    titre: "Limitation de responsabilité",
    note: "Plafonds de responsabilité, exclusion des dommages indirects, sous réserve des dispositions d’ordre public applicables aux consommateurs au Québec.",
  },
  {
    titre: "Résiliation",
    note: "Conditions de fermeture d’un compte à l’initiative de l’utilisateur ou de Cloud Paradise, et sort des crédits non utilisés.",
  },
  {
    titre: "Droit applicable",
    note: "Les présentes conditions seront régies par le droit applicable dans la province de Québec, Canada, et les tribunaux compétents devront y être désignés.",
  },
  {
    titre: "Modifications",
    note: "Comment les conditions peuvent évoluer, avec quel préavis, et comment les utilisateurs en sont informés.",
  },
  {
    titre: "Contact",
    note: "Renvoyer vers la page Contact et l’adresse de correspondance officielle.",
  },
];

export default function ConditionsPage() {
  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <PageEntete
          eyebrow="Légal"
          titre="Conditions d’utilisation"
          soustitre="Dernière mise à jour : [à compléter]"
        />

        <Reveal delay={0.1} className={`${LECTURE} mt-8`}>
          <BandeauJuridique />
          <div className="mt-10">
            <SectionsLegales sections={SECTIONS} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
