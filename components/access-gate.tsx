"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand-logo";
import { CornerOrnament, OrnamentDivider, PatternGirih } from "@/components/ornaments";
import { getAccessReason, hasScreenAccess } from "@/lib/access";
import { useDemo } from "@/components/demo-provider";

export function AccessGate({
  screen,
  children,
}: {
  screen: string;
  children: React.ReactNode;
}) {
  const { role } = useDemo();

  if (!hasScreenAccess(role, screen)) {
    return (
      <section className="section-wrap py-16 sm:py-24">
        <div className="access-denied-panel mx-auto max-w-xl rounded-3xl border border-[var(--line)] bg-white p-6 text-center shadow-sm sm:p-8">
          <PatternGirih className="access-denied-pattern" />
          <CornerOrnament className="empty-corner-ornament" />
          <BrandMark className="mx-auto h-9" />
          <p className="eyebrow mt-6">Tanlangan rol</p>
          <h1 className="fluid-title mt-2 font-black text-[var(--navy)]">
            Ruxsat yo‘q
          </h1>
          <OrnamentDivider className="mx-auto mt-3 max-w-xs" />
          <p className="mt-4 text-base leading-7 text-slate-600">
            {getAccessReason(role, screen)}
          </p>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Bu faqat namuna ko‘rinishidagi ruxsat tekshiruvi. U brauzerda ishlaydi
            va haqiqiy himoya hisoblanmaydi.
          </p>
          <Link
            className="brand-button mt-7 inline-flex rounded-xl px-5 py-3 text-sm font-bold"
            href="/"
          >
            Bosh sahifaga qaytish
          </Link>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
