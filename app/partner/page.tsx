"use client";

import { AccessGate } from "@/components/access-gate";
import { BrandMark } from "@/components/brand-logo";
import { useDemo } from "@/components/demo-provider";
import { demoApi } from "@/lib/api";

export default function PartnerPage() {
  const { role } = useDemo();
  const user = demoApi.getUserById("user-partner-01");
  const items = user ? demoApi.getPartnerPartnerships(user.id) : [];

  return (
    <AccessGate screen="/partner">
      <div className="section-wrap py-12 sm:py-16">
        <p className="eyebrow">Hamkor kabineti</p>
        <h1 className="serif-heading mt-3 text-3xl font-bold text-[var(--navy)] sm:text-4xl">
          Hamkorlik ma’lumotlari
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Bu ekran hamkorning namuna loyihalarini ko‘rsatadi. U haqiqiy tashkilot
          yoki hisob bilan bog‘lanmagan.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <article
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              key={item.id}
            >
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                {item.status === "active" ? "Faol" : "Rejalashtirilgan"}
              </span>
              <h2 className="mt-5 text-xl font-bold text-[var(--navy)]">
                {item.name}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Yo‘nalish:{" "}
                {demoApi.getDepartments().find((d) => d.id === item.departmentId)?.name}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Loyiha: {demoApi.getProjects().find((p) => p.id === item.projectId)?.name}
              </p>
            </article>
          ))}
          {!items.length && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500">
              <BrandMark className="mb-3 h-7" />
              <p>Bu namuna hisobga biriktirilgan hamkorlik yo‘q.</p>
            </div>
          )}
        </div>
        {role === "partner" && (
          <p className="mt-6 text-xs text-slate-400">
            Faqat hamkorning namuna ma’lumotlari ko‘rsatilgan.
          </p>
        )}
      </div>
    </AccessGate>
  );
}
