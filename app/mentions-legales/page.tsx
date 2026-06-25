import { notFound } from "next/navigation";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "@/prismicio";

export default async function MentionsLegalesPage() {
  const client = createClient();
  const mentions = await client.getSingle("mentions").catch(() => notFound());

  return (
    <main className="flex-1 bg-brand-cream">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold text-brand-navy mb-2">{mentions.data.title}</h1>
        <div className="border-b-2 border-brand-blue mb-10" />

        {mentions.data.sections.map((section, i) => (
          <div key={i} className="mb-10">
            {section.section_title && (
              <h2 className="text-lg font-semibold text-brand-blue mb-4">
                {section.section_title}
              </h2>
            )}
            <PrismicRichText
              field={section.section_content}
              components={{
                paragraph: ({ children }) => (
                  <p className="mb-3 text-sm leading-relaxed text-zinc-700">{children}</p>
                ),
              }}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
