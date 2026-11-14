"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo, BrandMark } from "@/components/brand-logo";
import { useDemo } from "@/components/demo-provider";
import { getNavigation } from "@/lib/access";
import { demoRoleProfiles } from "@/lib/api";
import uz from "@/messages/uz/common";
import en from "@/messages/en/common";
import ru from "@/messages/ru/common";

const messages = { uz, en, ru };

export function SiteHeader() {
  const { locale, setLocale, role, setRole } = useDemo();
  const [menuOpen, setMenuOpen] = useState(false);
  const text = messages[locale];
  const links = getNavigation(role).map((item) => ({
    ...item,
    label:
      item.href === "/"
        ? text.home
        : item.href === "/departments"
          ? text.departments
          : item.href === "/programs"
            ? text.programs
            : item.href === "/architecture"
              ? text.architecture
              : item.label,
  }));
  const roleOptions = Object.entries(demoRoleProfiles) as [
    keyof typeof demoRoleProfiles,
    (typeof demoRoleProfiles)[keyof typeof demoRoleProfiles],
  ][];

  const roleSelector = (
    <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
      <span>Namuna roli</span>
      <select
        aria-label="Namuna rolini tanlash"
        className="max-w-40 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs text-slate-700"
        value={role}
        onChange={(event) =>
          setRole(event.target.value as keyof typeof demoRoleProfiles)
        }
      >
        {roleOptions.map(([value, profile]) => (
          <option value={value} key={value}>
            {profile.label}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="section-wrap">
        <div className="flex min-h-[76px] items-center justify-between gap-5">
          <Link
            href="/"
            aria-label="O'zbekiston Yoshlar Diplomatiya Markazi bosh sahifasi"
            className="brand-logo-link group flex min-w-0 shrink-0 items-center"
          >
            <span className="hidden h-[54px] md:block">
              <BrandLogo
                className="h-full w-auto transition duration-150 group-hover:scale-[1.025] group-hover:brightness-105 motion-reduce:transition-none"
                priority
              />
            </span>
            <span className="h-11 md:hidden">
              <BrandMark className="h-full w-auto transition duration-150 group-hover:scale-[1.025] group-hover:brightness-105 motion-reduce:transition-none" />
            </span>
          </Link>

          <button
            type="button"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Menyuni ochish yoki yopish"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Yopish" : "Menyu"}
          </button>

          <nav className="hidden items-center gap-5 md:flex" aria-label="Asosiy menyu">
            {links.map((link) => (
              <Link
                className="text-xs font-semibold text-slate-600 transition hover:text-[var(--brand-link)]"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>{text.language}</span>
              <select
                aria-label={text.language}
                className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs text-slate-700"
                value={locale}
                onChange={(event) =>
                  setLocale(event.target.value as "uz" | "en" | "ru")
                }
              >
                <option value="uz">O‘zbekcha</option>
                <option value="en">Inglizcha</option>
                <option value="ru">Ruscha</option>
              </select>
            </label>
            {roleSelector}
          </nav>
        </div>
        {menuOpen && (
          <nav
            className="grid gap-1 border-t border-slate-100 py-3 md:hidden"
            aria-label="Asosiy menyu"
          >
            {links.map((link) => (
              <Link
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                href={link.href}
                key={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2">
              {roleSelector}
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <span>{text.language}</span>
                <select
                  aria-label={text.language}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs text-slate-700"
                  value={locale}
                  onChange={(event) =>
                    setLocale(event.target.value as "uz" | "en" | "ru")
                  }
                >
                  <option value="uz">O‘zbekcha</option>
                  <option value="en">Inglizcha</option>
                  <option value="ru">Ruscha</option>
                </select>
              </label>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
