import Link from "next/link";
import { getAllLessons, getAllQuizzes } from "@/lib/content";

export const metadata = { title: "الاختبارات · منصة التجويد" };

const AR_NUMS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function toArabicNumber(n: number): string {
  return String(n)
    .split("")
    .map((c) => (/\d/.test(c) ? AR_NUMS[Number(c)] : c))
    .join("");
}

export default function QuizzesIndexPage() {
  const lessons = getAllLessons();
  const quizzes = getAllQuizzes();
  const byQuizSlug = new Map(quizzes.map((q) => [q.slug, q]));

  const ordered = lessons
    .map((l, i) => {
      const slug = l.quiz ?? l.slug;
      const q = byQuizSlug.get(slug);
      return q ? { chapter: i + 1, lesson: l, quiz: q } : null;
    })
    .filter(Boolean) as {
    chapter: number;
    lesson: (typeof lessons)[number];
    quiz: (typeof quizzes)[number];
  }[];

  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 text-white px-6 py-10 sm:px-10 sm:py-12">
        <span className="inline-block text-[11px] font-bold tracking-wide bg-amber-300 text-brand-900 px-3 py-1 rounded-full">
          قياس الفهم
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold leading-tight text-amber-100">
          الاختبارات
        </h1>
        <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl leading-7">
          لكلِّ بابٍ اختبارٌ قصير يُصحَّح فوراً مع شرح الإجابات الصحيحة.
          راجع الدرس أوّلاً، ثمّ ابدأ الاختبار، وتتبَّع تقدّمك من صفحة <strong>تقدّمي</strong>.
        </p>
      </header>

      {ordered.length === 0 ? (
        <p className="text-gray-600">لا توجد اختبارات بعد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ordered.map(({ chapter, lesson, quiz }) => (
            <article
              key={quiz.slug}
              className="group relative rounded-xl bg-white border border-brand-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all p-5 text-right"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-xs font-semibold text-gray-500">
                  الباب {toArabicNumber(chapter)}
                </div>
                <span className="text-[11px] bg-amber-50 text-amber-800 px-2 py-1 rounded-full border border-amber-200 whitespace-nowrap">
                  {toArabicNumber(quiz.questionCount)} أسئلة
                </span>
              </div>
              <h3 className="mt-1 text-lg font-extrabold text-brand-800 group-hover:text-brand-600 transition-colors leading-8">
                {lesson.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500">{quiz.title}</p>
              <div className="mt-4 flex items-center justify-between relative z-10">
                <Link
                  href={`/lessons/${lesson.slug}`}
                  className="text-xs text-brand-700 hover:underline"
                >
                  مراجعة الدرس
                </Link>
                <Link
                  href={`/quizzes/${quiz.slug}`}
                  className="text-sm font-semibold text-brand-700 hover:text-brand-500 inline-flex items-center gap-1"
                >
                  ابدأ الاختبار ←
                </Link>
              </div>
              <Link
                href={`/quizzes/${quiz.slug}`}
                aria-label={`بدء ${quiz.title}`}
                className="absolute inset-0 rounded-xl"
              />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
