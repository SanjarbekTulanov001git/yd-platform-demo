"use client";

import dynamic from "next/dynamic";
import type { Institution, Region } from "@/types";

const LeafletMap = dynamic(() => import("@/components/map/leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[420px] place-items-center rounded-2xl bg-slate-100 text-sm text-slate-500">
      Xarita yuklanmoqda
    </div>
  ),
});

export function MapView({
  institutions,
  regions,
  selectedRegionId,
  onApprove,
}: {
  institutions: Institution[];
  regions: Region[];
  selectedRegionId?: string;
  onApprove: (institutionId: string) => void;
}) {
  return (
    <LeafletMap
      institutions={institutions}
      regions={regions}
      selectedRegionId={selectedRegionId}
      onApprove={onApprove}
    />
  );
}
