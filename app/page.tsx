import Link from "next/link";
import JobCard from "@/composants/jobs/JobCard";
import { MOCK_JOBS } from "@/composants/jobs/mock-data";

export default function Home() {
  // TODO JP (Prismic) : remplacer MOCK_JOBS par données prismic
  const jobs = MOCK_JOBS;

  return (
    <main className="flex-1 bg-brand-cream">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h2 className="border-b-2 border-brand-navy pb-4 text-3xl font-bold text-brand-navy">
          Nos dernières opportunités
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.uid} job={job} />
          ))}
        </div>

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
