import Image from "next/image";
import Link from "next/link";
import { asText, isFilled, type FilledContentRelationshipField } from "@prismicio/client";
import { createClient } from "@/prismicio";
import JobCard from "@/composants/jobs/JobCard";
import type { SingleDocumentDataTagsItem } from "@/prismicio-types";

function extractTag(item: SingleDocumentDataTagsItem) {
  if (!isFilled.contentRelationship(item.tag)) return null;
  const t = item.tag as FilledContentRelationshipField<"tag", string, { name: string | null }>;
  return { name: t.data?.name ?? "", uid: t.uid };
}

export default async function Home() {
  const client = createClient();
  const jobs = await client.getAllByType("single", {
    fetchLinks: ["tag.name"],
    orderings: [{ field: "my.single.date", direction: "desc" }],
    limit: 6,
  });

  return (
    <main className="flex-1 bg-brand-cream">
      <div className="relative w-full">
        <Image
          src="/ui/image_acceuil.svg"
          alt="Bannière d'accueil"
          width={1440}
          height={300}
          className="w-full object-cover"
          priority
        />
      </div>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h2 className="border-b-2 border-brand-navy pb-4 text-3xl font-bold text-brand-navy">
          Nos dernières opportunités
        </h2>

        {jobs.length === 0 ? (
          <p className="mt-10 text-sm text-zinc-500">Aucune offre disponible pour le moment.</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job.uid}
                job={{
                  uid: job.uid,
                  title: job.data.title ?? "",
                  date: job.data.date,
                  technologies: job.data.tags.map(extractTag).filter(Boolean) as Array<{ name: string; uid: string }>,
                  excerpt: asText(job.data.description).slice(0, 150),
                }}
              />
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            href="/offres"
            className="bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
          >
            Voir toutes les offres
          </Link>
        </div>
      </section>
    </main>
  );
}
