"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { BrandMark } from "@/components/brand-logo";
import { SectionHeading } from "@/components/section-heading";
import { formatDate } from "@/components/program-card";
import { demoApi } from "@/lib/api";

export default function ProgramDetailPage() {
  const params = useParams<{ id: string }>();
  const program = demoApi.getProgram(params.id);
  if (!program) notFound();

  const department = demoApi
    .getDepartments()
    .find((item) => item.id === program.departmentId);
  const events = demoApi
    .getEvents()
    .filter((event) => event.programId === program.id);

  return (
    <div className="section-wrap py-12 sm:py-16">
      <Link
        className="brand-link text-sm font-bold hover:underline"
        href="/programs"
      >
        ← Dasturlar ro‘yxatiga qaytish
      </Link>
      <div className="mt-7 grid gap-9 lg:grid-cols-[1fr_340px]">
        <div>
          <SectionHeading
            eyebrow={department?.name ?? "Markaz dasturi"}
            title={program.name}
            description={program.summary}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Dastur muddati
              </p>
              <p className="mt-2 font-bold text-[var(--navy)]">
                {formatDate(program.startsAt)} — {formatDate(program.endsAt)}
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Ariza muddati
              </p>
              <p className="mt-2 font-bold text-[var(--navy)]">
                {formatDate(program.applicationDeadline)}
              </p>
            </article>
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-bold text-[var(--navy)]">
              Dastur tadbirlari
            </h2>
            <div className="mt-4 space-y-3">
              {events.length ? (
                events.map((event) => (
                  <article
                    className="rounded-2xl border border-slate-200 bg-white p-5"
                    key={event.id}
                  >
                    <p className="font-bold text-slate-800">{event.name}</p>
                    <p className="mt-2 text-sm text-slate-500">
                      {formatDate(event.startsAt)} ·{" "}
                      {event.format === "yuzma-yuz" ? "Yuzma-yuz" : "Masofaviy"}
                    </p>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 p-5 text-sm text-slate-500">
                  <BrandMark className="mb-3 h-7" />
                  <p>Hozircha tadbir namunasi kiritilmagan.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <aside className="h-fit rounded-2xl bg-[var(--navy)] p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
            Ishtirok etish
          </p>
          <h2 className="mt-3 text-xl font-bold">Ariza yuborish</h2>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Ariza shakli namuna a’zo ma’lumotlari bilan ishlaydi. Haqiqiy shaxsiy
            ma’lumot kiritmang.
          </p>
          {program.status === "open" ? (
            <Link
              className="brand-button mt-6 inline-flex w-full justify-center rounded-xl px-4 py-3 text-sm font-extrabold"
              href={`/apply/${program.id}`}
            >
              Ariza topshirish
            </Link>
          ) : (
            <p className="mt-6 rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-bold">
              Ariza qabul qilish boshlanmagan
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
