// @ts-nocheck
import Link from "next/link";

const BLOG_POSTS = [
  {
    slug: "video-nadzor-preko-mobilnog-telefona",
    title: "Video nadzor preko mobilnog telefona",
    date: "10. maj 2025.",
    category: "Saveti",
    catClass: "saveti",
  },
  {
    slug: "kamere-visoke-rezolucije-prednosti",
    title: "Prednosti kamera visoke rezolucije 4K, 5MP, 4MP",
    date: "28. apr 2025.",
    category: "Saveti",
    catClass: "saveti",
  },
  {
    slug: "kako-izabrati-video-nadzor",
    title: "Kako izabrati video nadzor — vodic za kupovinu",
    date: "15. apr 2025.",
    category: "Saveti",
    catClass: "saveti",
  },
  {
    slug: "ajax-bezicni-alarm-broj-1-evropa",
    title: "Ajax bezicni alarm — broj 1 u Evropi",
    date: "2. apr 2025.",
    category: "Novosti",
    catClass: "novosti",
  },
];

export function RightSidebar() {
  return (
    <aside className="rs">
      <div className="rs-header">
        <h3 className="rs-title">Blog</h3>
        <Link href="/blog" className="rs-all">Svi →</Link>
      </div>

      <div className="rs-posts">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={"/blog/" + post.slug} className="rs-post">
            <span className={"rs-cat rs-cat--" + post.catClass}>{post.category}</span>
            <p className="rs-post__title">{post.title}</p>
            <span className="rs-post__date">{post.date}</span>
          </Link>
        ))}
      </div>

      <style>{`
        .rs { background: #fff; border-radius: 10px; border: 1px solid rgba(0,0,0,0.08); overflow: hidden; }
        .rs-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 10px; border-bottom: 1px solid rgba(0,0,0,0.07); }
        .rs-title { font-size: 13px; font-weight: 700; color: var(--ink); text-transform: uppercase; letter-spacing: 0.5px; }
        .rs-all { font-size: 12px; color: var(--brand); text-decoration: none; font-weight: 500; }
        .rs-all:hover { text-decoration: underline; }
        .rs-posts { display: flex; flex-direction: column; }
        .rs-post { display: block; padding: 12px 16px; border-bottom: 1px solid rgba(0,0,0,0.06); text-decoration: none; transition: background 0.12s; }
        .rs-post:last-child { border-bottom: none; }
        .rs-post:hover { background: #f4f5f8; }
        .rs-cat { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 8px; border-radius: 3px; display: inline-block; margin-bottom: 6px; }
        .rs-cat--saveti { background: #dbeafe; color: #1e40af; }
        .rs-cat--novosti { background: #fce7f3; color: #9d174d; }
        .rs-cat--akcija { background: #fef3c7; color: #92400e; }
        .rs-cat--instalacija { background: #d1fae5; color: #065f46; }
        .rs-post__title { font-size: 13px; font-weight: 500; color: var(--ink); line-height: 1.4; margin-bottom: 5px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .rs-post:hover .rs-post__title { color: var(--brand); }
        .rs-post__date { font-size: 11px; color: var(--ink-muted); }
      `}</style>
    </aside>
  );
}
