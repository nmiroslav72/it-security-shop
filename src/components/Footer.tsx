"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE, telHref, mailHref } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="mt-16 border-t border-slate-100 bg-ink text-slate-300">
      <div className="container-app grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-white">
              IT <span className="text-accent">SECURITY</span>
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm text-slate-400">
            Tehničko obezbeđenje od 2008. godine. Prodaja i ugradnja sigurnosnih
            kamera, alarmnih sistema i interfona u Beogradu i celoj Srbiji.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Linkovi</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Početna
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-white">
                Prodavnica
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white">
                Prijava
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Kontakt</h4>
          <ul className="space-y-2 text-sm">
            <li>
              {SITE.address.street}, {SITE.address.city}
            </li>
            <li>
              <a href={telHref} className="hover:text-white">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={mailHref} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
          </ul>

          <div className="mt-4 flex gap-3">
            <SocialLink href={SITE.social.instagram} label="Instagram" icon={<IconInstagram />} />
            <SocialLink href={SITE.social.facebook} label="Facebook" icon={<IconFacebook />} />
            <SocialLink href={SITE.social.youtube} label="YouTube" icon={<IconYouTube />} />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} IT SECURITY. Sva prava zadržana.</p>
          <p>Tehničko obezbeđenje · PIB / MB ovde</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent hover:text-ink"
    >
      {icon}
    </a>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.5-2 2-2h2V2h-3c-3 0-5 1.8-5 5v3H6v4h3v8h4z" />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 7s-.2-1.5-.9-2.2c-.8-.9-1.7-.9-2.2-1C16.5 3.5 12 3.5 12 3.5s-4.5 0-7.9.3c-.5 0-1.4 0-2.2 1C1.2 5.5 1 7 1 7S.8 8.7.8 10.5v1.8C.8 14.3 1 16 1 16s.2 1.5.9 2.2c.8.9 1.9.9 2.4 1 1.7.2 7.7.3 7.7.3s4.5 0 7.9-.3c.5 0 1.4 0 2.2-1 .7-.7.9-2.2.9-2.2s.2-1.7.2-3.5v-1.8C23.2 8.7 23 7 23 7zM10 14V8l5 3-5 3z" />
    </svg>
  );
}
