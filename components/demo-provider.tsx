"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { DemoRole } from "@/types";
import { markDemoStorageReady } from "@/lib/api";

export type DemoLocale = "uz" | "en" | "ru";

interface DemoContextValue {
  role: DemoRole;
  setRole: (role: DemoRole) => void;
  locale: DemoLocale;
  setLocale: (locale: DemoLocale) => void;
  notifyChange: () => void;
  changeKey: number;
}

const DemoContext = createContext<DemoContextValue | null>(null);

let changeRevision = 0;
let browserStorageReady = false;

function subscribeToChanges(listener: () => void) {
  const onChange = () => {
    changeRevision += 1;
    listener();
  };
  window.addEventListener("yd-demo-change", onChange);
  if (!browserStorageReady) {
    browserStorageReady = true;
    markDemoStorageReady();
    changeRevision += 1;
    listener();
  }
  return () => window.removeEventListener("yd-demo-change", onChange);
}

function subscribeToState(listener: () => void) {
  window.addEventListener("yd-demo-state-change", listener);
  return () => window.removeEventListener("yd-demo-state-change", listener);
}

function getRoleSnapshot(): DemoRole {
  const savedRole = window.sessionStorage.getItem("yd-demo-role");
  const roles: DemoRole[] = [
    "public",
    "member",
    "partner",
    "staff",
    "leader",
    "analyst",
    "admin",
  ];
  return savedRole && roles.includes(savedRole as DemoRole)
    ? (savedRole as DemoRole)
    : "public";
}

function getLocaleSnapshot(): DemoLocale {
  const savedLocale = window.sessionStorage.getItem("yd-demo-locale");
  return savedLocale === "en" || savedLocale === "ru" ? savedLocale : "uz";
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const role = useSyncExternalStore<DemoRole>(
    subscribeToState,
    getRoleSnapshot,
    () => "public",
  );
  const locale = useSyncExternalStore<DemoLocale>(
    subscribeToState,
    getLocaleSnapshot,
    () => "uz",
  );
  const changeKey = useSyncExternalStore(
    subscribeToChanges,
    () => changeRevision,
    () => 0,
  );

  const value = useMemo<DemoContextValue>(
    () => ({
      role,
      setRole(nextRole) {
        window.sessionStorage.setItem("yd-demo-role", nextRole);
        window.dispatchEvent(new Event("yd-demo-state-change"));
      },
      locale,
      setLocale(nextLocale) {
        window.sessionStorage.setItem("yd-demo-locale", nextLocale);
        window.dispatchEvent(new Event("yd-demo-state-change"));
      },
      notifyChange() {
        window.dispatchEvent(new Event("yd-demo-change"));
      },
      changeKey,
    }),
    [role, locale, changeKey],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("DemoProvider topilmadi.");
  }
  return context;
}
