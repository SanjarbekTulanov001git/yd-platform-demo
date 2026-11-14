export type AccountType = "member" | "partner" | "staff";
export type DemoRole =
  | "public"
  | "member"
  | "partner"
  | "staff"
  | "leader"
  | "analyst"
  | "admin";
export type ApplicationStatus =
  | "submitted"
  | "reviewing"
  | "accepted"
  | "rejected";
export type CoordinateStatus = "unverified" | "approved";

export interface User {
  id: string;
  email: string;
  phone: string;
  accountType: AccountType;
  status: "active" | "pending";
  emailVerifiedAt: string | null;
  phoneVerifiedAt: string | null;
}

export interface Profile {
  id: string;
  userId: string;
  givenName: string;
  familyName: string;
  regionId: string;
  publicProfile: boolean;
  preferredLocale: "uz" | "en" | "ru";
}

export interface Department {
  id: string;
  code: string;
  slug: string;
  name: string;
  summary: string;
  mission: string;
  directions: string[];
  accent: "blue" | "gold" | "burgundy" | "green";
}

export interface Region {
  id: string;
  code: string;
  name: string;
  center: [number, number];
  sampleDistricts: string[];
}

export interface Project {
  id: string;
  code: string;
  departmentId: string;
  regionId: string | null;
  ownerUserId: string;
  status: "active" | "planned" | "completed";
  startsAt: string;
  endsAt: string;
  name: string;
}

export interface Program {
  id: string;
  code: string;
  projectId: string;
  departmentId: string;
  name: string;
  summary: string;
  status: "open" | "planned" | "completed";
  startsAt: string;
  endsAt: string;
  applicationDeadline: string;
  regionIds: string[];
  assignedReviewerIds: string[];
}

export interface Application {
  id: string;
  programId: string;
  userId: string;
  profileId: string;
  regionId: string;
  submittedAt: string;
  status: ApplicationStatus;
  motivation: string;
}

export interface ApplicationStatusHistory {
  id: string;
  applicationId: string;
  previousStatus: ApplicationStatus | null;
  nextStatus: ApplicationStatus;
  changedBy: string;
  changedAt: string;
  note: string;
}

export interface Event {
  id: string;
  programId: string;
  name: string;
  startsAt: string;
  endsAt: string;
  format: "yuzma-yuz" | "masofaviy";
  regionId: string | null;
  visibility: "public" | "internal";
}

export interface Institution {
  id: string;
  name: string;
  type: string;
  address: string;
  regionId: string;
  district: string;
  coordinates: [number, number];
  coordinateStatus: CoordinateStatus;
}

export interface Visit {
  id: string;
  institutionId: string;
  projectId: string;
  recordedBy: string;
  responsibleUserIds: string[];
  visitedAt: string;
  result: string;
  nextTask: string;
}

export interface Partnership {
  id: string;
  name: string;
  departmentId: string;
  projectId: string;
  regionId: string | null;
  status: "active" | "planned" | "completed";
  startsAt: string;
  endsAt: string;
}

export interface ContentPage {
  id: string;
  departmentId: string | null;
  slug: string;
  title: string;
  summary: string;
  status: "published" | "draft";
  locale: "uz" | "en" | "ru";
}

export interface MetricDefinition {
  id: string;
  key: "activeMembers" | "programs" | "partners" | "regions";
  label: string;
  description: string;
  source: "profiles" | "programs" | "partnerships" | "regions";
  calculation: "count-active" | "count-all";
}

export interface AuditEntry {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  objectType: string;
  objectId: string;
  occurredAt: string;
  note: string;
}

export interface ApplicationSubmission {
  programId: string;
  motivation: string;
}

export interface ReportFilter {
  regionId: string | "all";
  programId: string | "all";
  period: "week" | "month";
}

export interface ReportSummary {
  label: string;
  applications: number;
  accepted: number;
  visits: number;
}
