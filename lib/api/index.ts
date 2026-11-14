import {
  applicationStatusHistory,
  applications,
  contentPages,
  demoUsers,
  departments,
  events,
  institutions,
  metricDefinitions,
  partnerships,
  profiles,
  programs,
  projects,
  regions,
  visits,
} from "@/data/mock";
import type {
  Application,
  ApplicationStatus,
  ApplicationStatusHistory,
  ApplicationSubmission,
  AuditEntry,
  DemoRole,
  Department,
  Institution,
  MetricDefinition,
  Program,
  Region,
  ReportFilter,
  ReportSummary,
} from "@/types";

const STORAGE_KEYS = {
  applications: "yd-demo-applications",
  history: "yd-demo-application-history",
  audit: "yd-demo-audit",
  approvedLocations: "yd-demo-approved-locations",
} as const;

const MEMBER_DEMO_USER_ID = "user-member-02";

let browserStorageReady = false;

export function markDemoStorageReady(): void {
  browserStorageReady = true;
}

const demoActorNames: Record<string, string> = {
  "user-member-01": "Aziza Namuna",
  "user-member-02": "Sardor Namuna",
  "user-member-03": "Dilnoza Namuna",
  "user-staff-01": "Xodim Namuna",
};

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined" || !browserStorageReady) return fallback;
  const raw = window.localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : fallback;
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("yd-demo-change"));
}

function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const reportMonthNames = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
];

function getReportRanges(period: ReportFilter["period"]) {
  if (period === "week") {
    return Array.from({ length: 4 }, (_, index) => {
      const end = new Date(Date.UTC(2026, 10, 13 - (3 - index) * 7));
      const start = new Date(end);
      start.setUTCDate(end.getUTCDate() - 6);
      return {
        label: `${start.getUTCDate()} ${reportMonthNames[start.getUTCMonth()]}–${end.getUTCDate()} ${reportMonthNames[end.getUTCMonth()]}`,
        start,
        end: new Date(end.getTime() + 86_400_000),
      };
    });
  }

  return reportMonthNames.slice(6).map((label, index) => ({
    label,
    start: new Date(Date.UTC(2026, index + 6, 1)),
    end: new Date(Date.UTC(2026, index + 7, 1)),
  }));
}

