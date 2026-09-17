import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminBlogList() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: { id:true, title:true, slug:true, published:true },
  });

  return (
    <div>
      <div className="bl__head">
        <h1 className="dash-title" style={{ margin:0 }}>Blog</h1>
        <Link href="/admin/blog/new" className="dash-btn">+ Novi tekst</Link>
      </div>
      <div className="dash-section">
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead><tr><th>Naslov</th><th>URL</th><th>Status</th><th>Akcija</th></tr></thead>
            <tbody>
              {posts.length === 0 && <tr><td colSpan={4} style={{ color:"#4a5168" }}>Nema tekstova jos.</td></tr>}
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td style={{ color:"#4a5168" }}>/blog/{p.slug}</td>
                  <td><span className={`dash-badge ${p.published ? "dash-badge--green" : "dash-badge--red"}`}>{p.published ? "Objavljen" : "Nacrt"}</span></td>
                  <td><Link href={`/admin/blog/edit/${p.id}`} className="dash-link">Izmeni</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .bl__head { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
        .dash-title { font-size:24px; font-weight:700; color:#0b1020; }
        .dash-btn { background:#1d3eb8; color:#fff; font-size:12px; padding:6px 14px; border-radius:6px; text-decoration:none; }
        .dash-section { background:#fff; border-radius:10px; padding:20px; box-shadow:0 1px 4px rgba(0,0,0,.08); }
        .dash-table-wrap { overflow:auto; }
        .dash-table { width:100%; border-collapse:collapse; font-size:13px; }
        .dash-table th { text-align:left; padding:10px 12px; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.5px; color:#4a5168; border-bottom:1px solid #f0f0f0; }
        .dash-table td { padding:10px 12px; border-bottom:1px solid #f9f9f9; }
        .dash-badge { font-size:11px; font-weight:600; padding:3px 8px; border-radius:20px; }
        .dash-badge--green { background:#dcfce7; color:#166534; } .dash-badge--red { background:#fee2e2; color:#991b1b; }
        .dash-link { color:#1d3eb8; font-size:12px; text-decoration:none; }
      `}</style>
    </div>
  );
}
