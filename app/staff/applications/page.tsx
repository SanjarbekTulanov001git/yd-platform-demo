"use client";

import Link from "next/link";
import { useState } from "react";
import { AccessGate } from "@/components/access-gate";
import { useDemo } from "@/components/demo-provider";
import { formatDate } from "@/components/program-card";
import { OrnamentDivider, OrnamentalEmptyState } from "@/components/ornaments";
import {
  demoApi,
  demoRoleProfiles,
  getStatusLabel,
  getStatusStyles,
} from "@/lib/api";
import type { ApplicationStatus } from "@/types";

export default function StaffApplicationsPage() {
  const { role, changeKey } = useDemo();
  const roleProfile = demoRoleProfiles[role];
  const [programFilter, setProgramFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const scopedRegion = roleProfile.regionId ?? "";
  const assignedProgramIds = roleProfile.assignedProgramIds ?? [];
  const scopedApplications = demoApi.getStaffApplications(
    scopedRegion,
    assignedProgramIds,
  );
  const visibleApplications = scopedApplications.filter((application) => {
    return (
      (programFilter === "all" || application.programId === programFilter) &&
      (statusFilter === "all" || application.status === statusFilter) &&
      (regionFilter === "all" || application.regionId === regionFilter)
    );
  });
  const availablePrograms = demoApi
    .getPrograms()
    .filter((program) => assignedProgramIds.includes(program.id));

  return (
    <AccessGate screen="/staff/applications">
      <div className="section-wrap py-12 sm:py-16" key={changeKey}>
        <p className="eyebrow">Ko‘rib chiqish</p>
        <h1 className="serif-heading mt-3 text-3xl font-bold text-[var(--navy)] sm:text-4xl">
          Arizalar
        </h1>
        <OrnamentDivider className="mt-3 max-w-xs" />
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Namuna xodim faqat Samarqand viloyatidagi o‘ziga biriktirilgan dastur
          arizalarini ko‘radi. Bu brauzerdagi ko‘rgazmali ruxsat tekshiruvi.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="text-xs font-bold text-slate-600">
              Dastur
              <select
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-800"
                onChange={(event) => setProgramFilter(event.target.value)}
                value={programFilter}
              >
                <option value="all">Barcha biriktirilgan dasturlar</option>
                {availablePrograms.map((program) => (
                  <option value={program.id} key={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-bold text-slate-600">
              Ariza holati
              <select
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-800"
                onChange={(event) => setStatusFilter(event.target.value)}
                value={statusFilter}
              >
                <option value="all">Barcha holatlar</option>
                {(["submitted", "reviewing", "accepted", "rejected"] as ApplicationStatus[]).map(
                  (status) => (
                    <option value={status} key={status}>
                      {getStatusLabel(status)}
                    </option>
                  ),
                )}
              </select>
            </label>
            <label className="text-xs font-bold text-slate-600">
              Hudud
              <select
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-800"
                onChange={(event) => setRegionFilter(event.target.value)}
                value={regionFilter}
              >
                <option value="all">Barcha vakolatli hududlar</option>
                {demoApi
                  .getRegions()
                  .filter((region) => region.id === scopedRegion)
                  .map((region) => (
                    <option value={region.id} key={region.id}>
                      {region.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Ko‘rsatilgan arizalar: {visibleApplications.length}
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {visibleApplications.map((application) => {
            const profile = demoApi.getProfileById(application.profileId);
            return (
              <Link
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[var(--gold)] hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                href={`/staff/applications/${application.id}`}
                key={application.id}
              >
                <div>
                  <p className="font-bold text-[var(--navy)]">
                    {profile?.givenName} {profile?.familyName}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {demoApi.getProgramName(application.programId)}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {demoApi.getRegionName(application.regionId)} ·{" "}
                    {formatDate(application.submittedAt)}
                  </p>
                </div>
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${getStatusStyles(application.status)}`}
                >
                  {getStatusLabel(application.status)}
                </span>
              </Link>
            );
          })}
          {!visibleApplications.length && (
            <OrnamentalEmptyState className="text-sm text-slate-500">
              <p>Tanlangan mezonlarga mos ariza topilmadi.</p>
            </OrnamentalEmptyState>
          )}
        </div>
      </div>
    </AccessGate>
  );
}