export const demoApi = {
  getDepartments(): Department[] {
    return departments;
  },

  getDepartment(slug: string): Department | undefined {
    return departments.find((department) => department.slug === slug);
  },

  getPrograms(): Program[] {
    return programs;
  },

  getProgram(id: string): Program | undefined {
    return programs.find((program) => program.id === id);
  },

  getDepartmentPrograms(departmentId: string): Program[] {
    return programs.filter((program) => program.departmentId === departmentId);
  },

  getRegions(): Region[] {
    return regions;
  },

  getInstitutions(): Institution[] {
    const approved = new Set(
      readStorage<string[]>(STORAGE_KEYS.approvedLocations, []),
    );
    return institutions.map((institution) =>
      approved.has(institution.id)
        ? { ...institution, coordinateStatus: "approved" }
        : institution,
    );
  },

  approveLocation(institutionId: string, actorId: string): boolean {
    const found = institutions.some(
      (institution) => institution.id === institutionId,
    );
    if (!found) return false;
    const approved = readStorage<string[]>(STORAGE_KEYS.approvedLocations, []);
    if (!approved.includes(institutionId)) {
      writeStorage(STORAGE_KEYS.approvedLocations, [...approved, institutionId]);
    }
    this.addAudit({
      actorId,
      actorName: demoActorNames[actorId] ?? "Namuna foydalanuvchi",
      action: "Koordinata tasdiqlandi",
      objectType: "Muassasa",
      objectId: institutionId,
      occurredAt: new Date().toISOString(),
      note: "Demo tasdiqlash amali",
    });
    return true;
  },

  getApplications(): Application[] {
    const merged = new Map(applications.map((application) => [application.id, application]));
    for (const application of readStorage<Application[]>(STORAGE_KEYS.applications, [])) {
      merged.set(application.id, application);
    }
    return [...merged.values()].sort((a, b) =>
      b.submittedAt.localeCompare(a.submittedAt),
    );
  },

  getMemberApplications(userId: string): Application[] {
    return this.getApplications().filter(
      (application) => application.userId === userId,
    );
  },

  getStaffApplications(
    regionId: string,
    assignedProgramIds: string[],
  ): Application[] {
    return this.getApplications().filter(
      (application) =>
        application.regionId === regionId &&
        assignedProgramIds.includes(application.programId),
    );
  },

  getApplication(id: string): Application | undefined {
    return this.getApplications().find((application) => application.id === id);
  },

  getProfileById(profileId: string) {
    return profiles.find((profile) => profile.id === profileId);
  },

  getProfileForUser(userId: string) {
    return profiles.find((profile) => profile.userId === userId);
  },

  getUserById(userId: string) {
    return demoUsers.find((user) => user.id === userId);
  },

  getRegionName(regionId: string) {
    return regions.find((region) => region.id === regionId)?.name ?? "Hudud ko‘rsatilmagan";
  },

  getProgramName(programId: string) {
    return programs.find((program) => program.id === programId)?.name ?? "Dastur ko‘rsatilmagan";
  },

  getPartnerships() {
    return partnerships;
  },

  getPartnerPartnerships(userId: string) {
    if (userId !== "user-partner-01") return [];
    return partnerships.filter((partnership) => partnership.id === "partner-01");
  },

  getApplicationHistory(applicationId: string): ApplicationStatusHistory[] {
    return [
      ...applicationStatusHistory.filter(
        (entry) => entry.applicationId === applicationId,
      ),
      ...readStorage<ApplicationStatusHistory[]>(STORAGE_KEYS.history, []).filter(
        (entry) => entry.applicationId === applicationId,
      ),
    ].sort((a, b) => a.changedAt.localeCompare(b.changedAt));
  },

  submitApplication(
    submission: ApplicationSubmission,
    userId = MEMBER_DEMO_USER_ID,
  ): Application {
    const program = programs.find((item) => item.id === submission.programId);
    if (!program || program.status !== "open") {
      throw new Error("Bu dastur uchun ariza qabul qilinmaydi.");
    }
    if (!submission.motivation.trim()) {
      throw new Error("Maqsad maydonini to‘ldiring.");
    }
    const profile = profiles.find((item) => item.userId === userId);
    if (!profile) {
      throw new Error("Namuna a’zo profili topilmadi.");
    }
    const created: Application = {
      id: makeId("app-demo"),
      programId: program.id,
      userId,
      profileId: profile.id,
      regionId: profile.regionId,
      submittedAt: new Date().toISOString(),
      status: "submitted",
      motivation: submission.motivation.trim(),
    };
    const stored = readStorage<Application[]>(STORAGE_KEYS.applications, []);
    writeStorage(STORAGE_KEYS.applications, [created, ...stored]);
    this.addHistory({
      id: makeId("history"),
      applicationId: created.id,
      previousStatus: null,
      nextStatus: "submitted",
      changedBy: userId,
      changedAt: created.submittedAt,
      note: "Ariza yuborildi",
    });
    this.addAudit({
      actorId: userId,
      actorName: demoActorNames[userId] ?? "A’zo Namuna",
      action: "Ariza yuborildi",
      objectType: "Ariza",
      objectId: created.id,
      occurredAt: created.submittedAt,
      note: `Dastur: ${program.name}`,
    });
    return created;
  },

  updateApplicationStatus(
    applicationId: string,
    nextStatus: ApplicationStatus,
    actorId: string,
    note: string,
  ): Application | undefined {
    const current = this.getApplication(applicationId);
    if (!current) return undefined;
    const stored = readStorage<Application[]>(STORAGE_KEYS.applications, []);
    const updated: Application = { ...current, status: nextStatus };
    const nextApplications = stored.some((item) => item.id === applicationId)
      ? stored.map((item) => (item.id === applicationId ? updated : item))
      : [updated, ...stored];
    writeStorage(STORAGE_KEYS.applications, nextApplications);
    const changedAt = new Date().toISOString();
    this.addHistory({
      id: makeId("history"),
      applicationId,
      previousStatus: current.status,
      nextStatus,
      changedBy: actorId,
      changedAt,
      note: note.trim() || "Ariza holati demo shaklida o‘zgartirildi",
    });
    this.addAudit({
      actorId,
      actorName: demoActorNames[actorId] ?? "Xodim Namuna",
      action: "Ariza holati o‘zgartirildi",
      objectType: "Ariza",
      objectId: applicationId,
      occurredAt: changedAt,
      note: `${current.status} → ${nextStatus}`,
    });
    return updated;
  },

  getAuditEntries(): AuditEntry[] {
    const stored = readStorage<AuditEntry[]>(STORAGE_KEYS.audit, []);
    const sampleEntries: AuditEntry[] = applicationStatusHistory
      .filter(
        (entry) =>
          entry.changedBy !== "user-member-01" &&
          entry.changedBy !== MEMBER_DEMO_USER_ID,
      )
      .map((entry) => ({
        id: entry.id,
        actorId: entry.changedBy,
        actorName: demoActorNames[entry.changedBy] ?? "Namuna foydalanuvchi",
        action: "Ariza holati o‘zgartirildi",
        objectType: "Ariza",
        objectId: entry.applicationId,
        occurredAt: entry.changedAt,
        note: entry.note,
      }));
    return [...stored, ...sampleEntries].sort((a, b) =>
      b.occurredAt.localeCompare(a.occurredAt),
    );
  },

  addAudit(entry: Omit<AuditEntry, "id">): void {
    const audit = readStorage<AuditEntry[]>(STORAGE_KEYS.audit, []);
    writeStorage(
      STORAGE_KEYS.audit,
      [{ ...entry, id: makeId("audit") }, ...audit].slice(0, 100),
    );
  },

  addHistory(entry: ApplicationStatusHistory): void {
    const history = readStorage<ApplicationStatusHistory[]>(
      STORAGE_KEYS.history,
      [],
    );
    writeStorage(STORAGE_KEYS.history, [entry, ...history]);
  },

  getMetrics(): Array<MetricDefinition & { value: number }> {
    return metricDefinitions.map((definition) => {
      let value = 0;
      switch (definition.source) {
        case "profiles":
          value = profiles.length;
          break;
        case "programs":
          value = programs.length;
          break;
        case "partnerships":
          value = partnerships.filter((item) => item.status !== "completed")
            .length;
          break;
        case "regions":
          value = regions.length;
          break;
      }
      return { ...definition, value };
    });
  },

  getEvents() {
    return events;
  },

  getVisits() {
    return visits;
  },

  getProjects() {
    return projects;
  },

  getContentPages() {
    return contentPages;
  },

  getMemberProfile() {
    const profile = profiles.find(
      (item) => item.userId === MEMBER_DEMO_USER_ID,
    );
    if (!profile) {
      throw new Error("Namuna a’zo profili topilmadi.");
    }
    return profile;
  },

  getMemberUser() {
    return demoUsers.find((user) => user.id === MEMBER_DEMO_USER_ID);
  },

  getReports(
    regionId: ReportFilter["regionId"],
    programId: ReportFilter["programId"],
    period: ReportFilter["period"] = "month",
  ) {
    const visibleApplications = this.getApplications().filter((application) => {
      const regionMatches = regionId === "all" || application.regionId === regionId;
      const programMatches =
        programId === "all" || application.programId === programId;
      return regionMatches && programMatches;
    });
    const reportRanges = getReportRanges(period);
    const rangeStart = reportRanges[0]?.start.getTime() ?? Number.NEGATIVE_INFINITY;
    const rangeEnd =
      reportRanges[reportRanges.length - 1]?.end.getTime() ??
      Number.POSITIVE_INFINITY;
    const periodProgramIds = new Set(
      visibleApplications
        .filter((application) => {
          const submittedAt = new Date(application.submittedAt).getTime();
          return submittedAt >= rangeStart && submittedAt < rangeEnd;
        })
        .map((application) => application.programId),
    );
    const visibleVisits = visits.filter((visit) => {
      if (regionId === "all") return true;
      const institution = institutions.find(
        (item) => item.id === visit.institutionId,
      );
      return institution?.regionId === regionId;
    });
    return {
      applications: visibleApplications,
      visits: visibleVisits,
      totalApplications: visibleApplications.length,
      acceptedApplications: visibleApplications.filter(
        (application) => application.status === "accepted",
      ).length,
      activePrograms: programs.filter(
        (program) =>
          program.status === "open" &&
          (regionId === "all" || program.regionIds.includes(regionId)) &&
          (programId === "all" || program.id === programId) &&
          periodProgramIds.has(program.id),
      ).length,
    };
  },

  getReportTimeline(filter: ReportFilter): ReportSummary[] {
    const base = this.getReports(filter.regionId, filter.programId);
    const ranges = getReportRanges(filter.period);

    return ranges.map(({ label, start, end }) => {
      const inRange = (value: string) => {
        const time = new Date(value).getTime();
        return time >= start.getTime() && time < end.getTime();
      };
      const matchingApplications = base.applications.filter((application) =>
        inRange(application.submittedAt),
      );
      const matchingVisits = base.visits.filter((visit) => inRange(visit.visitedAt));
      return {
        label,
        applications: matchingApplications.length,
        accepted: matchingApplications.filter(
          (application) => application.status === "accepted",
        ).length,
        visits: matchingVisits.length,
      };
    });
  },

  getReportBreakdown(
    regionId: ReportFilter["regionId"],
    programId: ReportFilter["programId"],
  ) {
    const filteredApplications = this.getApplications().filter(
      (application) =>
        (regionId === "all" || application.regionId === regionId) &&
        (programId === "all" || application.programId === programId),
    );
    const byRegion = regions
      .filter((region) => regionId === "all" || region.id === regionId)
      .map((region) => ({
        label: region.name,
        value: filteredApplications.filter(
          (application) => application.regionId === region.id,
        ).length,
      }));
    const byProgram = programs
      .filter((program) => programId === "all" || program.id === programId)
      .map((program) => ({
        label: program.name,
        value: filteredApplications.filter(
          (application) => application.programId === program.id,
        ).length,
      }));
    return { byRegion, byProgram };
  },
};

