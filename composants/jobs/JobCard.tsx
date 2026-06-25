import Link from "next/link";
import BookmarkButton from "./BookmarkButton";

export type JobCardData = {
  uid: string;
  title: string;
  date: string | null;
  technologies: Array<{ name: string; uid: string }>;
  excerpt: string;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function JobCard({ job }: { job: JobCardData }) {
  return (
    <article className="flex flex-col gap-3 bg-white p-5 border border-gray-200">
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/offres/${job.uid}`}
          className="text-xl font-bold text-brand-navy hover:underline"
        >
          {job.title}
        </Link>
        <BookmarkButton job={job} />
      </div>

      {job.date && (
        <p className="flex items-center gap-1.5 text-sm text-brand-blue">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {formatDate(job.date)}
        </p>
      )}

      {job.technologies.length > 0 && (
        <p className="flex items-center gap-1.5 text-sm text-brand-blue">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          {job.technologies.map((t, i) => (
            <span key={t.uid}>
              <Link href={`/tags/${t.uid}`} className="hover:underline">
                {t.name}
              </Link>
              {i < job.technologies.length - 1 && ", "}
            </span>
          ))}
        </p>
      )}

      <p className="text-sm text-zinc-600">{job.excerpt}</p>
    </article>
  );
}
