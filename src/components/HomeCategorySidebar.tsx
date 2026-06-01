import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Sub = { label: string; href: string };
type Group = {
  title: string;
  countKey: "CAMERAS" | "ALARMS" | "INTERCOMS" | "DVR";
  href: string;
  subs: Sub[];
  icon: React.ReactNode;
};

const groups: Group[] = [
  {
    title: "Video nadzor",
    countKey: "CAMERAS",
    href: "/shop?kategorija=kamere",
    icon: <IconCamera />,
    subs: [
      { label: "Sve kamere", href: "/shop?kategorija=kamere" },
      { label: "IP kamere", href: "/shop?kategorija=kamere&tip=IP#proizvodi" },
      { label: "Analogne kamere", href: "/shop?kategorija=kamere&tip=Analogna#proizvodi" },
      { label: "WiFi kamere", href: "/shop?kategorija=kamere&tip=WiFi#proizvodi" },
      { label: "Kompleti sa ugradnjom", href: "/shop?kategorija=kamere&komplet=da#proizvodi" },
    ],
  },
  {
    title: "Alarmi",
    countKey: "ALARMS",
    href: "/shop?kategorija=alarmi",
    icon: <IconShield />,
    subs: [
      { label: "Svi alarmi", href: "/shop?kategorija=alarmi" },
      { label: "Centrale", href: "/shop?kategorija=alarmi&vrsta=centrale#proizvodi" },
      { label: "Detektori", href: "/shop?kategorija=alarmi&vrsta=detektori#proizvodi" },
      { label: "Sirene", href: "/shop?kategorija=alarmi&vrsta=sirene#proizvodi" },
      { label: "Daljinske komande", href: "/shop?kategorija=alarmi&vrsta=daljinske+komande#proizvodi" },
      { label: "Akumulatori", href: "/shop?kategorija=alarmi&vrsta=akumulatori#proizvodi" },
    ],
  },
  {
    title: "Interfoni",
    countKey: "INTERCOMS",
    href: "/shop?kategorija=interfoni",
    icon: <IconIntercom />,
    subs: [
      { label: "Svi interfoni", href: "/shop?kategorija=interfoni" },
      { label: "Video interfoni", href: "/shop?kategorija=interfoni&tip_interfona=video#proizvodi" },
      { label: "Audio interfoni", href: "/shop?kategorija=interfoni&tip_interfona=audio#proizvodi" },
      { label: "Kompleti", href: "/shop?kategorija=interfoni&vrsta=komplet#proizvodi" },
    ],
  },
  {
    title: "DVR snimači",
    countKey: "DVR",
    href: "/shop?kategorija=dvr",
    icon: <IconDvr />,
    subs: [
      { label: "Svi snimači", href: "/shop?kategorija=dvr" },
      { label: "NVR (IP)", href: "/shop?kategorija=dvr&tehnologija=IP#proizvodi" },
      { label: "DVR (analogni)", href: "/shop?kategorija=dvr&tehnologija=Analogna#proizvodi" },
      { label: "4-kanalni", href: "/shop?kategorija=dvr&kanali=4#proizvodi" },
      { label: "8-kanalni", href: "/shop?kategorija=dvr&kanali=8#proizvodi" },
      { label: "16-kanalni", href: "/shop?kategorija=dvr&kanali=16#proizvodi" },
    ],
  },
];

export async function HomeCategorySidebar() {
  // Brzi count po glavnoj kategoriji (samo aktivni proizvodi)
  const counts = await prisma.product
    .groupBy({
      by: ["category"],
      where: { isActive: true },
      _count: { _all: true },
    })
    .catch(() => []);

  const countMap: Record<string, number> = {};
  for (const c of counts) {
    countMap[c.category] = c._count._all;
  }

  return (
    <aside className="hidden lg:block">
      <nav
        aria-label="Kategorije proizvoda"
        className="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-soft backdrop-blur-sm"
      >
        <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted">
          Kategorije
        </p>

        <ul className="space-y-1">
          {groups.map((g) => {
            const count = countMap[g.countKey] ?? 0;
            return (
              <li key={g.title}>
                <Link
                  href={g.href}
                  className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition hover:bg-brand/5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                    {g.icon}
                  </span>
                  <span className="flex flex-1 items-center justify-between gap-2">
                    <span className="text-sm font-bold text-ink">{g.title}</span>
                    {count > 0 && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-ink-muted group-hover:bg-brand/10 group-hover:text-brand">
                        {count}
                      </span>
                    )}
                  </span>
                </Link>

                <ul className="ml-9 mt-0.5 space-y-0.5 border-l border-slate-100 pl-3">
                  {g.subs.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="block rounded px-2 py-1 text-xs text-ink-muted transition hover:bg-slate-50 hover:text-brand"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <Link
          href="/shop"
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-white transition hover:bg-brand-dark"
        >
          Otvori prodavnicu →
        </Link>
      </nav>

      {/* Mali "support card" ispod */}
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
          Treba savet?
        </p>
        <p className="mt-1 text-xs leading-relaxed text-ink-muted">
          Pozovi nas — savetujemo besplatno i izlazimo na adresu radi procene.
        </p>
        <a
          href="tel:+38163224651"
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-brand/30 px-3 py-2 text-xs font-bold text-brand hover:bg-brand/5"
        >
          +381 63 224 651
        </a>
      </div>
    </aside>
  );
}

function IconCamera() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="M16 10l6-3v10l-6-3" />
      <circle cx="9" cy="12" r="2.5" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z" />
      <path d="M9.5 12l2 2 3.5-4" />
    </svg>
  );
}
function IconIntercom() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="8" r="2" />
      <path d="M9 13h6M9 16h6" />
    </svg>
  );
}
function IconDvr() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="7" cy="12" r="1" />
      <circle cx="11" cy="12" r="1" />
      <path d="M15 11h4M15 13h4" />
    </svg>
  );
}
