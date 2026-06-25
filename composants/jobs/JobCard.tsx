import Link from "next/link";
import type { Job } from "./types";

/** Formate une date ISO en JJ/MM/AAAA (format de la maquette). */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function CalendarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m8 16-4-4 4-4M16 8l4 4-4 4" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="flex flex-col gap-3 rounded-md bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/offres/${job.uid}`}
          className="text-xl font-bold leading-snug text-brand-navy hover:underline"
        >
          {job.title}
        </Link>
        <button
          type="button"
          aria-label="Épingler l'offre"
          className="shrink-0 text-brand-navy/80 transition-colors hover:text-brand-blue"
        >
          <BookmarkIcon />
        </button>
      </div>

      <p className="flex items-center gap-2 text-sm font-medium text-brand-blue">
        <CalendarIcon />
        {formatDate(job.date)}
      </p>

      <p className="flex items-center gap-2 text-sm font-medium text-brand-blue">
        <CodeIcon />
        {job.technologies.join(", ")}
      </p>

      <p className="text-sm leading-relaxed text-zinc-600">{job.description}</p>
    </article>
  );
}
