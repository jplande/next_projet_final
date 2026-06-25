import Link from "next/link";

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
      <Link
        href={`/offres/${job.uid}`}
        className="text-xl font-bold text-brand-navy hover:underline"
      >
        {job.title}
      </Link>

      {job.date && (
        <p className="text-sm text-brand-blue">{formatDate(job.date)}</p>
      )}

      {job.technologies.length > 0 && (
        <p className="text-sm text-brand-blue">
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
