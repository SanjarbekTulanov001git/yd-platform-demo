"use client";

import { useState } from "react";
import { AccessGate } from "@/components/access-gate";
import { SectionHeading } from "@/components/section-heading";
import { SimpleBarChart } from "@/components/simple-chart";
import { demoApi } from "@/lib/api";
import { useDemo } from "@/components/demo-provider";

export default function DashboardPage() {
  const { changeKey } = useDemo();
  const [regionId, setRegionId] = useState("all");
  const [programId, setProgramId] = useState("all");
  const [period, setPeriod] = useState<"week" | "month">("month");
  const summary = demoApi.getReports(regionId, programId);
  const timeline = demoApi.getReportTimeline({ regionId, programId, period });
  const breakdown = demoApi.getReportBreakdown(regionId, programId);
  const totalVisits = summary.visits.length;

  return (
    <AccessGate screen="/dashboard">
      <div className="section-wrap py-12 sm:py-16" key={changeKey}>
        <SectionHeading
          eyebrow="Umumiy ko‘rsatkichlar"
          title="Boshqaruv va tahlil paneli"
          description="Barcha sonlar soxta ariza, dastur va tashrif yozuvlaridan hisoblanadi. Shaxsni aniqlovchi ma’lumot bu panelda ko‘rsatilmaydi."
        />

        <section
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
          aria-label="Hisobot mezonlari"
        >
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="text-xs font-bold text-slate-600">
              Hudud
              <select
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-800"
                onChange={(event) => setRegionId(event.target.value)}
                value={regionId}
              >
                <option value="all">Barcha hududlar</option>
                {demoApi.getRegions().map((region) => (
                  <option value={region.id} key={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-bold text-slate-600">
              Dastur
              <select
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-800"
                onChange={(event) => setProgramId(event.target.value)}
                value={programId}
              >
                <option value="all">Barcha dasturlar</option>
                {demoApi.getPrograms().map((program) => (
                  <option value={program.id} key={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-bold text-slate-600">
              Vaqt oralig‘i
              <select
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-800"
                onChange={(event) =>
                  setPeriod(event.target.value as "week" | "month")
                }
                value={period}
              >
                <option value="week">Haftalar bo‘yicha</option>
                <option value="month">Oylar bo‘yicha</option>
              </select>
            </label>
          </div>
        </section>

        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "Arizalar", value: summary.totalApplications },
            { label: "Qabul qilingan", value: summary.acceptedApplications },
            { label: "Ochiq dasturlar", value: summary.activePrograms },
            { label: "Tashriflar", value: totalVisits },
          ].map((item) => (
            <article
              className="rounded-2xl border border-slate-200 bg-white p-5"
              key={item.label}
            >
              <p className="text-xs font-semibold text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-black text-[var(--navy)]">
                {item.value}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <SimpleBarChart
              title={period === "week" ? "Haftalar bo‘yicha faollik" : "Oylar bo‘yicha faollik"}
              points={timeline.map((item) => ({
                label: item.label,
                value: item.applications,
              }))}
            />
            <p className="mt-2 text-xs text-slate-400">
              Ustunlar arizalar sonini ko‘rsatadi.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <SimpleBarChart
              title="Hududlar bo‘yicha arizalar"
              points={breakdown.byRegion}
              color="#7d1f2c"
            />
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 xl:col-span-2">
            <SimpleBarChart
              title="Dasturlar bo‘yicha arizalar"
              points={breakdown.byProgram}
              color="#1b7a67"
            />
          </article>
        </div>
      </div>
    </AccessGate>
  );
}
