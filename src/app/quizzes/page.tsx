import Link from "next/link";
import { getAllQuizzes } from "@/lib/content";

export const metadata = { title: "الاختبارات · منصة التجويد" };

export default function QuizzesIndexPage() {
  const quizzes = getAllQuizzes();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold text-brand-800">الاختبارات</h1>
        <p className="text-gray-700 mt-2">
          اختر اختباراً لقياس فهمك لأحكام التجويد.
        </p>
      </header>
      {quizzes.length === 0 ? (
        <p className="text-gray-600">لا توجد اختبارات بعد.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {quizzes.map((q) => (
            <Link key={q.slug} href={`/quizzes/${q.slug}`} className="card block">
              <h3 className="text-xl font-bold text-brand-800">{q.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{q.questionCount} أسئلة</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
