import { notFound } from "next/navigation";
import Link from "next/link";
import { asText, isFilled, type FilledContentRelationshipField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ApplicationForm from "@/composants/jobs/ApplicationForm";
import type { SingleDocumentDataTagsItem } from "@/prismicio-types";

function extractTag(item: SingleDocumentDataTagsItem) {
  if (!isFilled.contentRelationship(item.tag)) return null;
  const t = item.tag as FilledContentRelationshipField<"tag", string, { name: string | null }>;
  return { name: t.data?.name ?? "", uid: t.uid };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export async function generateStaticParams() {
  const client = createClient();
  const jobs = await client.getAllByType("single");
  return jobs.map((job) => ({ uid: job.uid }));
}

export default async function OffrePage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  const client = createClient();

  const job = await client
    .getByUID("single", uid, { fetchLinks: ["tag.name"] })
    .catch(() => notFound());

  const technologies = job.data.tags.map(extractTag).filter(Boolean) as Array<{ name: string; uid: string }>;

  return (
    <main className="flex-1 bg-brand-cream">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <Link
          href="/offres"
          className="inline-block bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue/90 transition-colors mb-8"
        >
          &lt; Voir toutes les offres
        </Link>

        <h1 className="text-4xl font-bold text-brand-navy mb-2">{job.data.title}</h1>
        <div className="border-b-2 border-brand-blue mb-6" />

        {job.data.date && (
          <p className="flex items-center gap-2 text-sm font-medium text-brand-blue mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {formatDate(job.data.date)}
          </p>
        )}

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {technologies.map((tech) => (
              <Link
                key={tech.uid}
                href={`/tags/${tech.uid}`}
                className="border border-brand-navy px-3 py-1 text-sm text-brand-navy hover:bg-brand-navy/5 transition-colors"
              >
                {tech.name}
              </Link>
            ))}
          </div>
        )}

        <div className="prose prose-sm max-w-none text-zinc-700">
          <PrismicRichText
            field={job.data.description}
            components={{
              paragraph: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
            }}
          />
        </div>

        <ApplicationForm job={{
          uid: job.uid,
          title: job.data.title ?? "",
          date: job.data.date ?? null,
          technologies,
          excerpt: asText(job.data.description).slice(0, 150),
        }} />
      </section>
    </main>
  );
}
