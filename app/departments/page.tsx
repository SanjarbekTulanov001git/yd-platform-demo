"use client";

import { DepartmentCard } from "@/components/department-card";
import { SectionHeading } from "@/components/section-heading";
import { demoApi } from "@/lib/api";

export default function DepartmentsPage() {
  const departments = demoApi.getDepartments();

  return (
    <div className="section-wrap py-12 sm:py-16">
      <SectionHeading
        eyebrow="Markaz tuzilmasi"
        title="Bo‘limlar va yo‘nalishlar"
        description="Markazning o‘nta yo‘nalishi umumiy maqsad va hamkorlik asosida ishlaydi. Bu sahifadagi ma’lumotlar ko‘rgazma uchun tayyorlangan."
      />
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((department, index) => (
          <DepartmentCard
            department={department}
            index={index}
            key={department.id}
          />
        ))}
      </div>
    </div>
  );
}
