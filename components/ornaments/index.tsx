import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand-logo";

type OrnamentProps = {
  className?: string;
};

export function PatternGirih({ className = "" }: OrnamentProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 240 240"
    >
      <g
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.2"
      >
        <path d="m120 12 14 62 62-34-34 62 62 18-62 14 34 62-62-34-14 62-14-62-62 34 34-62-62-14 62-18-34-62 62 34z" />
        <path d="m120 40 9 40 40-22-22 40 40 12-40 9 22 40-40-22-9 40-9-40-40 22 22-40-40-9 40-12-22-40 40 22z" />
        <path d="m120 0 7 28 21-19-9 28 28-4-20 21 28 9-28 8 20 21-28-4 9 28-21-19-7 28-8-28-20 19 8-28-28 4 20-21-28-8 28-9-20-21 28 4-8-28 20 19z" />
        <path d="M0 120h240M120 0v240M35 35l170 170M205 35 35 205" opacity=".55" />
      </g>
    </svg>
  );
}

export function PatternIslimi({ className = "" }: OrnamentProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 360 120"
    >
      <path
        d="M8 104C58 104 54 18 105 18c34 0 18 48 52 48 36 0 28-52 72-52 45 0 34 64 78 64 16 0 30-10 45-30"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <g fill="currentColor">
        <path d="M40 89c-18-3-24-14-24-28 16 4 25 14 24 28Z" />
        <path d="M57 74c-2-18 7-28 22-33 1 17-7 28-22 33Z" />
        <path d="M93 29c-15-9-17-21-12-35 14 9 19 21 12 35Z" />
        <path d="M116 46c1-17 11-25 26-28-3 16-12 25-26 28Z" />
        <path d="M151 64c-14-10-14-22-8-36 13 10 16 23 8 36Z" />
        <path d="M181 50c2-17 12-25 27-27-4 16-13 25-27 27Z" />
        <path d="M226 24c-14-11-13-24-5-37 12 11 14 24 5 37Z" />
        <path d="M253 52c4-17 15-23 30-24-5 16-15 24-30 24Z" />
        <path d="M296 72c-13-12-11-25-2-37 11 12 12 25 2 37Z" />
        <path d="M327 55c7-15 19-20 34-17-8 15-19 21-34 17Z" />
      </g>
    </svg>
  );
}

export function OrnamentDivider({ className = "" }: OrnamentProps) {
  return (
    <svg
      aria-hidden="true"
      className={`ornament-divider ${className}`}
      fill="none"
      focusable="false"
      viewBox="0 0 320 32"
    >
      <path d="M4 16h126m60 0h126" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m160 3 12 13-12 13-12-13zM138 16l8-8m28 16 8-8M132 10l6 6-6 6M188 10l-6 6 6 6"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <circle cx="4" cy="16" r="2" fill="currentColor" />
      <circle cx="316" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}

export function CornerOrnament({ className = "" }: OrnamentProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 84 84"
    >
      <path
        d="M4 80V22C4 12 12 4 22 4h58M12 80V26c0-8 6-14 14-14h54M20 80V30c0-5 5-10 10-10h50M4 62c14 0 20-6 20-20 0-13 6-19 19-19 13 0 19 6 19 19s6 20 18 20M4 72c20 0 30-10 30-30 0-8 4-12 12-12 8 0 12 4 12 12s4 12 18 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path d="m63 4 8 8-8 8-8-8z" fill="currentColor" />
    </svg>
  );
}

export function StarFrame({
  children,
  className = "",
}: OrnamentProps & { children: ReactNode }) {
  return (
    <span className={`ornament-star-frame ${className}`}>
      <svg
        aria-hidden="true"
        className="ornament-star-frame-art"
        fill="none"
        focusable="false"
        viewBox="0 0 64 64"
      >
        <path
          d="m32 2 7 13 14-5-5 14 14 8-14 8 5 14-14-5-7 13-8-13-14 5 5-14L2 32l13-8-5-14 14 5z"
          fill="currentColor"
          fillOpacity=".14"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="m32 10 5 10 11-4-4 11 10 5-10 5 4 11-11-4-5 10-5-10-11 4 4-11-10-5 10-5-4-11 11 4z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.2"
        />
      </svg>
      <span className="ornament-star-frame-content">{children}</span>
    </span>
  );
}

export function GlobeLines({ className = "" }: OrnamentProps) {
  return (
    <svg
      aria-hidden="true"
      className={`globe-lines ${className}`}
      fill="none"
      focusable="false"
      viewBox="0 0 480 480"
    >
      <circle cx="240" cy="240" r="188" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="240" cy="240" rx="92" ry="188" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="240" cy="240" rx="156" ry="188" stroke="currentColor" strokeWidth="1.2" />
      <path d="M66 180c52 36 296 36 348 0M56 240h368M66 300c52-36 296-36 348 0" stroke="currentColor" strokeWidth="1.2" />
      <path className="globe-route globe-route-one" d="M250 232C192 160 154 132 116 118" />
      <path className="globe-route globe-route-two" d="M250 232C300 155 333 130 371 113" />
      <path className="globe-route globe-route-three" d="M250 232C193 290 160 329 126 365" />
      <path className="globe-route globe-route-four" d="M250 232C314 275 348 317 382 355" />
      <circle cx="250" cy="232" r="6" fill="var(--brand-gold)" />
      <circle cx="116" cy="118" r="4" fill="var(--brand-blue)" />
      <circle cx="371" cy="113" r="4" fill="var(--brand-blue)" />
      <circle cx="126" cy="365" r="4" fill="var(--brand-blue)" />
      <circle cx="382" cy="355" r="4" fill="var(--brand-blue)" />
    </svg>
  );
}

