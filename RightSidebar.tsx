import Link from "next/link";

// Later: fetch from prisma posts table
const DEMO_POSTS = [
  {
    id: "1",
    slug: "kako-odabrati-kameru",
    title: "Kako odabrati pravu kameru za dvorište?",
    tag: "Saveti",
    date: "28. apr 2025",
  },
  {
    id: "2",
    slug: "ip-vs-analogni-2025",
    title: "IP vs analogni sistemi — šta je bolje za 2025?",
    tag: "Instalacija",
    date: "15. apr 2025",
  },
  {
    id: "3",
    slug: "hikvision-acusense",
    title: "Novi Hikvision AcuSense modeli stigli u ponudu",
    tag: "Novosti",
    date: "2. apr 2025",
  },
  {
    id: "4",
    slug: "alarm-ili-kamera",
    title: "Alarm ili kamera — šta prvo instalirati?",
    tag: "Saveti",
    date: "20. mar 2025",
  },
  {
    id: "5",
    slug: "prolecna-rasprodaja",
    title: "Prolećna rasprodaja — popusti do 40%",
    tag: "Akcija",
    date: "10. mar 2025",
  },
];

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Saveti:     { bg: "#eef2ff", color: "#1d3eb8" },
  Instalacija:{ bg: "#e8f5e9", color: "#2e7d32" },
  Novosti:    { bg: "#fff8e1", color: "#f57f17" },
  Akcija:     { bg: "#fce4ec", color: "#c62828" },
};

export async function RightSidebar() {
  const posts = DEMO_POSTS; // swap with DB fetch when blog is ready

  return (
    <aside className="right-sidebar">
      <div className="right-sidebar__header">
        <h3 className="right-sidebar__title">Blog</h3>
        <Link href="/blog" className="right-sidebar__all">
          Svi →
        </Link>
      </div>

      <div className="right-sidebar__posts">
        {posts.map((post) => {
          const tagStyle = TAG_COLORS[post.tag] ?? {
            bg: "#f0f0f0",
            color: "#555",
          };
          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="blog-post-card"
            >
              <span
                className="blog-post-card__tag"
                style={{ background: tagStyle.bg, color: tagStyle.color }}
              >
                {post.tag}
              </span>
              <p className="blog-post-card__title">{post.title}</p>
              <span className="blog-post-card__date">{post.date}</span>
            </Link>
          );
        })}
      </div>

      <style>{`
        .right-sidebar {
          background: #fff;
          border-left: 1px solid rgba(0,0,0,0.08);
          padding: 16px 12px;
          overflow-y: auto;
          position: sticky;
          top: var(--header-height);
          height: calc(100vh - var(--header-height));
        }
        .right-sidebar__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        .right-sidebar__title {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--ink-muted);
        }
        .right-sidebar__all {
          font-size: 11px;
          color: var(--brand);
          text-decoration: none;
        }
        .right-sidebar__all:hover { text-decoration: underline; }
        .right-sidebar__posts {
          display: flex;
          flex-direction: column;
        }
        .blog-post-card {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          text-decoration: none;
          transition: opacity 0.12s;
        }
        .blog-post-card:last-child { border-bottom: none; }
        .blog-post-card:hover .blog-post-card__title { color: var(--brand); }
        .blog-post-card__tag {
          font-size: 10px;
          font-weight: 500;
          padding: 2px 7px;
          border-radius: 10px;
          width: fit-content;
        }
        .blog-post-card__title {
          font-size: 12px;
          line-height: 1.4;
          color: var(--ink);
          transition: color 0.12s;
        }
        .blog-post-card__date {
          font-size: 10px;
          color: var(--ink-muted);
        }
      `}</style>
    </aside>
  );
}
