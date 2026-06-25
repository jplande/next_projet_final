import { NextResponse } from "next/server";
import { asText, isFilled, type FilledContentRelationshipField } from "@prismicio/client";
import { createClient } from "@/prismicio";
import type { SingleDocumentDataTagsItem } from "@/prismicio-types";

function extractTag(item: SingleDocumentDataTagsItem) {
  if (!isFilled.contentRelationship(item.tag)) return null;
  const t = item.tag as FilledContentRelationshipField<"tag", string, { name: string | null }>;
  return { name: t.data?.name ?? "", uid: t.uid };
}

export async function GET() {
  const client = createClient();

  const jobs = await client.getAllByType("single", {
    fetchLinks: ["tag.name"],
    orderings: [{ field: "my.single.date", direction: "desc" }],
    limit: 3,
  });

  const data = jobs.map((job) => ({
    uid: job.uid,
    title: job.data.title ?? "",
    date: job.data.date,
    excerpt: asText(job.data.description).slice(0, 150),
    technologies: job.data.tags.map(extractTag).filter(Boolean) as Array<{ name: string; uid: string }>,
    url: `/offres/${job.uid}`,
  }));

  return NextResponse.json(data);
}