export const demoRoleProfiles: Record<
  DemoRole,
  { label: string; userId: string; regionId?: string; assignedProgramIds?: string[] }
> = {
  public: { label: "Ommaviy", userId: "" },
  member: { label: "A’zo", userId: MEMBER_DEMO_USER_ID },
  partner: { label: "Hamkor", userId: "user-partner-01" },
  staff: {
    label: "Xodim",
    userId: "user-staff-01",
    regionId: "samarkand",
    assignedProgramIds: ["program-academy", "program-dialogue", "program-regional"],
  },
  leader: {
    label: "Bo‘lim rahbari",
    userId: "user-staff-01",
    regionId: "samarkand",
    assignedProgramIds: ["program-academy", "program-dialogue", "program-career", "program-regional"],
  },
  analyst: { label: "Tahlilchi", userId: "user-staff-01" },
  admin: { label: "Admin", userId: "user-staff-01" },
};

export function getStatusLabel(status: ApplicationStatus): string {
  const labels: Record<ApplicationStatus, string> = {
    submitted: "Yuborildi",
    reviewing: "Ko‘rib chiqilmoqda",
    accepted: "Qabul qilindi",
    rejected: "Rad etildi",
  };
  return labels[status];
}

export function getStatusStyles(status: ApplicationStatus): string {
  const styles: Record<ApplicationStatus, string> = {
    submitted: "bg-sky-50 text-sky-800",
    reviewing: "bg-amber-50 text-amber-800",
    accepted: "bg-emerald-50 text-emerald-800",
    rejected: "bg-rose-50 text-rose-800",
  };
  return styles[status];
}
