import Link from "next/link";
import type { Program } from "@/types";

const months = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentyabr",
  "oktyabr",
  "noyabr",
  "dekabr",
];

export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sana ko‘rsatilmagan";
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function ProgramCard({ program }: { program: Program }) {
  const status =
    program.status === "open"
      ? "Ariza qabul qilinmoqda"
      : program.status === "planned"
        ? "Rejalashtirilgan"
        : "Yakunlangan";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-[var(--gold-light)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[var(--navy)]">
          {status}
        </span>
        <span aria-hidden="true" className="text-lg text-[var(--gold)]">✦</span>
      </div>
      <h3 className="mt-5 text-lg font-bold leading-6 text-[var(--navy)]">
        {program.name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {program.summary}
      </p>
      <div className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <p>Boshlanishi: {formatDate(program.startsAt)}</p>
        <p className="mt-1">Ariza muddati: {formatDate(program.applicationDeadline)}</p>
      </div>
      <Link
        className="brand-button mt-5 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold"
        href={`/programs/${program.id}`}
      >
        Dastur haqida
      </Link>
    </article>
  );
}
