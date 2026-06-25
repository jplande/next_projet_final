"use client";

import { useState } from "react";
import JobCard, { type JobCardData } from "./JobCard";

type Tag = { uid: string; name: string };

export default function OffresGrid({
  jobs,
  tags,
}: {
  jobs: JobCardData[];
  tags: Tag[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? jobs.filter((job) => job.technologies.some((t) => t.uid === activeTag))
    : jobs;

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <button
              key={tag.uid}
              type="button"
              onClick={() => setActiveTag(activeTag === tag.uid ? null : tag.uid)}
              className={`border px-3 py-1 text-sm ${
                activeTag === tag.uid
                  ? "bg-brand-blue text-white"
                  : "text-brand-navy"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-zinc-500 text-sm">Aucune offre pour cette technologie.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <JobCard key={job.uid} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
