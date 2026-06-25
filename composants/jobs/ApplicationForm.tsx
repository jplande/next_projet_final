"use client";

import { useState } from "react";

export default function ApplicationForm({ jobTitle }: { jobTitle: string }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    // TODO: brancher sur un vrai endpoint (email, API, etc.)
    setSent(true);
  }

  if (sent) {
    return (
      <p className="text-sm text-brand-blue font-medium mt-8">
        Candidature envoyée pour « {jobTitle} ».
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
