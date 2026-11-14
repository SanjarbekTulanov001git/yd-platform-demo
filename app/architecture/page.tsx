import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { SectionHeading } from "@/components/section-heading";

const stages = [
  {
    number: "01",
    title: "Talablarni aniqlash",
    description: "Bo‘limlar, ruxsatlar, ma’lumotlar va huquqiy talablarni tasdiqlash.",
  },
  {
    number: "02",
    title: "Yadroni yaratish",
    description: "Hisoblar, rollar, audit, ko‘p tilli kontent va boshqaruv.",
  },
  {
    number: "03",
    title: "Akademiya va arizalar",
    description: "Dasturlar, ariza jarayoni, holat tarixi va bildirishnomalar.",
  },
  {
    number: "04",
    title: "Hududlar va tahlil",
    description: "Xarita, tashriflar, import, eksport va hisobotlar.",
  },
  {
    number: "05",
    title: "Tarmoqni kengaytirish",
    description: "Karyera, mentorlik, global tarmoq va mavzuli yo‘nalishlar.",
  },
];

const principles = [
  ["Vakolat", "Har bir amal foydalanuvchining roli va doirasi bo‘yicha tekshiriladi."],
  ["Shaxsiy ma’lumot", "Aloqa ma’lumoti, ariza va tarjimai hol ommaviy sahifalarda ko‘rsatilmaydi."],
  ["Nazorat", "Muhim o‘zgarishlar auditga yoziladi; nashrdan oldin kontent tekshiriladi."],
  ["Barqarorlik", "Ommaviy sahifalar kesh, fayllar alohida ombor va og‘ir ishlar navbat orqali boshqariladi."],
];

export default function ArchitecturePage() {
  return (
    <div className="section-wrap py-12 sm:py-16">
      <SectionHeading
        eyebrow="Taqdimot uchun"
        title="Platforma qanday ishlaydi?"
        description="Ko‘rgazmali chizma yakuniy arxitektura hujjatidagi modulli monolit, xavfsizlik tamoyillari va bosqichma-bosqich qurish rejasiga asoslangan."
      />

      <section className="mt-9 overflow-hidden rounded-3xl bg-[var(--navy)] p-5 text-white sm:p-8">
        <div className="mb-6">
          <BrandLogo className="h-12 w-auto" withPlate />
        </div>
        <h2 className="text-lg font-bold">Tizim chizmasi</h2>
        <div className="mt-6 grid gap-3 text-center sm:grid-cols-5 sm:items-center">
          {[
            ["01", "Ommaviy portal"],
            ["02", "Xodimlar paneli"],
            ["03", "Bitta dasturiy markaz"],
            ["04", "Modulli xizmatlar"],
            ["05", "Ma’lumot va fayl ombori"],
          ].map(([number, label], index) => (
            <div className="contents" key={number}>
              <article className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <span className="mx-auto grid size-8 place-items-center rounded-full bg-[var(--gold)] text-xs font-black text-[var(--navy)]">
                  {number}
                </span>
                <p className="mt-3 text-sm font-bold leading-5">{label}</p>
              </article>
              {index < 4 && (
                <span className="hidden text-2xl text-[var(--gold)] sm:block" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs leading-5 text-white/60">
          Namuna ulanish tuzilmasini tushuntirish uchun berilgan; haqiqiy
          tizimda ma’lumotlar bazasi va fayl ombori alohida ishlaydi.
        </p>
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Keyingi qurilish</p>
            <h2 className="serif-heading mt-3 text-2xl font-bold text-[var(--navy)] sm:text-3xl">
              Bosqichma-bosqich rivojlanish
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Hozirgi namuna faqat taqdimot uchun. Ma’qullangandan keyin to‘liq
            tizim alohida talab va sinovlar asosida quriladi.
          </p>
        </div>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {stages.map((stage) => (
            <li
              className="rounded-2xl border border-slate-200 bg-white p-5"
              key={stage.number}
            >
              <span className="text-xs font-black tracking-widest text-[var(--brand-link)]">
                {stage.number}
              </span>
              <h3 className="mt-3 font-bold text-[var(--navy)]">{stage.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <p className="eyebrow">Boshidan belgilangan himoya</p>
        <h2 className="serif-heading mt-3 text-2xl font-bold text-[var(--navy)] sm:text-3xl">
          Xavfsizlik tamoyillari
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {principles.map(([title, description], index) => (
            <article
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
              key={title}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--gold-light)] text-sm font-black text-[var(--navy)]">
                0{index + 1}
              </span>
              <div>
                <h3 className="font-bold text-[var(--navy)]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          className="brand-button rounded-xl px-5 py-3 text-sm font-bold"
          href="/departments"
        >
          Yo‘nalishlarni ko‘rish
        </Link>
        <Link
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-[var(--navy)]"
          href="/programs"
        >
          Dasturlarni ko‘rish
        </Link>
      </div>
    </div>
  );
}
