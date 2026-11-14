"use client";

import { AccessGate } from "@/components/access-gate";

const demoRoles = [
  ["Ommaviy", "Ochiq sahifalar"],
  ["A’zo", "O‘z profili va arizalari"],
  ["Hamkor", "O‘z hamkorlik yozuvlari"],
  ["Xodim", "Biriktirilgan dastur va hudud"],
  ["Bo‘lim rahbari", "O‘z bo‘limi va hududi"],
  ["Tahlilchi", "Shaxsiy ma’lumotsiz ko‘rsatkichlar"],
  ["Admin", "Tizim sozlamalari va audit"],
];

export default function AdminPage() {
  return (
    <AccessGate screen="/admin">
      <div className="section-wrap py-12 sm:py-16">
        <p className="eyebrow">Namuna boshqaruvi</p>
        <h1 className="serif-heading mt-3 text-3xl font-bold text-[var(--navy)] sm:text-4xl">
          Tizim boshqaruvi
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Admin namunada foydalanuvchi roli va demo bo‘limlarini ko‘radi, ammo
          ariza va tarjimai hol ma’lumotlariga odatiy kirish huquqiga ega emas.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {demoRoles.map(([name, scope]) => (
            <article
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5"
              key={name}
            >
              <p className="font-bold text-[var(--navy)]">{name}</p>
              <p className="text-right text-sm text-slate-500">{scope}</p>
            </article>
          ))}
        </div>
        <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
          Bu sahifadagi ruxsatlar faqat ko‘rgazma uchun. Haqiqiy tizimda
          ma’lumotga kirish serverda tekshirilishi va auditga yozilishi kerak.
        </div>
      </div>
    </AccessGate>
  );
}
