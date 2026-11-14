import { BrandMark } from "@/components/brand-logo";

export default function Loading() {
  return (
    <div
      aria-label="Sahifa yuklanmoqda"
      className="grid min-h-[50vh] place-items-center"
      role="status"
    >
      <BrandMark className="loading-mark h-14" />
      <span className="sr-only">Sahifa yuklanmoqda</span>
    </div>
  );
}
