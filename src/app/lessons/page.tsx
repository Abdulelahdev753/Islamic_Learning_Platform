import { getAllLessons } from "@/lib/content";
import { LessonCard } from "@/components/LessonCard";

export const metadata = { title: "الدروس · منصة التجويد" };

export default function LessonsIndexPage() {
  const lessons = getAllLessons();
  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 text-white px-6 py-10 sm:px-10 sm:py-12">
        <div className="relative">
          <span className="inline-block text-[11px] font-bold tracking-wide bg-amber-300 text-brand-900 px-3 py-1 rounded-full">
            خريطة الدروس
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold leading-tight text-amber-100">
            فهرس الأبواب
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl leading-7">
            اثنا عشر باباً تشمل أبرز مباحث علم التجويد — مستخلصة من كتاب
            <strong className="mx-1">«التجويد الميسَّر»</strong>
            لمجمع الملك فهد، على رواية حفص عن عاصم. ابدأ من الباب الأوّل وتقدَّم
            بالترتيب، فلكلِّ بابٍ اختبارٌ قصير في ختامه.
          </p>
        </div>
      </header>

      {lessons.length === 0 ? (
        <p className="text-gray-600">لا توجد دروس بعد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {lessons.map((l, i) => (
            <LessonCard key={l.slug} lesson={l} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
