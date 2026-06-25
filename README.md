# Jean-Paul Lalande — Projet Final Next.js M2

## Pages

| URL | Description |
|-----|-------------|
| `/` | Accueil |
| `/offres` | Liste des offres d'emploi |
| `/offres/[uid]` | Détail d'une offre |
| `/tags/[uid]` | Offres filtrées par tag / technologie |
| `/profil` | Page profil utilisateur |
| `/mentions-legales` | Mentions légales |
| `/slice-simulator` | Simulateur de slices Prismic (dev) |

## Routes API

| Méthode | URL | Description |
|---------|-----|-------------|
| `GET` | `/api/offres` | Retourne les 3 dernières offres |
| `GET` | `/api/offres?uids=a,b` | Vérifie la disponibilité d'UIDs spécifiques |
| `GET` | `/api/preview` | Active le mode preview Prismic |
| `GET` | `/api/exit-preview` | Désactive le mode preview Prismic |
| `POST` | `/api/revalidate` | Revalide le cache Prismic |
