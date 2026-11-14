"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand-logo";
import { AccessGate } from "@/components/access-gate";
import { useDemo } from "@/components/demo-provider";
import { formatDate } from "@/components/program-card";
import { demoApi, getStatusLabel, getStatusStyles } from "@/lib/api";

export default function MemberCabinetPage() {
  const { role, changeKey } = useDemo();

  if (role !== "member") {
    return (
      <AccessGate screen="/member">
        <></>
      </AccessGate>
    );
  }

  const user = demoApi.getMemberUser();
  const profile = demoApi.getMemberProfile();
  const myApplications = user ? demoApi.getMemberApplications(user.id) : [];

  return (
    <AccessGate screen="/member">
      <div className="section-wrap py-12 sm:py-16" key={changeKey}>
        <p className="eyebrow">A’zo kabineti</p>
        <h1 className="serif-heading mt-3 text-3xl font-bold text-[var(--navy)] sm:text-4xl">
          Salom, {profile.givenName} {profile.familyName}
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Bu kabinetda faqat namuna a’zoning o‘z ma’lumotlari va arizalari
          ko‘rsatiladi.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
            <div className="grid size-14 place-items-center rounded-2xl bg-[var(--navy)] text-xl font-black text-white">
              AN
            </div>
            <h2 className="mt-4 text-lg font-bold text-[var(--navy)]">
              {profile.givenName} {profile.familyName}
            </h2>
            <p className="mt-1 text-sm text-slate-500">A’zo · namuna hisob</p>
            <dl className="mt-5 space-y-4 border-t border-slate-100 pt-5 text-sm">
              <div>
                <dt className="text-xs font-semibold text-slate-500">Elektron pochta</dt>
                <dd className="mt-1 break-all font-medium text-slate-800">
                  {user?.email}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-slate-500">Telefon</dt>
                <dd className="mt-1 font-medium text-slate-800">{user?.phone}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-slate-500">Hudud</dt>
                <dd className="mt-1 font-medium text-slate-800">
                  {demoApi.getRegionName(profile.regionId)}
                </dd>
              </div>
            </dl>
            <p className="mt-5 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
              Ko‘rsatilgan aloqa ma’lumotlari to‘liq soxta namuna hisoblanadi.
            </p>
          </aside>

          <section>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Arizalarim</p>
                <h2 className="mt-2 text-2xl font-bold text-[var(--navy)]">
                  Yuborilgan arizalar
                </h2>
              </div>
              <Link
                className="brand-button rounded-xl px-4 py-3 text-sm font-bold"
                href="/programs"
              >
                Dasturlarni ko‘rish
              </Link>
            </div>
            <div className="mt-5 space-y-4">
              {myApplications.length ? (
                myApplications.map((application) => (
                  <article
                    className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
                    key={application.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-[var(--navy)]">
                          {demoApi.getProgramName(application.programId)}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Yuborilgan: {formatDate(application.submittedAt)}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusStyles(application.status)}`}
                      >
                        {getStatusLabel(application.status)}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {application.motivation}
                    </p>
                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        Holat tarixi
                      </p>
                      <ol className="mt-3 space-y-3">
                        {demoApi
                          .getApplicationHistory(application.id)
                          .map((entry) => (
                            <li
                              className="flex gap-3 text-sm"
                              key={entry.id}
                            >
                              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[var(--gold)]" />
                              <span className="flex-1 text-slate-700">
                                {entry.note}
                              </span>
                              <time className="shrink-0 text-xs text-slate-400">
                                {formatDate(entry.changedAt)}
                              </time>
                            </li>
                          ))}
                      </ol>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                  <BrandMark className="mx-auto mb-3 h-7" />
                  <p>Hozircha ariza yuborilmagan.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </AccessGate>
  );
}
