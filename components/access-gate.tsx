"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand-logo";
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
        <div className="mx-auto max-w-xl rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-sm">
          <BrandMark className="mx-auto h-9" />
          <p className="eyebrow mt-6">Tanlangan rol</p>
          <h1 className="mt-2 text-3xl font-black text-[var(--navy)]">
            Ruxsat yo‘q
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
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
