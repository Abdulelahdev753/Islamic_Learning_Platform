import Link from "next/link";
import type { LessonMeta } from "@/lib/content";

export function LessonCard({ lesson, index }: { lesson: LessonMeta; index: number }) {
  return (
    <Link href={`/lessons/${lesson.slug}`} className="card block group">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-full bg-brand-100 text-brand-700 grid place-items-center text-lg font-bold">
          {index}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-brand-800 group-hover:text-brand-600 transition-colors">
            {lesson.title}
          </h3>
          {lesson.summary && (
            <p className="mt-2 text-gray-700 leading-7">{lesson.summary}</p>
          )}
          {lesson.quiz && (
            <span className="inline-block mt-3 text-xs bg-brand-50 text-brand-700 px-2 py-1 rounded">
              يتضمَّن اختباراً
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
