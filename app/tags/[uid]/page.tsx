import { notFound } from "next/navigation";
import Link from "next/link";
import { asText, isFilled, filter, type FilledContentRelationshipField } from "@prismicio/client";
import { createClient } from "@/prismicio";
import JobCard from "@/composants/jobs/JobCard";
import type { SingleDocumentDataTagsItem } from "@/prismicio-types";

function extractTag(item: SingleDocumentDataTagsItem) {
  if (!isFilled.contentRelationship(item.tag)) return null;
  const t = item.tag as FilledContentRelationshipField<"tag", string, { name: string | null }>;
  return { name: t.data?.name ?? "", uid: t.uid };
}

export async function generateStaticParams() {
  const client = createClient();
  const tags = await client.getAllByType("tag");
  return tags.map((tag) => ({ uid: tag.uid }));
}

export default async function TagPage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  const client = createClient();

  const tag = await client.getByUID("tag", uid).catch(() => notFound());

  const jobs = await client.getAllByType("single", {
    fetchLinks: ["tag.name"],
    filters: [filter.at("my.single.tags.tag", tag.id)],
    orderings: [{ field: "my.single.date", direction: "desc" }],
  });

  const jobCards = jobs.map((job) => ({
    uid: job.uid,
    title: job.data.title ?? "",
    date: job.data.date,
    technologies: job.data.tags.map(extractTag).filter(Boolean) as Array<{ name: string; uid: string }>,
    excerpt: asText(job.data.description).slice(0, 150),
  }));

  return (
    <main className="flex-1 bg-brand-cream">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <Link
          href="/offres"
          className="inline-block bg-brand-blue px-4 py-2 text-sm text-white mb-8"
        >
          &lt; Voir toutes les offres
        </Link>

        <div className="mb-6">
          <h1 className="text-4xl font-bold text-brand-navy">{tag.data.name}</h1>
          <p className="text-sm text-brand-blue mt-1">{jobs.length} offre{jobs.length !== 1 ? "s" : ""}</p>
        </div>

        {jobCards.length === 0 ? (
          <p className="text-sm text-zinc-500">Aucune offre pour cette technologie.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobCards.map((job) => (
              <JobCard key={job.uid} job={job} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
