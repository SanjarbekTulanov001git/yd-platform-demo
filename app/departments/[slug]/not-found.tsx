import Link from "next/link";
import { BrandMark } from "@/components/brand-logo";

export default function DepartmentNotFound() {
  return (
    <div className="section-wrap py-20 text-center">
      <BrandMark className="mx-auto h-10" />
      <p className="eyebrow">Sahifa topilmadi</p>
      <h1 className="mt-3 text-3xl font-bold text-[var(--navy)]">
        Bunday bo‘lim yo‘q
      </h1>
      <Link
        className="brand-button mt-6 inline-flex rounded-xl px-5 py-3 text-sm font-bold"
        href="/departments"
      >
        Bo‘limlar ro‘yxatiga qaytish
      </Link>
    </div>
  );
}
