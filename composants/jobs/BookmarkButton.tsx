"use client";

import { usePinsStore } from "@/store/usePinsStore";
import { type JobCardData } from "@/composants/jobs/JobCard";

export default function BookmarkButton({ job }: { job: JobCardData }) {
  const { pins, addPin, removePin } = usePinsStore();
  const saved = pins.some((p: JobCardData) => p.uid === job.uid);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removePin(job);
    } else {
      addPin(job);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? "Retirer des favoris" : "Ajouter aux favoris"}
      className="shrink-0 text-brand-navy hover:text-brand-blue transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}
