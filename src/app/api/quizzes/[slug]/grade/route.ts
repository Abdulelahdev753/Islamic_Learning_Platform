import { NextResponse } from "next/server";
import { getQuizBySlug } from "@/lib/content";

type Body = { answers?: Record<string, number> };

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) return NextResponse.json({ error: "not_found" }, { status: 404 });

  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const answers = body.answers ?? {};

  let score = 0;
  const perQuestion = quiz.questions.map((q) => {
    const given = answers[q.id];
    const correct = typeof given === "number" && given === q.answer;
    if (correct) score++;
    return {
      id: q.id,
      correct,
      correctAnswer: q.answer,
      given: typeof given === "number" ? given : null,
      explanation: q.explanation ?? null,
    };
  });

  return NextResponse.json({
    slug: quiz.slug,
    score,
    total: quiz.questions.length,
    perQuestion,
  });
}
