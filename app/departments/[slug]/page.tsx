"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { DepartmentArt } from "@/components/department-card";
import { formatDate, ProgramCard } from "@/components/program-card";
import { SectionHeading } from "@/components/section-heading";
import {
  OrnamentDivider,
  OrnamentalEmptyState,
} from "@/components/ornaments";
import { demoApi } from "@/lib/api";

export default function DepartmentDetailPage() {
  const params = useParams<{ slug: string }>();
  const department = demoApi.getDepartment(params.slug);

  if (!department) notFound();

  const relatedPrograms = demoApi.getDepartmentPrograms(department.id);
  const relatedEvents = demoApi
    .getEvents()
    .filter((event) =>
      relatedPrograms.some((program) => program.id === event.programId),
    );

  return (
    <>
      <section className="bg-white py-12 sm:py-16">
        <div className="section-wrap grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <Link
              className="brand-link text-sm font-bold hover:underline"
              href="/departments"
            >
              ← Bo‘limlar ro‘yxatiga qaytish
            </Link>
            <div className="mt-7">
              <SectionHeading
                eyebrow="Markaz yo‘nalishi"
                title={department.name}
                description={department.summary}
              />
            </div>
            <p className="mt-6 max-w-2xl leading-7 text-slate-600">
              {department.mission}
            </p>
          </div>
          <DepartmentArt department={department} />
        </div>
      </section>

      <section className="section-wrap py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Asosiy yo‘nalishlar</p>
            <h2 className="serif-heading mt-3 font-bold text-[var(--navy)]">
              Nimalar amalga oshiriladi?
            </h2>
            <OrnamentDivider className="mt-3 max-w-xs" />
            <ul className="mt-6 space-y-3">
              {department.directions.map((direction) => (
                <li
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700"
                  key={direction}
                >
                  <span className="mt-0.5 text-[var(--gold)]" aria-hidden="true">
                    ◆
                  </span>
                  <span>{direction}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Uchrashuvlar</p>
            <h2 className="serif-heading mt-3 font-bold text-[var(--navy)]">
              Yaqin tadbirlar
            </h2>
            <OrnamentDivider className="mt-3 max-w-xs" />
            {relatedEvents.length ? (
              <div className="mt-6 space-y-3">
                {relatedEvents.map((event) => (
                  <article
                    className="rounded-xl border border-slate-200 bg-white p-5"
                    key={event.id}
                  >
                    <p className="font-bold text-[var(--navy)]">{event.name}</p>
                    <p className="mt-2 text-sm text-slate-500">
                      {formatDate(event.startsAt)}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <OrnamentalEmptyState className="mt-5 text-sm text-slate-500">
                Bu bo‘lim uchun tadbir namunasi kiritilmagan.
              </OrnamentalEmptyState>
            )}
          </div>
        </div>
      </section>

      {relatedPrograms.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="section-wrap">
            <p className="eyebrow">Ta’lim va amaliyot</p>
            <h2 className="serif-heading mt-3 font-bold text-[var(--navy)]">
              Ushbu bo‘lim dasturlari
            </h2>
            <OrnamentDivider className="mt-3 max-w-xs" />
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {relatedPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
