// @ts-nocheck
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(input) {
  const map = { č:"c", ć:"c", đ:"dj", š:"s", ž:"z", Č:"c", Ć:"c", Đ:"dj", Š:"s", Ž:"z" };
  return input.split("").map((ch) => map[ch] ?? ch).join("")
    .toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Neovlascen pristup");
}

function parse(formData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "").trim() || title);
  return {
    title, slug,
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? ""),
    coverImage: String(formData.get("coverImage") ?? "").trim() || null,
    metaTitle: String(formData.get("metaTitle") ?? "").trim() || null,
    metaDescription: String(formData.get("metaDescription") ?? "").trim() || null,
    published: formData.get("published") === "on",
    isFeatured: formData.get("isFeatured") === "on",
  };
}

export async function createPost(formData) {
  await requireAdmin();
  const data = parse(formData);
  if (!data.title) throw new Error("Naslov je obavezan");
  await prisma.post.create({ data: { ...data, publishedAt: data.published ? new Date() : null } });
  revalidatePath("/admin/blog"); revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updatePost(id, formData) {
  await requireAdmin();
  const data = parse(formData);
  if (!data.title) throw new Error("Naslov je obavezan");
  const existing = await prisma.post.findUnique({ where: { id }, select: { publishedAt: true } });
  await prisma.post.update({
    where: { id },
    data: { ...data, publishedAt: data.published ? (existing?.publishedAt ?? new Date()) : null },
  });
  revalidatePath("/admin/blog"); revalidatePath("/blog"); revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/blog");
}

export async function deletePost(id) {
  await requireAdmin();
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/blog"); revalidatePath("/blog");
  redirect("/admin/blog");
}
