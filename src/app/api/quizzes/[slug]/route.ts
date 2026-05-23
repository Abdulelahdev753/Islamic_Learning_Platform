import { NextResponse } from "next/server";
import { getQuizBySlug, toPublicQuiz } from "@/lib/content";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(toPublicQuiz(quiz));
}
