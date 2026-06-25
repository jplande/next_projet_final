"use client";

import Link from "next/link";
import { usePinsStore } from "@/store/usePinsStore";
import { getApplicationHistory, type ApplicationEntry } from "@/composants/jobs/ApplicationForm";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export default function ProfilPage() {
  const { pins } = usePinsStore();
  const history: ApplicationEntry[] = getApplicationHistory();

  return (
    <main className="flex-1 bg-brand-cream">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold text-brand-navy">Bienvenue</h1>
        <div className="mt-2 mb-10 w-24 h-1 bg-brand-blue" />

        {/* Offres enregistrées */}
        <h2 className="text-2xl font-bold text-brand-blue mb-6">Offres enregistrées</h2>

        {pins.length === 0 ? (
          <p className="text-sm text-zinc-500 mb-12">
            Aucune offre enregistrée. Utilisez le marque-page sur les offres pour les retrouver ici.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {pins.map((offre) => (
              <article key={offre.uid} className="flex flex-col gap-3 bg-white p-5 border border-gray-200">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/offres/${offre.uid}`} className="text-lg font-bold text-brand-navy hover:underline">
                    {offre.title}
                  </Link>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-brand-navy" aria-hidden="true">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </div>

                {offre.date && (
                  <p className="flex items-center gap-1.5 text-sm text-brand-blue">
                    <CalendarIcon />
                    {formatDate(offre.date)}
                  </p>
                )}

                {offre.technologies.length > 0 && (
                  <p className="flex items-center gap-1.5 text-sm text-brand-blue">
                    <CodeIcon />
                    {offre.technologies.map((t) => t.name).join(", ")}
                  </p>
                )}

                <p className="text-sm text-zinc-600">{offre.excerpt}</p>
              </article>
            ))}
          </div>
        )}

        {/* Historique des candidatures */}
        <h2 className="text-2xl font-bold text-brand-blue mb-6">Historique des candidatures</h2>

        {history.length === 0 ? (
          <p className="text-sm text-zinc-500">Aucune candidature envoyée pour le moment.</p>
        ) : (
          <div className="flex flex-col">
            {history.map((entry, i) => (
              <div key={`${entry.uid}-${entry.appliedAt}`} className={i < history.length - 1 ? "pb-6 mb-6 border-b border-gray-300" : ""}>
                {entry.date && (
                  <p className="flex items-center gap-1.5 text-sm text-brand-blue mb-1">
                    <CalendarIcon />
                    {formatDate(entry.date)}
                  </p>
                )}
                <h3 className="text-lg font-bold text-brand-navy mb-1">{entry.title}</h3>
                {entry.technologies.length > 0 && (
                  <p className="flex items-center gap-1.5 text-sm text-zinc-700 mb-2">
                    <CodeIcon />
                    {entry.technologies.map((t) => t.name).join(", ")}
                  </p>
                )}
                <p className="text-sm text-brand-blue">{entry.excerpt}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
