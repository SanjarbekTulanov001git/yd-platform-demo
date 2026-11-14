"use client";

import { useState } from "react";
import { ProgramCard } from "@/components/program-card";
import { SectionHeading } from "@/components/section-heading";
import { FilterPanel } from "@/components/filter-panel";
import { OrnamentalEmptyState } from "@/components/ornaments";
import { demoApi } from "@/lib/api";

export default function ProgramsPage() {
  const programs = demoApi.getPrograms();
  const departments = demoApi.getDepartments();
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const visiblePrograms = programs.filter((program) => {
    const matchesDepartment =
      departmentFilter === "all" || program.departmentId === departmentFilter;
    const matchesStatus =
      statusFilter === "all" || program.status === statusFilter;
    const normalizedSearch = searchText.trim().toLowerCase();
    const matchesText =
      !normalizedSearch ||
      `${program.name} ${program.summary}`.toLowerCase().includes(normalizedSearch);
    return matchesDepartment && matchesStatus && matchesText;
  });

  return (
    <div className="section-wrap py-12 sm:py-16">
      <SectionHeading
        eyebrow="Ishtirok etish imkoniyatlari"
        title="Dasturlar va mashg‘ulotlar"
        description="Dasturlar hamda ularning muddatlari soxta ma’lumotlar bilan ko‘rsatilgan."
      />
      <div className="mt-8">
        <FilterPanel>
          <div className="grid gap-3 md:grid-cols-3">
            <label className="text-xs font-bold text-slate-600">
              Dastur nomi
              <input
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3 text-sm font-medium text-slate-800"
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Dasturdan qidiring"
                type="search"
                value={searchText}
              />
            </label>
            <label className="text-xs font-bold text-slate-600">
              Bo‘lim
              <select
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-800"
                onChange={(event) => setDepartmentFilter(event.target.value)}
                value={departmentFilter}
              >
                <option value="all">Barcha bo‘limlar</option>
                {departments.map((department) => (
                  <option value={department.id} key={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-bold text-slate-600">
              Holat
              <select
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-800"
                onChange={(event) => setStatusFilter(event.target.value)}
                value={statusFilter}
              >
                <option value="all">Barcha holatlar</option>
                <option value="open">Ariza qabul qilinmoqda</option>
                <option value="planned">Rejalashtirilgan</option>
              </select>
            </label>
          </div>
        </FilterPanel>
        <p className="mt-3 text-xs text-slate-500">
          Ko‘rsatilgan dasturlar: {visiblePrograms.length}
        </p>
      </div>
      {visiblePrograms.length ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visiblePrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      ) : (
        <OrnamentalEmptyState className="mt-5 text-sm text-slate-500">
          <p>Tanlangan mezonlarga mos dastur topilmadi.</p>
        </OrnamentalEmptyState>
      )}
    </div>
  );
}
