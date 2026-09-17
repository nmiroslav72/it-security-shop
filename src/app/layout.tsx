// @ts-nocheck
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header }      from "@/components/layout/Header";
import { InfoBar }     from "@/components/layout/InfoBar";
import { PromoBar }    from "@/components/layout/PromoBar";
import { Suspense } from "react";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Footer }      from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.diskontvideonadzora.rs"),
  title: "IT Security — Sigurnosne kamere, alarmi, interfoni",
  description:
    "Prodaja i montaza sigurnosnih sistema od 2008. IP kamere, alarmni sistemi, video interfoni.",
  openGraph: {
    type: "website",
    locale: "sr_RS",
    siteName: "IT Security",
    url: "https://www.diskontvideonadzora.rs",
    images: ["/og-default.jpg"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body className={inter.className}>
        <div className="site-shell">
          <Header />
          <InfoBar />
          <PromoBar />
          <div className="body-row">
            <Suspense fallback={<div style={{width:220}}></div>}><LeftSidebar /></Suspense>
            <main className="center-col">{children}</main>
                      <Suspense fallback={<aside style={{width:280}}></aside>}><RightSidebar /></Suspense>
          </div>
          <FloatingButtons />
          <Footer />
        </div>
      </body>
    </html>
  );
}
