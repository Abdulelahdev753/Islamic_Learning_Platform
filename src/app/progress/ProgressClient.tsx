"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar";
import { clearAllProgress, readProgress, type ProgressState } from "@/lib/progress";
import type { LessonMeta } from "@/lib/content";

type QuizSummary = { slug: string; title: string; questionCount: number };

export function ProgressClient({
  lessons,
  quizzes,
}: {
  lessons: LessonMeta[];
  quizzes: QuizSummary[];
}) {
  const [progress, setProgress] = useState<ProgressState | null>(null);

  useEffect(() => {
    const refresh = () => setProgress(readProgress());
    refresh();
    window.addEventListener("tajweed-progress-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("tajweed-progress-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  if (!progress) return <p className="text-gray-600">جارٍ تحميل تقدّمك...</p>;

  const completedCount = progress.lessonsCompleted.length;
  const totalQuizScore = Object.values(progress.quizScores).reduce(
    (acc, s) => ({ score: acc.score + s.score, total: acc.total + s.total }),
    { score: 0, total: 0 },
  );

  return (
    <div className="space-y-10">
      <header className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-800">تقدّمي</h1>
          <p className="text-gray-700 mt-2">
            ملخّص تقدّمك في الدروس والاختبارات (يُحفظ في متصفّحك فقط).
          </p>
        </div>
        <button
          onClick={() => {
            if (confirm("هل تريد حذف كل التقدّم؟")) clearAllProgress();
          }}
          className="btn btn-secondary text-red-700 border-red-200 hover:bg-red-50"
        >
          مسح كل التقدّم
        </button>
      </header>

      <section className="grid sm:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold text-brand-800 mb-3">الدروس المكتملة</h3>
          <ProgressBar value={completedCount} max={lessons.length} />
        </div>
        <div className="card">
          <h3 className="text-lg font-bold text-brand-800 mb-3">إجمالي درجات الاختبارات</h3>
          <ProgressBar value={totalQuizScore.score} max={totalQuizScore.total} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-brand-800 mb-4">حالة الدروس</h2>
        <ul className="divide-y border border-brand-100 rounded-xl bg-white">
          {lessons.map((l) => {
            const done = progress.lessonsCompleted.includes(l.slug);
            return (
              <li key={l.slug} className="p-4 flex items-center justify-between gap-3">
                <Link href={`/lessons/${l.slug}`} className="text-brand-700 hover:underline">
                  {l.title}
                </Link>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    done ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {done ? "مكتمل" : "غير مكتمل"}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-brand-800 mb-4">نتائج الاختبارات</h2>
        {quizzes.length === 0 ? (
          <p className="text-gray-600">لا توجد اختبارات بعد.</p>
        ) : (
          <ul className="divide-y border border-brand-100 rounded-xl bg-white">
            {quizzes.map((q) => {
              const s = progress.quizScores[q.slug];
              return (
                <li key={q.slug} className="p-4 flex items-center justify-between gap-3">
                  <Link href={`/quizzes/${q.slug}`} className="text-brand-700 hover:underline">
                    {q.title}
                  </Link>
                  <span className="text-sm text-gray-700">
                    {s ? `${s.score} / ${s.total}` : "لم تُحاول بعد"}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
