import Link from "next/link";
import { BrandMark } from "@/components/brand-logo";
import { CornerOrnament, OrnamentDivider, PatternGirih } from "@/components/ornaments";

export default function NotFound() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <div className="not-found-panel mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <PatternGirih className="not-found-pattern" />
        <CornerOrnament className="empty-corner-ornament" />
        <BrandMark className="mx-auto h-10" />
        <p className="eyebrow mt-6">Yoshlar Diplomatiya Markazi</p>
        <h1 className="serif-heading mt-3 font-bold text-[var(--navy)]">
          Sahifa topilmadi
        </h1>
        <OrnamentDivider className="mx-auto mt-4 max-w-xs" />
        <p className="relative mt-4 text-base leading-7 text-slate-600">
          Siz izlagan sahifa topilmadi yoki manzili o‘zgargan.
        </p>
        <Link
          className="brand-button relative mt-6 inline-flex rounded-xl px-5 py-3 text-sm font-bold"
          href="/"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
