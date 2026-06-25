import type { Job } from "./types";

/**
 * Données temporaires de démonstration.
 *
 * TODO (étape Prismic) : remplacer par une requête au repo `jobboarding` :
 *   const client = createClient();
 *   const offres = await client.getAllByType("single", {
 *     orderings: [{ field: "document.first_publication_date", direction: "desc" }],
 *   });
 * puis mapper les documents vers le type `Job`.
 */
export const MOCK_JOBS: Job[] = [
  {
    uid: "developpeur-nextjs",
    title: "Développeur NextJS",
    date: "2026-01-01",
    technologies: ["Techno1", "Techno2", "Techno3"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
