"use client";

import { AccessGate } from "@/components/access-gate";
import { useDemo } from "@/components/demo-provider";
import { formatDate } from "@/components/program-card";
import { OrnamentDivider, OrnamentalEmptyState } from "@/components/ornaments";
import { demoApi, demoRoleProfiles } from "@/lib/api";

export default function AuditPage() {
  const { role, changeKey } = useDemo();
  const roleProfile = demoRoleProfiles[role];
  const allEntries = demoApi.getAuditEntries();
  const entries =
    role === "admin"
      ? allEntries
      : allEntries.filter((entry) => {
          if (role === "staff" && entry.actorId !== roleProfile.userId) return false;
          if (entry.objectType === "Ariza") {
            const application = demoApi.getApplication(entry.objectId);
            if (!application) return false;
            return (
              application.regionId === roleProfile.regionId &&
              roleProfile.assignedProgramIds?.includes(application.programId)
            );
          }
          if (entry.objectType === "Muassasa") {
            const institution = demoApi
              .getInstitutions()
              .find((item) => item.id === entry.objectId);
            return institution?.regionId === roleProfile.regionId;
          }
          return role === "leader";
        });

  return (
    <AccessGate screen="/audit">
      <div className="section-wrap py-12 sm:py-16" key={changeKey}>
        <p className="eyebrow">Muhim amallar qaydi</p>
        <h1 className="serif-heading mt-3 text-3xl font-bold text-[var(--navy)] sm:text-4xl">
          Audit jurnali
        </h1>
        <OrnamentDivider className="mt-3 max-w-xs" />
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Bu namuna jurnalida amal, foydalanuvchi va vaqt ko‘rsatiladi. Haqiqiy
          tizimda bunday jurnalni brauzer foydalanuvchisi o‘zgartira olmaydi.
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 sm:grid-cols-[1fr_1fr_auto]">
            <span>Amal</span>
            <span className="hidden sm:block">Bajargan</span>
            <span>Vaqt</span>
          </div>
          {entries.length ? (
            entries.map((entry) => (
              <article
                className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-100 px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_1fr_auto]"
                key={entry.id}
              >
                <div>
                  <p className="text-sm font-bold text-[var(--navy)]">
                    {entry.action}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {entry.objectType} · namuna yozuvi
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{entry.note}</p>
                </div>
                <p className="hidden text-sm text-slate-600 sm:block">
                  {entry.actorName}
                </p>
                <time className="text-right text-xs text-slate-500">
                  {formatDate(entry.occurredAt)}
                </time>
              </article>
            ))
          ) : (
            <OrnamentalEmptyState className="m-4 text-sm text-slate-500">
              <p>Tanlangan rol uchun audit yozuvi topilmadi.</p>
            </OrnamentalEmptyState>
          )}
        </div>
      </div>
    </AccessGate>
  );
}
