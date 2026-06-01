"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartButton } from "./CartButton";
import { cn } from "@/lib/utils";
import { SITE, telHref } from "@/lib/site";

const navItems = [
  { href: "/", label: "Početna" },
  { href: "/shop", label: "Prodavnica" },
  { href: "/contact", label: "Kontakt" },
];

type NavUser = {
  name: string | null;
  email: string;
  role: string;
} | null;

export function Navbar({ user }: { user?: NavUser }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Zatvori mobilni meni pri promeni rute
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Sakrij navbar u admin delu (admin ima svoj layout)
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      {/* Top kontakt traka — vidljiva samo na desktopu */}
      <div className="hidden border-b border-slate-100 bg-slate-50 md:block">
        <div className="container-app flex h-9 items-center justify-between text-xs text-ink-muted">
          <span>Tehničko obezbeđenje od {SITE.founded}. · {SITE.address.city}</span>
          <div className="flex items-center gap-4">
            <span>{SITE.hours}</span>
            <a
              href={`mailto:${SITE.email}`}
              className="hover:text-brand"
              aria-label="Pošalji email"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-app flex h-16 items-center justify-between gap-3">
        {/* Logo + naziv */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          aria-label={`${SITE.name} — početna`}
        >
          <Image
            src="/logo.svg"
            alt={SITE.name}
            width={40}
            height={40}
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
            priority
          />
          <span className="font-bold tracking-tight">
            <span className="hidden sm:inline">IT </span>
            <span className="text-brand">SECURITY</span>
          </span>
        </Link>

        {/* Telefon — uvek vidljiv (na desktopu sa ikonicom + tekstom, na mobilnom samo ikonica) */}
        <a
          href={telHref}
          className="ml-auto flex items-center gap-2 rounded-full bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark md:ml-0 md:px-4"
          aria-label={`Pozovi ${SITE.phoneDisplay}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="hidden sm:inline">{SITE.phoneDisplay}</span>
        </a>

        {/* Glavna navigacija — desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand text-white"
                    : "text-ink hover:bg-slate-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <CartButton />
          {user ? (
            <div className="hidden items-center gap-2 lg:flex">
              {user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-ink hover:bg-accent-dark"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/account"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Moj nalog
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 lg:inline-flex"
            >
              Prijava
            </Link>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-full border border-slate-200 p-2"
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={open}
            aria-controls="mobilni-meni"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobilni-meni"
          className="border-t border-slate-100 bg-white md:hidden"
        >
          <nav className="container-app flex flex-col py-3">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium",
                    active ? "bg-brand/10 text-brand" : "hover:bg-slate-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            {user ? (
              <>
                <Link
                  href="/account"
                  className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-50"
                >
                  Moj nalog
                </Link>
                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="rounded-lg bg-accent px-4 py-3 text-sm font-bold text-ink"
                  >
                    Admin panel
                  </Link>
                )}
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-50"
              >
                Prijava / Registracija
              </Link>
            )}
            <a
              href={telHref}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Pozovi {SITE.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
