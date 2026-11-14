import type { Metadata } from "next";
import "./globals.css";
import { BrandLogo } from "@/components/brand-logo";
import { DemoProvider } from "@/components/demo-provider";
import { SiteHeader } from "@/components/site-header";
import { DemoBadge } from "@/components/demo-badge";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Yoshlar Diplomatiya Markazi",
  description: "Yoshlar diplomatiyasi uchun ko‘rgazmali namuna platforma.",
  openGraph: {
    title: "Yoshlar Diplomatiya Markazi",
    description: "Yoshlar diplomatiyasi uchun yagona platforma.",
    siteName: "Yoshlar Diplomatiya Markazi",
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Yoshlar diplomatiyasi uchun yagona platforma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoshlar Diplomatiya Markazi",
    description: "Yoshlar diplomatiyasi uchun yagona platforma.",
    images: [new URL("/opengraph-image.png", siteUrl).toString()],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" data-scroll-behavior="smooth">
      <body>
        <DemoProvider>
          <SiteHeader />
          <main className="page-shell">{children}</main>
          <footer className="border-t border-slate-200 bg-white py-10 sm:py-12">
            <div className="section-wrap flex flex-col gap-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <div className="py-8">
                <BrandLogo className="h-[64px] w-auto" />
              </div>
              <p>Bilim, muloqot va hamkorlik sari</p>
            </div>
          </footer>
          <DemoBadge />
        </DemoProvider>
      </body>
    </html>
  );
}
