"use client";

import { ProgramCard } from "@/components/program-card";
import { SectionHeading } from "@/components/section-heading";
import { demoApi } from "@/lib/api";

export default function ProgramsPage() {
  const programs = demoApi.getPrograms();

  return (
    <div className="section-wrap py-12 sm:py-16">
      <SectionHeading
        eyebrow="Ishtirok etish imkoniyatlari"
        title="Dasturlar va mashg‘ulotlar"
        description="Dasturlar hamda ularning muddatlari soxta ma’lumotlar bilan ko‘rsatilgan."
      />
      <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
}