export function OliveBranch({ className = "" }: OrnamentProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 160 100"
    >
      <path d="M8 90C56 82 92 52 148 10" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
      <g fill="currentColor">
        <path d="M35 80c-18-1-26-10-29-26 17 2 27 10 29 26Z" />
        <path d="M45 73c-1-18 8-28 24-34 1 17-7 28-24 34Z" />
        <path d="M73 58c-17-3-24-13-24-29 16 4 24 13 24 29Z" />
        <path d="M81 52c1-18 11-27 27-31-3 17-12 27-27 31Z" />
        <path d="M110 32c-15-7-19-18-15-34 15 8 20 19 15 34Z" />
        <path d="M119 28c5-17 16-24 33-24-6 16-17 24-33 24Z" />
      </g>
      <ellipse cx="65" cy="68" rx="5" ry="7" fill="var(--brand-gold)" transform="rotate(-38 65 68)" />
      <ellipse cx="99" cy="43" rx="5" ry="7" fill="var(--brand-gold)" transform="rotate(-38 99 43)" />
    </svg>
  );
}

export function PeaceDove({ className = "" }: OrnamentProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 72 56"
    >
      <path
        d="M5 31c11 1 17-4 22-16 7 8 12 12 22 11l14-8-5 15 9 8-17-1c-7 9-19 12-30 7 4-3 7-7 8-11-7 4-14 4-23 1Z"
        fill="currentColor"
        fillOpacity=".16"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M32 29c7-1 12-5 15-12M32 35c8 2 13 6 17 13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      <circle cx="53" cy="26" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function FooterIkat({ className = "" }: OrnamentProps) {
  return (
    <svg
      aria-hidden="true"
      className={`footer-ikat ${className}`}
      fill="none"
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 1200 40"
    >
      <path d="M0 20h1200" stroke="currentColor" strokeWidth="1" />
      <path
        d="m0 20 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16zm60 0 20-16 20 16-20 16z"
        fill="currentColor"
        fillOpacity=".12"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M0 20 20 4l20 16-20 16zm120 0 20-16 20 16-20 16zm240 0 20-16 20 16-20 16zm360 0 20-16 20 16-20 16zm240 0 20-16 20 16-20 16zm120 0 20-16 20 16-20 16z" stroke="var(--brand-gold)" strokeWidth="1.5" />
    </svg>
  );
}

export function DiplomaticHeroArt() {
  return (
    <div
      aria-label="Toshkentdan dunyoga yo‘nalgan diplomatik aloqa chiziqlari"
      className="diplomatic-hero-art"
      role="img"
    >
      <PatternGirih className="diplomatic-hero-pattern" />
      <svg aria-hidden="true" className="diplomatic-belt diplomatic-belt-top" viewBox="0 0 520 110">
        <path d="M0 40Q260 145 520 40v36Q260 181 0 76Z" fill="currentColor" fillOpacity=".08" />
        <path d="M0 58Q260 163 520 58" stroke="var(--brand-gold)" strokeOpacity=".36" strokeWidth="1.5" />
      </svg>
      <svg aria-hidden="true" className="diplomatic-belt diplomatic-belt-bottom" viewBox="0 0 520 110">
        <path d="M0 34Q260 139 520 34v38Q260 177 0 72Z" fill="currentColor" fillOpacity=".08" />
        <path d="M0 52Q260 157 520 52" stroke="var(--brand-gold)" strokeOpacity=".36" strokeWidth="1.5" />
      </svg>
      <GlobeLines className="diplomatic-globe" />
      <PatternGirih className="diplomatic-orbit-star" />
      <PatternIslimi className="diplomatic-hero-vine" />
      <PeaceDove className="diplomatic-dove" />
      <OliveBranch className="diplomatic-olive" />
      <CornerOrnament className="diplomatic-corner" />
      <p className="diplomatic-hero-caption">Toshkentdan dunyoga muloqot</p>
    </div>
  );
}

export function OrnamentalEmptyState({
  children,
  className = "",
}: OrnamentProps & { children: ReactNode }) {
  return (
    <div className={`ornamental-empty ${className}`}>
      <PatternGirih className="ornamental-empty-pattern" />
      <BrandMark className="ornamental-empty-mark" />
      <OrnamentDivider className="mx-auto mt-3 max-w-48" />
      <div className="relative">{children}</div>
    </div>
  );
}
