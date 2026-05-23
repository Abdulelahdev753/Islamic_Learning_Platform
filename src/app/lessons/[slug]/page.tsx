import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllLessons, getLessonBySlug } from "@/lib/content";
import { mdxComponents } from "../../../../mdx-components";
import { LessonCompleteButton } from "@/components/LessonCompleteButton";

export function generateStaticParams() {
  return getAllLessons().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  return { title: lesson ? `${lesson.title} · منصة التجويد` : "درس" };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const all = getAllLessons();
  const idx = all.findIndex((l) => l.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-6 border-b border-brand-100 pb-4">
        <Link href="/lessons" className="text-sm text-brand-600 hover:underline">
          ← العودة إلى الدروس
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-800 mt-2">
          {lesson.title}
        </h1>
        {lesson.summary && <p className="text-gray-700 mt-2 leading-7">{lesson.summary}</p>}
      </header>

      <div className="prose-rtl">
        <MDXRemote source={lesson.body} components={mdxComponents} />
      </div>

      <div className="mt-10 pt-6 border-t border-brand-100 flex flex-wrap items-center justify-between gap-4">
        <LessonCompleteButton slug={lesson.slug} />
        {lesson.quiz && (
          <Link href={`/quizzes/${lesson.quiz}`} className="btn btn-primary">
            ابدأ الاختبار ←
          </Link>
        )}
      </div>

      <nav className="mt-8 flex items-center justify-between text-sm">
        {prev ? (
          <Link href={`/lessons/${prev.slug}`} className="text-brand-700 hover:underline">
            → السابق: {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/lessons/${next.slug}`} className="text-brand-700 hover:underline">
            التالي: {next.title} ←
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
