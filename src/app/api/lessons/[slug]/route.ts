import { NextResponse } from "next/server";
import { getLessonBySlug } from "@/lib/content";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const { body, ...meta } = lesson;
  return NextResponse.json(meta);
}
