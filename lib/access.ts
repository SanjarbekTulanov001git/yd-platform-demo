import type { DemoRole } from "@/types";

export interface DemoNavigationItem {
  href: string;
  label: string;
  group: "public" | "work";
}

const publicNavigation: DemoNavigationItem[] = [
  { href: "/", label: "Bosh sahifa", group: "public" },
  { href: "/departments", label: "Bo‘limlar", group: "public" },
  { href: "/programs", label: "Dasturlar", group: "public" },
  { href: "/architecture", label: "Arxitektura", group: "public" },
];

const roleNavigation: Record<DemoRole, DemoNavigationItem[]> = {
  public: [],
  member: [{ href: "/member", label: "Mening kabinetim", group: "work" }],
  partner: [{ href: "/partner", label: "Hamkor paneli", group: "work" }],
  staff: [
    { href: "/staff/applications", label: "Arizalar", group: "work" },
    { href: "/regions", label: "Hududlar", group: "work" },
    { href: "/audit", label: "Audit jurnali", group: "work" },
  ],
  leader: [
    { href: "/dashboard", label: "Boshqaruv paneli", group: "work" },
    { href: "/staff/applications", label: "Arizalar", group: "work" },
    { href: "/regions", label: "Hududlar", group: "work" },
    { href: "/audit", label: "Audit jurnali", group: "work" },
  ],
  analyst: [
    { href: "/dashboard", label: "Tahlil paneli", group: "work" },
  ],
  admin: [
    { href: "/admin", label: "Tizim boshqaruvi", group: "work" },
    { href: "/audit", label: "Audit jurnali", group: "work" },
  ],
};

const roleScreens: Record<DemoRole, string[]> = {
  public: ["/", "/departments", "/programs", "/architecture"],
  member: ["/member", "/apply"],
  partner: ["/partner"],
  staff: ["/staff/applications", "/regions", "/audit"],
  leader: ["/dashboard", "/staff/applications", "/regions", "/audit"],
  analyst: ["/dashboard"],
  admin: ["/admin", "/audit"],
};

export function getNavigation(role: DemoRole): DemoNavigationItem[] {
  return [...publicNavigation, ...roleNavigation[role]];
}

export function hasScreenAccess(role: DemoRole, screen: string): boolean {
  const allowed = roleScreens[role];
  return allowed.some((route) => screen === route || screen.startsWith(`${route}/`));
}

export function getAccessReason(role: DemoRole, screen: string): string {
  if (screen.startsWith("/staff/applications")) {
    return role === "admin"
      ? "Admin namunada ariza va tarjimai hol ma’lumotlarini odatda ko‘rmaydi."
      : "Arizalarni faqat biriktirilgan xodim yoki bo‘lim rahbari ko‘ra oladi.";
  }
  if (screen.startsWith("/dashboard")) {
    return "Umumiy ko‘rsatkichlar faqat bo‘lim rahbari va tahlilchi uchun ochiq.";
  }
  if (screen.startsWith("/regions")) {
    return "Hududiy yozuvlarni faqat vakolat doirasi belgilangan xodim ko‘ra oladi.";
  }
  if (screen.startsWith("/audit")) {
    return "Audit jurnaliga kirish tanlangan rol uchun berilmagan.";
  }
  return "Bu sahifa tanlangan rol uchun ochiq emas.";
}
