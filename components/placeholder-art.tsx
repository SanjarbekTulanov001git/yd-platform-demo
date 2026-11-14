export function PlaceholderArt({
  title,
  number,
  className = "",
}: {
  title: string;
  number: string;
  className?: string;
}) {
  return (
    <div
      className={`relative isolate flex min-h-52 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[var(--navy-soft)] via-[var(--navy)] to-[var(--navy-deep)] p-6 text-white ${className}`}
      role="img"
      aria-label={`Rasm uchun joy: ${title}`}
    >
      <div className="absolute -right-6 -top-10 size-44 rounded-full border border-[var(--gold)]/40" />
      <div className="absolute -right-1 top-5 size-28 rounded-full border border-white/20" />
      <div className="absolute -bottom-16 right-16 size-48 rounded-full border border-[var(--gold)]/25" />
      <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-black/25 to-transparent" />
      <div className="relative mt-auto">
        <span className="mb-3 inline-grid size-9 place-items-center rounded-full bg-[var(--gold)] text-sm font-extrabold text-[var(--navy-deep)]">
          {number}
        </span>
        <p className="max-w-xs text-sm font-bold leading-6">{title}</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/55">
          Rasm uchun namuna joy
        </p>
      </div>
    </div>
  );
}
