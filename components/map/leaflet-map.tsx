"use client";

import { useEffect } from "react";
import { divIcon } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { Institution, Region } from "@/types";

function MapCenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, map, zoom]);
  return null;
}

function makeMarkerIcon(approved: boolean) {
  return divIcon({
    className: "",
    html: `<span class="map-marker ${approved ? "map-marker-approved" : "map-marker-review"}"></span>`,
    iconSize: [23, 23],
    iconAnchor: [11, 11],
    popupAnchor: [0, -11],
  });
}

export default function LeafletMap({
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
  const center: [number, number] = [41.2, 64.8];
  const selectedRegion = regions.find((region) => region.id === selectedRegionId);
  const mapCenter = selectedRegion?.center ?? center;
  const zoom = selectedRegion ? 7 : 5;

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom={false}
      className="demo-map h-[420px] w-full rounded-2xl sm:h-[500px]"
    >
      <MapCenter center={mapCenter} zoom={zoom} />
      <TileLayer
        attribution='Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      {institutions.map((institution) => (
        <Marker
          icon={makeMarkerIcon(institution.coordinateStatus === "approved")}
          key={institution.id}
          position={institution.coordinates}
        >
          <Popup>
            <div className="min-w-48">
              <p className="font-bold text-slate-900">{institution.name}</p>
              <p className="mt-1 text-xs text-slate-600">
                {regions.find((region) => region.id === institution.regionId)?.name}
              </p>
              <p className="mt-2 text-xs text-slate-600">{institution.type}</p>
              <p className="mt-2 text-xs font-bold">
                {institution.coordinateStatus === "approved"
                  ? "Koordinata tasdiqlangan"
                  : "Koordinata tasdiqlanmagan"}
              </p>
              {institution.coordinateStatus !== "approved" && (
                <button
                  className="brand-button mt-3 rounded-lg px-3 py-2 text-xs font-bold"
                  onClick={() => onApprove(institution.id)}
                  type="button"
                >
                  Koordinatani tasdiqlash
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
