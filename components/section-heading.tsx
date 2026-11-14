export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`serif-heading mt-3 text-3xl font-bold sm:text-4xl ${
          light ? "text-white" : "text-[var(--navy)]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 leading-7 ${light ? "text-white/70" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
