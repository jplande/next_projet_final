import { NextResponse } from "next/server";
import { asText, isFilled, type FilledContentRelationshipField } from "@prismicio/client";
import { createClient } from "@/prismicio";
import type { SingleDocument, SingleDocumentDataTagsItem } from "@/prismicio-types";

function extractTag(item: SingleDocumentDataTagsItem) {
  if (!isFilled.contentRelationship(item.tag)) return null;
  const t = item.tag as FilledContentRelationshipField<"tag", string, { name: string | null }>;
  return { name: t.data?.name ?? "", uid: t.uid };
}

function formatJob(job: SingleDocument) {
  return {
    uid: job.uid,
    title: job.data.title ?? "",
    date: job.data.date,
    excerpt: asText(job.data.description).slice(0, 150),
    technologies: job.data.tags
      .map(extractTag)
      .filter(Boolean) as Array<{ name: string; uid: string }>,
    url: `/offres/${job.uid}`,
  };
}

// GET /api/offres          → 3 dernières offres
// GET /api/offres?uids=a,b → vérifie la disponibilité d'UIDs spécifiques sur Prismic
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uidsParam = searchParams.get("uids");
  const client = createClient();

  if (uidsParam) {
    const uids = uidsParam.split(",").filter(Boolean);
    const results = await Promise.all(
      uids.map((uid) =>
        client
          .getByUID("single", uid, { fetchLinks: ["tag.name"] })
          .catch(() => null),
      ),
    );
    const available = results.filter((j): j is SingleDocument => j !== null);
    return NextResponse.json(available.map(formatJob));
  }

  const jobs = await client.getAllByType("single", {
    fetchLinks: ["tag.name"],
    orderings: [{ field: "my.single.date", direction: "desc" }],
    limit: 3,
  });

  return NextResponse.json(jobs.map(formatJob));
}
