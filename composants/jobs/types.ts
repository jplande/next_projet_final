/**
 * Représentation d'une offre d'emploi côté front.
 *
 * Cette forme est volontairement proche de ce que renverra Prismic
 * (type `single`) pour faciliter le branchement ultérieur :
 *   - `uid`          -> document.uid (lien vers la page dédiée /offres/[uid])
 *   - `title`        -> champ Text
 *   - `date`         -> champ Date (ou first_publication_date)
 *   - `technologies` -> group répétable de tags
 *   - `description`  -> champ Rich Text / Text
 */
export type Job = {
  uid: string;
  title: string;
  /** Date ISO (YYYY-MM-DD) — formatée à l'affichage. */
  date: string;
  technologies: string[];
  description: string;
};
