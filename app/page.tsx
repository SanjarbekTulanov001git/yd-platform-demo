"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { DepartmentCard } from "@/components/department-card";
import { PlaceholderArt } from "@/components/placeholder-art";
import { ProgramCard } from "@/components/program-card";
import { SectionHeading } from "@/components/section-heading";
import { useDemo } from "@/components/demo-provider";
import { demoApi } from "@/lib/api";
import uz from "@/messages/uz/common";
import en from "@/messages/en/common";
import ru from "@/messages/ru/common";

const messages = { uz, en, ru };

export default function HomePage() {
  const { locale } = useDemo();
  const text = messages[locale];
  const departments = demoApi.getDepartments();
  const programs = demoApi.getPrograms().filter((program) => program.status === "open");
  const metrics = demoApi.getMetrics();

  return (
    <>
      <section className="hero-grid overflow-hidden text-white">
        <div className="section-wrap grid gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
          <div>
            <Link
              aria-label="O'zbekiston Yoshlar Diplomatiya Markazi bosh sahifasi"
              className="mb-7 inline-flex rounded-2xl p-1 transition hover:brightness-105 motion-reduce:transition-none"
              href="/"
            >
              <BrandLogo className="hero-brand-logo" withPlate />
            </Link>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--gold)]">
              {text.heroEyebrow}
            </p>
            <h1 className="serif-heading hero-heading mt-5 max-w-2xl font-bold">
              {text.heroTitle}
            </h1>
            <p className="hero-description mt-6 max-w-xl leading-7 text-white/75">
              {text.heroDescription}
            </p>
            <div className="mt-9 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              <Link
                className="brand-button w-full rounded-xl px-5 py-3 text-center text-sm font-bold sm:w-auto"
                href="/departments"
              >
                {text.exploreDepartments}
              </Link>
              <Link
                className="w-full rounded-xl border border-white/30 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto"
                href="/programs"
              >
                {text.explorePrograms}
              </Link>
            </div>
            <p className="mt-7 text-xs text-white/50">
              Barcha ism va faoliyat ma’lumotlari namuna sifatida keltirilgan.
            </p>
          </div>
          <div className="relative">
            <PlaceholderArt
              title="Yoshlar, diplomatiya va xalqaro hamkorlik"
              number="YD"
              className="min-h-[330px] border-white/20 sm:min-h-[420px]"
            />
            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 shadow-xl backdrop-blur sm:-left-7">
              <p className="text-xs font-semibold text-white/70">Yagona maydon</p>
              <p className="mt-1 text-sm font-extrabold text-white">
                10 ta markaz yo‘nalishi
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap py-16 sm:py-20">
        <SectionHeading
          eyebrow={text.metricsEyebrow}
          title={text.metricsTitle}
          description="Ko‘rsatkichlar sahifadagi namunaviy ma’lumotlardan hisoblanadi."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <article
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              key={metric.id}
            >
              <span className="grid size-9 place-items-center rounded-xl bg-[var(--gold-light)] text-sm font-black text-[var(--navy)]">
                0{index + 1}
              </span>
              <p className="mt-5 text-3xl font-black tracking-tight text-[var(--navy)]">
                {metric.value}
              </p>
              <p className="mt-1 text-sm font-bold text-slate-700">{metric.label}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {metric.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="section-wrap">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Bir markaz, turli imkoniyatlar"
              title={text.departmentsTitle}
              description={text.departmentsDescription}
            />
            <Link
              className="brand-link w-fit text-sm font-bold hover:underline"
              href="/departments"
            >
              {text.viewAll} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department, index) => (
              <DepartmentCard
                department={department}
                index={index}
                key={department.id}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap py-16 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Ishtirok etish imkoniyati"
            title={text.programsTitle}
            description={text.programsDescription}
          />
          <Link
            className="brand-link w-fit text-sm font-bold hover:underline"
            href="/programs"
          >
            {text.viewAll} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>

      <section className="bg-[var(--navy)] py-14 text-white">
        <div className="section-wrap grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
              {text.whyTitle}
            </p>
            <p className="mt-3 max-w-2xl text-lg leading-7 text-white/75">
              {text.whyDescription}
            </p>
          </div>
          <Link
            className="w-fit rounded-xl bg-white px-5 py-3 text-sm font-bold text-[var(--navy)] transition hover:bg-[var(--gold-light)]"
            href="/architecture"
          >
            Taqdimot namunasini ko‘rish
          </Link>
        </div>
      </section>
    </>
  );
}
