"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AccessGate } from "@/components/access-gate";
import { useDemo } from "@/components/demo-provider";
import { formatDate } from "@/components/program-card";
import {
  OrnamentDivider,
  OrnamentalEmptyState,
} from "@/components/ornaments";
import {
  demoApi,
  demoRoleProfiles,
  getStatusLabel,
  getStatusStyles,
} from "@/lib/api";
import type { ApplicationStatus } from "@/types";

export default function StaffApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const { role, notifyChange } = useDemo();
  const [message, setMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">(
    "all",
  );
  const profile = demoRoleProfiles[role];
  const application = demoApi.getApplication(params.id);
  const allowedApplications = demoApi.getStaffApplications(
    profile.regionId ?? "",
    profile.assignedProgramIds ?? [],
  );
  const allowed = allowedApplications.some((item) => item.id === params.id);
  const applicant = application
    ? demoApi.getProfileById(application.profileId)
    : undefined;
  const user = application ? demoApi.getUserById(application.userId) : undefined;

  return (
    <AccessGate screen="/staff/applications">
      <div className="section-wrap py-12 sm:py-16">
        <Link
          className="brand-link text-sm font-bold hover:underline"
          href="/staff/applications"
        >
          ← Arizalar ro‘yxatiga qaytish
        </Link>
        {!application || !allowed ? (
          <OrnamentalEmptyState className="mx-auto mt-8 max-w-xl">
            <h1 className="fluid-title font-black text-[var(--navy)]">
              Ruxsat yo‘q
            </h1>
            <p className="mt-3 text-base leading-6 text-slate-600">
              Ariza mavjud emas yoki tanlangan xodimga biriktirilmagan.
            </p>
          </OrnamentalEmptyState>
        ) : (
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_320px]">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <p className="eyebrow">Namuna ariza tafsiloti</p>
              <h1 className="fluid-title mt-3 font-bold text-[var(--navy)]">
                {applicant?.givenName} {applicant?.familyName}
              </h1>
              <OrnamentDivider className="mt-3 max-w-xs" />
              <p className="mt-2 text-sm text-slate-500">
                {demoApi.getProgramName(application.programId)}
              </p>
              <div className="mt-6 grid gap-4 border-y border-slate-100 py-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Hudud</p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {demoApi.getRegionName(application.regionId)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Yuborilgan sana</p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {formatDate(application.submittedAt)}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold text-slate-500">Elektron pochta</p>
                  <p className="mt-1 text-sm font-bold text-slate-800">{user?.email}</p>
                </div>
              </div>
              <h2 className="mt-6 text-sm font-bold text-slate-500">
                Qatnashish maqsadi
              </h2>
              <p className="mt-2 leading-7 text-slate-700">{application.motivation}</p>
              <p className="mt-6 rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-900">
                Ism va aloqa ma’lumotlari faqat soxta namuna sifatida keltirilgan.
              </p>
              <div className="mt-7 border-t border-slate-100 pt-5">
                <h2 className="font-bold text-[var(--navy)]">Holat tarixi</h2>
                <ol className="mt-4 space-y-3">
                  {demoApi.getApplicationHistory(application.id).map((entry) => (
                    <li className="flex gap-3 text-sm" key={entry.id}>
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[var(--gold)]" />
                      <span className="flex-1 text-slate-700">{entry.note}</span>
                      <time className="shrink-0 text-xs text-slate-400">
                        {formatDate(entry.changedAt)}
                      </time>
                    </li>
                  ))}
                </ol>
              </div>
            </article>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
              <p className="eyebrow">Demo amali</p>
              <h2 className="mt-2 text-lg font-bold text-[var(--navy)]">
                Ariza holati
              </h2>
              <span
                className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusStyles(application.status)}`}
              >
                {getStatusLabel(application.status)}
              </span>
              <label className="mt-5 block text-xs font-bold text-slate-600">
                Yangi holat
                <select
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-800"
                  onChange={(event) =>
                    setStatusFilter(event.target.value as ApplicationStatus)
                  }
                  value={statusFilter === "all" ? application.status : statusFilter}
                >
                  {(["submitted", "reviewing", "accepted", "rejected"] as ApplicationStatus[]).map(
                    (status) => (
                      <option value={status} key={status}>
                        {getStatusLabel(status)}
                      </option>
                    ),
                  )}
                </select>
              </label>
              <label className="mt-4 block text-xs font-bold text-slate-600">
                Qayd
                <textarea
                  className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 px-3 py-3 text-sm font-normal text-slate-800"
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Namuna izohini kiriting"
                  value={message}
                />
              </label>
              <button
                className="brand-button mt-4 w-full rounded-xl px-4 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
                disabled={
                  statusFilter === "all" || statusFilter === application.status
                }
                onClick={() => {
                  if (statusFilter === "all") return;
                  demoApi.updateApplicationStatus(
                    application.id,
                    statusFilter,
                    profile.userId,
                    message,
                  );
                  notifyChange();
                  setMessage("Namuna holati yangilandi.");
                }}
                type="button"
              >
                Holatni saqlash
              </button>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                O‘zgarish namuna audit jurnalida ko‘rinadi.
              </p>
            </aside>
          </div>
        )}
      </div>
    </AccessGate>
  );
}
