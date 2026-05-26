import Link from "next/link";
import type { LessonMeta } from "@/lib/content";

const AR_NUMS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function toArabicNumber(n: number): string {
  return String(n)
    .split("")
    .map((c) => (/\d/.test(c) ? AR_NUMS[Number(c)] : c))
    .join("");
}

export function LessonCard({ lesson, index }: { lesson: LessonMeta; index: number }) {
  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className="group relative block rounded-xl bg-white border border-brand-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all p-5 text-right"
    >
      <div className="text-xs font-semibold text-gray-500">
        الباب {toArabicNumber(index)}
      </div>
      <h3 className="mt-1 text-lg sm:text-xl font-extrabold text-brand-700 group-hover:text-brand-600 transition-colors">
        {lesson.title}
      </h3>
      {lesson.summary && (
        <p className="mt-2 text-sm text-gray-600 leading-7 line-clamp-3">
          {lesson.summary}
        </p>
      )}
      {lesson.quiz && (
        <span className="inline-block mt-3 text-[11px] bg-brand-50 text-brand-700 px-2 py-1 rounded-full border border-brand-100">
          يتضمَّن اختباراً
        </span>
      )}
    </Link>
  );
}
