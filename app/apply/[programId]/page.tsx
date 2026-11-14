"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AccessGate } from "@/components/access-gate";
import { BrandMark } from "@/components/brand-logo";
import { useDemo } from "@/components/demo-provider";
import { formatDate } from "@/components/program-card";
import { demoApi } from "@/lib/api";

export default function ApplyPage() {
  const params = useParams<{ programId: string }>();
  const { role, notifyChange } = useDemo();
  const [motivation, setMotivation] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const program = demoApi.getProgram(params.programId);

  if (role !== "member") {
    return (
      <AccessGate screen="/apply">
        <></>
      </AccessGate>
    );
  }

  if (!program) {
    return (
      <AccessGate screen="/apply">
        <div className="section-wrap py-16">
          <BrandMark className="h-9" />
          <h1 className="text-2xl font-bold text-[var(--navy)]">
            Dastur topilmadi
          </h1>
          <Link className="brand-link mt-4 inline-block text-sm font-bold" href="/programs">
            Dasturlar ro‘yxatiga qaytish
          </Link>
        </div>
      </AccessGate>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (motivation.trim().length < 20) {
      setError("Maqsad matni kamida 20 ta belgidan iborat bo‘lsin.");
      return;
    }
    if (motivation.trim().length > 700) {
      setError("Maqsad matni 700 ta belgidan oshmasin.");
      return;
    }
    try {
      demoApi.submitApplication({
        programId: params.programId,
        motivation: motivation.trim(),
      });
      notifyChange();
      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Arizani yuborib bo‘lmadi.",
      );
    }
  }

  return (
    <AccessGate screen="/apply">
      <div className="section-wrap py-12 sm:py-16">
        <Link
          className="brand-link text-sm font-bold hover:underline"
          href={`/programs/${program.id}`}
        >
          ← Dastur sahifasiga qaytish
        </Link>
        <div className="mx-auto mt-7 max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <p className="eyebrow">Namuna ariza shakli</p>
          <h1 className="fluid-title mt-3 font-bold text-[var(--navy)]">
            {program.name}
          </h1>
          <p className="mt-3 leading-6 text-slate-600">
            Ariza muddati: {formatDate(program.applicationDeadline)}
          </p>
          <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Bu ko‘rgazmali shakl. Faqat soxta ma’lumotdan foydalaning; kiritilgan
            matn tashqi xizmatga yuborilmaydi.
          </p>

          {submitted ? (
            <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="text-lg font-bold text-emerald-900">Ariza yuborildi</p>
              <p className="mt-2 text-sm leading-6 text-emerald-800">
                Namuna arizasi brauzer xotirasida saqlandi. Holati: yuborildi.
              </p>
              <Link
                className="brand-button mt-5 inline-flex rounded-xl px-4 py-3 text-sm font-bold"
                href="/member"
              >
                Kabinetdagi arizani ko‘rish
              </Link>
            </div>
          ) : (
            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm font-bold text-slate-700">
                Dasturda qatnashish maqsadi
                <textarea
                  className="mt-2 min-h-36 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal leading-6 text-slate-800"
                  maxLength={700}
                  minLength={20}
                  onChange={(event) => setMotivation(event.target.value)}
                  placeholder="Nima o‘rganmoqchi ekaningizni yozing"
                  required
                  value={motivation}
                />
                <span className="mt-1 block text-right text-xs font-normal text-slate-400">
                  {motivation.length}/700
                </span>
              </label>
              {error && (
                <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800" role="alert">
                  {error}
                </p>
              )}
              <button
                className="brand-button w-full rounded-xl px-5 py-3.5 text-sm font-extrabold"
                type="submit"
              >
                Arizani yuborish
              </button>
            </form>
          )}
        </div>
      </div>
    </AccessGate>
  );
}
