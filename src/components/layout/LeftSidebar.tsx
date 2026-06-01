// @ts-nocheck
"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORY_TREE = [
  {
    slug: "video-nadzor",
    label: "Video nadzor",
    icon: "📷",
    color: "#1d3eb8",
    children: [
      { slug: "hd-kamere",                     label: "HD kamere" },
      { slug: "ip-kamere",                     label: "IP kamere" },
      { slug: "wifi-kamere-bezicne",           label: "WiFi kamere" },
      { slug: "dvr-digitalni-snimaci",         label: "DVR snimaci" },
      { slug: "nvr-mrezni-snimaci",            label: "NVR snimaci" },
      { slug: "kompleti-video-nadzora",        label: "Kompleti" },
      { slug: "dodatna-oprema-za-videonadzor", label: "Dodatna oprema" },
    ],
  },
  {
    slug: "alarmi",
    label: "Alarmi",
    icon: "🔔",
    color: "#c62828",
    children: [
      { slug: "zicani-alarmi",  label: "Zicani alarmi" },
      { slug: "bezicni-alarmi", label: "Bezicni alarmi" },
    ],
  },
  {
    slug: "interfoni",
    label: "Interfoni",
    icon: "🔊",
    color: "#2e7d32",
    children: [
      { slug: "audio-interfoni", label: "Audio interfoni" },
      { slug: "video-interfoni", label: "Video interfoni" },
    ],
  },
];

const VIDEO_NADZOR_SLUGS = new Set([
  "hd-kamere", "ip-kamere", "wifi-kamere-bezicne",
  "dvr-digitalni-snimaci", "nvr-mrezni-snimaci",
  "kompleti-video-nadzora", "dodatna-oprema-za-videonadzor", "video-nadzor",
]);

const ALARM_SLUGS = new Set(["alarmi", "zicani-alarmi", "bezicni-alarmi"]);

const VIDEO_BRANDS = ["Hikvision", "Dahua", "Imou", "Uniview", "TVT"];
const VIDEO_REZOLUCIJE = ["2MPX", "4MPX", "5MPX", "6MPX", "8MPX"];
const ALARM_BRANDS = ["Dahua", "Hikvision", "Ajax", "Paradox", "Jablotron"];
const ALARM_TYPES = ["Bezicni alarmi", "Zicani alarmi"];

