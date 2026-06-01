import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { PromoBar } from "@/components/layout/PromoBar";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "IT Security — Sigurnosne kamere, alarmi, interfoni",
  description:
    "Prodaja i montaža sigurnosnih sistema od 2008. IP kamere, alarmni sistemi, video interfoni.",
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
          <PromoBar />
          <div className="body-row">
            <LeftSidebar />
            <main className="center-col">{children}</main>
            <RightSidebar />
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
