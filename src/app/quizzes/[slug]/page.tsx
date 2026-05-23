import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllQuizzes, getQuizBySlug, toPublicQuiz } from "@/lib/content";
import { QuizRunner } from "@/components/QuizRunner";

export function generateStaticParams() {
  return getAllQuizzes().map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  return { title: quiz ? `${quiz.title} · منصة التجويد` : "اختبار" };
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) notFound();
  const publicQuiz = toPublicQuiz(quiz);

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-6">
        <Link href="/quizzes" className="text-sm text-brand-600 hover:underline">
          ← العودة إلى الاختبارات
        </Link>
        <h1 className="text-3xl font-extrabold text-brand-800 mt-2">{quiz.title}</h1>
        <p className="text-gray-600 mt-1 text-sm">{quiz.questions.length} أسئلة</p>
      </header>
      <QuizRunner quiz={publicQuiz} />
    </div>
  );
}
