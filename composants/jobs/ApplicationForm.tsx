"use client";

import { useState } from "react";

export type ApplicationEntry = {
  uid: string;
  title: string;
  date: string | null;
  technologies: Array<{ name: string; uid: string }>;
  excerpt: string;
  appliedAt: string;
};

const HISTORY_KEY = "candidatures_history";

export function getApplicationHistory(): ApplicationEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

type Props = {
  job: {
    uid: string;
    title: string;
    date: string | null;
    technologies: Array<{ name: string; uid: string }>;
    excerpt: string;
  };
};

export default function ApplicationForm({ job }: Props) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    const history = getApplicationHistory();
    const entry: ApplicationEntry = { ...job, appliedAt: new Date().toISOString() };
    localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...history]));

    setSent(true);
  }

  if (sent) {
    return (
      <p className="text-sm text-brand-blue font-medium mt-8">
        Candidature envoyée pour « {job.title} ».
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Postuler à cette offre ..."
        rows={5}
        className="w-full border border-brand-blue p-4 text-sm text-brand-navy placeholder:text-brand-blue/60 focus:outline-none resize-none"
      />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className="bg-brand-blue px-6 py-2 text-sm font-semibold text-white hover:bg-brand-blue/90 transition-colors"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
}