export function LeftSidebar() {
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const router       = useRouter();
  const isShop       = pathname.startsWith("/shop");
  const currentCat   = searchParams.get("category") ?? "";

  const isVideoNadzor = VIDEO_NADZOR_SLUGS.has(currentCat) || currentCat === "";
  const isAlarmi = ALARM_SLUGS.has(currentCat);

  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const g of CATEGORY_TREE) {
      init[g.slug] = currentCat === g.slug || g.children.some((c) => c.slug === currentCat);
    }
    return init;
  });

  function toggleOpen(slug: string) {
    setOpen((prev) => ({ ...prev, [slug]: !prev[slug] }));
  }

  function toggleFilter(key: string, value: string) {
    const params  = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);
    params.delete(key);
    if (current.includes(value)) {
      current.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      [...current, value].forEach((v) => params.append(key, v));
    }
    router.push(`/shop?${params.toString()}`);
  }

  function toggleAlarmType(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", slug);
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <aside className="sb">
      <div className="sb-section">
        <p className="sb-heading">Kategorije</p>
        {CATEGORY_TREE.map((group) => {
          const isGroupActive = currentCat === group.slug || group.children.some((c) => c.slug === currentCat);
          const isGroupOpen = open[group.slug];
          return (
            <div key={group.slug} className="sb-group">
              <div
                className={"sb-parent" + (isGroupActive ? " sb-parent--active" : "")}
                style={isGroupActive ? { borderLeftColor: group.color } : {}}
                onClick={() => toggleOpen(group.slug)}
              >
                <span className="sb-icon">{group.icon}</span>
                <Link href={"/shop?category=" + group.slug} className="sb-parent-label" onClick={(e) => e.stopPropagation()}>
                  {group.label}
                </Link>
                <span className={"sb-arrow" + (isGroupOpen ? " sb-arrow--open" : "")}>{"›"}</span>
              </div>
              {isGroupOpen && (
                <div className="sb-children">
                  {group.children.map((child) => {
                    const isActive = currentCat === child.slug;
                    return (
                      <Link
                        key={child.slug}
                        href={"/shop?category=" + child.slug}
                        className={"sb-child" + (isActive ? " sb-child--active" : "")}
                      >
                        {isActive && <span className="sb-dot" style={{ background: group.color }} />}
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isShop && isVideoNadzor && (
        <>
          <div className="sb-section">
            <p className="sb-heading">Brend</p>
            <div className="sb-chips">
              {VIDEO_BRANDS.map((brand) => {
                const checked = searchParams.getAll("brand").includes(brand);
                return (
                  <label key={brand} className={"sb-chip" + (checked ? " sb-chip--on" : "")}>
                    <input type="checkbox" checked={checked} onChange={() => toggleFilter("brand", brand)} />
                    {brand}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="sb-section">
            <p className="sb-heading">Rezolucija</p>
            <div className="sb-chips">
              {VIDEO_REZOLUCIJE.map((rez) => {
                const checked = searchParams.getAll("rezolucija").includes(rez);
                return (
                  <label key={rez} className={"sb-chip" + (checked ? " sb-chip--on" : "")}>
                    <input type="checkbox" checked={checked} onChange={() => toggleFilter("rezolucija", rez)} />
                    {rez}
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}

      {isShop && isAlarmi && (
        <>
          <div className="sb-section">
            <p className="sb-heading">Tip alarma</p>
            <div className="sb-chips">
              {[
                { slug: "bezicni-alarmi", label: "Bezicni alarmi" },
                { slug: "zicani-alarmi",  label: "Zicani alarmi" },
              ].map((t) => (
                <label key={t.slug} className={"sb-chip" + (currentCat === t.slug ? " sb-chip--on" : "")}>
                  <input type="checkbox" checked={currentCat === t.slug} onChange={() => toggleAlarmType(t.slug)} />
                  {t.label}
                </label>
              ))}
            </div>
          </div>
          <div className="sb-section">
            <p className="sb-heading">Brend</p>
            <div className="sb-chips">
              {ALARM_BRANDS.map((brand) => {
                const checked = searchParams.getAll("brand").includes(brand);
                return (
                  <label key={brand} className={"sb-chip" + (checked ? " sb-chip--on" : "")}>
                    <input type="checkbox" checked={checked} onChange={() => toggleFilter("brand", brand)} />
                    {brand}
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}

      <div className="sb-contact">
        <p className="sb-contact-title">Potrebna pomoc?</p>
        <a href="tel:063224651" className="sb-contact-phone">📞 063224651</a>
        <p className="sb-contact-hours">Pon-Ned: 09-21h</p>
      </div>

      <style>{`
        .sb { background: #fff; border-right: 1px solid rgba(0,0,0,0.08); overflow-y: auto; position: sticky; top: var(--header-height); height: calc(100vh - var(--header-height)); display: flex; flex-direction: column; }
        .sb-section { padding: 14px 10px 8px; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .sb-heading { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--ink-muted); margin-bottom: 8px; padding-left: 4px; }
        .sb-group { margin-bottom: 2px; }
        .sb-parent { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px; cursor: pointer; transition: background 0.12s; border-left: 3px solid transparent; }
        .sb-parent:hover { background: #dde4ff; }
        .sb-parent--active { background: #eef2ff; border-left-color: var(--brand); }
        .sb-icon { font-size: 14px; flex-shrink: 0; }
        .sb-parent-label { flex: 1; font-size: 13px; font-weight: 600; color: var(--ink); text-decoration: none; }
        .sb-parent--active .sb-parent-label { color: var(--brand); }
        .sb-arrow { font-size: 16px; color: var(--ink-muted); transition: transform 0.2s; line-height: 1; }
        .sb-arrow--open { transform: rotate(90deg); }
        .sb-children { margin: 2px 0 4px 16px; border-left: 2px solid rgba(0,0,0,0.08); padding-left: 4px; }
        .sb-child { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--ink-muted); padding: 6px 10px; border-radius: 6px; text-decoration: none; transition: all 0.12s; }
        .sb-child:hover { color: var(--brand); background: #dde4ff; font-weight: 600; }
        .sb-child--active { color: var(--brand); font-weight: 600; background: #eef2ff; }
        .sb-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .sb-chips { display: flex; flex-wrap: wrap; gap: 5px; padding-bottom: 6px; }
        .sb-chip { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; color: var(--ink-muted); background: #f4f5f8; border: 1.5px solid transparent; border-radius: 20px; padding: 4px 10px; cursor: pointer; transition: all 0.12s; }
        .sb-chip:hover { border-color: var(--brand); color: var(--brand); background: #dde4ff; }
        .sb-chip--on { background: #eef2ff; border-color: var(--brand); color: var(--brand); font-weight: 600; }
        .sb-chip input { display: none; }
        .sb-contact { margin: auto 8px 8px; padding: 14px 12px; background: linear-gradient(135deg, #1d3eb8 0%, #152a85 100%); border-radius: 10px; }
        .sb-contact-title { font-size: 11px; color: rgba(255,255,255,0.7); margin-bottom: 6px; }
        .sb-contact-phone { display: block; font-size: 14px; font-weight: 700; color: #f6d000; text-decoration: none; margin-bottom: 4px; }
        .sb-contact-phone:hover { color: #fff; }
        .sb-contact-hours { font-size: 11px; color: rgba(255,255,255,0.5); margin: 0; }
      `}</style>
    </aside>
  );
}
