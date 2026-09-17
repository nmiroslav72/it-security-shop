// @ts-nocheck
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PostForm from "../../PostForm";
import { updatePost, deletePost } from "../../actions";

export default async function EditPost({ params }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();
  return (
    <div>
      <h1 className="dash-title" style={{ marginBottom:20 }}>Izmena teksta</h1>
      <PostForm action={updatePost.bind(null, id)} initial={post} onDelete={deletePost.bind(null, id)} />
    </div>
  );
}
