// @ts-nocheck
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">Admin Panel</div>
        <nav className="admin-sidebar__nav">
          <Link href="/admin" className="admin-nav-link">Pregled</Link>
          <Link href="/admin/products" className="admin-nav-link">Proizvodi</Link>
          <Link href="/admin/products/new" className="admin-nav-link admin-nav-link--accent">+ Novi proizvod</Link>
          <Link href="/admin/orders" className="admin-nav-link">Porudzbine</Link>
          <Link href="/admin/banners" className="admin-nav-link">Promo baneri</Link>
          <Link href="/admin/messages" className="admin-nav-link">Poruke</Link>
        </nav>
        <Link href="/" className="admin-sidebar__back">← Nazad na sajt</Link>
      </aside>
      <main className="admin-main">{children}</main>

      <style>{`
        .admin-shell { display: flex; min-height: 100vh; font-family: system-ui, sans-serif; }
        .admin-sidebar { width: 220px; background: #0b1020; color: #fff; display: flex; flex-direction: column; padding: 20px 0; flex-shrink: 0; position: sticky; top: 0; height: 100vh; }
        .admin-sidebar__logo { font-size: 15px; font-weight: 700; color: #f6d000; padding: 0 20px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 12px; }
        .admin-sidebar__nav { display: flex; flex-direction: column; flex: 1; }
        .admin-nav-link { font-size: 13px; color: rgba(255,255,255,0.7); padding: 9px 20px; text-decoration: none; transition: all 0.15s; }
        .admin-nav-link:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .admin-nav-link--accent { color: #f6d000; margin-top: 4px; }
        .admin-sidebar__back { font-size: 12px; color: rgba(255,255,255,0.4); padding: 16px 20px; text-decoration: none; border-top: 1px solid rgba(255,255,255,0.08); }
        .admin-sidebar__back:hover { color: rgba(255,255,255,0.7); }
        .admin-main { flex: 1; background: #f4f5f8; padding: 28px; overflow-y: auto; }
      `}</style>
    </div>
  );
}
