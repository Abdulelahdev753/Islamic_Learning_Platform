import { getAllLessons } from "@/lib/content";
import { LessonCard } from "@/components/LessonCard";

export const metadata = { title: "الدروس · منصة التجويد" };

export default function LessonsIndexPage() {
  const lessons = getAllLessons();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold text-brand-800">الدروس</h1>
        <p className="text-gray-700 mt-2">
          ابدأ من الدرس الأول وتقدَّم بترتيب. كل درس مصحوب باختبار قصير.
        </p>
      </header>
      {lessons.length === 0 ? (
        <p className="text-gray-600">لا توجد دروس بعد.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {lessons.map((l, i) => (
            <LessonCard key={l.slug} lesson={l} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
