import Link from "next/link";
import type { Department } from "@/types";
import { PlaceholderArt } from "@/components/placeholder-art";

const accentStyles = {
  blue: "border-blue-100 bg-blue-50 text-blue-900",
  gold: "border-amber-100 bg-amber-50 text-amber-950",
  burgundy: "border-blue-100 bg-blue-50 text-blue-900",
  green: "border-emerald-100 bg-emerald-50 text-emerald-950",
};

export function DepartmentCard({
  department,
  index,
}: {
  department: Department;
  index: number;
}) {
  return (
    <Link
      href={`/departments/${department.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative flex h-36 items-end overflow-hidden bg-[var(--navy)] p-5">
        <div className="absolute -right-7 -top-10 size-36 rounded-full border border-[var(--gold)]/40 transition group-hover:scale-110" />
        <div className="absolute right-8 top-8 size-20 rounded-full border border-white/20" />
        <span className="relative inline-grid size-9 place-items-center rounded-full bg-[var(--gold)] text-sm font-black text-[var(--navy)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="relative ml-3 max-w-[80%] text-sm font-bold leading-5 text-white">
          {department.name}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span
          className={`mb-3 w-fit rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${accentStyles[department.accent]}`}
        >
          Markaz yo‘nalishi
        </span>
        <p className="flex-1 text-sm leading-6 text-slate-600">
          {department.summary}
        </p>
        <span className="brand-link mt-5 text-sm font-bold group-hover:underline">
          Batafsil ko‘rish <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export function DepartmentArt({ department }: { department: Department }) {
  return (
    <PlaceholderArt
      title={department.name}
      number={department.code.slice(0, 2).toUpperCase()}
      className="min-h-64"
    />
  );
}
