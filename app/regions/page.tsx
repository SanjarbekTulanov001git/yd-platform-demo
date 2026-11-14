"use client";

import { useState } from "react";
import { AccessGate } from "@/components/access-gate";
import { FilterPanel } from "@/components/filter-panel";
import { MapView } from "@/components/map/map-view";
import { useDemo } from "@/components/demo-provider";
import { formatDate } from "@/components/program-card";
import { OrnamentDivider, OrnamentalEmptyState } from "@/components/ornaments";
import { demoApi, demoRoleProfiles } from "@/lib/api";

export default function RegionsPage() {
  const { role, changeKey, notifyChange } = useDemo();
  const roleProfile = demoRoleProfiles[role];
  const assignedRegionId = role === "staff" ? roleProfile.regionId : undefined;
  const [regionFilter, setRegionFilter] = useState(
    role === "staff" ? roleProfile.regionId ?? "all" : "all",
  );
  const regions = demoApi.getRegions();
  const effectiveRegionId =
    regionFilter === "all" ? assignedRegionId : regionFilter;
  const outsideAssignedRegion =
    Boolean(assignedRegionId) && effectiveRegionId !== assignedRegionId;
  const institutions = outsideAssignedRegion
    ? []
    : demoApi.getInstitutions().filter(
        (institution) =>
          !effectiveRegionId || institution.regionId === effectiveRegionId,
      );
  const visibleInstitutionIds = new Set(
    institutions.map((institution) => institution.id),
  );
  const visits = demoApi
    .getVisits()
    .filter((visit) => visibleInstitutionIds.has(visit.institutionId));

  return (
    <AccessGate screen="/regions">
      <div className="section-wrap py-12 sm:py-16" key={changeKey}>
        <p className="eyebrow">Yagona tizim, ko‘p hudud</p>
        <h1 className="serif-heading mt-3 text-3xl font-bold text-[var(--navy)] sm:text-4xl">
          Hududlar va tashriflar
        </h1>
        <OrnamentDivider className="mt-3 max-w-xs" />
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Xarita va muassasalar nomuna ma’lumotlari bitta to‘plamdan olinadi.
          Hududni almashtirish uchun alohida tizim kerak emas.
        </p>

        <div className="mt-8">
          <FilterPanel>
            <label className="block max-w-sm text-xs font-bold text-slate-600">
              Hududni tanlang
              <select
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-800"
                onChange={(event) => setRegionFilter(event.target.value)}
                value={regionFilter}
              >
                <option value="all">
                  {role === "staff" ? "Biriktirilgan hudud" : "Barcha hududlar"}
                </option>
                {regions.map((region) => (
                  <option value={region.id} key={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center gap-2">
                <span className="size-3 rounded-full bg-[var(--brand-blue)]" />
                Koordinata tasdiqlangan
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-3 rounded-full bg-amber-500" />
                Tekshiruv kutilmoqda
              </span>
            </div>
          </FilterPanel>
        </div>

        {outsideAssignedRegion && (
          <p
            className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
            role="status"
          >
            Xodim roli faqat {demoApi.getRegionName(assignedRegionId ?? "")} hududiga
            biriktirilgan. Boshqa hududlarning muassasa va tashriflari
            ko‘rsatilmaydi.
          </p>
        )}

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
          <MapView
            institutions={institutions}
            regions={regions}
            selectedRegionId={effectiveRegionId}
            onApprove={(institutionId) => {
              const saved = demoApi.approveLocation(
                institutionId,
                roleProfile.userId,
              );
              if (saved) notifyChange();
            }}
          />
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-500">
          Xarita plitkalari tashqi xarita xizmatidan olinadi. Muassasa va
          tashriflar soxta namuna bo‘lib, shaxsiy ma’lumot yuborilmaydi.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section>
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="eyebrow">Muassasalar</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--navy)]">
                  Koordinata holati
                </h2>
              </div>
              <span className="text-sm font-bold text-slate-500">
                {institutions.length} ta namuna
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {institutions.map((institution) => (
                <article
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                  key={institution.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--navy)]">
                        {institution.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {regions.find((item) => item.id === institution.regionId)?.name}
                        {" · "}
                        {institution.district}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        institution.coordinateStatus === "approved"
                          ? "bg-emerald-50 text-emerald-800"
                          : "bg-amber-50 text-amber-800"
                      }`}
                    >
                      {institution.coordinateStatus === "approved"
                        ? "Tasdiqlangan"
                        : "Tekshiruvda"}
                    </span>
                  </div>
                  {institution.coordinateStatus !== "approved" && (
                    <button
                      className="mt-3 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-[var(--navy)] hover:bg-slate-50"
                      onClick={() => {
                        const saved = demoApi.approveLocation(
                          institution.id,
                          roleProfile.userId,
                        );
                        if (saved) notifyChange();
                      }}
                      type="button"
                    >
                      Koordinatani tasdiqlash
                    </button>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section>
            <p className="eyebrow">Tashriflar tarixi</p>
            <h2 className="mt-2 text-xl font-bold text-[var(--navy)]">
              Hududiy uchrashuvlar
            </h2>
            <div className="mt-4 space-y-3">
              {visits.map((visit) => {
                const institution = demoApi
                  .getInstitutions()
                  .find((item) => item.id === visit.institutionId);
                return (
                  <article
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                    key={visit.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-bold text-[var(--navy)]">
                        {institution?.name}
                      </h3>
                      <time className="shrink-0 text-xs text-slate-400">
                        {formatDate(visit.visitedAt)}
                      </time>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {visit.result}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-[var(--brand-link)]">
                      Keyingi vazifa: {visit.nextTask}
                    </p>
                  </article>
                );
              })}
              {!visits.length && (
                <OrnamentalEmptyState className="text-sm text-slate-500">
                  <p>Tanlangan hududda tashrif namunasi yo‘q.</p>
                </OrnamentalEmptyState>
              )}
            </div>
          </section>
        </div>
      </div>
    </AccessGate>
  );
}
