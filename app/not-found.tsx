import Link from "next/link";
import { BrandMark } from "@/components/brand-logo";

export default function NotFound() {
  return (
    <div className="section-wrap py-20 text-center">
      <BrandMark className="mx-auto h-10" />
      <p className="eyebrow mt-6">Sahifa topilmadi</p>
      <h1 className="serif-heading mt-3 text-3xl font-bold text-[var(--navy)]">
        Bunday sahifa yo‘q
      </h1>
      <Link
        className="brand-button mt-6 inline-flex rounded-xl px-5 py-3 text-sm font-bold"
        href="/"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
