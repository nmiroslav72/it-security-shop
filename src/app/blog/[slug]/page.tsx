
// @ts-nocheck
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ where:{ published:true }, select:{ slug:true } });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) return {};
  const url = `https://diskontvideonadzora.rs/blog/${post.slug}`;
  return {
    title: post.metaTitle || `${post.title} | IT Security Blog`,
    description: post.metaDescription || post.excerpt || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      url, type: "article",
      images: post.coverImage ? [post.coverImage] : undefined,
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) notFound();
  const url = `https://diskontvideonadzora.rs/blog/${post.slug}`;
  const ld = {
    "@context":"https://schema.org", "@type":"Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt || undefined,
    image: post.coverImage || undefined,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    dateModified: new Date(post.updatedAt).toISOString(),
    mainEntityOfPage: url,
    publisher: { "@type":"Organization", name:"IT Security" },
  };
  return (
    <article className="blog-post">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <nav className="blog-breadcrumb">
        <Link href="/">Pocetna</Link><span>/</span>
        <Link href="/blog">Blog</Link><span>/</span>
        <span>{post.title}</span>
      </nav>

      <div className="blog-post__header">
        <span className="blog-post__cat blog-cat--saveti">Saveti</span>
        <h1 className="blog-post__h1">{post.title}</h1>
        {post.publishedAt && <p className="blog-post__date">{new Date(post.publishedAt).toLocaleDateString("sr-RS")}</p>}
      </div>

      {post.coverImage && <img src={post.coverImage} alt={post.title} style={{ width:"100%", borderRadius:12, margin:"0 0 24px" }} />}

      <div className="blog-post__body" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="blog-post__cta">
        <h3>Trebate video nadzor ili alarmni sistem?</h3>
        <p>IT Security — prodaja i ugradnja u Beogradu. Licencirani tehnicari, garancija 3 godine.</p>
        <a href="tel:063224651" className="blog-post__btn">📞 063224651</a>
        <Link href="/shop" className="blog-post__btn blog-post__btn--outline">Pogledaj ponudu</Link>
      </div>

      <style>{`
        .blog-post { max-width: 780px; margin: 0 auto; padding: 0 8px; }
        .blog-breadcrumb { display: flex; gap: 8px; font-size: 13px; color: var(--ink-muted); margin-bottom: 20px; flex-wrap: wrap; }
        .blog-breadcrumb a { color: var(--brand); text-decoration: none; }
        .blog-post__header { margin-bottom: 28px; }
        .blog-post__cat { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 4px; display: inline-block; margin-bottom: 12px; }
        .blog-cat--saveti { background: #dbeafe; color: #1e40af; }
        .blog-cat--novosti { background: #fce7f3; color: #9d174d; }
        .blog-post__h1 { font-size: 26px; font-weight: 700; color: var(--ink); line-height: 1.3; margin-bottom: 8px; }
        .blog-post__date { font-size: 13px; color: var(--ink-muted); }
        .blog-post__body h2 { font-size: 19px; font-weight: 700; color: var(--ink); margin: 24px 0 10px; }
        .blog-post__body h3 { font-size: 16px; font-weight: 700; color: var(--ink); margin: 20px 0 8px; }
        .blog-post__body p { font-size: 14px; line-height: 1.8; color: var(--ink-muted); margin-bottom: 14px; }
        .blog-post__body ul, .blog-post__body ol { padding-left: 20px; margin-bottom: 14px; }
        .blog-post__body li { font-size: 14px; line-height: 1.8; color: var(--ink-muted); margin-bottom: 6px; }
        .blog-post__body a { color: var(--brand); text-decoration: underline; }
        .blog-post__body strong { color: var(--ink); }
        .blog-post__cta { background: linear-gradient(135deg, #1d3eb8 0%, #152a85 100%); border-radius: 12px; padding: 24px; text-align: center; margin-top: 40px; }
        .blog-post__cta h3 { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .blog-post__cta p { font-size: 13px; color: rgba(255,255,255,0.8); margin-bottom: 16px; }
        .blog-post__btn { display: inline-block; background: #f6d000; color: #0b1020; font-size: 14px; font-weight: 700; padding: 10px 24px; border-radius: 8px; text-decoration: none; margin: 0 6px; }
        .blog-post__btn--outline { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.4); }
        @media (max-width: 640px) { .blog-post__h1 { font-size: 20px; } }
      `}</style>
    </article>
  );
}
