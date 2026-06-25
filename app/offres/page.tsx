import { asText, isFilled, type FilledContentRelationshipField } from "@prismicio/client";
import { createClient } from "@/prismicio";
import OffresGrid from "@/composants/jobs/OffresGrid";
import type { SingleDocumentDataTagsItem } from "@/prismicio-types";

function extractTag(item: SingleDocumentDataTagsItem) {
  if (!isFilled.contentRelationship(item.tag)) return null;
  const t = item.tag as FilledContentRelationshipField<"tag", string, { name: string | null }>;
  return { name: t.data?.name ?? "", uid: t.uid };
}

export default async function OffresPage() {
  const client = createClient();

  const [jobs, tags] = await Promise.all([
    client.getAllByType("single", {
      fetchLinks: ["tag.name"],
      orderings: [{ field: "my.single.date", direction: "desc" }],
    }),
    client.getAllByType("tag", {
      orderings: [{ field: "my.tag.name" }],
    }),
  ]);

  const jobCards = jobs.map((job) => ({
    uid: job.uid,
    title: job.data.title ?? "",
    date: job.data.date,
    technologies: job.data.tags.map(extractTag).filter(Boolean) as Array<{ name: string; uid: string }>,
    excerpt: asText(job.data.description).slice(0, 150),
  }));

  const tagList = tags.map((tag) => ({ uid: tag.uid, name: tag.data.name ?? "" }));

  return (
    <main className="flex-1 bg-brand-cream">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-brand-navy">Offres d&apos;emploi</h1>
          <p className="text-sm text-brand-blue mt-1">{jobs.length} offre{jobs.length !== 1 ? "s" : ""}</p>
        </div>

        <OffresGrid jobs={jobCards} tags={tagList} />
      </section>
    </main>
  );
}
